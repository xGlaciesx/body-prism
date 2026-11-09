import { bladder } from "./bladder";
import { brain } from "./brain";
import { gallbladder } from "./gallbladder";
import { heart } from "./heart";
import { kidney } from "./kidney";
import { largeIntestine } from "./large-intestine";
import { liver } from "./liver";
import { lung } from "./lung";
import { smallIntestine } from "./small-intestine";
import { spleen } from "./spleen";
import { stomach } from "./stomach";
import type { OrganContent } from "@/lib/schema";

/**
 * 11 个器官的入口（五脏六腑缺三焦）。
 *
 * 前 6 个是核心（心、脑、肺、肝、肾、胃），后 5 个是后来扩的
 * （脾、胆、小肠、大肠、膀胱）。三维上 12 个热点全部对应到这里的某一页，
 * 一个热点一页，不允许有点进去 404 的器官。
 *
 * 如果只想先上线一部分，把数组截短即可，其余 import 保留不会报错。
 */
export const organs: OrganContent[] = [
  // ── 核心 6 ──
  heart,
  brain,
  lung,
  liver,
  kidney,
  stomach,
  // ── 扩展 5 ──
  spleen,
  gallbladder,
  smallIntestine,
  largeIntestine,
  bladder,
];

export const organBySlug = new Map(organs.map((o) => [o.slug, o]));

/** 三维热点里的 tier 和这里的划分要一致 */
export const extendedSlugs = new Set([
  "spleen",
  "gallbladder",
  "small-intestine",
  "large-intestine",
  "bladder",
]);

export {
  bladder,
  brain,
  gallbladder,
  heart,
  kidney,
  largeIntestine,
  liver,
  lung,
  smallIntestine,
  spleen,
  stomach,
};
