import {
  type RouteRecordRaw,
  type RouterOptions,
  createRouter,
  createWebHashHistory,
} from 'vue-router';
import type { Component } from 'vue';

import useUserStore from './stores/user';

const pages: Record<string, { default: Component }> = import.meta.glob(
  ['./views/*.vue', '!./views/#*.vue'],
  { eager: true },
);

const pageMeta = {
  chat: {
    alias: '/',
  },
};

const isPageMetaKey = (fileName: string): fileName is keyof typeof pageMeta =>
  fileName in pageMeta;

const routes = Object.entries(pages)
  .map(([path, component]) => {
    const fileName = path.match(/\.\/views\/(.*)\.vue$/)?.[1];

    if (!fileName) {
      return null;
    }

    const route: RouteRecordRaw = {
      path: `/${fileName}`,
      name: fileName,
      ...(isPageMetaKey(fileName) ? pageMeta[fileName] : {}),
      component: component.default,
    };

    return route;
  })
  .filter((route): route is Exclude<typeof route, null> => route !== null);

const options: RouterOptions = {
  history: createWebHashHistory(),
  routes: [...routes, { path: '/:notFound(.*)', redirect: '/' }],
};

const router = createRouter(options);

const AUTH_NOT_REQUIRED_ROUTES = ['auth'];

router.beforeEach((to) => {
  const store = useUserStore();

  const name = (to?.name ?? '').toString();

  if (!store.isLoggedIn && !AUTH_NOT_REQUIRED_ROUTES.includes(name)) {
    return { name: 'auth' };
  }

  return undefined;
});

export default router;
