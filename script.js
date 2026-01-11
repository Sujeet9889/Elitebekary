document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".single-slide");
  let index = 0;

  setInterval(() => {

    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - index) * 100}%)`;
    });

    index++;

    if(index >= slides.length){
      index = 0;
    }

  }, 3000); // 3 seconds

});

const deliveryBtn = document.getElementById('delivery-btn');
const deliveryDropdown = document.querySelector('.delivery-dropdown');
const locationInput = document.getElementById('location-input');
const locationSubmit = document.getElementById('location-submit');
const currentLocationBtn = document.getElementById('current-location');

// Toggle dropdown on click
deliveryBtn.addEventListener('click', () => {
  deliveryDropdown.style.display = deliveryDropdown.style.display === 'block' ? 'none' : 'block';
});

// Confirm manual input
locationSubmit.addEventListener('click', () => {
  const value = locationInput.value.trim();
  if(value){
    deliveryBtn.textContent = "Delivery To: " + value;
    deliveryDropdown.style.display = 'none';
    locationInput.value = '';
  }
});

// Use current location
currentLocationBtn.addEventListener('click', () => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      deliveryBtn.textContent = "Delivery To: Current Location";
      deliveryDropdown.style.display = 'none';

      console.log("Latitude:", lat, "Longitude:", lng);
    }, (error) => {
      alert("Location access denied or unavailable");
    });
  } else {
    alert("Geolocation not supported by browser");
  }
});
/* login and signup script*/
const loginLink = document.getElementById('login-link');
const authModal = document.getElementById('auth-modal');
const authClose = document.getElementById('auth-close');

// Open modal
loginLink.addEventListener('click', e => {
  e.preventDefault();
  authModal.style.display = 'block';
});

// Close modal
authClose.addEventListener('click', () => { authModal.style.display = 'none'; });
window.addEventListener('click', e => { if(e.target == authModal) authModal.style.display='none'; });

// Tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tabButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const target = btn.dataset.tab;
    tabContents.forEach(c => c.style.display = c.id === target ? 'block' : 'none');
  });
});

// OTP simulation
document.getElementById('send-otp').addEventListener('click', () => {
  const mobile = document.getElementById('mobile-number').value.trim();
  if(mobile) alert(`OTP sent to ${mobile}`);
  else alert("Enter mobile number");
});

document.getElementById('verify-otp').addEventListener('click', () => {
  const otp = document.getElementById('otp-input').value.trim();
  if(otp) alert("OTP verified! Logged in successfully");
  else alert("Enter OTP");
});

// Gmail login simulation
document.getElementById('gmail-login').addEventListener('click', () => {
  alert("Redirecting to Gmail login...");
});
/* track order js*/
const trackLink = document.getElementById("track-order-link");
const trackModal = document.getElementById("track-modal");
const trackClose = document.getElementById("track-close");
const trackBtn = document.getElementById("track-btn");

const trackResult = document.getElementById("track-result");
const trackStatus = document.getElementById("track-status");

// open popup
trackLink.addEventListener("click", function(e){
  e.preventDefault();
  trackModal.style.display = "block";
});

// close popup
trackClose.addEventListener("click", function(){
  trackModal.style.display = "none";
});

window.addEventListener("click", function(e){
  if(e.target === trackModal){
    trackModal.style.display = "none";
  }
});

// track order demo logic
trackBtn.addEventListener("click", function(){
  const id = document.getElementById("track-id").value.trim();
  const contact = document.getElementById("track-contact").value.trim();

  if(id === "" || contact === ""){
    alert("Please enter Order ID and Mobile/Email");
    return;
  }

  trackResult.style.display = "block";

  if(id.endsWith("1")){
    trackStatus.innerText = "Order Confirmed ✅";
  }else if(id.endsWith("2")){
    trackStatus.innerText = "Preparing Cake 🎂";
  }else if(id.endsWith("3")){
    trackStatus.innerText = "Out for Delivery 🚚";
  }else{
    trackStatus.innerText = "Delivered 🎉";
  }
});
/* add to cart js */
let cart = [];

const cartLink = document.getElementById("cart-link");
const cartModal = document.getElementById("cart-modal");
const cartClose = document.getElementById("cart-close");
const cartItemsDiv = document.getElementById("cart-items");
const cartTotalSpan = document.getElementById("cart-total");
const cartCountSpan = document.getElementById("cart-count");

// OPEN CART
cartLink.addEventListener("click", e => {
  e.preventDefault();
  cartModal.style.display = "block";
  renderCart();
});

// CLOSE CART
cartClose.addEventListener("click", () => {
  cartModal.style.display = "none";
});

// ADD TO CART FUNCTION
function addToCart(name, price, image){
  const item = cart.find(p => p.name === name);

  if(item){
    item.qty++;
  }else{
    cart.push({
      name: name,
      price: price,
      image: image,
      qty: 1
    });
  }

  updateCartCount();
}


// RENDER CART
function renderCart(){
  cartItemsDiv.innerHTML = "";
  let total = 0;

  if(cart.length === 0){
    cartItemsDiv.innerHTML = "<p>Your cart is empty</p>";
    cartTotalSpan.innerText = "0";
    return;
  }

  cart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "cart-item";

    div.innerHTML = `
      <img src="${item.image}" class="cart-img">

      <div class="cart-info">
        <strong>${item.name}</strong><br>
        ₹${item.price} × ${item.qty}
      </div>

      <button onclick="removeItem(${index})">❌</button>
    `;

    cartItemsDiv.appendChild(div);
  });

  cartTotalSpan.innerText = total;
}

// REMOVE ITEM
function removeItem(index){
  cart.splice(index,1);
  renderCart();
  updateCartCount();
}

// CART COUNT
function updateCartCount(){
  let count = 0;
  cart.forEach(item => count += item.qty);
  cartCountSpan.innerText = count;
}
/*check out btn js*/
const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click", () => {
  if(cart.length === 0){
    alert("Your cart is empty ❌");
    return;
  }

  alert("Checkout started ✅");

  // yahan aage payment / order page logic aayega
});
 /*search box js*/
const searchInput = document.getElementById("search-input");
const products = document.querySelectorAll(".product-card");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  products.forEach(product => {
    const name = product.getAttribute("data-name");

    if(name.includes(value)){
      product.style.display = "block";
    }else{
      product.style.display = "none";
    }
  });
});
/*search box container js*/
const searchSuggestions = document.getElementById("search-suggestions");

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase().trim();
  searchSuggestions.innerHTML = "";
  
  if(value === ""){
    searchSuggestions.style.display = "none";
    return;
  }

  let hasMatch = false;

  products.forEach(product => {
    const name = product.getAttribute("data-name");
    if(name.includes(value)){
      hasMatch = true;

      const imgSrc = product.querySelector("img").src;
      const price = product.querySelector("p").innerText;

      const div = document.createElement("div");
      div.className = "search-suggestion-item";

      div.innerHTML = `
        <img src="${imgSrc}">
        <div>
          <strong>${name}</strong><br>
          <small>${price}</small>
        </div>
      `;

      div.addEventListener("click", () => {
        searchInput.value = name;
        searchSuggestions.style.display = "none";

        // Scroll to product
        product.scrollIntoView({behavior:"smooth", block:"center"});
        product.style.border = "2px solid #d2691e";
        setTimeout(()=> product.style.border = "", 2000);
      });

      searchSuggestions.appendChild(div);
    }
  });

  searchSuggestions.style.display = hasMatch ? "block" : "none";
});

