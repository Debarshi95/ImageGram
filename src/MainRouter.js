import React, { Suspense } from "react";
import * as ROUTES from "./constant/routes";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ImageUpload from "./components/ImageUpload";
import { useAuth } from "./hooks/useAuth";
import Loader from "./components/Loader";

const LazyHome = React.lazy(() => import("./components/Home"));
const LazySignIn = React.lazy(() => import("./components/SignIn"));
const LazySignUp = React.lazy(() => import("./components/SignUp"));
const LazyProfile = React.lazy(() => import("./components/Profile"));

function MainRouter() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Route>
          <Switch>
            <Route exact path={ROUTES.HOME} component={LazyHome} />
            <Route
              path={ROUTES.UPLOAD_FILE}
              render={() =>
                user ? <ImageUpload /> : <Redirect to={ROUTES.HOME} />
              }
            />
            <Route path={ROUTES.SIGN_IN} component={LazySignIn} />
            <Route path={ROUTES.SIGN_UP} component={LazySignUp} />
            <Route
              path={ROUTES.USER}
              render={() =>
                user ? <LazyProfile /> : <Redirect to={ROUTES.HOME} />
              }
            />
          </Switch>
        </Route>
      </Suspense>
    </BrowserRouter>
  );
}

export default MainRouter;
