import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from 'axios';

function SignUp() {
    const [userDetails, setUserDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        password: ''
    });

    const formValues = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        });
    };

    const history = useHistory();

    const register = async (event) => {
        event.preventDefault();

        try {
            const body = JSON.stringify({
                firstName: userDetails.firstName,
                lastName: userDetails.lastName,
                username: userDetails.username,
                email: userDetails.email,
                password: userDetails.password
            });

            const response = await axios.post("/api/signup", body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                history.push("/signin");
            }else{
                console.log(response.data.reason);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div>
                    <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8" action="#" method="POST" onSubmit={register} >
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm">
                        <div>
                            <input aria-label="First Name" name="firstName" type="text" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="First Name" onChange={formValues} />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Last Name" name="lastName" type="text" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="Last Name" onChange={formValues} />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Email address" name="email" type="email" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="Email address" onChange={formValues} />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="username" name="username" type="text" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="Username" onChange={formValues} />
                        </div>
                        <div className="-mt-px">
                            <input aria-label="Password" name="password" type="password" required
                                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 sm:text-sm sm:leading-5"
                                placeholder="Password" onChange={formValues} />
                        </div>
                    </div>

                    <div className="mt-6">
                        <button type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 transition ease-in-out duration-150"
                                    fill="currentColor" viewBox="0 0 20 20">
                                </svg>
                            </span>
                            Sign up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;