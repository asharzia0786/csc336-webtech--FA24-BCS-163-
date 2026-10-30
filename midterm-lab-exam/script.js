/**
 * Task 3: Plain JavaScript (Live Search, Price Sort, and Premium Badge)
 *
 * Roll Number: FA24-BCS-163
 * N = 63
 * Premium Threshold = N * 100 = 63 * 100 = Rs. 6,300
 */

function initTask3() {
  const productGrid = document.getElementById("product-grid");
  const searchInput = document.getElementById("search-box");
  const sortBtn = document.getElementById("sort-btn");
  const noResults = document.getElementById("no-results");
  const categoryRadios = document.querySelectorAll('input[name="cat"]');

  if (!productGrid) return;

  // Grab all product column cards (direct children of the grid)
  const productCols = Array.from(productGrid.children);

  // 1. Add "Premium" label to products costing more than N * 100 (63 * 100 = 6300)
  const PREMIUM_THRESHOLD = 63 * 100;

  function parsePrice(col) {
    const priceEl = col.querySelector(".product-card p");
    if (!priceEl) return 0;
    // Strip "Rs." and commas before parsing
    const cleaned = priceEl.textContent.replace(/Rs\.\s*/i, "").replace(/,/g, "").trim();
    const num = parseFloat(cleaned);
    return isNaN(num) ? 0 : num;
  }

  function getProductName(col) {
    const titleEl = col.querySelector(".product-card h3");
    return titleEl ? titleEl.textContent.trim().toLowerCase() : "";
  }

  // Inject Premium badges on page load
  productCols.forEach(function (col) {
    const price = parsePrice(col);
    if (price > PREMIUM_THRESHOLD) {
      const card = col.querySelector(".product-card");
      if (card && !card.querySelector(".premium-label")) {
        const badge = document.createElement("span");
        badge.className = "premium-label";
        badge.textContent = "Premium";
        card.appendChild(badge);
      }
    }
  });

  // 2. Filter logic (Combines Task 1 Category Filter + Live Search)
  function getActiveCategory() {
    const checked = document.querySelector('input[name="cat"]:checked');
    return checked ? checked.value : "all";
  }

  function filterProducts() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const activeCategory = getActiveCategory();
    let visibleCount = 0;

    productCols.forEach(function (col) {
      const name = getProductName(col);
      const category = col.getAttribute("data-category");

      const matchesSearch = query === "" || name.includes(query);
      const matchesCategory = activeCategory === "all" || category === activeCategory;

      if (matchesSearch && matchesCategory) {
        col.style.display = "";
        visibleCount++;
      } else {
        col.style.display = "none";
      }
    });

    // If no card matches, show "No products found" in place of the grid
    if (visibleCount === 0) {
      productGrid.style.display = "none";
      if (noResults) noResults.style.display = "block";
    } else {
      productGrid.style.display = "";
      if (noResults) noResults.style.display = "none";
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterProducts);
  }

  categoryRadios.forEach(function (radio) {
    radio.addEventListener("change", filterProducts);
  });

  // 3. Sort by price button (Toggle between ascending and descending)
  let sortAscending = true;

  if (sortBtn) {
    sortBtn.addEventListener("click", function () {
      // Sort current cards
      const currentCards = Array.from(productGrid.children);
      currentCards.sort(function (a, b) {
        const priceA = parsePrice(a);
        const priceB = parsePrice(b);
        return sortAscending ? priceA - priceB : priceB - priceA;
      });

      // Move existing card elements into new order with appendChild (no innerHTML rewrite)
      currentCards.forEach(function (col) {
        productGrid.appendChild(col);
      });

      // Update button label
      sortBtn.textContent = sortAscending
        ? "Sort by price: Low to High ↑"
        : "Sort by price: High to Low ↓";

      // Toggle for next click
      sortAscending = !sortAscending;
    });
  }

  // Initial pass
  filterProducts();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTask3);
} else {
  initTask3();
}
