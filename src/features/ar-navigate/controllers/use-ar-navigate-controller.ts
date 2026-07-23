"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import type { ArGpsStatus, ArLatLng, ArNavigateDestination } from "../types";
import { DEFAULT_AR_DESTINATION } from "../types";

export type ArCameraStatus =
  | "idle"
  | "requesting"
  | "ready"
  | "denied"
  | "unsupported";

/** Approximate walking speed used for ETA (km/h). */
const WALK_KMH = 4.5;

function haversineKm(a: ArLatLng, b: ArLatLng) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

function formatDistance(km: number) {
  if (km < 1) return `${Math.max(1, Math.round(km * 1000))} m`;
  return `${km.toFixed(km < 10 ? 1 : 0).replace(".", ",")} km`;
}

function formatDuration(km: number) {
  const minutes = Math.max(1, Math.round((km / WALK_KMH) * 60));
  if (minutes < 60) return `${minutes} menit`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m ? `${h} jam ${m} mnt` : `${h} jam`;
}

interface UseArNavigateControllerOptions {
  destination?: ArNavigateDestination | null;
}

export function useArNavigateController({
  destination: destinationProp,
}: UseArNavigateControllerOptions = {}) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const watchIdRef = useRef<number | null>(null);

  const destination = destinationProp ?? DEFAULT_AR_DESTINATION;
  const destinationPoint: ArLatLng = {
    lat: destination.latitude,
    lng: destination.longitude,
  };

  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<ArCameraStatus>("idle");
  const [gpsStatus, setGpsStatus] = useState<ArGpsStatus>("idle");
  const [userLocation, setUserLocation] = useState<ArLatLng | null>(null);

  const attachStreamToVideo = useCallback(async (stream: MediaStream) => {
    const video = videoRef.current;
    if (!video) return false;

    if (video.srcObject !== stream) {
      video.srcObject = stream;
    }

    await video.play().catch(() => undefined);
    return true;
  }, []);

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, []);

  const stopGps = useCallback(() => {
    if (watchIdRef.current != null && navigator.geolocation) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCameraStatus("unsupported");
      return;
    }

    setCameraStatus("requesting");

    try {
      let stream = streamRef.current;
      const hasLiveTrack = stream?.getVideoTracks().some((t) => t.readyState === "live");

      if (!stream || !hasLiveTrack) {
        stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });
        streamRef.current = stream;
      }

      const attached = await attachStreamToVideo(stream);
      setCameraStatus(attached ? "ready" : "requesting");
    } catch {
      setCameraStatus("denied");
      stopCamera();
    }
  }, [attachStreamToVideo, stopCamera]);

  const startGps = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setGpsStatus("unsupported");
      return;
    }

    setGpsStatus("requesting");

    watchIdRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setGpsStatus("ready");
      },
      () => {
        setGpsStatus("denied");
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 12000,
      },
    );
  }, []);

  // Portal mount + body scroll lock
  useEffect(() => {
    setMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      stopCamera();
      stopGps();
    };
  }, [stopCamera, stopGps]);

  // Start camera + GPS after portal can mount.
  useEffect(() => {
    if (!mounted) return;
    void startCamera();
    startGps();
  }, [mounted, startCamera, startGps]);

  // Re-attach stream if video node was late.
  useEffect(() => {
    if (!mounted) return;
    if (cameraStatus !== "requesting") return;
    if (!streamRef.current) return;

    let cancelled = false;
    let attempts = 0;

    const tryAttach = async () => {
      attempts += 1;
      const stream = streamRef.current;
      if (!stream || cancelled) return;

      const attached = await attachStreamToVideo(stream);
      if (attached && !cancelled) {
        setCameraStatus("ready");
        return;
      }

      if (attempts < 12 && !cancelled) {
        window.setTimeout(() => {
          void tryAttach();
        }, 50);
      }
    };

    void tryAttach();
    return () => {
      cancelled = true;
    };
  }, [mounted, cameraStatus, attachStreamToVideo]);

  const distanceKm = userLocation
    ? haversineKm(userLocation, destinationPoint)
    : null;

  const distanceLabel = distanceKm != null ? formatDistance(distanceKm) : "—";
  const durationLabel = distanceKm != null ? formatDuration(distanceKm) : "—";

  const handleClose = useCallback(() => {
    stopCamera();
    stopGps();
    router.back();
  }, [router, stopCamera, stopGps]);

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const handleRetryCamera = useCallback(() => {
    void startCamera();
  }, [startCamera]);

  const handleViewDetail = useCallback(() => {
    stopCamera();
    stopGps();
    router.push(`/destinations/${destination.id}`);
  }, [destination.id, router, stopCamera, stopGps]);

  return {
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
  };
}
