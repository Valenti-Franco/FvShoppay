"use client";

// import Header from "../components/header";
// import Footer from "./PageMain/footer";
import Footer from "../PageMain/footer";

import styles from "/styles/signin.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import LoginInput from "../inputs/loginInput";
import { useState } from "react";
import CircledIconBtn from "../buttons/circledIconBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
  country,
} from "next-auth/react";
import axios from "axios";
import DotLoaderSpinner from "../loaders/dotLoader";
import Router from "next/router";

import { useRouter } from "next/navigation";

// import db from "../utils/db";
const initialvalues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};
export default function PageSignin({
  providers,
  callbackUrl,
  csrfToken,
  country1,
}) {
  const router = useRouter();
  const [register, setRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginValidation = Yup.object({
    // login_email: Yup.string()
    //   .required("Email address is required.")
    //   .email("Please enter a valid email address."),
    login_password: Yup.string().required("Please enter a password"),
  });
  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What's your name ?")
      .min(2, "First name must be between 2 and 16 characters.")
      .max(16, "First name must be between 2 and 16 characters.")
      .matches(/^[aA-zZ]/, "Numbers and special characters are not allowed."),
    email: Yup.string()
      .required(
        "You'll need this when you log in and if you ever need to reset your password."
      )
      .email("Enter a valid email address."),
    password: Yup.string()
      .required(
        "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),
    conf_password: Yup.string()
      .required("Confirm your password.")
      .oneOf([Yup.ref("password")], "Passwords must match."),
  });
  const signUpHandler = async (e) => {
    // console.log(name, email, password);
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://fvecommerce.somee.com/api/Usuarios/Register",
        {
          nombre: name,
          email: email,
          password: password,
        }
      );
      // setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setRegister(true);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };
  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    // console.log(login_email, login_password);
    // const res = await axios.post(
    //   "https://fvecommerce.somee.com/api/Usuarios/authenticate",
    //   {
    //     nombre: login_email,
    //     password: login_password,
    //   }
    // );
    // console.log(res);
    const res = await signIn("credentials", options);

    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {
      return router.push(callbackUrl || "/");
    }
  };

  return (
    <>
      {register && (
        <div class=" absolute min-w-full z-20  flex min-h-screen items-center justify-center bg-gray-400  bg-opacity-30">
          <div class="rounded-lg bg-gray-50 px-16 py-14">
            <div class="flex justify-center">
              <div class="rounded-full bg-green-200 p-6">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-green-500 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="h-8 w-8 text-white"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <h3 class="my-4 text-center text-3xl font-semibold text-gray-700">
              Congratuation!!!
            </h3>
            <p class="w-[230px] text-center font-normal text-gray-600">
              Your order have been taken and is being attended to
            </p>
            <button
              onClick={() => setRegister(false)}
              class="mx-auto mt-10 block rounded-xl border-4 border-transparent bg-orange-400 px-6 py-3 text-center text-base font-medium text-orange-100 outline-8 hover:outline hover:duration-300"
            >
              Track Order
            </button>
          </div>
        </div>
      )}

      {loading && <DotLoaderSpinner loading={loading} />}
      {/* <Header country={country1} /> */}
      {/* <ButtonAuth /> */}
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We ´d be happy to join us ! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form
                  method="post"
                  action="https://fvecommerce.somee.com/api/Usuarios/authenticate"
                >
                  <input
                    type="hidden"
                    name="csrfToken"
                    defaultValue={csrfToken}
                  />
                  <LoginInput
                    type="text"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign in" />
                  {login_error && (
                    //mensaje a mano
                    <span className={styles.error}>
                      password or email incorrect
                    </span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot password ?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            {/* <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              <div className={styles.login__socials_wrap}>
                {/* {providers.map((provider) => {
                  if (provider.name == "Credentials") {
                    return;
                  }
                  return (
                    <div key={provider.name}>
                      <button
                        className={styles.social__btn}
                        onClick={() => signIn(provider.id)}
                      >
                        <img src={`../../icons/${provider.name}.png`} alt="" />
                        Sign in with {provider.name}
                      </button>
                    </div>
                  );
                })} 
              </div>
            </div> */}
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>
              Get access to one of the best Eshopping services in the world.
            </p>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={(e) => {
                signUpHandler(e);
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.error}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country="Argentina" />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { req, query } = context;

//   const session = await getSession({ req });
//   const { callbackUrl } = query;
//   db.connectDb();
//   let data = await axios
//     .get("https://api.ipregistry.co/?key=mwed3zsjldijukpq")
//     .then((res) => {
//       return res.data.location.country;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   if (session) {
//     return {
//       redirect: {
//         destination: callbackUrl,
//       },
//     };
//   }
//   const csrfToken = await getCsrfToken(context);
//   const providers = Object.values(await getProviders());
//   return {
//     props: {
//       providers,
//       csrfToken,
//       callbackUrl,
//       country1: { name: data.name, flag: data.flag.emojitwo },
//     },
//   };
// }
