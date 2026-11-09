import type { OrganContent } from "@/lib/schema";

/** 肾 · 内容 v1  审核人：________  审核日期：________ */
export const kidney: OrganContent = {
  id: "kidney",
  slug: "kidney",
  nameCn: "肾",
  nameEn: "Kidney",
  system: "urinary",
  summary:
    "肾每天过滤大量血浆，再把大部分有用的东西收回来——它是“先筛一遍、再挑回来”的器官。",
  readingMinutes: 6,
  camera: {
    position: [0, 0, 3.0],
    target: [0, 0, 0],
    fov: 45,
  },
  lenses: {
    structure: {
      title: "结构之镜",
      body:
        "每个肾约有上百万个肾单位。血液先进入肾小球被过滤，滤液再经过肾小管，水和有用物质被重吸收，剩下的成为尿液，经肾盂、输尿管离开。",
      claimIds: ["C-KIDNEY-STRUCT-1", "C-KIDNEY-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "肾与心脏、血管、骨髓关系紧密：它通过肾素—血管紧张素—醛固酮系统参与血压调节，分泌促红细胞生成素影响红细胞生成，并参与维生素 D 的活化与酸碱平衡。",
      claimIds: ["C-KIDNEY-REL-1", "C-KIDNEY-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把肾读成“先全量采样、再选择性保留”的系统，是工程类比。它帮助理解过滤与重吸收，不代表肾在“做判断”。",
      claimIds: ["C-KIDNEY-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-KIDNEY-STRUCT-1",
      lens: "structure",
      text: "每个肾约有上百万个肾单位，肾单位由肾小球和肾小管组成。",
      evidenceLevel: "A",
      sourceIds: ["SRC-KIDNEY-001"],
    },
    {
      id: "C-KIDNEY-STRUCT-2",
      lens: "structure",
      text: "肾小球滤过血浆，肾小管重吸收水和有用物质，最终形成尿液。",
      evidenceLevel: "A",
      sourceIds: ["SRC-KIDNEY-001", "SRC-KIDNEY-002"],
    },
    {
      id: "C-KIDNEY-REL-1",
      lens: "relationship",
      text: "肾通过肾素—血管紧张素—醛固酮系统参与血压和体液容量的调节。",
      evidenceLevel: "A",
      sourceIds: ["SRC-KIDNEY-002"],
    },
    {
      id: "C-KIDNEY-REL-2",
      lens: "relationship",
      text: "肾分泌促红细胞生成素，并参与维生素 D 活化与酸碱平衡。",
      evidenceLevel: "A",
      sourceIds: ["SRC-KIDNEY-002"],
    },
    {
      id: "C-KIDNEY-INFO-1",
      lens: "information",
      text: "把肾描述为“先全量采样、再选择性保留”的系统，是工程类比。",
      evidenceLevel: "D",
      sourceIds: ["SRC-KIDNEY-003"],
      caveat: "概念类比，不用于判断肾功能。",
    },
  ],
  misconceptions: [
    {
      myth: "“肾虚”就是现代医学说的肾功能不好。",
      correction:
        "“肾虚”是传统理论中的概念，和现代医学的肾功能指标不是一回事。是否存在肾脏问题，需要靠血肌酐、尿检、影像等医学检查判断；页面不提供诊断。",
      sourceIds: ["SRC-KIDNEY-004"],
    },
    {
      myth: "水喝得越多越“护肾”。",
      correction:
        "适量饮水对多数人有益，但“越多越好”不成立；某些疾病状态下还需要限制液体。具体饮水量应结合个人情况，必要时咨询医生。",
      sourceIds: ["SRC-KIDNEY-001"],
    },
  ],
  followups: [
    "为什么肾要先把大部分滤液重吸收回去？",
    "肾和血压是怎么连在一起的？",
    "为什么肾病早期可能没有感觉？",
  ],
  sources: [
    {
      id: "SRC-KIDNEY-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-KIDNEY-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-KIDNEY-003",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
    {
      id: "SRC-KIDNEY-004",
      title: "《黄帝内经·素问》（传统理论文献）",
      year: 2026,
      type: "traditional",
      level: "C",
      note: "传统理论，非现代医学共识；仅用于说明概念差异。",
    },
  ],
  related: ["heart", "liver"],
};
