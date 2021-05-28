export function createColumns<T = any>(numColumns: number = 15): T[][] {
  const arr: T[][] = [];

  for (let i = 0; i < numColumns; i++) {
    arr.push([]);
  }

  return arr;
}
