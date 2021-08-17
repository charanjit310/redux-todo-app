import React from 'react'

function ErrorMessage(props) {
  return (
    <div className="">
      <div className="flash-error-msg">
        <span>{props.errorMsg}</span>
      </div><br />
    </div>
  )
}

export default ErrorMessage
