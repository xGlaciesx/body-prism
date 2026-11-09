/**
 * 医学免责与红旗提示文案。
 *
 * 三条硬约束：
 * 1. NOT_DIAGNOSIS_NOTICE 从 impact-graph 重新导出，不在这里复制文字，避免两处漂移。
 * 2. RED_FLAG_NOTICE 只允许出现「就医」和「拨打 120」两个动作，不给任何自我处理建议。
 * 3. RED_FLAG_KEYWORDS 是红旗词表的正式实现，needUrgentHelp 用它做 includes 判定。
 */
export { NOT_DIAGNOSIS_NOTICE } from "@/content/impact-graph";

export const RED_FLAG_NOTICE =
  "你点的这类表现，可能是需要尽快就医的信号。这个网站只做科普，不能判断你的情况，" +
  "也不能替代医生。如果它正在发生、或比平时明显加重，请立即就医；紧急情况请拨打 120。";

/** 红旗词表：命中任一即视为需要尽快就医，只做 includes 匹配。 */
export const RED_FLAG_KEYWORDS: string[] = [
  "胸痛",
  "胸闷压榨",
  "呼吸困难",
  "喘不上气",
  "意识不清",
  "昏迷",
  "抽搐",
  "大出血",
  "止不住血",
  "剧烈头痛",
  "突然说不出话",
];
