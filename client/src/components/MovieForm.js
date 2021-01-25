import { React, useEffect, useState } from "react";
import axios from "axios";
import Select from 'react-select'
import CreatableSelect from 'react-select/creatable'

function MovieForm() {
    const formFieldsInitalState = {
        title: '',
        genre: '',
        producers: '',
        productionDate: '',
        actors: [],
        awards: [],
        language: '',
        rating: '',
        posterUrl: '',
        trailerUrl: '',
        country: '',
        ratingIMDB: '',
        description: ''
    }

    const characterDetailsInitialState = {
        character: '',
        actorForCharacter: ''
    }

    const [formFields, setFormFields] = useState(formFieldsInitalState);
    const [actors, setActors] = useState([]);
    const [producers, setProducers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [characters, setCharacters] = useState([]);
    const [characterDetails, setCharacterDetails] = useState(characterDetailsInitialState);
    const [selectedActors, setSelectedActors] = useState([]);
    const [selectedAwards, setSelectedAwards] = useState([]);
    const [keywords, setKeywords] = useState([]);

    const handleKeywordsChange = (e) => {
        console.log(e)
        setKeywords(Array.isArray(e) ? e.map(x => x.value) : []);
        console.log(keywords);
    }

    const handleActorsChange = (e) => {
        setSelectedActors(Array.isArray(e) ? e.map(x => x.value) : []);
        console.log(selectedActors);
    }

    const handleAwardsChange = (e) => {
        setSelectedAwards(Array.isArray(e) ? e.map(x => x.value) : []);
        console.log(selectedAwards);
    }

    var actorOptions = [];

    const awardsOptions = [{ value: "Academy Award", label: "Academy Award" }, { value: "Golden Globe", label: "Golden Globe" },
    { value: "Emmy Award", label: "Emmy Award" }, { value: "Grammy Award", label: "Grammy Award" },
    { value: "American Music Award", label: "American Music Award" }, { value: "Blockbuster Entertainment Awards", label: "Blockbuster Entertainment Awards" },
    { value: "Blue Ribbon Award", label: "Blue Ribbon Award" }, { value: "Empire Award", label: "Empire Award" },
    { value: "Golden Rooster Award", label: "Golden Rooster Award" }, { value: "Golden Screen Award", label: "Golden Screen Award" }]

    const formCharacterValues = (event) => {
        setCharacterDetails({
            ...characterDetails,
            [event.target.name]: event.target.value
        });
    };

    const formValues = (event) => {
        setFormFields({
            ...formFields,
            [event.target.name]: event.target.value
        });
    };

    const submitMovie = async (event) => {
        event.preventDefault();

        try {
            const body = JSON.stringify({
                title: formFields.title,
                genre: formFields.genre,
                producers: formFields.producers,
                productionDate: formFields.productionDate,
                actors: selectedActors,
                awards: selectedAwards,
                language: formFields.language,
                characters: characters,
                rating: formFields.rating,
                posterUrl: formFields.posterUrl === '' ? 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/movies-to-watch-1585258004.jpg' : formFields.posterUrl,
                trailerUrl: formFields.trailerUrl === '' ? 'https://www.youtube.com/watch?v=EHXqb-vACOQ' : formFields.trailerUrl,
                country: formFields.country,
                ratingIMDB: formFields.ratingIMDB,
                description: formFields.description
            });

            const response = await axios.post("/api/addmovie", body, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.success) {
                alert("Стана шефе");
            } else {
                console.log(response.data.reason);
            }
        } catch (error) {
            console.log(error);
        }

        setFormFields(formFieldsInitalState);
        setCharacters([]);
        setSelectedActors([]);
        setSelectedAwards([]);
    };

    const addToCharacterArray = (e) => {
        e.preventDefault()
        setCharacters([...characters, { character: characterDetails.character, playedBy: characterDetails.actorForCharacter }]);
        console.log(characters);

        setCharacterDetails(characterDetailsInitialState);
    };

    useEffect(() => {
        axios.get('/api/getactors').then((response) => {
            setActors(response.data.actors);
        })
        axios.get('/api/getproducers').then((response) => {
            setProducers(response.data.producers);
        })
        axios.get('/api/getcategories').then((response) => {
            setCategories(response.data.categories);
        })
    }, []);

    actors.forEach(actor => { actorOptions.push({ value: actor.firstName + " " + actor.lastName, label: actor.firstName + " " + actor.lastName }) })

    const allProducers = producers.length > 0 && producers.map((producer) => {
        return (
            <option>{producer.firstName + " " + producer.lastName}</option>
        );
    });
    const allCategories = categories.length > 0 && categories.map((category) => {
        return (
            <option>{category.genre}</option>
        );
    });

    const availableActors = selectedActors.map((str) => {
        return (
            <option>{str}</option>
        );
    });

    const components = {
        DropdownIndicator: null,
    };

    const createOption = (label) => ({
        label,
        value: label,
    });

    const[value, setValue] = useState([]);
    const[inputValue, setInputValue] = useState([]);

    const handleChange = (value, actionMeta) => {
        console.group('Value Changed');
        console.log(value);
        console.log("keywords");
        console.log(`action: ${actionMeta.action}`);
        console.groupEnd();
        setValue(value);
    };

    const handleInputChange = (inputValue) => {
        setInputValue(inputValue);
    };

    const handleKeyDown = (event) => {
        if (!inputValue) return;
        switch (event.key) {
            case 'Enter':
            case 'Tab':
                console.group('Value Added');
                console.log(value);
                console.groupEnd();
                setInputValue('')
                setValue([...value, createOption(inputValue)]);
                setKeywords(Array.isArray(value) ? value.map(x => x.value) : []);
                console.log(keywords)
                event.preventDefault();
        }
    };


    return (
        <div class="mt-10 sm:mt-0" >
            <div class="mt-5 md:mt-0 md:col-span-2">
                <form action="#" method="POST" onSubmit={submitMovie}>
                    <div class="shadow overflow-hidden sm:rounded-md">
                        <div class="px-4 py-5 bg-white sm:p-6">
                            <div class="grid grid-cols-6 gap-6">
                                <div class="col-span-6 sm:col-span-3">
                                    <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
                                    <input value={formFields.title} onChange={formValues} type="text" name="title" id="title" autocomplete="given-name" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="genre" class="block text-sm font-medium text-gray-700">Choose a category</label>
                                    <select value={formFields.genre} onChange={formValues} id="genre" name="genre" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option hidden>Genre</option>
                                        {allCategories}
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="producers" class="block text-sm font-medium text-gray-700">Choose a producer</label>
                                    <select value={formFields.producers} onChange={formValues} id="producers" name="producers" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option hidden>Select a producer</option>
                                        {allProducers}
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-3">
                                    <label for="productionDate" class="block text-sm font-medium text-gray-700">Production Date</label>
                                    <input value={formFields.productionDate} onChange={formValues} type="date" name="productionDate" id="productionDate" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-6">
                                    <label for="actors" class="block text-sm font-medium text-gray-700">Select actors for the movie:</label>
                                    <Select
                                        //todo
                                        value={actorOptions.filter(obj => selectedActors.includes(obj.value))}
                                        name="actors"
                                        id="actors"
                                        options={actorOptions}
                                        onChange={handleActorsChange}
                                        isMulti
                                    />
                                </div>

                                <div class="col-span-6 sm:col-span-6">
                                    <label for="awards" class="block text-sm font-medium text-gray-700">Select awards for the movie:</label>
                                    <Select
                                        //todo
                                        value={awardsOptions.filter(obj => selectedAwards.includes(obj.value))}
                                        name="awards"
                                        options={awardsOptions}
                                        onChange={handleAwardsChange}
                                        isMulti
                                    />
                                </div>

                                <div class="col-span-6 sm:col-span-6">
                                    <label for="keywords" class="block text-sm font-medium text-gray-700">Add keywords for the movie:</label>
                                    <CreatableSelect
                                        name="keywords"
                                        components={components}
                                        inputValue={inputValue}
                                        isClearable
                                        isMulti
                                        menuIsOpen={false}
                                        onChange={handleChange}
                                        onInputChange={handleInputChange}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Enter a keyword and press enter..."
                                        value={value}
                                    />
                                </div>

                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label for="language" class="block text-sm font-medium text-gray-700">Language</label>
                                    <input value={formFields.language} onChange={formValues} type="text" name="language" id="language" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label for="rating" class="block text-sm font-medium text-gray-700">Rating</label>
                                    <input value={formFields.rating} onChange={formValues} type="number" name="rating" id="rating" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label for="posterUrl" class="block text-sm font-medium text-gray-700">Poster URL</label>
                                    <input value={formFields.posterUrl} onChange={formValues} type="text" name="posterUrl" id="posterUrl" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label for="trailerUrl" class="block text-sm font-medium text-gray-700">Trailer URL</label>
                                    <input value={formFields.trailerUrl} onChange={formValues} type="text" name="trailerUrl" id="trailerUrl" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                                    <input value={formFields.country} onChange={formValues} type="text" name="country" id="country" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label for="ratingIMDB" class="block text-sm font-medium text-gray-700">IMDB Rating</label>
                                    <input value={formFields.ratingIMDB} onChange={formValues} type="number" name="ratingIMDB" id="ratingIMDB" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6">
                                    <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea value={formFields.description} onChange={formValues} type="text" name="description" id="description" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label for="character" class="block text-sm font-medium text-gray-700">Character</label>
                                    <input onChange={formCharacterValues} value={characterDetails.character} type="text" name="character" id="character" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                </div>

                                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label for="actorForCharacter" class="block text-sm font-medium text-gray-700">Choose actor</label>
                                    <select onChange={formCharacterValues} value={characterDetails.actorForCharacter} id="actorForCharacter" name="actorForCharacter" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                        <option hidden>Played By</option>
                                        {availableActors}
                                    </select>
                                </div>

                                <div class="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label for="addCharacter" class="block text-sm font-medium text-gray-700">Add to the map</label>
                                    <button onClick={addToCharacterArray} name="addCharacter" id="addCharacter" class="mt-1 block w-full py-2 px-3 border text-white bg-indigo-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">Add Character</button>
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
        </div>
    );
}

export default MovieForm;