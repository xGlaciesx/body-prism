import type { OrganContent } from "@/lib/schema";

/** 胃 · 内容 v1  审核人：________  审核日期：________ */
export const stomach: OrganContent = {
  id: "stomach",
  slug: "stomach",
  nameCn: "胃",
  nameEn: "Stomach",
  system: "digestive",
  summary:
    "胃是一间受控的“酸性反应室”：它用胃酸和酶开始分解食物，同时用黏液保护自己。",
  readingMinutes: 5,
  camera: {
    position: [0, 0, 3.2],
    target: [0, 0, 0],
    fov: 45,
  },
  lenses: {
    structure: {
      title: "结构之镜",
      body:
        "胃分为贲门、胃底、胃体和幽门。胃壁的壁细胞分泌盐酸，主细胞分泌胃蛋白酶原；幽门括约肌控制食物进入小肠。胃黏膜表面覆盖黏液层，避免被自己的酸损伤。",
      claimIds: ["C-STOMACH-STRUCT-1", "C-STOMACH-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "胃受迷走神经和激素（如胃泌素）调节，和脑、肠之间有持续通信。进食的节奏、情绪和睡眠会影响胃的排空与感觉，但“情绪伤胃”不能替代医学检查。",
      claimIds: ["C-STOMACH-REL-1", "C-STOMACH-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把胃读成“把大块输入拆成可处理信号的反应室”，是便于理解的类比。它描述的是消化过程，不代表胃在传递情绪。",
      claimIds: ["C-STOMACH-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-STOMACH-STRUCT-1",
      lens: "structure",
      text: "胃分为贲门、胃底、胃体和幽门，幽门括约肌控制食物进入十二指肠。",
      evidenceLevel: "A",
      sourceIds: ["SRC-STOMACH-001"],
    },
    {
      id: "C-STOMACH-STRUCT-2",
      lens: "structure",
      text: "壁细胞分泌盐酸，主细胞分泌胃蛋白酶原；胃黏膜的黏液层保护胃壁。",
      evidenceLevel: "A",
      sourceIds: ["SRC-STOMACH-001", "SRC-STOMACH-002"],
    },
    {
      id: "C-STOMACH-REL-1",
      lens: "relationship",
      text: "胃的分泌和运动受迷走神经与胃泌素等激素调节。",
      evidenceLevel: "A",
      sourceIds: ["SRC-STOMACH-002"],
    },
    {
      id: "C-STOMACH-REL-2",
      lens: "relationship",
      text: "脑与胃肠道之间存在双向通信，进食节奏、情绪和睡眠可影响胃的感觉与排空。",
      evidenceLevel: "B",
      sourceIds: ["SRC-STOMACH-003"],
      caveat: "个体差异大；持续不适需就医，页面不提供诊断。",
    },
    {
      id: "C-STOMACH-INFO-1",
      lens: "information",
      text: "把胃描述为“把大块输入拆成可处理信号的反应室”是概念类比。",
      evidenceLevel: "D",
      sourceIds: ["SRC-STOMACH-004"],
      caveat: "概念类比，不构成医学解释。",
    },
  ],
  misconceptions: [
    {
      myth: "胃酸是“坏东西”，应该尽量中和。",
      correction:
        "胃酸参与蛋白质消化和防御。长期自行服用抑酸药可能掩盖症状；是否需要用药应由医生判断，页面不给任何用药建议。",
      sourceIds: ["SRC-STOMACH-002"],
    },
    {
      myth: "胃会把自己消化掉。",
      correction:
        "胃黏膜的黏液—碳酸氢盐屏障和紧密连接让胃壁不被自身酸侵蚀；这套屏障受损时才可能出现损伤。",
      sourceIds: ["SRC-STOMACH-001"],
    },
  ],
  followups: [
    "为什么胃不会消化自己？",
    "胃排空的速度由什么决定？",
    "“情绪影响胃”有生理基础吗？",
  ],
  sources: [
    {
      id: "SRC-STOMACH-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-STOMACH-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-STOMACH-003",
      title: "The gut-brain axis: interactions between enteric microbiota, central and enteric nervous systems",
      authors: ["Marilia Carabotti et al."],
      year: 2015,
      type: "review",
      level: "B",
    },
    {
      id: "SRC-STOMACH-004",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["liver", "brain"],
};
