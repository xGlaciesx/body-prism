import type { OrganContent } from "@/lib/schema";

/** 膀胱 · 内容 v1  审核人：________  审核日期：________ */
export const bladder: OrganContent = {
  id: "bladder",
  slug: "bladder",
  nameCn: "膀胱",
  nameEn: "Urinary Bladder",
  system: "urinary",
  summary:
    "膀胱是一个会主动报告容量的储液袋：它储存尿液，也在合适的时候把“该排了”这件事送上来。",
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
        "膀胱是位于盆腔的肌性囊状器官，壁由平滑肌（逼尿肌）构成。成人膀胱容量约 300–500 毫升，尿意通常在充盈 150–250 毫升时出现。尿液经两侧输尿管进入膀胱，经尿道排出，出口处有尿道括约肌把守。",
      claimIds: ["C-BLAD-STRUCT-1", "C-BLAD-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "尿液的生成是持续的，膀胱负责储存，排尿是“储存—排空”的切换。这个切换由骶髓的排尿中枢与脑干、大脑皮层共同调节，所以它既是一个反射，也受意识影响。",
      claimIds: ["C-BLAD-REL-1", "C-BLAD-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把膀胱读成“带阈值的缓冲区”，是便于理解的类比：上游持续写入，缓冲区攒到水位线就上报一次，下游收到许可才清空。它描述的是储存与阈值，不代表膀胱在“思考”。",
      claimIds: ["C-BLAD-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-BLAD-STRUCT-1",
      lens: "structure",
      text: "膀胱是位于盆腔的肌性囊状器官，成人容量约 300–500 毫升，尿意通常在充盈 150–250 毫升时出现。",
      evidenceLevel: "A",
      sourceIds: ["SRC-BLAD-001"],
    },
    {
      id: "C-BLAD-STRUCT-2",
      lens: "structure",
      text: "排尿由逼尿肌收缩与尿道括约肌舒张协同完成，受自主神经与躯体神经双重控制。",
      evidenceLevel: "A",
      sourceIds: ["SRC-BLAD-001", "SRC-BLAD-002"],
    },
    {
      id: "C-BLAD-REL-1",
      lens: "relationship",
      text: "尿液由肾脏持续生成，膀胱承担储存；排尿反射由骶髓中枢与脑的高级中枢共同调节。",
      evidenceLevel: "A",
      sourceIds: ["SRC-BLAD-002"],
    },
    {
      id: "C-BLAD-REL-2",
      lens: "relationship",
      text: "中医“肾与膀胱相表里”“膀胱者，州都之官，津液藏焉，气化则能出矣”是传统理论表述，不是现代解剖学的功能描述。",
      evidenceLevel: "D",
      sourceIds: ["SRC-BLAD-003"],
      caveat: "传统理论，非现代医学共识。",
    },
    {
      id: "C-BLAD-INFO-1",
      lens: "information",
      text: "把膀胱描述为“带阈值的缓冲区”是概念类比。",
      evidenceLevel: "C",
      sourceIds: ["SRC-BLAD-004"],
      caveat: "概念类比，不构成医学解释。",
    },
  ],
  misconceptions: [
    {
      myth: "尿得多就是肾不好。",
      correction:
        "尿量受饮水量、气温、出汗、药物和习惯影响，波动很大。判断肾脏有没有问题要看检查，不是看次数。反过来，尿量少也不一定就是肾的毛病。",
      sourceIds: ["SRC-BLAD-002"],
    },
    {
      myth: "憋尿能“锻炼”膀胱，憋得住是身体好。",
      correction:
        "膀胱不是肌肉训练器械。偶尔憋一会儿通常没问题，但长期习惯性憋尿并不推荐；有尿意的时候尽量去，这是最省事的选择。",
      sourceIds: ["SRC-BLAD-001"],
    },
  ],
  followups: [
    "尿意是怎么“上报”到脑子的？",
    "膀胱的容量为什么能变化这么大？",
    "中医的“肾”和现代医学的肾差在哪里？",
  ],
  sources: [
    {
      id: "SRC-BLAD-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-BLAD-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-BLAD-003",
      title: "《黄帝内经·素问·灵兰秘典论》（传统理论原文）",
      year: 2016,
      type: "traditional",
      level: "D",
      note: "“膀胱者，州都之官，津液藏焉，气化则能出矣。”原典成书年代无确切年份，年份字段按 schema（≥1900）填占位值，仅用于排序。",
    },
    {
      id: "SRC-BLAD-004",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["kidney"],
};
