import { Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "8base-react-sdk";

/* Import Route Components */
import Home from "../index";
import React from "react";
import CallbackContainer from "../auth/callback";
import TaskListPage from "../task/list";
import EntryPage from "../entries/[id]";
import { ProtectedRoute } from "./ProtectedRoute";

/**
 * Component that defines the routes of the application.
 *
 * This component configures the routes and the components associated with each of them.
 * Also uses the ProtectedRoute component to protect routes that require authentication.
 *
 * @returns {ReactElement} The Routes component.
 */
export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/auth/callback" component={CallbackContainer} />
      <Switch>
        <ProtectedRoute exact path="/task/list" component={TaskListPage}/>
        <ProtectedRoute exact path="/entries/:id" component={EntryPage}/>
        <ProtectedRoute exact path="/entries/:id" render={(props: any) => {
            return <EntryPage {...props} />;
          }}/>
      </Switch>
    </Switch>
  );
};
