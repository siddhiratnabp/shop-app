import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import "./Checkout.css";
import * as XLSX from 'xlsx';
import Select from 'react-select'
import 'primereact/resources/themes/nano/theme.css'
import { Steps } from 'primereact/steps';



const assignShippingCharges = (
  shippingCharges,
  setDistrictOptions,
  setMunOptions,
  setAreaOptions,
  setBranchOptions,
  setDistrictBranchGroupOptions,
  selected
) => {
  if (shippingCharges.length === 0) {return;}
  var filtered = shippingCharges.filter((place) => place.District === selected.district)
  .filter((place) => selected.municipality ? place.Muncipality === selected.municipality: true)
  .filter((place) => selected.branch ? place.Name === selected.branch: true)
  .filter((place) => {
    const areasCovered = place["Areas Covered"] ? place["Areas Covered"] : ""
    let areasCoveredArray = areasCovered.split(',').map((area) => {
      return area.trim()
    })
    areasCoveredArray = areasCoveredArray.filter((area) => area !== '')
    return selected.area ? areasCoveredArray.includes(selected.area) : true
  })
  filtered = filtered.length > 0 ? filtered : shippingCharges
  const districtOptions = []
  const muniOptions = []
  const branOptions = []
  const areaOptions = []
  const districtBranchOptions = []
  shippingCharges.map((place) => {
    districtOptions.push({
      "label": place.District,
      "value": place.District 
    })
  })
  filtered.map((place) => {
    muniOptions.push({
      "label": place.Muncipality,
      "value": place.Muncipality 
    })
    branOptions.push({
      "label": place.Name,
      "value": place.District 
    })
    
    const areasCovered = place["Areas Covered"] ? place["Areas Covered"] : ""
    areasCovered.split(',').map((area) => {
      areaOptions.push({
        "label": area,
        "value": area
      })
    })
  })
  Array.from(new Set(districtOptions.map(JSON.stringify))).map(JSON.parse).map((district) => {
    const branchesInDistrict = shippingCharges.map((shippingCharge) => {
      if(shippingCharge.District === district.label) return shippingCharge.Name
    }).filter((e) => e !== undefined)
    
    districtBranchOptions.push({
      label: district.label,
      options: branOptions.filter((branOption) => {
        return branchesInDistrict.includes(branOption.label)
      })
    })
  })
  setDistrictOptions(Array.from(new Set(districtOptions.map(JSON.stringify))).map(JSON.parse))
  setMunOptions(Array.from(new Set(muniOptions.map(JSON.stringify))).map(JSON.parse))
  setBranchOptions(Array.from(new Set(branOptions.map(JSON.stringify))).map(JSON.parse))
  setAreaOptions(Array.from(new Set(areaOptions.map(JSON.stringify))).map(JSON.parse))
  setDistrictBranchGroupOptions(districtBranchOptions)
}



