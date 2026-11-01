import type { OrganContent } from "@/lib/schema";

/** 脑 · 内容 v1  审核人：________  审核日期：________ */
export const brain: OrganContent = {
  id: "brain",
  slug: "brain",
  nameCn: "脑",
  nameEn: "Brain",
  system: "nervous",
  summary:
    "脑是身体里最复杂的信号网络：它接收、预测、比较，再决定要不要行动。",
  readingMinutes: 7,
  camera: {
    position: [0, 0, 3.6],
    target: [0, 0, 0],
    fov: 45,
  },
  lenses: {
    structure: {
      title: "结构之镜",
      body:
        "脑分为大脑、小脑和脑干。大脑皮层按沟回分成额叶、顶叶、颞叶、枕叶；不同区域参与运动、感觉、听觉、视觉和语言。脑组织依赖持续的血流供氧，几乎没有能量储备。",
      claimIds: ["C-BRAIN-STRUCT-1", "C-BRAIN-STRUCT-2"],
      visual: "3d-layer",
    },
    relationship: {
      title: "关系之镜",
      body:
        "脑通过自主神经、激素和免疫信号与心脏、肺、胃肠持续通信。睡眠、运动、进食和压力都会改变这套通信的状态；肠—脑之间是双向的，不是“脑单方面指挥身体”。",
      claimIds: ["C-BRAIN-REL-1", "C-BRAIN-REL-2"],
      visual: "network",
    },
    information: {
      title: "信息之镜",
      body:
        "把脑读成一台“预测机器”，是认知科学里的一种模型，用来解释知觉和行动，不是唯一解释。它是概念类比，不能用来给任何人下诊断。",
      claimIds: ["C-BRAIN-INFO-1"],
      visual: "signal-flow",
    },
  },
  claims: [
    {
      id: "C-BRAIN-STRUCT-1",
      lens: "structure",
      text: "大脑皮层按解剖分为额叶、顶叶、颞叶和枕叶，不同区域参与运动、感觉、听觉、视觉和语言等功能。",
      evidenceLevel: "A",
      sourceIds: ["SRC-BRAIN-001"],
    },
    {
      id: "C-BRAIN-STRUCT-2",
      lens: "structure",
      text: "成人脑约有 860 亿个神经元，数量级来自神经解剖学计数研究。",
      evidenceLevel: "B",
      sourceIds: ["SRC-BRAIN-002"],
      caveat: "不同计数方法给出的数值有差异，页面使用“约 860 亿”并注明来源。",
    },
    {
      id: "C-BRAIN-REL-1",
      lens: "relationship",
      text: "脑与胃肠道之间存在双向通信（肠—脑轴），涉及迷走神经、激素和免疫信号。",
      evidenceLevel: "B",
      sourceIds: ["SRC-BRAIN-003"],
      caveat: "机制仍在研究中，页面不据此给出任何治疗或饮食建议。",
    },
    {
      id: "C-BRAIN-REL-2",
      lens: "relationship",
      text: "睡眠不足会改变注意力、情绪调节和代谢指标，具体影响因人而异。",
      evidenceLevel: "B",
      sourceIds: ["SRC-BRAIN-001"],
    },
    {
      id: "C-BRAIN-INFO-1",
      lens: "information",
      text: "把脑描述为“预测机器”是认知科学中的一种模型，属于概念类比，不是临床诊断工具。",
      evidenceLevel: "C",
      sourceIds: ["SRC-BRAIN-004"],
      caveat: "概念类比；同一现象存在多种理论解释。",
    },
  ],
  misconceptions: [
    {
      myth: "人类只用了大脑的 10%。",
      correction:
        "这是流传很广的说法，但没有科学依据。影像学研究显示，绝大多数脑区在日常活动中都会被用到，只是参与程度不同。",
      sourceIds: ["SRC-BRAIN-001"],
    },
    {
      myth: "左脑理性、右脑感性，所以人是“左脑型”或“右脑型”。",
      correction:
        "左右半球在部分功能上有分工（如语言优势），但复杂任务几乎都需要两侧协同。“左脑型/右脑型人格”不是被证实的分类。",
      sourceIds: ["SRC-BRAIN-001"],
    },
  ],
  followups: [
    "为什么脑几乎不能储存能量？",
    "睡眠时脑在做什么？",
    "肠—脑轴真的会影响情绪吗？",
    "左右半球的分工是怎么被发现的？",
  ],
  sources: [
    {
      id: "SRC-BRAIN-001",
      title: "Principles of Neural Science (6th ed.)",
      authors: ["Eric R. Kandel", "John D. Koester", "Sarah H. Mack", "Steven A. Siegelbaum"],
      year: 2021,
      type: "textbook",
      level: "A",
    },
    {
      id: "SRC-BRAIN-002",
      title: "Equal numbers of neuronal and nonneuronal cells make the human brain an isometrically scaled-up primate brain",
      authors: ["Frederico A. C. Azevedo et al."],
      year: 2009,
      type: "review",
      level: "B",
      doi: "10.1002/cne.21974",
    },
    {
      id: "SRC-BRAIN-003",
      title: "The gut-brain axis: interactions between enteric microbiota, central and enteric nervous systems",
      authors: ["Marilia Carabotti et al."],
      year: 2015,
      type: "review",
      level: "B",
    },
    {
      id: "SRC-BRAIN-004",
      title: "本项目信息论叙事说明（概念类比，非研究结论）",
      year: 2026,
      type: "other",
      level: "C",
    },
  ],
  related: ["heart", "stomach"],
};
