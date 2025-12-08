import React from 'react';
import user_icon from '../../assets/user.png';
import email_icon from '../../assets/email.png';
import password_icon from '../../assets/padlock.png';
import { useFormik } from "formik";
import { signUpSchema } from '../../schemas';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const initialValues={
  email: "",
  username:"",
  password: "",
  confirmpassword: ""
};

const Signup = () => {
  const history= useNavigate();
    const {values,errors,touched,handleBlur,handleChange,handleSubmit}= useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: async (values,action)=>{
          await axios.post("http://localhost:1000/api/v1/register",values).then((response)=>{
            if (response.data.message ==="User already exists"){
              alert(response.data.message);
            }else{
              alert(response.data.message);
              history("/signin");
            }
            
          });
            action.resetForm();
        },
    });
  return (

    <div className="w-screen h-screen flex items-center justify-center bg-blue-200">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-lg">
       
        <div className="flex flex-col items-center gap-2 mb-6">
          <div className="text-2xl font-bold text-gray-800">Sign Up</div>
          <div className="underline w-16 h-1 bg-blue-500 rounded"></div>
        </div>

        
        <form  className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center gap-3 border border-gray-300 rounded px-3 py-2">
              <img src={user_icon} alt="User Icon" className="w-5 h-5" />
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full outline-none bg-transparent text-sm"
                value={values.username} onChange={handleChange} onBlur={handleBlur}

              />
              {errors.username && touched.username ? (<p className='error'>{errors.username}</p>):null}
            </div>
          </div> 

          <div>
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
          </div>

          <div>
            <div className="flex items-center gap-3 border border-gray-300 rounded px-3 py-2">
              <img src={password_icon} alt="New Password Icon" className="w-5 h-5" />
              <input
                type="password"
                name="password"
                placeholder="New Password"
                className="w-full outline-none bg-transparent text-sm"
                value={values.password} onChange={handleChange} onBlur={handleBlur}
              />{errors.password && touched.password ? (<p className='error'>{errors.password}</p>):null}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 border border-gray-300 rounded px-3 py-2">
              <img src={password_icon} alt="Confirm Password Icon" className="w-5 h-5" />
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm Password"
                className="w-full outline-none bg-transparent text-sm"
                value={values.confirmpassword} onChange={handleChange} onBlur={handleBlur}
              />
               {errors.confirmpassword && touched.confirmpassword ? (<p className='error'>{errors.confirmpassword}</p>):null}
            </div>
          </div>

          
          <div className="text-sm text-right text-gray-600">
            Already have an account?
            <Link to="/signin" className="text-blue-600 hover:underline cursor-pointer">
              Login
            </Link>
          </div>

          
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded cursor-pointer hover:bg-blue-700 transition"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup;