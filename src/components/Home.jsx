import React from 'react'

function Home(props) {
  return (
    <div>
      <div class="container">
        <h2>User Listing</h2>
        <div class="row">
          <div class="col-md-12" style={{ background: '' }}>
            <table class="table">
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
        <div class="row" style={{ background: 'grey' }}>
          <b>TWO</b>
        </div>
      </div>
    </div>
  )
}

export default Home
