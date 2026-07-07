import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "IntelliForge AI — Enterprise Engineers Who Ship AI for India";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "#0a0b1e",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "480px",
            height: "480px",
            background:
              "radial-gradient(circle at center, rgba(99, 102, 241, 0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "6px",
            background: "linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
            }}
          >
            ⚡
          </div>
          <span
            style={{
              fontSize: "52px",
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.02em",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            IntelliForge AI
          </span>
        </div>
        <p
          style={{
            fontSize: "32px",
            fontWeight: 400,
            color: "#9ca3af",
            lineHeight: 1.4,
            maxWidth: "900px",
            margin: 0,
            fontFamily: "system-ui, sans-serif",
          }}
        >
          Enterprise Engineers Who Ship AI for India
        </p>
        <div
          style={{
            marginTop: "48px",
            display: "flex",
            gap: "12px",
          }}
        >
          <span
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(99, 102, 241, 0.15)",
              border: "1px solid rgba(99, 102, 241, 0.3)",
              color: "#a5b4fc",
              fontSize: "18px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            AI Agents
          </span>
          <span
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(139, 92, 246, 0.15)",
              border: "1px solid rgba(139, 92, 246, 0.3)",
              color: "#c4b5fd",
              fontSize: "18px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Workflow Automation
          </span>
          <span
            style={{
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(6, 182, 212, 0.1)",
              border: "1px solid rgba(6, 182, 212, 0.25)",
              color: "#67e8f9",
              fontSize: "18px",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            Hyderabad, India
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
