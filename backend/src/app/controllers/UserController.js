import User from '../models/User';

class UserController {
  async store(req, res) {
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user) {
      return res.status(400).json({ error: 'User already exists!' });
    }

    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const { email, currentPassword } = req.body;
    const user = await User.findByPk(req.userId);

    if (email !== user.email) {
      const userExists = await User.findOne({ where: { email } });

      if (userExists) {
        return res.status(400).json({ error: 'User already exists!' });
      }
    }

    if (currentPassword && !(await user.checkPassword(currentPassword))) {
      return res.status(401).json({ error: 'Password does not match!' });
    }

    const { id, name, provider } = await user.update(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
