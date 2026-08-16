/** Генерирует SVG-заглушку в виде data URI — используется вместо реальных медиафайлов в моках. */
export function placeholderImage(
  text: string,
  colorFrom: string,
  colorTo: string,
  width = 640,
  height = 360
): string {
  // Заголовок может быть любой длины (в т.ч. на разных языках) и попадает в контейнеры
  // с разным соотношением сторон (object-fit: cover обрезает края) — размер шрифта
  // подбираем так, чтобы текст всегда помещался в кадр, а не обрезался.
  const maxTextWidth = width * 0.86;
  const avgGlyphWidthFactor = 0.55;
  const fontSizeByLength = maxTextWidth / (Math.max(text.length, 1) * avgGlyphWidthFactor);
  const fontSize = Math.round(Math.max(16, Math.min(width / 14, fontSizeByLength)));

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${colorFrom}" />
          <stop offset="100%" stop-color="${colorTo}" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)" />
      <text x="50%" y="50%" font-family="Segoe UI, Arial, sans-serif" font-size="${fontSize}" fill="rgba(255,255,255,0.92)" text-anchor="middle" dominant-baseline="middle">${escapeXml(
    text
  )}</text>
    </svg>`.trim();
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
