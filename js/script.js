// Data untuk dashboard
const summaryData = {
    totalProducts: 120,
    totalSales: 85,
    totalRevenue: 12500000
};

// Data produk
const productsData = [
    { id: 1, name: "Moisturizer Glad2Glow Pink", price: 38000, stock: 50 },
    { id: 2, name: "Scora Sheer Glow Tone Up Cream", price: 32000, stock: 30 },
    { id: 3, name: "Skintific Sunscreen", price: 75000, stock: 20 }
];

// Format Rupiah
function formatRupiah(angka) {
    return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Login Function
function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
            alert('Email dan password harus diisi!');
            return;
        }

        if (!email.includes('@')) {
            alert('Format email tidak valid!');
            return;
        }

        // VALIDASI PASSWORD WAJIB = NIM
        if (password !== "24090073") {
            alert("Password salah! Gunakan NIM Anda.");
            return;
        }

        alert('Login berhasil!');
        window.location.href = 'dashboard.html';
        });
    }
    
    // Google login
    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', function() {
            alert('Login dengan Google akan datang!');
        });
    }
}

// Setup Dashboard
function setupDashboard() {
    const totalProductsEl = document.getElementById('totalProducts');
    const totalSalesEl = document.getElementById('totalSales');
    const totalRevenueEl = document.getElementById('totalRevenue');
    
    if (totalProductsEl) totalProductsEl.textContent = summaryData.totalProducts;
    if (totalSalesEl) totalSalesEl.textContent = summaryData.totalSales;
    if (totalRevenueEl) totalRevenueEl.textContent = formatRupiah(summaryData.totalRevenue);
}

// Setup Products Table
function setupProducts() {
    const table = document.getElementById('productsTable');
    
    if (!table) {
        console.error('Element productsTable tidak ditemukan!');
        return;
    }
    
    table.innerHTML = '';
    
    productsData.forEach((product, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${formatRupiah(product.price)}</td>
            <td>${product.stock}</td>
            <td>
                <div class="action-btns">
                    <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
                </div>
            </td>
        `;
        table.appendChild(row);
    });
}

// Edit Product
function editProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (product) {
        alert(`Edit produk: ${product.name}`);
    }
}

// Delete Product
function deleteProduct(id) {
    const product = productsData.find(p => p.id === id);
    if (product && confirm(`Yakin hapus produk "${product.name}"?`)) {
        const index = productsData.findIndex(p => p.id === id);
        productsData.splice(index, 1);
        
        // Refresh table
        setupProducts();
        
        alert('Produk berhasil dihapus!');
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, current page:', window.location.pathname);
    
    // Cek halaman saat ini
    if (window.location.pathname.includes('products.html') || document.getElementById('productsTable')) {
        console.log('Setting up products page...');
        setupProducts();
    } else if (window.location.pathname.includes('dashboard.html') || document.getElementById('totalProducts')) {
        console.log('Setting up dashboard page...');
        setupDashboard();
    } else if (document.getElementById('loginForm')) {
        console.log('Setting up login page...');
        setupLogin();
    }
});