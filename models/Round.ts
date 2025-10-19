// models/Round.ts
import { Schema, Document, models, model } from 'mongoose';

export type RoundStatus =
  | 'READY'
  | 'OPENING_PUBLISHED'  // <— keep temporarily for backward-compat
  | 'DAY_PUBLISHED'
  | 'CLOSED';

export interface RoundCore {
  roundId: string;
  sessionDate: string;     // 'YYYY-MM-DD'
  dayTime: string;         // 'HH:mm'
  nightTime: string;       // 'HH:mm'
  dayPanna?: string;
  dayDigit?: number;
  nightPanna?: string;
  nightDigit?: number;
  jodi?: string;
  status: RoundStatus;
  createdAt: Date;
  updatedAt: Date;
}
export interface IRound extends Document, RoundCore {}

const timeHHmm = /^([01]\d|2[0-3]):[0-5]\d$/;
const panna3 = /^\d{3}$/;
const jodi2  = /^\d{2}$/;

const RoundSchema = new Schema<IRound>({
  roundId: { type: String, required: true, unique: true },
  sessionDate: { type: String, required: true, match: /^\d{4}-\d{2}-\d{2}$/ },

  dayTime:   { type: String, required: true, match: timeHHmm },
  nightTime: { type: String, required: true, match: timeHHmm },

  dayPanna:   { type: String, match: panna3, default: undefined },
  dayDigit:   { type: Number, min: 0, max: 9, default: undefined },
  nightPanna: { type: String, match: panna3, default: undefined },
  nightDigit: { type: Number, min: 0, max: 9, default: undefined },

  jodi: { type: String, match: jodi2, default: undefined },

  status: {
    type: String,
    enum: ['READY','OPENING_PUBLISHED','DAY_PUBLISHED','CLOSED'], // <— includes both
    default: 'READY',
    required: true
  }
}, { timestamps: true });

RoundSchema.index({ sessionDate: 1 }, { unique: true });
// models/Round.ts (add this BEFORE export default)
RoundSchema.pre('validate', function (next) {
  // @ts-ignore – tolerate legacy fields
  const openingTime = (this as any).openingTime;
  // @ts-ignore
  const closingTime = (this as any).closingTime;

  if (!this.dayTime && openingTime) this.dayTime = openingTime;
  if (!this.nightTime && closingTime) this.nightTime = closingTime;

  // Legacy result fields (best-effort)
  // @ts-ignore
  const openingPanna = (this as any).openingPanna;
  // @ts-ignore
  const openingDigit = (this as any).openingDigit;
  // @ts-ignore
  const closingPanna = (this as any).closingPanna;
  // @ts-ignore
  const closingDigit = (this as any).closingDigit;

  if (!this.dayPanna && openingPanna) this.dayPanna = openingPanna;
  if (this.dayDigit == null && openingDigit != null) this.dayDigit = openingDigit;
  if (!this.nightPanna && closingPanna) this.nightPanna = closingPanna;
  if (this.nightDigit == null && closingDigit != null) this.nightDigit = closingDigit;

  // Status bridge: allow old 'OPENING_PUBLISHED'
  // (you already added the enum, this is just a safety)
  // no mapping needed unless you want to force-convert:
  // if (this.status === 'OPENING_PUBLISHED') this.status = 'DAY_PUBLISHED';

  next();
});

export default models.Round || model<IRound>('Round', RoundSchema);
