// JavaScript Logic for Kingdom FFA Store Website

// ==========================================================================
// 1. STATE & DATA INITIALIZATION
// ==========================================================================
let cart = [];

// DOM Elements
const body = document.body;
const navbar = document.getElementById('main-header');
const menuToggle = document.getElementById('menu-toggle-btn');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Cart Elements
const cartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
const cartDrawer = document.getElementById('cart-drawer');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const cartEmptyMessage = document.getElementById('cart-empty-message');
const cartFooterDetails = document.getElementById('cart-footer-details');
const cartTotalAmount = document.getElementById('cart-total-amount');
const checkoutBtn = document.getElementById('checkout-btn');
const cartGoShopBtn = document.getElementById('cart-go-shop-btn');

// Checkout Modal Elements
const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
const closeCheckoutModal = document.getElementById('close-checkout-modal');
const modalOrderItems = document.getElementById('modal-order-items');
const modalOrderTotal = document.getElementById('modal-order-total');
const acceptTermsCheckbox = document.getElementById('accept-terms-checkbox');
const termsAcceptLabel = document.getElementById('terms-accept-label');

// ==========================================================================
// 2. SCROLLING & NAVIGATION INTERACTIONS
// ==========================================================================

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNavLink();
});

// Update active navigation link based on scroll section
function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 150;
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        
        if (scrollPosition >= top && scrollPosition < top + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Mobile Hamburger Menu Toggle
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when navigation link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scroll for buttons
document.getElementById('hero-shop-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#store').scrollIntoView({ behavior: 'smooth' });
});
document.getElementById('hero-premium-btn').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#premium').scrollIntoView({ behavior: 'smooth' });
});

// ==========================================================================
// 3. CART SYSTEM LOGIC
// ==========================================================================

// Toggle Cart Drawer
function openCart() {
    cartDrawerOverlay.classList.add('active');
    body.style.overflow = 'hidden'; // Lock background scrolling
}

function closeCart() {
    cartDrawerOverlay.classList.remove('active');
    if (!checkoutModalOverlay.classList.contains('active')) {
        body.style.overflow = 'auto'; // Release scroll lock
    }
}

cartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
cartGoShopBtn.addEventListener('click', closeCart);

// Close cart when clicking outside the drawer
cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) {
        closeCart();
    }
});

// Add Item to Selection (Cart)
window.addToCart = function(name, price, img) {
    // Check if item already exists in cart (we allow unique items for shop purchases)
    const existingItem = cart.find(item => item.name === name);
    if (!existingItem) {
        cart.push({ name, price, img });
        updateCartUI();
    }
    openCart();
};

// Add Crate Keys with Quantity
window.addCrateKeys = function() {
    const quantityInput = document.getElementById('keys-quantity');
    const quantity = parseInt(quantityInput.value) || 1;
    
    if (quantity < 1) {
        alert('Please enter a valid quantity');
        return;
    }
    
    // Add multiple keys to cart
    for (let i = 0; i < quantity; i++) {
        cart.push({ name: 'Crate Keys', price: 10, img: 'assets/keys.png' });
    }
    
    // Reset quantity input
    quantityInput.value = 1;
    updatePriceDisplay();
    updateCartUI();
    openCart();
};

// Update price display for keys
function updatePriceDisplay() {
    const quantityInput = document.getElementById('keys-quantity');
    const priceDisplay = document.getElementById('keys-price');
    const quantity = parseInt(quantityInput.value) || 1;
    priceDisplay.textContent = quantity * 10;
}

// Increase quantity
window.increaseQuantity = function() {
    const quantityInput = document.getElementById('keys-quantity');
    quantityInput.value = (parseInt(quantityInput.value) || 1) + 1;
    updatePriceDisplay();
};

// Decrease quantity
window.decreaseQuantity = function() {
    const quantityInput = document.getElementById('keys-quantity');
    const currentValue = parseInt(quantityInput.value) || 1;
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updatePriceDisplay();
    }
};

// Add Sword Crate Keys with Quantity
window.addSwordCrateKeys = function() {
    const quantityInput = document.getElementById('sword-keys-quantity');
    const quantity = parseInt(quantityInput.value) || 1;
    
    if (quantity < 1) {
        alert('Please enter a valid quantity');
        return;
    }
    
    // Add multiple sword keys to cart
    for (let i = 0; i < quantity; i++) {
        cart.push({ name: 'Sword Crate Keys', price: 50, img: 'assets/Sword.png' });
    }
    
    // Reset quantity input
    quantityInput.value = 1;
    updateSwordPriceDisplay();
    updateCartUI();
    openCart();
};

// Update price display for sword keys
function updateSwordPriceDisplay() {
    const quantityInput = document.getElementById('sword-keys-quantity');
    const priceDisplay = document.getElementById('sword-keys-price');
    const quantity = parseInt(quantityInput.value) || 1;
    priceDisplay.textContent = quantity * 50;
}

