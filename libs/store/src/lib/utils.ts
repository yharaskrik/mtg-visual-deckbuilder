export function createColumns<T = any>(numColumns: number = 15): T[][] {
  return new Array(numColumns).fill([]);
}
