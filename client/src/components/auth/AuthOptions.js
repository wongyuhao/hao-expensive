import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { GlobalContext } from '../../context/GlobalState';

export default function AuthOptions() {
  const { user, setUserData, clearLocalTransactions} = useContext(GlobalContext);

  const history = useHistory();

  const register = () => history.push("/register");
  const login = () => history.push("/login");
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
    clearLocalTransactions();
    history.push("/login");
  };

  return (
    <div className="auth-options">
      {user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <>
          <button onClick={register}>Register</button>
          <button onClick={login}>Log in</button>
        </>
      )}
    </div>
  );
}
