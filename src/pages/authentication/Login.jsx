import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { RxEyeClosed } from "react-icons/rx";
import { TfiEye } from "react-icons/tfi";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import bgImg from '../../assets/images/login.png';
import useAuth from "../../hooks/useAuth";
import Loader from './../../components/Loader';
import logo from '/wordInsight_logo.jpeg';
import axios from "axios";


const Login = () => {

  const { signInUser, googleLogin, gitHubLogin, user } = useAuth();

  // custom loader for login
  const [customLoader, setCustomLoader] = useState(false);

  // password show
  const [passShow, setPassShow] = useState(false);

  // Navigation
  const navigate = useNavigate();
  const location = useLocation();
  const whereTo = location?.state || '/';

  // React hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const { email, password } = data;

    signInUser(email, password)
      .then(result => {

        setCustomLoader(true);
        // console.log(result.user)
        const loggedUser = { email };
        axios.post(`${import.meta.env.VITE_SERVER}/jwt`, loggedUser, { withCredentials: true })
          .then(res => {
            console.log(res.data)
          })
        toast.success("Logged in successful!🎉", { autoClose: 2000, theme: "colored" })

        if (result.user) {
          setCustomLoader(false);
          navigate(whereTo, { replace: true });
        }

      })
      .catch(error => {

        setCustomLoader(false);
        const errorCode = error.code;
        // Remove 'auth/' prefix and '-' characters
        const cleanedErrorCode = errorCode.replace(/^auth\/|-/g, ' ');
        const words = cleanedErrorCode.split('-');
        const capitalizedWords = words.map(word => word.charAt(1).toUpperCase() + word.slice(2));
        const message = capitalizedWords.join(' ');
        toast.error(`${message}`, { autoClose: 5000, theme: "colored" })

      })
  }

  // Navigation handler for all social platform
  const handleSocialLogin = socialLoginProvider => {
    socialLoginProvider()
      .then(result => {
        if (result.user) {
          // console.log(result.user)
          axios.post(`${import.meta.env.VITE_SERVER}/jwt`, {
            email: (result?.user?.email !== null ? result.user?.email : result.user?.displayName),
            // email: result?.user?.email,
          },
            { withCredentials: true }
          )
            // .then(res => {
            //   console.log(res.data)
            // })
          toast.success("Logged in successful!🎉", { autoClose: 2000, theme: "colored" })
          navigate(whereTo)
        }
      })
      .catch(error => {
        const errorCode = error.code;
        // Remove 'auth/' prefix and '-' characters
        const cleanedErrorCode = errorCode.replace(/^auth\/|-/g, ' ');
        const words = cleanedErrorCode.split('-');
        const capitalizedWords = words.map(word => word.charAt(1).toUpperCase() + word.slice(2));
        const message = capitalizedWords.join(' ');

        toast.error(`${message}`, { autoClose: 5000, theme: "colored" })
        navigate('/login')
      })
  }

  // Custom loader
  if (customLoader) {
    return <Loader />;
  }

  if (user && location?.pathname == '/login' && location?.state == null) {
    // toast.info(`Dear, ${user?.displayName || user?.email}! You are already Logged in!`, { autoClose: 3000, theme: "colored" });
    return <Navigate to='/' state={location?.pathname || '/'} />
  }


  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-370px)] '>
      <Helmet>
        <title>Horizon | Login</title>
      </Helmet>
      <div className='flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg  lg:max-w-4xl '>
        <div
          className='hidden bg-cover bg-center lg:block lg:w-1/2'
          style={{
            backgroundImage: `url(${bgImg})`,
          }}
        ></div>

        <div className='w-full px-6 py-8 md:px-8 lg:w-1/2'>
          <div className='flex justify-center mx-auto'>
            <img
              className='w-auto md:h-12  h-8 rounded'
              src={logo}
              alt=''
            />
          </div>

          <p className='mt-3 text-xl text-center text-gray-600 '>
            Welcome back!
          </p>

          <div
            onClick={() => handleSocialLogin(googleLogin)}
            className='flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg    hover:scale-105 hover:bg-primary overflow-hidden'>
            <div className='px-4 py-2'>
              <svg className='w-6 h-6' viewBox='0 0 40 40'>
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#FFC107'
                />
                <path
                  d='M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z'
                  fill='#FF3D00'
                />
                <path
                  d='M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z'
                  fill='#4CAF50'
                />
                <path
                  d='M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z'
                  fill='#1976D2'
                />
              </svg>
            </div>

            <span className='w-5/6 px-4 py-3 font-bold text-center'>
              Log in with Google
            </span>
          </div>

          <div
            onClick={() => handleSocialLogin(gitHubLogin)}
            className='flex cursor-pointer items-center justify-center mt-4 text-gray-600 transition-colors duration-300 transform border rounded-lg   hover:scale-105 hover:bg-primary overflow-hidden '>
            <div className='px-4 py-2'>
              <FaGithub size={25} />
            </div>

            <span className='w-5/6 px-4 py-3 font-bold text-center'>
              Log in with GitHub
            </span>
          </div>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>

            <div className='text-xs text-center text-gray-500 uppercase  hover:underline'>
              login with email
            </div>

            <span className='w-1/5 border-b dark:border-gray-400 lg:w-1/4'></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-4'>
              <label
                className='block mb-2 text-sm font-medium text-gray-600 '
                htmlFor='LoggingEmailAddress'
              >
                Email Address
              </label>
              <input
                id='LoggingEmailAddress'
                autoComplete='email'
                name='email'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type='email'
                {...register("email", { required: true })}
              />
              <div className="mt-1 animate-pulse">
                {errors.email && <span className="text-red-500">Please fill up Email field</span>}
              </div>
            </div>

            <div className='mt-4 relative'>
              <div className='flex justify-between'>
                <label
                  className='block mb-2 text-sm font-medium text-gray-600 '
                  htmlFor='loggingPassword'
                >
                  Password
                </label>
              </div>

              <input
                id='loggingPassword'
                autoComplete='current-password'
                name='password'
                className='block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg    focus:border-blue-400 focus:ring-opacity-40  focus:outline-none focus:ring focus:ring-blue-300'
                type={passShow ? "text" : "password"}
                {...register("password", { required: true })}
              />
              <span
                onClick={() => setPassShow(!passShow)}
                className="cursor-pointer absolute top-10 right-4 text-black"
              >
                {
                  passShow ? <TfiEye /> : <RxEyeClosed />
                }
              </span>
              <div className="mt-1 animate-pulse">
                {errors.password && <span className="text-red-500">Please fill up Password field</span>}
              </div>
            </div>
            <div className='mt-6'>
              <button
                type='submit'
                className='w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50'
              >
                Log In
              </button>
            </div>
          </form>

          <div className='flex items-center justify-between mt-4'>
            <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>

            <Link
              to='/registration'
              className='text-xs font-semibold text-rose-700 uppercase  hover:underline animate-pulse'
            >
              Register
            </Link>

            <span className='w-1/5 border-b dark:border-gray-400 md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login