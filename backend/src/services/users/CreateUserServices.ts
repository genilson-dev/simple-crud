import prismaClient from "../../prisma";
import { UserRequest } from "../../interface/createUserRequest";

import { hash } from "bcryptjs";
class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error("Usuario já existe no banco de dados");
    }
    // Verificar se o email já consta no banco de dados
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      // Escolhendo o que vai ser retornado para o usuário quando ele for cadastrado
      select: {
        id: true,
        name: true,
        email: true,
        password: false,
      },
    });
    return user;
  }
}

export default CreateUserService;
