import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';

const MyGroups = () => {
    const { user } = useContext(AuthContext);
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    // Load user's groups
    useEffect(() => {
        if (user?.email) {
            fetch(`https://b11a10-server-side-rubayetalam21.vercel.app/hobbies/${user.email}`)
                .then(res => res.json())
                .then(data => setGroups(data))
                .catch(err => console.error('Error loading groups:', err));
        }
    }, [user]);

    // Delete handler
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to undo this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#e3342f',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`https://b11a10-server-side-rubayetalam21.vercel.app/hobbies/${id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            Swal.fire('Deleted!', 'The group has been deleted.', 'success');
                            setGroups(prev => prev.filter(group => group._id !== id));
                        }
                    });
            }
        });
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <Helmet>
                <title>Home | My Group </title>
            </Helmet>
            <h2 className="text-3xl font-bold mb-6 text-center text-teal-600">My Groups</h2>
            {groups.length === 0 ? (
                <p className="text-center text-gray-500">You have not created any groups yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead className="bg-teal-600 text-white">
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Location</th>
                                <th>Start Date</th>
                                <th>Max Members</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map(group => (
                                <tr key={group._id}>
                                    <td>{group.title}</td>
                                    <td>{group.category}</td>
                                    <td>{group.location}</td>
                                    <td>{group.startDate}</td>
                                    <td>{group.maxMembers}</td>
                                    <td>
                                        <div className='flex gap-3'>
                                            <button className="btn btn-xs btn-warning" onClick={() => navigate(`/updateGroup/${group._id}`)} >Update</button>
                                            <button
                                                className="btn btn-xs btn-error"
                                                onClick={() => handleDelete(group._id)}
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default MyGroups;
