import React, { useContext, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';
import Swal from 'sweetalert2';

const CreateGroup = () => {
    const { user } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        location: '',
        maxMembers: '',
        startDate: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Send formData + user info to backend here


        const form = e.target;
        const formData = new FormData(form);
        const newHobbyData = Object.fromEntries(formData.entries());
        const newHobby = {
            ...newHobbyData,
            userName: user?.displayName || 'Anonymous',
            userEmail: user?.email || 'Not signed in',
        };
    
        console.log(newHobby);

        fetch('http://localhost:3000/hobbies', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newHobby)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log('added successfully.')

                    Swal.fire({
                        title: "Hobby added successfully!",
                        icon: "success",
                        draggable: true
                    });

                    // Optionally reset the form
                    setFormData({
                        title: '',
                        category: '',
                        description: '',
                        location: '',
                        maxMembers: '',
                        startDate: '',
                        imageUrl: '',
                    });
                }
            })

        console.log({ ...formData, userName: user?.displayName, userEmail: user?.email });


    };

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
            <h2 className="text-2xl font-bold text-center mb-6 text-teal-600">Create New Group</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Group Title"
                        value={formData.title}
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
                        value={formData.imageUrl}
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
                        Create
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateGroup;
