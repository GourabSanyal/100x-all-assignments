import { Button, Typography } from "@mui/material";
import { useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isUserLoading, userEmailState, userState } from "store";
import { useRouter } from "next/navigation";
import { AdminModal } from "ui";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Appbar() {
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [onError, setOnError] = useState<string | null | undefined>(null);
  const handleResetError = () => {
    setOnError(null);
  };

  const isSignInRef = useRef(true);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const adminSignIn = async (email: string, password: string) => {
    try {
      const response = await axios.post("api/auth/admin/signin", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      handleCloseModal();
      router.push("/courses");
      setUser({ isLoading: false, userEmail: email });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        let errorRes = error.response.data.message;
        setOnError(errorRes);
      } else {
        console.log("An error occurred: ", error);
      }
    }
  };

  const adminSignUp = async (
    username: string,
    email: string,
    password: string
  ) => {
    console.log("from admin signup --> ", username, email, password);
    try {
      const response = await axios.post("api/auth/admin/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/admin/adminHome");
      setUser({ isLoading: false, userEmail: email });
      handleCloseModal();
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 409) {
        let errorRes = error.response.data.message;
        setOnError(errorRes);
      } else {
        console.log("An error occurred: ", error);
      }
    }
  };

  const handleAdminSubmission = async (
    username: string | null | undefined,
    email: string,
    password: string
  ): Promise<void> => {
    console.log("from prop -->", username);

    try {
      if (isSignInRef.current) {
        adminSignIn(email, password);
      } else {
        adminSignUp(username, email, password);
      }
    } catch (err: any) {
      setOnError(err.message);
    }
  };

  const openAdminLoginModal = () => {
    setModalOpen(true);
  };
  const closeAdminLoginModal = () => {
    setModalOpen(false);
  };

  if (userLoading) {
    return <></>;
  }

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div
          style={{
            marginLeft: 10,
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          <Typography variant={"h6"}>Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button onClick={() => {}}>Add course</Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  router.push("/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              variant={"contained"}
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("pageRefreshed");
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                router.push("/");
              }}
            >
              Logout
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
        {userEmail}
        <div style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
          <Typography variant={"h6"}>Coursera</Typography>
        </div>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              // variant={"contained"}
              onClick={() => {
                openAdminLoginModal();
              }}
            >
              Admin Login
            </Button>
            <AdminModal
              open={modalOpen}
              onClose={handleCloseModal}
              onSubmit={handleAdminSubmission}
              isSignInRef={isSignInRef}
              onError={onError}
              handleResetError={handleResetError}
            />
          </div>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              onClick={() => {
                router.push("/user/signin");
              }}
            >
              Sign In
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              onClick={() => {
                router.push("/user/signup");
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
