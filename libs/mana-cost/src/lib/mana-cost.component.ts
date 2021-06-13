import { Component, Input } from '@angular/core';
import { Card } from '@mtg/scryfall-api';

@Component({
  selector: 'mtg-mana-cost',
  templateUrl: './mana-cost.component.html',
  styleUrls: ['./mana-cost.component.scss'],
})
export class ManaCostComponent {
  pipMap: Record<string, string> = {
    '{0}': '0',
    '{1}': '1',
    '{2}': '2',
    '{3}': '3',
    '{4}': '4',
    '{5}': '5',
    '{6}': '6',
    '{7}': '7',
    '{8}': '8',
    '{9}': '9',
    '{10}': '10',
    '{11}': '11',
    '{12}': '12',
    '{13}': '13',
    '{14}': '14',
    '{15}': '15',
    '{16}': '16',
    '{17}': '17',
    '{18}': '18',
    '{19}': '19',
    '{20}': '20',
    '{2/B}': '2c-black',
    '{2/G}': '2c-green',
    '{2/U}': '2c-blue',
    '{2/R}': '2c-red',
    '{2/W}': '2c-white',
    '{B/G}': 'black-green',
    '{B/R}': 'black-red',
    '{U/B}': 'blue-black',
    '{U/R}': 'blue-red',
    '{G/U}': 'green-blue',
    '{G/W}': 'green-white',
    '{R/G}': 'red-green',
    '{R/W}': 'red-white',
    '{W/B}': 'white-black',
    '{W/U}': 'white-blue',
    '{B}': 'black',
    '{U}': 'blue',
    '{G}': 'green',
    '{R}': 'red',
    '{W}': 'white',
    '{X}': 'x',
    '{Y}': 'y',
    '{S}': 'snow',
    '{B/P}': 'phyrexian-black',
    '{P/U}': 'phyrexian-blue',
    '{W/P}': 'phyrexian-white',
    '{R/P}': 'phyrexian-red',
    '{G/P}': 'phyrexian-green',
    '{C}': 'colorless',
  };

  private PIP_REGEX = /{[A-Z0-9]}/g;

  @Input() set card(card: Card) {
    const faces = card.card_faces;
    if (faces && faces.length) {
      this.manaCosts = faces.map(
        (face) => face.mana_cost.match(this.PIP_REGEX) ?? []
      );
    } else if (card.mana_cost) {
      this.manaCosts = [card.mana_cost.match(this.PIP_REGEX) ?? []];
    }
  }

  manaCosts: string[][] = [];
}
