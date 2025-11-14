import Link from "next/link";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-white font-bold">AI</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">AI Learning Hub</h1>
          <p className="text-gray-600 text-lg">Học thông minh từ tài liệu của bạn</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <p className="text-gray-600">
            Sử dụng AI để tóm tắt, tạo flashcards, trả lời câu hỏi và tìm kiếm thông tin từ tài liệu.
          </p>

          <div className="space-y-3">
            <Link href="/dashboard" className="block">
              <Button className="w-full h-12 text-base">
                Vào Dashboard
              </Button>
            </Link>
            <Link href="/auth/login" className="block">
              <Button variant="outline" className="w-full h-12 text-base">
                Đăng Nhập
              </Button>
            </Link>
          </div>

          <p className="text-sm text-gray-500">
            Bắt đầu miễn phí, không cần thẻ tín dụng
          </p>
        </div>
      </div>
    </div>
  );
}
