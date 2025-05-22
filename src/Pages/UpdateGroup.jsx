import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';
import { useLoaderData } from 'react-router';

const UpdateGroup = () => {
    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        location: '',
        maxMembers: '',
        startDate: '',
        imageUrl: '',
    });

    // const {_id, title, category, description, location, maxMembers, startDate, imageUrl} = useLoaderData();

    // console.log(title);
    // // Load existing group data
    // useEffect(() => {
    //     fetch(`https://b11a10-server-side-rubayetalam21.vercel.app/hobbies/${id}`)
    //         .then(res => res.json())
    //         .then(data => setFormData(data))
    //         .catch(err => console.error('Failed to fetch group data:', err));
    // }, [id]);


    useEffect(() => {
        fetch(`https://b11a10-server-side-rubayetalam21.vercel.app/hobbies/user/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then(data => {
                console.log('Fetched group:', data);
                setFormData({
                    title: data.title || '',
                    category: data.category || '',
                    description: data.description || '',
                    location: data.location || '',
                    maxMembers: data.maxMembers || '',
                    startDate: data.startDate || '',
                    imageUrl: data.imageUrl || ''
                });
            })
            .catch(err => console.error('Failed to fetch group data:', err));
    }, [id]);


    console.log(formData.title);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedGroup = {
            ...formData,
            userName: user?.displayName,
            userEmail: user?.email,
        };

        fetch(`https://b11a10-server-side-rubayetalam21.vercel.app/hobbies/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedGroup),
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    Swal.fire('Success', 'Group updated successfully!', 'success');
                    navigate('/myGroup');
                }
            })
            .catch(error => {
                console.error('Update failed:', error);
                Swal.fire('Error', 'Failed to update group.', 'error');
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">Update Group</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Group Title"
                        defaultValue={formData.title}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    >
                        <option value="">Select Category</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Fishing">Fishing</option>
                        <option value="Running">Running</option>
                        <option value="Cooking">Cooking</option>
                        <option value="Reading">Reading</option>
                        <option value="Writing">Writing</option>
                    </select>
                </div>

                <div>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="textarea textarea-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="location"
                        placeholder="Meeting Location"
                        value={formData.location}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <input
                        type="number"
                        name="maxMembers"
                        placeholder="Max Members"
                        value={formData.maxMembers}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                        required
                    />
                </div>

                <div>
                    <input
                        type="url"
                        name="imageUrl"
                        placeholder="Image URL"
                        defaultValue={formData.imageUrl}
                        onChange={handleChange}
                        className="input input-bordered w-full"
                    />
                </div>

                <div>
                    <input
                        type="text"
                        value={user?.displayName || 'Anonymous'}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <input
                        type="email"
                        value={user?.email || 'Not signed in'}
                        readOnly
                        className="input input-bordered w-full bg-gray-100"
                    />
                </div>

                <div>
                    <button type="submit" className="btn bg-teal-500 text-white w-full">
                        Update Group
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateGroup;
