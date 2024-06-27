import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant={"h6"}>
          Welcome to Coursera. Sign up below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          style={{
            width: 400,
            padding: 20,
          }}
        >
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="outlined"
            fullWidth
          />
          <br /> <br />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="outlined"
            fullWidth
          />
          <br /> <br />
          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              const res = await axios.post(
                "http://localhost:3000/admin/signup",
                {
                  username: email,
                  password: password,
                }
              );
              let data = res.data;
              localStorage.setItem("token", data.token);
              window.location = "/courses";
            }}
          >
            Sign up
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signup;
