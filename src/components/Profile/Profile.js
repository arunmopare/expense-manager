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
      <div class="container text-center">
        <div class="row profile">
          <div class="col-md-12 mt-5">
            <div class="profile-sidebar">
              <div class="profile-userpic">
                <img src={user.picture} class="img-responsive" alt="" />
              </div>

              <div class="profile-usertitle">
                <div class="profile-usertitle-name">{user.name}</div>
                <div class="profile-usertitle-job">A user</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};
export default Profile;
