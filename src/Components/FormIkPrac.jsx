import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

function FormIkPrac() {
    const formik = useFormik({
        initialValues: {
            fname: '',
        },
        validationSchema: Yup.object({
            fname: Yup.string()
                .required("Required")
                .min(4, 'At least 4 characters')
                .max(8, 'Less than 8 characters')
                
        }),
        onSubmit: (values) => {
            const data = new FormData();
            data.append('First Name', values.fname);

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
                            Enter Name
                        </label>
                        <input
                            type="text"
                            name="fname"
                            placeholder="Enter Name"
                            id="fname"
                            value={formik.values.fname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {formik.touched.fname && formik.errors.fname ? (
                            <div className="text-red-500 text-xs mt-2">{formik.errors.fname}</div>
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

export default FormIkPrac;
