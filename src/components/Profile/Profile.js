import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Image } from "react-bootstrap";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
  return (
    //  (
    //   <div>
    //     <Image src={user.picture}></Image>
    //     Profile is{JSON.stringify(user, null, 2)}
    //   </div>
    isAuthenticated && (
      <div className="container text-center">
        <div className="row profile">
          <div className="col-md-12 mt-5">
            <div className="profile-sidebar">
              <div className="profile-userpic">
                <img src={user.picture} className="img-responsive" alt="" />
              </div>

              <div className="profile-usertitle">
                <div className="profile-usertitle-name">{user.name}</div>
                <div className="profile-usertitle-job">A user</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Profile;
