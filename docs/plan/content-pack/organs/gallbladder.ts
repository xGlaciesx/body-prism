import type { OrganContent } from "@/lib/schema";

/** 胆囊 · 内容 v1  审核人：________  审核日期：________ */
export const gallbladder: OrganContent = {
  id: "gallbladder",
  slug: "gallbladder",
  nameCn: "胆囊",
  nameEn: "Gallbladder",
  system: "digestive",
  summary:
    "胆囊是肝的储液罐：肝不停分泌胆汁，胆囊把它浓缩存起来，等吃了油脂再放出去。",
  readingMinutes: 4,
  camera: {
    position: [0, 0, 3.2],
    target: [0, 0, 0],
    fov: 45,
  },
  lenses: {
    structure: {
      title: "结构之镜",
      body:
        "胆囊是贴在肝脏脏面胆囊窝里的梨形囊，分底、体、颈，颈部接胆囊管。它**不产生胆汁**——胆汁由肝细胞持续分泌，胆囊只负责浓缩和储存。",
      claimIds: ["C-GB-STRUCT-1"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "胆囊和肝是一条流水线上的两段：肝造、胆囊存、肠道用。进食（尤其含脂肪）后，胆囊收缩把胆汁经胆囊管、胆总管送进十二指肠，帮助脂肪乳化。切除胆囊后多数人靠胆管扩张和消化适应可以正常生活，但一部分人会出现餐后腹泻或腹胀。",
      claimIds: ["C-GB-REL-1", "C-GB-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把胆囊读成“带阈值的缓冲罐”，是便于理解的类比：上游持续来货，罐子先囤着，下游一开闸就集中放出去。它描述的是储存与按需释放，不代表胆囊在“决定”什么。",
      claimIds: ["C-GB-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-GB-STRUCT-1",
      lens: "structure",
      text: "胆囊位于肝脏脏面的胆囊窝内，储存并浓缩肝细胞分泌的胆汁，本身不产生胆汁。",
      evidenceLevel: "A",
      sourceIds: ["SRC-GB-001"],
    },
    {
      id: "C-GB-REL-1",
      lens: "relationship",
      text: "进食后胆囊平滑肌在胆囊收缩素（CCK）等信号作用下收缩，把胆汁经胆囊管、胆总管排入十二指肠，帮助脂肪乳化与吸收。",
      evidenceLevel: "A",
      sourceIds: ["SRC-GB-002"],
    },
    {
      id: "C-GB-REL-2",
      lens: "relationship",
      text: "胆囊切除后多数人可通过胆管扩张与消化适应维持正常生活，但一部分人会出现餐后腹泻或腹胀。",
      evidenceLevel: "B",
      sourceIds: ["SRC-GB-003"],
      caveat: "存在个体差异；术后饮食与随访听医生的，页面不给饮食处方。",
    },
    {
      id: "C-GB-REL-3",
      lens: "relationship",
      text: "中医“肝与胆相表里”是传统理论表述，把胆描述为“中正之官、决断出焉”，与胆囊的储存功能不是一回事。",
      evidenceLevel: "D",
      sourceIds: ["SRC-GB-004"],
      caveat: "传统理论，非现代医学共识。",
    },
    {
      id: "C-GB-INFO-1",
      lens: "information",
      text: "把胆囊描述为“带阈值的缓冲罐”是概念类比。",
      evidenceLevel: "C",
      sourceIds: ["SRC-GB-005"],
      caveat: "概念类比，不构成医学解释。",
    },
  ],
  misconceptions: [
    {
      myth: "胆囊负责分泌胆汁，切了胆就不能消化油了。",
      correction:
        "胆汁是肝脏分泌的，胆囊只做浓缩和储存。切除后胆汁改为持续少量流入肠道，多数人可以通过适应维持正常消化，但确实有一部分人餐后容易腹泻。具体怎么吃，由医生按你的情况说。",
      sourceIds: ["SRC-GB-001", "SRC-GB-003"],
    },
    {
      myth: "中医说胆主决断，所以胆小是胆不好。",
      correction:
        "“胆主决断”出自传统理论，属于用身体比喻人的性情，不是对器官功能的描述。它不能用来解释性格，也不能据此判断胆囊有没有问题。",
      sourceIds: ["SRC-GB-004"],
    },
  ],
  followups: [
    "胆囊是怎么把胆汁“浓缩”的？",
    "切除胆囊以后，胆汁去哪儿了？",
    "中医的“胆”和胆囊差在哪里？",
  ],
  sources: [
    {
      id: "SRC-GB-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-GB-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-GB-003",
      title: "Robbins & Cotran Pathologic Basis of Disease (10th ed.)",
      authors: ["Vinay Kumar", "Abul K. Abbas", "Jon C. Aster"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-GB-004",
      title: "《黄帝内经·素问·灵兰秘典论》（传统理论原文）",
      year: 2016,
      type: "traditional",
      level: "D",
      note: "“胆者，中正之官，决断出焉。”原典成书年代无确切年份，年份字段按 schema（≥1900）填占位值，仅用于排序。",
    },
    {
      id: "SRC-GB-005",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["liver", "stomach"],
};
