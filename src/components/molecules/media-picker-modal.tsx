"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { listMedia } from "@/features/dashboard/actions/media.actions";

interface MediaFile {
  id: string;
  name: string;
  path: string;
  url: string;
  metadata: { size: number; mimetype: string };
  created_at: string;
}

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ isOpen, onClose, onSelect }: MediaPickerModalProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [folder, setFolder] = useState("events");

  useEffect(() => {
    if (!isOpen) return;
    
    let isMounted = true;
    
    const fetchMedia = async () => {
      setLoading(true);
      const res = await listMedia(folder);
      if (isMounted && res.files) {
        setFiles(res.files as any);
      }
      if (isMounted) setLoading(false);
    };
    
    fetchMedia();
    
    return () => { isMounted = false; };
  }, [isOpen, folder]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1050] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 m-0">Select Image</h2>
          <div className="flex items-center gap-4">
            <select 
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            >
              <option value="events">Events</option>
              <option value="destinations">Destinations</option>
              <option value="avatars">Avatars</option>
            </select>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50/30">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-16 text-gray-400 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="mb-4 opacity-50" viewBox="0 0 16 16">
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10"/>
              </svg>
              <p>No images found in this folder.</p>
              <p className="text-sm mt-2">Upload images in the Media Library first.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {files.map((file) => (
                <div 
                  key={file.id} 
                  className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden group cursor-pointer hover:border-blue-500 hover:shadow-md transition-all relative flex flex-col"
                  onClick={() => {
                    onSelect(file.url);
                    onClose();
                  }}
                >
                  <div className="relative bg-gray-100 aspect-square">
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                    <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-2 border-t border-gray-100 bg-white">
                    <div className="truncate text-xs font-medium text-gray-700" title={file.name}>
                      {file.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
