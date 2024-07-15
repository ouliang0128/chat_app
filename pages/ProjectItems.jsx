import React from 'react';
import Image from 'next/image';

export const ProjectItems = ({ img, title }) => {
    return (
        <div className='relative flex items-center justify-center h-64 w-full shadow-xl shadow-gray-400 rounded-xl group hover:bg-gradient-to-r from-gray-200 to-[#001b5e]'>
            <div className='relative w-full h-full'>
                <Image src={img} alt={title} layout='fill' objectFit='cover' className='rounded-xl group-hover:opacity-10' />
            </div>
            <div className='hidden group-hover:block absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                <h3 className='text-2xl font-bold text-white tracking-wider text-center'>{title}</h3>
                <p className='pb-4 pt-2 text-white text-center'></p>
                <a href="/">
                    <p className='text-center p-3 rounded-lg bg-white text-gray-700 font-bold cursor-pointer text-lg'>More Info</p>
                </a>
            </div>
        </div>
    );
};

export default ProjectItems;
