import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

function Formik2() {
    const formik = useFormik({
        initialValues: {
            fname: '',
            lname: '',
            email: '',
            age: '',
        },
        validationSchema: Yup.object({
            fname: Yup.string()
                .required("Required")
                .min(4, "at least 4 characters")
                .max(8, "should be less than 8 characters"),

            lname: Yup.string()
                .required("Required")
                .min(4, "at least 4 characters")
                .max(8, "should be less than 8 characters"),

            email: Yup.string()
                .required("Required")
                .email("Invalid email address"),

            age: Yup.number()
                .required("Required")
                .min(18, 'Must be at least 18 years old')
                .max(60, 'Must be less than 60 years old')
                .integer()
                .positive(),
        }),
        onSubmit: (values) => {
            const data = new FormData();
            data.append('fname', values.fname);
            data.append('lname', values.lname);
            data.append('email', values.email);
            data.append('age', values.age);

            for (let [key, value] of data.entries()) {
                console.log(`${key} : ${value}`);
            }
        }
    });

    return (
        <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="fname" className="block text-gray-700 text-sm font-bold mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="fname"
                            placeholder="First Name"
                            id="fname"
                            value={formik.values.fname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                formik.touched.fname && formik.errors.fname ? 'border-red-500' : ''
                            }`}
                        />
                        {formik.touched.fname && formik.errors.fname ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.fname}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lname" className="block text-gray-700 text-sm font-bold mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lname"
                            placeholder="Last Name"
                            id="lname"
                            value={formik.values.lname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                formik.touched.lname && formik.errors.lname ? 'border-red-500' : ''
                            }`}
                        />
                        {formik.touched.lname && formik.errors.lname ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.lname}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                            Your Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                            }`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">
                            Your Age
                        </label>
                        <input
                            type="text"
                            name="age"
                            placeholder="Your Age"
                            id="age"
                            value={formik.values.age}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                                formik.touched.age && formik.errors.age ? 'border-red-500' : ''
                            }`}
                        />
                        {formik.touched.age && formik.errors.age ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.age}</div>
                        ) : null}
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Formik2;
