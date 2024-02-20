const mongoose = require('mongoose');

const presentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "name" должно быть заполнено'],
    unique: true,
  },
  count: {
    type: Number,
    required: false,
    unique: false,
  },
  isInfinity: {
    type: Boolean,
    required: [true, 'Поле "isInfinity" должно быть заполнено'],
    unique: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('present', presentSchema);
