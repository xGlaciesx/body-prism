import type { OrganContent } from "@/lib/schema";

/** 脾 · 内容 v1  审核人：________  审核日期：________ */
export const spleen: OrganContent = {
  id: "spleen",
  slug: "spleen",
  nameCn: "脾",
  nameEn: "Spleen",
  system: "lymphatic",
  summary:
    "脾是血液的质检站：它一边筛掉衰老的红细胞，一边对血液里出现的病原体启动免疫应答。",
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
        "脾位于左上腹、胃的左后方，是人体最大的淋巴器官。它分两部分：白髓是淋巴组织，负责免疫应答；红髓是海绵状的血窦网，负责过滤血液、清除衰老或受损的红细胞，并储存一部分血小板。",
      claimIds: ["C-SPLEEN-STRUCT-1", "C-SPLEEN-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "脾和血液循环、免疫监视绑在一起：血液每流经脾一次就被筛一遍。脾切除或脾功能低下的人，对带荚膜的细菌（如肺炎链球菌）抵抗力下降，这类感染进展可以很快，所以这类人需要按医生安排接种疫苗、发烧时尽早看医生但不能据此自我诊断。",
      claimIds: ["C-SPLEEN-REL-1", "C-SPLEEN-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把脾读成“血液的质检与回收站”，是便于理解的类比：进来的一批血液被逐项检查，不合格的细胞被回收，检测到异常就发出警报。它描述的是过滤和免疫这两件事，不代表脾在传递情绪。",
      claimIds: ["C-SPLEEN-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-SPLEEN-STRUCT-1",
      lens: "structure",
      text: "脾是人体最大的淋巴器官，位于左上腹，分为白髓与红髓两部分。",
      evidenceLevel: "A",
      sourceIds: ["SRC-SPLEEN-001"],
    },
    {
      id: "C-SPLEEN-STRUCT-2",
      lens: "structure",
      text: "红髓过滤血液、清除衰老或受损的红细胞；白髓参与对血源性抗原的免疫应答。",
      evidenceLevel: "A",
      sourceIds: ["SRC-SPLEEN-001", "SRC-SPLEEN-002"],
    },
    {
      id: "C-SPLEEN-REL-1",
      lens: "relationship",
      text: "脾切除或脾功能低下时，对荚膜细菌（如肺炎链球菌）的易感性升高，这类感染可能进展迅速。",
      evidenceLevel: "B",
      sourceIds: ["SRC-SPLEEN-003"],
      caveat: "具体接种与随访方案由医生决定；页面不给任何用药或疫苗建议。",
    },
    {
      id: "C-SPLEEN-REL-2",
      lens: "relationship",
      text: "中医所说的“脾主运化”是传统理论表述，指的是消化吸收功能，与解剖学上的脾脏不是同一个概念。",
      evidenceLevel: "D",
      sourceIds: ["SRC-SPLEEN-004"],
      caveat: "传统理论，非现代医学共识；同名不同物是中医与西医对照时最常见的误会。",
    },
    {
      id: "C-SPLEEN-INFO-1",
      lens: "information",
      text: "把脾描述为“血液的质检与回收站”是概念类比。",
      evidenceLevel: "C",
      sourceIds: ["SRC-SPLEEN-005"],
      caveat: "概念类比，不构成医学解释。",
    },
  ],
  misconceptions: [
    {
      myth: "中医说的“脾”就是解剖学上的脾脏，脾虚就是脾脏有病。",
      correction:
        "两个体系用的是同一个字，指的不是同一个东西。中医的“脾”讲的是运化水谷这套功能，属于传统理论；解剖学的脾是一个具体的淋巴器官。看到“脾虚”不能推断脾脏有问题，看到脾脏的检查结果也不能反推中医的证。",
      sourceIds: ["SRC-SPLEEN-004"],
    },
    {
      myth: "脾脏切掉了人就废了。",
      correction:
        "脾有功能上的冗余，其他淋巴组织和肝脏也承担部分过滤功能，多数人切除后可以正常生活。需要留意的是感染风险升高，这件事要靠疫苗和及时就医来管，不是靠补品。",
      sourceIds: ["SRC-SPLEEN-003"],
    },
  ],
  followups: [
    "脾为什么能“筛”血液？",
    "脾切除以后需要特别注意什么？",
    "中医的“脾”和西医的“脾”差在哪里？",
  ],
  sources: [
    {
      id: "SRC-SPLEEN-001",
      title: "Gray's Anatomy for Students (5th ed.)",
      authors: ["Richard L. Drake", "A. Wayne Vogl", "Adam W. M. Mitchell"],
      year: 2023,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-SPLEEN-002",
      title: "Guyton and Hall Textbook of Medical Physiology (14th ed.)",
      authors: ["John E. Hall", "Michael E. Hall"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-SPLEEN-003",
      title: "Robbins & Cotran Pathologic Basis of Disease (10th ed.)",
      authors: ["Vinay Kumar", "Abul K. Abbas", "Jon C. Aster"],
      year: 2020,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-SPLEEN-004",
      title: "《黄帝内经·素问·灵兰秘典论》（传统理论原文）",
      year: 2016,
      type: "traditional",
      level: "D",
      note: "“脾胃者，仓廪之官，五味出焉。”原典成书年代无确切年份，年份字段按 schema（≥1900）填占位值，仅用于排序。",
    },
    {
      id: "SRC-SPLEEN-005",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["stomach", "liver"],
};
