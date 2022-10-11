import React from 'react'
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";

const CheckLogin = () => {
    const router = useRouter();
    const { loginState } = useSelector(({ app: { loginState } }) => ({
      loginState,
    }));
  
    useEffect(() => {
      !loginState && router.push("/");
      console.log('is logged in ?',loginState);
    }, [loginState]);
  return (
    <></>
  )
}

export default CheckLogin