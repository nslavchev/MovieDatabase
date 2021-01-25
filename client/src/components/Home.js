import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
//import {checkAuthentication} from '../api';

function Home() {
    /* const isLoggedIn = checkAuthentication(); 
    console.log(isLoggedIn); */
    const [movies, setMovies] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get('/api/getmovies').then((response) => {
            console.log(response.data.movies);
            setMovies(response.data.movies);
        })
    }, []);

    const loadMovies = movies.length > 0 && movies.map((movie) => {
        return (
            <div class="container row-span-3 col-span-2">
                <div class="flex flex-wrap -mx-1 lg:-mx-4" />
                <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"/>
                <article class="overflow-hidden rounded-lg shadow-lg">
                    <img alt="Placeholder" class="block h-auto w-full" src={movie.posterUrl} />

                    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 class="text-black text-lg">
                            {movie.title}
                        </h1>


                        <p class="text-grey-darker text-sm">
                            Rating: {movie.rating}/10
                        </p>

                        <button onClick={() => history.push({ pathname: '/moviedetail', state: { movie: movie } })}>Details</button>
                    </header>
                </article>
            </div>
        );
    });

    return (
        <div>
            <Navbar />
            <div class="mx-20 my-20 grid grid-rows-6 grid-cols-6 gap-4">
                {loadMovies}
            </div>
        </div>
    );
}

export default Home;