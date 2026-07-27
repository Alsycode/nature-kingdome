"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
}

const WHATSAPP_NUMBER = "919900101868";

export default function EnquiryModal({ open, onClose }: EnquiryModalProps) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = `Hi, I'd like to enquire about a stay at Nature Kingdom.\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}\n\n(Sent via naturekingdomhomestay.com website)`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    setSent(true);
  }

  function handleClose() {
    onClose();
    setTimeout(() => { setForm({ name: "", phone: "", message: "" }); setSent(false); }, 400);
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-x-4 bottom-4 sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[201] w-full sm:max-w-md bg-[#0a0f0b] border border-[#e9c349]/15 rounded-2xl p-7 sm:p-9"
          >
            {/* Close */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={16} />
            </button>

            {!sent ? (
              <>
                <span className="text-[9px] tracking-[0.38em] font-sans font-medium text-[#e9c349] uppercase block mb-3">
                  Quick Enquiry
                </span>
                <h2 className="font-headline text-2xl text-white mb-1">
                  Ask Us Anything
                </h2>
                <p className="font-sans font-light text-xs text-white/40 leading-relaxed mb-7">
                  Fill in your details and we'll open WhatsApp so you can send your message directly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">WhatsApp Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-white/40 mb-1.5 tracking-wide uppercase">Your Question</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. Is the property available for 4 people in July?"
                      value={form.message}
                      onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-[#e9c349]/50 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#e9c349] text-[#0a0f0b] font-semibold text-sm py-3.5 rounded-xl hover:bg-[#e9c349]/90 transition mt-1"
                  >
                    Send via WhatsApp
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-12 h-12 rounded-full bg-[#e9c349]/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-[#e9c349] text-xl">✓</span>
                </div>
                <h2 className="font-headline text-2xl text-white mb-2">WhatsApp Opened</h2>
                <p className="font-sans font-light text-xs text-white/40 leading-relaxed mb-6">
                  Your message has been pre-filled. Just hit send in WhatsApp and we'll get back to you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="text-[10px] tracking-[0.25em] uppercase text-[#e9c349]/60 hover:text-[#e9c349] transition"
                >
                  Close
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
