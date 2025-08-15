import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signUpAsync } from "../../redux/authSlice";
import InputCustom from "../../component/InputCustom/InputCustom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error, auth } = useSelector((state) => state.auth);

  const handleSignUp = () => {
    if (!name || !email || !password)
      return alert("Vui lòng nhập đầy đủ thông tin");
    dispatch(signUpAsync({ name, email, password }));
  };

  return (
    <div className="h-screen flex items-center">
      <div className="w-full rounded-lg flex flex-col items-center py-6 px-20 bg-slate-300">
        <h1 className="text-3xl font-bold mb-4">Sign Up</h1>

        <InputCustom
          className="w-[300px]"
          label="Name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <InputCustom
          className="w-[300px]"
          label="Email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <InputCustom
          className="w-[300px]"
          label="Password"
          type="password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />

        {loading && <p className="text-blue-500 mt-2">Đang đăng ký...</p>}
        {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
        {error && <p className="text-red-500 mt-2">{error.message || error}</p>}

        {auth && <p className="text-green-500 mt-2">Đăng ký thành công!</p>}

        <button
          onClick={handleSignUp}
          className="mt-6 px-4 py-2 bg-blue-500 rounded-md text-white font-semibold text-lg"
          disabled={loading}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
