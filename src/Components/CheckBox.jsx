import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

function CheckBox() {
  const formik = useFormik({
    initialValues: {
      fname: '',
      selectedOptions: [],
    },
    validationSchema: Yup.object({
      fname: Yup.string().required('Required'),
      selectedOptions: Yup.array().min(1, 'At least one option must be selected'),
    }),
    onSubmit: (values) => {
      const data = new FormData();
      data.append('First Name', values.fname);
      values.selectedOptions.forEach((option, index) => {
        data.append(`Option ${index + 1}`, option);
      });

      for (let [key, value] of data.entries()) {
        console.log(`${key} : ${value}`);
      }
    },
  });

  const handleCheckboxChange = (e) => {
    const { value } = e.target;
    const { selectedOptions } = formik.values;
    if (selectedOptions.includes(value)) {
      const nextCheckboxes = selectedOptions.filter((checkbox) => checkbox !== value);
      formik.setFieldValue('selectedOptions', nextCheckboxes);
    } else {
      formik.setFieldValue('selectedOptions', [...selectedOptions, value]);
    }
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter Name"
            id="fname"
            value={formik.values.fname}
            onChange={formik.handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              formik.touched.fname && formik.errors.fname ? 'border-red-500' : ''
            }`}
          />
          {formik.touched.fname && formik.errors.fname ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.fname}</div>
          ) : null}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="selectedOptions"
              value="Html"
              checked={formik.values.selectedOptions.includes('Html')}
              onChange={handleCheckboxChange}
            />
            <span>Html</span>
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="selectedOptions"
              value="Css"
              checked={formik.values.selectedOptions.includes('Css')}
              onChange={handleCheckboxChange}
            />
            <span>Css</span>
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              name="selectedOptions"
              value="JavaScript"
              checked={formik.values.selectedOptions.includes('JavaScript')}
              onChange={handleCheckboxChange}
            />
            <span>JavaScript</span>
          </label>
          {formik.touched.selectedOptions && formik.errors.selectedOptions ? (
            <div className="text-red-500 text-xs mt-2">{formik.errors.selectedOptions}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default CheckBox;
