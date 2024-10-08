import type { NextAuthConfig } from 'next-auth';
import { JWT } from 'next-auth/jwt';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async signIn({ user }) {
      if (user.email === 'profesor@gmail.com' || user.email === 'alumno@gmail.com') {
        return true; // Permitir el inicio de sesión para profesor y alumno
      }
      return false; // Denegar el inicio de sesión para otros emails
    },
    async redirect({ url, baseUrl }) {
      // Manejar la redirección después del inicio de sesión
      if (url.startsWith(baseUrl)) {
        if (url.includes('/profesor') || url.includes('/alumno')) {
          return url;
        }
        return baseUrl; // Redirigir a la página principal si no es /profesor o /alumnos
      }
      return baseUrl;
    },
    async session({ session, token }) {
      // Añadir el rol del usuario a la sesión
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
          // Si es alumno intentando acceder a /profesor, redirigir a /alumnos
          return Response.redirect(new URL('/alumno', nextUrl));
        }
        if (isOnAlumnos && userRole !== 'alumno') {
          // Si es profesor intentando acceder a /alumnos, redirigir a /profesor
          return Response.redirect(new URL('/profesor', nextUrl));
        }
        return true; // Permitir acceso a usuarios autenticados a sus respectivas rutas
      }

      // Si no está autenticado y trata de acceder a rutas protegidas, redirigir a login
      if (isOnProfesor || isOnAlumnos) {
        return Response.redirect(new URL('/login', nextUrl));
      }

      return true; // Permitir acceso a rutas públicas
    },
  },
  providers: [], // Añade los proveedores según sea necesario
} satisfies NextAuthConfig;