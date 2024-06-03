import React, { useState, useContext } from 'react';
import { VisibilityContext } from './Api';

const Shipments = () => {
  const { shipments } = useContext(VisibilityContext);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [filteredShipments, setFilteredShipments] = useState([]);

  const handleFilterChange = (event) => {
    setFilterCriteria(event.target.value);
    setFilterValue('');
    setFilteredShipments([]);
  };

  const handleValueChange = (event) => {
    setFilterValue(event.target.value);
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    const filtered = shipments.filter((shipment) => {
      switch (filterCriteria) {
        case 'customerId':
          return shipment.customerId === filterValue;
        case 'status':
          return shipment.status === filterValue;
        case 'orderId':
          return shipment.orderId === filterValue;
        default:
          return false;
      }
    });
    setFilteredShipments(filtered);
  };

  return (
    <div className="shipments-div">
      <h1>All Shipments</h1>
      <form onSubmit={handleFilterSubmit} className="filter-form">
        <label htmlFor="filterCriteria">Filter by:</label>
        <select id="filterCriteria" value={filterCriteria} onChange={handleFilterChange}>
          <option value="">Select Criteria</option>
          <option value="customerId">Customer ID</option>
          <option value="status">Shipment Status</option>
          <option value="orderId">Order ID</option>
        </select>
        <input
          type="text"
          value={filterValue}
          onChange={handleValueChange}
          placeholder="Enter value..."
          required
        />
        <button type="submit">Apply Filter</button>
      </form>
      <ul className="shipments-list">
        {(filteredShipments.length > 0 ? filteredShipments : shipments).map((shipment, index) => (
          <li key={index}>
            <p><strong>Customer ID:</strong> {shipment.customerId}</p>
            <p><strong>Order ID:</strong> {shipment.orderId}</p>
            <p><strong>Status:</strong> {shipment.status}</p>
            <p><strong>Billing Address:</strong> {shipment.billingAddress}</p>
            <p><strong>Shipping Address:</strong> {shipment.shippingAddress}</p>
            <p><strong>Delivery Date:</strong> {shipment.deliveryDate}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shipments;
