import { NextRequest, NextResponse } from "next/server";
import * as jose from 'jose';

export default async function handler(req: NextRequest, res: NextResponse) {
  let bearer = req.headers.get('authorization') as string;
  if (!bearer) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized access' }),
      { status: 401 }
    );
  }

  bearer = bearer.split(' ')[1];
  if (!bearer) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized access' }),
      { status: 401 }
    );
  }

  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET
  );

  try {
    await jose.jwtVerify(bearer, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Unauthorized access' }),
      { status: 401 }
    );
  }
}

export const config = {
  matcher: [
    '/api/auth/me'
  ]
};