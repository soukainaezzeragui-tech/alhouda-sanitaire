// رابط الـ CSV الذي حصلت عليه من Google Sheets
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0qnUzNmU46GUWrjrFJNJUoV3jtOcfD0b7uK1Y_k-7ad0m1-0C_AGSdEL6Jgh1aonTLTYl3Z50SGq6/pub?output=csv";

async function loadProducts() {
    try {
        const response = await fetch(sheetURL);
        const data = await response.text();
        
        // تحويل الـ CSV إلى Array من الكائنات (Objects)
        const rows = data.split('\n').slice(1); // تجاهل السطر الأول (العناوين)
        const products = rows.map(row => {
            const cols = row.split(','); // قد تحتاج لتعديل الفاصلة حسب إعدادات إكسل
            return {
                id: cols[0],
                name: cols[1],
                category: cols[2],
                subCategory: cols[3],
                description: cols[4],
                image: cols[5],
                status: cols[6]
            };
        });

        displayProducts(products);
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
    }
}

function displayProducts(products) {
    const container = document.getElementById('products'); // تأكد أن الـ ID مطابق لملف HTML
    container.innerHTML = ""; 

    products.forEach(product => {
        if(product.status === "1") { // عرض المنتجات النشطة فقط
            container.innerHTML += `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <a href="https://wa.me/212600000000?text=أريد طلب: ${product.name}" class="btn">طلب عبر واتساب</a>
                </div>
            `;
        }
    });
}

loadProducts();