# Midterm – Lab Mid Term: Upgrade E-commerce Listing and Product Pages

**Name:** Muhammad Ashar Zia  
**Roll Number:** FA24-BCS-163

## Personal Numbers

| Symbol | Value | How |
|--------|-------|-----|
| N | 63 | Last two digits of FA24-BCS-**163** |
| BP | 663 px | 600 + 63 |
| H | 81° → `hsl(81, 70%, 45%)` | (63 × 7) mod 360 = 441 mod 360 = 81 |
| K | 3 | (63 mod 3) + 3 = 0 + 3 = 3 |

Derived constants used in code:
- Sticky top offset: (63 mod 40) + 70 = 23 + 70 = **93 px**
- Premium price threshold: 63 × 100 = **Rs. 6,300**

---

## Files Changed

| File | Changed for |
|------|-------------|
| `index.html` | Task 1 (category filter inputs/labels), Task 3 (search box, sort button, no-results message, script tag) |
| `product.html` | Task 2 (CSS Grid layout, sticky details container, comprehensive description) |
| `styles.css` | Task 1 (filter CSS and active pill accent), Task 2 (CSS Grid, sticky offset, white container card), Task 3 (premium badge styling) |
| `script.js` | Task 3 (live search, combined category filtering, ascending/descending DOM-based price sort, premium label injection) |
| `README.md` | Documentation of personal numbers, task details, and changes |

---

## Task 1 — CSS-only Category Filter

**What changed:** Added 4 radio inputs as direct siblings of `#product-grid` and 4 `<label>` pills inside `.filter-bar` in `index.html`. Each card received a `data-category` attribute (`paper`, `cleaning`, `bundles` — K = 3).

**How it works (CSS):** The radio inputs are visually hidden (`position: absolute; opacity: 0`). When a radio button is `:checked`, the sibling combinator (`~`) targets the grid to hide non-matching items and display only the matching category cards. The "All" option has no hiding rule and displays all items. The active pill is highlighted with accent color `hsl(81, 70%, 45%)`.

**Why no JS:** Pure CSS `:checked ~` selectors control card visibility and label styling without running any JavaScript.

---

## Task 2 — Product Page: CSS Grid + Sticky Details

**What changed:** Reworked `product.html` layout with CSS Grid using named areas (`image`, `details`, `desc`) inside `.product-layout`. The description text was expanded to allow vertical scrolling.

**How it works:**
- **Below BP (663 px):** Single column layout (`grid-template-areas: "image" "details" "desc"`).
- **At BP (663 px) and wider:** Two columns side-by-side (`grid-template-areas: "image details" "desc desc"`), with description spanning full width underneath.
- **Sticky details box:** Styled with `position: sticky; top: 93px; align-self: start; background: #fff; border-radius: 12px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,.07);` so the panel stays pinned in the viewport with a solid background during scroll.

---

## Task 3 — JavaScript: Live Search, Price Sort, Premium Label

**What changed:** Created `script.js` and linked it at the bottom of `index.html`. Added search input, sort button, and "No products found" container in `index.html`.

**How it works:**
- **Live Search & Category Integration:** An `input` event on `#search-box` and `change` event on category radios filter the cards. A product is shown only if it matches both the active category and the search query (case-insensitive).
- **No Products Found:** If no product passes both filters, `#product-grid` is hidden and `#no-results` is displayed in place of the grid.
- **Price Sort:** The "Sort by price" button toggles between ascending (lowest to highest) and descending orders. Prices are read directly from card text (`.product-card p`) and the existing DOM nodes are rearranged using `productGrid.appendChild(col)` without rewriting `innerHTML`.
- **Premium Label:** On page load, the script scans each product card's price. Any product exceeding N × 100 (Rs. 6,300) dynamically receives a `<span class="premium-label">Premium</span>` badge.

---

## AI Tools Used

- **Antigravity (Google DeepMind)**
