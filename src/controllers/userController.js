const { User } = require('../models');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    const user = User.build({ name, email, password, role: role || 'user' });
    await user.save();

    return res.status(201).json({ message: 'User added successfully.' });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const messages = error.errors.map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    return res.status(500).json({ message: error.message });
  }
};

exports.createOrUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const existingUser = await User.findByPk(id);

    if (existingUser) {
      existingUser.name = name ?? existingUser.name;
      existingUser.email = email ?? existingUser.email;
      existingUser.role = role ?? existingUser.role;
      if (password) existingUser.password = password;
      await existingUser.save({ validate: false });
    } else {
      const user = User.build({
        id,
        name,
        email,
        password: password || 'defaultPassword',
        role: role || 'user',
      });
      await user.save({ validate: false });
    }

    return res.status(200).json({ message: 'User created or updated successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: 'no user found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ['role'] },
    });

    if (!user) {
      return res.status(404).json({ message: 'no user found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
