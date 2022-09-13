import axios from 'axios'
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { baseURL, headers } from '../services/menu.service';

export const UpdateMenu = () => {
  const initialMenuState = {
    id: null,
    name: '',
    description: '',
    price: 0
  }

  const { id } = useParams()

  const [currentMenu, setCurrentMenu] = useState(initialMenuState)
  const [submitted, setSubmitted] = useState(false)
  const navigate = useNavigate();

  useEffect(() => {
    async function retrieveMenu () {
      axios.get(`${baseURL}/menu/${id}/`, { headers })
        .then(response => setCurrentMenu(response.data))
        .catch(e => console.error(e))
    }

    retrieveMenu()
  }, [id])

  const handleMenuChange = (e) => {
    const { name, value } = e.target
    setCurrentMenu({...currentMenu, [name]: value})
  }

  const updateMenu = () => {
    const data = {
      name: currentMenu.name,
      description: currentMenu.description,
      price: currentMenu.price
    }

    axios.put(`${baseURL}/menu/${id}/`, data, { headers })
      .then(response => {
        setCurrentMenu(response.data);
        setSubmitted(true)
      })
  }

  return (
    <div className="submit-form">
      { submitted ? <>
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          Menu Updated!
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <button className="btn btn-success" onClick={() => navigate('/')}>
          Go home
        </button>
      </> : <>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={currentMenu.name}
            onChange={handleMenuChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={currentMenu.description}
            onChange={handleMenuChange}
            name="description"
            default
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            className="form-control"
            id="price"
            required
            value={currentMenu.price}
            onChange={handleMenuChange}
            name="price"
          />
        </div>

        <button onClick={updateMenu} className="btn btn-success mt-2">
          Submit
        </button>
      </>}
    </div>
  )
}