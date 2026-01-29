// 1. بيانات السلايدر (Slider Data)
const sliderImages = [
    { src: 'images/cat1.jpg', title: 'Salle de bain', desc: 'Meubles et accessoires de salle de bain premium' },
    { src: 'images/cat2.jpg', title: 'Sanitaire', desc: 'Équipements sanitaires modernes et durables' },
    { src: 'images/cat3.jpg', title: 'Peinture', desc: 'Peintures et revêtements muraux haute qualité' },
    { src: 'images/cat4.jpg', title: 'Accessoires', desc: 'Accessoires de construction et décoration' },
    { src: 'images/cat5.jpg', title: 'Électricité', desc: 'Matériel électrique professionnel' },
    { src: 'images/cat6.jpg', title: 'Outillage', desc: 'Outils professionnels pour tous vos travaux' },
    { src: 'images/cat7.jpg', title: 'Plomberie', desc: 'Tuyaux, raccords et équipements de plومberie' },
    { src: 'images/cat8.jpg', title: 'Construction', desc: 'Matériaux de construction de première qualité' },
    { src: 'images/cat9.jpg', title: 'Cuisine', desc: 'Équipements et accessoires de cuisine modernes' }
];

let currentIndex = 0;
let autoSlideInterval;

// 2. وظائف السلايدر
function initSlider() {
    const indicatorsContainer = document.getElementById('indicators');
    if (!indicatorsContainer) return;
    
    indicatorsContainer.innerHTML = '';
    sliderImages.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${index === currentIndex ? 'active' : ''}`;
        indicator.onclick = () => changeImage(index);
        indicatorsContainer.appendChild(indicator);
    });
    changeImage(0);
    startAutoSlide();
}

function changeImage(index) {
    currentIndex = index;
    const mainImage = document.getElementById('mainImage');
    const slideTitle = document.getElementById('slideTitle');
    const slideDesc = document.getElementById('slideDesc');
    
    if (mainImage) {
        mainImage.src = sliderImages[index].src;
        mainImage.alt = sliderImages[index].title;
    }
    if (slideTitle) slideTitle.textContent = sliderImages[index].title;
    if (slideDesc) slideDesc.textContent = sliderImages[index].desc;
    
    document.querySelectorAll('.indicator').forEach((ind, i) => {
        ind.classList.toggle('active', i === index);
    });
}

function startAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % sliderImages.length;
        changeImage(currentIndex);
    }, 4000);
}

// 3. جلب البيانات من Google Sheets (التشخيص والعرض)
async function loadCategorizedProducts() {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0qnUzNmU46GUWrjrFJNJUoV3jtOcfD0b7uK1Y_k-7ad0m1-0C_AGSdEL6Jgh1aonTLTYl3Z50SGq6/pub?output=csv";

    try {
        const response = await fetch(CSV_URL);
        const csvText = await response.text();
        const rows = csvText.split(/\r?\n/).map(row => row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/));

        const constructionGrid = document.getElementById('Construction');
        const robinetterieGrid = document.getElementById('robinetterie');

        if (constructionGrid) constructionGrid.innerHTML = '';
        if (robinetterieGrid) robinetterieGrid.innerHTML = '';

        let constructionCount = 0;
        let robinetterieCount = 0;
        const limit = 4;

        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i];
            
            const pName   = cols[1]?.replace(/"/g, '').trim();
            const pCat    = cols[2]?.replace(/"/g, '').trim(); // التصنيف الرئيسي
            const pSubCat = cols[3]?.replace(/"/g, '').trim(); 
            const pImg    = cols[6]?.replace(/"/g, '').trim();
            const pStatus = cols[7]?.replace(/"/g, '').trim();

            if (pStatus === "1") {
                const productHTML = `
                    <div class="product-card">
                        <div class="product-img">
                            <img src="${pImg}" alt="${pName}" onerror="this.src='https://via.placeholder.com/250?text=AlHouda'">
                        </div>
                        <div class="product-info">
                            <p class="p-category">${pSubCat}</p>
                            <h3 class="p-title">${pName}</h3>
                            <p class="p-price">Sur Devis</p>
                        </div>
                    </div>`;

                // --- تصحيح الفلترة هنا ---
                
                // 1. إذا كان التصنيف هو "Construction" حصراً
                if (pCat === "Construction" && constructionCount < limit) {
                    if (constructionGrid) {
                        constructionGrid.insertAdjacentHTML('beforeend', productHTML);
                        constructionCount++;
                    }
                } 
                // 2. إذا كان التصنيف هو "Robinetterie" حصراً
                else if (pCat === "Robinetterie" && robinetterieCount < limit) {
                    if (robinetterieGrid) {
                        robinetterieGrid.insertAdjacentHTML('beforeend', productHTML);
                        robinetterieCount++;
                    }
                }

                if (constructionCount >= limit && robinetterieCount >= limit) break;
            }
        }
    } catch (error) {
        console.error("خطأ في توزيع المنتجات:", error);
    }
}

document.addEventListener('DOMContentLoaded', loadCategorizedProducts);

document.addEventListener('DOMContentLoaded', loadCategorizedProducts);

// تشغيل الدالة
document.addEventListener('DOMContentLoaded', loadAllSheetProducts);
// تشغيل الدالة فوراً وبأكثر من طريقة لضمان العمل
loadAllSheetProducts(); 
window.onload = loadAllSheetProducts;
document.addEventListener('DOMContentLoaded', loadAllSheetProducts);
// 4. تشغيل الكل عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    initSlider();
    fetchSheetProducts();
    
    // إعداد القائمة المنسدلة (Dropdown)
    document.querySelectorAll('.catalogue-dropdown').forEach(dropdown => {
        const menu = dropdown.querySelector('.mega-menu');
        const arrow = dropdown.querySelector('.dropdown-arrow');
        
        dropdown.addEventListener('mouseenter', () => {
            if (menu) menu.style.display = 'block';
            if (arrow) arrow.style.transform = 'rotate(180deg)';
        });
        
        dropdown.addEventListener('mouseleave', () => {
            if (menu) menu.style.display = 'none';
            if (arrow) arrow.style.transform = 'rotate(0deg)';
        });
    });
});