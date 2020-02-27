import user from '@/layouts/models/user';
import {init} from '@rematch/core';
import createLoadingPlugin from '@rematch/loading';
import createRematchPersist from '@rematch/persist';


const loadingPlugin = createLoadingPlugin();

const persistPlugin = createRematchPersist({
  whitelist: ['user'],
  throttle: 300,
  version: 1,
});
const store = init({
  plugins: [loadingPlugin, persistPlugin],
  models: {user},
});

export default store;
