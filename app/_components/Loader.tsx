'use client';

import { PuffLoader } from 'react-spinners';
const Loader = () => {
    return (
        <div className="h-[70vh] w-screen flex items-center justify-center">
            <PuffLoader color="red" size={50} />
        </div>
    );
};

export default Loader;
