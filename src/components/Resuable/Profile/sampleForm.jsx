import React from 'react'

function ManageProfileForm() {
  return (
    <>
      <div className="container forms-container">
        <div className="row">
          <div className="col-md-12 form-1 ">
            <form>
              <br /><br />
              <div className="basicInfo">
                <div className="row">
                  <div className="col">
                    <label htmlFor="">First name</label> <span className="red">*</span>
                    <input type="text" className="form-control" id="" aria-describedby="emailHelp" placeholder="Enter First name" />
                  </div>
                  <div className="col">
                    <label htmlFor="">Middle name</label>
                    <input type="text" className="form-control" id="" placeholder="Enter Middle name" />
                  </div>
                  <div className="col">
                    <label htmlFor="">Last name</label>
                    <input type="text" className="form-control" id="" placeholder="Enter Last name" />
                  </div>
                  <div className="col">
                    <label htmlFor="">Email</label>
                    <input type="email" className="form-control" id="" placeholder="Enter Email" />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <label htmlFor="">Phone</label>
                    <input type="text" className="form-control" id="" aria-describedby="emailHelp" placeholder="Enter Phone" />
                    {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                  </div>
                  <div className="col">
                    <label htmlFor="">Mobile</label>
                    <input type="text" className="form-control" id="" placeholder="Enter Mobile" />
                  </div>
                  <div className="col">
                    <label htmlFor="">Weak leaves</label>
                    <input type="Date" className="form-control" id="" placeholder="Enter Weak leaves" />
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
                      <svg xmlns="" width="26" height="26" fill="grey" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                      </svg>
                    </h3>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <label htmlFor="">Address Line</label> <span className="red">*</span>
                    <input type="text" className="form-control" id="" aria-describedby="emailHelp" placeholder="Enter First name" />
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col">
                    <label htmlFor="">country</label>
                    <select name="country" id="" className="form-control">
                      <option value="country one"> country one</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="">State</label>
                    <select name="State" id="" className="form-control">
                      <option value="State one">State one</option>
                    </select>
                  </div>
                  <div className="col">
                    <label htmlFor="">City</label>
                    <input type="text" className="form-control" id="" placeholder="Enter City" />
                  </div>
                  <div className="col">
                    <label htmlFor="">PostCode</label>
                    <input type="text" className="form-control" id="" placeholder="Enter PostCode" />
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ManageProfileForm
