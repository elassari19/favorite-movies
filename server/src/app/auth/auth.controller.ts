import { Request, Response } from 'express';
import { compare, hash } from 'bcryptjs';
import { prisma } from '../../utils/configs';
import { User } from '@prisma/client';

// signUp controller
export const signUp = async (req: Request, res: Response) => {
  const { password, confirmPassword, ...rest } = req.body;
  // Hash the password with the salt
  const hashPassword = await hash(req.body.password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        ...rest,
        password: hashPassword,
      },
    });

    res.status(201).json(user);
  } catch (error) {
    console.log('prisma error', error);
    res.status(500).json({ error });
  }
};

// signIn controller
export const signIn = async (req: Request, res: Response) => {
  try {
    const user = (await prisma.user.findUnique({
      where: { email: req.body.email },
    })) as User;

    if (!user || !(await compare(req.body.password, user.password))) {
      return res.status(404).json({ error: 'Invalid email or password' });
    }

    const { password, ...rest } = user;
    // @ts-ignore
    req.session = { user: rest };
    return res
      .status(200)
      .json({ message: 'Logged in successfully', user: rest });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// signOut controller
export const signOut = async (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Something went wrong' });
    }
  });
  return res
    .status(200)
    .json({ success: true, message: 'Logged out successfully' });
};
