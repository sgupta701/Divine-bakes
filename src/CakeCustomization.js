import React, { useState } from 'react';
import './CakeCustomization.css';

function CakeCustomization() {
  const [image, setImage] = useState(null);
  const [comment, setComment] = useState('');
  const [addons, setAddons] = useState({
    chocolates: false,
    extraSugar: false,
    specialToppers: false,
    specialCandles: false,
    customPicture: false,
  });
  const [price, setPrice] = useState(0);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Display image preview
    }
  };

  const handleAddonChange = (addon) => {
    setAddons((prevAddons) => ({
      ...prevAddons,
      [addon]: !prevAddons[addon],
    }));
  };

  const handleSubmit = () => {
    let newPrice = 500; // Base price of the cake
    if (addons.chocolates) newPrice += 50;
    if (addons.extraSugar) newPrice += 30;
    if (addons.specialToppers) newPrice += 100;
    if (addons.specialCandles) newPrice += 40;
    if (addons.customPicture) newPrice += 150;

    setPrice(newPrice);
  };

  return (
    <div className="customization-container">
      <h1>Customize Your Cake</h1>

      {/* Left Column (Canvas/Upload) */}
      <div className="upload-section">
        <h2>Upload Your Cake Image</h2>
        <input type="file" onChange={handleImageUpload} />
        {image && <img src={image} alt="Cake Preview" className="uploaded-image" />}
        <textarea
          placeholder="Add special comments about your cake"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* Right Column (Add-Ons) */}
      <div className="addons-section">
        <h2>Add-Ons</h2>
        <ul>
          <li>
            <label>
              <input
                type="checkbox"
                checked={addons.chocolates}
                onChange={() => handleAddonChange('chocolates')}
              />
              Extra Chocolates
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={addons.extraSugar}
                onChange={() => handleAddonChange('extraSugar')}
              />
              Extra Sugar
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={addons.specialToppers}
                onChange={() => handleAddonChange('specialToppers')}
              />
              Special Toppers
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={addons.specialCandles}
                onChange={() => handleAddonChange('specialCandles')}
              />
              Special Candles
            </label>
          </li>
          <li>
            <label>
              <input
                type="checkbox"
                checked={addons.customPicture}
                onChange={() => handleAddonChange('customPicture')}
              />
              Upload Custom Picture for Cake
            </label>
          </li>
        </ul>
        <button onClick={handleSubmit}>Submit</button>
      </div>

      {/* Display Estimated Price */}
      <div className="price">
        <h3>Estimated Price: ₹{price}</h3>
      </div>
    </div>
  );
}

export default CakeCustomization;
