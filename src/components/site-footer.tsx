export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper px-6 py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 text-sm text-muted">
        <p>本网站用于健康信息素养教育，不提供诊断、治疗或用药建议。</p>
        <p>中医内容标注“传统理论”；信息论内容标注“概念类比”。</p>
        <p>解剖数据：BodyParts3D, © The Database Center for Life Science, CC BY 4.0。</p>
        <p className="pt-2 text-xs">© 2026 人体棱镜 Body Prism</p>
      </div>
    </footer>
  );
}