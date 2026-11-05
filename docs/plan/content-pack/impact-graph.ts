/**
 * 影响链（Impact Chain）种子数据 v1
 *
 * 用途：回答"这个器官受谁影响、影响谁、出问题可能有什么表现"。
 *
 * 三条硬规则（写进代码，不靠自觉）：
 * 1. 每条边必须有 caveat——至少写"关联不等于因果"或"存在个体差异"；
 * 2. 每条边的 sourceIds 必须指向现有的 organ 内容包里的 SRC-* 编号，
 *    悬空即构建失败（在 src/lib/content.ts 里加一次校验即可）；
 * 3. manifestations 只描述"可能相关的表现"，**不是症状自查**，
 *    界面上必须固定展示 NOT_DIAGNOSIS_NOTICE。
 *
 * ⚠️ 医学审核：每条边由临床医学成员逐条确认机制与证据等级后签字，
 *    审核记录写进 docs/medical-review-impact-graph.md。
 */

export type ImpactLevel = "A" | "B" | "C" | "D";
export type ImpactNodeKind = "organ" | "function" | "manifestation";
export type ImpactRelation = "affects" | "modulates" | "manifests";

export type ImpactNode = {
  id: string;
  kind: ImpactNodeKind;
  nameCn: string;
  /** organ 节点用它跳到 /organ/[slug] */
  organSlug?: string;
  /** manifestation 专用：急症表现，点击先给就医提示 */
  redFlag?: boolean;
  /** 一句话说明，用于 hover / 卡片 */
  note?: string;
};

export type ImpactEdge = {
  id: string;
  from: string;
  to: string;
  relation: ImpactRelation;
  /** 一句话机制：说清"怎么过去的"，不要写结论 */
  mechanism: string;
  evidenceLevel: ImpactLevel;
  sourceIds: string[];
  /** 必填：关联≠因果 / 个体差异 / 仅为常见机制之一 */
  caveat: string;
};

export const NOT_DIAGNOSIS_NOTICE =
  "以下为科普性的可能关联，不是症状自查，也不能用来判断某个器官是否有问题。" +
  "同样的表现可能来自其他原因；如有不适请就医，急症请拨打 120。";

