import React from 'react';

const HowItWorks = () => {
    return (
        <div className="rounded py-10 px-10">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-teal-600 mb-6">How It Works</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">1. Browse Groups</h3>
                        <p className="text-gray-600">Explore a variety of hobby groups based on your interests and location.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">2. Join & Connect</h3>
                        <p className="text-gray-600">Join a group and get in touch with other members. Share ideas and plan activities.</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg shadow">
                        <h3 className="text-xl font-semibold mb-2">3. Enjoy the Journey</h3>
                        <p className="text-gray-600">Attend meetups, participate in events, and have fun doing what you love!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;