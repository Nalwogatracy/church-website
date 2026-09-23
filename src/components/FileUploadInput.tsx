'use client';

import React, { useState } from 'react';
import { Upload, CheckCircle2, Loader2, Link as LinkIcon } from 'lucide-react';

interface FileUploadInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  accept?: string;
  required?: boolean;
}

export default function FileUploadInput({
  label,
  value,
  onChange,
  placeholder = 'Paste URL link or upload file from PC/Device',
  accept = 'image/*,video/*',
  required = false,
}: FileUploadInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setUploadStatus('Uploading file from device...');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onChange(data.url);
        setUploadStatus('File uploaded successfully!');
      } else {
        setUploadStatus('Upload failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setUploadStatus('Upload error occurred.');
    } finally {
      setIsUploading(false);
      setTimeout(() => setUploadStatus(''), 4000);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
        {label} {required && <span className="text-amber-400">*</span>}
      </label>

      {/* URL Input Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
          <LinkIcon className="w-4 h-4" />
        </div>
        <input
          type="text"
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 focus:outline-none focus:border-amber-400 text-sm"
        />
      </div>

      {/* Device File Picker Button */}
      <div className="flex items-center justify-between gap-3">
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-xs border border-slate-700 transition-all shadow-sm">
          {isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Upload className="w-4 h-4" />
          )}
          <span>{isUploading ? 'Uploading...' : '📁 Choose File from PC / Device'}</span>
          <input
            type="file"
            accept={accept}
            className="hidden"
            onChange={handleFileChange}
            disabled={isUploading}
          />
        </label>

        {uploadStatus && (
          <span className="text-xs text-amber-400 font-medium flex items-center gap-1 animate-pulse">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {uploadStatus}
          </span>
        )}
      </div>

      {/* Media Preview Box */}
      {value && (
        <div className="mt-2 p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-3">
          {value.match(/\.(mp4|webm|mov)$/i) || value.startsWith('/videos/') ? (
            <div className="w-12 h-12 bg-slate-900 rounded-lg flex items-center justify-center text-amber-400 font-bold text-[10px]">
              VIDEO
            </div>
          ) : (
            <img src={value} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-slate-800" />
          )}
          <span className="text-xs font-mono text-slate-400 truncate max-w-[240px]">{value}</span>
        </div>
      )}
    </div>
  );
}
