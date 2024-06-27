/* eslint-disable unicorn/filename-case */
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Typography, Card, TextField, Button, InputAdornment, IconButton } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FormValues {
  username?: string;
  email: string;
  password: string;
};

export function Signin(props: {
  onClick: (email: string, password: string) => Promise<void>;
  onError: string | undefined;
}) : React.JSX.Element {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleSubmitForm = async (data: FormValues) => {
    await props.onClick( data.email, data.password)
    
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
        <Typography variant="h6">
          Welcome to Coursera. Sign In below
        </Typography>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card style={{ width: 400, padding: 20 }}>
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
          <br />
          <br />
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
            Sign In
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
        </Card>
      </div>
    </div>
  );
}
