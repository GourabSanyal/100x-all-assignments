/* eslint-disable prefer-named-capture-group */
/* eslint-disable unicorn/filename-case */
import {
  Typography,
  InputAdornment,
  Card,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm } from "react-hook-form";

interface FormValues {
  username?: string;
  email: string;
  password: string;
};

export function Signup(props: {
  onClick: (username: string, email: string, password: string) => Promise<void>;
  onError: string | undefined;
}): React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSubmitForm =  async(data: FormValues) => {
    await props.onClick(data.username, data.email, data.password)
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
        <Typography variant="h6">Welcome to Coursera. Sign Up below</Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }}>
          <form>
            <TextField
              fullWidth
              label="Username"
              margin="normal"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+$/,
                  message: "Invalid username",
                },
              })}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
            />
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Invalid email address",
                },
              })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
            />
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleTogglePasswordVisibility}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 10,
                  message: "Password must be at least 10 characters long",
                },
                pattern: {
                  value: /\d+/gi,
                  message: "Password must contain at least one number",
                },
              })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
            />
            <br />
            <br />
            <Button
              onClick={handleSubmit(handleSubmitForm)}
              size="large"
              variant="contained"
            >
              {" "}
              Sign Up
            </Button>
            {props.onError ? (
              <Typography
                align="center"
                style={{ marginTop: 10, color: "red" }}
                variant="body2"
              >
                {props.onError}
              </Typography>
            ) : null}
          </form>
        </Card>
      </div>
    </div>
  );
}
