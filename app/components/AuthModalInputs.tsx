import React from 'react'

export type TAuthInputs = {
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  phone: string;
  password: string;
};

export default function AuthModalInputs({ 
  inputs, 
  handleChangeInput,
  isSignIn,
  errors,
}: { 
  inputs: TAuthInputs; 
  handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  isSignIn: boolean;
  errors: any;
}) {
  return (
    <div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <div className='w-[49%]'>
            <input 
              type="text" 
              name='firstName'
              className={`${errors?.firstName ? 'border-red-500 ' : ''}border rounded p-2 py-3 w-[100%]`} 
              placeholder='First Name'
              value={inputs.firstName}
              onChange={handleChangeInput}
            />
            {errors?.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
          </div>
          <div className='w-[49%]'>
            <input 
              type="text" 
              name='lastName'
              className={`${errors?.lastName ? 'border-red-500 ' : ''}border rounded p-2 py-3 w-[100%]`}
              placeholder='Last Name'
              value={inputs.lastName}
              onChange={handleChangeInput}
            />
            {errors?.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
          </div>
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <div className="w-[100%]">
          <input 
            type="email" 
            name='email'
            className={`${errors?.email ? 'border-red-500 ' : ''}border rounded p-2 py-3 w-[100%]`}
            placeholder='Email Address'
            value={inputs.email}
            onChange={handleChangeInput}
          />
          {errors?.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
      </div>
      {isSignIn ? null : (
        <div className="my-3 flex justify-between text-sm">
          <div className="w-[49%]">
            <input 
              type="text" 
              name='phone'
              className={`${errors?.phone ? 'border-red-500 ' : ''}border rounded p-2 py-3 w-[100%]`} 
              placeholder='Phone No.'
              value={inputs.phone}
              onChange={handleChangeInput}
            />
            {errors?.phone && <p className="text-red-500 text-xs italic">{errors.phone}</p>}
          </div>
          <div className="w-[49%]">
            <input 
              type="text" 
              name='city'
              className={`${errors?.city ? 'border-red-500 ' : ''}border rounded p-2 py-3 w-[100%]`} 
              placeholder='Your City'
              value={inputs.city}
              onChange={handleChangeInput}
            />
            {errors?.city && <p className="text-red-500 text-xs italic">{errors.city}</p>}
          </div>
        </div>
      )}
      <div className="my-3 flex justify-between text-sm">
        <div className="w-[100%]">
          <input 
            type="password"
            name='password'
            className={`${errors.password ? 'border-red-500 ' : ''}border rounded p-2 py-3 w-[100%]`} 
            placeholder='Enter Password'
            value={inputs.password}
            onChange={handleChangeInput}
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>
      </div> 
    </div>
  )
}
