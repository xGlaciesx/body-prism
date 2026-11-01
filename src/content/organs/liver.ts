import type { OrganContent } from "@/lib/schema";

/** 肝 · 内容 v1  审核人：________  审核日期：________ */
export const liver: OrganContent = {
  id: "liver",
  slug: "liver",
  nameCn: "肝",
  nameEn: "Liver",
  system: "digestive",
  summary:
    "肝是身体里最大的“化工厂”：它接收来自肠道的血，处理营养、药物和代谢废物。",
  readingMinutes: 6,
  camera: {
    position: [0, 0, 3.4],
    target: [0, 0, 0],
    fov: 45,
  },
  lenses: {
    structure: {
      title: "结构之镜",
      body:
        "肝是人体最大的内脏器官，由大量肝小叶组成。每个小叶周围有门管区，包含门静脉、肝动脉和胆管的分支。肝有两套血供：门静脉送来肠道吸收的物质，肝动脉送来含氧血。",
      claimIds: ["C-LIVER-STRUCT-1", "C-LIVER-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "肝与肠道通过门静脉直接相连，构成“肠—肝轴”。它合成白蛋白和多种凝血因子、产生胆汁帮助脂肪消化、参与糖和脂肪代谢，也处理药物和体内产生的含氮废物。",
      claimIds: ["C-LIVER-REL-1", "C-LIVER-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把肝读成一个“缓冲器和过滤器”，是工程视角的类比：它把波动的输入整理成稳定的输出。这是概念类比，不代替医学检查。",
      claimIds: ["C-LIVER-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-LIVER-STRUCT-1",
      lens: "structure",
      text: "肝是人体最大的内脏器官，基本结构单位是肝小叶。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LIVER-001"],
    },
    {
      id: "C-LIVER-STRUCT-2",
      lens: "structure",
      text: "肝有门静脉和肝动脉两套血供，门静脉带来肠道吸收的物质，肝动脉提供含氧血。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LIVER-001", "SRC-LIVER-002"],
    },
    {
      id: "C-LIVER-REL-1",
      lens: "relationship",
      text: "肝合成白蛋白和多种凝血因子，并产生胆汁参与脂肪消化。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LIVER-002"],
    },
    {
      id: "C-LIVER-REL-2",
      lens: "relationship",
      text: "肝参与糖、脂肪和蛋白质代谢，并处理多种药物和体内产生的含氮废物。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LIVER-002"],
    },
    {
      id: "C-LIVER-INFO-1",
      lens: "information",
      text: "把肝描述为“缓冲器和过滤器”是工程类比，用来解释它稳定内环境的作用。",
      evidenceLevel: "C",
      sourceIds: ["SRC-LIVER-003"],
      caveat: "概念类比，不构成任何健康判断。",
    },
  ],
  misconceptions: [
    {
      myth: "肝需要靠“排毒茶”“护肝片”来排毒。",
      correction:
        "肝本身持续进行代谢和转化，不需要额外产品“排毒”。所谓“排毒”不是严格的医学概念；任何保健品都不能替代就医，也不能抵消饮酒等风险。",
      sourceIds: ["SRC-LIVER-002"],
    },
    {
      myth: "脂肪肝只和喝酒有关。",
      correction:
        "脂肪肝有酒精性和非酒精性等不同类型，体重、饮食、代谢状况等都可能参与。具体情况需要医学检查判断，页面不提供诊断。",
      sourceIds: ["SRC-LIVER-004"],
    },
  ],
  followups: [
    "为什么肝要两套血供？",
    "肝和胆是什么关系？",
    "为什么肝的损伤早期可能没有明显症状？",
  ],
  sources: [
    {
      id: "SRC-LIVER-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-LIVER-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-LIVER-003",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
    {
      id: "SRC-LIVER-004",
      title: "Robbins & Cotran Pathologic Basis of Disease (10th ed.)",
      authors: ["Vinay Kumar", "Abul K. Abbas", "Jon C. Aster"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
  ],
  related: ["stomach", "kidney"],
};
