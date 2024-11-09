import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    email: '',
    password: ''
  });
  const URL = "http://localhost:5000/register"
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [regUsers, setRegUsers] = useState([]);
  const [showUser, setShowUsers] = useState(false)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const resetFormData = () => {
    setFormData({
      name: '',
      age: '',
      gender: '',
      email: '',
      password: ''
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);
    console.log(formData);

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })
      if (response.status == 200) {
        setSuccessMessage("User Registered Successfully");
        resetFormData();
      }
      else if (response.status == 400) {
        setError('User Already Registered');
      }

    } catch (err) {
      console.log(err);
    }
  };

  const handleViewUsers = async (e) => {
    e.preventDefault()
    setShowUsers(true)
    try {

      const response = await fetch("http://localhost:5000/getUsers", {
        method: "GET"
      })
      const data = await response.json()
      setRegUsers(data)

    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="registration-container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>

          </select>
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={handleViewUsers} style={{padding:"10px", margin:"20px"}}>View Users</button>
      <button onClick={()=>setShowUsers(false)} style={{padding:"10px", margin:"20px"}}>Hide Users</button>
      <div>
      
        {
          showUser?
          <table border="1" >
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Age</th>
              </tr>
            </thead>

            <tbody>
              {regUsers.map((item) => (
                <tr key={item._id}>  {/* Use unique key, like _id */}
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.age}</td>
                </tr>
              ))}
            </tbody>
          </table>
          :
          <></>
        }
      </div>

    </div>
  );
}

export default App;
