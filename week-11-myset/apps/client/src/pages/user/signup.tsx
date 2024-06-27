import { Signup } from "ui";
import axios from "axios";
import { userState } from "store";
import { useRouter } from "next/navigation";
import { useSetRecoilState } from "recoil";
import { useState } from "react";

export default function UserSignInPage() {
  const [onError, setOnError] = useState("");
  const setUser = useSetRecoilState(userState);
  const router = useRouter();

  const handleSubmit = async (username: string, email: string, password: string) :Promise<void> => {
    try {
      const response = await axios.post("/api/auth/user/signup", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      router.push("/user/home");
      setUser({ isLoading: false, userEmail : email})
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 403) {
        let errorRes = error.response.data.message;
        setOnError(errorRes);
      } else {
        console.log("An error occurred: ", error);
      }
    }
  };

  return (
    <div>
      <Signup
        onClick={handleSubmit}
        onError={onError}
      />
    </div>
  );
}
