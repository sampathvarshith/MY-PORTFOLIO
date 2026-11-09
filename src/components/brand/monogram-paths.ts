/**
 * VT monogram geometry on a 100×100 grid (y down). Shared by the SVG logo and the 3D scene
 * so both stay identical. Layering: T stem (back) → V (middle) → T bar (front), which is
 * what makes the letters read as interlocked.
 */
export type Pt = readonly [number, number];

export const V_SHAPE: Pt[] = [
  [6, 14], [28, 14], [50, 66], [72, 14], [94, 14], [60, 92], [40, 92],
];

export const T_BAR: Pt[] = [
  [16, 4], [84, 4], [79, 17], [21, 17],
];

export const T_STEM: Pt[] = [
  [44.5, 17], [55.5, 17], [55.5, 82], [50, 88], [44.5, 82],
];

export const toPath = (pts: Pt[]) =>
  `M${pts.map(([x, y]) => `${x} ${y}`).join(" L")} Z`;
