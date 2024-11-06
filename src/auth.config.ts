import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import axios from "axios";
import { environment } from "@/src/environments/environment";
import { User } from "@nextui-org/react";

const api = axios.create({
  baseURL: environment.baseUrl,
  headers: { "Content-Type": "application/json" },
});

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/iniciar-sesion",
    newUser: "/auth/registrarse",
  },

  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      // const isLoggedIn = !!auth?.user;

      // const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      // if (isOnDashboard) {
      //   if (isLoggedIn) return true;
      //   return false; // Redirect unauthenticated users to login page
      // } else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },

    session({ session, token, user }) {
      session.user = token.data as any;
      return session;
    },
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string(), Contrasena: z.string() })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, Contrasena } = parsedCredentials.data;

        try {
          const response = await api.post("/auth/buscarUsuario", {
            pUsuario: email,
            nuevosDatos: {
              Online: "1",
            },
          });

          const user = response.data.Query3;

          if (!user) {
            return null; // Handle invalid credentials
          } else if (Contrasena !== user.Clave) return null;
          else {
            const { Contrasena: _, ...rest } = user; // Remove password from response
            /**ACTUALIZAR EL ESTADO DEL ONLINE, CUANDO INICIA SESION  */
            return rest;
          }
        } catch (error) {
          console.error(error);
          return null; // Handle API errors
        }
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
