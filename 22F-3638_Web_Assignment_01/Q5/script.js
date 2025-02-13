
const products = [
    { name: "Mobile", price: 24999 },
    { name: "Laptop", price: 129999 },
    { name: "Tablet", price: 8999 },
    { name: "Camera", price: 44999 },
  ];

  let purchaseCount = 0;
  const validPromoCodes = new Set(["NEHAL60", "FASTNU"]);
  let currentDiscount = 0;

  const extractMiddleDigits = (rollNumber) => {
    const digits = rollNumber.replace(/\D/g, "");
    if (digits.length < 4) return 0;
    const midStart = Math.floor((digits.length - 2) / 2);
    return parseInt(digits.substr(midStart, 2), 10) || 0;
  };

  const calculateDiscount = (rollNumber) => {
    let discount = extractMiddleDigits(rollNumber);
    const maxDiscount = purchaseCount >= 2 ? 60 : 50;
    return Math.min(discount, maxDiscount);
  };

  const applyPromoBonus = (discount) => {
    const promoCode = document.getElementById("promoCode").value.trim();
    return validPromoCodes.has(promoCode)
      ? Math.min(discount + 10, 60)
      : discount;
  };

  const updateUI = () => {
    const selectedProducts = document.querySelectorAll(
      "#products input:checked"
    );
    document.getElementById("confirmBtn").disabled =
      selectedProducts.length === 0;
  };

  const updatePrices = () => {
    const rollNumber = document.getElementById("rollNumber").value;
    let discount = calculateDiscount(rollNumber);
    discount = applyPromoBonus(discount);
    currentDiscount = discount;

    const selectedProducts = [
      ...document.querySelectorAll("#products input:checked"),
    ];
    const totals = selectedProducts.reduce(
      (acc, product) => {
        acc.original += +product.value;
        acc.discounted += +product.value * (1 - discount / 100);
        return acc;
      },
      { original: 0, discounted: 0 }
    );

    document.getElementById(
      "originalTotal"
    ).textContent = `${totals.original.toLocaleString()} PKR`;
    document.getElementById("discountPercent").textContent = `${discount}%`;
    document.getElementById(
      "discountedTotal"
    ).textContent = `${totals.discounted.toLocaleString()} PKR`;

    document.querySelectorAll(".product-card").forEach((card, index) => {
      document.getElementById(
        `badge-${index}`
      ).textContent = `-${discount}%`;
    });

    updateUI();

    document.getElementById("priceSummary").style.display =
      selectedProducts.length > 0 ? "block" : "none";
  };

  const handleConfirmPurchase = () => {
    const selectedProducts = [
      ...document.querySelectorAll("#products input:checked"),
    ];
    if (selectedProducts.length === 0) {
      alert("No items selected!");
      return;
    }

    purchaseCount += selectedProducts.length;

    alert(`Purchase confirmed! Total items: ${selectedProducts.length}`);

    document.querySelectorAll("#products input").forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.parentElement.parentElement.classList.remove("selected");
    });

    updatePrices();

    document.getElementById("priceSummary").style.display = "block";
  };

  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("products").innerHTML = products
      .map(
        (product, i) => `
            <div class="product-card">
                <div class="discount-badge" id="badge-${i}">-0%</div>
                <label>
                    <input type="checkbox" value="${
                      product.price
                    }" data-index="${i}">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">${product.price.toLocaleString()} PKR</span>
                </label>
            </div>
        `
      )
      .join("");

   
    const debouncedUpdate = () => {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(updatePrices, 300);
    };

    document
      .getElementById("rollNumber")
      .addEventListener("input", debouncedUpdate);
    document
      .getElementById("promoCode")
      .addEventListener("input", debouncedUpdate);
    document.getElementById("products").addEventListener("change", (e) => {
      if (e.target.matches('input[type="checkbox"]')) {
        e.target.parentElement.parentElement.classList.toggle(
          "selected",
          e.target.checked
        );
        debouncedUpdate();
      }
    });
    document
      .getElementById("confirmBtn")
      .addEventListener("click", handleConfirmPurchase);
  });