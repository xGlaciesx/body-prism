import type { OrganContent } from "@/lib/schema";

/** 大肠 · 内容 v1  审核人：________  审核日期：________ */
export const largeIntestine: OrganContent = {
  id: "large-intestine",
  slug: "large-intestine",
  nameCn: "大肠",
  nameEn: "Large Intestine",
  system: "digestive",
  summary:
    "大肠不负责吸收营养：它管的是回收水和盐、给残渣收尾，以及和菌群一起完成最后一程。",
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
        "大肠包括盲肠、结肠（升结肠、横结肠、降结肠、乙状结肠）和直肠，成人长约 1.5 米。它主要吸收水和电解质，把剩下的残渣浓缩、成形并暂时储存。结肠里住着大量菌群，它们发酵未被消化的碳水化合物，产生短链脂肪酸。",
      claimIds: ["C-LI-STRUCT-1", "C-LI-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "大肠的运动受自主神经和肠神经系统调节，排便还需要盆底与括约肌的配合。菌群、进食结构、活动量和作息都会影响排便的节奏，但这些影响因人而异，也不能用来判断某个人肠道有没有问题。",
      claimIds: ["C-LI-REL-1", "C-LI-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把大肠读成“排放前的最后一道浓缩与打包”，是便于理解的类比：进来的是稀的、量大的，出去的是成形的、量小的，中间靠的是选择性回收。它描述的是水和盐的回收，不代表大肠在处理信息。",
      claimIds: ["C-LI-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-LI-STRUCT-1",
      lens: "structure",
      text: "大肠包括盲肠、结肠（升、横、降、乙状）与直肠，成人长约 1.5 米，主要吸收水和电解质、形成并储存粪便。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LI-001"],
    },
    {
      id: "C-LI-STRUCT-2",
      lens: "structure",
      text: "结肠菌群发酵未被消化的碳水化合物，产生短链脂肪酸（如丁酸），结肠上皮可利用这些脂肪酸作为能量来源。",
      evidenceLevel: "B",
      sourceIds: ["SRC-LI-002"],
      caveat: "菌群组成与产出个体差异很大；此处只描述机制，不构成任何补充剂建议。",
    },
    {
      id: "C-LI-REL-1",
      lens: "relationship",
      text: "结肠运动受自主神经与肠神经系统调节，排便由结肠推进与盆底、括约肌的协调共同完成。",
      evidenceLevel: "A",
      sourceIds: ["SRC-LI-002"],
    },
    {
      id: "C-LI-REL-2",
      lens: "relationship",
      text: "中医“肺与大肠相表里”“大肠者传导之官，变化出焉”是传统理论表述，不是现代解剖学的功能描述。",
      evidenceLevel: "C",
      sourceIds: ["SRC-LI-003"],
      caveat: "传统理论，非现代医学共识。",
    },
    {
      id: "C-LI-INFO-1",
      lens: "information",
      text: "把大肠描述为“排放前的最后一道浓缩与打包”是概念类比。",
      evidenceLevel: "D",
      sourceIds: ["SRC-LI-004"],
      caveat: "概念类比，不构成医学解释。",
    },
  ],
  misconceptions: [
    {
      myth: "“宿便”会在肠子里积攒好几公斤毒素。",
      correction:
        "没有可靠证据支持“宿便中毒”这类说法。结肠确实会储存粪便，但把它说成积存多年、产生全身毒素，是把科普话术当成了医学结论。反复灌肠、长期用泻药反而有风险。",
      sourceIds: ["SRC-LI-001"],
    },
    {
      myth: "每天都得排便一次，否则就是便秘。",
      correction:
        "排便频率个体差异很大，从一天三次到一周三次都可能是正常的。真正需要关注的是性状、是否费力、是否伴随其他症状——而且判断这件事得由医生来做，不是网页。",
      sourceIds: ["SRC-LI-001"],
    },
  ],
  followups: [
    "大肠为什么不吸收营养？",
    "肠道菌群和人体是什么关系？",
    "中医的“肺与大肠相表里”在讲什么？",
  ],
  sources: [
    {
      id: "SRC-LI-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-LI-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-LI-003",
      title: "《黄帝内经·素问·灵兰秘典论》（传统理论原文）",
      year: 2016,
      type: "traditional",
      level: "C",
      note: "“大肠者，传导之官，变化出焉。”原典成书年代无确切年份，年份字段按 schema（≥1900）填占位值，仅用于排序。",
    },
    {
      id: "SRC-LI-004",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["small-intestine", "lung"],
};
