import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.png"
      alt="Company Logo"
      width={100}
      height={500}
      className={`rounded-md ${className}`}
    />
  );
}