// Increase sword quantity
window.increaseSwordQuantity = function() {
    const quantityInput = document.getElementById('sword-keys-quantity');
    quantityInput.value = (parseInt(quantityInput.value) || 1) + 1;
    updateSwordPriceDisplay();
};

// Decrease sword quantity
window.decreaseSwordQuantity = function() {
    const quantityInput = document.getElementById('sword-keys-quantity');
    const currentValue = parseInt(quantityInput.value) || 1;
    if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
        updateSwordPriceDisplay();
    }
};

// Add event listener for quantity input changes
document.addEventListener('DOMContentLoaded', function() {
    const quantityInput = document.getElementById('keys-quantity');
    if (quantityInput) {
        quantityInput.addEventListener('change', updatePriceDisplay);
        quantityInput.addEventListener('input', updatePriceDisplay);
    }
});

// Remove Item from Selection
window.removeFromCart = function(name) {
    cart = cart.filter(item => item.name !== name);
    updateCartUI();
};

// Update Cart Display UI
function updateCartUI() {
    // Update count badge
    cartCount.textContent = cart.length;
    
    if (cart.length === 0) {
        cartEmptyMessage.style.display = 'flex';
        cartItemsContainer.style.display = 'none';
        cartFooterDetails.style.display = 'none';
    } else {
        cartEmptyMessage.style.display = 'none';
        cartItemsContainer.style.display = 'flex';
        cartFooterDetails.style.display = 'block';
        
        // Render Cart Items
        cartItemsContainer.innerHTML = '';
        let total = 0;
        
        cart.forEach(item => {
            total += item.price;
            
            // Check if item image is actually a Font Awesome class representation
            let visualHTML = '';
            if (item.img.startsWith('fa-')) {
                visualHTML = `<div class="cart-item-icon-wrapper"><i class="${item.img}"></i></div>`;
            } else {
                visualHTML = `<img src="${item.img}" alt="${item.name}" class="cart-item-img">`;
            }
            
            const itemHTML = `
                <div class="cart-item">
                    ${visualHTML}
                    <div class="cart-item-details">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">₱${item.price}</div>
                    </div>
                    <button class="btn-remove-item" onclick="removeFromCart('${item.name}')" aria-label="Remove item">
                        <i class="fa-solid fa-trash"></i>
                    </button>
                </div>
            `;
            cartItemsContainer.insertAdjacentHTML('beforeend', itemHTML);
        });
        
        cartTotalAmount.textContent = `₱${total}`;
    }
}

// ==========================================================================
// 4. CHECKOUT & TERMS VERIFICATION FLOW
// ==========================================================================

// Handle Proceed to Purchase
checkoutBtn.addEventListener('click', () => {
    // 1. Check if terms are accepted
    if (!acceptTermsCheckbox.checked) {
        // Close the cart drawer to allow user to see terms scroll
        closeCart();
        
        // Scroll to terms checkbox section
        document.getElementById('terms-section').scrollIntoView({ behavior: 'smooth' });
        
        // Alert notification (styled or standard fallback alert)
        setTimeout(() => {
            // Shake the checkbox label area to attract attention
            termsAcceptLabel.style.animation = 'shake 0.5s ease-in-out';
            termsAcceptLabel.style.color = '#ff1744';
            
            // Highlight checking requirement
            alert("⚠️ Agreement Required: Before you buy, you must read and accept the Terms & Conditions at the bottom of the page.");
            
            // Clean up shake animation after it plays
            setTimeout(() => {
                termsAcceptLabel.style.animation = '';
                termsAcceptLabel.style.color = '';
            }, 1000);
        }, 800);
        
        return;
    }
    
    // 2. If accepted, show the Checkout Modal
    openCheckoutModal();
});

// Toggle Checkout Modal
function openCheckoutModal() {
    // Populate order details in the modal
    modalOrderItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        const li = document.createElement('li');
        li.innerHTML = `<span>${item.name}</span><strong>₱${item.price}</strong>`;
        modalOrderItems.appendChild(li);
    });
    
    modalOrderTotal.textContent = `₱${total}`;
    
    // Close cart drawer first
    cartDrawerOverlay.classList.remove('active');
    
    // Show checkout modal
    checkoutModalOverlay.classList.add('active');
    body.style.overflow = 'hidden';
}

function closeCheckoutModalWindow() {
    checkoutModalOverlay.classList.remove('active');
    body.style.overflow = 'auto';
}

closeCheckoutModal.addEventListener('click', closeCheckoutModalWindow);

checkoutModalOverlay.addEventListener('click', (e) => {
    if (e.target === checkoutModalOverlay) {
        closeCheckoutModalWindow();
    }
});

// Clipboard Copier Utility
window.copyText = function(text) {
    navigator.clipboard.writeText(text).then(() => {
        // Show temporary tooltip or indicator
        alert(`✅ Copied number: ${text} to clipboard!`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback alert
        alert(`Copy manually: ${text}`);
    });
};

// CSS Injection for dynamic shake animation of terms label
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-6px); }
    40%, 80% { transform: translateX(6px); }
}
`;
document.head.appendChild(styleSheet);
