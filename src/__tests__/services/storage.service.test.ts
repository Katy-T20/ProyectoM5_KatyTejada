import { describe, it, expect, vi, beforeEach } from "vitest";
import { uploadProductImage } from "@/services/storage.service";

describe("storage.service - uploadProductImage", () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn();
  });

  it("sube la imagen y devuelve la URL pública", async () => {
    const mockFile = new File(["contenido"], "foto.jpg", {
      type: "image/jpeg",
    });

    (globalThis.fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            uploadUrl: "https://s3.amazonaws.com/bucket/signed-url",
            publicUrl: "https://bucket.s3.amazonaws.com/products/foto.jpg",
          }),
      })
      .mockResolvedValueOnce({
        ok: true,
      });

    const result = await uploadProductImage(mockFile);

    expect(result).toBe("https://bucket.s3.amazonaws.com/products/foto.jpg");
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });

  it("lanza un error si falla la subida a S3", async () => {
    const mockFile = new File(["contenido"], "foto.jpg", {
      type: "image/jpeg",
    });

    (globalThis.fetch as ReturnType<typeof vi.fn>)
      .mockResolvedValueOnce({
        ok: true,
        json: () =>
          Promise.resolve({
            uploadUrl: "https://s3.amazonaws.com/bucket/signed-url",
            publicUrl: "https://bucket.s3.amazonaws.com/products/foto.jpg",
          }),
      })
      .mockResolvedValueOnce({
        ok: false,
      });

    await expect(uploadProductImage(mockFile)).rejects.toThrow(
      "No se pudo subir la imagen a S3",
    );
  });
});
