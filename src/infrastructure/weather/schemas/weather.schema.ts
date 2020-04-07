import * as mongoose from 'mongoose';

export const WeatherSchema = new mongoose.Schema({
  date: Date,
  temperature: Number,
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
});