import type { NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {

    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) {
        if (url.includes('/profesor') || url.includes('/alumno')) {
          return url;
        }
        return baseUrl;
      }
      return baseUrl;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.role = user.email === 'profesor@gmail.com' ? 'profesor' : 'alumno';
      }
      return token;
    },

    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isLoggedIn = !!user;
      const isOnProfesor = nextUrl.pathname.startsWith('/profesor');
      const isOnAlumnos = nextUrl.pathname.startsWith('/alumno');

      if (isLoggedIn && user) {
        const userRole = user.role;
        if (isOnProfesor && userRole !== 'profesor') {
          return Response.redirect(new URL('/alumno', nextUrl));
        }
        if (isOnAlumnos && userRole !== 'alumno') {
          return Response.redirect(new URL('/profesor', nextUrl));
        }
        return true;
      }

      if (isOnProfesor || isOnAlumnos) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;