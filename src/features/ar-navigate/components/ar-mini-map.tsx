"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, Polyline, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ArLatLng } from "../types";

interface ArMiniMapProps {
  user: ArLatLng | null;
  destination: ArLatLng;
  className?: string;
}

function createUserIcon() {
  return L.divIcon({
    className: "ar-map-pin",
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    html: `
      <div style="
        width:18px;height:18px;border-radius:999px;
        background:#0066FF;border:2.5px solid #fff;
        box-shadow:0 0 0 6px rgba(0,102,255,0.22), 0 4px 10px rgba(0,0,0,0.25);
      "></div>
    `,
  });
}

function createDestinationIcon() {
  return L.divIcon({
    className: "ar-map-pin",
    iconSize: [28, 36],
    iconAnchor: [14, 34],
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;">
        <div style="
          width:22px;height:22px;border-radius:999px;
          background:#EF4444;border:2px solid #fff;
          box-shadow:0 4px 10px rgba(0,0,0,0.28);
        "></div>
        <div style="
          width:0;height:0;
          border-left:6px solid transparent;
          border-right:6px solid transparent;
          border-top:8px solid #EF4444;
          margin-top:-1px;
        "></div>
      </div>
    `,
  });
}

function FitRoute({
  user,
  destination,
}: {
  user: ArLatLng | null;
  destination: ArLatLng;
}) {
  const map = useMap();
  const lastKey = useRef("");

  useEffect(() => {
    const key = user
      ? `${user.lat.toFixed(5)},${user.lng.toFixed(5)}|${destination.lat.toFixed(5)},${destination.lng.toFixed(5)}`
      : `dest|${destination.lat.toFixed(5)},${destination.lng.toFixed(5)}`;

    // Avoid thrashing flyTo on every tiny GPS tick — only reframe when points move meaningfully.
    if (key === lastKey.current) return;
    lastKey.current = key;

    if (user) {
      const bounds = L.latLngBounds(
        [user.lat, user.lng],
        [destination.lat, destination.lng],
      );
      map.fitBounds(bounds.pad(0.35), { animate: true, duration: 0.6 });
    } else {
      map.setView([destination.lat, destination.lng], 13, { animate: true });
    }
  }, [destination.lat, destination.lng, map, user]);

  return null;
}

function InvalidateSizeOnReady() {
  const map = useMap();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => map.invalidateSize());
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, [map]);

  return null;
}

/**
 * Compact Leaflet map for the AR HUD: user + destination + simple route line.
 * Mounts only after the host has a real size (Leaflet requires measurable container).
 */
export function ArMiniMap({ user, destination, className }: ArMiniMapProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [canMount, setCanMount] = useState(false);

  const userIcon = useMemo(() => createUserIcon(), []);
  const destinationIcon = useMemo(() => createDestinationIcon(), []);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let mounted = true;
    const tryMount = () => {
      if (!mounted) return false;
      if (host.clientWidth > 0 && host.clientHeight > 0) {
        setCanMount(true);
        return true;
      }
      return false;
    };

    if (tryMount()) return;

    const observer = new ResizeObserver(() => {
      if (tryMount()) observer.disconnect();
    });
    observer.observe(host);

    const timer = window.setTimeout(() => setCanMount(true), 150);

    return () => {
      mounted = false;
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const center: [number, number] = user
    ? [(user.lat + destination.lat) / 2, (user.lng + destination.lng) / 2]
    : [destination.lat, destination.lng];

  const linePositions: [number, number][] | null = user
    ? [
        [user.lat, user.lng],
        [destination.lat, destination.lng],
      ]
    : null;

  return (
    <div
      ref={hostRef}
      className={className}
      aria-label="Peta mini navigasi AR"
    >
      {canMount ? (
        <MapContainer
          key="ar-mini-map"
          center={center}
          zoom={13}
          minZoom={10}
          maxZoom={18}
          zoomControl={false}
          attributionControl={false}
          scrollWheelZoom={false}
          dragging
          doubleClickZoom={false}
          className="h-full w-full rounded-2xl"
          style={{ height: "100%", width: "100%", background: "#EAF2FF" }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            subdomains="abcd"
          />
          <InvalidateSizeOnReady />
          <FitRoute user={user} destination={destination} />

          {linePositions && (
            <Polyline
              positions={linePositions}
              pathOptions={{
                color: "#0066FF",
                weight: 3,
                opacity: 0.75,
                dashArray: "6 8",
              }}
            />
          )}

          {user && (
            <Marker position={[user.lat, user.lng]} icon={userIcon} />
          )}
          <Marker
            position={[destination.lat, destination.lng]}
            icon={destinationIcon}
          />
        </MapContainer>
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#EAF2FF] text-[11px] text-zinc-500">
          Memuat peta…
        </div>
      )}
    </div>
  );
}
