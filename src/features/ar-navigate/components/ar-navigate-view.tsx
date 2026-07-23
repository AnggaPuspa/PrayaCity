"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { createPortal } from "react-dom";
import type { RefObject } from "react";
import type { ArCameraStatus } from "../controllers/use-ar-navigate-controller";
import type { ArGpsStatus, ArLatLng, ArNavigateDestination } from "../types";

const ArMiniMap = dynamic(
  () => import("./ar-mini-map").then((m) => m.ArMiniMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#EAF2FF] text-[11px] text-zinc-500">
        Memuat peta…
      </div>
    ),
  },
);

/* ── inline SVG icons ───────────────────────── */
function CompassIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}
function PinIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function SoundIcon({ muted }: { muted: boolean }) {
  return muted ? (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  ) : (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  );
}
function ScanIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <rect x="7" y="7" width="10" height="10" rx="1" />
    </svg>
  );
}
function WavesIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  );
}
function ArrowIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 11l19-9-9 19-2-8-8-2z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ── single animated chevron ─────────────────── */
function Chevron({ delay, id }: { delay: number; id: string }) {
  return (
    <div className="ar-chevron" style={{ animationDelay: `${delay}s` }}>
      <svg width="80" height="44" viewBox="0 0 80 44" fill="none">
        <path
          d="M4 40L40 6L76 40"
          stroke={`url(#${id})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <defs>
          <linearGradient id={id} x1="40" y1="40" x2="40" y2="6" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3B82F6" stopOpacity="0.15" />
            <stop offset="1" stopColor="#60A5FA" stopOpacity="0.95" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

function cameraBadgeCopy(status: ArCameraStatus) {
  switch (status) {
    case "ready":
      return { title: "Menggunakan AR", subtitle: "Arahkan kamera ke jalan" };
    case "requesting":
      return { title: "Mengaktifkan kamera…", subtitle: "Izinkan akses kamera" };
    case "denied":
      return { title: "Mode demo", subtitle: "Kamera ditolak — pakai fallback" };
    case "unsupported":
      return { title: "Mode demo", subtitle: "Kamera tidak tersedia" };
    default:
      return { title: "Menggunakan AR", subtitle: "Menyiapkan…" };
  }
}

function gpsHint(status: ArGpsStatus) {
  switch (status) {
    case "ready":
      return "GPS aktif";
    case "requesting":
      return "Mencari GPS…";
    case "denied":
      return "GPS ditolak";
    case "unsupported":
      return "GPS tidak tersedia";
    default:
      return "Menyiapkan GPS…";
  }
}

export interface ArNavigateViewProps {
  videoRef: RefObject<HTMLVideoElement | null>;
  mounted: boolean;
  muted: boolean;
  cameraStatus: ArCameraStatus;
  gpsStatus: ArGpsStatus;
  userLocation: ArLatLng | null;
  destination: ArNavigateDestination;
  destinationPoint: ArLatLng;
  distanceLabel: string;
  durationLabel: string;
  handleClose: () => void;
  handleToggleMute: () => void;
  handleRetryCamera: () => void;
  handleViewDetail: () => void;
}

/* ── main view ───────────────────────────────── */
export function ArNavigateView({
  videoRef,
  mounted,
  muted,
  cameraStatus,
  gpsStatus,
  userLocation,
  destination,
  destinationPoint,
  distanceLabel,
  durationLabel,
  handleClose,
  handleToggleMute,
  handleRetryCamera,
  handleViewDetail,
}: ArNavigateViewProps) {
  if (!mounted) return null;

  const badge = cameraBadgeCopy(cameraStatus);
  const showFallback = cameraStatus !== "ready";
  const imageSrc = destination.imageSrc || "/destination/detaildestination/kuta-mandalika-detail.jpg";
  const subtitle = destination.subtitle || "Destinasi unggulan di Praya";

  return createPortal(
    <div className="fixed inset-0 z-[10000] overflow-hidden select-none bg-zinc-900">
      {/* ── live camera / fallback world ── */}
      <div className="absolute inset-0">
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          className={`object-cover transition-opacity duration-500 ${
            cameraStatus === "ready" ? "opacity-0" : "opacity-100"
          }`}
        />

        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            cameraStatus === "ready" ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="ar-world-grade pointer-events-none absolute inset-0" />
        <div className="ar-scanlines pointer-events-none absolute inset-0" />
        <div className="ar-reticle pointer-events-none absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2" />
      </div>

      {/* ── branding top-left ── */}
      <div className="absolute top-5 left-5 z-10 flex flex-col">
        <span className="text-white text-xl font-bold leading-none drop-shadow-md">Praya</span>
        <span className="text-white/70 text-[11px] mt-0.5 drop-shadow">Praya City Guide</span>

        <div className="mt-4 w-14 h-14 rounded-full bg-zinc-900/55 border border-white/15 backdrop-blur-md flex items-center justify-center shadow-lg shadow-black/20">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-400 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="white">
              <polygon points="6,0 8,5 6,4 4,5" />
              <polygon points="6,12 8,7 6,8 4,7" opacity="0.4" />
            </svg>
          </div>
        </div>
      </div>

      {/* ── AR badge top-center ── */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 z-10">
        <div className="bg-zinc-900/55 backdrop-blur-md border border-white/15 rounded-full px-6 py-2.5 text-center shadow-lg shadow-black/20">
          <p className="text-white text-sm font-semibold flex items-center justify-center gap-2">
            {cameraStatus === "ready" && (
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
            )}
            {badge.title}
          </p>
          <p className="text-white/65 text-[11px]">{badge.subtitle}</p>
        </div>

        {showFallback && (
          <button
            type="button"
            onClick={handleRetryCamera}
            className="mt-2 mx-auto block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur-sm hover:bg-white/20 transition-colors cursor-pointer"
          >
            Coba aktifkan kamera
          </button>
        )}
      </div>

      {/* ── close btn top-right ── */}
      <button
        type="button"
        onClick={handleClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-full bg-zinc-900/55 backdrop-blur-md border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-zinc-800/80 transition-colors cursor-pointer shadow-lg shadow-black/20"
      >
        <XIcon />
      </button>

      {/* ── destination card center-top ── */}
      <div className="absolute top-[14%] left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <div className="bg-blue-600/95 rounded-2xl px-5 py-4 flex items-center gap-4 shadow-2xl shadow-blue-600/30 min-w-[260px] border border-white/15 backdrop-blur-sm">
          <div className="text-white/80 flex-shrink-0">
            <WavesIcon />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-bold text-[15px] leading-snug">{destination.title}</h2>
            <p className="text-blue-100 text-sm mt-0.5">{distanceLabel}</p>
          </div>
          <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-white">
            <ArrowIcon />
          </div>
        </div>

        <button
          type="button"
          className="px-5 py-2 rounded-full border border-white/30 bg-black/25 backdrop-blur-md text-white text-[11px] font-bold tracking-widest uppercase cursor-default shadow-lg shadow-black/20"
        >
          Ikuti Arah Panah
        </button>
      </div>

      {/* ── animated chevrons + ground glow ── */}
      <div className="absolute bottom-[16%] left-1/2 -translate-x-1/2 z-[5] flex flex-col-reverse items-center gap-1 pointer-events-none">
        <div className="ar-ground-glow" />
        {[0, 0.18, 0.36, 0.54].map((delay, i) => (
          <Chevron key={i} delay={delay} id={`ar-chevron-grad-${i}`} />
        ))}
      </div>

      {/* ── right toolbar ── */}
      <div className="absolute right-5 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-5">
        {[
          { icon: <CompassIcon />, label: "Kompas" },
          { icon: <PinIcon />, label: "Tujuan" },
          {
            icon: <SoundIcon muted={muted} />,
            label: "Suara",
            onClick: handleToggleMute,
          },
        ].map(({ icon, label, onClick }) => (
          <button
            key={label}
            type="button"
            onClick={onClick}
            className="ar-toolbar-btn"
            aria-label={label}
          >
            {icon}
            <span className="ar-toolbar-label">{label}</span>
          </button>
        ))}

        <div className="mt-2">
          <button
            type="button"
            onClick={handleRetryCamera}
            className="ar-toolbar-btn !bg-zinc-800/80 !border-white/25"
            aria-label="Pindai"
          >
            <ScanIcon />
            <span className="ar-toolbar-label font-bold tracking-wider">PINDAI</span>
          </button>
        </div>
      </div>

      {/* ── bottom-left: destination card + mini map ── */}
      <div className="absolute bottom-5 left-5 z-10 flex flex-col gap-3 w-[min(300px,calc(100vw-7.5rem))]">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3 shadow-2xl shadow-black/40 border border-white/40">
          <div className="relative flex-shrink-0 w-[68px] h-[68px] rounded-xl overflow-hidden">
            <Image
              src={imageSrc}
              alt={destination.title}
              fill
              className="object-cover"
              sizes="68px"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-zinc-900 font-bold text-sm leading-tight">{destination.title}</h3>
            <p className="text-blue-600 text-[12px] font-semibold mt-0.5">
              {distanceLabel} • {durationLabel}
            </p>
            <p className="text-zinc-500 text-[11px] mt-0.5 truncate">{subtitle}</p>
            <button
              type="button"
              onClick={handleViewDetail}
              className="text-blue-600 text-[12px] font-semibold mt-1 hover:underline cursor-pointer"
            >
              Lihat Detail &gt;
            </button>
          </div>
        </div>

        {/* Mini map */}
        <div className="ar-mini-map-shell relative h-[148px] w-full overflow-hidden rounded-2xl border border-white/35 shadow-2xl shadow-black/40">
          <ArMiniMap
            user={userLocation}
            destination={destinationPoint}
            className="absolute inset-0 h-full w-full"
          />
          <div className="pointer-events-none absolute left-2 top-2 rounded-full bg-zinc-900/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white backdrop-blur-sm">
            <span
              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                gpsStatus === "ready"
                  ? "bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]"
                  : "bg-amber-300"
              }`}
            />
            {gpsHint(gpsStatus)}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
