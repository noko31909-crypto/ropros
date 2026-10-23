export const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;
const ACCEPTED = /^image\/(jpeg|png|webp)$/;

export type ResizeError = "type" | "size" | "read" | "notImage";
export type Resized = { blob: Blob; ext: "jpg" | "webp"; type: "image/jpeg" | "image/webp"; previewUrl: string; ratio: number };

/** Validate a picked photo and downscale it client-side (max 1600px) to WebP, falling back to JPEG. Rejects with a ResizeError code. */
export function readAndResize(file: File, max = 1600): Promise<Resized> {
  return new Promise((resolve, reject) => {
    if (!ACCEPTED.test(file.type)) return reject("type" satisfies ResizeError);
    if (file.size > MAX_UPLOAD_BYTES) return reject("size" satisfies ResizeError);
    const src = URL.createObjectURL(file);
    const img = new Image();
    img.onerror = () => { URL.revokeObjectURL(src); reject("notImage" satisfies ResizeError); };
    img.onload = () => {
      URL.revokeObjectURL(src);
      const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement("canvas");
      c.width = Math.max(1, Math.round(img.naturalWidth * k));
      c.height = Math.max(1, Math.round(img.naturalHeight * k));
      const ctx = c.getContext("2d");
      if (!ctx) return reject("read" satisfies ResizeError);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      const done = (blob: Blob | null) => {
        if (!blob || blob.size > MAX_UPLOAD_BYTES) return reject((blob ? "size" : "read") satisfies ResizeError);
        const webp = blob.type === "image/webp";
        resolve({ blob, ext: webp ? "webp" : "jpg", type: webp ? "image/webp" : "image/jpeg", previewUrl: URL.createObjectURL(blob), ratio: c.width / c.height });
      };
      c.toBlob((b) => (b && b.type === "image/webp" ? done(b) : c.toBlob(done, "image/jpeg", 0.85)), "image/webp", 0.85);
    };
    img.src = src;
  });
}
