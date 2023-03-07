const mongoose = require('mongoose');

const presentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    unique: false,
  },
  count: {
    type: Number,
    required: [true, 'Поле "count" должно быть заполнено'],
    unique: false,
  },
  description: {
    type: String,
    required: [true, 'Поле "description" должно быть заполнено'],
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('present', presentSchema);
