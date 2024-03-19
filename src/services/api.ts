import ky from 'ky';
import { useAuthStore } from '@store/auth';

export default ky.create({
  prefixUrl: 'https://trello.backend.tests.nekidaem.ru/api/v1',
});
