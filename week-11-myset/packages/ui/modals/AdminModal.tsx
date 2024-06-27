/* eslint-disable no-implicit-coercion */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable import/no-extraneous-dependencies */
// components/AdminModal.js

// components/AdminModal.js
import React, { useEffect, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  Button,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useForm, SubmitHandler } from "react-hook-form";

interface AdminModalProps {
  open: boolean;
  onClose?: () => void;
  onSubmit: (
    username: string | null | undefined,
    email: string,
    password: string
  ) => Promise<void>;
  isSignInRef: React.MutableRefObject<boolean>;
  onError?: string | null | undefined;
  handleResetError?: () => void;
}
interface FormData {
  username?: string | undefined;
  email: string;
  password: string;
}

export function AdminModal({
  open,
  onClose,
  onSubmit,
  isSignInRef,
  onError,
  handleResetError,
}: AdminModalProps): JSX.Element {
  const { register, handleSubmit, formState, reset } = useForm<FormData>();
  const { errors } = formState;
  const [showPassword, setShowPassword] = useState(false);
  const [rerenderFlag, setRerenderFlag] = useState(false);

  const handleToggleForm = useCallback(() => {
    reset();
    isSignInRef.current = !isSignInRef.current;
    setRerenderFlag(!rerenderFlag);
    if (handleResetError) {
      handleResetError();
    }
  }, [handleResetError, isSignInRef, rerenderFlag, reset]);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (isSignInRef.current) {
        await onSubmit(null, data.email, data.password);
      } else {
        console.log("from child -->", data);
        
        await onSubmit(data.username, data.email, data.password);
      }
    } catch (error) {
      if (error) {
        console.log("error from modal ->", error);
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Button
          onClick={onClose}
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          X
        </Button>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {!isSignInRef.current ? (
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              {...register("username", {
                required: "Username is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+$/,
                  message: "Invalid username",
                },
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          ) : null}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            required
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
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleTogglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {isSignInRef.current ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        {onError ? (
          <Typography
            variant="body2"
            align="center"
            style={{ marginTop: 10, color: "red" }}
          >
            {onError}
          </Typography>
        ) : null}
        <Typography variant="body2" align="center" style={{ marginTop: 10 }}>
          {isSignInRef.current
            ? "Don't have an admin account? "
            : "Already have an admin account? "}
          <Link component="button" variant="body2" onClick={handleToggleForm}>
            {isSignInRef.current ? "Register as an Admin here" : "Sign In here"}
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
}