export const impactNodes: ImpactNode[] = [
  // ── 器官层 ──────────────────────────────────────────────
  { id: "organ:heart", kind: "organ", nameCn: "心脏", organSlug: "heart" },
  { id: "organ:brain", kind: "organ", nameCn: "脑", organSlug: "brain" },
  { id: "organ:lung", kind: "organ", nameCn: "肺", organSlug: "lung" },
  { id: "organ:liver", kind: "organ", nameCn: "肝", organSlug: "liver" },
  { id: "organ:kidney", kind: "organ", nameCn: "肾", organSlug: "kidney" },
  { id: "organ:stomach", kind: "organ", nameCn: "胃", organSlug: "stomach" },
  { id: "organ:spleen", kind: "organ", nameCn: "脾", organSlug: "spleen" },
  { id: "organ:gallbladder", kind: "organ", nameCn: "胆囊", organSlug: "gallbladder" },
  { id: "organ:small-intestine", kind: "organ", nameCn: "小肠", organSlug: "small-intestine" },
  { id: "organ:large-intestine", kind: "organ", nameCn: "大肠", organSlug: "large-intestine" },
  { id: "organ:bladder", kind: "organ", nameCn: "膀胱", organSlug: "bladder" },

  // ── 功能层 ──────────────────────────────────────────────
  { id: "fn:blood-pressure", kind: "function", nameCn: "血压", note: "循环系统的压力" },
  { id: "fn:blood-volume", kind: "function", nameCn: "血容量", note: "体内的液体总量" },
  { id: "fn:oxygenation", kind: "function", nameCn: "氧合", note: "血液携带氧的能力" },
  { id: "fn:coagulation", kind: "function", nameCn: "凝血", note: "止血能力" },
  { id: "fn:albumin", kind: "function", nameCn: "白蛋白", note: "维持血管内胶体渗透压" },
  { id: "fn:bilirubin", kind: "function", nameCn: "胆红素", note: "血红蛋白分解产物" },
  { id: "fn:glucose", kind: "function", nameCn: "血糖", note: "血糖稳定" },
  { id: "fn:erythropoiesis", kind: "function", nameCn: "红细胞生成", note: "造血" },
  { id: "fn:autonomic", kind: "function", nameCn: "自主神经", note: "交感/副交感调节" },
  { id: "fn:sleep", kind: "function", nameCn: "睡眠", note: "睡眠-觉醒调节" },
  { id: "fn:immune-defense", kind: "function", nameCn: "免疫防御", note: "识别并清除病原体" },
  { id: "fn:absorption", kind: "function", nameCn: "吸收", note: "把小分子转运进体内" },
  { id: "fn:water-absorption", kind: "function", nameCn: "水与电解质回收", note: "在结肠回收水和盐" },
  { id: "fn:urine-storage", kind: "function", nameCn: "储尿", note: "在两次排尿之间储存尿液" },

  // ── 表现层（不是症状自查）────────────────────────────────
  { id: "man:dyspnea", kind: "manifestation", nameCn: "气短", redFlag: true },
  { id: "man:edema", kind: "manifestation", nameCn: "水肿" },
  { id: "man:fatigue", kind: "manifestation", nameCn: "乏力" },
  { id: "man:palpitation", kind: "manifestation", nameCn: "心悸" },
  { id: "man:jaundice", kind: "manifestation", nameCn: "黄疸" },
  { id: "man:ascites", kind: "manifestation", nameCn: "腹水" },
  { id: "man:nocturia", kind: "manifestation", nameCn: "夜尿增多" },
  { id: "man:anemia", kind: "manifestation", nameCn: "贫血" },
  { id: "man:bleeding", kind: "manifestation", nameCn: "出血倾向" },
  { id: "man:heartburn", kind: "manifestation", nameCn: "烧心反酸" },
  { id: "man:cough", kind: "manifestation", nameCn: "咳嗽" },
  { id: "man:confusion", kind: "manifestation", nameCn: "意识改变", redFlag: true },
  { id: "man:infection-prone", kind: "manifestation", nameCn: "反复感染" },
  { id: "man:ruq-pain", kind: "manifestation", nameCn: "右上腹不适" },
  { id: "man:diarrhea", kind: "manifestation", nameCn: "腹泻" },
  { id: "man:constipation", kind: "manifestation", nameCn: "便秘" },
  { id: "man:weight-loss", kind: "manifestation", nameCn: "体重下降" },
  { id: "man:urinary-frequency", kind: "manifestation", nameCn: "尿频" },
  { id: "man:hematuria", kind: "manifestation", nameCn: "血尿", redFlag: true },
];

const CAVEAT_CORRELATION = "关联不等于因果；这里只描述常见机制之一。";
const CAVEAT_INDIVIDUAL = "存在个体差异；程度与表现因人而异。";

