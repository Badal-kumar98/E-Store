import React from "react";
import "./track.css";

const Track = () => {
  return (
    <div>
      <div className="track-main-container">
        <div className="track-container">
          <div className="track-step">
            <div className="track-step-icon">🛍️</div>
            <h3 className="track-step-title">Premium T-Shirts</h3>
            <p className="track-step-description">
              Our T-Shirts are 100% made of cotton.
            </p>
          </div>
          <div className="track-step">
            <div className="track-step-icon">✔️</div>
            <h3 className="track-step-title">Verified Quality</h3>
            <p className="track-step-description">
              Best in className with superior comfort.
            </p>
          </div>
          <div className="track-step">
            <div className="track-step-icon">🚚</div>
            <h3 className="track-step-title">Fast Delivery</h3>
            <p className="track-step-description">
              Delivered within 3-5 business days.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;
