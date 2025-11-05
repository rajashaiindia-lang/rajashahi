// models/Round.ts
import { Schema, Document, models, model } from 'mongoose';

export type RoundStatus =
  | 'READY'
  | 'OPENING_PUBLISHED'   // legacy
  | 'DAY_PUBLISHED'       // legacy
  | 'CLOSED';             // legacy

// NEW: per-line statuses
export type LineStatus = 'READY' | 'OPEN_PUBLISHED' | 'CLOSED';

export interface RoundCore {
  roundId: string;
  sessionDate: string;     // 'YYYY-MM-DD'

  // OLD (keep)
  dayTime: string;         // used to be one time
  nightTime: string;

  // NEW times (more explicit, can be same as old ones)
  dayOpenTime?: string;
  dayCloseTime?: string;
  nightOpenTime?: string;
  nightCloseTime?: string;

  // DAY line (opening/closing)
  dayOpenPanna?: string;
  dayOpenDigit?: number;
  dayClosePanna?: string;
  dayCloseDigit?: number;
  dayJodi?: string;
  dayLineStatus?: LineStatus;

  // NIGHT line (opening/closing)
  nightOpenPanna?: string;
  nightOpenDigit?: number;
  nightClosePanna?: string;
  nightCloseDigit?: number;
  nightJodi?: string;
  nightLineStatus?: LineStatus;

  // legacy fields:
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

  // old
  dayTime:   { type: String, required: true, match: timeHHmm },
  nightTime: { type: String, required: true, match: timeHHmm },

  // new optional times
  dayOpenTime:   { type: String, match: timeHHmm, default: undefined },
  dayCloseTime:  { type: String, match: timeHHmm, default: undefined },
  nightOpenTime: { type: String, match: timeHHmm, default: undefined },
  nightCloseTime:{ type: String, match: timeHHmm, default: undefined },

  // DAY line
  dayOpenPanna:  { type: String, match: panna3, default: undefined },
  dayOpenDigit:  { type: Number, min: 0, max: 9, default: undefined },
  dayClosePanna: { type: String, match: panna3, default: undefined },
  dayCloseDigit: { type: Number, min: 0, max: 9, default: undefined },
  dayJodi:       { type: String, match: jodi2, default: undefined },
  dayLineStatus: { type: String, enum: ['READY','OPEN_PUBLISHED','CLOSED'], default: 'READY' },

  // NIGHT line
  nightOpenPanna:  { type: String, match: panna3, default: undefined },
  nightOpenDigit:  { type: Number, min: 0, max: 9, default: undefined },
  nightClosePanna: { type: String, match: panna3, default: undefined },
  nightCloseDigit: { type: Number, min: 0, max: 9, default: undefined },
  nightJodi:       { type: String, match: jodi2, default: undefined },
  nightLineStatus: { type: String, enum: ['READY','OPEN_PUBLISHED','CLOSED'], default: 'READY' },

  // legacy
  dayPanna:   { type: String, match: panna3, default: undefined },
  dayDigit:   { type: Number, min: 0, max: 9, default: undefined },
  nightPanna: { type: String, match: panna3, default: undefined },
  nightDigit: { type: Number, min: 0, max: 9, default: undefined },

  jodi: { type: String, match: jodi2, default: undefined },

  status: {
    type: String,
    enum: ['READY','OPENING_PUBLISHED','DAY_PUBLISHED','CLOSED'],
    default: 'READY',
    required: true
  }
}, { timestamps: true });

RoundSchema.index({ sessionDate: 1 }, { unique: true });

// keep your legacy pre-validate but extend it
RoundSchema.pre('validate', function (next) {
  // legacy names to new names
  // @ts-ignore
  const openingTime = (this as any).openingTime;
  // @ts-ignore
  const closingTime = (this as any).closingTime;

  // if new times missing, fall back to old ones
  if (!this.dayOpenTime)  this.dayOpenTime  = this.dayTime || openingTime;
  if (!this.dayCloseTime) this.dayCloseTime = this.dayTime || closingTime;
  if (!this.nightOpenTime)  this.nightOpenTime  = this.nightTime || openingTime;
  if (!this.nightCloseTime) this.nightCloseTime = this.nightTime || closingTime;

  // legacy result fields
  // @ts-ignore
  const openingPanna = (this as any).openingPanna;
  // @ts-ignore
  const openingDigit = (this as any).openingDigit;
  // @ts-ignore
  const closingPanna = (this as any).closingPanna;
  // @ts-ignore
  const closingDigit = (this as any).closingDigit;

  // map old day → dayOpen
  if (!this.dayOpenPanna && (this.dayPanna || openingPanna)) {
    this.dayOpenPanna = this.dayPanna || openingPanna;
  }
  if (this.dayOpenDigit == null && (this.dayDigit != null || openingDigit != null)) {
    this.dayOpenDigit = this.dayDigit ?? openingDigit;
  }

  // map old night → nightOpen
  if (!this.nightOpenPanna && (this.nightPanna || closingPanna)) {
    this.nightOpenPanna = this.nightPanna || closingPanna;
  }
  if (this.nightOpenDigit == null && (this.nightDigit != null || closingDigit != null)) {
    this.nightOpenDigit = this.nightDigit ?? closingDigit;
  }

  next();
});

export default models.Round || model<IRound>('Round', RoundSchema);
