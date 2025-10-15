// models/JodiChart.ts
import { Schema, Document, models, model } from 'mongoose';

export interface JodiChartCore {
  sequence: string[];     // 100 items '00'..'99'
  updatedAt: Date;
  createdAt: Date;
}
export interface IJodiChart extends Document, JodiChartCore {}

const two = /^\d{2}$/;

const JodiChartSchema = new Schema<IJodiChart>({
  sequence: {
    type: [String],
    required: true,
    validate: {
      validator(v: string[]) {
        if (!Array.isArray(v) || v.length !== 100) return false;
        if (!v.every(s => two.test(s))) return false;
        return new Set(v).size === 100;
      },
      message: 'sequence must be 100 unique 2-digit items'
    }
  }
}, { timestamps: true });

export default models.JodiChart || model<IJodiChart>('JodiChart', JodiChartSchema);
