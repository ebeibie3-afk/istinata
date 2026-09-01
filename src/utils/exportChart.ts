export function exportSvgToPng(svgElementId: string, filename: string): void {
  const container = document.getElementById(svgElementId);
  const svg = container?.querySelector('svg');
  if (!svg) return;

  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const img = new Image();

  const svgRect = svg.getBoundingClientRect();
  const width = svgRect.width || 1200;
  const height = svgRect.height || 800;

  // 2x Retina Resolution
  canvas.width = width * 2;
  canvas.height = height * 2;

  img.onload = () => {
    if (ctx) {
      ctx.fillStyle = '#020617'; // Forensic dark navy background
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      const a = document.createElement('a');
      a.download = `${filename}.png`;
      a.href = canvas.toDataURL('image/png');
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
}

export function exportSvgDirect(svgElementId: string, filename: string): void {
  const container = document.getElementById(svgElementId);
  const svg = container?.querySelector('svg');
  if (!svg) return;

  const svgString = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.svg`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
