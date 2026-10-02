import type { CSSProperties } from "react";
import type { UIAsset as AssetConfig } from "@/lib/constants/ui";

export function UIAsset({
  asset,
  className,
  style,
}: {
  asset: AssetConfig;
  className?: string;
  style?: CSSProperties;
}) {
  if (asset.src) {
    // Native images support local SVGs and remote branding without Next image configuration.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={asset.src} alt="" aria-hidden="true" className={className} style={style} />;
  }
  const Icon = asset.icon;
  return <Icon className={className} style={style} aria-hidden="true" />;
}
