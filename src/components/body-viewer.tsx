"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import {
  HOTSPOTS,
  VIEW_ORBIT,
  WHOLE_BODY_ORBIT,
  WHOLE_BODY_TARGET,
  type OrganSlug,
} from "@/data/anatomy-hotspots";

/** 热点上的简称（热点文件里肺是「左肺/右肺」，进页面要用器官名）。 */
const ORGAN_LABEL: Record<OrganSlug, string> = {
  brain: "脑",
  heart: "心",
  lung: "肺",
  liver: "肝",
  kidney: "肾",
  stomach: "胃",
  spleen: "脾",
  gallbladder: "胆",
  "small-intestine": "小肠",
  "large-intestine": "大肠",
  bladder: "膀胱",
};

type Status = "loading" | "ready" | "failed";

/**
 * 三维身体模型。
 *
 * 三个必须做对的地方（任何一处不对，页面都不报错，只是模型不出现）：
 * 1. model-viewer 只在浏览器里 import——它碰 window，服务端渲染会炸；
 * 2. body.glb 是 meshopt 压缩的，必须先告诉 model-viewer 解码器在哪，
 *    而且要在元素开始加载模型之前就设好，所以「设完才渲染」；
 * 3. 失败要说得出来。默认行为是一片空白，用户会以为网卡了。
 */
export function BodyViewer() {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [defined, setDefined] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const [active, setActive] = useState<OrganSlug | null>(null);

  useEffect(() => {
    let cancelled = false;

    import("@google/model-viewer")
      .then((mod) => {
        if (cancelled) return;
        // 0.24.0 版是 UMD，model-viewer 会用 <script src> 去加载它。
        // 换成 1.x 的 ESM 版本会直接语法报错，别升。
        mod.ModelViewerElement.meshoptDecoderLocation = "/meshopt/meshopt_decoder.js";
        setDefined(true);
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // model-viewer 的 load / error 是自定义事件，React 的 onError 接不到。
  useEffect(() => {
    const el = viewerRef.current;
    if (!el || !defined) return;

    const onLoad = () => setStatus("ready");
    const onError = () => setStatus("failed");

    el.addEventListener("load", onLoad);
    el.addEventListener("error", onError);
    return () => {
      el.removeEventListener("load", onLoad);
      el.removeEventListener("error", onError);
    };
  }, [defined]);

  const activeHotspot = active
    ? HOTSPOTS.find((h) => h.organ === active)
    : undefined;

  return (
    <div id="body-model">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-2">
        <div className="pointer-events-none absolute left-4 top-4 z-10">
          <p className="text-sm font-medium tracking-widest text-muted">
            三维身体
          </p>
          <p className="mt-1 text-xs text-muted">拖动旋转 · 点点看器官</p>
        </div>

        {defined ? (
          <model-viewer
            ref={viewerRef}
            src="/models/body.glb"
            alt="人体器官三维模型：心、脑、肺、肝、肾、胃、脾、胆、小肠、大肠、膀胱"
            loading="lazy"
            reveal="auto"
            camera-controls
            touch-action="pan-y"
            interaction-prompt="auto"
            shadow-intensity="0.6"
            camera-orbit={
              activeHotspot ? VIEW_ORBIT : WHOLE_BODY_ORBIT
            }
            camera-target={
              activeHotspot ? activeHotspot.position : WHOLE_BODY_TARGET
            }
            style={{ width: "100%", height: "clamp(320px, 46vh, 460px)" }}
          >
            {HOTSPOTS.map((spot, i) => (
              <button
                key={`${spot.organ}-${i}`}
                slot={`hotspot-${i}`}
                type="button"
                aria-label={`${ORGAN_LABEL[spot.organ]}，查看这个器官`}
                data-position={spot.position}
                data-normal="0m 0m 1m"
                onClick={() => setActive(spot.organ)}
                className="h-7 w-7 rounded-full border-2 border-white bg-structure text-[10px] font-medium text-white shadow-md transition-transform hover:scale-125"
              >
                {ORGAN_LABEL[spot.organ]}
              </button>
            ))}
          </model-viewer>
        ) : (
          <div
            className="flex items-center justify-center text-sm text-muted"
            style={{ height: "clamp(320px, 46vh, 460px)" }}
          >
            {status === "failed" ? "三维模型没有加载出来" : "三维模型加载中…"}
          </div>
        )}

        {status === "loading" && defined ? (
          <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center text-xs text-muted">
            正在加载模型（约 2.8 MB）…
          </p>
        ) : null}
      </div>

      {status === "failed" ? (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          三维模型没能加载。下面的器官列表和影响链仍然可以正常使用。
        </p>
      ) : null}

      {activeHotspot ? (
        <div className="mt-3 rounded-xl border border-line bg-paper-2 p-4">
          <p className="font-serif text-lg font-semibold">
            {ORGAN_LABEL[activeHotspot.organ]}
          </p>
          <p className="mt-1 text-xs text-muted">
            结构之镜 · 关系之镜 · 信息之镜
          </p>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link
              href={`/organ/${activeHotspot.organ}`}
              className="text-structure hover:underline"
            >
              看这个器官 →
            </Link>
            <Link
              href={`/chain?organ=${activeHotspot.organ}`}
              className="text-information hover:underline"
            >
              看它的影响链 →
            </Link>
            <button
              type="button"
              onClick={() => setActive(null)}
              className="text-muted hover:underline"
            >
              回到整体
            </button>
          </div>
        </div>
      ) : (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          模型基于 Z-Anatomy（CC BY-SA 4.0），几何源自 BodyParts3D（DBCLS）。
          它只标位置与形态，不表示任何健康状态。详见
          <Link href="/method" className="ml-1 text-information hover:underline">
            「方法」
          </Link>
          。
        </p>
      )}
    </div>
  );
}