const Checkout = ({buyingStep, setBuyingStep, toastBottomCenter}) => {
  const { cart, orders, addItemToOrderList, addFullAddress, fullAddress} = useContext(GlobalContext);
  const navigate = useNavigate();
  
  const [shippingCharges, setShippingCharges] = useState([]);
  const [shippingBranchSelected, setShippingBranchSelected] = useState(false);
  const [setFrom, setSetFrom] = useState(false);

  const [districtOptions, setDistrictOptions] = useState([]);
  const [munOptions, setMunOptions] = useState([]);
  const [areaOptions, setAreaOptions] = useState([]);
  const [branchOptions, setBranchOptions] = useState([]);
  const [districtBranchGroupOptions, setDistrictBranchGroupOptions] = useState([]);
  
  const [selected, setSelected] = useState({
    "district": "",
    "municipality": "",
    "area": "",
    "branch": ""
  })
  
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

  // Select Group for Location Component
  const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };
  const groupBadgeStyles = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
  };
  
  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  
  // Fetching Shipping Charges from NCM File
  useEffect(() => {
    fetch("./Locations - Nepal Can Move Aug 24 2024.xlsx")
    .then(resp => resp.arrayBuffer())
    // User XLSX's read method to ingest the buffer and return the workbook
    .then((buff) => {
      let workbookData = XLSX.read(buff, {type: "buffer"});
      const json = XLSX.utils.sheet_to_json(workbookData.Sheets['Sheet1'])
      setShippingCharges(json);
    })
    // Be good and handle errors better than this
    // Or at least handle them in the downstream logic
    .catch(err => console.error(err))

    setBuyingStep(1)
  }, []);

  // Totals Calculation
  const subTotal = Math.floor(cart?.reduce((sum, curr) => sum + curr.price, 0));
  const weightTotal = cart.reduce((sum, item)=> sum + item.count * item.weight, 0)
  
  // Shipping Charges Calculation
  const homeDeliveryChargeSelected = shippingCharges.filter(
    (place) => place.Name === (selected.branch ? selected.branch : "" )
  )[0]
  const homeDeliveryCharge = selected.branch ? homeDeliveryChargeSelected["Home Delivery"] : 0
  const shippingCharge =  homeDeliveryCharge + (Math.round(weightTotal) >= 2 ? (homeDeliveryCharge * (Math.ceil(weightTotal)-2)) : 0)

  useEffect(() => assignShippingCharges(
    shippingCharges,
    setDistrictOptions,
    setMunOptions,
    setAreaOptions,
    setBranchOptions,
    setDistrictBranchGroupOptions,
    selected
  ), [shippingCharges, selected.district, selected.municipality, selected.area, selected.branch]);
  
  const handleCheckout = async () => {
    if (shippingCharge === 0) {
      toastBottomCenter.current.show({
        severity: 'error',
        summary: '📌 Select location first!',
        detail: 'Please select your nearest location.',
        life: 3000
      });
      return;
    }
    if (fullAddress === "") {
      toastBottomCenter.current.show({
        severity: 'error',
        summary: '📌No Full Address there!',
        detail: 'Please provide us your full address in order to ensure correct delivery.',
        life: 3000
      });
      return;
    }
    addItemToOrderList({
      orderId: orders.length + 1,
      buyerId: 1,
      items: [...cart],
      subTotal: subTotal,
      shippingCharge: shippingCharge,
      district: selected.district,
      municipality: selected.municipality,
      area: selected.area,
      branch: selected.branch,
      address: fullAddress,
      isConfirmed: false,
    });
    setBuyingStep(2);
    navigate('/payment');
  };

  return (
    <div className="checkout-container">
      <>
      <Steps model={buyingSteps} activeIndex={buyingStep} />
          <div>
            <div className="custom-row">
              <h4>Order Review</h4>
              <span>{cart?.length} items in cart</span><br /><br />
              <button className="item-btn">
              <Link to="/cart">Go back to Cart <i class='fas fa-shopping-cart'></i></Link>
              </button>
            </div>
            <div className="custom-row">
              <h4>Select Location * - Required</h4>
              <span>
                Search here (Select nearest location)*: <Select options={districtBranchGroupOptions}
                formatGroupLabel={formatGroupLabel} isDisabled={shippingBranchSelected && setFrom === "Bottom"} onChange={(branch) => {
                  setSelected({
                    "district": "",
                    "municipality": "",
                    "area": "",
                    "branch": branch.label
                  })
                  setShippingBranchSelected(true)
                  setSetFrom("Top")
                }} /> <br />
               <strong>Or,</strong><br /><br />
                Pick:
                District:* <Select options={districtOptions} isDisabled={shippingBranchSelected && setFrom==="Top"} onChange={(district) => {
                  setSelected({
                    "district": district.value,
                    "municipality": "",
                    "area": "",
                    "branch": ""
                  })
                }} />
                Municipality: <Select options={munOptions} isDisabled={shippingBranchSelected && setFrom==="Top"} onChange={(municipality) => {
                  setSelected({
                    "district": selected.district,
                    "municipality": municipality.value,
                    "area": "",
                    "branch": ""
                  })
                }} /> 
                Select Branch nearest to you:* <Select options={branchOptions} isDisabled={shippingBranchSelected && setFrom==="Top"} onChange={(branch) => {
                  setSelected({
                    "district": selected.district,
                    "municipality": selected.municipality,
                    "branch": branch.label,
                    "area": ""
                  })
                  setShippingBranchSelected(true);
                  setSetFrom("Bottom");
                }} />       
                Area: <Select options={areaOptions} isDisabled={shippingBranchSelected && setFrom==="Top"} onChange={(area) => {
                  setSelected({
                    "district": selected.district,
                    "municipality": selected.municipality,
                    "branch": selected.branch,
                    "area": area.value,
                  })
                }} />
                Full Address:* <input type="text" placeholder="Please input your full address"
                onChange={(e) => addFullAddress(e.target.value)} value={fullAddress} /> 
              </span>
            </div>
            <div className="custom-row">
              <h4>Checkout Summary</h4>
              <div className="checkout-summary">
                <span>Subtotal</span>
                <span>Rs. {subTotal}</span>
              </div>
              <div className="checkout-summary">
                <span>Shipping Charge {selected.branch ? `Upto ${selected.branch}` : ""}</span>
                <span>{selected.branch ? 
                 `Rs. ${shippingCharge}`
                : "TBD (Please select your location)"}</span>
              </div>
              <div className="checkout-summary">
                <span>Weight</span>
                <span>{weightTotal.toFixed(2)} kgs</span>
              </div>
            </div>
            <div className="custom-row">
              <h4>Total</h4>
              <span>Rs. {subTotal + shippingCharge}</span>
            </div>
          </div>
          <button className="item-btn" onClick={handleCheckout}>
            Checkout
          </button>
        </>
    </div>
  );
};

export default Checkout;
