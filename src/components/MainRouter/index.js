import React from "react";
import * as ROUTES from "../../constant/routes";
import { Redirect, Route, Switch } from "react-router-dom";
import ImageUpload from "../ImageUpload";
import { useAuth } from "../../provider/AuthProvider";
import NotFound from "../../pages/NotFound";
import Loader from "../Loader";

const LazyHome = React.lazy(() => import("../../pages/Home"));
const LazySignIn = React.lazy(() => import("../../pages/SignIn"));
const LazySignUp = React.lazy(() => import("../../pages/SignUp"));

function MainRouter() {
  const { user } = useAuth();
  return (
    <React.Suspense fallback={<Loader />}>
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
          <Route component={NotFound} />
        </Switch>
      </Route>
    </React.Suspense>
  );
}

export default MainRouter;
