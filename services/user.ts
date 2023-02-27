import { TAuthInputs } from "@/app/components/AuthModalInputs";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchUserByEmail = async(email: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email
    }
  });

  return user;
};

export const createUser = async(user: TAuthInputs): Promise<User> => {
  const createdUser = await prisma.user.create({
    data: {
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      phone: user.phone,
      city: user.city,
      password: user.password,
    }
  });

  return createdUser;
};