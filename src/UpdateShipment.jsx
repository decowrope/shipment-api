import React, { useState, useContext } from 'react';
import { VisibilityContext } from './Api';

const UpdateShipment = () => {
  const { setCurrentView, shipments, setShipments } = useContext(VisibilityContext);
  const [orderId, setOrderId] = useState('');
  const [shipment, setShipment] = useState(null);

  const handleOrderIdChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleSearch = () => {
    const foundShipment = shipments.find(s => s.orderId === orderId);
    if (foundShipment) {
      setShipment(foundShipment);
    } else {
      alert('Shipment not found');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setShipment(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${orderId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipment)
      });
      if (response.ok) {
        const updatedShipment = await response.json();
        console.log('Shipment updated successfully:', updatedShipment);
        setShipments(shipments.map(s => (s.orderId === orderId ? shipment : s)));
        setShipment(null);
        setOrderId('');
        setCurrentView(null); 
      } else {
        console.error('Failed to update shipment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="update-form-div">
      <h1>Update a shipment</h1>
      <div className="search-section">
        <label>
          Order ID:
          <input type="text" value={orderId} onChange={handleOrderIdChange} required />
        </label>
        <button onClick={handleSearch}>Search</button>
      </div>

      {shipment && shipment.orderId && (
        <form onSubmit={handleSubmit} method="patch" className="form-update">
          <label>
            Customer ID:
            <input id="customerId" type="text" value={shipment.customerId} onChange={handleChange} required /><br />
          </label>

          <label>
            Order ID:
            <input id="orderId" type="text" value={shipment.orderId} onChange={handleChange} required /><br />
          </label>

          <label>
            Status:
            <input id="status" type="text" value={shipment.status} onChange={handleChange} required /><br />
          </label>

          <label>
            Billing Address:
            <input id="billingAddress" type="text" value={shipment.billingAddress} onChange={handleChange} required /><br />
          </label>

          <label>
            Shipping Address:
            <input id="shippingAddress" type="text" value={shipment.shippingAddress} onChange={handleChange} required /><br />
          </label>

          <label>
            Delivery Date:
            <input id="deliveryDate" type="date" value={shipment.deliveryDate} onChange={handleChange} required />
          </label>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default UpdateShipment;
