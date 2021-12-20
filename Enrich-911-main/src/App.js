import React, { useRef, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Map from "./components/Map/Map"
import 'bootstrap/dist/css/bootstrap.min.css';

// Incident Files Example (It would be cool if this was iterating from API call)
var incident_one = require('./data/F01705150050.json');
var incident_two = require('./data/F01705150090.json');

function App() {
  return (
    <div className="App">
      <Map />

      <div className="incidents-container p-3 shadow-lg">
      <table class="table m-0">
        <thead>
          <tr>
            <th scope="col">Incident #</th>
            <th scope="col">Address</th>
            <th scope="col">Unit Type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{incident_one.description.incident_number}</th>
            <td>{incident_one.address.address_line1}</td>
            <td>{incident_one.apparatus[0].unit_type}</td>
          </tr>
          <tr>
            <th scope="row">{incident_two.description.incident_number}</th>
            <td>{incident_two.address.address_line1}</td>
            <td>{incident_two.apparatus[0].unit_type}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}


export default App;
