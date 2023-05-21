import { useRef, useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';

const Login = ({ apiUrl }) => {
  const [googleData, setGoogleData] = useState(null);
  const emailRef = useRef();
  const phoneRef = useRef();
  const levelRef = useRef();

  const register = () => {
    const data = {
      id: googleData.clientId,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      level: levelRef.current.value
    };

    console.log('post', `${apiUrl}/register`, data);
    axios.post(`${apiUrl}/register`, data);
  };

  const decodeGoogleData = (data) => {
    const credential = jwtDecode(data.credential);
    setGoogleData({ clientId: data.clientId, email: credential.email });
  };

  return (
    <div className="h-screen flex flex-col gap-6 items-center justify-center">
      {googleData ? (
        <>
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-600 text-sm">
              E-mail address*
            </label>
            <input
              ref={emailRef}
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
          <button
            className="bg-white rounded px-6 py-2 hover:bg-slate-50 transition-colors"
            onClick={register}
          >
            Register
          </button>
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
