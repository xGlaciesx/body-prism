import type { OrganContent } from "@/lib/schema";
import { organs, organBySlug } from "@/content/organs";

export function getAllOrgans(): OrganContent[] {
  return organs;
}

export function getOrgan(slug: string): OrganContent | undefined {
  return organBySlug.get(slug);
}

/**
 * 校验单个器官的引用完整性：claim.sourceIds 必须在 sources 里，
 * lensCard.claimIds 必须在 claims 里。返回错误列表，空数组表示通过。
 */
export function assertOrganIntegrity(organ: OrganContent): string[] {
  const errors: string[] = [];
  const sourceIds = new Set(organ.sources.map((s) => s.id));
  const claimIds = new Set(organ.claims.map((c) => c.id));

  for (const claim of organ.claims) {
    for (const id of claim.sourceIds) {
      if (!sourceIds.has(id)) {
        errors.push(`claim ${claim.id} 引用了不存在的 source ${id}`);
      }
    }
  }

  for (const card of [
    organ.lenses.structure,
    organ.lenses.relationship,
    organ.lenses.information,
  ]) {
    for (const id of card.claimIds) {
      if (!claimIds.has(id)) {
        errors.push(`镜片引用了不存在的 claim ${id}`);
      }
    }
  }

  return errors;
}