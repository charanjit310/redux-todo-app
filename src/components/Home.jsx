import React from 'react'

function Home(props) {
  return (
    <div>
      <div className="container">
        <h2>User Listing</h2>
        <div className="row">
          <div className="col-md-12" style={{ background: '' }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John</td>
                  <td>Doe</td>
                  <td>john@example.com</td>
                </tr>
                <tr>
                  <td>Mary</td>
                  <td>Moe</td>
                  <td>mary@example.com</td>
                </tr>
                <tr>
                  <td>July</td>
                  <td>Dooley</td>
                  <td>july@example.com</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row" style={{ background: 'grey' }}>
          <b>TWO</b>
        </div>
      </div>
    </div>
  )
}

export default Home
