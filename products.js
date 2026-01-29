// رابط الـ CSV الصحيح
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0qnUzNmU46GUWrjrFJNJUoV3jtOcfD0b7uK1Y_k-7ad0m1-0C_AGSdEL6Jgh1aonTLTYl3Z50SGq6/pub?output=csv";
const MY_PHONE = '212600000000'; // ضع رقم هاتفك هنا

async function fetchData() {
    try {
        const response = await fetch(CSV_URL);
        const data = await response.text();
        
        // تقسيم الأسطر
        const rows = data.split(/\r?\n/).slice(1); 
        
        displayProducts(rows);
        displayCategories(rows);
    } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
    }
}

function displayProducts(rows) {
    const container = document.getElementById('products');
    container.innerHTML = '';

    rows.forEach(row => {
        // تجربة التقسيم بالفاصلة العادية أو المنقوطة لضمان التوافق
        const cols = row.includes(';') ? row.split(';') : row.split(',');
        
        if (cols.length < 7) return;

        const [id, name, cat, subCat, marque, desc, imgUrl, status] = cols;

        // التحقق من حالة المنتج (Status) مع حذف أي مسافات زائدة
        if (status && status.trim() === "1") {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <span class="category-tag">${cat}</span>
                <img src="${imgUrl.trim()}" alt="${name}">
                <h3>${name}</h3>
                <a href="https://wa.me/${MY_PHONE}?text=Bonjour, je souhaite commander : ${name}" class="whatsapp-btn">
                    Commander via WhatsApp
                </a>
            `;
            container.appendChild(card);
        }
    });
}

function displayCategories(rows) {
    const nav = document.getElementById('categoriesNav');
    nav.innerHTML = ''; // تنظيف القائمة قبل الإضافة
    
    // استخراج الفئات الفريدة
    const categories = [...new Set(rows.map(row => {
        const cols = row.includes(';') ? row.split(';') : row.split(',');
        return cols[2]; // الفئة موجودة في العمود الثالث
    }))].filter(c => c);

    categories.forEach(cat => {
        const item = document.createElement('div');
        item.className = 'category-item';
        item.innerHTML = `
            <div class="circle">
                <img src="https://cdn-icons-png.flaticon.com/512/900/900667.png" alt="${cat}">
            </div>
            <span>${cat}</span>
        `;
        nav.appendChild(item);
    });
}
// أضف هذا السطر في نهاية ملف الـ JS الخاص بك
document.addEventListener('DOMContentLoaded', loadCategorizedProducts);
fetchData();