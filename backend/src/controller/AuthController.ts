import { getRepository } from 'typeorm';
import { Request, Response } from 'express';
import { Users } from '../entity/Users';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { validate } from 'class-validator';

class AuthController {
  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).json({ message: ' Username & Password are required!' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail({ where: { email } });
    } catch (e) {
      return res.status(400).json({ message: ' Username or password incorecct!' });
    }

    // Check password
    if (!user.checkPassword(password)) {
      return res.status(400).json({ message: 'Username or Password are incorrect!' });
    }

    const token = jwt.sign({ userId: user.id, username: user.email }, config.jwtSecret, { expiresIn: '1h' });

    res.json({ message: 'OK', token, userId: user.id});
  };

  static changePassword = async (req: Request, res: Response) => {
    const { userId } = res.locals.jwtPayload;
    const { oldPassword, newPassword } = req.body;

    if (!(oldPassword && newPassword)) {
      res.status(400).json({ message: 'Old password & new password are required' });
    }

    const userRepository = getRepository(Users);
    let user: Users;

    try {
      user = await userRepository.findOneOrFail(userId);
    } catch (e) {
      res.status(400).json({ message: 'Something went wrong!' });
    }

    if (!user.checkPassword(oldPassword)) {
      return res.status(401).json({ message: 'Check your old Password' });
    }

    user.password = newPassword;
    const validationOps = { validationError: { target: false, value: false } };
    const errors = await validate(user, validationOps);

    if (errors.length > 0) {
      return res.status(400).json(errors);
    }

    // Hash password
    user.hashPassword();
    userRepository.save(user);

    res.json({ message: 'Password change!' });
  };

  static test = async (req: Request, res: Response) => {
    const { num } = req.body;

    if(num%2 == 0){
      return res.status(200).json({ message: 'Number is even' });
    }
    else{
      return res.status(400).json({ message: 'Number is NOT even' });
    }
  };
}
export default AuthController;
