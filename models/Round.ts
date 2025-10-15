// models/Round.ts
import { Schema, Document, models, model } from 'mongoose';

export type Market = 'KALYAN';
export type RoundStatus = 'READY' | 'OPENING_PUBLISHED' | 'CLOSED';

/** Plain shape (what .lean() returns) */
export interface RoundCore {
  roundId: string;               // unique, timestamp-based or your generator
  sessionDate: string;           // 'YYYY-MM-DD' (local session date)
  market: Market;                // 'KALYAN' | 'DEMO' (extend later if needed)
  openingTime: string;           // 'HH:mm' (local publish time)
  closingTime: string;           // 'HH:mm'

  // Opening side
  openingPanna?: string;         // '000'..'999'
  openingDigit?: number;         // 0..9 (derived from openingPanna)

  // Closing side
  closingPanna?: string;         // '000'..'999'
  closingDigit?: number;         // 0..9 (derived from closingPanna)

  // Derived convenience
  jodi?: string;                 // '00'..'99' = `${openingDigit}${closingDigit}`

  status: RoundStatus;

  createdAt: Date;
  updatedAt: Date;
}

/** Mongoose document shape (when not using .lean()) */
export interface IRound extends Document, RoundCore {}

const timeHHmm = /^([01]\d|2[0-3]):[0-5]\d$/;
const panna3 = /^\d{3}$/;
const jodi2 = /^\d{2}$/;

const RoundSchema = new Schema<IRound>({
  roundId: { type: String, required: true, unique: true },

  sessionDate: {
    type: String,
    required: true,                     // e.g., '2025-10-01'
    match: /^\d{4}-\d{2}-\d{2}$/
  },
  market: {
    type: String,
  default: 'KALYAN',
    required: true
  },

  openingTime: { type: String, required: true, match: timeHHmm },
  closingTime: { type: String, required: true, match: timeHHmm },

  openingPanna: { type: String, match: panna3, default: undefined },
  openingDigit: { type: Number, min: 0, max: 9, default: undefined },

  closingPanna: { type: String, match: panna3, default: undefined },
  closingDigit: { type: Number, min: 0, max: 9, default: undefined },

  jodi: { type: String, match: jodi2, default: undefined },

  status: {
    type: String,
    enum: ['READY', 'OPENING_PUBLISHED', 'CLOSED'],
    default: 'READY',
    required: true
  }
}, { timestamps: true });

// Helpful unique constraint to avoid duplicate market-day sessions:
RoundSchema.index({ market: 1, sessionDate: 1 }, { unique: true });

export default models.Round || model<IRound>('Round', RoundSchema);
