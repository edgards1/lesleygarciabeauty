import { google } from "googleapis"
import { getDb, initModels, Business } from "@/lib/database/connection"
import { encrypt, decrypt } from "@/lib/services/encryption.service"

const SCOPES = ["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/drive.file"]

function getOAuth2Client() {
  const clientId = process.env.AUTH_GOOGLE_ID
  const clientSecret = process.env.AUTH_GOOGLE_SECRET
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/api/auth/callback/google"

  if (!clientId || !clientSecret) {
    throw new Error(
      "Faltan variables AUTH_GOOGLE_ID o AUTH_GOOGLE_SECRET"
    )
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri)
}

export function getCalendarAuthUrl(businessId: string): string {
  const oauth2 = getOAuth2Client()

  return oauth2.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
    prompt: "consent",
    state: businessId,
  })
}

export async function handleCalendarCallback(
  code: string,
  businessId: string
): Promise<void> {
  const oauth2 = getOAuth2Client()
  const { tokens } = await oauth2.getToken(code)

  if (!tokens.refresh_token) {
    throw new Error(
      "No se obtuvo refresh_token. Asegúrate de usar prompt=consent y access_type=offline."
    )
  }

  const encryptedRefreshToken = encrypt(tokens.refresh_token)
  const calendarEmail = tokens.id_token
    ? JSON.parse(Buffer.from(tokens.id_token.split(".")[1], "base64url").toString()).email
    : null

  const db = getDb()
  initModels(db)

  await Business.update(
    {
      googleRefreshToken: encryptedRefreshToken,
      googleCalendarEmail: calendarEmail,
    },
    { where: { id: businessId } }
  )
}

export async function getAuthClientForBusiness(
  businessId: string
): Promise<typeof google.auth.OAuth2.prototype | null> {
  const db = getDb()
  initModels(db)

  const business = await Business.findByPk(businessId, {
    attributes: ["googleRefreshToken"],
  })

  if (!business?.googleRefreshToken) {
    return null
  }

  const refreshToken = decrypt(business.googleRefreshToken)
  const oauth2 = getOAuth2Client()

  oauth2.setCredentials({ refresh_token: refreshToken })

  const { credentials } = await oauth2.refreshAccessToken()
  oauth2.setCredentials(credentials)

  return oauth2
}

export async function getCalendarClientForBusiness(
  businessId: string
): Promise<ReturnType<typeof google.calendar> | null> {
  const auth = await getAuthClientForBusiness(businessId)

  if (!auth) {
    return null
  }

  return google.calendar({ version: "v3", auth })
}

export async function getCalendarIdForBusiness(
  businessId: string
): Promise<string | null> {
  const db = getDb()
  initModels(db)

  const business = await Business.findByPk(businessId, {
    attributes: ["googleCalendarEmail", "slug"],
  })

  if (business?.googleCalendarEmail) {
    return business.googleCalendarEmail
  }

  return null
}
