import type { OrganContent } from "@/lib/schema";

/** 小肠 · 内容 v1  审核人：________  审核日期：________ */
export const smallIntestine: OrganContent = {
  id: "small-intestine",
  slug: "small-intestine",
  nameCn: "小肠",
  nameEn: "Small Intestine",
  system: "digestive",
  summary:
    "小肠是身体的主换热面：食物的绝大部分消化和吸收都发生在这根五六米长的管子里。",
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
        "小肠分十二指肠、空肠、回肠三段，成人全长约 5–7 米。真正撑起吸收能力的是表面结构：黏膜皱襞、绒毛、微绒毛一层层把面积放大，教科书给出的总量级约 200 平方米。胰液和胆汁从十二指肠汇入，脂肪和蛋白质主要在这里被分解。",
      claimIds: ["C-SI-STRUCT-1", "C-SI-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "小肠不是一根被动的水管：它有肠神经系统，和胰、胆、胃、菌群之间有持续的通信。回肠末端还有两项专门的活儿——吸收维生素 B12（需要胃提供的内因子）和回收胆汁酸进入肠肝循环。",
      claimIds: ["C-SI-REL-1", "C-SI-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把小肠读成“主换热面”，是便于理解的类比：输入的物质在这里被摊开、和酶充分接触，能吸收的过到另一侧，不能吸收的继续往下走。它描述的是表面积与交换，不代表小肠在处理“信息”。",
      claimIds: ["C-SI-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-SI-STRUCT-1",
      lens: "structure",
      text: "小肠分十二指肠、空肠、回肠，成人全长约 5–7 米；黏膜皱襞、绒毛和微绒毛把吸收面积扩大到约 200 平方米（教科书给的数量级，个体差异大）。",
      evidenceLevel: "A",
      sourceIds: ["SRC-SI-001"],
    },
    {
      id: "C-SI-STRUCT-2",
      lens: "structure",
      text: "胰液和胆汁经十二指肠大乳头进入小肠，是脂肪与蛋白质消化吸收的关键环节。",
      evidenceLevel: "A",
      sourceIds: ["SRC-SI-001", "SRC-SI-002"],
    },
    {
      id: "C-SI-REL-1",
      lens: "relationship",
      text: "维生素 B12 在回肠末端与内因子结合后被吸收；胆汁酸也主要在回肠末端被回收，进入肠肝循环。",
      evidenceLevel: "A",
      sourceIds: ["SRC-SI-002"],
    },
    {
      id: "C-SI-REL-2",
      lens: "relationship",
      text: "中医“心与小肠相表里”“小肠者受盛之官，化物出焉”是传统理论表述，不是现代解剖学的功能描述。",
      evidenceLevel: "C",
      sourceIds: ["SRC-SI-003"],
      caveat: "传统理论，非现代医学共识。",
    },
    {
      id: "C-SI-INFO-1",
      lens: "information",
      text: "把小肠描述为“主换热面”是概念类比。",
      evidenceLevel: "D",
      sourceIds: ["SRC-SI-004"],
      caveat: "概念类比，不构成医学解释。",
    },
  ],
  misconceptions: [
    {
      myth: "小肠越长，吸收越好。",
      correction:
        "吸收能力主要看黏膜面积、绒毛与微绒毛是否完整、酶和转运体是否正常，不是看长度。小肠被切除一部分的人，靠的是剩余段的适应能力，而不是“管子还够长”。",
      sourceIds: ["SRC-SI-001"],
    },
    {
      myth: "小肠把食物“变成能量”。",
      correction:
        "小肠做的是分解和转运：把大分子拆成能被吸收的小分子，送进血液或淋巴。能量是在细胞里由这些分子进一步代谢产生的，不是一个器官单独完成的事。",
      sourceIds: ["SRC-SI-002"],
    },
  ],
  followups: [
    "小肠的“表面积”是怎么算出来的？",
    "为什么维生素 B12 一定要回肠末端吸收？",
    "肠神经系统为什么被叫作“第二大脑”？",
  ],
  sources: [
    {
      id: "SRC-SI-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-SI-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-SI-003",
      title: "《黄帝内经·素问·灵兰秘典论》（传统理论原文）",
      year: 2016,
      type: "traditional",
      level: "C",
      note: "“小肠者，受盛之官，化物出焉。”原典成书年代无确切年份，年份字段按 schema（≥1900）填占位值，仅用于排序。",
    },
    {
      id: "SRC-SI-004",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["stomach", "large-intestine", "gallbladder"],
};
