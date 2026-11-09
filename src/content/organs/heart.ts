import type { OrganContent } from "@/lib/schema";

/**
 * 心脏 · 内容 v1（可直接用，医学表述已按“只写教科书级事实”收口）
 * 审核人：________  审核日期：________
 */
export const heart: OrganContent = {
  id: "heart",
  slug: "heart",
  nameCn: "心脏",
  nameEn: "Heart",
  system: "circulatory",
  summary:
    "心脏不只是一台泵：它有自己的一套电传导系统，也持续接收神经和激素的调节信号。",
  readingMinutes: 6,
  camera: {
    position: [0, 0, 3.2],
    target: [0, 0, 0],
    fov: 45,
  },
  lenses: {
    structure: {
      title: "结构之镜",
      body:
        "心脏有四个腔室（左右心房、左右心室）、四组瓣膜和一套自己的电传导系统。瓣膜保证血液单向流动；窦房结发出节律信号，经房室结、希氏束和浦肯野纤维传到心室，让心肌按顺序收缩。",
      claimIds: ["C-HEART-STRUCT-1", "C-HEART-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "心脏通过自主神经与脑、肺、肾和血管持续通信。交感神经让心率加快、收缩力增强；副交感神经（迷走神经）让心率减慢。运动、睡眠、情绪和体液容量都会改变这套平衡。",
      claimIds: ["C-HEART-REL-1", "C-HEART-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "心脏处理的是压力、化学和电信号，不是“想法”。把它读成一个信息节点，是我们组织叙事的方式——这是概念类比，不是解剖结论，也不能用来判断任何人的健康状态。",
      claimIds: ["C-HEART-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-HEART-STRUCT-1",
      lens: "structure",
      text: "心脏由四个腔室和四组瓣膜组成，瓣膜维持血液单向流动。",
      evidenceLevel: "A",
      sourceIds: ["SRC-HEART-001"],
    },
    {
      id: "C-HEART-STRUCT-2",
      lens: "structure",
      text: "窦房结产生节律信号，经房室结、希氏束和浦肯野纤维传导，使心房与心室按顺序收缩。",
      evidenceLevel: "A",
      sourceIds: ["SRC-HEART-001", "SRC-HEART-002"],
    },
    {
      id: "C-HEART-REL-1",
      lens: "relationship",
      text: "自主神经系统调节心率与心肌收缩力：交感神经兴奋加快心率，迷走神经兴奋减慢心率。",
      evidenceLevel: "A",
      sourceIds: ["SRC-HEART-002"],
    },
    {
      id: "C-HEART-REL-2",
      lens: "relationship",
      text: "运动时交感神经兴奋，心率与每搏输出量上升，心输出量可增加到静息时的数倍。",
      evidenceLevel: "A",
      sourceIds: ["SRC-HEART-002"],
    },
    {
      id: "C-HEART-INFO-1",
      lens: "information",
      text: "把心脏描述为“信息节点”是概念类比，用于组织叙事，不是医学诊断依据。",
      evidenceLevel: "D",
      sourceIds: ["SRC-HEART-003"],
      caveat: "概念类比，不等于生理机制。",
    },
  ],
  misconceptions: [
    {
      myth: "心脏只负责泵血，和情绪、压力完全无关。",
      correction:
        "泵血是核心功能，但自主神经和激素会让情绪、压力、睡眠影响心率和血压。这不等于“情绪会直接导致心脏病”，也不构成任何诊断。",
      sourceIds: ["SRC-HEART-002"],
    },
    {
      myth: "中医说“心主神明”，所以心脏负责思考。",
      correction:
        "“心主神明”是传统理论中的概念，不等于现代医学结论。现代医学认为思维活动主要与脑相关；出现胸痛、胸闷、晕厥等症状应就医，而不是自行归因。",
      sourceIds: ["SRC-HEART-004"],
    },
  ],
  followups: [
    "为什么心脏有自己的电传导系统？",
    "运动时心率为什么会变快？",
    "“心碎”有生理基础吗，还是只是比喻？",
    "心脏的瓣膜为什么只朝一个方向开？",
  ],
  sources: [
    {
      id: "SRC-HEART-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-HEART-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-HEART-003",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
      note: "由团队撰写，用于说明“三镜”框架的边界。",
    },
    {
      id: "SRC-HEART-004",
      title: "《黄帝内经·素问》（传统理论文献）",
      year: 2026,
      type: "traditional",
      level: "C",
      note: "传统理论，非现代医学共识；仅用于说明概念差异，不作为医学依据。",
    },
  ],
  related: ["brain", "lung"],
};
