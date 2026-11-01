/**
 * AI 策展人兜底答案。
 *
 * 用途：模型不可用、超时、或演示现场断网时，页面直接返回这里的答案。
 * 规则：
 * 1. 每条答案都必须能指回站内 claim 或器官内容；
 * 2. 不诊断、不开药、不给剂量；
 * 3. 遇到红旗症状，第一句必须是“请立即就医/联系急救”。
 */

export type CuratorAnswer = {
  id: string;
  /** 命中的关键词（小写，任一命中即可） */
  keywords: string[];
  /** 关联器官，用于“去看这个器官”的按钮 */
  organSlug: string;
  question: string;
  answer: string;
  /** 站内 claim id，页面上渲染成来源链接 */
  sourceClaimIds: string[];
  /** 红旗问题：UI 用醒目样式，不给任何自我处理建议 */
  urgent?: boolean;
};

export const curatorFallback: CuratorAnswer[] = [
  {
    id: "F-HR-1",
    keywords: ["心率", "心跳快", "运动", "跑步"],
    organSlug: "heart",
    question: "运动时心率为什么会变快？",
    answer:
      "运动时交感神经兴奋，心率与每搏输出量上升，心输出量可增加到静息时的数倍，把更多含氧血送到肌肉。这是正常的生理调节，不是“心脏被累坏”。",
    sourceClaimIds: ["C-HEART-REL-2"],
  },
  {
    id: "F-HR-2",
    keywords: ["瓣膜", "单向", "血液倒流"],
    organSlug: "heart",
    question: "心脏的瓣膜为什么只朝一个方向开？",
    answer:
      "四组瓣膜像单向阀门：心室收缩时房室瓣关闭、半月瓣打开；心室舒张时相反。这样血液只能按“心房→心室→动脉”的方向走。",
    sourceClaimIds: ["C-HEART-STRUCT-1"],
  },
  {
    id: "F-BR-1",
    keywords: ["10%", "百分之十", "大脑用了"],
    organSlug: "brain",
    question: "人是不是只用了大脑的 10%？",
    answer:
      "不是。影像学研究显示，绝大多数脑区在日常活动中都会被用到，只是参与程度不同。“只用 10%”是流传很广但没有科学依据的说法。",
    sourceClaimIds: ["C-BRAIN-STRUCT-1"],
  },
  {
    id: "F-BR-2",
    keywords: ["睡眠", "睡觉", "熬夜"],
    organSlug: "brain",
    question: "睡眠时脑在做什么？",
    answer:
      "睡眠不是“关机”。睡眠不足会改变注意力、情绪调节和代谢指标，具体影响因人而异。如果长期睡不好并影响白天生活，建议就医评估。",
    sourceClaimIds: ["C-BRAIN-REL-2"],
  },
  {
    id: "F-LU-1",
    keywords: ["膈肌", "吸气", "肺会自己"],
    organSlug: "lung",
    question: "肺会自己扩张吗？",
    answer:
      "平静吸气主要靠膈肌收缩：胸腔容积增大、胸内压下降，空气被“吸”进来。肺本身没有主动收缩的肌肉，是被动跟随的弹性器官。",
    sourceClaimIds: ["C-LUNG-REL-2"],
  },
  {
    id: "F-LU-2",
    keywords: ["肺泡", "气体交换", "氧气"],
    organSlug: "lung",
    question: "氧气是在哪里进入血液的？",
    answer:
      "在肺泡与毛细血管之间。肺泡壁很薄，外侧紧贴毛细血管，氧和二氧化碳依靠分压差扩散；成人肺泡总数约数亿个，总交换面积可达约 70 平方米。",
    sourceClaimIds: ["C-LUNG-STRUCT-1", "C-LUNG-STRUCT-2"],
  },
  {
    id: "F-LI-1",
    keywords: ["排毒", "护肝", "护肝片"],
    organSlug: "liver",
    question: "肝需要靠“排毒茶”来排毒吗？",
    answer:
      "不需要。肝本身持续进行代谢和转化，“排毒”不是严格的医学概念。任何保健品都不能替代就医，也不能抵消饮酒等风险。",
    sourceClaimIds: ["C-LIVER-REL-2"],
  },
  {
    id: "F-LI-2",
    keywords: ["两套血供", "门静脉", "肝动脉"],
    organSlug: "liver",
    question: "为什么肝有两套血供？",
    answer:
      "门静脉送来肠道吸收的营养和物质，肝动脉送来含氧血。两套血流在肝小叶里汇合，让肝一边“收货”一边“加工”。",
    sourceClaimIds: ["C-LIVER-STRUCT-2"],
  },
  {
    id: "F-KI-1",
    keywords: ["肾虚", "肾功能"],
    organSlug: "kidney",
    question: "“肾虚”就是肾功能不好吗？",
    answer:
      "不是一回事。“肾虚”是传统理论中的概念，和现代医学的肾功能指标不同。是否存在肾脏问题，需要靠血肌酐、尿检、影像等医学检查判断。",
    sourceClaimIds: ["C-KIDNEY-REL-1"],
  },
  {
    id: "F-KI-2",
    keywords: ["喝水", "多喝水", "水喝"],
    organSlug: "kidney",
    question: "水喝得越多越护肾吗？",
    answer:
      "适量饮水对多数人有益，但“越多越好”不成立；某些疾病状态下还需要限制液体。具体饮水量应结合个人情况，必要时咨询医生。",
    sourceClaimIds: ["C-KIDNEY-STRUCT-2"],
  },
  {
    id: "F-ST-1",
    keywords: ["胃酸", "中和", "抑酸"],
    organSlug: "stomach",
    question: "胃酸是坏东西，应该中和掉吗？",
    answer:
      "胃酸参与蛋白质消化和防御。长期自行服用抑酸药可能掩盖症状；是否需要用药应由医生判断，这里不提供任何用药建议。",
    sourceClaimIds: ["C-STOMACH-STRUCT-2"],
  },
  {
    id: "F-ST-2",
    keywords: ["消化自己", "胃壁", "黏液"],
    organSlug: "stomach",
    question: "胃为什么不会把自己消化掉？",
    answer:
      "胃黏膜表面有黏液—碳酸氢盐屏障和紧密连接，让胃壁不被自身酸侵蚀；这套屏障受损时才可能出现损伤。",
    sourceClaimIds: ["C-STOMACH-STRUCT-2"],
  },
];

