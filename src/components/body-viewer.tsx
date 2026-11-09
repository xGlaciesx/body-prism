"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import {
  HOTSPOTS,
  VIEW_ORBIT,
  WHOLE_BODY_ORBIT,
  WHOLE_BODY_TARGET,
  type OrganSlug,
  type System,
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

/**
 * 按「系统」给热点上色，用的是站内已有的四个设计 token。
 * 这不是医学分类，只是让人一眼看出这 11 个器官不是一堆孤立的点。
 */
const SYSTEMS: { key: System; label: string; dot: string; ring: string }[] = [
  { key: "visceral", label: "内脏", dot: "bg-relationship", ring: "border-relationship" },
  { key: "cardiovascular", label: "循环", dot: "bg-structure", ring: "border-structure" },
  { key: "nervous", label: "神经", dot: "bg-information", ring: "border-information" },
  { key: "lymphoid", label: "淋巴", dot: "bg-evidence", ring: "border-evidence" },
];

const SYSTEM_DOT: Record<System, string> = {
  visceral: "bg-relationship",
  cardiovascular: "bg-structure",
  nervous: "bg-information",
  lymphoid: "bg-evidence",
};

/** 四个固定机位。theta 是水平角，phi 是俯仰角，最后一位是距离（米）。 */
const VIEWS: { key: string; label: string; orbit: string }[] = [
  { key: "front", label: "正面", orbit: WHOLE_BODY_ORBIT },
  { key: "side", label: "右侧", orbit: "90deg 75deg 2.4m" },
  { key: "back", label: "背面", orbit: "180deg 75deg 2.4m" },
  { key: "top", label: "俯视", orbit: "0deg 20deg 2.4m" },
];

type Status = "loading" | "ready" | "failed";

type Props = {
  /** 首页用 "home"；器官页的定位图用 "locator"（默认选中该器官、控件更少） */
  variant?: "home" | "locator";
  /** locator 变体下要定位的器官 */
  organ?: OrganSlug;
};

/**
 * 三维身体模型。
 *
 * 三个必须做对的地方（任何一处不对，页面都不报错，只是模型不出现）：
 * 1. model-viewer 只在浏览器里 import——它碰 window，服务端渲染会炸；
 * 2. body.glb 是 meshopt 压缩的，必须先告诉 model-viewer 解码器在哪，
 *    而且要在元素开始加载模型之前就设好，所以「设完才渲染」；
 * 3. 失败要说得出来。默认行为是一片空白，用户会以为网卡了。
 */
