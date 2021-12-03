import axios from 'axios'
import React, { useState } from 'react'
import { countryStates } from '../CountryStates'

import { useForm, useFieldArray, Controller, useWatch } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { objToFormdata } from '../../../Services/formData.service';
import { AuthsService } from '../../../Services/auth.service';

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
  const { register, getValues, setValue, control, handleSubmit, reset, watch, formState: { errors, isDirty, dirtyFields, isSubmitting, touchedFields, submitCount } } = useForm({
    resolver: yupResolver(schema),
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    control,
    name: "office_address"
  });

  const initialProvince = {};
  const [provinces, setProvince] = useState(initialProvince)

  const initialCorrespndenceProvince = [];
  const [correspndenceProvinces, setCorrespndenceProvinces] = useState(initialCorrespndenceProvince)

  // disable Fields of correspondence address if 'corespondnceAddrChkbox' is checked
  const [readOnlyFields, setReadOnlyFields] = useState(false)

  // it holds index of CorespondnceAddr div  whose checkbox is checked
  const initialCorespondnceAddrChkbox = {};
  const [corespondnceAddrChkbox, setCorespondnceAddrChkbox] = useState(initialCorespondnceAddrChkbox)

  // count of 'plus minus icon' of office addresses
  const [iconCount, setIconCount] = useState(0)

  const [corespondnceAddrData, setCorespondnceAddrData] = useState({})

  const initOfficeAddr = {
    address_line: "",
    country: "",
    province: "",
    city: "",
    postcode: "",
    correspondence_addr: false,
  };

  React.useEffect(() => {
    reset({
      office_address: [initOfficeAddr]
    });
  }, []);

  const handleIconClick = (action, index) => {
    if (action === 'increment') {
      return append(initOfficeAddr);
    }

    // delete state array
    delete provinces[index]

    let newProvinces = {};
    let i = 0;
    for (const key in provinces) {
      newProvinces[i] = provinces[key]
      i++;
    }
    setProvince(newProvinces)

    // remove index form 'fields' array
    remove(index)

    // when click on 'minus icon', remove index form 'corespondnceAddrChkbox' array if it exists
    if (Object.keys(corespondnceAddrChkbox).length !== 0) { // if obj is not empty
      const chkBoxIndex = Object.values(corespondnceAddrChkbox);
      if (index < chkBoxIndex) {
        setCorespondnceAddrChkbox({ [index]: chkBoxIndex - 1 })
      }
      if (index == chkBoxIndex) {
        setCorespondnceAddrChkbox(initialCorespondnceAddrChkbox)
        setReadOnlyFields(false)
        updateCorespondnceAddr(index, initOfficeAddr)
      }
    }

    setIconCount((prevIconCount) => prevIconCount - 1);
  }

  // setCorespondnceAddrData when 'CoresAddre same as offce addr' checkbox is checked
  const onchangeFeldsHandler = (event, index, action) => {
    // check if the index of currnettly being filled office addresss is exists in corespondnceAddrChkbox object
    const isExists = Object.values(corespondnceAddrChkbox).includes(index)

    if (readOnlyFields && isExists) {
      setCorespondnceAddrData({})

      if (action === "provinceHandler") {
        setValue(`correspondence_address.province`, event.target.value)
      } else if (action === "countryHandler") {
        setValue(`correspondence_address.country`, event.target.value)

        // setCorrespndenceProvinces when 'CoresAddre same as offce addr' checkbox is checked
        const result = countryStates.filter(country => country.country == event.target.value);
        const allProvinces = result[0]?.states;
        if (typeof allProvinces !== "undefined") {
          setCorrespndenceProvinces(allProvinces)
        }

        // change dropdown to fisrt index '--select--'
        setValue(`correspondence_address.province`, "")

      } else if (action === "inputHandler") {
        const inputName = event.target.name.split(".");
        if (inputName[1] === 'address_line') {
          setValue(`correspondence_address.address_line`, event.target.value)
        } else if (inputName[1] === 'city') {
          setValue(`correspondence_address.city`, event.target.value)
        } if (inputName[1] === 'postcode') {
          setValue(`correspondence_address.postcode`, event.target.value)
        }
      }
    }
  }

  const countryHandler = (event, countryIndex) => { // countryIndex is index where country dormdown exists in DOM 
    if (event.target.value == '') {
      return setProvince(initialProvince)
    }

    const result = countryStates.filter(country => country.country == event.target.value);
    const allProvinces = result[0].states;
    setProvince({ ...provinces, [countryIndex]: allProvinces })

    // change dropdown to fisrt index '--select--'
    setValue(`office_address.${countryIndex}.province`, "")

    onchangeFeldsHandler(event, countryIndex, 'countryHandler')
  }

  const coreespondenceCountryHandler = (event) => {
    if (event.target.value == '') {
      return setCorrespndenceProvinces(initialCorespondnceAddrChkbox)
    }

    const result = countryStates.filter(country => country.country == event.target.value);
    const allProvinces = result[0].states;
    setCorrespndenceProvinces(allProvinces)
  }

  const handleCorrespondenceAddrChkbox = (event, index) => {
    const checked = event.target.checked;
    if (!checked) {
      setReadOnlyFields(false)
      updateCorespondnceAddr(index, initOfficeAddr)
      return setCorespondnceAddrChkbox(initialCorespondnceAddrChkbox);
    }

    // it holds index when CorespondnceAddr div  whose checkbox is checked 
    setCorespondnceAddrChkbox({ [index]: index })
    setReadOnlyFields(true)

    const offcAddr = getValues("office_address");
    const officeAddress = offcAddr[index]
    updateCorespondnceAddr(index, officeAddress)
  }

  // updateCorespondnceAddr when 'CoresAddre same as offce addr' checkbox is checked
  const updateCorespondnceAddr = (index, officeAddress) => {
    setValue(`correspondence_address.country`, officeAddress.country)
    setValue(`correspondence_address.address_line`, officeAddress.address_line)
    setValue(`correspondence_address.city`, officeAddress.city)
    setValue(`correspondence_address.postcode`, officeAddress.postcode)

    // set correspondence_address.province
    const result = countryStates.filter(country => country.country == officeAddress.country);
    const allProvinces = result[0]?.states;
    if (typeof allProvinces !== "undefined") {
      setCorrespndenceProvinces(allProvinces)
    }
    setValue(`correspondence_address.province`, officeAddress.province)
  }

  const submitForm = (data) => {
    const formData = objToFormdata.fnObjToFormdata(data);
    // for (let [key, value] of formData) { // log FormData 
    //   console.log(`${key}: ${value}`)
    // }

    axios.post(`${AuthsService.baseURL}save-personal-info`, formData, AuthsService.formDataConfig)
      .then((response) => {
        console.log(response);
        if (response.data.statusCode == 200) {
          alert('Profile updated !!!!!!');
        }
      }).catch((error) => {
        console.log(error);
      });

    return;
  }

  // By selectig checkbox of corrspondece checkboxm, append selected office addresse to correspondence adderess 
  // Read about all concepts of Doccument, DOM, querrySelector etc. 
  // https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
  // https://www.javascripttutorial.net/javascript-dom/
  ////////////// work on dynamic fields validations ////////////////////////////////////

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

              <div className="OfficeAddress my-3">
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

                      // correspondence_addr checkboxes handling...
                      let isChecked = false
                      setValue(`office_address[${index}].correspondence_addr`, isChecked)
                      if (corespondnceAddrChkbox.hasOwnProperty(index)) {
                        isChecked = true
                        setValue(`office_address[${index}].correspondence_addr`, isChecked)
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
                              <input type="text" {...register(`office_address[${index}].address_line`)}
                                className="form-control" id=""
                                aria-describedby="emailHelp"
                                placeholder="Enter First name"
                                onChange={(event) => {
                                  onchangeFeldsHandler(event, index, 'inputHandler')
                                }}
                              />
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div className="col">
                              <label htmlFor="">country</label>
                              <select name="country" id="" {...register(`office_address[${index}].country`)}
                                className="form-control"
                                onChange={(event) =>
                                  countryHandler(event, index)
                                }
                              >
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
                              <select name="State" id="" {...register(`office_address[${index}].province`)}
                                className="form-control"
                                onChange={(event) =>
                                  onchangeFeldsHandler(event, index, 'provinceHandler')
                                }
                              >
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
                              <input type="text" {...register(`office_address[${index}].city`)}
                                className="form-control"
                                id="" placeholder="Enter City"
                                onChange={(event) => {
                                  onchangeFeldsHandler(event, index, 'inputHandler')
                                }}
                              />
                            </div>
                            <div className="col">
                              <label htmlFor="">PostCode</label>
                              <input type="text" {...register(`office_address[${index}].postcode`)}
                                className="form-control"
                                id="" placeholder="Enter PostCode"
                                onChange={(event) => {
                                  onchangeFeldsHandler(event, index, 'inputHandler')
                                }}
                              />
                            </div>
                          </div>

                          <br />
                          <div className="row">
                            <div className="col">
                              <div className="form-check">
                                <label className="form-check-label" htmlFor="">Correspondence Address same as office address</label>
                                <input type="checkbox" checked={isChecked} className="form-check-input" {...register(`office_address[${index}].correspondence_addr`)} onChange={(event) => handleCorrespondenceAddrChkbox(event, index)} />
                              </div>
                            </div>
                          </div>
                          <br /><br />
                        </div>
                      )
                    })
                  }
                </div>
              </div>

              <div className="corrsAddr my-4">
                <div>
                  <div className="col-md-6 float-start">
                    <h3>
                      <span>Correpondence Address </span>
                      <svg xmlns="" width="16" height="16" fill="grey" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                      </svg>
                    </h3>
                  </div>
                  <div className="col-md-6 float-end text-end ">
                    <h3>
                      <br />
                    </h3>
                  </div>
                </div>
                <div className="address_div">
                  <div className="">
                    <div className="col-md-6 float-end text-end ">
                    </div>

                    <div className="row">
                      <div className="col">
                        <label htmlFor="">Address Line</label> <span className="red">*</span>
                        <input type="text" {...register(`correspondence_address.address_line`)} className="form-control" id="" aria-describedby="emailHelp" placeholder="Enter First name" readOnly={readOnlyFields} />
                      </div>
                    </div>
                    <br />
                    <div className="row">
                      <div className="col">
                        <label htmlFor="">country</label>
                        <select name="country" id="" {...register(`correspondence_address.country`)} className="form-control" onChange={(event) => coreespondenceCountryHandler(event)} disabled={readOnlyFields}>
                          <option value=""> --Select--</option>
                          {
                            countryStates.map((country, indx) => {
                              return (
                                <option key={indx} value={country.country} > {country.country}</option>
                              )
                            })
                          }
                        </select>
                        <input type="hidden" {...register(`correspondence_address.country`)} className="form-control" id="" value="" />

                      </div>
                      <div className="col">
                        <label htmlFor="">Province</label>
                        <select name="State" id="" {...register(`correspondence_address.province`)} className="form-control" disabled={readOnlyFields}>
                          <option value=""> --Select-- </option>
                          {
                            correspndenceProvinces.map((state, indx) => {
                              return (
                                <option key={indx} value={state} > {state}</option>
                              )
                            })
                          }
                        </select>
                        <input type="hidden" {...register(`correspondence_address.province`)} className="form-control" value="" />

                      </div>
                      <div className="col">
                        <label htmlFor="">City</label>
                        <input type="text" {...register(`correspondence_address.city`)} className="form-control" id="" placeholder="Enter City" readOnly={readOnlyFields} />
                      </div>
                      <div className="col">
                        <label htmlFor="">PostCode</label>
                        <input type="text" {...register(`correspondence_address.postcode`)} className="form-control" id="" placeholder="Enter PostCode" readOnly={readOnlyFields} />
                      </div>
                    </div>
                    <br /><br />
                  </div>
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
