import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";
import AuthContext from "../store/AuthContex";

const FIREBASE_API_KEY = "AIzaSyD_l7c84umFPHaOHg0RAHwrIG8Dphwuo_8";

const ProfileForm = () => {
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const passwordChangeHandler = async (event) => {
    event.preventDefault();
    const enteredNewPassword = newPasswordInputRef.current.value;

    if (enteredNewPassword.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${FIREBASE_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            idToken: authCtx.token,
            password: enteredNewPassword,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message || "Password change failed!");
      }
      authCtx.login(data.idToken);
      alert("Password changed successfully!");
    } catch (error) {
      alert(error.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={passwordChangeHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input
          type="password"
          id="new-password"
          ref={newPasswordInputRef}
          required
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
