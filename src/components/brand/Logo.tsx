import Link from "next/link";
import Image from "next/image";

export default function Logo({ className = "", light = false }: { className?: string; light?: boolean }) {
  return (
    <Link href="/" className={`inline-flex items-center group select-none ${className}`}>
      <Image
        src="/uploads/Prime logo.png"
        alt="Prime Automation"
        width={180}
        height={48}
        className="h-10 sm:h-12 w-auto object-contain"
        priority
      />
    </Link>
  );
}
