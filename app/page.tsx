import Image from "next/image";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Test Button Shadcn/UI</h1>
      <Button>Click me</Button>
    </div>
  );
}
