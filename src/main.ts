import './assets/styles/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import routes from '@routes/index';

const app = createApp(App);

app.use(routes);
app.use(createPinia());

app.mount('#trello-demo');
