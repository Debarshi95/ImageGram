import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as ROUTES from '../../constant/routes';
import ImageUpload from '../ImageUpload';
import { useAuth } from '../../provider/AuthProvider';
import NotFound from '../../pages/NotFound';
import Loader from '../Loader';
import loadable from '../../utils/loadable';

const LazyHome = loadable(() => import('../../pages/Home'));
const LazySignIn = loadable(() => import('../../pages/SignIn'));
const LazySignUp = loadable(() => import('../../pages/SignUp'));

function MainRouter() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<Loader />}>
      <Route>
        <Switch>
          <Route exact path={ROUTES.HOME} component={LazyHome} />
          <Route
            path={ROUTES.UPLOAD_FILE}
            render={() => (user ? <ImageUpload /> : <Redirect to={ROUTES.HOME} />)}
          />
          <Route path={ROUTES.SIGN_IN} component={LazySignIn} />
          <Route path={ROUTES.SIGN_UP} component={LazySignUp} />
          <Route component={NotFound} />
        </Switch>
      </Route>
    </React.Suspense>
  );
}

export default MainRouter;
