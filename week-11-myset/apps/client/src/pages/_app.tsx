import "@/styles/globals.css";
import axios from "axios";
import type { AppProps } from "next/app";
import { RecoilRoot, useSetRecoilState, useRecoilValue } from "recoil";
import { isUserLoading, userState } from "store";
import { useEffect} from 'react'
import Appbar from "@/components/AppBar";

export default function App({ Component, pageProps }: AppProps) {
  return <RecoilRoot>
    <App2 Component= {Component} pageProps={...pageProps} />
  </RecoilRoot>
}

function App2({ Component, pageProps}) {
  const userLoading = useRecoilValue(isUserLoading)
  if (userLoading){
    return <div>
      Loading... 
      <InitUser />
    </div>
  }
  return <div>
    <Appbar />
    <Component {...pageProps} />
  </div> 
}

function InitUser(){
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get(`/api/auth/me`, {
        headers : {
          "Authorization" : "Bearer " + localStorage.getItem("token")
        }
    
      });

      if (response.data.user) {
        setUser({
          isLoading: false,
          userEmail : response.data.user.username
        })
      } else {
        setUser({
          isLoading :  false,
          userEmail : null
        })
      }
      
    } catch (error) {
      setUser({
        isLoading: false,
        userEmail : null
      })
    }
  };
  useEffect(() => {
    init()
  }, [])
  return <></>
}
