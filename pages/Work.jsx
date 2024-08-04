import React from 'react';
import WorkItem from './WorkItem';

const data = [
    {
        year: 2019,
        title: 'Machine Learning Engineer',
        duration: '5 Years',
        details:
            'Translated research findings into industrial (defense, healthcare) project products, including a $3 million AI solution for Brain-Robot Interaction. Managed and supervised students, designing of over 10 scenarios for a drive simulation motion platform for research.',
    },
    {
        year: 2022,
        title: 'Tutor',
        duration: '2 Years',
        details:
            'Instructed undergraduate students in machine learning, supervising AI-based software development. Ranked as the  top 1 instructor based on student feedback in 2022. Manage more than 20 student projects focused on developing real-world AI applications.',
    },
    {
        year: 2011,
        title: 'Computer Network Admin & Technical Support',
        duration: '7 Years',
        details:
            'Provided hardware and software solutions, saving clients up to 45% in costs',
    },
];

const Work = () => {
    return (
        <div id='work' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
            <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Work</h1>
            {data.map((item, idx) => (
                <WorkItem
                    key={idx}
                    year={item.year}
                    title={item.title}
                    duration={item.duration}
                    details={item.details}
                />
            ))}
        </div>
    );
};

export default Work;
