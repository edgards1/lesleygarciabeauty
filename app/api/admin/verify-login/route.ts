import { getDb, initModels, Usuario } from "@/lib/database/connection"
import bcrypt from "bcryptjs"
import { encode } from "next-auth/jwt"
import { createHash } from "crypto"

const COOKIE_PREFIX = createHash("sha256")
  .update(process.env.AUTH_SECRET || "")
  .digest("hex")
  .substring(0, 8)

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return Response.json({ error: "Email y contraseña requeridos" }, { status: 400 })
    }

    const db = getDb()
    initModels(db)

    const usuario = await Usuario.findOne({ where: { email } })

    if (!usuario) {
      return Response.json({ error: "Credenciales incorrectas" }, { status: 401 })
    }

    const isHashed = usuario.password.startsWith("$2")
    const valid = isHashed
      ? await bcrypt.compare(password, usuario.password)
      : password === usuario.password

    if (!valid) {
      return Response.json({ error: "Credenciales incorrectas" }, { status: 401 })
    }

    const cookieName = `${COOKIE_PREFIX}.session-token`
    const maxAge = 30 * 24 * 60 * 60

    const token = await encode({
      secret: process.env.AUTH_SECRET!,
      salt: cookieName,
      token: { id: usuario.id, name: usuario.nombre, email: usuario.email },
      maxAge,
    })

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Set-Cookie": `${cookieName}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`,
        },
      }
    )
  } catch {
    return Response.json({ error: "Error interno" }, { status: 500 })
  }
}
