import React, { useState, useContext } from 'react';
import { VisibilityContext } from './Api';

const CreateShipment = () => {
  const { setCurrentView, shipments, setShipments } = useContext(VisibilityContext);
  const [shipment, setShipment] = useState({
    customerId: '',
    orderId: '',
    status: '',
    billingAddress: '',
    shippingAddress: '',
    deliveryDate: ''
  });

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
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(shipment)
      });
      if (response.ok) {
        const data = await response.json();
        console.log('Shipment created successfully:', data);
        setShipments([...shipments, shipment]);
        setShipment({
          customerId: '',
          orderId: '',
          status: '',
          billingAddress: '',
          shippingAddress: '',
          deliveryDate: ''
        });
        setCurrentView(null);
      } else {
        console.error('Failed to create shipment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-div">
      <h1>Create a shipment</h1>
      <form onSubmit={handleSubmit} method="post" className='form-create'>
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
    </div>
  );
}

export default CreateShipment;
