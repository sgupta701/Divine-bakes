
import './App.css';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ShopNow from './ShopNow'; 

import logo from './logo.png'; 

import slider1 from './slider1.jpg';
import slider2 from './slider2.jpg';
import slider3 from './slider3.jpg';

import cupcakes from './cupcakes.png';
import brownies from './brownies.png';
import cakes from './cakes.png';
import samplerPacks from './sampler-packs.png';
import bananaPudding from './banana-pudding.png';

import anniversary from './anniversary.png'; 
import birthday from './birthday.png';
import wedding from './wedding.png';
import graduation from './graduation.png';

import homemadeIcon from './homemade.png';
import freshnessIcon from './freshness.png';
import foodiesIcon from './forthefoodies.png';
import qualityIcon from './quality.png';

import mirrorglazecake from './mirror_glaze_cake.jpg';
import rasmalaicake from './rasmalai_cake.jpg';
import strawberrycake from './strawberry_cake.jpg';
import pineapplecake from './pineapple_cake.jpg';
import blueberrycake from './blueberry_cake.jpg';
import chocolatecake from './chocolate_cake.jpg';

import lighteningmcqueen from './lightening_mcqueen_cake.jpg';
import butterflycake from './butterfly_cake.jpg';
import matkicake from './matki_cake.jpg';
import drumcake from './drum_cake.jpg';
import minioncake from './minion_cake.jpg';
import antigravitycake from './anti_gravity_cake.jpg';

import React, { useState, useRef, useEffect } from 'react';

