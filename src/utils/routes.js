export default {
  home: {
    path: '/',
    exact: true,
  },
  signIn: {
    path: '/signin',
    exact: true,
  },
  signUp: {
    path: '/signup',
    exact: true,
  },
  upload: {
    path: '/upload',
    exact: true,
    isProtected: true,
  },
};
