import { useState } from "react";
import "./buyNowModal.css";
import Loader from "../loader/Loader";
import { RxCross2 } from "react-icons/rx";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowHandler }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  const handleBuyNow = async () => {
    setLoading(true);
    await buyNowHandler();
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      <button type="button" onClick={handleOpen} className="buymodal-button">
        Buy now
      </button>
      {open && (
        <div className="buymodal-dialog-wrapper">
          <div className="buymodal-dialog">
            <div className="buymodal-dialog-header">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="buymodal-close-button"
              >
                <RxCross2 />
              </button>
            </div>
            <div className="buymodal-dialog-body">
              <div className="buymodal-input-group">
                <input
                  type="text"
                  name="name"
                  value={addressInfo.name}
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, name: e.target.value })
                  }
                  placeholder="Enter your name"
                  className="buymodal-input"
                />
              </div>
              <div className="buymodal-input-group">
                <input
                  type="text"
                  name="address"
                  value={addressInfo.address}
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, address: e.target.value })
                  }
                  placeholder="Enter your address"
                  className="buymodal-input"
                />
              </div>
              <div className="buymodal-input-group">
                <input
                  type="number"
                  name="pincode"
                  value={addressInfo.pincode}
                  onChange={(e) =>
                    setAddressInfo({ ...addressInfo, pincode: e.target.value })
                  }
                  placeholder="Enter your pincode"
                  className="buymodal-input"
                />
              </div>
              <div className="buymodal-input-group">
                <input
                  type="text"
                  name="mobileNumber"
                  value={addressInfo.mobileNumber}
                  onChange={(e) =>
                    setAddressInfo({
                      ...addressInfo,
                      mobileNumber: e.target.value,
                    })
                  }
                  placeholder="Enter your mobile number"
                  className="buymodal-input"
                />
              </div>
              <div className="buymodal-button-group">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="buymodal-button"
                  disabled={loading}
                >
                  {loading ? <Loader /> : "Buy now"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BuyNowModal;
