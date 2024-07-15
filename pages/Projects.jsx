import React from 'react'
import { ProjectItems } from './ProjectItems'
import xAIImg from '../public/breakout.gif'
import arxImg from '../public/arx.jpg'
import mpImg from '../public/Motion_platform.jpg'
import LLMImg from '../public/fuzzyxt.svg'
export const Projects = () => {
    return (
        <div id='projects' className='max-w-[1040px] m-auto md:pl-20 p-4 py-16'>
            <h1 className='text-4xl font-bold text-center text-[#001b5e]'>Projects</h1>
            <p className='text-center py-8'>
                Demonstration can be found below.
            </p>
            <div className='grid sm:grid-cols-2 gap-12'>
                <ProjectItems img={arxImg} title='Brain Robot Interaction (BRI)' />
                <ProjectItems img={xAIImg} title='Explainable AI (xAI)' />
                <ProjectItems img={mpImg} title='Human Autonomy Teaming (HAT)' />
                <ProjectItems img={LLMImg} title='Explainable Large Langurage Models (FuzzyXT)' />
            </div>
        </div>
    )
}
export default Projects 