function handleImageUpload(event) {
  const file = event.target.files[0];
  const canvas = document.getElementById("cake-canvas");
  const context = canvas.getContext("2d");

  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      context.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
      context.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw uploaded image on canvas
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function calculatePrice() {
  const addons = document.querySelectorAll(".addon-item input[type='checkbox']");
  let price = 399; // Base price of the cake
  
  addons.forEach((addon) => {
    if (addon.checked) {
      if (addon.id === "addon1") price += 10; // Candies
      if (addon.id === "addon2") price += 12; // Fruits
      if (addon.id === "addon3") price += 25; // Extra Chocolate
      if (addon.id === "addon4") price += 3; // Sugar level
      if (addon.id === "addon5") price += 20; // Special Candles
      if (addon.id === "addon6") price += 15; // Custom Picture
    }
  });

  // Update the price display
  document.getElementById("cake-price").textContent = `₹${price}`;
}

function toggleDropdown(id) {
  const dropdown = document.getElementById(`${id}-options`);
  dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";

  const dropdownButton = document.querySelector(`#${id} .dropdown-btn`);
  dropdownButton.classList.toggle('active');
}

function App() {

  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const addToCart = (cake) => {
    setCart((prevCart) => {
      const newCart = [...prevCart, cake];
      updateTotalPrice(newCart);
      return newCart;
    });
  };

  const updateTotalPrice = (cart) => {
    const price = cart.reduce((total, item) => total + item.price, 0);
    setTotalPrice(price);
  };

  const checkout = () => {
    alert('Proceeding to checkout');
    // You can navigate to a checkout page here
  };

  useEffect(() => {
    // Inject Botpress Web Chat scripts dynamically
    const botpressScript = document.createElement('script');
    botpressScript.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    botpressScript.async = true;
    document.body.appendChild(botpressScript);

    const configScript = document.createElement('script');
    configScript.src = "https://mediafiles.botpress.cloud/4ae5d67d-36e5-4c96-96d0-bf779510b63a/webchat/config.js";
    configScript.defer = true;
    document.body.appendChild(configScript);

    // Cleanup scripts on component unmount
    return () => {
      document.body.removeChild(botpressScript);
      document.body.removeChild(configScript);
    };
  }, []);

  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderImages = [slider1, slider2, slider3];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  };

  const handleImageClick = (category) => {
    alert(`You clicked on ${category}. Show more of this type!`);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-links">
            <a href="#">ORDER ONLINE</a>
            <a href="#">CART</a>
            <a href="#">VISIT US</a>
          </div>
          <div className="nav-logo">
            <img src={logo} alt="Bakery Logo" className="logo" />
          </div>
          <div className="nav-actions">
            <a href="#">ABOUT US</a>
            <a href="#" className="highlight">LOGIN/SIGNUP</a>
          </div>
        </nav>

        <div className="menu-bar">
          <ul>
            <li>Cakes by Flavour &#9662;</li>
            <li>Cakes by Theme &#9662;</li>
            <li>Combo Products &#9662;</li>
            <li>Breads &#9662;</li>
            <li>Photo Cakes</li>
            <li>Gifts &#9662;</li>
            <li>Occasion &#9662;</li>
            <li>Relation &#9662;</li>
            <li>Chocolate &#9662;</li>
            <li>Customize &#9662;</li>
          </ul>
        </div>

        <div className="slider">
          <div
            className="slide"
            style={{
              backgroundImage: `url(${sliderImages[currentSlide]})`,
            }}
          >
            <div className="text-box">
              <h1>Step Into a Sweet Wonderland</h1>
              <p><i>
               "Once upon a time, in a land of magic and wonder, there was a bakery where every bite tasted 'simply divine' "
              </i></p>

              <Link to="/shop" className="shop-now-btn">
                SHOP NOW
              </Link>

            </div>
          </div>
          <button className="arrow left-arrow" onClick={prevSlide}>
            ❮
          </button>
          <button className="arrow right-arrow" onClick={nextSlide}>
            ❯
          </button>
        </div>

        <section className="products">
          <h1 className="section-title">Our Products</h1>
          <p className="section-description">
            <i>We bake the goods the old-fashioned way: from scratch, in small batches, and using the finest ingredients.</i>
          </p>
          <button className="view-more-btn">VIEW MORE</button>

          <div className="product-grid">
            <div className="product-item" onClick={() => handleImageClick('Cupcakes')}>
              <img src={cupcakes} alt="Cupcakes" />
              <p>Cupcakes</p>
            </div>
            <div className="product-item" onClick={() => handleImageClick('Brownies & Bars')}>
              <img src={brownies} alt="Brownies & Bars" />
              <p>Brownies & Bars</p>
            </div>
            <div className="product-item" onClick={() => handleImageClick('Cakes')}>
              <img src={cakes} alt="Cakes" />
              <p>Cakes</p>
            </div>
            <div className="product-item" onClick={() => handleImageClick('Sampler Packs')}>
              <img src={samplerPacks} alt="Sampler Packs" />
              <p>Sampler Packs</p>
            </div>
            <div className="product-item" onClick={() => handleImageClick('World-Famous, Fresh Banana Pudding')}>
              <img src={bananaPudding} alt="Banana Pudding" />
              <p>Fresh Pudding</p>
            </div>
          </div>
        </section>

        <section className="treats-section">
          <h1 className="section-title">Treats for any Occasion</h1>
          <p className="section-description">
            <i>We've got you covered for any holiday, special occasion, or cause for celebration.</i>
          </p>
          <button className="view-more-btn">VIEW MORE</button>
          <div className="treats-grid">
            <div className="treat-item">
              <img src={anniversary} alt="Best Sellers" />
              <p>Anniversary</p>
            </div>
            <div className="treat-item">
              <img src={birthday} alt="Birthday" />
              <p>Birthday</p>
            </div>
            <div className="treat-item">
              <img src={wedding} alt="Gifts Under $50" />
              <p>Wedding</p>
            </div>
            <div className="treat-item">
              <img src={graduation} alt="Lotsa Chocolate!" />
              <p>Graduation</p>
            </div>
          </div>
        </section>

        <section className="shop-now">
          <h1 className="section-title">Shop Now</h1>
          <p className="section-description"><i>Filter your favorite cakes and desserts below.</i></p>
          <div className="shop-container">
            {/* Left Column*/}
            <div className="filters">
              <div className="filter-item">
                <h3>Category</h3>
                <ul>
                  <li>Cakes</li>
                  <li>Chocolates</li>
                  <li>Brownies</li>
                  <li>Snacks</li>
                </ul>
              </div>
              <div className="filter-item">
                <h3>Price Range</h3>
                <ul>
                  <li>Under ₹499</li>
                  <li>₹500 - ₹999</li>
                  <li>₹1000 - ₹1499 </li>
                  <li>Above ₹1499</li>
                </ul>
              </div>
              <div className="filter-item">
                <h3>Weight</h3>
                <ul>
                  <li>1 pound</li>
                  <li>2 pounds</li>
                  <li>3 pounds</li>
                  <li>4 pounds and above</li>
                </ul>
              </div>
              <div className="filter-item">
                <h3>Type</h3>
                <ul>
                  <li>Eggless</li>
                </ul>
              </div>
              <div className="filter-item">
                <h3>Flavour</h3>
                <ul>
                  <li>Chocolate</li>
                  <li>Rasmalai</li>
                  <li>Strawberry</li>
                  <li>Butterscotch</li>
                </ul>
              </div>
              <div className="filter-item">
                <h3>Special Flavour Cake</h3>
                <ul>
                  <li>Red Velvet</li>
                  <li>Black Forest</li>
                  <li>Blueberry</li>
                </ul>
              </div>
            </div>

            {/*right column*/ }
            <div className="cake-gallery">
              <div className="cake-item">
                <img src={blueberrycake} alt="Blueberry Cake" />
                <p>Blueberry Cake</p>
                <p>₹399</p>
                <button className="order-now-btn" onClick={() => addToCart({ name: 'Blueberry Cake', price: 399, image: blueberrycake })}>Order Now</button>
              </div>              
              <div className="cake-item">
                <img src={rasmalaicake} alt="Rasmalai Cake" />
                <p>Rasmalai Cake</p>
                <p>₹449</p>
                <button className="order-now-btn" onClick={() => addToCart({ name: 'Rasmalai Cake', price: 449, image: rasmalaicake })}>Order Now</button>
              </div>
              <div className="cake-item">
                <img src={strawberrycake} alt="Strawberry Cake" />
                <p>Strawberry Cake</p>
                <p>₹349</p>
                <button className="order-now-btn" onClick={() => addToCart({ name: 'Strawberry Cake', price: 349, image: strawberrycake })}>Order Now</button>
              </div>
              <div className="cake-item">
                <img src={pineapplecake} alt="Pineapple Cake" />
                <p>Pineapple Cake</p>
                <p>₹399</p>
                <button className="order-now-btn" onClick={() => addToCart({ name: 'Pineapple Cake', price: 399, image: pineapplecake })}>Order Now</button>
              </div>
              <div className="cake-item">
                <img src={chocolatecake} alt="Chocolate Cake" />
                <p>Chocolate Cake</p>
                <p>₹449</p>
                <button className="order-now-btn" onClick={() => addToCart({ name: 'BChocolate Cake', price: 449, image: chocolatecake })}>Order Now</button>
              </div>
              <div className="cake-item">
                <img src={mirrorglazecake} alt="Mirror Glaze Cake" />
                <p>Mirror Glaze Cake</p>
                <p>₹409</p>
                <button className="order-now-btn" onClick={() => addToCart({ name: 'Mirror Glaze Cake', price: 409, image: mirrorglazecake })}>Order Now</button>
              </div>
              
            </div>
          </div>
        </section>

        <section className="personalized">
          <h1 className="section-title">Get your personalized cake!!</h1>
          <p className="section-description">
            <i>Customize your cake as per your requirements! Upload your cake picture, add special comments, and select your cake add-ons!</i>
          </p>

          <div className="customization-container">
            <div className="left-column">
              <h3>Upload your cake picture:</h3>
              <div className="canvas-container">
                <input type="file" id="cake-upload" accept="image/*" onChange={handleImageUpload} />
                <canvas id="cake-canvas" width="300" height="400"></canvas> {/* Canvas for displaying uploaded image */}
              </div>

              <div className="comment-section">
                <h3>Add a comment:</h3>
                <textarea id="cake-comments" placeholder="Write any special instructions or comments..."></textarea>
              </div>
            </div>

            <div className="right-column">
              <h3>Add-ons & Customizations</h3>
              <div className="addons">
                {/* Addon 1 */}
                <div className="addon-item">
                  <div className="dropdown">
                    <button className="dropdown-btn" onClick={() => toggleDropdown('addon1')}>
                      Add Candies
                      <span className="arrow">&#9660;</span>
                    </button>
                    <ul className="dropdown-options" id="addon1-options">
                      <li><input type="checkbox" id="addon1" onChange={calculatePrice} /> Add Candies</li>
                    </ul>
                  </div>
                </div>

                {/* Addon 2 */}
                <div className="addon-item">
                  <div className="dropdown">
                    <button className="dropdown-btn" onClick={() => toggleDropdown('addon2')}>
                      Add Fruits
                      <span className="arrow">&#9660;</span>
                    </button>
                    <ul className="dropdown-options" id="addon2-options">
                      <li><input type="checkbox" id="addon2" onChange={calculatePrice} /> Add Fruits</li>
                    </ul>
                  </div>
                </div>

                {/* Addon 3 */}
                <div className="addon-item">
                  <div className="dropdown">
                    <button className="dropdown-btn" onClick={() => toggleDropdown('addon4')}>
                      Extra Chocolate
                      <span className="arrow">&#9660;</span>
                    </button>
                    <ul className="dropdown-options" id="addon4-options">
                      <li><input type="checkbox" id="addon4" onChange={calculatePrice} /> Extra Chocolate</li>
                    </ul>
                  </div>
                </div>

                {/* Addon 4 */}
                <div className="addon-item">
                  <div className="dropdown">
                    <button className="dropdown-btn" onClick={() => toggleDropdown('addon5')}>
                      Sugar Level
                      <span className="arrow">&#9660;</span>
                    </button>
                    <ul className="dropdown-options" id="addon5-options">
                      <li><input type="checkbox" id="addon5" onChange={calculatePrice} /> Less Sugar</li>
                    </ul>
                  </div>
                </div>

                {/* Addon 5 */}
                <div className="addon-item">
                  <div className="dropdown">
                    <button className="dropdown-btn" onClick={() => toggleDropdown('addon7')}>
                      Special Candles
                      <span className="arrow">&#9660;</span>
                    </button>
                    <ul className="dropdown-options" id="addon7-options">
                      <li><input type="checkbox" id="addon7" onChange={calculatePrice} /> Special Candles</li>
                    </ul>
                  </div>
                </div>

                {/* Addon 6 */}
                <div className="addon-item">
                  <div className="dropdown">
                    <button className="dropdown-btn" onClick={() => toggleDropdown('addon8')}>
                      Custom Picture 
                      <span className="arrow">&#9660;</span>
                    </button>
                    <ul className="dropdown-options" id="addon8-options">
                      <li><input type="checkbox" id="addon8" onChange={calculatePrice} /> Custom Picture (Sticker)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="price-section">
                <h3>Expected Price:</h3>
                <p id="cake-price">____</p> {/* The expected price would be displayed here */}
              </div>
            </div>
          </div>

          <button className="submit-btn" onClick={calculatePrice}>Submit & Get Price</button>
        </section>

        <section className="order-readymade">
          <h1 className="section-title">Order Ready-Made Customized cakes...</h1>
          <p className="section-description"><i>Don't have a customized design? We are here to provide them for you.. </i></p>
          <div className="shop-container2">
            {/* Right Column (Filters Section) */}
            <div className="cake-gallery">
              <div className="cake-item">
                <img src={lighteningmcqueen} alt="Lightenening McQueen Cake" />
                <p>Lightenening McQueen Cake</p>
                <p>₹620</p>
                <button className="order-now-btn">Order Now</button>
              </div>
              <div className="cake-item">
                <img src={matkicake} alt="Matki Cake" />
                <p>Matki Cake</p>
                <p>₹599</p>
                <button className="order-now-btn">Order Now</button>
              </div>
              <div className="cake-item">
                <img src={antigravitycake} alt="Anti Gravity Cake" />
                <p>Anti Gravity Cake</p>
                <p>₹649</p>
                <button className="order-now-btn">Order Now</button>
              </div>
              <div className="cake-item">
                <img src={butterflycake} alt="Butterfly Cake" />
                <p>Butterfly Cake</p>
                <p>₹399</p>
                <button className="order-now-btn">Order Now</button>
              </div>
              <div className="cake-item">
                <img src={minioncake} alt="Minion Cake" />
                <p>Minion Cake</p>
                <p>₹349</p>
                <button className="order-now-btn">Order Now</button>
              </div>
              <div className="cake-item">
                <img src={drumcake} alt="Drum Cake" />
                <p>Drum Cake</p>
                <p>₹549</p>
                <button className="order-now-btn">Order Now</button>
              </div>
            </div>

            {/* Left Column (Cake Gallery) */}
            <div className="filters2">
              <div className="filter-item">
                <h3>Category</h3>
                <ul>
                  <li>Butterfly cakes</li>
                  <li>Character Cakes</li>
                  <li>Unicorn Cakes</li>
                  <li>Picture Cakes</li>
                  <li>Doll Cakes</li>
                  <li>Instrument Cakes</li>
                  <li>Anti-Gravity Cakes</li>
                  <li>Matki Cakes</li>
                </ul>
              </div>
              <div className="filter-item">
                <h3>Price Range</h3>
                <ul>
                  <li>under ₹999</li>
                  <li>₹1000 - ₹1499 </li>
                  <li>Above ₹1499</li>
                </ul>
              </div>
              <div className="filter-item">
                <h3>Weight</h3>
                <ul>
                  <li>1 pound</li>
                  <li>2 pounds</li>
                  <li>3 pounds</li>
                  <li>4 pounds and above</li>
                </ul>
              </div>
              <div className="filter-item">
                <h3>Flavour</h3>
                <ul>
                  <li>Chocolate</li>
                  <li>Rasmalai</li>
                  <li>Strawberry</li>
                  <li>Butterscotch</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <div className="cart">
  <h2>Your Cart</h2>
  {cart.length === 0 ? (
    <p>Your cart is empty</p>
  ) : (
    <div>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>₹{item.price}</p>
          </li>
        ))}
      </ul>
      <h3>Total: ₹{totalPrice}</h3>
      <button onClick={checkout}>Proceed to Checkout</button>
    </div>
  )}
