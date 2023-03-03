const User = require('../models/user');
const Present = require('../models/presents');
const NotFoundError = require('../errors/not-found-error');
const randomInteger = require('../helpers/random');
const ConflictError = require('../errors/conflict-error');

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({ }).populate('present');
    res.status(200).send(users);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email }).populate('present');
    if (user) {
      res.status(200).send(user);
    } else {
      const newUser = await User.create({ email });
      res.status(200).send(newUser);
    }
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError('Юзер не найден');
    }

    const deletedUser = await User.deleteOne(user);
    res.status(200).send(deletedUser);
  } catch (error) {
    next(error);
  }
};

const getPresentUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);

    if (!user) {
      throw new NotFoundError('Пользователь не найден');
    }

    if (user.present) {
      throw new ConflictError('У пользователя уже есть подарок');
    }

    const presents = await Present.find({});

    if (presents.length === 0) {
      throw new NotFoundError('Подарки не найдены');
    }

    const actualPresents = presents.filter((present) => present.count > 0);

    const indexPresent = randomInteger(1, actualPresents.length) - 1;

    const usersPresentId = actualPresents[indexPresent]._id;

    const newCountPresent = actualPresents[indexPresent].count - 1;

    await Present.findByIdAndUpdate(usersPresentId, {
      $set: { count: newCountPresent },
    });

    const newUser = await User.findByIdAndUpdate(
      id,
      { $set: { present: usersPresentId } },
      { new: true },
    ).populate('present');

    res.status(200).send(newUser);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getPresentUser,
  getUsers,
  deleteUser,
};
