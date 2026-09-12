'use client';

/**
 * PURPOSE:
 * Renders the Event Poster upload and preview hero banner on the event edit page (/events/[id]/edit).
 * Presents a large, prominent banner (matching SingleEventPage's EventHero aspect) with ambient backdrop,
 * hover overlay to change poster, remove button, and dashed upload state.
 *
 * CONTEXT/PARENT FILE:
 * Mounted in 'app/events/[id]/edit/EditEventClient.tsx'.
 *
 * INPUTS / PARAMETERS:
 * - previewUrl (string | null): Resolved public URL or object URL for poster preview.
 * - onFileChange ((file: File) => void): Callback triggered when user selects a new image file.
 * - onRemovePoster (() => void): Callback triggered when user clicks remove image button.
 */

import React, { useRef } from 'react';
import Image from 'next/image';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

interface PosterUploadSectionProps {
  previewUrl: string | null;
  onFileChange: (file: File) => void;
  onRemovePoster: () => void;
}

export default function PosterUploadSection({
  previewUrl,
  onFileChange,
  onRemovePoster,
}: PosterUploadSectionProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileChange(files[0]);
    }
    // Reset file input value so selecting the same file again still fires change
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full flex flex-col gap-3">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <ImageOutlinedIcon sx={{ fontSize: 17, color: '#4bbca9' }} />
          <span>Event Poster Banner</span>
        </div>
        <span className="text-[11px] font-medium text-slate-400">
          Changes are auto-saved to storage
        </span>
      </div>

      {/* Hero-Scale Poster Container */}
      {previewUrl ? (
        <div className="relative w-full h-[260px] sm:h-[340px] md:h-[380px] bg-gradient-to-br from-teal-50/70 via-slate-50 to-teal-100/30 border border-slate-200/90 rounded-2xl overflow-hidden group shadow-sm flex items-center justify-center cursor-pointer transition-all duration-200">
          {/* Ambient Blurred Light Backdrop */}
          <Image
            src={previewUrl}
            alt="Poster Backdrop Ambient"
            fill
            unoptimized
            aria-hidden="true"
            className="object-cover blur-3xl opacity-20 scale-110 pointer-events-none"
            priority
          />

          {/* Centered Contained Poster */}
          <div className="relative w-full h-full p-4 sm:p-6 md:p-8 flex items-center justify-center z-10 pointer-events-none">
            <Image
              src={previewUrl}
              alt="Event Poster Preview"
              fill
              unoptimized
              className="object-contain drop-shadow-md rounded-xl"
              priority
            />
          </div>

          {/* Hover Overlay with Change Prompt */}
          <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2 z-20 pointer-events-none">
            <div className="px-4 py-2 rounded-lg bg-white/95 text-slate-800 text-xs font-bold uppercase tracking-wider shadow-lg flex items-center gap-2 border border-white/60">
              <CloudUploadOutlinedIcon sx={{ fontSize: 18, color: '#3ea694' }} />
              <span>Change Poster Image</span>
            </div>
            <span className="text-[11px] text-white/95 font-medium drop-shadow">
              Click anywhere to upload a replacement banner
            </span>
          </div>

          {/* Remove Button (Top Right) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onRemovePoster();
            }}
            className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 hover:bg-rose-50 border border-slate-200 text-rose-500 hover:text-rose-700 shadow-sm flex items-center justify-center cursor-pointer transition-all z-30"
            title="Remove poster image"
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </button>

          {/* Hidden File Input covering the container */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={handleInputChange}
          />
        </div>
      ) : (
        /* Empty Upload Hero Container */
        <div className="relative w-full h-[220px] sm:h-[280px] md:h-[320px] bg-gradient-to-br from-teal-50/50 via-white to-slate-50 border-2 border-dashed border-teal-200/80 hover:border-[#4bbca9] rounded-2xl flex flex-col items-center justify-center p-6 text-center transition-all group cursor-pointer overflow-hidden shadow-2xs">
          {/* Subtle Background SVG Grid */}
          <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none">
            <defs>
              <pattern id="upload-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#00a89d" strokeDasharray="2 4" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#upload-grid)" />
          </svg>

          <div className="relative z-10 flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-[#3ea694] group-hover:scale-110 transition-transform shadow-xs">
              <AddPhotoAlternateOutlinedIcon sx={{ fontSize: 30 }} />
            </div>
            <div className="space-y-1">
              <p className="text-sm md:text-base font-bold text-slate-800 tracking-tight">
                Upload Event Poster Banner
              </p>
              <p className="text-xs text-slate-500 max-w-sm">
                Click or drop an image file here. Recommended high-resolution landscape banner format (PNG, JPG, WebP).
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00a89d] bg-white border border-teal-200/80 px-4 py-1.5 rounded-lg shadow-2xs uppercase tracking-wider group-hover:bg-teal-50 transition-colors">
              <CloudUploadOutlinedIcon sx={{ fontSize: 16 }} />
              <span>Browse Image File</span>
            </span>
          </div>

          {/* Hidden File Input covering the empty container */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer z-10"
            onChange={handleInputChange}
          />
        </div>
      )}
    </div>
  );
}
