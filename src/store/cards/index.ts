import { reactive } from 'vue';
import { defineStore } from 'pinia';
import api from '@services/api';

import type { ICard } from '@/types';
import { HTTPError } from 'ky';

type TCards = {
  [key in string]: ICard;
};

export const useCardsStore = defineStore('cardsStore', () => {
  const cards = reactive<TCards>({});

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
      const card = await api(true)
        .post('cards/', { json: { row, text } })
        .json<ICard>();

      cards[card.id] = card;
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
    try {
      const card = await api(true)
        .patch(`cards/${cardId}`, { json: { row, seq_num, text } })
        .json<ICard>();

      cards[card.id] = card;
    } catch (e) {
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
