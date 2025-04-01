import prismaClient from "../../prisma";

class ListAllUserService {
  async execute() {
    try {
      // Listando todas as categorias que estão cadastradas no banco de dados
      const user = await prismaClient.user.findMany({
        // Escolhendo quais das opções das categorias encontradas serão mostradas
        select: {
          id: true,
          name: true,
          email: true,
          password: false,
          created_at: true,
          updated_at:true
        },
      });
      if (user.length === 0) {
        throw new Error("No cUser found");
      }
      return user;
    } catch (error) {
      console.error("Erro ao listar user:", error);
      throw new Error("Erro ao listar user");
    }
  }
}

export { ListAllUserService };
