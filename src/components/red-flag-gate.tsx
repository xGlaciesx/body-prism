import { RED_FLAG_KEYWORDS, RED_FLAG_NOTICE } from "@/content/medical-disclaimer";

/**
 * 红旗判定：纯函数，小写化后做 includes 匹配。
 * 本文件不加 "use client"、也不 import 任何 React hooks：
 * 它同时被 route.ts（服务端）取走 needUrgentHelp，也被 chain-canvas（客户端）渲染弹层，
 * 只有保持纯函数 + 无 hooks，服务端才不会因为 React API 报错。
 */
export function needUrgentHelp(text: string): boolean {
  const lower = text.toLowerCase();
  return RED_FLAG_KEYWORDS.some((k) => lower.includes(k.toLowerCase()));
}

type RedFlagGateProps = {
  open: boolean;
  onClose: () => void;
};

export function RedFlagGate({ open, onClose }: RedFlagGateProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="就医提示"
        className="max-w-md rounded-2xl border border-line bg-paper-2 p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <h2 className="font-serif text-xl font-bold text-danger">先看这一句</h2>
        <p className="mt-3 leading-relaxed text-ink">{RED_FLAG_NOTICE}</p>
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className="mt-5 rounded-full bg-structure px-5 py-2 text-sm font-medium text-white"
        >
          我知道了
        </button>
      </div>
    </div>
  );
}
