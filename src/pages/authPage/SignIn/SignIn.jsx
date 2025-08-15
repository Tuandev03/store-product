import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import InputCustom from "../../component/InputCustom/InputCustom";
import { signInAsync } from "../../redux/authSlice";
const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error, loading, auth } = useSelector((state) => state.auth);

  const handleSignIn = () => {
    if (!email || !password) return alert("Vui lòng nhập đầy đủ thông tin");
    dispatch(signInAsync({ email, password }));
  };
  return (
    <div className="h-screen flex items-center">
      <div className="w-full rounded-lg flex flex-col items-center py-6 px-20 bg-slate-300">
        <h1 className="text-3xl font-bold mb-4">Sign In</h1>

        <InputCustom
          className="w-[300px]"
          label="Email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <InputCustom
          className="w-[300px]"
          label="Password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />

        {loading && <p className="text-blue-500 mt-2">Đang đăng đăng nhập...</p>}
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {auth && <p className="text-green-500 mt-2">Đăng nhập thành công!</p>}

        <button
          onClick={handleSignIn}
          className="mt-6 px-4 py-2 bg-blue-500 rounded-md text-white font-semibold text-lg"
          disabled={loading}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignIn;
