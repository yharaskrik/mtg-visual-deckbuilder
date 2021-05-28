import { Card } from '@mtg/scryfall-api';

export type Colours = 'white' | 'red' | 'green' | 'blue' | 'black';

export type ColourTotal = Record<Colours, number>;

export const colours: Colours[] = ['white', 'red', 'green', 'blue', 'black'];

export const manaCosts: Record<Colours, string[]> = {
  white: ['{W}', '{2/W}', '{W/U}', '{W/B}', '{R/W}', '{G/W}', '{W/P}'],
  green: ['{G}', '{2/G}', '{G/W}', '{G/U}', '{B/G}', '{R/G}', '{G/P}'],
  red: ['{R}', '{2/R}', '{B/R}', '{U/R}', '{R/G}', '{R/W}', '{R/P}'],
  black: ['{B}', '{2/B}', '{B/R}', '{W/B}', '{B/G}', '{U/B}', '{B/P}'],
  blue: ['{U}', '{2/U}', '{U/R}', '{W/U}', '{G/U}', '{U/B}', '{U/P}'],
};

export function createColumns<T = any>(numColumns: number = 15): T[][] {
  const arr: T[][] = [];

  for (let i = 0; i < numColumns; i++) {
    arr.push([]);
  }

  return arr;
}

export function emptyColourTotal(): ColourTotal {
  return {
    white: 0,
    red: 0,
    black: 0,
    green: 0,
    blue: 0,
  };
}

export function calcCardsColours(card: Card): ColourTotal {
  const totals = emptyColourTotal();

  colours.forEach((colour) => {
    totals[colour] += manaCosts[colour].reduce((total, symbol) => {
      const matches =
        (card.mana_cost ?? '').match(new RegExp(symbol, 'g')) ?? [];
      return total + matches.length;
    }, 0);
  });

  return totals;
}
