import Image from "next/image";
import { cn } from "@/lib/cn";

const DEFAULT_BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzAwIiBoZWlnaHQ9IjQ3NSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=";

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export function SmartImage({
  src,
  alt,
  width,
  height,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 700px",
  className,
  priority = false,
  fill = false,
}: SmartImageProps) {
  const isExternal = src.startsWith("http") || src.startsWith("//");
  const isSvg = src.toLowerCase().endsWith(".svg");
  const unoptimized = isExternal || isSvg;

  if (fill) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className={cn("object-cover", className)}
        placeholder={unoptimized ? "empty" : "blur"}
        blurDataURL={unoptimized ? undefined : DEFAULT_BLUR}
        loading={priority ? "eager" : "lazy"}
        unoptimized={unoptimized}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={width ?? 700}
      height={height ?? 475}
      sizes={sizes}
      className={cn("h-auto w-full", className)}
      placeholder={unoptimized ? "empty" : "blur"}
      blurDataURL={unoptimized ? undefined : DEFAULT_BLUR}
      loading={priority ? "eager" : "lazy"}
      unoptimized={unoptimized}
    />
  );
}
