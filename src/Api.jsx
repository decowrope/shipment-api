import React, { createContext, useState } from 'react';
import logo from "./slike/logo_HT.png";
import CreateShipment from './CreateShipment';
import Shipments from './Shipments';
import UpdateShipment from './UpdateShipment';

export const VisibilityContext = createContext();

const Api = () => {
  const [currentView, setCurrentView] = useState(null);
  const [shipments, setShipments] = useState([]);

  const handleCreateShipmentClick = () => {
    setCurrentView('create');
  };

  const handleShowShipmentsClick = () => {
    setCurrentView('all');
  };

  const handleUpdateShipmentClick = () => {
    setCurrentView('update');
  };

  return (
    <VisibilityContext.Provider value={{ currentView, setCurrentView, shipments, setShipments }}>
      <div className="container">
        <div className="logo-div">
          <img src={logo} alt="© Croatian Telecom" className="logo-img" />
        </div>

        <div className="pick-option">
          <h1 className="title">Shipment Tracking Management</h1>

          <ul className="options-list">
            <li onClick={handleShowShipmentsClick}>All shipments</li>
            <li onClick={handleCreateShipmentClick}>Create a shipment</li>
            <li onClick={handleUpdateShipmentClick}>Update shipment</li>
          </ul>
        </div>

        {currentView === 'create' && <CreateShipment />}
        {currentView === 'all' && <Shipments />}
        {currentView === 'update' && <UpdateShipment />}
      </div>
    </VisibilityContext.Provider>
  );
}

export default Api;
