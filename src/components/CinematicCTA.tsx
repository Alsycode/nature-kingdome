import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import React, { useRef, useState } from "react";

export default function CinematicCTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", notes: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll parallax for deep wilderness nighttime backdrop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.02]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["40px", "-45px"]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsModalOpen(false);
      setFormData({ name: "", email: "", notes: "" });
    }, 2800);
  };

  return (
    <section
      ref={containerRef}
      id="reserve"
      className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#050505]"
    >
      {/* Immersive cinematic background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          style={{ y: bgY, scale: imgScale }}
          className="absolute -top-[15%] -bottom-[15%] left-0 right-0"
        >
          <img
            alt="The illuminated night villa canopy under Chikkamagaluru stars"
            className="w-full h-full object-cover brightness-[0.38] contrast-[1.05]"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9f1-jhuuEwHXI073pkhzu7w9VYbkneLrpra594XVVeVcJ3hkrVUWpebJYsXuQBnQPm-sZzpP_6NQR7eaTJK9pOegxItQjvT3G-VmQkmUdKGJxCVEwo8V6e8fQ5IofvPtoQf8RaOLvnlRJ4RU4Jp0Jx9DIA13_nRoRoOoCV6FZhczRTEejFr5VhICfMQeA_WJtVwgYcJylGRfScZw8B0kYRB0elVi22mnU2yjj-eUJ2JOSg-pq0gTI2XyctZ-Dxr1zVyWvpRp0_zGg"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Deep cinematic gradient vignetting */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] opacity-90" />
        <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      </div>

      {/* Floating Centered Narrative details */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 text-center max-w-5xl px-6 flex flex-col items-center space-y-8"
      >
        {/* Micro aesthetic element */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="w-16 h-[1px] bg-[#e9c349]/50"
        />

        <span className="text-xs sm:text-sm tracking-[0.45em] font-light text-[#e9c349] uppercase block font-sans">
          The Final Act
        </span>

        {/* Oversized Cinematic Typography */}
        <h2 className="font-headline text-5xl sm:text-7xl lg:text-[110px] leading-[1.02] text-on-surface font-light tracking-tighter">
          The Forest <br className="sm:hidden" />
          <span className="italic font-light text-[#bdcac0]">Is Waiting.</span>
        </h2>

        {/* Quietly focused supporting copy */}
        <p className="font-sans font-light text-base sm:text-lg lg:text-xl text-on-surface/70 max-w-xl mx-auto leading-relaxed tracking-wide">
          Leave the noise behind and rediscover what matters.
        </p>

        {/* One Primary Action Button of Luxury Caliber */}
        <div className="pt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="group relative inline-flex items-center justify-center px-12 py-5 border border-on-surface/25 bg-surface text-[#e9c349] hover:bg-[#e9c349] hover:text-surface transition-all duration-700 ease-in-out text-xs sm:text-sm tracking-[0.3em] uppercase overflow-hidden"
          >
            <span className="relative z-10 font-sans font-medium">
              Begin The Transition — Enquire
            </span>
            <div className="absolute inset-0 bg-[#e9c349] origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500 ease-[0.16, 1, 0.3, 1]" />
          </button>
        </div>
      </motion.div>

      {/* Subtle signature metadata elements in margins */}
      <div className="absolute bottom-10 left-10 text-[9px] font-mono tracking-[0.4em] text-on-surface/20 uppercase hidden md:block">
        © NATURE KINGDOM RETREATS
      </div>
      <div className="absolute bottom-10 right-10 text-[9px] font-mono tracking-[0.4em] text-on-surface/20 uppercase hidden md:block">
        ESTABLISHED 2026 — CHIKKAMAGALURU
      </div>

      {/* ULTRA LUXURY MINIMAL MODAL ENQUIRY OVERLAY */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="bg-[#0b0c0b] border border-on-surface/10 max-w-lg w-full p-8 sm:p-12 relative flex flex-col justify-between"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 text-on-surface/50 hover:text-on-surface transition-colors font-mono text-sm tracking-widest uppercase py-2 px-1"
              >
                [ CLOSE ]
              </button>

              <div className="space-y-6">
                <span className="text-[10px] tracking-[0.3em] text-[#e9c349] font-mono uppercase block">
                  Private Sanctuary Allocation
                </span>
                <h3 className="font-headline text-3xl sm:text-4xl text-on-surface leading-tight font-light">
                  Reserve Your Place.
                </h3>
                <p className="font-sans font-light text-xs sm:text-sm text-on-surface/60 leading-relaxed">
                  Due to our commitment to preservation, Nature Kingdom allocates only five cabins to maintain the quiet essence of the forest. Leave your contact details below to initiate booking.
                </p>
              </div>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-4"
                >
                  <span className="text-3xl text-[#e9c349]">✦</span>
                  <p className="font-headline text-xl text-on-surface">We Have Heard Your Call.</p>
                  <p className="font-sans font-light text-xs text-on-surface/45">
                    Our estate host will reach out to you within a single sun cycle.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <div className="space-y-1 group">
                    <label className="text-[9px] tracking-[0.25em] text-[#e9c349]/80 uppercase block font-sans">
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-on-surface/20 focus:border-[#e9c349] py-2 text-sm text-on-surface outline-none transition-colors duration-300 font-sans font-light"
                      placeholder="e.g., Katherine Pierce"
                    />
                  </div>

                  <div className="space-y-1 group">
                    <label className="text-[9px] tracking-[0.25em] text-[#e9c349]/80 uppercase block font-sans">
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-transparent border-b border-on-surface/20 focus:border-[#e9c349] py-2 text-sm text-on-surface outline-none transition-colors duration-300 font-sans font-light"
                      placeholder="e.g., katherine@epure.com"
                    />
                  </div>

                  <div className="space-y-1 group">
                    <label className="text-[9px] tracking-[0.25em] text-[#e9c349]/80 uppercase block font-sans">
                      Special requests or preferred season
                    </label>
                    <textarea
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      rows={2}
                      className="w-full bg-transparent border-b border-on-surface/20 focus:border-[#e9c349] py-2 text-sm text-on-surface outline-none transition-colors duration-300 font-sans font-light resize-none"
                      placeholder="e.g., Autumn canopy escape..."
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full py-4 bg-[#e9c349] text-surface font-sans text-[11px] font-semibold tracking-[0.25em] uppercase hover:bg-on-surface-variant hover:text-on-surface transition-all duration-500 rounded-[1px]"
                    >
                      Submit Booking Enquiry
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
