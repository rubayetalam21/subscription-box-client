import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const GroupDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [group, setGroup] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/hobbies/${id}`)
            .then(res => res.json())
            .then(data => setGroup(data))
            .catch(err => console.error('Failed to fetch group:', err));
    }, [id]);

    const handleJoinGroup = () => {
        // You can later improve this with checks or backend calls
        Swal.fire('Joined', 'You have successfully joined the group!', 'success');
    };

    if (!group) return <div className="text-center mt-20">Loading...</div>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-teal-600 mb-4">{group.title}</h2>
            <img src={group.imageUrl} alt={group.title} className="w-full rounded mb-4" />
            <p><strong>Category:</strong> {group.category}</p>
            <p><strong>Description:</strong> {group.description}</p>
            <p><strong>Location:</strong> {group.location}</p>
            <p><strong>Max Members:</strong> {group.maxMembers}</p>
            <p><strong>Start Date:</strong> {group.startDate}</p>
            <p><strong>Organizer:</strong> {group.userName} ({group.userEmail})</p>

            <button
                onClick={handleJoinGroup}
                className="mt-6 btn bg-teal-500 text-white w-full"
            >
                Join Group
            </button>
        </div>
    );
};

export default GroupDetails;
