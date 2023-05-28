import { useRef, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import { Navigate } from 'react-router-dom';

const Login = ({ googleData, setGoogleData }) => {
  const [redirect, setRedirect] = useState(false);
  const phoneRef = useRef();
  const levelRef = useRef();

  const register = async () => {
    const data = {
      token: googleData.clientId,
      user_email: googleData.email,
      user_phone: phoneRef.current.value,
      level: levelRef.current.value
    };

    const res = await axios.post(import.meta.env.VITE_ADD_USER_ENDPOINT, data);
    console.log(res);

    setRedirect(true);
  };

  const decodeGoogleData = (data) => {
    const credential = jwtDecode(data.credential);
    console.log(credential);
    setGoogleData({
      clientId: data.clientId,
      email: credential.email,
      name: credential.given_name
    });
  };

  return redirect ? (
    <Navigate to="/home" />
  ) : (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      {googleData ? (
        <>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 text-sm">
              E-mail address*
            </label>
            <input
              className="border-2 rounded border-white px-2 py-1 text-gray-700"
              type="email"
              name="email"
              id="email"
              value={googleData.email || ''}
              disabled
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-600 text-sm">
              Phone number
            </label>
            <input
              ref={phoneRef}
              className="border-2 rounded border-white px-2 py-1"
              type="tel"
              name="phone"
              id="phone"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="level" className="text-gray-600 text-sm">
              Level*
            </label>
            <select
              ref={levelRef}
              name="level"
              id="level"
              required
              className="border-2 rounded border-white w-[197px] px-2 py-1 h-9 cursor-pointer"
            >
              <option value="1">JLPT-N1</option>
              <option value="2">JLPT-N2</option>
              <option value="3">JLPT-N3</option>
              <option value="4">JLPT-N4</option>
              <option value="5">JLPT-N5</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button
              className="bg-white rounded px-6 py-2 hover:bg-slate-50 transition-colors"
              onClick={register}
            >
              Register
            </button>
            <button
              className="bg-white rounded px-6 py-2 hover:bg-slate-50 transition-colors"
              onClick={() => setRedirect(true)}
            >
              Learn
            </button>
          </div>
        </>
      ) : (
        <GoogleLogin
          onSuccess={decodeGoogleData}
          onError={() => {
            console.log('Login Failed');
          }}
        />
      )}
    </div>
  );
};

export default Login;
