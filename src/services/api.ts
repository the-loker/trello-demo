import ky from 'ky';
import router from '@routes/index';
import { useAuthStore } from '@store/auth';

export default function (needAuth: boolean = false) {
  const { getBearer, isAccessTokenExpired, resetAuthData, refresh } =
    useAuthStore();

  const api = ky.create({
    prefixUrl: 'https://trello.backend.tests.nekidaem.ru/api/v1/',
    hooks: needAuth
      ? {
          beforeRequest: [
            async (req) => {
              req.headers.set('Authorization', getBearer());

              if (isAccessTokenExpired()) {
                try {
                  await refresh();

                  req.headers.set('Authorization', getBearer());

                  return req;
                } catch (e) {
                  resetAuthData();

                  throw e;
                }
              }

              return req;
            },
          ],
          afterResponse: [
            async (req, options, res) => {
              if (res.status === 401) {
                resetAuthData();

                await router.push({ name: 'public-signin' });
              }

              return res;
            },
          ],
        }
      : {},
  });

  return api;
}
