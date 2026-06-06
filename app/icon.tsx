import { ImageResponse } from "next/og";

/** PNG favicon — Chrome ignores SVG favicons; /favicon.ico is rewritten here in next.config.ts */
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            color: "white",
            fontSize: 20,
            lineHeight: 1,
            marginTop: -2,
          }}
        >
          ⚡
        </div>
      </div>
    ),
    { ...size },
  );
}