</div>


        <section className="what-we-offer">
          <h1 className="section-title">What We Offer You</h1>

          <p className="section-description">
            The promises we make to you.
          </p>
          <div className="offer-grid">
            <div className="offer-item">
              <img src={homemadeIcon} alt="100% Homemade" />
              <h2>100% Homemade</h2>
              <p>Feel the handmade goodness</p>
            </div>
            <div className="offer-item">
              <img src={freshnessIcon} alt="Freshness" />
              <h2>Freshness</h2>
              <p>Freshly made, simply irresistible</p>
            </div>
            <div className="offer-item">
              <img src={foodiesIcon} alt="For the Foodies" />
              <h2>For the Foodies</h2>
              <p>Satisfying the palates of dessert enthusiasts</p>
            </div>
            <div className="offer-item">
              <img src={qualityIcon} alt="Premium Quality" />
              <h2>Premium Quality</h2>
              <p>Uncompromising quality, wallet-friendly prices</p>
            </div>
          </div>
        </section>      

        {/*
        <Routes>
          <Route path="/" element={<h1>Welcome to Divine Bakes</h1>} />
          <Route path="/shop" element={<ShopNow />} />
        </Routes>
        */}

        </div>
        <footer className="footer">
          <div className="footer-content">
            <h3>Keep in Touch</h3>
            <p>Follow us on our social media platforms or contact us directly:</p>
            <div className="social-icons">
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
                  alt="Instagram"
                  className="social-icon"
                />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                  alt="Facebook"
                  className="social-icon"
                />
              </a>
              <a href="https://wa.me" target="_blank" rel="noopener noreferrer">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
                  alt="WhatsApp"
                  className="social-icon"
                />
              </a>
            </div>
          </div>
        </footer>
        <script src="https://cdn.botpress.cloud/webchat/v1/inject.js"></script>
        <script src="https://mediafiles.botpress.cloud/4ae5d67d-36e5-4c96-96d0-bf779510b63a/webchat/config.js" defer></script>
      
    </Router>
  );
}

export default App;
