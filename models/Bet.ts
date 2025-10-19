// models/Bet.ts
import { Schema, Document, models, model, Types } from 'mongoose';

export type BetType =
  | 'SINGLE_DAY'
  | 'SINGLE_NIGHT'
  | 'JODI'
  | 'PANNA_DAY'
  | 'PANNA_NIGHT';

export interface BetCore {
  guestId: string;
  round: Types.ObjectId;
  type: BetType;
  number: string;       // '0'..'9' | '00'..'99' | '000'..'999'
  stakeTokens?: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface IBet extends Document, BetCore {}

const BetSchema = new Schema<IBet>({
  guestId: { type: String, required: true, index: true },
  round:   { type: Schema.Types.ObjectId, ref: 'Round', required: true, index: true },
  type: {
    type: String,
    enum: ['SINGLE_DAY', 'SINGLE_NIGHT', 'JODI', 'PANNA_DAY', 'PANNA_NIGHT'],
    required: true, index: true
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator(this: IBet, v: string) {
        switch (this.type) {
          case 'SINGLE_DAY':
          case 'SINGLE_NIGHT':
            return /^[0-9]$/.test(v);
          case 'JODI':
            return /^\d{2}$/.test(v);
          case 'PANNA_DAY':
          case 'PANNA_NIGHT':
            return /^\d{3}$/.test(v);
          default:
            return false;
        }
      },
      message: 'Invalid number format for the selected bet type.'
    }
  },
  stakeTokens: { type: Number, default: 1, min: 0 }
}, { timestamps: true });

BetSchema.index({ round: 1, type: 1 });
BetSchema.index({ round: 1, guestId: 1 });

export default models.Bet || model<IBet>('Bet', BetSchema);
