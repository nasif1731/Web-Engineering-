function loadCart() {
    let cart = getCookie('cart') ? JSON.parse(getCookie('cart')) : [];
    let cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '';
    if(cart.length === 0) {
        cartDiv.innerHTML = 'Cart is empty';
        return;
    }
    cart.forEach((product, index) => {
        cartDiv.innerHTML += `
            <div>
                ${product}
                <button onclick="removeItem(${index})">Remove</button>
            </div>`;
    });
}

function removeItem(index) {
    let cart = JSON.parse(getCookie('cart'));
    cart.splice(index, 1);
    document.cookie = `cart=${JSON.stringify(cart)}; path=/`;
    loadCart();
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}