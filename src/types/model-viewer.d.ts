/**
 * <model-viewer> 是 Web Component，不在 React 的内置元素表里，得自己声明。
 *
 * 为什么只声明用到的属性：这里不是要复刻 model-viewer 的全部 API，
 * 只是让 TypeScript 知道「这些属性存在、类型是这个」。少写一个属性，
 * TS 会在用的地方报错；多写一个，也不会有人因此写出错的代码。
 */
import type { CSSProperties, HTMLAttributes, Ref } from "react";

type ModelViewerProps = HTMLAttributes<HTMLElement> & {
  ref?: Ref<HTMLElement>;
  style?: CSSProperties;
  /** GLB 地址 */
  src?: string;
  /** 读屏用户听到的描述，必填 */
  alt?: string;
  /** 加载策略：投影外不加载，避免首屏之外的流量 */
  loading?: "auto" | "lazy" | "eager";
  /** 进入视口后自动展示 */
  reveal?: "auto" | "manual";
  /** 允许鼠标/手指旋转缩放 */
  "camera-controls"?: boolean | "";
  /** 相机方位：`θdeg φdeg 半径` */
  "camera-orbit"?: string;
  /** 相机看向的世界坐标 */
  "camera-target"?: string;
  /** 方位变化时是否播过渡动画（不写就是渐变，写了 "auto" 也一样） */
  "interpolation-decay"?: string;
  /** 阴影强度，0 关闭 */
  "shadow-intensity"?: string;
  /** 环境光强度 */
  "environment-image"?: string;
  /** 手指在容器上的默认行为：pan-y 让竖向滚动穿透，页面不会被模型吃掉 */
  "touch-action"?: string;
  /** 操作提示气泡 */
  "interaction-prompt"?: "auto" | "none";
  /** 模型自转 */
  "auto-rotate"?: boolean | "";
  "auto-rotate-delay"?: string;
  /** 提高近裁面精度，小器官贴脸看不穿 */
  "min-field-of-view"?: string;
  "max-field-of-view"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}
