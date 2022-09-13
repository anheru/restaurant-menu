import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseURL, headers } from '../services/menu.service';

export const AddMenu = () => {
  const initialMenuState = {
    id: null,
    name: '',
    description: '',
    price: 0
  }

  const [menu, setMenu] = useState(initialMenuState);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleMenuChange = (e) => {
    const { name, value } = e.target;
    setMenu({ ...menu, [name]: value })
  }

  const submitMenu = () => {
    const data = {
      name: menu.name,
      description: menu.description,
      price: menu.price
    }

    axios.post(`${baseURL}/menu/`, data, { headers })
      .then(response => {
        setMenu(response.data)
        setSubmitted(true)
      })
      .catch(err => console.error(err))
  }

  return (
    <div className="submit-form">
      { submitted ? (
        <>
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            Menu Added!
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
        </>
      ) : (
        <>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              required
              value={menu.name}
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
              value={menu.description}
              onChange={handleMenuChange}
              name="description"
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              className="form-control"
              id="price"
              required
              value={menu.price}
              onChange={handleMenuChange}
              name="price"
            />
          </div>

          <button
            type="submit"
            onClick={submitMenu}
            className="btn btn-success mt-2"
          >Submit</button>
        </>
      ) }
    </div>
  )
}