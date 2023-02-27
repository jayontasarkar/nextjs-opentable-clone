import { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';
import { fetchUserByEmail } from "@/services/user";
import { User } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      message: 'Method not allowed'
    });
  }
  let bearer = req.headers['authorization'] as string;
  bearer = bearer.split(' ')[1];

  const payload: any = jwt.decode(bearer);
    if (!payload?.email) {
      return res.status(401).json({
        message: 'Unauthorized access'
      });
    }
    const user: User | null = await fetchUserByEmail(payload.email);
    if (!user) {
      return res.status(401).json({
        message: 'Unauthorized access'
      });
    }
    return res.status(200).json({
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        city: user.city,
        created_at: user.created_at,
      }
    })
}