const form = document.getElementById('product-form');
const productList = document.getElementById('product-list');
const productIdField = document.getElementById('productId');


const API_BASE_URL = "http://localhost:3000/api/products";


async function loadProducts() {
  try {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error("Failed to fetch products");

    const products = await response.json();
    console.log("📌 Loaded Products:", products);
    productList.innerHTML = '';

    products.forEach(product => {
      productList.innerHTML += `
        <tr id="row-${product._id}">
          <td>${product.name}</td>
          <td>${product.category}</td>
          <td>$${product.price}</td>
          <td>${product.description}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editProduct('${product._id}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')">Delete</button>
          </td>
        </tr>`;
    });
  } catch (error) {
    console.error(" Error fetching products:", error);
  }
}


form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const productData = {
    name: document.getElementById('name').value,
    category: document.getElementById('category').value,
    price: document.getElementById('price').value,
    description: document.getElementById('description').value,
  };
  const productId = productIdField.value;
  const method = productId ? "PUT" : "POST";
  const url = productId ? `${API_BASE_URL}/${productId}` : API_BASE_URL;

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error(`Failed to ${productId ? "update" : "add"} product`);

    console.log(`Product ${productId ? "Updated" : "Added"} Successfully`);
    form.reset();
    productIdField.value = "";
    loadProducts();
  } catch (error) {
    console.error("Error saving product:", error);
  }
});


async function editProduct(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`);
    if (!response.ok) throw new Error("Failed to fetch product details");

    const product = await response.json();
    document.getElementById('name').value = product.name;
    document.getElementById('category').value = product.category;
    document.getElementById('price').value = product.price;
    document.getElementById('description').value = product.description;
    productIdField.value = product._id;
  } catch (error) {
    console.error("Error loading product for edit:", error);
  }
}


async function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;
  
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete product");

    console.log(` Product Deleted Successfully`);
    document.getElementById(`row-${id}`).remove();
  } catch (error) {
    console.error("Error deleting product:", error);
  }
}


document.addEventListener("DOMContentLoaded", loadProducts);
