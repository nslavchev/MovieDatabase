import React, { useEffect, useState } from 'react';
import ArtistForm from './ArtistForm';
import CategoryForm from './CategoryForm';
import MovieForm from './MovieForm';
import Navbar from './Navbar';

function AdminPanel() {
    const [comp, setComp] = useState(null)

    useEffect(() => {
        console.log(1)
    }, [comp]);

    return (
        <div>
            <Navbar />
            <div className="flex justify-center my-10">
                <button onClick={() => setComp(<CategoryForm />)} className="inline-flex items-center justify-center px-5 py-3 border border-1px text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 mx-4">
                    Add Category
            </button>
                <button onClick={() => setComp(<MovieForm />)} className="inline-flex items-center justify-center px-5 py-3 border border-1px text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 mx-4">
                    Add Movie
            </button>
                <button onClick={() => setComp(<ArtistForm />)} className="inline-flex items-center justify-center px-5 py-3 border border-1px text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 mx-4">
                    Add Artist
            </button>
            </div>
            <div className="flex justify-center my-10">
                {comp}
            </div>
        </div>
    );
}

export default AdminPanel;