export const impactEdges: ImpactEdge[] = [
  // ── 肾 ────────────────────────────────────────────────
  {
    id: "E-KID-BP",
    from: "organ:kidney",
    to: "fn:blood-pressure",
    relation: "modulates",
    mechanism:
      "肾脏通过肾素-血管紧张素-醛固酮系统与钠水排泄调节血压；肾功能受损时钠水潴留、该系统激活，血压可升高。",
    evidenceLevel: "A",
    sourceIds: ["SRC-KIDNEY-002", "SRC-HEART-002"],
    caveat: "慢性肾病与高血压互为因果，这条边不代表单向因果。",
  },
  {
    id: "E-BP-KID",
    from: "fn:blood-pressure",
    to: "organ:kidney",
    relation: "affects",
    mechanism: "长期血压升高会增加肾小球内压力，是慢性肾损害的常见原因之一。",
    evidenceLevel: "A",
    sourceIds: ["SRC-KIDNEY-002"],
    caveat: CAVEAT_CORRELATION,
  },
  {
    id: "E-KID-VOL",
    from: "organ:kidney",
    to: "fn:blood-volume",
    relation: "modulates",
    mechanism: "肾脏通过调节钠和水的排出量维持体液容量。",
    evidenceLevel: "A",
    sourceIds: ["SRC-KIDNEY-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-KID-EPO",
    from: "organ:kidney",
    to: "fn:erythropoiesis",
    relation: "modulates",
    mechanism: "肾脏分泌促红细胞生成素（EPO），刺激骨髓生成红细胞。",
    evidenceLevel: "A",
    sourceIds: ["SRC-KIDNEY-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-EPO-ANEMIA",
    from: "fn:erythropoiesis",
    to: "man:anemia",
    relation: "manifests",
    mechanism: "红细胞生成减少时，血液携氧能力下降，可表现为贫血。",
    evidenceLevel: "A",
    sourceIds: ["SRC-KIDNEY-002"],
    caveat: CAVEAT_CORRELATION,
  },
  {
    id: "E-KID-EDEMA",
    from: "organ:kidney",
    to: "man:edema",
    relation: "manifests",
    mechanism: "钠水潴留使血管内与组织间液体增多，可出现水肿。",
    evidenceLevel: "A",
    sourceIds: ["SRC-KIDNEY-002"],
    caveat: "水肿的常见原因还包括心源性、肝源性与局部因素，不能据此判断肾脏有问题。",
  },
  {
    id: "E-KID-NOCTURIA",
    from: "organ:kidney",
    to: "man:nocturia",
    relation: "manifests",
    mechanism: "肾脏浓缩尿液的能力下降时，夜间尿量可相对增多。",
    evidenceLevel: "A",
    sourceIds: ["SRC-KIDNEY-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-KID-FATIGUE",
    from: "organ:kidney",
    to: "man:fatigue",
    relation: "manifests",
    mechanism: "肾功能下降时贫血、代谢废物蓄积等因素可导致乏力。",
    evidenceLevel: "B",
    sourceIds: ["SRC-KIDNEY-002"],
    caveat: "乏力原因极多，不具备指向性。",
  },

  // ── 心 ────────────────────────────────────────────────
  {
    id: "E-HEART-BP",
    from: "organ:heart",
    to: "fn:blood-pressure",
    relation: "affects",
    mechanism: "心输出量是血压的决定因素之一：每搏输出量或心率变化会改变血压。",
    evidenceLevel: "A",
    sourceIds: ["SRC-HEART-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-BP-HEART",
    from: "fn:blood-pressure",
    to: "organ:heart",
    relation: "affects",
    mechanism: "长期血压升高增加心脏射血的后负荷，可导致心肌肥厚。",
    evidenceLevel: "A",
    sourceIds: ["SRC-HEART-002"],
    caveat: CAVEAT_CORRELATION,
  },
  {
    id: "E-HEART-DYSPNEA",
    from: "organ:heart",
    to: "man:dyspnea",
    relation: "manifests",
    mechanism: "左心功能不全时肺静脉压力升高、肺淤血，可表现为活动后气短。",
    evidenceLevel: "A",
    sourceIds: ["SRC-HEART-002"],
    caveat: "气短最常见的原因还包括肺部疾病与贫血；出现静息气短应尽快就医。",
  },
  {
    id: "E-HEART-EDEMA",
    from: "organ:heart",
    to: "man:edema",
    relation: "manifests",
    mechanism: "右心功能不全时体循环淤血，可出现下肢水肿。",
    evidenceLevel: "A",
    sourceIds: ["SRC-HEART-002"],
    caveat: "单侧水肿更常见于局部原因，需就医评估。",
  },
  {
    id: "E-HEART-PALP",
    from: "organ:heart",
    to: "man:palpitation",
    relation: "manifests",
    mechanism: "心律失常或心输出量变化时，人可感到心跳加快、加重或不规则。",
    evidenceLevel: "A",
    sourceIds: ["SRC-HEART-001"],
    caveat: "心悸也常见于焦虑、咖啡因、贫血与甲状腺功能异常。",
  },
  {
    id: "E-HEART-FATIGUE",
    from: "organ:heart",
    to: "man:fatigue",
    relation: "manifests",
    mechanism: "心输出量下降时组织灌注不足，可出现活动耐力下降与乏力。",
    evidenceLevel: "B",
    sourceIds: ["SRC-HEART-002"],
    caveat: "乏力原因极多，不具备指向性。",
  },

  // ── 肺 ────────────────────────────────────────────────
  {
    id: "E-LUNG-O2",
    from: "organ:lung",
    to: "fn:oxygenation",
    relation: "affects",
    mechanism: "肺泡与毛细血管间的气体交换决定血液的氧合程度。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LUNG-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-LUNG-DYSPNEA",
    from: "organ:lung",
    to: "man:dyspnea",
    relation: "manifests",
    mechanism: "气道阻力增加或换气面积减少时，可出现气短。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LUNG-002"],
    caveat: "静息状态下的气短属于需要尽快就医的情况。",
  },
  {
    id: "E-LUNG-COUGH",
    from: "organ:lung",
    to: "man:cough",
    relation: "manifests",
    mechanism: "气道受刺激或分泌物增多时，咳嗽反射被触发。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LUNG-002"],
    caveat: "咳嗽也常来自上气道、胃食管反流与药物因素。",
  },
  {
    id: "E-LUNG-HEART",
    from: "organ:lung",
    to: "organ:heart",
    relation: "affects",
    mechanism: "慢性缺氧可引起肺血管收缩、肺循环阻力升高，增加右心负荷。",
    evidenceLevel: "B",
    sourceIds: ["SRC-LUNG-002", "SRC-HEART-002"],
    caveat: CAVEAT_CORRELATION,
  },
  {
    id: "E-O2-BRAIN",
    from: "fn:oxygenation",
    to: "organ:brain",
    relation: "affects",
    mechanism: "脑对缺氧敏感，氧合下降时可出现注意力与认知功能的变化。",
    evidenceLevel: "B",
    sourceIds: ["SRC-BRAIN-002"],
    caveat: "认知变化的原因很多，不能据此推断脑或肺有问题。",
  },

  // ── 肝 ────────────────────────────────────────────────
  {
    id: "E-LIVER-COAG",
    from: "organ:liver",
    to: "fn:coagulation",
    relation: "affects",
    mechanism: "肝脏合成多种凝血因子，肝功能受损时凝血能力可下降。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LIVER-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-COAG-BLEED",
    from: "fn:coagulation",
    to: "man:bleeding",
    relation: "manifests",
    mechanism: "凝血因子不足时，止血过程变慢，可表现为容易出血或出血不易止住。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LIVER-002"],
    caveat: "出血倾向也可来自血小板、药物（如抗凝药）等因素。",
  },
  {
    id: "E-LIVER-ALB",
    from: "organ:liver",
    to: "fn:albumin",
    relation: "affects",
    mechanism: "白蛋白由肝脏合成，参与维持血管内的胶体渗透压。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LIVER-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-ALB-ASCITES",
    from: "fn:albumin",
    to: "man:ascites",
    relation: "manifests",
    mechanism: "白蛋白偏低时血管内胶体渗透压下降，液体可向腹腔等组织间隙移动。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LIVER-002"],
    caveat: "腹水的原因还包括心源性、肾源性与肿瘤等，不能自行归因。",
  },
  {
    id: "E-LIVER-BILI",
    from: "organ:liver",
    to: "fn:bilirubin",
    relation: "affects",
    mechanism: "肝脏摄取、结合并排泄胆红素，是其代谢的主要场所。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LIVER-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-BILI-JAUNDICE",
    from: "fn:bilirubin",
    to: "man:jaundice",
    relation: "manifests",
    mechanism: "胆红素在体内蓄积时，皮肤与巩膜可发黄。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LIVER-002"],
    caveat: "黄疸也可来自溶血或胆道梗阻，需要就医判断。",
  },
  {
    id: "E-LIVER-GLUCOSE",
    from: "organ:liver",
    to: "fn:glucose",
    relation: "modulates",
    mechanism: "肝脏通过糖原合成与分解参与维持血糖稳定。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LIVER-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-LIVER-BRAIN",
    from: "organ:liver",
    to: "organ:brain",
    relation: "affects",
    mechanism: "严重肝功能不全时，代谢产物蓄积可影响中枢神经系统功能。",
    evidenceLevel: "B",
    sourceIds: ["SRC-LIVER-002", "SRC-BRAIN-002"],
    caveat: "这是严重情况下的机制，不能用来解释日常的注意力或情绪变化。",
  },

  // ── 胃 ────────────────────────────────────────────────
  {
    id: "E-STOMACH-HEARTBURN",
    from: "organ:stomach",
    to: "man:heartburn",
    relation: "manifests",
    mechanism: "胃内容物反流至食管时，可产生烧心与反酸感。",
    evidenceLevel: "A",
    sourceIds: ["SRC-STOMACH-002"],
    caveat: "胸痛与烧心有时难以区分；出现压榨性胸痛应先排除心脏问题，立即就医。",
  },
  {
    id: "E-STOMACH-ANEMIA",
    from: "organ:stomach",
    to: "man:anemia",
    relation: "manifests",
    mechanism: "胃酸与内因子参与铁和维生素 B12 的吸收，胃功能改变时可影响造血原料。",
    evidenceLevel: "B",
    sourceIds: ["SRC-STOMACH-002"],
    caveat: CAVEAT_CORRELATION,
  },

  // ── 脑 ────────────────────────────────────────────────
  {
    id: "E-BRAIN-AUTONOMIC",
    from: "organ:brain",
    to: "fn:autonomic",
    relation: "modulates",
    mechanism: "下丘脑与脑干参与交感、副交感神经的调控。",
    evidenceLevel: "A",
    sourceIds: ["SRC-BRAIN-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-AUTONOMIC-HEART",
    from: "fn:autonomic",
    to: "organ:heart",
    relation: "modulates",
    mechanism: "交感神经加快心率与增强收缩力，迷走神经使其减慢。",
    evidenceLevel: "A",
    sourceIds: ["SRC-HEART-002", "SRC-BRAIN-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-AUTONOMIC-BP",
    from: "fn:autonomic",
    to: "fn:blood-pressure",
    relation: "modulates",
    mechanism: "自主神经通过调节血管张力与心率影响血压。",
    evidenceLevel: "A",
    sourceIds: ["SRC-HEART-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-BRAIN-SLEEP",
    from: "organ:brain",
    to: "fn:sleep",
    relation: "modulates",
    mechanism: "脑干、下丘脑与松果体等结构共同参与睡眠-觉醒节律的调节。",
    evidenceLevel: "A",
    sourceIds: ["SRC-BRAIN-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-BRAIN-CONFUSION",
    from: "organ:brain",
    to: "man:confusion",
    relation: "manifests",
    mechanism: "脑功能急性改变时可出现意识水平或注意力下降。",
    evidenceLevel: "A",
    sourceIds: ["SRC-BRAIN-002"],
    caveat: "意识改变属于急症表现，应立即就医。",
  },

  // ── 脾 ────────────────────────────────────────────────
  {
    id: "E-SPLEEN-IMMUNE",
    from: "organ:spleen",
    to: "fn:immune-defense",
    relation: "modulates",
    mechanism: "脾的白髓是血液里抗原与淋巴细胞相遇的场所，参与对血源性病原体的免疫应答。",
    evidenceLevel: "A",
    sourceIds: ["SRC-SPLEEN-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-IMMUNE-INFECTION",
    from: "fn:immune-defense",
    to: "man:infection-prone",
    relation: "manifests",
    mechanism: "对荚膜细菌的清除能力下降时，同类感染可能更容易发生、进展更快。",
    evidenceLevel: "B",
    sourceIds: ["SRC-SPLEEN-003"],
    caveat: "“反复感染”的原因很多，不能据此判断脾有问题；有发热应及时就医。",
  },
  {
    id: "E-SPLEEN-ANEMIA",
    from: "organ:spleen",
    to: "man:anemia",
    relation: "manifests",
    mechanism: "脾功能亢进时红细胞在脾内被过度破坏与扣押，可出现贫血。",
    evidenceLevel: "B",
    sourceIds: ["SRC-SPLEEN-003"],
    caveat: CAVEAT_CORRELATION,
  },

  // ── 胆囊 ──────────────────────────────────────────────
  {
    id: "E-LIVER-GB",
    from: "organ:liver",
    to: "organ:gallbladder",
    relation: "affects",
    mechanism: "肝细胞持续分泌胆汁，经肝内胆管流向胆囊储存与浓缩。",
    evidenceLevel: "A",
    sourceIds: ["SRC-GB-001"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-GB-ABSORPTION",
    from: "organ:gallbladder",
    to: "fn:absorption",
    relation: "modulates",
    mechanism: "进食后胆囊收缩排出的胆汁乳化脂肪，为脂肪酶提供作用界面，帮助脂肪吸收。",
    evidenceLevel: "A",
    sourceIds: ["SRC-GB-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-GB-RUQ",
    from: "organ:gallbladder",
    to: "man:ruq-pain",
    relation: "manifests",
    mechanism: "胆囊或胆道受阻、痉挛时，可出现右上腹不适。",
    evidenceLevel: "B",
    sourceIds: ["SRC-GB-003"],
    caveat: "右上腹不适的常见原因还包括胃、肝、肠道与肌肉因素，不能据此判断胆囊有问题。",
  },
  {
    id: "E-GB-JAUNDICE",
    from: "organ:gallbladder",
    to: "man:jaundice",
    relation: "manifests",
    mechanism: "胆道排出受阻时，结合胆红素返流入血，可出现黄疸。",
    evidenceLevel: "B",
    sourceIds: ["SRC-GB-003"],
    caveat: "黄疸原因分肝前、肝性、肝后三类，必须由医生判断；出现黄疸应就医。",
  },

  // ── 小肠 ──────────────────────────────────────────────
  {
    id: "E-SI-ABSORPTION",
    from: "organ:small-intestine",
    to: "fn:absorption",
    relation: "affects",
    mechanism: "小肠黏膜的绒毛与微绒毛提供巨大表面积，糖、氨基酸、脂肪酸和多数维生素在这里被转运吸收。",
    evidenceLevel: "A",
    sourceIds: ["SRC-SI-001"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-ABSORPTION-WEIGHT",
    from: "fn:absorption",
    to: "man:weight-loss",
    relation: "manifests",
    mechanism: "吸收面积或消化酶不足时，能量与营养素摄入效率下降，长期可表现为体重下降。",
    evidenceLevel: "B",
    sourceIds: ["SRC-SI-002"],
    caveat: "体重下降的原因很多（内分泌、肿瘤、情绪等），不具备指向性。",
  },
  {
    id: "E-SI-DIARRHEA",
    from: "organ:small-intestine",
    to: "man:diarrhea",
    relation: "manifests",
    mechanism: "小肠分泌与吸收失衡、或转运时间过快时，水分来不及回收，可出现腹泻。",
    evidenceLevel: "B",
    sourceIds: ["SRC-SI-001"],
    caveat: CAVEAT_CORRELATION,
  },

  // ── 大肠 ──────────────────────────────────────────────
  {
    id: "E-LI-WATER",
    from: "organ:large-intestine",
    to: "fn:water-absorption",
    relation: "affects",
    mechanism: "结肠回收粪便中的水和钠，使内容物由稀变稠。",
    evidenceLevel: "A",
    sourceIds: ["SRC-LI-001"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-LI-CONSTIPATION",
    from: "organ:large-intestine",
    to: "man:constipation",
    relation: "manifests",
    mechanism: "结肠推进减慢、内容物停留过久时水分被过度回收，可表现为排便困难。",
    evidenceLevel: "B",
    sourceIds: ["SRC-LI-001"],
    caveat: "便秘的常见原因包括饮水、活动、药物与作息，不能据此判断大肠有问题。",
  },
  {
    id: "E-LI-DIARRHEA",
    from: "organ:large-intestine",
    to: "man:diarrhea",
    relation: "manifests",
    mechanism: "结肠推进过快或水分回收不足时，粪便稀薄、次数增多。",
    evidenceLevel: "B",
    sourceIds: ["SRC-LI-002"],
    caveat: CAVEAT_CORRELATION,
  },

  // ── 膀胱 ──────────────────────────────────────────────
  {
    id: "E-KID-BLADDER",
    from: "organ:kidney",
    to: "organ:bladder",
    relation: "affects",
    mechanism: "尿液由肾脏持续生成，经输尿管流入膀胱储存。",
    evidenceLevel: "A",
    sourceIds: ["SRC-BLAD-002"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-BLADDER-STORAGE",
    from: "organ:bladder",
    to: "fn:urine-storage",
    relation: "affects",
    mechanism: "膀胱壁的逼尿肌在充盈时被动舒张，维持低压力储存。",
    evidenceLevel: "A",
    sourceIds: ["SRC-BLAD-001"],
    caveat: CAVEAT_INDIVIDUAL,
  },
  {
    id: "E-BLADDER-FREQ",
    from: "organ:bladder",
    to: "man:urinary-frequency",
    relation: "manifests",
    mechanism: "膀胱感觉敏感性升高或有效容量下降时，排尿次数可增多。",
    evidenceLevel: "B",
    sourceIds: ["SRC-BLAD-001"],
    caveat: "尿频也常见于饮水多、天冷、紧张与药物影响，不能据此判断膀胱有问题。",
  },
  {
    id: "E-BLADDER-HEMATURIA",
    from: "organ:bladder",
    to: "man:hematuria",
    relation: "manifests",
    mechanism: "膀胱或尿路黏膜受损、出血时，尿中可出现红细胞。",
    evidenceLevel: "B",
    sourceIds: ["SRC-BLAD-001"],
    caveat: "血尿必须就医检查，页面不提供任何自我判断。",
  },

  // ── 表里：中医的脏腑配对（传统理论，不是解剖学通路）──────────
  // 这五条是 D17 §2.5.5 里扩到 11 个器官的主要收获：
  // 五脏六腑的"表里"配对终于能画全。它们全部标 D 级，
  // 界面上必须显示"传统理论，非现代医学共识"。
  {
    id: "E-TCM-HEART-SI",
    from: "organ:heart",
    to: "organ:small-intestine",
    relation: "modulates",
    mechanism: "传统理论认为心与小肠相表里（手少阴心经与手太阳小肠经相表里）。",
    evidenceLevel: "D",
    sourceIds: ["SRC-SI-003"],
    caveat: "传统理论，非现代医学共识；不是解剖学或生理学上的通路。",
  },
  {
    id: "E-TCM-LIVER-GB",
    from: "organ:liver",
    to: "organ:gallbladder",
    relation: "modulates",
    mechanism: "传统理论认为肝与胆相表里（足厥阴肝经与足少阳胆经相表里）。",
    evidenceLevel: "D",
    sourceIds: ["SRC-GB-004"],
    caveat: "传统理论，非现代医学共识。注：肝与胆囊在解剖上确实相邻且有管道相连，但这是两件事。",
  },
  {
    id: "E-TCM-SPLEEN-ST",
    from: "organ:spleen",
    to: "organ:stomach",
    relation: "modulates",
    mechanism: "传统理论认为脾与胃相表里（足太阴脾经与足阳明胃经相表里）。",
    evidenceLevel: "D",
    sourceIds: ["SRC-SPLEEN-004"],
    caveat: "传统理论，非现代医学共识；此处“脾”指运化功能，与解剖学脾脏不是同一概念。",
  },
  {
    id: "E-TCM-LUNG-LI",
    from: "organ:lung",
    to: "organ:large-intestine",
    relation: "modulates",
    mechanism: "传统理论认为肺与大肠相表里（手太阴肺经与手阳明大肠经相表里）。",
    evidenceLevel: "D",
    sourceIds: ["SRC-LI-003"],
    caveat: "传统理论，非现代医学共识。",
  },
  {
    id: "E-TCM-KIDNEY-BLADDER",
    from: "organ:kidney",
    to: "organ:bladder",
    relation: "modulates",
    mechanism: "传统理论认为肾与膀胱相表里（足少阴肾经与足太阳膀胱经相表里）。",
    evidenceLevel: "D",
    sourceIds: ["SRC-BLAD-003"],
    caveat: "传统理论，非现代医学共识。注：肾生成尿液、膀胱储存尿液是两条不同的边，别混在一起。",
  },
];

/** 取某个器官的一阶子图：入边 + 出边 + 邻居节点 */
export function getImpactSubgraph(organId: string) {
  const edges = impactEdges.filter(
    (e) => e.from === organId || e.to === organId,
  );
  const nodeIds = new Set<string>([organId]);
  edges.forEach((e) => {
    nodeIds.add(e.from);
    nodeIds.add(e.to);
  });
  return {
    nodes: impactNodes.filter((n) => nodeIds.has(n.id)),
    edges,
  };
}

/**
 * 给 AI 用：把子图压成提示词里的紧凑文本。
 * 只给模型"能看见的边"，模型无法走出图外。
 */
export function subgraphToPrompt(organId: string): string {
  const { edges } = getImpactSubgraph(organId);
  const name = (id: string) =>
    impactNodes.find((n) => n.id === id)?.nameCn ?? id;
  return edges
    .map(
      (e) =>
        `- ${name(e.from)} →（${e.relation}）→ ${name(e.to)}｜${e.mechanism}` +
        `｜证据 ${e.evidenceLevel}｜来源 ${e.sourceIds.join(",")}`,
    )
    .join("\n");
}
