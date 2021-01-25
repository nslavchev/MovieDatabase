import React, { useState } from "react";
import axios from 'axios';

function ArtistForm() {
    const formFieldsInitialState = {
        profession: '',
        firstName: '',
        lastName: '',
        birthDate: ''
    }

    const [artistDetails, setArtistDetails] = useState(formFieldsInitialState);

    const formValues = (event) => {
        setArtistDetails({
            ...artistDetails,
            [event.target.name]: event.target.value
        });
    };

    const addArtist = async (event) => {
        event.preventDefault();

        try {
            const body = JSON.stringify({
                profession: artistDetails.profession,
                firstName: artistDetails.firstName,
                lastName: artistDetails.lastName,
                birthDate: artistDetails.birthDate
            });

            const response = await axios.post("/api/addartist", body, {
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

        setArtistDetails(formFieldsInitialState)
    };
    return (
        <div class="mt-5 md:mt-0 md:col-span-2">
            <form action="#" method="POST" onSubmit={addArtist}>
                <div class="shadow overflow-hidden sm:rounded-md">
                    <div class="px-4 py-5 bg-white sm:p-6">
                        <div class="grid grid-cols-6 gap-6">
                            <div class="col-span-6 sm:col-span-3">
                                <label for="firstName" class="block text-sm font-medium text-gray-700">First name</label>
                                <input value={artistDetails.firstName} type="text" name="firstName" id="first_name" autocomplete="given-name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={formValues}/>
                            </div>

                            <div class="col-span-6 sm:col-span-3">
                                <label for="lastName" class="block text-sm font-medium text-gray-700">Last name</label>
                                <input value={artistDetails.lastName} type="text" name="lastName" id="last_name" autocomplete="family-name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={formValues}/>
                            </div>

                            <div class="col-span-6 sm:col-span-4">
                                <label for="profession" class="block text-sm font-medium text-gray-700">Profession</label>
                                <select value={artistDetails.profession} id="profession" name="profession" autocomplete="country" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={formValues}>
                                    <option hidden>Choose a profession</option>
                                    <option>Actor</option>
                                    <option>Director</option>
                                    <option>Producer</option>
                                </select>
                            </div>

                            <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                <label for="birthDate" class="block text-sm font-medium text-gray-700">birth date</label>
                                <input value={artistDetails.birthDate} type="date" name="birthDate" id="birthDate" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" onChange={formValues}/>
                            </div>
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

export default ArtistForm;