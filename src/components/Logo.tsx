import Link from "next/link";
import { siteConfig } from "@/lib/config";

function LogoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="shrink-0 rounded-full"
    >
      <circle cx="100" cy="100" r="96" fill="#2D5016" />
      <circle cx="100" cy="100" r="88" fill="#F5F0E8" />
      <text
        x="100"
        y="95"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="18"
        fontWeight="bold"
        fill="#2D5016"
      >
        PARK
      </text>
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="14"
        fontWeight="bold"
        fill="#447834"
      >
        STATION
      </text>
      <circle cx="100" cy="138" r="4" fill="#43A047" />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export function Logo({ className = "", showSubtitle = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoIcon />
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

export { LogoIcon };
