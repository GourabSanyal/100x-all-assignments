import { Card, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Signin() {
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
          Welcome back. Sign in below
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
            id="outlined-basic"
            label="Email"
            variant="outlined"
            fullWidth
          />
          <br /> <br />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            fullWidth
          />
          <br /> <br />
          <Button size={"large"} variant="contained">
            Sign In
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
