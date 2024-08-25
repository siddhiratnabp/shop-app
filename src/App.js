import "./App.css";
import {useContext, useState, useRef} from 'react'
import HomePage from "./components/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemDetail from "./components/itemDetail/ItemDetail";
import Navbar from "./components/navbar/Navbar";
import Cart from "./components/cart/Cart";
import Orders from "./components/orders/Orders";
import Shop from "./components/shop/Shop";
import Checkout from "./components/checkout/Checkout";
import Payment from "./components/payment/Payment";
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { GlobalContext } from "./context/GlobalState";
import { Toast } from 'primereact/toast';


function App() {
  let {deviceID,addDeviceID} = useContext(GlobalContext)
  
  // Get Unique Device ID
  if (!deviceID) {
    const fpPromise = import('https://openfpcdn.io/fingerprintjs/v4')
    .then(FingerprintJS => FingerprintJS.load())
    // Get the visitor identifier when you need it.
    fpPromise
    .then(fp => fp.get())
    .then(result => {
      // This is the visitor identifier:
      addDeviceID(result.visitorId)
    })
  }
  
  let [buyingStep, setBuyingStep] = useState(0)
  const buyingSteps = [
      {
          label: 'Cart'
      },
      {
          label: 'Checkout'
      },
      {
          label: 'Payment'
      }
  ];

  const toastBottomCenter = useRef(null);

  return (
    <div className="App">
      <BrowserRouter basename="/shop-app">
        <div>
          <Navbar />
        </div>
        <Routes>
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/cart" element={<Cart buyingStep={buyingStep} buyingSteps={buyingSteps} setBuyingStep={setBuyingStep} toastBottomCenter={toastBottomCenter} />} />
          <Route path="/checkout" element={<Checkout buyingStep={buyingStep} setBuyingStep={setBuyingStep} buyingSteps={buyingSteps} toastBottomCenter={toastBottomCenter} />} />
          <Route path="/payment" element={<Payment buyingStep={buyingStep} setBuyingStep={setBuyingStep} buyingSteps={buyingSteps} toastBottomCenter={toastBottomCenter} />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
          <Route exact path="" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
      <TawkMessengerReact
        propertyId="66caea3150c10f7a00a02ce5"
        widgetId="1i64a5kof"/>
      <Toast ref={toastBottomCenter} position="bottom-center"/>
    </div>
  );
}

export default App;
