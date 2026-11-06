import { describe, it, expect } from "vitest";
import { validateContent } from "@/lib/validate-content";
import { organs } from "@/content/organs";

describe("内容完整性校验", () => {
  it("内容包与影响链没有悬空引用", () => {
    const errors = validateContent();
    // 第二个参数是断言失败时的提示，打印出全部错误方便定位
    expect(errors, errors.join("\n")).toEqual([]);
  });

  it("每个器官至少有 3 条 claim", () => {
    for (const organ of organs) {
      expect(
        organ.claims.length,
        `${organ.slug} 只有 ${organ.claims.length} 条 claim`,
      ).toBeGreaterThanOrEqual(3);
    }
  });
});
