import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      IdUsuario:number,
      Usuario:string,
      Clave:string,
      Correo:string,
      Telefono:string,
      FcIngreso:string,
      FcBaja:string | null,
      Puesto_id:number,
      PerfilUsuarios
    } & DefaultSession["user"];
  }
}
