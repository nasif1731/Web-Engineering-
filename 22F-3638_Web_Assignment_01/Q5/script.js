
const products = [
    { name: "Laptop", price: 100000 },
    { name: "Smartphone", price: 50000 },
    { name: "Headphones", price: 8000 },
    { name: "Smartwatch", price: 20000 },
    { name: "Gaming Console", price: 70000 },
  ];

  function calculateDiscount(rollNumber) {
    const digits = rollNumber.replace(/\D/g, "");
    if (digits.length < 4) return 0;

    const midStart = Math.floor(digits.length / 2) - 1;
    const discount = parseInt(digits.substr(midStart, 2)) || 0;
    return Math.min(discount, 95);
  }

  document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("products");
    container.innerHTML = products
      .map(
        (product, index) => `
            <div class="product-card">
                <div class="discount-badge" id="badge-${index}">-0%</div>
                <label>
                    <input type="checkbox" value="${
                      product.price
                    }" data-index="${index}">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">${product.price.toLocaleString()} PKR</span>
                </label>
            </div>
        `
      )
      .join("");

    document
      .getElementById("rollNumber")
      .addEventListener("input", updateSystem);
    document.addEventListener("change", updateSystem);
  });

  function updateSystem() {
    const rollNumber = document.getElementById("rollNumber").value;
    const discount = calculateDiscount(rollNumber);
    const selectedProducts = Array.from(
      document.querySelectorAll("#products input:checked")
    );

    updatePrices(selectedProducts, discount);
  }

  function updatePrices(selectedProducts, discount) {
    const priceSummary = document.getElementById("priceSummary");
    const originalTotal = selectedProducts.reduce(
      (sum, product) => sum + parseInt(product.value),
      0
    );
    const discountedTotal = selectedProducts.reduce(
      (sum, product) => sum + product.value * (1 - discount / 100),
      0
    );

    document.getElementById(
      "originalTotal"
    ).textContent = `${originalTotal.toLocaleString()} PKR`;
    document.getElementById("discountPercent").textContent = `${discount}%`;
    document.getElementById(
      "discountedTotal"
    ).textContent = `${discountedTotal.toLocaleString()} PKR`;

    priceSummary.classList.toggle("hidden", selectedProducts.length === 0);

    document.querySelectorAll(".product-card").forEach((card, index) => {
      const checkbox = card.querySelector("input");
      card.classList.toggle("selected", checkbox.checked);
      document.getElementById(
        `badge-${index}`
      ).textContent = `-${discount}%`;
    });
  }