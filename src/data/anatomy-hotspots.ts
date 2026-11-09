// src/data/anatomy-hotspots.ts
//
// 三维器官的热点坐标。**11 个器官全部启用**，共 12 个点（肺左右各一个）。
//
// 数值来源：在世界坐标里实测算出的包围盒中心（单位米，Y 轴朝上，glTF 约定）。
// 已用 4 个源 GLB 合并后的 body.glb 逐个体复算过，与这里的数值一位不差。
//
// 用法：position 直接喂给 <model-viewer> 里 <a slot="hotspot-N" data-position="...">。
// 前提：GLB 原样加载，**没有重新居中**。一旦你在 Blender 里把原点挪了，
//       这些数全部作废，要重算。
//
// 一条硬规矩：**一个热点必须对应一篇能看的内容页。**
// 11 个器官的内容都在 src/content/organs/ 里了，所以 11 个点都能点。

export type System = "visceral" | "cardiovascular" | "nervous" | "lymphoid";

/** 五脏六腑里的六腑少一个三焦（没有对应的网格） */
export type OrganSlug =
  | "heart"
  | "brain"
  | "lung"
  | "liver"
  | "kidney"
  | "stomach"
  | "spleen"
  | "gallbladder"
  | "small-intestine"
  | "large-intestine"
  | "bladder";

export type Hotspot = {
  /** 对应 src/content/organs 里的 slug */
  organ: OrganSlug;
  /** 中文名，用于 alt 和按钮文字 */
  label: string;
  /** 这个器官的网格在哪个源 GLB 里（只用于查证，加载时不用） */
  system: System;
  /** model-viewer 的 data-position，模型世界坐标 */
  position: string;
  /** data-normal，热点朝外方向。默认朝 +Z（屏幕外，即人体正前方） */
  normal?: string;
  /** core = 五脏 + 脑 + 胃；extended = 后来加的 4 个 */
  tier: "core" | "extended";
};

/**
 * 全部 12 个点，一个 body.glb 一次全显示。
 * 顺序 = 首页热点按钮的顺序，按"从上到下"排。
 */
export const HOTSPOTS: Hotspot[] = [
  // ---- 脑 ----
  { organ: "brain", label: "脑", system: "nervous", tier: "core",
    position: "0.000m 1.619m -0.009m" },

  // ---- 肺（左右各一个热点，内容仍是一页）----
  { organ: "lung", label: "右肺", system: "visceral", tier: "core",
    position: "-0.067m 1.300m 0.010m" },
  { organ: "lung", label: "左肺", system: "visceral", tier: "core",
    position: "0.069m 1.299m 0.009m" },

  // ---- 心 ----
  { organ: "heart", label: "心", system: "cardiovascular", tier: "core",
    position: "0.023m 1.291m 0.025m" },

  // ---- 脾（人体左侧）----
  { organ: "spleen", label: "脾", system: "lymphoid", tier: "extended",
    position: "0.085m 1.161m -0.004m" },

  // ---- 肝 ----
  { organ: "liver", label: "肝", system: "visceral", tier: "core",
    position: "-0.012m 1.175m 0.023m" },

  // ---- 胆囊（藏在肝下面，正面视角会被肝挡住，属正常）----
  { organ: "gallbladder", label: "胆", system: "visceral", tier: "extended",
    position: "-0.045m 1.137m 0.056m" },

  // ---- 胃 ----
  { organ: "stomach", label: "胃", system: "visceral", tier: "core",
    position: "0.038m 1.166m 0.036m" },

  // ---- 肾（一对器官的包围盒中心，落在两肾之间，这是正常的）----
  { organ: "kidney", label: "肾", system: "visceral", tier: "core",
    position: "0.001m 1.103m -0.012m" },

  // ---- 小肠 ----
  // 这个 GLB 里的小肠只有十二指肠 + 空肠两块（没有回肠），下面是这两块的中心。
  { organ: "small-intestine", label: "小肠", system: "visceral", tier: "extended",
    position: "0.009m 1.012m 0.043m" },

  // ---- 大肠 ----
  // ⚠️ 整段大肠的包围盒中心 0.000m 0.969m 0.005m 落在腹腔正中那圈空当里，**不要用**。
  //    原因：大肠是升/横/降/乙状四块，合并包围盒的中心必然是空的。
  //    下面是**降结肠单块**（Descending colon，人体左侧）的中心。
  //    其余三块：升 -0.088 1.018 0.015 / 横 0.006 1.101 0.044 / 乙状 0.005 0.865 -0.047
  { organ: "large-intestine", label: "大肠", system: "visceral", tier: "extended",
    position: "0.048m 1.003m -0.011m" },

  // ---- 膀胱 ----
  { organ: "bladder", label: "膀胱", system: "visceral", tier: "extended",
    position: "0.000m 0.855m 0.000m" },
];

