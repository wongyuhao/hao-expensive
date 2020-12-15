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
        <button onClick={logout} className='btn text-yellow-400'>Log out</button>
      ) : (
        <>
          <button onClick={register} className='btn'>Register</button>
          <button onClick={login} className='btn'>Log in</button>
        </>
      )}
    </div>
  );
}
