'use client';

import { useState } from 'react';
import { X, Upload, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File, link?: string) => void;
}

export function UploadModal({ isOpen, onClose, onUpload }: UploadModalProps) {
  const [activeTab, setActiveTab] = useState<'file' | 'link'>('file');
  const [link, setLink] = useState('');
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.size > 50 * 1024 * 1024) {
        alert('File quá lớn (tối đa 50MB)');
        return;
      }
      onUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 50 * 1024 * 1024) {
        alert('File quá lớn (tối đa 50MB)');
        return;
      }
      onUpload(file);
    }
  };

  const handleLinkSubmit = () => {
    if (link.trim()) {
      const file = new File([link], link, { type: 'text/plain' });
      onUpload(file, link);
      setLink('');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Thêm Tài Liệu</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('file')}
              className={`pb-3 font-medium text-sm transition ${
                activeTab === 'file'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Tải File
            </button>
            <button
              onClick={() => setActiveTab('link')}
              className={`pb-3 font-medium text-sm transition ${
                activeTab === 'link'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <LinkIcon className="w-4 h-4 inline mr-2" />
              Thêm Link
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'file' ? (
            <div>
              <label
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                <p className="font-medium text-gray-900 mb-1">Kéo file vào đây</p>
                <p className="text-sm text-gray-600 mb-3">hoặc click để chọn file</p>
                <p className="text-xs text-gray-500">
                  Hỗ trợ: PDF, Word, TXT, Ảnh, Audio, Video (Tối đa 50MB)
                </p>
                <input
                  type="file"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div>
              <input
                type="url"
                placeholder="https://example.com/document.pdf"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-sm text-gray-600 mt-2">
                Nhập đường link YouTube, Google Drive, hoặc bất kỳ tài liệu online nào
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button
            onClick={() => {
              if (activeTab === 'link' && link.trim()) {
                handleLinkSubmit();
              }
            }}
            disabled={activeTab === 'link' && !link.trim()}
          >
            {activeTab === 'file' ? 'Chọn File' : 'Thêm Link'}
          </Button>
        </div>
      </div>
    </div>
  );
}
