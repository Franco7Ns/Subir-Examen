import type { NextAuthConfig } from 'next-auth';
import { users } from './app/lib/placeholder-data';
import type { User } from './app/lib/definitions';

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
        const foundUser = users.find(u => u.email === session.user.email);
        if (foundUser && (foundUser.role === 'profesor' || foundUser.role === 'alumno')) {
          session.user.role = foundUser.role;
        }
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user as User;
      const isLoggedIn = !!user;
      const isOnProfesor = nextUrl.pathname.startsWith('/profesor');
      const isOnAlumno = nextUrl.pathname.startsWith('/alumno');
      const isOnLogin = nextUrl.pathname === '/login';
      const isOnHome = nextUrl.pathname === '/';

      if (isLoggedIn) {
        if (isOnHome || isOnLogin) {
          return Response.redirect(new URL(user.role === 'profesor' ? '/profesor' : '/alumno', nextUrl));
        }
        const userRole = user.role;
        if (isOnProfesor && userRole !== 'profesor') {
          return Response.redirect(new URL('/alumno', nextUrl));
        }
        if (isOnAlumno && userRole !== 'alumno') {
          return Response.redirect(new URL('/profesor', nextUrl));
        }
        return true;
      }

      if (isOnProfesor || isOnAlumno) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
