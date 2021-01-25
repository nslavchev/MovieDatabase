import { React, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import {userContext} from "../userContext"
import axios from "axios";
import { checkAdmin, checkAuthentication } from "../api";

function Navbar() {
    const history = useHistory();
    const {auth, admin} = useContext(userContext);
    const [checkAuthStatus, setAuthStatus] = auth;
    const [checkAdminStatus, setAdminStatus] = admin;
    var comp;
    var adminButton = <Link to={'/adminpanel'}className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:text-white hover:bg-gray-700">Admin Panel</Link>

    useEffect(() => {
        const getAuthStatus = async () => {
            const result = await checkAuthentication();
            setAuthStatus(result.data);
        }

        const getAdminStatus = async () => {
            const result = await checkAdmin();
            setAdminStatus(result.data);
        }

        getAuthStatus();
        getAdminStatus();
    }, []);

    if(checkAuthStatus){
        comp = <div className="ml-10 flex items-baseline space-x-4">
        <p
            className="px-3 py-2 rounded-md text-lg font-medium text-gray-300 ">Movies Database
        </p>
        <Link to={'/'}
            className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:text-white hover:bg-gray-700">Movies
        </Link>
        <Link to={'/'}
            className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:text-white hover:bg-gray-700">User Reviews
        </Link>
        {checkAdminStatus ? adminButton : null}
        </div>
    }

    return (
        <div>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div id="1" className="hidden md:block">
                                {comp}
                            </div>
                        </div>
                        <div>
                            <button onClick={async () => {
                                if(checkAuthStatus){
                                    await axios.post("/api/signout", {
                                        headers: {
                                            'Content-Type': 'application/json',
                                        }
                                    });
                                    setAuthStatus(false);
                                }
                                history.push("/signin");
                            }}
                                className="px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:text-white hover:bg-gray-700">{checkAuthStatus === null ? '' : checkAuthStatus ? 'Sign Out' : 'Sign In'}
                            </button>
                        </div>

                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;