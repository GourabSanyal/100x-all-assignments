import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState();

  useEffect(() => {
    function callback2(data) {
      if (data.username) {
        setUserEmail(data.username);
      }
      // console.log(data);
    }
    function callback1(res) {
      res.json().then(callback2);
      // console.log(res)
    }
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(callback1);
  }, []);

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 4,
        }}
      >
        <div>
          <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div>{userEmail}</div>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/";
              }}
            >
              Log out
            </Button>
          </div>
        </div>
      </div>
    ); 
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: 4,
        }}
      >
        <div>
          <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/signin");
              }}
            >
              Sign In
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
