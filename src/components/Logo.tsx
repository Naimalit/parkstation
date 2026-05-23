import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function Logo({ className = "", showSubtitle = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <Image
        src="/logo/logo.svg"
        alt={siteConfig.shortName}
        width={48}
        height={48}
        className="rounded-full"
        priority
      />
      <div>
        <p className="font-display text-lg font-bold leading-tight text-forest-800">
          {siteConfig.shortName}
        </p>
        {showSubtitle && (
          <p className="text-xs text-forest-600">@ Park Chair</p>
        )}
      </div>
    </div>
  );
}

export function LogoLink({
  href,
  showSubtitle = false,
}: {
  href: string;
  showSubtitle?: boolean;
}) {
  return (
    <Link href={href} className="flex items-center gap-3">
      <Logo showSubtitle={showSubtitle} />
    </Link>
  );
}
