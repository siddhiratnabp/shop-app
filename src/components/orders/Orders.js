import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { get, getDatabase, ref } from "firebase/database";
import { app } from "../../firebaseConfig";
import { Accordion, AccordionTab } from 'primereact/accordion';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Steps } from 'primereact/steps';


function Orders() {
  // const { orders } = useContext(GlobalContext);
  const [ordersArray, setOrdersArray] = useState([])
  const columns = ['brand', 'color', 'count', 'id', 'image', 'name', 'occassion', 'price', 'rating', 'saleDiscount', 'size', 'weight']
  const orderStates = [
    {
      label: "Pending Payment Verification",
    },
    {
      label: "Payment Verified: Processing Order"
    },
    {
      label: "Tracking ID Created: Shipping"
    },
    {
      label: "Delivered"
    }
  ]

  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db);
    const orders = []
    get(dbRef, 'orders').then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val()['orders'] !== undefined) {
          Object.entries(snapshot.val()['orders']).forEach(order => {
            orders.push({
              id: order[0],
              ...order[1]
            })
          })
          orders.reverse();
          setOrdersArray(orders)
        }
      }
    });
  }, [])
  return (
    <Accordion activeIndex={0}>
      {/* {orders.map((order) => (
        <div className="checkout-container" key={order.orderId}>
          <h3>#ID-62Z-{order.orderId}</h3>
          {order.items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-price">${item.price}</div>
              <div className="item-name">{item.name}</div>
              <div className="item-expectedDelivery">
                (Expected cash on delivery 3 - 6 days)
              </div>
            </div>
          ))}
        </div>
      ))} */}
      {ordersArray.map((order) => (
          <AccordionTab header={order.id}>
              <p className="m-0">Full Address: {order.address}</p>
              <p className="m-0">Area: {order.area}</p>
              <p className="m-0">Branch: {order.branch}</p>
              <p className="m-0">District: {order.district}</p>
              <p className="m-0">IsConfirmed: {order.isConfirmed}</p>
              <p className="m-0">Municipality: {order.municipality}</p>
              <p className="m-0">Shipping Charge: {order.shippingCharge}</p>
              <p className="m-0">Shipping SubTotal: {order.subTotal}</p>
              <Steps model={orderStates} activeIndex={order.step} />
              <DataTable value={order.items} tableStyle={{ minWidth: '50rem' }}>
                {columns.map((column) => (
                  <Column key={column} field={column} header={column} />
                ))}
                <Column header="Image" body={(order) => <img src={order.image} width={200} />} />
            </DataTable>
          </AccordionTab>
      ))}
    </Accordion>
  );
}

export default Orders;
