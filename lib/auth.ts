import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import { getDb, initModels, Business, Usuario, BUSINESS_SLUG } from "@/lib/database/connection"
import { encrypt } from "@/lib/services/encryption.service"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: [
            "openid",
            "email",
            "profile",
            "https://www.googleapis.com/auth/calendar",
            "https://www.googleapis.com/auth/drive.file",
          ].join(" "),
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const db = getDb()
          initModels(db)

          const usuario = await Usuario.findOne({
            where: { email: credentials.email as string },
          })

          if (!usuario) {
            return null
          }

          const isHashed = usuario.password.startsWith("$2")
          const valid = isHashed
            ? await bcrypt.compare(credentials.password as string, usuario.password)
            : credentials.password === usuario.password

          if (!valid) {
            return null
          }

          return {
            id: usuario.id,
            name: usuario.nombre,
            email: usuario.email,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const adminEmail = process.env.ADMIN_EMAIL
        if (user.email !== adminEmail) return false

        if (account.refresh_token) {
          try {
            const encrypted = encrypt(account.refresh_token)
            const db = getDb()
            initModels(db)

            const business = await Business.findOne({
              where: { slug: BUSINESS_SLUG },
            })

            if (business) {
              await business.update({
                googleRefreshToken: encrypted,
                googleCalendarEmail: user.email,
              })
            }
          } catch (err) {
            console.error("Error saving Google tokens:", err)
          }
        }

        return true
      }

      return true
    },
    async jwt({ token, user, account }) {
      if (account) {
        token.id = user?.id
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
      }
      return session
    },
  },
  session: { strategy: "jwt" },
})
