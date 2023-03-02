const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Поле "email" должно быть заполнено'],
      unique: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Поле "email" должно быть валидным email-адресом',
      },
    },
    present: {
      type: mongoose.Schema.Types.ObjectId,
      unique: false,
      ref: 'present',
      default: null,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('user', userSchema);
