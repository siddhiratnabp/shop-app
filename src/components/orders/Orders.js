import React, { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";
import { get, getDatabase, ref } from "firebase/database";
import { app } from "../../firebaseConfig";
import { Fieldset } from 'primereact/fieldset';
import { Timeline } from 'primereact/timeline';
import { Panel } from 'primereact/panel';import { Divider } from 'primereact/divider';
import { Button } from 'primereact/button';
import './Orders.css';
import "primeflex/primeflex.css"
import 'primereact/resources/themes/nano/theme.css'
import { Link } from "react-router-dom";
import { Rating } from "primereact/rating";
import { Badge } from 'primereact/badge';
import { Message } from 'primereact/message';


function Orders() {
  const { deviceID } = useContext(GlobalContext);
  const [ordersArray, setOrdersArray] = useState([])
  
  useEffect(() => {
    const db = getDatabase(app);
    const dbRef = ref(db, `orders/${deviceID}`);
    const orders = []
    get(dbRef).then((snapshot) => {
      if (snapshot.exists()) {
        if (snapshot.val() !== undefined) {
          Object.entries(snapshot.val()).forEach(order => {
            orders.push({
              buyerId: order[0],
              ...order[1]
            })
          })
          orders.reverse();
          setOrdersArray(orders)
        }
      }
    });
  }, [])
    return ordersArray.map((order, index) => {
        const eventsLegendTemplate = (
          <div className="flex align-items-center gap-2 px-2">
              <i class="fa-solid fa-timeline"></i>
              <span className="font-bold">Order Timeline</span>
          </div>
        )
        const detailsLegendTemplate = (
          <div className="flex align-items-center gap-2 px-2">
              <i class="fa-solid fa-circle-info"></i>
              <span className="font-bold">Order Details</span>
          </div>
        )
        const addressLegendTemplate = (
          <div className="flex align-items-center gap-2 px-2">
              <i class="fa-solid fa-address-book"></i>
              <span className="font-bold">Address</span>
          </div>
        )
        const shippingLegendTemplate = (
          <div className="flex align-items-center gap-2 px-2">
              <i class="fa-solid fa-truck"></i>
              <span className="font-bold">Shipping Details</span>
          </div>
        )
        let collapse = true
        if (index === 0) {collapse = false} 

        let tempEvents = []
        tempEvents.push({
          status: "Pending Payment Verification"
        })
        if (order.orderStep > 0) {
          if (order.orderState === "failed") {
            tempEvents.push({
              status: "Payment Verification Failed: Please upload the correct payment screenshot and order again."
            })
          } else {
            tempEvents.push({
              status: "Payment Verified"
            })
          }
        }
        if (order.orderStep > 1 && order.orderState !== "failed") {
          tempEvents.push({
            status: "Shipping: Tracking ID Assigned"
          })
        }
        if (order.orderStep > 2 && order.orderState !== "failed") {
          tempEvents.push({
            status: "Delivered"
          })
        }
        return (
          <div className="orders-wrapper">
            <h2>
              <i class="fa-solid fa-cart-shopping"></i> Order ID: {order.orderId}
            </h2>
            <Fieldset legend={order.orderId} toggleable={true} collapsed={collapse}>
              <div className="order-top-details">
              <Panel headerTemplate={eventsLegendTemplate}>
                <Divider />
                <Timeline value={tempEvents} content={(item) => item.status} />
                {
                  order.orderState === "failed" ? (
                    <>
                    <br /><Message severity="error" text="Payment Verification Failed? Did you pay the full delivery charge to continue or uploaded the correct screenshot?" />
                    </>
                  ) : ""
                }
              </Panel>
              <Panel headerTemplate={detailsLegendTemplate}>
                <Divider />
                  <p className="m-0"><strong>Buyer ID:</strong> {order.buyerId}</p>
                  <p className="m-0"><strong>Customer Name:</strong> {order.name}</p>
                  <p className="m-0"><strong>Phone Number:</strong> {order.phone}</p>
                  <Divider />
                  <p className="m-0"><strong>Order Status:</strong> <Badge value={order.orderState} severity="success"></Badge></p>
                  <p className="m-0"><strong>Order Date & Time:</strong> {order.orderDate}</p>
              </Panel>
              <Panel headerTemplate={addressLegendTemplate}>
                <Divider />
                  <p className="m-0"><strong>Full Address:</strong> {order.address}</p>
                  <p className="m-0"><strong>Branch:</strong> {order.branch}</p>
                  <Divider />
                  <p className="m-0"><strong>District:</strong> {order.district}</p>
                  <p className="m-0"><strong>Municipality:</strong> {order.municipality}</p>
                  <p className="m-0"><strong>Area:</strong> {order.area}</p>
              </Panel>
              <Panel headerTemplate={shippingLegendTemplate}>
                <Divider />
                  <p className="m-0"><strong>Shipping Charge:</strong> {order.shippingCharge}</p>
                  <p className="m-0"><strong>NCM Shipping Branch:</strong> {order.branch}</p>
                  <Divider />
                  <p className="m-0"><strong>Our Delivery Agent:</strong> <img src="https://hris.nepalcangroup.com/media/documents/NC_1X4_RED4x-8.png"
                  width={150} /></p>
                  <p className="m-0"><strong>Tracking ID: </strong> {order.trackingID ? order.trackingID : <Badge value="(Tracking ID received after Payment Verification)" severity="info"></Badge>} <Link to="https://www.nepalcanmove.com/track/">Click here to Track</Link> </p>
                  <p className="m-0"><strong>Estimated Delivery Time: </strong> 1-2 days in valley; 3-5 days outside valley </p>
              </Panel>
              </div><br />
              <Link to={"https://g.page/r/CTxrys3f-yA9EBM/review"}>
                <Rating value={5} readOnly cancel={false} /><br />
                <Button label="Rate Us" severity="success" />
              </Link><br /><br />
              <div className="orders-table">
                {
                  order.items.map((item, index) => {
                    return (
                      <div className="orders-table-item">
                        <div class="SN">{index+1}</div>
                        <div class="image"><img src={item.mainImage} /></div>
                        <div class="name">{item.name}</div>
                        <div class="count">{item.count}x</div>
                        <div class="price">Rs. {item.price}</div>
                        <div class="subTotal"><strong>Rs. {item.count * item.price}</strong></div>
                      </div>
                    )
                  })
                }
                <div className="orders-table-item">
                  <div class="SN"></div>
                  <div class="image"></div>
                  <div class="name"></div>
                  <div class="count"></div>
                  <div class="price"><strong>Total:</strong></div>
                  <div class="subTotal"><strong>Rs. {order.subTotal} </strong></div>
                </div>
                <div className="orders-table-item">
                  <div class="SN"></div>
                  <div class="image"></div>
                  <div class="name"></div>
                  <div class="count"></div>
                  <div class="price">Shipping Charge (+)</div>
                  <div class="subTotal">Rs. {order.shippingCharge}</div>
                </div>
                <div className="orders-table-item">
                  <div class="SN"></div>
                  <div class="image"></div>
                  <div class="name"></div>
                  <div class="count"></div>
                  <div class="price"><strong>Grand Total:</strong></div>
                  <div class="subTotal"><strong>Rs. {order.subTotal + order.shippingCharge} </strong></div>
                </div>
              </div>
            </Fieldset>
          </div>
        )
    });
}

export default Orders;
