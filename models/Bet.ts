// models/Bet.ts
import { Schema, Document, models, model, Types } from 'mongoose';

export type BetType =
  | 'SINGLE_OPEN'
  | 'SINGLE_CLOSE'
  | 'JODI'
  | 'PANNA_OPEN'
  | 'PANNA_CLOSE';

/** Plain shape (optional; useful if you ever use .lean()) */
export interface BetCore {
  guestId: string;
  round: Types.ObjectId;
  type: BetType;
  number: string;          // '0'..'9' | '00'..'99' | '000'..'999' (validated by type)
  stakeTokens?: number;    // play-money only (for demo)
  createdAt: Date;
  updatedAt: Date;
}

export interface IBet extends Document, BetCore {}

const BetSchema = new Schema<IBet>({
  guestId: { type: String, required: true, index: true },

  round: { type: Schema.Types.ObjectId, ref: 'Round', required: true, index: true },

  type: {
    type: String,
    enum: ['SINGLE_OPEN', 'SINGLE_CLOSE', 'JODI', 'PANNA_OPEN', 'PANNA_CLOSE'],
    required: true,
    index: true
  },

  number: {
    type: String,
    required: true,
    validate: {
      validator: function (this: IBet, v: string) {
        // Validate number format based on bet type
        switch (this.type) {
          case 'SINGLE_OPEN':
          case 'SINGLE_CLOSE':
            return /^[0-9]$/.test(v);         // 0..9 (single digit string)
          case 'JODI':
            return /^\d{2}$/.test(v);         // 00..99
          case 'PANNA_OPEN':
          case 'PANNA_CLOSE':
            return /^\d{3}$/.test(v);         // 000..999
          default:
            return false;
        }
      },
      message: 'Invalid number format for the selected bet type.'
    }
  },

  // Optional demo-only play money stake; keep it server-trusted only
  stakeTokens: {
    type: Number,
    default: 1,
    min: 0
  }
}, { timestamps: true });

// Common query accelerator
BetSchema.index({ round: 1, type: 1 });
BetSchema.index({ round: 1, guestId: 1 });

export default models.Bet || model<IBet>('Bet', BetSchema);
