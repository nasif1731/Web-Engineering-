
const products = [
    { id: 1, name: "Neon Lights", price: 1000 },
    { id: 2, name: "Moon Lamp", price: 400 },
    { id: 3, name: "LED Lights", price: 1500 },
    { id: 4, name: "Table Lamp", price: 800 },
    { id: 5, name: "Wall Lamp", price: 1200 },
    { id: 6, name: "Ceiling Lamp", price: 2000 }
];

const validPromoCodes = new Set(['NEHAL10', 'NU12']);

function renderProducts() {
    const productList = document.getElementById('productList');
    productList.innerHTML = products.map(product => `
        <div class="product">
            <input type="checkbox" id="product${product.id}" 
                   value="${product.price}" data-id="${product.id}">
            <label for="product${product.id}">
                ${product.name} - 
                <span class="original-price">Rs.${product.price.toFixed(2)}</span>
                <span class="discounted-price"></span>
            </label>
            <div class="discount-badge"></div>
        </div>
    `).join('');
}

function calculateDiscount(rollNumber, selectedCount) {
    const parts = rollNumber.split('-');
    const lastPart = parts[parts.length - 1] || '';
    const digitsStr = lastPart.replace(/\D/g, '');
    
    if (digitsStr.length < 2) return 0;
    
    const start = Math.floor((digitsStr.length - 2) / 2);
    const discountDigits = digitsStr.substr(start, 2);
    let discount = parseInt(discountDigits, 10) || 0;
    
    const maxDiscount = selectedCount >= 2 ? 60 : 50;
    return Math.min(discount, maxDiscount);
}

function getSelectedProducts() {
    const checkboxes = document.querySelectorAll('#productList input[type="checkbox"]:checked');
    return Array.from(checkboxes).map(checkbox => ({
        id: checkbox.dataset.id,
        price: parseFloat(checkbox.value)
    }));
}

function updateDisplay() {
    const rollNumber = document.getElementById('rollNumber').value;
    const selectedProducts = getSelectedProducts();
    const discount = calculateDiscount(rollNumber, selectedProducts.length);
    const promoCode = document.getElementById('promoCode').value;

    
    document.querySelectorAll('.product').forEach((productDiv, index) => {
        const originalPrice = products[index].price;
        const discountedPrice = originalPrice * (1 - discount / 100);
        productDiv.querySelector('.discounted-price').textContent = 
            ` Discounted price: Rs.${discountedPrice.toFixed(2)}`;
        productDiv.querySelector('.discount-badge').textContent = `${discount}% OFF`;
    });

    
    let total = selectedProducts.reduce((acc, product) => {
        return acc + (product.price * (1 - discount / 100));
    }, 0);

    
    if (validPromoCodes.has(promoCode)) {
        total *= 0.9; 
    }

    
    document.getElementById('discountDisplay').textContent = 
        `Applied Discount: ${discount}%${validPromoCodes.has(promoCode) ? ' + promo code 10%' : ''}`;
    document.getElementById('totalPrice').textContent = 
        `Total Price: Rs.${total.toFixed(2)}`;
    document.getElementById('itemsPurchased').textContent = 
        `You have purchased ${selectedProducts.length} item(s)`;
}

function handlePurchase() {
    const selectedProducts = getSelectedProducts();
    alert(`You have purchased ${selectedProducts.length} item(s)`);
}

// Event Listeners
document.getElementById('rollNumber').addEventListener('input', updateDisplay);
document.getElementById('promoCode').addEventListener('input', updateDisplay);
document.getElementById('productList').addEventListener('change', updateDisplay);
document.getElementById('purchaseButton').addEventListener('click', handlePurchase);

// Initial setup
renderProducts();
updateDisplay();
