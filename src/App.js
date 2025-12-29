import { useContext, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthContext from "./components/store/AuthContex";

import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import UserProfile from "./components/Profile/UserProfile";

const FIREBASE_API_KEY = "YOUR_FIREBASE_API_KEY";

function App() {
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const validateToken = async () => {
      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: token }),
          }
        );

        const data = await response.json();

        if (!response.ok || !data.users) {
          authCtx.logout(); // Invalid or expired token
        }
      } catch (error) {
        authCtx.logout();
      }
    };

    validateToken();
  }, [authCtx]);

  return (
    <Layout>
      <Switch>
        {authCtx.isLoggedIn && (
          <Route path="/" exact>
            <HomePage />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        {authCtx.isLoggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
        <Route path="*">
          <Redirect to={authCtx.isLoggedIn ? "/" : "/auth"} />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
