"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "@/i18n/navigation";

export type ArCameraStatus =
  | "idle"
  | "requesting"
  | "ready"
  | "denied"
  | "unsupported";

export function useArNavigateController() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cameraStatus, setCameraStatus] = useState<ArCameraStatus>("idle");

  const attachStreamToVideo = useCallback(async (stream: MediaStream) => {
    const video = videoRef.current;
    if (!video) return false;

    if (video.srcObject !== stream) {
      video.srcObject = stream;
    }

    // iOS Safari often needs an explicit play() after attaching the stream.
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

  const startCamera = useCallback(async () => {
    if (typeof navigator === "undefined" || !navigator.mediaDevices?.getUserMedia) {
      setCameraStatus("unsupported");
      return;
    }

    setCameraStatus("requesting");

    try {
      // Reuse an existing live stream if the user retries quickly.
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

  // Portal mount + body scroll lock
  useEffect(() => {
    setMounted(true);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
      stopCamera();
    };
  }, [stopCamera]);

  // Start camera after the portal (and <video>) has a chance to mount.
  useEffect(() => {
    if (!mounted) return;
    void startCamera();
  }, [mounted, startCamera]);

  // If getUserMedia resolved before the <video> node existed, re-attach once
  // the element is painted (status still "requesting" with a live stream).
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

  const handleClose = useCallback(() => {
    stopCamera();
    router.back();
  }, [router, stopCamera]);

  const handleToggleMute = useCallback(() => {
    setMuted((prev) => !prev);
  }, []);

  const handleRetryCamera = useCallback(() => {
    void startCamera();
  }, [startCamera]);

  return {
    videoRef,
    mounted,
    muted,
    cameraStatus,
    handleClose,
    handleToggleMute,
    handleRetryCamera,
  };
}
