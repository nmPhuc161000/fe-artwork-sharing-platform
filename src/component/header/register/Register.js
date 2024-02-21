import React from "react";

export default function Register() {
  return (
    <div style="margin-left: 10px">
      <h1>Create New Account</h1>
      <div>
        <form action="mainController">
          <div>
            <input
              type="text"
              name="txtUsername"
              value=""
              placeholder="New Username"
            />{" "}
            (4 - 20 chars)
          </div>

          <div>
            <input
              type="password"
              name="txtPassword"
              value=""
              placeholder="New Password"
            />{" "}
            (3 - 20 chars)
          </div>

          <div>
            <input
              type="password"
              name="txtConfirm"
              value=""
              placeholder="Confirm Password"
            />
          </div>

          <div>
            <input
              type="text"
              name="txtLastname"
              value=""
              placeholder="Full Name"
            />{" "}
            (6 - 50 chars)
          </div>

          <div>
            <input
              type="txt"
              name="txtPhone"
              value=""
              placeholder="Your phone"
            />{" "}
            (3 - 9 number)
          </div>
          <div>
            <button type="submit" value="signUp" name="btAction">
              Create New Account
            </button>
            <button type="reset" value="reset">
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
