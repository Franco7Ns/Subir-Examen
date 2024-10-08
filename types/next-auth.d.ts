import NextAuth from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name?: string | null
      email?: string | null
      image?: string | null
      role?: 'profesor' | 'alumno'
    }
  }

  interface User {
    role?: 'profesor' | 'alumno'
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: 'profesor' | 'alumno'
  }
}