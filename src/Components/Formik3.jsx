import React, { useReducer } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Initial state for the reducer
const initialState = {
  fname: '',
  lname: '',
  email: '',
  age: '',
  phone: '',
  gender: '',
  checkboxes: [],
};

// Reducer function to handle state updates
const formReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FNAME':
      return { ...state, fname: action.payload };
    case 'SET_LNAME':
      return { ...state, lname: action.payload };
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_AGE':
      return { ...state, age: action.payload };
    case 'SET_PHONE':
      return { ...state, phone: action.payload };
    case 'SET_GENDER':
      return { ...state, gender: action.payload };
    case 'SET_CHECKBOXES':
      return { ...state, checkboxes: action.payload };
    default:
      return state;
  }
};

function Formik3() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      fname: Yup.string()
        .required('Required')
        .min(4, 'At least 4 characters')
        .max(6, 'Should be less than 6 characters'),
      lname: Yup.string()
        .required('Required')
        .min(2, 'At least 2 characters')
        .max(6, 'Should be less than 6 characters'),
      email: Yup.string()
        .required('Required')
        .email('Invalid email address format'),
      age: Yup.number()
        .required('Required')
        .min(18, 'Must be at least 18 years old')
        .max(60, 'Must be less than 60 years old'),
      phone: Yup.string()
        .required('Required')
        .min(11, 'Must be at least 11 characters')
        .max(20, 'Must be less than 20 characters'),
      gender: Yup.string()
        .required('Required'),
      checkboxes: Yup.array().min(1, 'At least one checkbox must be selected'),
    }),
    onSubmit: (values) => {
      const data = new FormData();
      data.append('First Name', values.fname);
      data.append('Last Name', values.lname);
      data.append('Email', values.email);
      data.append('Age', values.age);
      data.append('Phone', values.phone);
      data.append('Gender', values.gender);
      values.checkboxes.forEach((checkbox, index) => {
        data.append(`Checkbox ${index + 1}`, checkbox);
      });

      for (let [key, value] of data.entries()) {
        console.log(`${key} : ${value}`);
      }
    },
  });

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const { checkboxes } = state;
    if (checkboxes.includes(value)) {
      dispatch({ type: 'SET_CHECKBOXES', payload: checkboxes.filter((checkbox) => checkbox !== value) });
    } else {
      dispatch({ type: 'SET_CHECKBOXES', payload: [...checkboxes, value] });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="fname" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input
            type="text"
            placeholder='First Name'
            name='fname'
            id='fname'
            value={formik.values.fname}
            onChange={(e) => {
              formik.handleChange(e);
              dispatch({ type: 'SET_FNAME', payload: e.target.value });
            }}
            onBlur={formik.handleBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.fname && formik.errors.fname ? 'border-red-500' : ''}`}
          />
          {formik.touched.fname && formik.errors.fname ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.fname}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="lname" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input
            type="text"
            placeholder='Last Name'
            name='lname'
            id='lname'
            value={formik.values.lname}
            onChange={(e) => {
              formik.handleChange(e);
              dispatch({ type: 'SET_LNAME', payload: e.target.value });
            }}
            onBlur={formik.handleBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.lname && formik.errors.lname ? 'border-red-500' : ''}`}
          />
          {formik.touched.lname && formik.errors.lname ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.lname}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
          <input
            type="text"
            placeholder='Enter Email'
            name='email'
            id='email'
            value={formik.values.email}
            onChange={(e) => {
              formik.handleChange(e);
              dispatch({ type: 'SET_EMAIL', payload: e.target.value });
            }}
            onBlur={formik.handleBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''}`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-gray-700 text-sm font-bold mb-2">Age</label>
          <input
            type="text"
            placeholder='Enter Age'
            name='age'
            id='age'
            value={formik.values.age}
            onChange={(e) => {
              formik.handleChange(e);
              dispatch({ type: 'SET_AGE', payload: e.target.value });
            }}
            onBlur={formik.handleBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.age && formik.errors.age ? 'border-red-500' : ''}`}
          />
          {formik.touched.age && formik.errors.age ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.age}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
          <input
            type="text"
            placeholder='Enter Phone'
            name='phone'
            id='phone'
            value={formik.values.phone}
            onChange={(e) => {
              formik.handleChange(e);
              dispatch({ type: 'SET_PHONE', payload: e.target.value });
            }}
            onBlur={formik.handleBlur}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : ''}`}
          />
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.phone}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">Gender</span>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formik.values.gender === 'male'}
              onChange={(e) => {
                formik.handleChange(e);
                dispatch({ type: 'SET_GENDER', payload: e.target.value });
              }}
              onBlur={formik.handleBlur}
              className="form-radio text-indigo-600"
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formik.values.gender === 'female'}
              onChange={(e) => {
                formik.handleChange(e);
                dispatch({ type: 'SET_GENDER', payload: e.target.value });
              }}
              onBlur={formik.handleBlur}
              className="form-radio text-pink-600"
            />
            <span className="ml-2">Female</span>
          </label>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.gender}</div>
          ) : null}
        </div>
        <div className="mb-4">
          <span className="block text-gray-700 text-sm font-bold mb-2">Select Options</span>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              value="Option 1"
              checked={state.checkboxes.includes("Option 1")}
              onChange={handleCheckboxChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Option 1</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="checkbox"
              value="Option 2"
              checked={state.checkboxes.includes("Option 2")}
              onChange={handleCheckboxChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Option 2</span>
          </label>
          <label className="inline-flex items-center ml-6">
            <input
              type="checkbox"
              value="Option 3"
              checked={state.checkboxes.includes("Option 3")}
              onChange={handleCheckboxChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Option 3</span>
          </label>
          {formik.touched.checkboxes && formik.errors.checkboxes ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.checkboxes}</div>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <button type='submit' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Formik3;
