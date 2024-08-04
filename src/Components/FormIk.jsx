import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function FormIk() {
    const formik = useFormik({
        initialValues: {
            fname: '',
        },
        validationSchema: Yup.object({
            fname: Yup.string()
                .required('Required')
                .min(2, 'Must be at least 2 characters'),
        }),
        onSubmit: (values) => {
            const data = new FormData();
            data.append('First Name', values.fname);

            for (let [key, value] of data.entries()) {
                console.log(`${key} : ${value}`);
            }
        },
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="fname">Enter Your Name</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    name="fname"
                    id="fname"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.fname && formik.errors.fname ? (
                    <div>{formik.errors.fname}</div>
                ) : null}
                <br />
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default FormIk;
