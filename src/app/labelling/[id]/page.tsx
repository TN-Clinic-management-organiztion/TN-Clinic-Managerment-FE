import React from 'react';
import LabelingWorkspace from '@/components/labelling/LabelingWorkspace';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function WorkspacePage({ params }: PageProps) {
  const { id } = await params;

  // SỬA: Set h-screen và overflow-hidden ở đây để đảm bảo không có thanh cuộn thừa của trình duyệt
  return (
    <div className="h-screen w-screen overflow-hidden bg-gray-100">
      <LabelingWorkspace imageId={id} />
    </div>
  );
}