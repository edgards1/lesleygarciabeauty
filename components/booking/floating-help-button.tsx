"use client"

import { WHATSAPP_NUMBER, WHATSAPP_MESSAGE } from "@/lib/config/booking.config"
import { FaWhatsapp } from "react-icons/fa"

export function FloatingHelpButton() {
  function handleClick() {
    window.open(
      `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${WHATSAPP_MESSAGE}asesor%C3%ADa`,
      "_blank"
    )
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={handleClick}
        className="group flex items-center gap-3 rounded-full bg-[#2D1B13] px-5 py-3 text-[#FDFBF7] shadow-xl shadow-black/10 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.97] hover:bg-[#C4956A]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105 group-hover:-translate-y-[1px]">
          <FaWhatsapp className="h-4 w-4 text-[#FDFBF7]" />
        </span>
        <div className="text-left">
          <p className="font-sans text-[10px] font-bold uppercase tracking-[0.15em] text-[#FDFBF7]/60">
            ¿Hablamos?
          </p>
          <p className="font-sans text-[13px] font-semibold text-[#FDFBF7]">
            Te atiendo personalmente
          </p>
        </div>
      </button>
    </div>
  )
}