/** 需要单个器官时用（比如 /organ 页里做一个小定位图） */
export function hotspotsFor(organ: OrganSlug): Hotspot[] {
  return HOTSPOTS.filter((h) => h.organ === organ);
}

/** 把内容层的 string slug 收窄成三维层认识的 OrganSlug；认不出来就返回 undefined。 */
export function toOrganSlug(slug: string): OrganSlug | undefined {
  return HOTSPOTS.find((h) => h.organ === slug)?.organ;
}

/** 按层级取：首页可以只显示核心 6 个，扩展 5 个留给"展开" */
export function hotspotsByTier(tier: Hotspot["tier"]): Hotspot[] {
  return HOTSPOTS.filter((h) => h.tier === tier);
}

/**
 * "整体 → 局部"用的机位。
 * 点某个器官时，把 camera-target 换成它的 position，相机飞过去。
 * 距离 0.55m 是实拍经验值：器官占屏幕一半左右，还能看出它在身体里的位置。
 */
export const VIEW_ORBIT = "0deg 70deg 0.55m";
export const WHOLE_BODY_ORBIT = "0deg 75deg 2.4m";
export const WHOLE_BODY_TARGET = "0.000m 1.150m 0.000m";

// ---------------------------------------------------------------------------
// 想自己从 manifest 重算（比如换了模型），把这个函数加到同一文件里：
//
// import manifest from "@/data/anatomy-manifest.json";
//
// export function hotspotFromManifest(system: System, structure: string): string {
//   const s = (manifest as Record<string, { structures: Record<string, { bounds: { min: number[]; max: number[] } }> }>)[system].structures[structure];
//   const c = s.bounds.min.map((v, i) => ((v + s.bounds.max[i]) / 2).toFixed(3));
//   return `${c[0]}m ${c[1]}m ${c[2]}m`;
// }
//
// ⚠️ 只对**实心器官**准。肠、血管、神经这类空腔或弯曲结构，包围盒中心是空的，
//    要取"单块"的节点名再算（大肠就是这么处理的，见上面）。
//
// manifest 里全部 65 个结构的名字（7 个 GLB）：
//   visceral (19):       trachea, bronchi, right_lung, left_lung, esophagus, stomach,
//                        liver, gallbladder, pancreas, small_intestine, large_intestine,
//                        kidneys, ureters, urinary_bladder, prostate, testes,
//                        pituitary_gland, thyroid_gland, adrenal_glands
//   cardiovascular (8):  heart, aorta, common_carotid_artery, brachial_artery,
//                        femoral_artery, superior_vena_cava, inferior_vena_cava,
//                        great_saphenous_vein
//   nervous (7):         brain, cerebellum, spinal_cord, brachial_plexus, vagus_nerve,
//                        femoral_nerve, sciatic_nerve
//   skeletal (15):       cranium, mandible, vertebral_column, sternum, ribs, clavicle,
//                        scapula, humerus, radius, ulna, hip_bone, femur, tibia, fibula, larynx
//   muscular (13):       sternocleidomastoid, trapezius, deltoid, pectoralis_major, diaphragm,
//                        latissimus_dorsi, biceps_brachii, triceps_brachii, rectus_abdominis,
//                        gluteus_maximus, quadriceps_femoris, hamstrings, gastrocnemius
//   lymphoid (2):        spleen, thymus
//   skin (1):            skin
// ---------------------------------------------------------------------------
