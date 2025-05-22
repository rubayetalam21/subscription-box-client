// Home.jsx
import React from 'react';
import { Fade, Slide } from 'react-awesome-reveal';
import Slider from '../components/Slider';
import AllGroup from './AllGroup';
import FeaturedGroups from './FeaturedGroups';

const Home = () => {
    return (
        <div>
            <div className='w-11/12 mx-auto py-5'>
                <Fade direction="up" duration={800} triggerOnce>
                    <Slider />
                </Fade>
            </div>

            <Slide direction="up" triggerOnce>
                <FeaturedGroups></FeaturedGroups>
            </Slide>
        </div>
    );
};

export default Home;
