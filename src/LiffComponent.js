import React, { useEffect, useState } from "react";
import liff from "@line/liff";

function LiffComponent() {
  const [profile, setProfile] = useState(null);
  console.log(profile);
  useEffect(() => {
    if (liff.isLoggedIn()) {
      liff.getProfile().then((data) => setProfile(data));
    }
  }, []);

  return (
    <div>
      {profile ? (
        <div>
          <img src={profile.pictureUrl} alt="Profile" />
          <p>Name: {profile.displayName}</p>
          <p>Status: {liff.isLoggedIn() ? "Logged In" : "Logged Out"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default LiffComponent;
