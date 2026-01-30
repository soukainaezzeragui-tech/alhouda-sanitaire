async function loadCategorizedProducts() {
    const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR0qnUzNmU46GUWrjrFJNJUoV3jtOcfD0b7uK1Y_k-7ad0m1-0C_AGSdEL6Jgh1aonTLTYl3Z50SGq6/pub?output=csv";

    try {
        const response = await fetch(CSV_URL);
        const csvText = await response.text();
        const rows = csvText.split(/\r?\n/).filter(r => r.trim());

        const constructionGrid = document.getElementById('Construction');
        const robinetterieGrid = document.getElementById('robinetterie');

        if (constructionGrid) constructionGrid.innerHTML = '';
        if (robinetterieGrid) robinetterieGrid.innerHTML = '';

        for (let i = 1; i < rows.length; i++) {
            const cols = rows[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            if (cols.length < 8) continue;

            const pName   = cols[1]?.replace(/"/g, '').trim();
            const pCat    = cols[2]?.replace(/"/g, '').trim();
            const pSubCat = cols[3]?.replace(/"/g, '').trim();
            const pImg    = cols[6]?.replace(/"/g, '').trim();
            const pStatus = cols[7]?.replace(/"/g, '').trim();

            if (pStatus !== "1") continue; // فقط المنتجات النشطة

            const productHTML = `
                <div class="product-card">
                    <div class="product-img">
                        <img src="${pImg}" alt="${pName}" loading="lazy"
                             onerror="this.src='https://via.placeholder.com/250?text=AlHouda'">
                    </div>
                    <p class="p-category">${pSubCat}</p>
                    <h3 class="p-title">${pName}</h3>
                    <button class="p-commande" onclick="commandeProduit('${pName}')">Commander</button>
                </div>`;

            // إضافة كل المنتجات بدون حد
            if (pCat === "Construction" && constructionGrid) {
                constructionGrid.insertAdjacentHTML('beforeend', productHTML);
            } 
            else if (pCat === "Robinetterie" && robinetterieGrid) {
                robinetterieGrid.insertAdjacentHTML('beforeend', productHTML);
            }
        }

    } catch (error) {
        console.error("Erreur chargement produits:", error);
    }
}

// Rendre la fonction accessible au bouton onclick
window.commandeProduit = function(produit) {
    const phoneNumber = "212638069899"; // Votre numéro actuel
    const message = `Bonjour, je souhaite commander le produit: ${produit}`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
};

// Lancer le chargement au démarrage
document.addEventListener('DOMContentLoaded', loadCategorizedProducts);