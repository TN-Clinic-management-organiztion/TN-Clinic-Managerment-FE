import React from 'react';
import ImageGallery from '@/components/labelling/ImageGallery';

export default function LabellingPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Workstation Gallery</h1>
        <p className="text-gray-500 mb-8">Quản lý và gán nhãn dữ liệu hình ảnh y tế</p>
        <ImageGallery />
      </div>
    </div>
  );
}