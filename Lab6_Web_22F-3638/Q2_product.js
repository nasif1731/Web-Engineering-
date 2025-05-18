function addToCart(productName) {
    let cart = getCookie('cart') ? JSON.parse(getCookie('cart')) : [];
    cart.push(productName);
    document.cookie = `cart=${JSON.stringify(cart)}; path=/`;
    alert('Product added to cart!');
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}