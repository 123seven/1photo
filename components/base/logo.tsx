import Link from "next/link";

export default function LogoIcon({ ...props }: { className?: string }) {
  return (
    <Link href="/" className="pointer flex items-center gap-2 " {...props}>
      <span
        className="bg-gradient-to-br from-[#9333EA] to-purple-400 bg-clip-text text-2xl font-bold text-transparent dark:from-blue-700"
        style={{ fontFamily: "Bahamas Bold" }}
      >
        plan
      </span>
    </Link>
  );
}
