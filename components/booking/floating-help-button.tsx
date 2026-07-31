"use client"

import { motion } from "motion/react"
import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/config/booking.config"
import { FaWhatsapp } from "react-icons/fa"

export function FloatingHelpButton() {
  function handleClick() {
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${WHATSAPP_MESSAGE}asesoria`,
      "_blank"
    )
  }

  return (
    <motion.div
      className="fixed bottom-3 right-3 z-50 sm:bottom-5 sm:right-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1], delay: 0.4 }}
    >
      <motion.button
        type="button"
        onClick={handleClick}
        aria-label="Contactar por WhatsApp"
        className="group flex items-center gap-2.5 rounded-full bg-[#25D366] p-2.5 text-white shadow-lg shadow-[#25D366]/30 sm:px-4 sm:py-2.5"
        whileHover={{ scale: 1.03, backgroundColor: "#1EBE5D" }}
        whileTap={{ scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 transition-transform duration-500 group-hover:scale-105">
          <FaWhatsapp className="h-3.5 w-3.5 text-white" />
        </span>
        <div className="hidden text-left sm:block">
          <p className="font-sans text-[9px] font-bold uppercase tracking-[0.15em] text-white/70">
            ¿Hablamos?
          </p>
          <p className="font-sans text-[12px] font-semibold leading-tight text-white">
            Te atiendo personalmente
          </p>
        </div>
      </motion.button>
    </motion.div>
  )
}
