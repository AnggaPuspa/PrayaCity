"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { uploadMedia, listMedia, deleteMedia } from "../actions/media.actions";

interface MediaFile {
  id: string;
  name: string;
  path: string;
  url: string;
  metadata: {
    size: number;
    mimetype: string;
  };
  created_at: string;
}

export function MediaGallery() {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [folder, setFolder] = useState("events"); // default folder

  const fetchMedia = useCallback(async () => {
    setLoading(true);
    setError(null);
    const res = await listMedia(folder);
    if (res.error) {
      setError(res.error);
    } else if (res.files) {
      setFiles(res.files as any);
    }
    setLoading(false);
  }, [folder]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    setError(null);
    
    // We only handle the first file for simplicity in this example
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const res = await uploadMedia(formData);
    
    if (res.error) {
      setError(res.error);
    } else {
      // Refresh list
      await fetchMedia();
    }
    
    setUploading(false);
    // Reset input
    e.target.value = "";
  };

  const handleDelete = async (path: string) => {
    if (!confirm("Are you sure you want to delete this image?")) return;
    
    setLoading(true);
    const res = await deleteMedia(path);
    if (res.error) {
      setError(res.error);
      setLoading(false);
    } else {
      await fetchMedia();
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    alert("URL copied to clipboard!");
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl">
      {/* Upload Zone */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-100 bg-gray-50/50">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900 m-0">Upload New Media</h2>
            <select 
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              value={folder}
              onChange={(e) => setFolder(e.target.value)}
            >
              <option value="events">Events</option>
              <option value="destinations">Destinations</option>
              <option value="avatars">Avatars</option>
            </select>
          </div>
          
          <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-white hover:bg-gray-50 transition-colors">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleUpload}
              accept="image/jpeg, image/png, image/webp, image/avif"
              disabled={uploading}
            />
            {uploading ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-3"></div>
                <span className="text-gray-500 text-sm font-medium">Uploading image...</span>
              </div>
            ) : (
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="text-gray-400 mx-auto mb-4" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 0a5.53 5.53 0 0 0-3.594 1.342c-.766.66-1.321 1.52-1.464 2.383C1.266 4.095 0 5.555 0 7.318 0 9.366 1.708 11 3.781 11H7.5V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V11h4.188C14.502 11 16 9.57 16 7.773c0-1.636-1.242-2.969-2.834-3.194C12.923 1.999 10.69 0 8 0m-.5 14.5V11h1v3.5a.5.5 0 0 1-1 0"/>
                </svg>
                <h3 className="text-base font-medium text-gray-900 mb-1">Click or drag image to upload</h3>
                <p className="text-sm text-gray-500">Max size: 5MB. Formats: JPG, PNG, WEBP, AVIF</p>
              </div>
            )}
          </div>
          {error && <div className="mt-4 bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">{error}</div>}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 pt-6 pb-4 flex justify-between items-center border-b border-gray-100 bg-gray-50/50">
          <h2 className="text-lg font-semibold text-gray-900 m-0">Media Gallery</h2>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white text-gray-800 border border-gray-200 shadow-sm">
            {files.length} items
          </span>
        </div>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            </div>
          ) : files.length === 0 ? (
            <div className="text-center py-16 text-gray-400 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="mb-4 opacity-50" viewBox="0 0 16 16">
                <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3"/>
                <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2M14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1M2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10"/>
              </svg>
              No images found in this folder.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {files.map((file) => (
                <div key={file.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden group flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="relative bg-gray-100 aspect-square">
                    <Image
                      src={file.url}
                      alt={file.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 backdrop-blur-[2px]">
                      <div className="flex gap-2">
                        <button 
                          className="bg-white hover:bg-gray-100 text-gray-900 p-2 rounded-lg shadow-sm transition-colors"
                          onClick={() => copyToClipboard(file.url)}
                          title="Copy URL"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"/><path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"/></svg>
                        </button>
                        <button 
                          className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg shadow-sm transition-colors"
                          onClick={() => handleDelete(file.path)}
                          title="Delete"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                    <div className="truncate text-sm font-medium text-gray-900" title={file.name}>
                      {file.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {(file.metadata.size / 1024).toFixed(1)} KB • {new Date(file.created_at).toLocaleDateString()}
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
