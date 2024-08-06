import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

// Validation Schema using Yup
const validationSchema = Yup.object({
  fname: Yup.string().required('First name is required'),
  lname: Yup.string().required('Last name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  age: Yup.number().required('Age is required').positive('Age must be positive').integer('Age must be an integer'),
  phone: Yup.string().required('Phone number is required'),
  gender: Yup.string().required('Gender is required'),
});

// Initial Values
const initialValues = {
  fname: '',
  lname: '',
  email: '',
  age: '',
  phone: '',
  gender: '',
};

function UseReducer-Form() {
  const handleSubmit = (values) => {
    const data = new FormData();
    Object.keys(values).forEach(key => {
      data.append(key, values[key]);
    });

    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
            <div className="mb-4">
              <label htmlFor="fname" className="block text-lg font-medium mb-2">First Name:</label>
              <Field
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter Your First Name"
                className={`w-full p-2 border rounded ${errors.fname && touched.fname ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="fname" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="lname" className="block text-lg font-medium mb-2">Last Name:</label>
              <Field
                type="text"
                name="lname"
                id="lname"
                placeholder="Enter Your Last Name"
                className={`w-full p-2 border rounded ${errors.lname && touched.lname ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="lname" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-lg font-medium mb-2">Enter Email:</label>
              <Field
                type="text"
                name="email"
                id="email"
                placeholder="Enter Your Email"
                className={`w-full p-2 border rounded ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="email" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="age" className="block text-lg font-medium mb-2">Enter Age:</label>
              <Field
                type="text"
                name="age"
                id="age"
                placeholder="Enter Your Age"
                className={`w-full p-2 border rounded ${errors.age && touched.age ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="age" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-lg font-medium mb-2">Enter Phone:</label>
              <Field
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter Your Phone"
                className={`w-full p-2 border rounded ${errors.phone && touched.phone ? 'border-red-500' : 'border-gray-300'}`}
              />
              <ErrorMessage name="phone" component="div" className="text-red-500 mt-1" />
            </div>
            <div className="mb-4">
              <label className="block text-lg font-medium mb-2">Gender:</label>
              <div className="flex items-center mb-2">
                <label className="flex items-center mr-4">
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2"
                  />
                  <span>Male</span>
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2"
                  />
                  <span>Female</span>
                </label>
              </div>
              <ErrorMessage name="gender" component="div" className="text-red-500 mt-1" />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default UseReducer-Form;
