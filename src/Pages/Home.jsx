import React from 'react';
import Slider from '../components/Slider';
import AllGroup from './AllGroup';

const Home = () => {
    return (
        <div>
            <div className='w-11/12 mx-auto py-5'>
                <Slider />
            </div>
            <AllGroup></AllGroup>
        </div>
    );
};

export default Home;