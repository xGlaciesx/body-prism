import { brain } from "./brain";
import { heart } from "./heart";
import { kidney } from "./kidney";
import { liver } from "./liver";
import { lung } from "./lung";
import { stomach } from "./stomach";
import type { OrganContent } from "@/lib/schema";

/**
 * 六个器官的入口。
 * 如果只想先上线一个，把数组改成 [heart]，其余 import 保留也不会报错。
 */
export const organs: OrganContent[] = [
  heart,
  brain,
  lung,
  liver,
  kidney,
  stomach,
];

export const organBySlug = new Map(organs.map((o) => [o.slug, o]));

export { brain, heart, kidney, liver, lung, stomach };
