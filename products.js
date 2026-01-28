// رابط الـ CSV الذي حصلت عليه من "نشر على الويب" في Google Sheets
const sheetCSV = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0qnUzNmU46GUWrjrFJNJUoV3jtOcfD0b7uK1Y_k-7ad0m1-0C_AGSdEL6Jgh1aonTLTYl3Z50SGq6/pub?output=csv";
// products.js
const productsContainer = document.getElementById("products");
const categoryTitle = document.getElementById("categoryTitle");

// قراءة الفئة من الرابط، مثلا: ?cat=Construction
const urlParams = new URLSearchParams(window.location.search);
const currentCat = urlParams.get("cat");

// رابط CSV من Google Sheet


// تحويل CSV إلى مصفوفة JSON
async function fetchProducts() {
    const response = await fetch(sheetCSV);
    const csvText = await response.text();

    // إذا كان CSV يستخدم الفاصلة كفاصل
    const rows = csvText.split("\n").filter(row => row.trim() !== "");
    const headers = rows.shift().split(",").map(h => h.trim());

    const products = rows.map(row => {
        const values = row.split(",").map(v => v.trim());
        let obj = {};
        headers.forEach((header, i) => {
            obj[header] = values[i];
        });
        return obj;
    });

    return products;
}

// عرض المنتجات حسب الفئة
async function displayProducts() {
    const products = await fetchProducts();

    // فلترة المنتجات حسب العمود category
    const filtered = products.filter(p => p.category.toLowerCase() === currentCat.toLowerCase() && p.Status === "1");

    categoryTitle.textContent = currentCat ? currentCat.toUpperCase() : "Tous les produits";

    if (filtered.length === 0) {
        productsContainer.innerHTML = "<p>Aucun produit trouvé.</p>";
        return;
    }

    productsContainer.innerHTML = filtered.map(p => `
        <div class="product-item">
            <a href="#">
                <img src="${p.Image_URL}" alt="${p.product_Name}">
                <h3>${p.product_Name}</h3>
                <p>${p.description}</p>
            </a>
        </div>
    `).join("");
}

displayProducts();
