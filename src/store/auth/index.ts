import { computed, reactive } from 'vue';
import { defineStore } from 'pinia';

import { useUserStore } from '@store/user';
import api from '@services/api';

export interface ITokenPayload {
  token_type: string;
  exp: number;
  jti: string;
  user_id: number;
}

export interface ITokenData {
  token: string;
  expireIn: number;
}

function getTokenPayload(token: string): ITokenPayload {
  try {
    if (!token) throw new Error('Access Token is required');

    const splitToken = token.split('.');

    if (!Array.isArray(splitToken) || !(splitToken.length < 3)) {
      throw new Error('Access Token is not JWT');
    }

    const payload = splitToken[1];

    return JSON.parse(atob(payload));
  } catch (e) {
    throw e;
  }
}

function isTokenExpired(expireIn: number): boolean {
  const subtract = 10 * 1000;

  return Date.now() <= expireIn - subtract;
}

function isTokenData(data: any): data is ITokenData {
  return 'token' in data && 'expireIn' in data;
}

export const useAuthStore = defineStore('authStore', () => {
  const { setUser, resetUser } = useUserStore();

  const auth = reactive({
    token: '',
    expireIn: 0, // Время жизни токена (ms)
  });

  const isAuth = computed<boolean>(() => {
    return auth.token !== '' && !isTokenExpired(auth.expireIn);
  });

  function resetAuthData() {
    auth.token = '';
    auth.expireIn = 0;

    resetUser();

    localStorage.removeItem('refreshToken');
  }

  /**
   * @param accessToken - accessToken пользователя
   * @param expireIn - время жизни accessToken в секундах
   */
  function setAccess(accessToken: string, expireIn: number) {
    auth.token = accessToken;
    auth.expireIn = Math.floor(expireIn * 1000);
  }

  /**
   *
   * @param refreshToken - refreshToken пользователя
   * @param expireIn - время жизни refreshToken в секундах
   */
  function setRefresh(refreshToken: string, expireIn: number) {
    const payload = JSON.stringify({
      token: refreshToken,
      expireIn: Math.floor(expireIn * 1000),
    });

    localStorage.setItem('refreshToken', payload);
  }

  function getRefreshToken(): ITokenData {
    try {
      let tokenData = localStorage.getItem('refreshToken');

      if (!tokenData) {
        throw Error('Refresh Token not found');
      }

      tokenData = JSON.parse(tokenData);

      if (!isTokenData(tokenData)) {
        throw new Error('Incorrect refresh token data');
      }

      if (isTokenExpired(tokenData.expireIn)) {
        throw new Error('Refresh Token is expired');
      }

      return tokenData;
    } catch (e) {
      throw e;
    }
  }

  function hasRefreshToken(): boolean {
    return Boolean(localStorage.getItem('refreshToken'));
  }

  async function signin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<void> {
    try {
      const { access, refresh } = await api
        .post('/users/token/', {
          json: { username, password },
        })
        .json<{ access: string; refresh: string }>();

      const accessPayload = getTokenPayload(access);
      const refreshPayload = getTokenPayload(refresh);

      setAccess(access, accessPayload.exp);
      setRefresh(refresh, refreshPayload.exp);
      setUser(accessPayload.user_id);
    } catch (e) {
      throw e;
    }
  }

  async function signup({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ success: boolean; message: string }> {
    try {
      await api.post('/users/create/', {
        json: { username, email, password },
      });

      return {
        success: true,
        message: 'Sign up is successfully',
      };
    } catch (e) {
      throw e;
    }
  }

  async function refresh(refreshToken: string) {
    try {
      const { access } = await api
        .post('/users/token/refresh/', {
          json: { refresh: refreshToken },
        })
        .json<{ access: string }>();

      const accessPayload = getTokenPayload(access);

      setAccess(access, accessPayload.exp);
      setUser(accessPayload.user_id);
    } catch (e) {
      throw e;
    }
  }

  return {
    isAuth,
    resetAuthData,
    getRefreshToken,
    hasRefreshToken,
    signin,
    signup,
    refresh,
  };
});
