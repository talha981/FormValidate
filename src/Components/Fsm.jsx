import React, { useReducer } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const initialState = {
  fname: '',
  lname: '',
  email: '',
  gender: '',
  agreeToTerms: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FIELD_VALUE':
      return {
        ...state,
        [action.field]: action.value,
      };
    default:
      return state;
  }
};

const validationSchema = Yup.object({
  fname: Yup.string().required('First Name is required'),
  lname: Yup.string().required('Last Name is required'),
  email: Yup.string().required('Email is required').email('Invalid email format'),
  gender: Yup.string().required('Gender is required'),
  agreeToTerms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
});

function Fsm() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (values) => {
    console.log('Form values:', values);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold text-center mb-6">Form Practice</h1>
        <Formik
          initialValues={state}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="fname" className="block text-gray-700">First Name</label>
                <Field
                  type="text"
                  name="fname"
                  id="fname"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter Name"
                  onChange={(e) => {
                    setFieldValue('fname', e.target.value);
                    dispatch({ type: 'SET_FIELD_VALUE', field: 'fname', value: e.target.value });
                  }}
                />
                <ErrorMessage name="fname" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="lname" className="block text-gray-700">Last Name</label>
                <Field
                  type="text"
                  name="lname"
                  id="lname"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter Last Name"
                  onChange={(e) => {
                    setFieldValue('lname', e.target.value);
                    dispatch({ type: 'SET_FIELD_VALUE', field: 'lname', value: e.target.value });
                  }}
                />
                <ErrorMessage name="lname" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 border rounded"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    setFieldValue('email', e.target.value);
                    dispatch({ type: 'SET_FIELD_VALUE', field: 'email', value: e.target.value });
                  }}
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="gender" className="block text-gray-700">Gender</label>
                <Field
                  as="select"
                  name="gender"
                  id="gender"
                  className="w-full px-3 py-2 border rounded"
                  onChange={(e) => {
                    setFieldValue('gender', e.target.value);
                    dispatch({ type: 'SET_FIELD_VALUE', field: 'gender', value: e.target.value });
                  }}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </Field>
                <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
              </div>

              <div className="flex items-center">
                <Field
                  type="checkbox"
                  name="agreeToTerms"
                  id="agreeToTerms"
                  className="h-4 w-4 text-blue-600"
                  onChange={(e) => {
                    setFieldValue('agreeToTerms', e.target.checked);
                    dispatch({ type: 'SET_FIELD_VALUE', field: 'agreeToTerms', value: e.target.checked });
                  }}
                />
                <label htmlFor="agreeToTerms" className="ml-2 text-gray-700">I agree to the terms and conditions</label>
                <ErrorMessage name="agreeToTerms" component="div" className="text-red-500 text-sm" />
              </div>

              <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Fsm;
