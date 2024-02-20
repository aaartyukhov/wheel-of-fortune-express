const mongoose = require('mongoose');
const { PRESENT_REQUEST_COUNTER_FIELD } = require('../constants/common');

// Функционала автоинкремента в mongodb из коробки нет, на офсайте
// предлагается использовать триггеры, что накладывает доп сложности
// при старте базы. Поэтому используем доп таблицу, в которой обновляем
// количество запросов за подарками

// https://www.mongodb.com/basics/mongodb-auto-increment

const presentRequestCounterSchema = new mongoose.Schema(
  {
    [PRESENT_REQUEST_COUNTER_FIELD]: {
      type: String,
      required: [true, `Поле "${PRESENT_REQUEST_COUNTER_FIELD}" должно быть заполнено`],
    },
    requestCount: {
      type: Number,
      required: [true, 'Поле "requestCount" должно быть заполнено'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('presentRequestCount', presentRequestCounterSchema);
