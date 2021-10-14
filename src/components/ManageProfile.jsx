import axios from 'axios'
import React, { useState } from 'react'
import "../assets/CustomTabs.css";
import { useHistory } from 'react-router'
import { AuthsService } from '../Services/auth.service'
import { objToFormdata } from '../Services/formData.service'
import Forms from './Resuable/Forms'
import { formValidations } from './Resuable/FormsValidations';
import CustomPanel from './Resuable/Panel'
import CustomTabs from './Resuable/Tabs'
import ManageProfileForm from './Resuable/Profile/ManageProfileForm';


function ManageProfile() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 py-4 float-start">

          </div>

          {/* https://github.com/abhishek305/reactjs-tabs */}
          {/* https://www.youtube.com/watch?v=WkREeDy2WQ4 */}
          <div className="main-container">
            <CustomTabs>
              <CustomPanel title="Personal Info">
                <ManageProfileForm />
              </CustomPanel>
              <CustomPanel title="Professional Info">
                sdsdasdxx Professional Info
              </CustomPanel>
              <CustomPanel title="Treatment Info">
                dsdsssss Treatment Info
              </CustomPanel>
              <CustomPanel title="Business Info ">
                SDSDSDSD Business Info
              </CustomPanel>
              <CustomPanel title="Visible Profile ">
                SDSDSDSD Visible Profile
              </CustomPanel>
            </CustomTabs>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ManageProfile
