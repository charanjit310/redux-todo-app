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


function ManageProfile() {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 py-4 float-start">
            Manage Profile
          </div>

          {/* https://github.com/abhishek305/reactjs-tabs */}
          {/* https://www.youtube.com/watch?v=WkREeDy2WQ4 */}
          <div className="main-container">
            <CustomTabs>
              <CustomPanel title="All Names">
                sadasdasdasdasd
              </CustomPanel>
              <CustomPanel title="In Review Candidates">
                sdsdasdxxxxxxxxxxxxxxxxxxxxx
              </CustomPanel>
              <CustomPanel title="Registered Names">
                dsdsssssssssssssssssssssssssssssssssssssssssssssss
              </CustomPanel>
              <CustomPanel title="Registered Namesccc">
                SDSDSDSD
              </CustomPanel>
            </CustomTabs>
          </div>

        </div>
      </div>
    </div >
  )
}

export default ManageProfile
