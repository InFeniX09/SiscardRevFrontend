import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";
import axios from "axios";
import { environment } from "@/src/environments/environment";

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
      console.log({ auth });
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
        console.log(email + ' - ' +Contrasena)

        try {
          const response = await api.post("/auth/buscarUsuario", {
            pUsuario:email
          });
          const user = response.data.Query3;
        
          console.log(response)
          console.log(user)


          if (!user) {
            return null; // Handle invalid credentials
          }

          if( Contrasena !== user.Contrasena ) return null;


          const { Contrasena: _, ...rest } = user; // Remove password from response
          return rest;
        } catch (error) {
          console.error(error);
          return null; // Handle API errors
        }
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);