/**
 * 红旗问题：不回答医学细节，只引导就医。
 * 命中后 UI 应显示醒目提示，并隐藏“继续追问”。
 */
export const urgentPatterns: { keywords: string[]; message: string }[] = [
  {
    keywords: ["胸痛", "胸口痛", "胸闷", "压迫感"],
    message:
      "胸痛、胸闷或压迫感可能是急症信号。请立即停止活动并就医；如果症状持续或加重，拨打 120。本项目不提供诊断，也不会给出任何用药建议。",
  },
  {
    keywords: ["呼吸困难", "喘不上气", "窒息"],
    message:
      "出现明显呼吸困难请立即就医或拨打 120。不要依赖网站上的任何自我处理方法。",
  },
  {
    keywords: ["昏倒", "晕厥", "意识不清", "抽搐"],
    message:
      "意识改变属于急症信号，请立即呼叫急救（120），不要自行处理。",
  },
  {
    keywords: ["大出血", "吐血", "便血", "血便"],
    message:
      "大量出血或呕血、便血请立即就医或拨打 120。本项目不提供诊断或止血建议。",
  },
];

/** 预生成答案匹配：先查红旗，再查普通问题，最后给默认引导。 */
export function pickFallback(question: string): {
  kind: "urgent" | "answer" | "default";
  urgentMessage?: string;
  answer?: CuratorAnswer;
} {
  const q = question.toLowerCase();

  for (const p of urgentPatterns) {
    if (p.keywords.some((k) => q.includes(k.toLowerCase()))) {
      return { kind: "urgent", urgentMessage: p.message };
    }
  }

  const hit = curatorFallback.find((a) =>
    a.keywords.some((k) => q.includes(k.toLowerCase())),
  );
  if (hit) return { kind: "answer", answer: hit };

  return { kind: "default" };
}

/** 策展人统一的返回结构（真实模型与本地兜底共用）。sourceIds 是来源 ID。 */
export type CuratorResult =
  | { kind: "answer"; answer: string; sourceIds: string[] }
  | { kind: "urgent"; urgentMessage: string }
  | { kind: "default" };
