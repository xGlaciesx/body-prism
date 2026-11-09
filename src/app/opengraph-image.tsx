import { ImageResponse } from "next/og";

/**
 * 分享卡片（1200×630，Open Graph 标准尺寸）。
 *
 * 为什么卡片上只有英文：这张图由 satori 用内置字体渲染，
 * 内置字体没有中文字形，写中文会变成一排方框。与其赌运行环境有没有装中文字体，
 * 不如把这张图设计成纯拉丁字母——它在微信、飞书、评审系统里看起来同样是完整的。
 */
export const alt = "Body Prism — three lenses on one body";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#f7f2e8";
const INK = "#1c1a17";
const MUTED = "#6f675c";
const LENSES = [
  { name: "STRUCTURE", color: "#a6474f" },
  { name: "RELATIONSHIP", color: "#c98a3e" },
  { name: "INFORMATION", color: "#2f8f9d" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: PAPER,
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 18,
              height: 18,
              backgroundColor: INK,
              transform: "rotate(45deg)",
            }}
          />
          <div style={{ fontSize: 26, color: MUTED, letterSpacing: 6 }}>
            AI WEB CHALLENGE 2026
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 132,
              lineHeight: 1.05,
              color: INK,
              letterSpacing: -2,
            }}
          >
            Body Prism
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 40,
              lineHeight: 1.35,
              color: MUTED,
              maxWidth: 900,
            }}
          >
            The model gives you an answer. We show you what it stands on.
          </div>
        </div>

        <div style={{ display: "flex", gap: 20 }}>
          {LENSES.map((lens) => (
            <div
              key={lens.name}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                borderTop: `6px solid ${lens.color}`,
                paddingTop: 18,
              }}
            >
              <div style={{ fontSize: 22, color: lens.color, letterSpacing: 3 }}>
                {lens.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
