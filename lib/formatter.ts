const formatter = new Intl.NumberFormat(undefined, { notation: "compact" });

export function formatCompactNumber(num: number) {
  return formatter.format(num);
}
