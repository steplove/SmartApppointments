import React, { useEffect, useState } from "react";
import liff from "@line/liff";
import { Grid } from "@mui/material";

function LiffComponent() {
  const [profile, setProfile] = useState(null);
  console.log(profile);
  useEffect(() => {
    if (liff.isLoggedIn()) {
      liff.getProfile().then((data) => setProfile(data));
    }
  }, []);

  return (
    <Grid>
      {/* {profile ? (
        <Grid>
          <img src={profile.pictureUrl} alt="Profile" />
          <span>Name: {profile.displayName}</span>
          <span>Status: {liff.isLoggedIn() ? "Logged In" : "Logged Out"}</span>
        </Grid>
      ) : (
        <span>Loading...</span>
      )} */}
    </Grid>
  );
}

export default LiffComponent;
