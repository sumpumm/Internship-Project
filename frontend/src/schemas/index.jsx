import * as Yup from "yup";

export const signUpSchema = Yup.object({
    username: Yup.string().min(5).max(25).required("Please enter a username"),
    email: Yup.string().email().required("Please enter a valid email"),
    password: Yup.string().min(6).required("Password must be atleast 6 characters"),
    confirmpassword: Yup.string().required().oneOf([Yup.ref('password'),null],"Password must match"),
});
export const signInSchema = Yup.object({
    email: Yup.string().email().required("Please enter a valid email"),
});