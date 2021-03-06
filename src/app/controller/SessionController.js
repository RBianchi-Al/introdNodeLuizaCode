import jwt from 'jsonwebtoken';

import User from '../models/Users';
import authConfig from '../../config/auth';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ 
            where: { email } 
        });

        if (!user) {
            return res.status(401).json({ message: 'O usuário não está cadastrado' })
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ message: 'Incorret password' });
        }
        const { id, name } = user;

        return res.json({
            user: {
                id,
                email,
                name
            },
            token: jwt.sign({
                id,
                name,
                email
            },
                authConfig.secret,
                {
                    expiresIn: authConfig.expiresIn,
                }
            )
        })
    }
}

export default new SessionController();