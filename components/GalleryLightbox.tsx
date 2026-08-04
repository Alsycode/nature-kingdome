"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function videoPoster(url: string) {
  return url.replace("/upload/", "/upload/so_0/").replace(/\.mp4$/, ".jpg");
}

export default function GalleryLightbox({
  photos,
  videos,
}: {
  photos: string[];
  videos: string[];
}) {
  const [photoIndex, setPhotoIndex] = useState<number | null>(null);
  const [videoIndex, setVideoIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const closeAll = () => {
    setPhotoIndex(null);
    setVideoIndex(null);
  };

  useEffect(() => {
    if (photoIndex === null && videoIndex === null) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
      if (photoIndex !== null) {
        if (e.key === "ArrowRight") setPhotoIndex((i) => (i === null ? i : (i + 1) % photos.length));
        if (e.key === "ArrowLeft") setPhotoIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [photoIndex, videoIndex, photos.length]);

  useEffect(() => {
    if (videoIndex !== null && videoRef.current) {
      videoRef.current.play().catch(() => {});
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen().catch(() => {});
      }
    }
  }, [videoIndex]);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {photos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setPhotoIndex(i)}
            className="relative aspect-square overflow-hidden border border-white/5 group cursor-zoom-in"
            aria-label={`Open photo ${i + 1} fullscreen`}
          >
            <Image
              src={src}
              alt={`Nature Kingdom Homestay photo ${i + 1}`}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <h2 className="font-headline text-xl sm:text-2xl text-on-surface mt-16 mb-6 text-center">Videos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {videos.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setVideoIndex(i)}
            className="relative w-full aspect-video border border-white/5 bg-black overflow-hidden group cursor-pointer"
            aria-label={`Play video ${i + 1} fullscreen`}
          >
            <Image
              src={videoPoster(src)}
              alt={`Nature Kingdom Homestay video ${i + 1} thumbnail`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-60"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-14 h-14 rounded-full bg-black/50 border border-white/30 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                <span className="ml-1 border-y-[9px] border-y-transparent border-l-[14px] border-l-white" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {photoIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeAll}
        >
          <button
            type="button"
            onClick={closeAll}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPhotoIndex((i) => (i === null ? i : (i - 1 + photos.length) % photos.length));
            }}
            className="absolute left-3 sm:left-6 text-white/70 hover:text-white transition-colors duration-200 z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={32} />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setPhotoIndex((i) => (i === null ? i : (i + 1) % photos.length));
            }}
            className="absolute right-3 sm:right-6 text-white/70 hover:text-white transition-colors duration-200 z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={32} />
          </button>
          <div
            className="relative w-full h-full max-w-6xl max-h-[85vh] mx-6"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[photoIndex]}
              alt={`Nature Kingdom Homestay photo ${photoIndex + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

      {videoIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={closeAll}
        >
          <button
            type="button"
            onClick={closeAll}
            className="absolute top-5 right-5 text-white/70 hover:text-white transition-colors duration-200 z-10"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          <video
            ref={videoRef}
            key={videos[videoIndex]}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
            onEnded={closeAll}
            className="w-full h-full max-w-6xl max-h-[85vh] mx-6"
          >
            <source src={videos[videoIndex]} type="video/mp4" />
          </video>
        </div>
      )}
    </>
  );
}
