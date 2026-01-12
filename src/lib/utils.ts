export function formatRGB(color: { r: number; g: number; b: number }) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`;
}

export function formatRGBA(
  color: { r: number; g: number; b: number },
  opacity: number,
) {
  return `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
}
