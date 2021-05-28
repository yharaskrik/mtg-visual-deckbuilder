import { Bounds, Point } from './types';

export function createLinearScale(
  domain: [number, number],
  range: [number, number]
) {
  const [minDomain, maxDomain] = domain;
  const [minRange, maxRange] = range;
  const sizeOfDomain = maxDomain - minDomain;
  const sizeOfRange = maxRange - minRange;
  return function scale(value: number) {
    const positionInDomain = (value - minDomain) / sizeOfDomain;
    return positionInDomain * sizeOfRange + minRange;
  };
}

export function getBounds(points: Point[]): Bounds {
  return points.reduce(
    (bounds, { x, y }) => {
      return {
        minX: Math.min(x, bounds.minX),
        minY: Math.min(y, bounds.minY),
        maxX: Math.max(x, bounds.maxX),
        maxY: Math.max(y, bounds.maxY),
      };
    },
    {
      minX: Infinity,
      minY: Infinity,
      maxX: -Infinity,
      maxY: -Infinity,
    } as Bounds
  );
}

export function getPathCommandsForLine(points: Point[]) {
  const [firstPoint, ...restOfPoints] = points;
  const move = `M ${firstPoint.x},${firstPoint.y}`;
  const lines = restOfPoints.map((point) => {
    return `L ${point.x},${point.y}`;
  });

  return `${move} ${lines.join(' ')}`;
}

export function getPathCommandsForPolygon(points: Point[]) {
  const lineForPoints = getPathCommandsForLine(points);
  const bounds = getBounds(points);
  const lineToBottomRight = `L ${bounds.maxX}, ${bounds.maxY}`;
  const lineToBottomLeft = `L ${bounds.minX}, ${bounds.maxY}`;
  const closePath = 'Z';

  return `${lineForPoints} ${lineToBottomRight} ${lineToBottomLeft} ${closePath}`;
}
