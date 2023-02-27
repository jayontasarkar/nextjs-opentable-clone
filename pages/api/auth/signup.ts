import { createUser, fetchUserByEmail } from "@/services/user";
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
    firstName,
    lastName,
    email,
    phone,
    city,
    password
  } = req.body;
  const errors: {[column: string]: string} = {};

  const validationSchema = [
    {
      valid: validator.isLength(firstName, {
        min: 2,
        max: 20
      }),
      errorMessage: 'First name is invalid',
      name: 'firstName'
    },
    {
      valid: validator.isLength(lastName, {
        min: 2,
        max: 20
      }),
      errorMessage: 'Last name is invalid',
      name: 'lastName'
    },
    {
      valid: validator.isEmail(email),
      errorMessage: 'Email address is invalid',
      name: 'email'
    },
    {
      valid: validator.isMobilePhone(phone),
      errorMessage: 'Phone no. is invalid',
      name: 'phone'
    },
    {
      valid: validator.isLength(city, {
        min: 2,
        max: 30
      }),
      errorMessage: 'City is invalid',
      name: 'city'
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

  const userWithEmail = await fetchUserByEmail(email);
  if (userWithEmail) {
    errors.email = 'Email is associated with another account';
    return res.status(400).json(errors);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user: User = await createUser({ ...req.body, password: hashedPassword });
  
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const alg = 'HS256';
  const token = await new jose.SignJWT({ id: user.id, email: user.email })
    .setProtectedHeader({ alg })
    .setExpirationTime('12h')
    .sign(secret);

  setCookie('jwt', token, { req, res, maxAge: 60 * 60 * 24 * 7  });

  res.status(200).json({
    message: 'New user created',
    user: {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone: user.phone,
      city: user.city,
      created_at: user.created_at,
    },
    token
  });
}