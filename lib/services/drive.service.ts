import { google } from "googleapis"
import { Readable } from "stream"
import { getAuthClientForBusiness } from "./calendar-oauth.service"

export async function uploadReceiptToDrive(
  businessId: string,
  base64Content: string,
  originalFileName: string
): Promise<{ fileId: string; webViewLink: string } | null> {
  try {
    const auth = await getAuthClientForBusiness(businessId)
    if (!auth) {
      console.warn("No auth client for Drive upload — business has no Google token")
      return null
    }

    const drive = google.drive({ version: "v3", auth })
    const ext = originalFileName.split(".").pop() || "png"
    const mimeType = ext === "pdf" ? "application/pdf" : `image/${ext}`
    const timestamp = Date.now()

    const buf = Buffer.from(base64Content, "base64")

    const response = await drive.files.create({
      requestBody: {
        name: `comprobante_${timestamp}_${originalFileName}`,
      },
      media: {
        mimeType,
        body: Readable.from(buf),
      },
      fields: "id,webViewLink",
    })

    if (!response.data.id) {
      return null
    }

    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: { role: "reader", type: "anyone" },
    })

    return {
      fileId: response.data.id,
      webViewLink: response.data.webViewLink!,
    }
  } catch (error) {
    console.error("Error uploading receipt to Google Drive:", error)
    return null
  }
}
