import type { OrganContent } from "@/lib/schema";

/** 肺 · 内容 v1  审核人：________  审核日期：________ */
export const lung: OrganContent = {
  id: "lung",
  slug: "lung",
  nameCn: "肺",
  nameEn: "Lung",
  system: "respiratory",
  summary:
    "肺不主动“吸气”：它是一片被膈肌和胸廓拉开的海绵，靠压力差完成气体交换。",
  readingMinutes: 6,
  camera: {
    position: [0, 0, 3.8],
    target: [0, 0, 0],
    fov: 45,
  },
  lenses: {
    structure: {
      title: "结构之镜",
      body:
        "气管分成左右主支气管，再逐级分支成细支气管，末端是肺泡。成人约有数亿个肺泡，展开后的气体交换面积接近一个网球场大小。肺泡壁外紧贴毛细血管，氧气和二氧化碳在这里扩散。",
      claimIds: ["C-LUNG-STRUCT-1", "C-LUNG-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "肺与心脏通过肺循环紧密相连：右心室把血送进肺，氧合后回到左心房。呼吸由脑干的呼吸中枢驱动，膈肌和肋间肌执行；肺本身没有主动收缩的肌肉。",
      claimIds: ["C-LUNG-REL-1", "C-LUNG-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把气体交换读成“沿分压梯度传递的信号”，是一种便于理解的类比。它描述的是扩散方向，不代表肺在“发送消息”。",
      claimIds: ["C-LUNG-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-LUNG-STRUCT-1",
      lens: "structure",
      text: "气体交换发生在肺泡与毛细血管之间，成人肺泡总数约数亿个，总交换面积可达约 70 平方米。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LUNG-001", "SRC-LUNG-002"],
      caveat: "面积是按模型估算的近似值，不同教材给出的数字略有差异。",
    },
    {
      id: "C-LUNG-STRUCT-2",
      lens: "structure",
      text: "肺泡壁很薄，外侧紧贴毛细血管，氧和二氧化碳依靠扩散通过。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LUNG-001"],
    },
    {
      id: "C-LUNG-REL-1",
      lens: "relationship",
      text: "肺循环把右心室的静脉血送到肺进行氧合，再回流到左心房。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LUNG-002"],
    },
    {
      id: "C-LUNG-REL-2",
      lens: "relationship",
      text: "膈肌是平静呼吸的主要吸气肌；肺本身没有主动收缩的肌肉。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LUNG-001", "SRC-LUNG-002"],
    },
    {
      id: "C-LUNG-INFO-1",
      lens: "information",
      text: "把气体交换描述为“沿分压梯度传递信号”是概念类比，用于解释扩散方向。",
      evidenceLevel: "D",
      sourceIds: ["SRC-LUNG-003"],
      caveat: "概念类比，不是生理机制的全部。",
    },
  ],
  misconceptions: [
    {
      myth: "肺会自己扩张，所以呼吸是肺在用力。",
      correction:
        "平静吸气主要靠膈肌收缩、胸腔容积增大、胸内压下降，空气被“吸”进来；肺是被动跟随的弹性器官。",
      sourceIds: ["SRC-LUNG-002"],
    },
    {
      myth: "深呼吸能“排毒”，吸得越深越好。",
      correction:
        "肺的主要功能是气体交换，不是排毒器官。过度深呼吸可能引起头晕等不适；有呼吸系统症状应就医，而不是靠呼吸法自行处理。",
      sourceIds: ["SRC-LUNG-001"],
    },
  ],
  followups: [
    "为什么肺泡壁必须很薄？",
    "高原上氧气少，身体怎么适应？",
    "肺和心脏之间的血流是怎么走的？",
  ],
  sources: [
    {
      id: "SRC-LUNG-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-LUNG-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-LUNG-003",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["heart", "kidney"],
};
