import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const GroupDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [group, setGroup] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/hobbies/user/${id}`)
            .then(res => res.json())
            .then(data => setGroup(data))
            .catch(err => console.error('Failed to fetch group:', err));
    }, [id]);

    const handleJoinGroup = () => {
        // You can later improve this with checks or backend calls
        Swal.fire('Joined', 'You have successfully joined the group!', 'success');
    };

    if (!group) return <div className="text-center mt-20">Loading...</div>;

    const groupStartDate = new Date(group.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isActive = groupStartDate >= today;

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-3 bg-white shadow rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-teal-600 mb-4"><strong>Group Title: </strong>{group.title}</h2>
            <img src={group.imageUrl} alt={group.title} className="w-full rounded mb-4" />
            <div>
                <p><strong>Category:</strong> {group.category}</p>
            </div>
            <div>
                <p><strong>Description:</strong> {group.description}</p>
            </div>
            <div>
                <p><strong>Location:</strong> {group.location}</p>
            </div>
            <div>
                <p><strong>Max Members:</strong> {group.maxMembers}</p>
            </div>
            <div>
                <p><strong>Start Date:</strong> {group.startDate}</p>
            </div>
            <div>
                <p><strong>Organizer:</strong> {group.userName} ({group.userEmail})</p>
            </div>

            <div>
                {isActive ? (
                    <button
                        onClick={handleJoinGroup}
                        className="mt-6 btn bg-teal-500 text-white w-full"
                    >
                        Join Group
                    </button>
                ) : (
                    <p className="mt-6 text-center text-red-600 font-semibold">
                        This group is no longer active and cannot be joined.
                    </p>
                )}
            </div>
        </div>
    );
};

export default GroupDetails;
