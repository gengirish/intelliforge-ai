"use client";

import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

function ContactFormFallback() {
  return (
    <div className="flex items-center justify-center py-12">
      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
    </div>
  );
}

export function ContactPageForm() {
  return (
    <Suspense fallback={<ContactFormFallback />}>
      <ContactForm />
    </Suspense>
  );
}
