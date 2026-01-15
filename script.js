const sheetURL = "https://script.google.com/macros/s/AKfycbyjzopPhW0fEXuHUz-3QK4wMKilKw745AY7IZ2dmPZAKQvTvGC0Wt9opl02yWkfmG73/exec";

fetch(sheetURL)
  .then(res => res.text())
  .then(csv => {
    const rows = csv.split("\n").slice(1);
    const container = document.getElementById("products");
    container.innerHTML = ""; 

    rows.forEach(row => {
      // استخدام regex لتقسيم الصفوف لضمان دقة أكبر إذا وجدت فواصل داخل الأسماء
      const cols = row.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);

      if (cols.length < 3) return; // تخطي الأسطر الفارغة

      let name = cols[1]?.replace(/"/g, "");
      let category = cols[2]?.replace(/"/g, "");
      let imageRaw = cols[3]?.replace(/"/g, "").trim();

      // --- وظيفة تحويل رابط جوجل درايف ليصبح رابطاً مباشراً للصورة ---
      let imageDirect = "";
      if (imageRaw && imageRaw.includes("drive.google.com")) {
        let fileId = "";
        if (imageRaw.includes("id=")) {
            fileId = imageRaw.split("id=")[1].split("&")[0];
        } else {
            fileId = imageRaw.split("/d/")[1].split("/")[0];
        }
        imageDirect = `https://drive.google.com/uc?export=view&id=${fileId}`;
      } else {
        imageDirect = imageRaw;
      }

      if (!name) return;

      container.innerHTML += `
        <div class="product" data-category="${category}">
          <img src="${imageDirect}" alt="${name}" onerror="this.src='https://via.placeholder.com/150?text=No+Image'">
          <h3>${name}</h3>
          <p style="color: #666; font-size: 13px;">${category}</p>
          <a href="https://wa.me/212600000000?text=أريد طلب: ${name}" 
             target="_blank" class="buy-btn">
             طلب عبر واتساب
          </a>
        </div>
      `;
    });
  })
  .catch(err => {
    console.error("خطأ في جلب البيانات:", err);
    document.getElementById("products").innerHTML = "حدث خطأ أثناء تحميل المنتجات.";
  });

function filterProducts(category) {
    const allProducts = document.querySelectorAll('.product');
    allProducts.forEach(product => {
        const productCat = product.getAttribute('data-category');
        if (category === 'all' || productCat === category) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}