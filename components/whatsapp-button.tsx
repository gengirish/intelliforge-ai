"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "918555960837";
  const message = encodeURIComponent(
    "Hi! I'm interested in IntelliForge AI's services. Can we discuss?"
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      <span className="rounded-full bg-green-500/90 px-2.5 py-1 text-xs font-semibold text-white shadow-md sm:hidden">
        Chat
      </span>
      <motion.a
        href={`https://wa.me/${whatsappNumber}?text=${message}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-110"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-green-500 opacity-30" />
        <span className="absolute -inset-1 animate-pulse rounded-full border-2 border-green-400/60" />
        <MessageCircle className="relative h-7 w-7" />
      </motion.a>
    </div>
  );
}
