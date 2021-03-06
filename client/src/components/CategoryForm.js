import React, { useState } from "react";
import axios from 'axios';

function CategoryForm(){
    const [categoryDetails, setCategoryDetails] = useState({
        genre: ''
    });

    const formValues = (event) => {
        setCategoryDetails({
            ...categoryDetails,
            [event.target.name]: event.target.value
        });
    };

    const addCategory = async (event) => {
        event.preventDefault();

        try {
            const body = JSON.stringify({
                genre: categoryDetails.genre
            });

            const response = await axios.post("/api/addcategory", body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert("Стана шефе");
            }else{
                console.log(response.data.reason);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={addCategory}>
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="col-span-6 sm:col-span-3">
                            <label for="genre" class="block text-sm font-medium text-gray-700">Genre</label>
                            <input type="text" name="genre" id="genre" autocomplete="given-name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={formValues}/>
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;