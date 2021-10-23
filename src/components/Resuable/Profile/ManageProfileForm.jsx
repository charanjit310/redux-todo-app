import React, { useState } from 'react'
import { countryStates } from '../CountryStates'

import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
const schema = yup.object().shape({
  // first_name: yup.string().required('First name  is required'),
  // last_name: yup.string().required('Last name is required'),
  // email: yup.string().email('Email must be valid').required('Email is required'),
  // phone: yup.string()
  //   .required("Phone is required")
  //   .matches(phoneRegExp, 'Phone number is not valid')
  //   .min(10, "Phone must be 10 digits")
  //   .max(10, "Phone must be 10 digits"),
  // mobile: yup.string()
  //   .required("Mobile is required")
  //   .matches(phoneRegExp, 'Mobile number is not valid')
  //   .min(10, "Mobile must be 10 digits")
  //   .max(10, "Mobile must be 10 digits"),
  // user_type: yup.string().required('PLease select'),
});

// useFieldArray sandbox cod examples
// https://codesandbox.io/s/react-hook-form-usefieldarray-yikiz?file=/src/index.js:1146-1168
// https://codesandbox.io/s/react-hook-form-usefieldarray-nested-arrays-m8w6j?file=/src/fieldArray.js:127-138
// https://codesandbox.io/s/vy8fv?file=/src/index.js:771-782
// https://www.youtube.com/watch?v=3GtAE9RZHVc
// https://www.youtube.com/watch?v=7fupPfocNy4
function ManageProfileForm() {
  const initialProvince = {};
  const [provinces, setProvince] = useState(initialProvince)
  let [iconCount, setIconCount] = useState(0) // plus minus icon count of office addresses

  const countryHandler = (event, countryIndex) => { // countryIndex is index where country dormdown exists in DOM 
    if (event.target.value == '') {
      setProvince(initialProvince)
    } else {
      const result = countryStates.filter(country => country.country == event.target.value);
      const allProvinces = result[0].states;
      setProvince({ ...provinces, [countryIndex]: allProvinces })
    }
  }

  const { register, control, handleSubmit, reset, watch, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "userOfficeAddress"
  });

  const submitForm = (data) => {
    console.log(data);
  }

  const initOfficeAddr = {
    address_line: "",
    country: "",
    province: "",
    city: "",
    postcode: "",
  };
  React.useEffect(() => {
    reset({
      userOfficeAddress: [initOfficeAddr]
    });
  }, []);

  const handleIconClick = (action, index) => {
    if (action === 'increment') {
      append(initOfficeAddr);
    } else {
      console.log('decreement decreement ccccc');
      delete provinces[index]

      let newProvinces = {};
      let i = 0;
      for (const key in provinces) {
        newProvinces[i] = provinces[key]
        i++;
      }
      setProvince(newProvinces)

      remove(index)
      setIconCount((prevIconCount) => prevIconCount - 1);
    }
  }

  return (
    <>
      <div className="container forms-container">
        <div className="row">
          <div className="col-md-12 form-1 ">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="basicInfo">
                <div className="row">
                  <div className="col">
                    <label htmlFor="">First name</label> <span className="red">*</span>
                    <input type="text" {...register('first_name')} className="form-control" id="" aria-describedby="emailHelp" placeholder="Enter First name" />
                    <span className="red">{errors.first_name && errors.first_name.message}</span>
                  </div>
                  <div className="col">
                    <label htmlFor="">Middle name</label>
                    <input type="text" {...register('middle_name')} className="form-control" id="" placeholder="Enter Middle name" />
                  </div>
                  <div className="col">
                    <label htmlFor="">Last name</label>
                    <input type="text" {...register('last_name')} className="form-control" id="" placeholder="Enter Last name" />
                    <span className="red">{errors.last_name && errors.last_name.message}</span>
                  </div>
                  <div className="col">
                    <label htmlFor="">Email</label>
                    <input type="email" {...register('email')} className="form-control" id="" placeholder="Enter Email" />
                    <span className="red">{errors.email && errors.email.message}</span>
                  </div>

                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <label htmlFor="">Phone</label>
                    <input type="text" {...register('phone')} className="form-control" id="" aria-describedby="emailHelp" placeholder="Enter Phone" />
                    <span className="red">{errors.phone && errors.phone.message}</span>
                  </div>
                  <div className="col">
                    <label htmlFor="">Mobile</label>
                    <input type="text" {...register('mobile')} className="form-control" id="" placeholder="Enter Mobile" />
                    <span className="red">{errors.mobile && errors.mobile.message}</span>
                  </div>
                  <div className="col">
                    <label htmlFor="">Weak leaves</label>
                    <input type="Date" {...register('weak_leaves')} className="form-control" id="" placeholder="Enter Weak leaves" />
                  </div>
                </div>
              </div>

              <div className="OfficeAddress my-4">
                <div>
                  <div className="col-md-6 float-start">
                    <h3>
                      <span>Office Address </span>
                      <svg xmlns="" width="16" height="16" fill="grey" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                    </h3>
                  </div>
                  <div className="col-md-6 float-end text-end ">
                    <h3>
                      <svg onClick={() => {
                        append(initOfficeAddr);
                        // setIconCount(iconCount + 1);
                        setIconCount((prevIconCount) => prevIconCount + 1);
                      }} xmlns="" width="26" height="26" fill="grey" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                      </svg>
                    </h3>
                  </div>
                </div>
                <div className="address_div">
                  {
                    fields.map((item, index) => {
                      let statesDropdown = [];
                      if (provinces.hasOwnProperty(index)) {
                        statesDropdown = Object.values(provinces[index]);
                      }

                      let iconComp = (
                        <svg onClick={() => handleIconClick('decreement', index)} xmlns="" width="26" height="26" fill="grey" className="bi bi-dash-circle-fill" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z" />
                        </svg>
                      )

                      return (
                        <div className="" key={item.id}>
                          <div className="col-md-6 float-end text-end ">
                            <h3>{iconCount ? iconComp : ''}</h3>
                          </div>

                          <div className="row">
                            <div className="col">
                              <label htmlFor="">Address Line</label> <span className="red">*</span>
                              <input type="text" {...register(`userOfficeAddress[${index}].address_line`)} className="form-control" id="" aria-describedby="emailHelp" placeholder="Enter First name" />
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col">
                              <label htmlFor="">country</label>
                              <select name="country" id="" {...register(`userOfficeAddress[${index}].country`)} className="form-control" onChange={(event) => countryHandler(event, index)}>
                                <option value=""> --Select--</option>
                                {
                                  countryStates.map((country, indx) => {
                                    return (
                                      <option key={indx} value={country.country} > {country.country}</option>
                                    )
                                  })
                                }
                              </select>
                            </div>
                            <div className="col">
                              <label htmlFor="">Province</label>
                              <select name="State" id="" {...register(`userOfficeAddress[${index}].province`)} className="form-control">
                                <option value=""> --Select-- </option>
                                {
                                  statesDropdown.map((state, indx) => {
                                    return (
                                      <option key={indx} value={state} > {state}</option>
                                    )
                                  })
                                }
                              </select>
                            </div>
                            <div className="col">
                              <label htmlFor="">City</label>
                              <input type="text" {...register(`userOfficeAddress[${index}].city`)} className="form-control" id="" placeholder="Enter City" />
                            </div>
                            <div className="col">
                              <label htmlFor="">PostCode</label>
                              <input type="text" {...register(`userOfficeAddress[${index}].postcode`)} className="form-control" id="" placeholder="Enter PostCode" />
                            </div>
                          </div>

                          <br />
                          <div className="row">
                            <div className="col">
                              <div className="form-check">
                                <label className="form-check-label" htmlFor="exampleCheck1">Correspondence Address same as office address</label>
                                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                              </div>
                            </div>
                          </div>
                          <br /><br />
                        </div>
                      )
                    })
                  }
                </div>
                <br />
              </div>

              <button className="btn btn-primary btnSubmit float-end" style={{ width: '152px' }} >
                Save Deatails
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageProfileForm
