import React, { useState } from 'react';
import { ACTIONS } from '../App';

function UserForm(props) {
    const { userDataState, dispatch } = props;
    const initialFormState = { id: "", fname: "", lname: "" };
    const [user, setUser] = useState(initialFormState);
    const submithandler = (e) => {
        e.preventDefault();
        var userInfo = addNewuser();
        if (userInfo.fname == "" || userInfo.lname == "") { return; } // validation failed
        dispatch({ type: ACTIONS.TODO_ADD, payload: userInfo });
        e.target.reset(); // Empty Form after submit
        setUser(initialFormState);
    };
    const inputhandler = (event) => {
        if (event.target.name == `fname`) {
            setUser({ ...user, fname: event.target.value });
        } else if (event.target.name == `lname`) {
            setUser({ ...user, lname: event.target.value });
        }
    };
    const addNewuser = () => {
        return { id: userDataState.length + 1, fname: user.fname, lname: user.lname }
    }
    return (
        <div>
            <form action="#" onSubmit={submithandler}>
                <div className="form-group">
                    <label style={{ float: 'left' }}><b>First Name : </b></label>
                    <input type="text" onChange={inputhandler} className="form-control" id="fname" name="fname" placeholder="First name" />
                </div>
                <br />
                <div className="form-group">
                    <label style={{ float: 'left' }}><b>Last Name : </b></label>
                    <input type="text" onChange={inputhandler} className="form-control" id="lname" name="lname" placeholder="Last name" />
                </div>
                <br />
                <button type="submit" className="btn btn-primary" style={{ float: 'left' }}>Add User</button>
            </form>
        </div>
    )
}

export default UserForm;
