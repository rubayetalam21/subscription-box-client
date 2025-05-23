import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css'

const FeaturedGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://b11a10-server-side-rubayetalam21.vercel.app/hobbies')
            .then(res => res.json())
            .then(data => {
                const today = new Date();
                const ongoingGroups = data.filter(group => new Date(group.startDate) >= today);
                const limited = ongoingGroups.slice(0, 6);
                setGroups(limited);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch featured groups:", err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center py-10 text-lg font-semibold text-gray-500">Loading...</div>;
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-center text-teal-600 mb-8">Featured Groups</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groups.map(group => (
                    <div key={group._id} className="bg-white shadow rounded-xl p-5">
                        <div
                            key={group._id}
                            className="bg-white rounded-xl p-5"
                            data-tooltip-id="group-tooltip"
                            data-tooltip-content={`Members: ${group.maxMembers || 0}, Meeting: ${group.startDate || 'TBA'}`}
                        >
                            <img
                                src={group.imageUrl}
                                alt={group.title}
                                className="w-full h-48 object-cover rounded-md mb-4"
                            />
                            <h3 className="text-xl font-bold text-teal-700">{group.title}</h3>
                            <p className="text-sm text-gray-500 mb-2">Location: {group.location}</p>
                            <p className="text-sm text-gray-500 mb-2">Start Date: {group.startDate}</p>
                            <p className="text-sm text-gray-600 mt-2">{group.description}</p>
                            <div className='mt-5'>
                                <Link to={`/groupDetails/${group._id}`} className="mt-auto">
                                    <button className="btn bg-teal-500 text-white w-full mt-4">
                                        See More
                                    </button>
                                </Link>
                            </div>
                            <Tooltip id="group-tooltip" place="top" effect="solid" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedGroups;
