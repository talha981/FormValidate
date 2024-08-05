import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react';
import * as Yup from 'yup';

function FormInputs() {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('User Data');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });
    const [editingUser, setEditingUser] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        localStorage.setItem('User Data', JSON.stringify(users));
    }, [users]);

    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            phone: '',
            gender: '',
            image: '',
        },
        validationSchema: Yup.object({
            fname: Yup.string()
                .required('First Name is Required')
                .min(2, 'At least 2 characters required')
                .max(8, 'Maximum 8 characters required'),
            lname: Yup.string()
                .required('Last Name is Required')
                .min(2, 'At least 2 characters required')
                .max(8, 'Maximum 8 characters required'),
            email: Yup.string()
                .required('Email is Required')
                .email('Invalid Email format'),
            phone: Yup.string()
                .required('Phone number is Required'),
            gender: Yup.string().required('Required'),
            image: Yup.mixed().required('Image is Required'),
        }),
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            if (editingUser) {
                const updatedUsers = users.map(user =>
                    user === editingUser ? values : user
                );
                setUsers(updatedUsers);
                setSuccessMessage('User updated successfully');
                setEditingUser(null);
            } else {
                setUsers((prevUsers) => [...prevUsers, values]);
                setSuccessMessage('User added successfully');
            }
            resetForm();
            setTimeout(() => {
                setSuccessMessage('');
            }, 2000);
        },
    });

    const handleDelete = (userToDelete) => {
        if (editingUser) {
            return;
        }
        const updatedUsers = users.filter(user => user !== userToDelete);
        setSuccessMessage('User Deleted successfully');
        setUsers(updatedUsers);
        setTimeout(() => {
            setSuccessMessage('');
        }, 2000);
    };

    const handleEdit = (userToEdit) => {
        setEditingUser(userToEdit);
        formik.setValues(userToEdit);
    };

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                formik.setFieldValue('image', reader.result);
            };
            reader.readAsDataURL(file);
            
        }
    };

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md mt-10">
                    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">
                        {editingUser ? 'Edit User' : 'User Registration'}
                    </h2>
                    {successMessage && (
                        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-md mb-4">
                            {successMessage}
                        </div>
                    )}
                    <div className="mb-4">
                        <label className="block text-gray-700">Your Image:</label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            onChange={(event) => handleImageChange(event)}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.image && formik.errors.image ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.image}</div>
                        ) : null}
                        {formik.values.image && (
                            <img src={formik.values.image} alt="User Image" className="mt-4 h-32 w-32 object-cover rounded-md" />
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">First Name:</label>
                        <input
                            type="text"
                            name="fname"
                            id="fname"
                            value={formik.values.fname}
                            onChange={formik.handleChange}
                            placeholder="First Name"
                            className={`w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.fname && formik.errors.fname ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.fname && formik.errors.fname ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.fname}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Last Name:</label>
                        <input
                            type="text"
                            name="lname"
                            id="lname"
                            value={formik.values.lname}
                            onChange={formik.handleChange}
                            placeholder="Last Name"
                            className={`w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.lname && formik.errors.lname ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.lname && formik.errors.lname ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.lname}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            placeholder="Enter Email"
                            className={`w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone Number:</label>
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            placeholder="Enter Phone"
                            className={`w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.phone}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Gender:</label>
                        <div className="flex items-center">
                            <input
                                type="radio"
                                className="mr-2"
                                name="gender"
                                value="male"
                                checked={formik.values.gender === 'male'}
                                onChange={formik.handleChange}
                            />
                            <span className="mr-4">Male</span>
                            <input
                                type="radio"
                                className="mr-2"
                                name="gender"
                                value="female"
                                checked={formik.values.gender === 'female'}
                                onChange={formik.handleChange}
                            />
                            <span>Female</span>
                        </div>
                        {formik.touched.gender && formik.errors.gender ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.gender}</div>
                        ) : null}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                        {editingUser ? 'Update' : 'Submit'}
                    </button>
                </div>
            </form>
            <div className="max-w-full mx-auto mt-10">
                <table className="w-full bg-white border border-gray-300 rounded-md shadow-md">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="p-4 text-left border-b">Image</th>
                            <th className="p-4 text-left border-b">First Name</th>
                            <th className="p-4 text-left border-b">Last Name</th>
                            <th className="p-4 text-left border-b">Email</th>
                            <th className="p-4 text-left border-b">Phone</th>
                            <th className="p-4 text-left border-b">Gender</th>
                            <th className="p-4 text-center border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} className="hover:bg-gray-100">
                                <td className="p-4 border-b text-center">
                                    {user.image && (
                                        <img
                                            src={user.image}
                                            alt="User"
                                            className="h-16 w-16 object-cover rounded-md mx-auto"
                                        />
                                    )}
                                </td>
                                <td className="p-4 border-b">{user.fname}</td>
                                <td className="p-4 border-b">{user.lname}</td>
                                <td className="p-4 border-b">{user.email}</td>
                                <td className="p-4 border-b">{user.phone}</td>
                                <td className="p-4 border-b">{user.gender}</td>
                                <td className="p-4 border-b text-center">
                                    <button
                                        className="mr-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                                        onClick={() => handleDelete(user)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default FormInputs;
