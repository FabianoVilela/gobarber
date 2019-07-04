// import * as Yup from 'yup';

import User from '../models/User';
import Upload from '../models/Upload';
// import authConfig from '../../config/auth';

class ProviderController {
  // Validação
  async index(req, res) {
    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   email: Yup.string()
    //     .email()
    //     .required(),
    //   password: Yup.string()
    //     .min(6)
    //     .required(),
    // });

    // if (!(await schema.isValid(req.body))) {
    //   return res.status(401).json({ error: 'Validation fails' });
    // }

    const providers = await User.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: Upload,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    // if (user) {
    //   return res.status(400).json({ error: 'User already exists!' });
    // }

    // const { id, name, email, provider } = await User.create(req.body);

    // return res.json({
    //   id,
    //   name,
    //   email,
    //   provider,
    // });

    return res.json({ providers });
  }
}

export default new ProviderController();
