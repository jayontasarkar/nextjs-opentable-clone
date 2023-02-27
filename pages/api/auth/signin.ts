import { fetchUserByEmail } from "@/services/user";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { User } from "@prisma/client";
import { setCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      statusCode: 405,
      message: 'Method not allowed.'
    });
  }
  const {
    email,
    password
  } = req.body;
  const errors: {[column: string]: string} = {};

  const validationSchema = [
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email address is invalid',
      name: 'email'
    },
    {
      valid: validator.isStrongPassword(password),
      errorMessage: 'Password is invalid',
      name: 'password'
    },
  ];

  validationSchema.forEach((check) => {
    if (!check.valid) {
      errors[check.name] = check.errorMessage;
    }
  });

  if (Object.keys(errors).length) {
    return res.status(400).json({ errors });
  }

  const userWithEmail: User | null = await fetchUserByEmail(email);
  if (!userWithEmail) {
    return res.status(400).json({ errors: { email: 'Email address does not exist.' } });
  }
  const isPasswordMatch = await bcrypt.compare(password, userWithEmail.password);
  if (!isPasswordMatch) {
    return res.status(400).json({ errors: { password: 'Login password is incorrect.' } });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = 'HS256';
  const token = await new jose.SignJWT({ id: userWithEmail.id, email: userWithEmail.email })
    .setProtectedHeader({ alg })
    .setExpirationTime('12h')
    .sign(secret);

  setCookie('jwt', token, { req, res, maxAge: 60 * 60 * 24 * 7  });  

  res.status(200).json({
    message: 'User signed in',
    user: {
      id: userWithEmail.id,
      first_name: userWithEmail.first_name,
      last_name: userWithEmail.last_name,
      email: userWithEmail.email,
      phone: userWithEmail.phone,
      city: userWithEmail.city,
      created_at: userWithEmail.created_at,
    },
    token
  });
}