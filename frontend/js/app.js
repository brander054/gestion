const API_URL = '/api/products';

const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

document.addEventListener('DOMContentLoaded', fetchProducts);

productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('productName').value.trim();
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    if (name.length < 3) {
        document.getElementById('nameError').textContent = "El nombre debe tener al menos 3 caracteres.";
        return;
    } else {
        document.getElementById('nameError').textContent = "";
    }

    const newProduct = { name, quantity, price };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct)
        });

        if (response.ok) {
            productForm.reset();
            fetchProducts();
        } else {
            const errData = await response.json();
            alert(`Error: ${errData.error || 'No se pudo guardar'}`);
        }
    } catch (error) {
        console.error("Error de red:", error);
        alert("No se pudo conectar con el servidor.");
    }
});

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Error en la red");
        
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        productList.innerHTML = `<p class="error-message">Error al cargar productos del servidor.</p>`;
    }
}

function renderProducts(products) {
    productList.innerHTML = '';

    if (products.length === 0) {
        productList.innerHTML = '<p>No hay productos registrados.</p>';
        return;
    }

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <h3>${product.name}</h3>
            <p><strong>Cantidad:</strong> ${product.quantity}</p>
            <p><strong>Precio:</strong> $${Number(product.price).toFixed(2)}</p>
            <button class="btn-delete" onclick="deleteProduct('${product.id}')">Eliminar</button>
        `;
        productList.appendChild(div);
    });
}

async function deleteProduct(id) {
    if (confirm("¿Desea eliminar este producto?")) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            if (response.ok) fetchProducts();
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    }
}