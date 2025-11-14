'use client';

import { useState } from 'react';
import { Header } from '@/components/dashboard/header';
import { Sidebar } from '@/components/dashboard/sidebar';
import { DocumentList } from '@/components/dashboard/document-list';
import { UploadModal } from '@/components/dashboard/upload-modal';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function Dashboard() {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [documents, setDocuments] = useState<
    {
      id: string;
      name: string;
      type: string;
      status: 'ready' | 'processing' | 'pending';
      uploadedAt: Date;
    }[]
  >([
    {
      id: '1',
      name: 'Sample Document 1.pdf',
      type: 'pdf',
      status: 'ready',
      uploadedAt: new Date('2025-01-10'),
    },
    {
      id: '2',
      name: 'Study Material.docx',
      type: 'word',
      status: 'processing',
      uploadedAt: new Date('2025-01-12'),
    },
    {
      id: '3',
      name: 'Lecture Notes.txt',
      type: 'text',
      status: 'pending',
      uploadedAt: new Date('2025-01-14'),
    },
  ]);

  const handleUpload = (file: File, link?: string) => {
    // Placeholder logic - sẽ connect với Supabase + N8N sau
    const newDoc = {
      id: Date.now().toString(),
      name: file?.name || link || 'New Document',
      type: file?.type.split('/')[1] || 'link',
      status: 'pending' as const,
      uploadedAt: new Date(),
    };
    setDocuments([newDoc, ...documents]);
    setIsUploadOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            {/* Page Title & Action */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Tài Liệu</h1>
                <p className="text-gray-600 mt-1">Quản lý và học tập từ tài liệu của bạn</p>
              </div>
              <Button
                onClick={() => setIsUploadOpen(true)}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Thêm Tài Liệu
              </Button>
            </div>

            {/* Document List */}
            <DocumentList documents={documents} />
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
}
