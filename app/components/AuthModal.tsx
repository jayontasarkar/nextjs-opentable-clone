"use client";

import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import AuthModalInputs, { TAuthInputs } from './AuthModalInputs';
import useAuth from '@/hooks/useAuth';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 520,
  bgcolor: 'background.paper',
  boxShadow: 18,
  p: 4,
};

export default function AuthModal({ isSignIn }: { isSignIn: boolean }) {
  const { signIn, signUp, errors, setErrors, loading } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [inputs, setInputs] = useState<TAuthInputs>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
    password: ""
  });

  const resetForm = () => {
    setInputs({
      firstName: "",
      lastName: "",
      email: "",
      city: "",
      phone: "",
      password: ""
    });
    setErrors({});
  };

  const handleOpen = () => {
    setOpen(true);
    resetForm();
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        return setDisabled(false);
      }
    } else {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.city &&
        inputs.phone &&
        inputs.password
      ) {
        return setDisabled(false);
      }
    }
    setDisabled(true);
  }, [inputs]);

  const renderContent = (signInContent: string, signUpContent: string) => {
    return isSignIn ? signInContent : signUpContent;
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as string;
    setInputs({
      ...inputs,
      [name]: e.target.value
    });
    const cloneErrors: {[key: string]: string} = { ...errors };
    if (cloneErrors[name]) {
      delete cloneErrors[name];
      setErrors(cloneErrors);
    }
  };

  const handleOnSubmit = () => {
    if (isSignIn) {
      signIn(inputs.email, inputs.password, setOpen);
    } else {
      signUp(inputs, setOpen);
    }
  };

  return (
    <div>
      <button 
        className={`${renderContent('bg-blue-400 text-white', '')} "border p-1 px-4 rounded mr-3"`}
        onClick={handleOpen}
      >
        {renderContent('Sign in', 'Sign up')}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2 h-[470px]">
            <div className="uppercase font-bold text-center bp-2 border-b mb-2">
              <p>{renderContent('Sign in', 'Create Account')}</p>
            </div>
            <div className="m-auto mb-5">
              <h2 className="text-2xl font-light text-center">
                {renderContent('Login Into Your Account', 'Create Your OpenTable Account')}
              </h2>
            </div>
            <AuthModalInputs 
              inputs={inputs} 
              handleChangeInput={handleChangeInput} 
              isSignIn={isSignIn}
              errors={errors}
            />
            <button 
              className='mt-2 uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400'
              disabled={disabled || loading}
              onClick={handleOnSubmit}
            >
              {renderContent('Sign In', 'Create Account')}
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}