import {useContext, useState, useRef} from "react";
import { FileUpload } from 'primereact/fileupload';
import { saveAs } from 'file-saver';
import { Link, useNavigate } from "react-router-dom";
import "./Payment.css";
import { getDatabase, ref, set, push } from "firebase/database";
import {ref as storageRef, uploadBytes} from "firebase/storage" ; 
import { GlobalContext } from "../../context/GlobalState";
import {app, storage} from '../../firebaseConfig.js';

function Payment({toastBottomCenter}) {
    const { cart, orders, clearCart, deviceID } = useContext(GlobalContext);
    const [ ssUploaded, setSSUploaded ] = useState(false);
    const fileUploaderRef = useRef(null);
    const navigate = useNavigate();

    
    const downloadQR = () => {
        saveAs("/shop-app/SIDDHI RATNA BHADA PASAL_Qr.png", "siddhiratnabpQR.png")
            toastBottomCenter.current.show({
            severity: 'success',
            summary: 'QR Image Downloaded',
            detail: '',
            life: 3000
        });
    }
    const uploadScreenshot = (e) => {
        toastBottomCenter.current.show({
            severity: 'info',
            summary: 'File Uploading Started',
            detail: `Please wait while file gets uploaded.`,
            life: 2000
        });
        const imageRef = storageRef(storage, `screenshots/${deviceID}-${e.files[0].name}`);
        uploadBytes(imageRef, e.files[0]).then(() => {
            toastBottomCenter.current.show({
                severity: 'success',
                summary: 'Screenshot Successfully Uploaded',
                detail: `Screenshot ${e.files[0].name} successfully uploaded!`,
                life: 3000
            });
            setSSUploaded(true);
            fileUploaderRef.current.clear();
            fileUploaderRef.current.setUploadedFiles(e.files);
        }).catch((error) => {
            toastBottomCenter.current.show({
                severity: 'error',
                summary: "An error occurred!",
                detail: error,
                life: 3000
            });
            fileUploaderRef.current.clear();
        });
    }
    const handleConfirmation = () => {
        if (!ssUploaded) {
            toastBottomCenter.current.show({
                severity: 'error',
                summary: 'Upload payment screenshot',
                detail: `Please upload screenshot to proceed to confirmation!`,
                life: 3000
            });
            return;
        }
        if (orders.length === 0) {
            toastBottomCenter.current.show({
                severity: 'error',
                summary: 'Order not placed correctly',
                detail: `Please go to cart and place the order once again to continue!`,
                life: 3000
            });

            return;
        }
        const db = getDatabase(app);
        const newDocRef = push(ref(db, "orders"))
        set(newDocRef, {
        orderId: orders.length + 1,
        buyerId: deviceID,
        items: [...cart],
        subTotal: orders[0].subTotal,
        shippingCharge: orders[0].shippingCharge,
        district: orders[0].district,
        municipality: orders[0].municipality,
        area: orders[0].area,
        branch: orders[0].branch,
        address: orders[0].address,
        isConfirmed: true,
        }).then(() => {  
        toastBottomCenter.current.show({
            severity: 'success',
            summary: "Order Created Successfully!",
            detail: `Your Order with Order ID ${orders.length + 1} has been created successfully.`,
            life: 3000
        });
        }).catch((error) => {
        toastBottomCenter.current.show({
            severity: 'error',
            summary: "An error occurred!",
            detail: error,
            life: 3000
        });
        })

        clearCart();
        
        navigate('/orders');
    }

    return ( 
    <>
        <h3>
          Payment QR Code: <br />
          <button className="item-btn"onClick={downloadQR}>
          <i class="fa fa-download" aria-hidden="true"></i> Download QR 
          </button><br/>
          <img src="/shop-app/SIDDHI RATNA BHADA PASAL_Qr.png" /><br />
          Attach and Upload the Screenshot of the Payment Below to Proceed:
          <FileUpload ref={fileUploaderRef} name="demo[]" customUpload uploadHandler={uploadScreenshot} 
          accept="image/*" url="/" maxFileSize={1000000}
          emptyTemplate={<p className="m-0"
          >Drag and drop files to here to upload.</p>}
          />
          <br />
        </h3>
        <button className="item-btn" onClick={handleConfirmation}>
          Proceed to Confirmation
        </button>
        {/* <Link to="/shop-app/">Shop more!</Link> */}
    </>
    );
}

export default Payment;