export function BodyViewer({ variant = "home", organ }: Props) {
  const viewerRef = useRef<HTMLElement | null>(null);
  const [defined, setDefined] = useState(false);
  const [status, setStatus] = useState<Status>("loading");
  const [active, setActive] = useState<OrganSlug | null>(organ ?? null);
  const [system, setSystem] = useState<System | null>(null);
  const [view, setView] = useState<string>("front");

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

  // 每个器官只保留一个热点按钮用于列表（肺有左右两个点，共用一页）
  const organList = useMemo(() => {
    const seen = new Set<OrganSlug>();
    return HOTSPOTS.filter((h) => {
      if (seen.has(h.organ)) return false;
      seen.add(h.organ);
      return true;
    });
  }, []);

  const orbit = activeHotspot
    ? VIEW_ORBIT
    : (VIEWS.find((v) => v.key === view)?.orbit ?? WHOLE_BODY_ORBIT);

  const height = variant === "locator" ? "clamp(220px, 30vh, 300px)" : "clamp(320px, 46vh, 460px)";

  return (
    <div id={variant === "locator" ? undefined : "body-model"}>
      <div className="relative overflow-hidden rounded-2xl border border-line bg-paper-2">
        <div className="pointer-events-none absolute left-4 top-4 z-10">
          <p className="text-sm font-medium tracking-widest text-muted">
            {variant === "locator" ? "它在这里" : "三维身体"}
          </p>
          <p className="mt-1 text-xs text-muted">
            {variant === "locator" ? "拖动旋转" : "拖动旋转 · 点点看器官"}
          </p>
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
            interaction-prompt={activeHotspot ? "none" : "auto"}
            shadow-intensity="0.6"
            camera-orbit={orbit}
            camera-target={
              activeHotspot ? activeHotspot.position : WHOLE_BODY_TARGET
            }
            style={{ width: "100%", height }}
          >
            {HOTSPOTS.map((spot, i) => {
              const dimmed = system !== null && spot.system !== system;
              return (
                <button
                  key={`${spot.organ}-${i}`}
                  slot={`hotspot-${i}`}
                  type="button"
                  aria-label={`${ORGAN_LABEL[spot.organ]}，查看这个器官`}
                  aria-pressed={active === spot.organ}
                  data-position={spot.position}
                  data-normal={spot.normal ?? "0m 0m 1m"}
                  onClick={() => setActive(spot.organ)}
                  className={`h-7 w-7 rounded-full border-2 border-white text-[10px] font-medium text-white shadow-md transition-all hover:scale-125 ${
                    SYSTEM_DOT[spot.system]
                  } ${dimmed ? "pointer-events-none opacity-20" : "opacity-100"}`}
                >
                  {ORGAN_LABEL[spot.organ]}
                </button>
              );
            })}
          </model-viewer>
        ) : (
          <div
            className="flex items-center justify-center text-sm text-muted"
            style={{ height }}
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

      {variant === "home" ? (
        <>
          {/* 系统筛选 + 机位：让人能从「一堆点」走到「一组器官」 */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="按系统筛选">
              <button
                type="button"
                onClick={() => setSystem(null)}
                aria-pressed={system === null}
                className={`rounded-full border px-2.5 py-1 text-xs transition-colors ${
                  system === null
                    ? "border-ink bg-ink text-paper"
                    : "border-line text-muted hover:border-muted"
                }`}
              >
                全部
              </button>
              {SYSTEMS.map((s) => (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setSystem(system === s.key ? null : s.key)}
                  aria-pressed={system === s.key}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs transition-colors ${
                    system === s.key
                      ? `${s.ring} bg-paper-2 text-ink`
                      : "border-line text-muted hover:border-muted"
                  }`}
                >
                  <span className={`h-2 w-2 rounded-full ${s.dot}`} aria-hidden />
                  {s.label}
                </button>
              ))}
            </div>

            <div className="flex gap-1" role="group" aria-label="切换视角">
              {VIEWS.map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => {
                    setActive(null);
                    setView(v.key);
                  }}
                  aria-pressed={!activeHotspot && view === v.key}
                  className={`rounded-md px-2 py-1 text-xs transition-colors ${
                    !activeHotspot && view === v.key
                      ? "bg-ink text-paper"
                      : "text-muted hover:text-ink"
                  }`}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* 11 个器官的列表：热点太小、或者被挡住时（比如胆在肝下面）从这里进 */}
          <ul className="mt-3 grid grid-cols-4 gap-1.5 sm:grid-cols-6">
            {organList.map((spot) => (
              <li key={spot.organ}>
                <button
                  type="button"
                  onClick={() => setActive(spot.organ)}
                  aria-pressed={active === spot.organ}
                  className={`flex w-full items-center justify-center gap-1 rounded-md border px-1 py-1.5 text-xs transition-colors ${
                    active === spot.organ
                      ? "border-ink bg-paper-2 text-ink"
                      : "border-line text-muted hover:border-muted"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${SYSTEM_DOT[spot.system]}`}
                    aria-hidden
                  />
                  {ORGAN_LABEL[spot.organ]}
                </button>
              </li>
            ))}
          </ul>
        </>
      ) : null}

      {status === "failed" ? (
        <p className="mt-3 text-xs leading-relaxed text-muted">
          三维模型没能加载。下面的器官列表和影响链仍然可以正常使用。
        </p>
      ) : null}

      {activeHotspot ? (
        <div className="mt-3 rounded-xl border border-line bg-paper-2 p-4">
          <div className="flex items-baseline gap-2">
            <p className="font-serif text-lg font-semibold">
              {ORGAN_LABEL[activeHotspot.organ]}
            </p>
            <span className="text-xs text-muted">
              {SYSTEMS.find((s) => s.key === activeHotspot.system)?.label}
            </span>
          </div>
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
            {variant === "home" ? (
              <button
                type="button"
                onClick={() => setActive(null)}
                className="text-muted hover:underline"
              >
                回到整体
              </button>
            ) : null}
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
