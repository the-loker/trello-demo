import { reactive } from 'vue';
import { defineStore } from 'pinia';

import api from '@services/api';
import { HTTPError } from 'ky';

import type { ICard } from '@/types';

type TCards = {
  [key in string]: ICard;
};

function toLocalStorage(cards: TCards) {
  localStorage.setItem('cards', JSON.stringify(cards));
}

function fromLocalStorage(cards: TCards) {
  const cardsInStore = localStorage.getItem('cards');

  if (cardsInStore) {
    const parseCards: TCards = JSON.parse(cardsInStore);

    for (const cardId in parseCards) {
      cards[cardId] = parseCards[cardId];
    }
  }
}

export const useCardsStore = defineStore('cardsStore', () => {
  const cards = reactive<TCards>({});

  fromLocalStorage(cards);

  async function getCards({ row }: { row: string }) {
    try {
      const cardsList = await api(true)
        .get('cards/', { searchParams: { row } })
        .json<ICard[]>();

      cardsList.forEach((card) => {
        cards[card.id] = card;
      });
    } catch (e: unknown) {
      if (e instanceof HTTPError) {
        const error = await e.response.json();

        if (error.detail) {
          throw new Error(error.detail);
        }
      }

      throw e;
    }
  }

  async function create({ row, text }: { row: string; text: string }) {
    try {
      const seq_num = Object.values(cards)
        .filter((card) => card.row === row)
        .sort((a, b) => a.seq_num - b.seq_num).length;

      const card = await api(true)
        .post('cards/', { json: { row, seq_num, text } })
        .json<ICard>();

      cards[card.id] = card;

      toLocalStorage(cards);
    } catch (e: unknown) {
      if (e instanceof HTTPError) {
        if (e.response.status === 400) {
          throw new Error('Incorrect card data');
        }

        const error = await e.response.json();

        if (error.detail) {
          throw new Error(error.detail);
        }
      }

      throw e;
    }
  }

  async function update({
    cardId,
    row,
    seq_num,
    text,
  }: {
    cardId: number;
    row: string;
    seq_num: number;
    text: string;
  }) {
    const cardOld = { ...cards[cardId] };

    try {
      cards[cardId].row = row;

      const card = await api(true)
        .patch(`cards/${cardId}/`, { json: { row, seq_num, text } })
        .json<ICard>();

      cards[card.id] = card;

      toLocalStorage(cards);
    } catch (e) {
      cards[cardId] = cardOld;

      if (e instanceof HTTPError) {
        const error = await e.response.json();

        if (error.detail) {
          throw new Error(error.detail);
        }
      }

      throw e;
    }
  }

  async function remove(cardId: number) {
    try {
      await api(true).delete(`cards/${cardId}/`);

      delete cards[cardId];

      toLocalStorage(cards);
    } catch (e: unknown) {
      if (e instanceof HTTPError) {
        const error = await e.response.json();

        if (error.detail) {
          throw new Error(error.detail);
        }
      }

      throw e;
    }
  }

  return { cards, getCards, create, update, remove };
});
