/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import { Route, Router, Switch } from 'react-router-dom';
import routeConfig from '../../utils/routeConfig';
import routes from '../../utils/routes';
import { useAuth } from '../../providers/AuthProvider';
import { history } from '../../utils/history';
import Loader from '../Loader';
import Navbar from '../Navbar';
import './index.css';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="app__root">
      <Router history={history}>
        <Navbar />
        <Suspense fallback={<Loader />}>
          <Switch>
            {Object.keys(routeConfig).map((route) => {
              const { component: Component, exact, path, isProtected } = routeConfig[route];
              return (
                <Route
                  path={path}
                  key={route}
                  exact={exact}
                  render={(props) => {
                    if (isProtected) {
                      return isAuthenticated ? (
                        <Component {...props} />
                      ) : (
                        <Redirect to={routes.home.path} />
                      );
                    }
                    return <Component {...props} />;
                  }}
                />
              );
            })}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
