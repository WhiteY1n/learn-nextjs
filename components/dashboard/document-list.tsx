'use client';

import { FileText, Clock, CheckCircle, Loader } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'pending' | 'processing' | 'ready';
  uploadedAt: Date;
}

interface DocumentListProps {
  documents: Document[];
}

const statusConfig = {
  pending: {
    label: 'Chờ Xử Lý',
    color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    icon: Clock,
  },
  processing: {
    label: 'Đang Xử Lý',
    color: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Loader,
  },
  ready: {
    label: 'Sẵn Sàng',
    color: 'bg-green-50 text-green-700 border-green-200',
    icon: CheckCircle,
  },
};

export function DocumentList({ documents }: DocumentListProps) {
  if (documents.length === 0) {
    return (
      <div className="text-center py-16">
        <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có tài liệu</h3>
        <p className="text-gray-600">Hãy upload tài liệu đầu tiên của bạn để bắt đầu</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {documents.map((doc) => {
        const config = statusConfig[doc.status];
        const StatusIcon = config.icon;

        return (
          <div
            key={doc.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 truncate">{doc.name}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {doc.uploadedAt.toLocaleDateString('vi-VN')}
                </p>
              </div>
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center ml-2 flex-shrink-0">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${config.color}`}>
                <StatusIcon className="w-4 h-4" />
                {config.label}
              </div>
            </div>

            {/* Progress Bar (only for processing) */}
            {doc.status === 'processing' && (
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: '65%' }}
                  ></div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-gray-100">
              <button className="flex-1 text-sm font-medium text-blue-600 hover:bg-blue-50 py-2 rounded transition">
                Xem Chi Tiết
              </button>
              {doc.status === 'ready' && (
                <button className="flex-1 text-sm font-medium text-gray-600 hover:bg-gray-50 py-2 rounded transition">
                  Học Tập
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
