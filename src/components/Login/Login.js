import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <div className="py-5">
      <div className="row">
        <div className="col-md-6 mx-auto">
          <span className="anchor" id="formLogin"></span>

          <div className="card rounded-0">
            <div className="card-header">
              <h3 className="mb-0 text-center">Login</h3>
            </div>

            <button
              type="button"
              onClick={() => loginWithRedirect()}
              className="btn btn-primary float-right"
            >
              Please Click here to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
