import {
  Card as ScryfallCard,
  CardFace as ScryfallCardFace,
} from 'scryfall-sdk';

export type CardFace = ScryfallCardFace & { artist_id: string };

export type Card = ScryfallCard & {
  legalities: { gladiator: string; premodern: string };
  prices: { eur_foil: string };
  cardmarket_id: number;
  image_status: string;
  keywords: string[];
  card_faces?: CardFace[];
};

export interface CardSearchResponse {
  object: 'list';
  total_cards: number;
  has_more: boolean;
  next_page: string;
  data: Card[];
}
