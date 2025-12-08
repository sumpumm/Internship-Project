import React from 'react';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/padlock.png';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { signInSchema } from '../../schemas';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { authActions } from '../../store';
import { useDispatch } from 'react-redux';

const initialValues={
  email: "",
  password: "",
};

const Signin = () => {
  const dispatch =useDispatch();
  const history= useNavigate();
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}= useFormik({
        initialValues: initialValues,
        validationSchema: signInSchema,
        onSubmit: async (values,action)=>{
          await axios.post("http://localhost:1000/api/v1/login",values).then((response)=>{
            if (response.data.message ==="Invalid password"){
              alert(response.data.message);
            }else if(response.data.message ==="Please Sign Up first"){
              alert(response.data.message);
              history("/signup");
            }else if(response.data.message ==="Error"){
              alert(response.data.message);
              action.resetForm();
            }
            else{
              sessionStorage.setItem("id",response.data.others._id);
              dispatch(authActions.login());
              history("/");
            }
            
          });
            action.resetForm();
        },
    });
  return (
    <form onSubmit={handleSubmit}>
        <div className="w-screen h-screen flex items-center justify-center bg-blue-200">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
        
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="text-2xl font-bold text-gray-800">Login</div>
          <div className="underline w-16 h-1 bg-blue-500 rounded"></div>
        </div>

        
        <div className="space-y-4">
          
          <div className="flex items-center gap-3 border border-gray-300 rounded px-3 py-2">
            <img src={email_icon} alt="Email Icon" className="w-5 h-5" />
            <input
              type="email"
              name="email"
              placeholder="Email Id"
              className="w-full outline-none bg-transparent text-sm"
              value={values.email} onChange={handleChange} onBlur={handleBlur}
            />
            {errors.email && touched.email ? (<p className='error'>{errors.email}</p>):null}
          </div>
          <div className="flex items-center gap-3 border border-gray-300 rounded px-3 py-2">
            <img src={password_icon} alt="Password Icon" className="w-5 h-5" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent text-sm"
              value={values.password} onChange={handleChange} onBlur={handleBlur}
            />
          </div>
        </div>




        
        <div className="flex justify-between mt-10">
          
          <Link to="/signup">
            <div className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition">
              Sign Up
            </div>
          </Link>

          
          <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition"
            >
              Login
            </button>
        </div>
      </div>
    </div>
    </form>
  )
}

export default Signin