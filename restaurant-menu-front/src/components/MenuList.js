import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { baseURL, headers } from '../services/menu.service';
import { useNavigate } from 'react-router-dom';

export const MenuList = () => {
  const [menus, setMenus] = useState([]);
  const [deleted, setDeleted] = useState(false);
  const navigate = useNavigate();

  const retrieveAllMenus = useCallback(() => {
    axios.get(`${baseURL}/menu/`, { headers })
      .then((response) => setMenus(response.data))
      .catch((err) => console.error(err));
  }, [])

  const deleteMenu = (id) => {
    axios.delete(`${baseURL}/menu/${id}`, { headers })
      .then(() => { setDeleted(true); retrieveAllMenus() })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    retrieveAllMenus()
  }, [retrieveAllMenus])

  return (
    <div className="row justify-content-center">
      <div className="col">
        { deleted && (
          <div className="alert alert-danger alert-dismissible fade show" role="alert">
            Menu deleted!
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        )}

        {
          menus &&
          menus.map((menu) => (
            <div className="card my-3 w-25 mx-auto" key={menu.id}>
              <div className="card-body">
                <h2 className="card-title font-weight-bold">{menu.name}</h2>
                <h4 className="card-subtitle mb-2">{menu.price}</h4>
                <p className="card-text">{menu.description}</p>
              </div>
              <div className="card-footer">
                <div className="btn-group justify-content-around w-75" data-toggle="buttons">
                  <span>
                    <button
                      className="btn btn-info"
                      onClick={() => navigate(`/menu/${menu.id}/update/`)}
                    >Update</button>
                  </span>

                  <span>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteMenu(menu.id)}
                    >Delete</button>
                  </span>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}