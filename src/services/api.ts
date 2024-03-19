import ky from 'ky';

export default ky.create({
  prefixUrl: 'https://trello.backend.tests.nekidaem.ru/api/v1/',
});
