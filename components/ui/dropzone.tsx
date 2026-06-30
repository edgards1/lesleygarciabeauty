"use client"

import { useCallback, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface DropzoneProps {
  onFile: (file: { base64: string; name: string }) => void
  accept?: string
  maxSizeMB?: number
  label?: string
  className?: string
}

export function Dropzone({
  onFile,
  accept = "image/*",
  maxSizeMB = 5,
  label = "Arrastra o haz clic para subir el comprobante",
  className,
}: DropzoneProps) {
  const [dragOver, setDragOver] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      setError(null)
      if (!file.type.startsWith("image/")) {
        setError("Solo se permiten imágenes")
        return
      }
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`El archivo no debe superar ${maxSizeMB}MB`)
        return
      }
      setFileName(file.name)
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        const base64 = result.split(",")[1]
        onFile({ base64, name: file.name })
      }
      reader.readAsDataURL(file)
    },
    [onFile, maxSizeMB]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragOver(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300",
        dragOver
          ? "border-stone-900 bg-stone-50 dark:border-stone-100 dark:bg-stone-800"
          : "border-stone-300 dark:border-stone-600 hover:border-stone-400 dark:hover:border-stone-500",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
      {fileName ? (
        <div className="space-y-1">
          <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
            {fileName}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">
            Haz clic para cambiar el archivo
          </p>
        </div>
      ) : (
        <div className="space-y-1">
          <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 dark:bg-stone-800">
            <svg
              className="h-5 w-5 text-stone-500 dark:text-stone-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400">{label}</p>
          <p className="text-xs text-stone-400 dark:text-stone-500">
            PNG, JPG, WEBP — Máx {maxSizeMB}MB
          </p>
        </div>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-500 dark:text-red-400">{error}</p>
      )}
    </div>
  )
}
