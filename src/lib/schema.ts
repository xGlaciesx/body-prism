/**
 * 内容包类型定义（对应团队手册 16 §3.1 的 schema 结构）。
 *
 * 当前为纯 TypeScript 类型：器官内容包是静态数据，只需要类型检查。
 * 第二阶段做「AI 策展人」接口时，再引入 Zod 做运行时校验
 * （模型输出必须符合 schema），届时的 z.infer 会推导出同样的类型。
 */

export type LensId = "structure" | "relationship" | "information";

export type EvidenceLevel = "A" | "B" | "C" | "D";

export type SourceType =
  | "guideline"
  | "systematic-review"
  | "rct"
  | "cohort"
  | "textbook"
  | "review"
  | "traditional"
  | "other";

export type Source = {
  id: string;
  title: string;
  authors?: string[];
  year: number;
  type: SourceType;
  url?: string;
  doi?: string;
  level: EvidenceLevel;
  note?: string;
};

export type Claim = {
  id: string;
  lens: LensId;
  text: string;
  evidenceLevel: EvidenceLevel;
  sourceIds: string[];
  caveat?: string;
};

export type LensVisual = "3d-layer" | "network" | "signal-flow" | "timeline";

export type LensCard = {
  title: string;
  body: string;
  claimIds: string[];
  visual?: LensVisual;
};

export type Misconception = {
  myth: string;
  correction: string;
  sourceIds: string[];
};

export type OrganCamera = {
  position: [number, number, number];
  target: [number, number, number];
  fov?: number;
};

export type OrganContent = {
  id: string;
  slug: string;
  nameCn: string;
  nameEn: string;
  system: string;
  summary: string;
  readingMinutes: number;
  camera: OrganCamera;
  lenses: {
    structure: LensCard;
    relationship: LensCard;
    information: LensCard;
  };
  claims: Claim[];
  misconceptions: Misconception[];
  followups: string[];
  sources: Source[];
  related: string[];
};
