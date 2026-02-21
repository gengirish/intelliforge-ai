"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function WhatsAppButton() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX";
  const message = encodeURIComponent(
    "Hi! I'm interested in IntelliForge AI's services. Can we discuss?"
  );

  return (
    <motion.a
      href={`https://wa.me/${whatsappNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/30 transition-transform hover:scale-110"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </motion.a>
  );
}
