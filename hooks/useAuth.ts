import { TAuthInputs } from "@/app/components/AuthModalInputs";
import { useAuthContext } from "@/app/context/AuthContext";
import axios from "axios";
import { removeCookies } from "cookies-next";
import { useState } from "react";

const baseUrl = 'http://localhost:3000/api';

const useAuth = () => {
  const { setAuthState } = useAuthContext();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const signIn = async (email: string, password: string, setOpen: (status: boolean) => void) => {
    setLoading(true);
    try {
      setErrors({});
      const result: any = await axios.post(`${baseUrl}/auth/signin`, {
        email,
        password
      });
      setAuthState({
        data: result?.data?.user,
        loading: false,
        error: null,
      });
      setOpen(false);
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ root: error?.message })
      }
    }
    setLoading(false);
  };

  const signUp = async (payload: TAuthInputs, setOpen: (status: boolean) => void) => {
    setLoading(true);
    try {
      setErrors({});
      const result = await axios.post(`${baseUrl}/auth/signup`, payload);
      setAuthState({
        data: result?.data?.user,
        loading: false,
        error: null,
      });
      setOpen(false);
    } catch (error: any) {
      if (error?.response?.status === 400) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ root: error?.message })
      }
    }
    setLoading(false);
  };

  const signOut = () => {
    setAuthState({
      data: null,
      loading: false,
      error: null,
    });
    removeCookies('jwt');
  };

  return {
    signIn,
    signUp,
    errors,
    setErrors,
    loading,
    signOut
  }
};

export default useAuth;