import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./components/store/AuthContex";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          {authCtx.isLoggedIn ? <HomePage /> : <Redirect to="/auth" />}
        </Route>

        <Route path="/auth">
          {!authCtx.isLoggedIn ? <AuthPage /> : <Redirect to="/" />}
        </Route>

        <Route path="/profile">
          {authCtx.isLoggedIn ? <UserProfile /> : <Redirect to="/auth" />}
        </Route>

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
