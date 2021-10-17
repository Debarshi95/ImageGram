import loadable from './loadable';
import routes from './routes';

export default {
  home: {
    component: loadable(() => import('../pages/Home')),
    ...routes.home,
  },
  signIn: {
    component: loadable(() => import('../pages/SignIn')),
    ...routes.signIn,
  },
  signUp: {
    component: loadable(() => import('../pages/SignUp')),
    ...routes.signUp,
  },
  upload: {
    component: loadable(() => import('../pages/Upload')),
    ...routes.upload,
  },
  notFound: {
    component: loadable(() => import('../pages/NotFound')),
  },
};
