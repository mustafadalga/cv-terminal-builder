import { RGBColor } from "@/types";

function hexToRgb(hex: string): RGBColor {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function mergeOpacityWithRGB(rgbColor: RGBColor, opacity: number): string {
  const { r, g, b } = rgbColor;
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}


export {
  hexToRgb,
  mergeOpacityWithRGB,
};
