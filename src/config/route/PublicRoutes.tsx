import { lazy, ReactElement, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

const PublicRoutes = (): ReactElement => {
  const routesList = [
    {
      path: "/",
      component: lazy((): any => import("../../modules/login/login")),
    },
    {
      path: "/MovieStore",
      component: lazy(
        (): any => import("../../modules/movie-store/movie-store")
      ),
    },
    {
      path: "/MovieDetail/:id",
      component: lazy(
        (): any => import("../../modules/movie-store/movie-detail")
      ),
    },
  ];

  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        {routesList.map((item: any): ReactElement => {
          return (
            <Route exact={true} path={item.path} component={item.component} />
          );
        })}
        <Redirect from="*" to="/" />
      </Switch>
    </Suspense>
  );
};

export default PublicRoutes;
