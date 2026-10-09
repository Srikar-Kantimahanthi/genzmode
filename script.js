let products = [];
let currentQuickViewProduct = null;

// =========================================
// PRODUCT GRID
// =========================================

const productGrid = document.getElementById("productGrid");


function createProductCard(product) {

  const card = document.createElement("article");

  card.className = "product-card";

  card.dataset.product = product.id;


  // Generate colour swatches

  const swatches = product.colors
    .map(
      (color, index) => `
        <button
          class="color-swatch"
          style="background-color: ${color};"
          aria-label="Color option ${index + 1}"
        ></button>
      `
    )
    .join("");


  // Sale badge

  const saleBadge = product.oldPrice
    ? `<span class="product-sale">Sale</span>`
    : "";


  card.innerHTML = `

    <!-- IMAGE -->

    <div class="product-image-container">

      <img
        src="${product.front}"
        alt="${product.title}"
        class="product-front-image"
        loading="lazy"
      >

      <img
        src="${product.back}"
        alt="${product.title} alternate view"
        class="product-back-image"
        loading="lazy"
      >


      ${saleBadge}


      <!-- ACTION BAR -->

      <div class="product-actions">

        <button
          class="quick-view-btn"
          data-product="${product.id}"
        >
          Quick View
        </button>

        <div class="action-divider"></div>

        <button
          class="wishlist-btn"
          aria-label="Add ${product.title} to wishlist"
        >

          <svg
            class="heart-icon"
            viewBox="0 0 24 24"
          >

            <path
              d="M20.84 4.61
                 a5.5 5.5 0 0 0-7.78 0
                 L12 5.67
                 l-1.06-1.06
                 a5.5 5.5 0 0 0-7.78 7.78
                 l1.06 1.06
                 L12 21.23
                 l7.78-7.78
                 1.06-1.06
                 a5.5 5.5 0 0 0 0-7.78z"
            />

          </svg>

        </button>


        <button
  type="button"
  class="share-product-btn"
  data-product="${product.id}"
  aria-label="Share ${product.title}"
  title="Share product"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="3"/>
    <circle cx="6" cy="12" r="3"/>
    <circle cx="18" cy="19" r="3"/>
    <path d="m8.7 10.7 6.6-4.4"/>
    <path d="m8.7 13.3 6.6 4.4"/>
  </svg>
</button>

      </div>

    </div>


    <!-- PRODUCT INFO -->

    <div class="product-info">

      <div class="product-category">
        ${product.category}
      </div>

      <h3 class="product-title">
        ${product.title}
      </h3>


      <!-- RATING -->

      <div class="product-rating">

        <span class="rating-stars">
          ★★★★★
        </span>

        <span class="rating-number">
          ${product.rating}
        </span>

      </div>


      <!-- PRICE -->

      <div class="product-price">

        <span class="current-price">
          ₹${product.price.toLocaleString("en-IN")}
        </span>

        ${
          product.oldPrice
            ? `
              <span class="old-price">
                ₹${product.oldPrice.toLocaleString("en-IN")}
              </span>
            `
            : ""
        }

      </div>


      <!-- COLORS -->

      <div class="product-swatches">

        ${swatches}

      </div>

    </div>

  `;


  return card;
}


// =========================================
// HOMEPAGE PRODUCT SHARE
// =========================================

productGrid.addEventListener("click", async function (event) {
  const shareButton = event.target.closest(".share-product-btn");
  if (!shareButton) return;

  const product = products.find(
    item => String(item.id) === String(shareButton.dataset.product)
  );

  if (!product) return;

  const productUrl = product.shopifyHandle
    ? `https://${GENZMODE_SHOPIFY_DOMAIN}/products/${product.shopifyHandle}`
    : window.location.href;

  try {
    if (navigator.share) {
      await navigator.share({
        title: product.title,
        text: `Check out ${product.title} on GENZMODE!`,
        url: productUrl
      });
    } else {
      await navigator.clipboard.writeText(productUrl);
      showWishlistToast("Product link copied!");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Share failed:", error);
      showWishlistToast("Unable to share product");
    }
  }
});




// =========================================
// WISHLIST
// =========================================

let wishlist = JSON.parse(
  localStorage.getItem("genzmodeWishlist")
) || [];

document.addEventListener("click", function (event) {

  const wishlistButton =
    event.target.closest(".wishlist-btn");

  if (!wishlistButton) return;

  const productCard =
    wishlistButton.closest(".product-card");

  if (!productCard) return;

  const productId =
    productCard.dataset.product;

  const product =
    products.find(
      item =>
        String(item.id) ===
        String(productId)
    );

  if (!product) {
    console.log("Wishlist product not found:", productId);
    return;
  }

  const existingIndex =
    wishlist.findIndex(
      item =>
        String(item.id) ===
        String(product.id)
    );

  if (existingIndex === -1) {

  wishlist.push(product);

  wishlistButton.classList.add("active");

  updateWishlistCount();
  showWishlistToast("Added to wishlist");

  console.log(
    "Added to wishlist:",
    product.title
  );



  } else {

    wishlist.splice(existingIndex, 1);

    wishlistButton.classList.remove("active");

    updateWishlistCount();
showWishlistToast("Removed from wishlist");

    console.log(
      "Removed from wishlist:",
      product.title
    );

  }

  localStorage.setItem(
    "genzmodeWishlist",
    JSON.stringify(wishlist)
  );

});

updateWishlistCount();


function restoreWishlistState() {

  document
    .querySelectorAll(".wishlist-btn")
    .forEach(function (wishlistButton) {

      const productCard =
        wishlistButton.closest(".product-card");

      if (!productCard) return;

      const productId =
        productCard.dataset.product;

      const isWishlisted =
        wishlist.some(function (item) {
          return String(item.id) === String(productId);
        });

      wishlistButton.classList.toggle(
        "active",
        isWishlisted
      );

    });

}


function updateWishlistCount() {

  const wishlistCount =
    document.getElementById("wishlistCount");

  if (!wishlistCount) return;

  wishlistCount.textContent =
    wishlist.length;

}


function showWishlistToast(message) {

  let toast =
    document.getElementById("wishlistToast");

  if (!toast) {

    toast =
      document.createElement("div");

    toast.id = "wishlistToast";

    toast.className =
      "wishlist-toast";

    document.body.appendChild(toast);

  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(
    toast.hideTimeout
  );

  toast.hideTimeout =
    setTimeout(function () {

      toast.classList.remove("show");

    }, 2200);

}




// =========================================
// WISHLIST DRAWER
// =========================================

function renderWishlist() {

  const wishlistItems =
    document.getElementById("wishlistItems");

  if (!wishlistItems) return;

  wishlistItems.innerHTML = "";

  if (wishlist.length === 0) {

    wishlistItems.innerHTML = `
      <div style="
        text-align: center;
        padding: 60px 20px;
        color: rgba(243, 223, 174, 0.65);
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        letter-spacing: 1px;
      ">
        Your wishlist is empty.
      </div>
    `;

    return;
  }

  wishlist.forEach(function (product) {

    const item =
      document.createElement("div");

    item.className =
      "wishlist-item";

    item.innerHTML = `
      <img
        src="${product.front}"
        alt="${product.title}"
        class="wishlist-item-image"
      >

      <div class="wishlist-item-info">

        <h3>
          ${product.title}
        </h3>

        <p>
          ₹${Number(product.price).toLocaleString("en-IN")}
        </p>

      <div class="wishlist-item-actions">

  <button
    type="button"
    class="wishlist-add-to-bag-btn"
    data-product="${product.id}"
  >
    ADD TO BAG
  </button>

  <button
    type="button"
    class="wishlist-remove-btn"
    data-product="${product.id}"
  >
    REMOVE
  </button>

</div>

      </div>
    `;

    wishlistItems.appendChild(item);

  });

}




const wishlistNavButton =
  document.getElementById("wishlistNavButton");

const wishlistOverlay =
  document.getElementById("wishlistOverlay");

const wishlistDrawerClose =
  document.getElementById("wishlistDrawerClose");

if (
  wishlistNavButton &&
  wishlistOverlay &&
  wishlistDrawerClose
) {

  wishlistNavButton.addEventListener(
  "click",
  function () {

    renderWishlist();

    wishlistOverlay.classList.add("active");

    document.body.style.overflow = "hidden";

  }
);

  wishlistDrawerClose.addEventListener(
    "click",
    function () {

      wishlistOverlay.classList.remove("active");

      document.body.style.overflow = "";

    }
  );

  wishlistOverlay.addEventListener(
    "click",
    function (event) {

      if (event.target === wishlistOverlay) {

        wishlistOverlay.classList.remove(
          "active"
        );

        document.body.style.overflow = "";

      }

    }
  );

}



// =========================================
// WISHLIST ITEM ACTIONS
// =========================================

document.addEventListener("click", function (event) {

  // =========================================
  // REMOVE FROM WISHLIST
  // =========================================

  const removeButton =
    event.target.closest(".wishlist-remove-btn");

  if (removeButton) {

    const productId =
      removeButton.dataset.product;

    const existingIndex =
      wishlist.findIndex(function (item) {

        return String(item.id) ===
          String(productId);

      });

    if (existingIndex !== -1) {

      const removedProduct =
        wishlist[existingIndex];

      wishlist.splice(existingIndex, 1);

      localStorage.setItem(
        "genzmodeWishlist",
        JSON.stringify(wishlist)
      );

      updateWishlistCount();

      restoreWishlistState();

      renderWishlist();

      showWishlistToast(
        "Removed from wishlist"
      );

      console.log(
        "Removed from wishlist:",
        removedProduct.title
      );

    }

    return;
  }


  // =========================================
  // ADD TO BAG FROM WISHLIST
  // =========================================

  const addToBagButton =
    event.target.closest(
      ".wishlist-add-to-bag-btn"
    );

  if (!addToBagButton) return;

  const productId =
    addToBagButton.dataset.product;

  const product =
    wishlist.find(function (item) {

      return String(item.id) ===
        String(productId);

    });

  if (!product) {

    console.log(
      "Wishlist product not found:",
      productId
    );

    return;
  }

  console.log(
    "Wishlist Add To Bag:",
    product.title
  );

  /*
   * Find the product card currently on the page.
   * We will trigger its existing Quick View button
   * so the existing size/color modal is reused.
   */

  const productCard =
    document.querySelector(
      `.product-card[data-product="${CSS.escape(String(product.id))}"]`
    );

  if (productCard) {

    const quickViewButton =
      productCard.querySelector(
        ".quick-view-btn"
      );

    if (quickViewButton) {

      quickViewButton.click();

      return;

    }

  }

  console.log(
    "Product card not currently available:",
    product.title
  );

});



// =========================================
// QUICK VIEW MODAL
// =========================================

const modal = document.createElement("div");

modal.className = "quick-view-modal";

modal.innerHTML = `

  <div class="quick-view-content">

    <button class="modal-close">
      ×
    </button>

    <img
      id="modalImage"
      src=""
      alt=""
    >

    <div class="quick-view-details">

      <div
        class="modal-category"
        id="modalCategory"
      ></div>

      <h3 id="modalTitle"></h3>

      <p id="modalPrice"></p>


      <!-- SIZE SELECTION -->

      <div class="size-selection">

        <div class="size-header">

          <span class="size-label">
            Select Size
          </span>

          <span class="size-guide">
            Size Guide
          </span>

        </div>


        <div
          class="size-options"
          id="modalSizeOptions"
        >
        </div>


        <!-- COLOR SELECTION -->

        <div class="color-selection">

          <div class="size-label">
            Select Color
          </div>

          <div
            class="color-options"
            id="modalColorOptions"
          >
          </div>

        </div>

      </div>


      <!-- ADD TO BAG -->

<button
  id="addToBagButton"
  class="add-to-bag-btn"
>
  Add to Bag
</button>
    </div>

  </div>

`;

document.body.appendChild(modal);





// =========================================
// OPEN QUICK VIEW
// =========================================

document.addEventListener("click", function (event) {

  const quickViewButton =
    event.target.closest(".quick-view-btn");


  if (!quickViewButton) return;


  // Shopify product IDs are strings
  // Example: gid://shopify/Product/123456789

  const productId =
    quickViewButton.dataset.product;


  const product =
    products.find(
      item => item.id === productId
    );


  if (!product) return;

  currentQuickViewProduct = product;


  // =========================================
  // PRODUCT INFORMATION
  // =========================================

  document.getElementById("modalImage").src =
    product.front;

  document.getElementById("modalImage").alt =
    product.title;

  document.getElementById("modalCategory").textContent =
    product.category;

  document.getElementById("modalTitle").textContent =
    product.title;

  document.getElementById("modalPrice").textContent =
    `₹${product.price.toLocaleString("en-IN")}`;


  // =========================================
  // LOAD SHOPIFY SIZES
  // =========================================

  const modalSizeOptions =
    document.getElementById("modalSizeOptions");

  modalSizeOptions.innerHTML = "";


  const productSizes =
    product.sizes || [];


  if (productSizes.length > 0) {

    productSizes.forEach(size => {

      const button =
        document.createElement("button");

      button.className = "size-btn";

      button.textContent = size;

      button.dataset.size = size;

      modalSizeOptions.appendChild(button);

    });

  } else {

    modalSizeOptions.innerHTML = `
      <span style="
        font-size: 13px;
        opacity: 0.6;
      ">
        No sizes available
      </span>
    `;

  }


  // =========================================
  // LOAD SHOPIFY COLORS
  // =========================================

  const modalColorOptions =
    document.getElementById("modalColorOptions");

  modalColorOptions.innerHTML = "";


  const productColors =
    product.colors || [];


  if (productColors.length > 0) {

    productColors.forEach(color => {

  const button =
    document.createElement("button");

  button.className = "color-btn";

  button.dataset.color = color;

  button.type = "button";

  button.style.backgroundColor = color;

  button.setAttribute(
    "aria-label",
    color
  );

  modalColorOptions.appendChild(button);

});
  } else {

    modalColorOptions.innerHTML = `
      <span style="
        font-size: 13px;
        opacity: 0.6;
      ">
        No colors available
      </span>
    `;

  }


  // =========================================
  // OPEN MODAL
  // =========================================

  modal.classList.add("active");

  document.body.style.overflow = "hidden";

});



// =========================================
// SIZE SELECTION
// =========================================

modal.addEventListener("click", function (event) {

  const sizeButton =
    event.target.closest(".size-btn");


  if (!sizeButton) return;


  const allSizeButtons =
    modal.querySelectorAll(".size-btn");


  allSizeButtons.forEach((button) => {

    button.classList.remove("active");

  });


  sizeButton.classList.add("active");

});



function getSelectedShopifyVariant(product) {

  const selectedSizeButton =
    modal.querySelector(".size-btn.active");

  const selectedColorButton =
    modal.querySelector(".color-btn.active");


  const selectedSize =
    selectedSizeButton?.dataset.size || "";

  const selectedColor =
    selectedColorButton?.dataset.color || "";


  const variants =
    product.shopifyVariants || [];


  const selectedVariant =
    variants.find(variant => {

      const sizeOption =
        variant.selectedOptions?.find(
          option =>
            option.name?.toLowerCase() === "size"
        );


      const colorOption =
        variant.selectedOptions?.find(
          option =>
            option.name?.toLowerCase() === "color"
        );


      const sizeMatches =
        !selectedSize ||
        sizeOption?.value === selectedSize;


      const colorMatches =
        !selectedColor ||
        colorOption?.value === selectedColor;


      return sizeMatches && colorMatches;

    });


  return selectedVariant || null;

}


// =========================================
// QUICK VIEW - ADD TO BAG
// =========================================

const addToBagButton =
  document.getElementById("addToBagButton");

if (addToBagButton) {

  addToBagButton.addEventListener("click", async function () {

    if (!currentQuickViewProduct) {
      alert("Please select a product.");
      return;
    }

    const selectedVariant =
      getSelectedShopifyVariant(currentQuickViewProduct);

    if (!selectedVariant) {
      alert("Please select a size.");
      return;
    }

    try {

      addToBagButton.disabled = true;
      addToBagButton.textContent = "Adding...";

      const cart =
        await addToShopifyCart(selectedVariant, 1);

      localStorage.setItem(
        "genzmodeShopifyCartId",
        cart.id
      );

      if (cart.checkoutUrl) {
        localStorage.setItem(
          "genzmodeShopifyCheckoutUrl",
          cart.checkoutUrl
        );
      }

      
      // =========================================
// GET UPDATED SHOPIFY CART WITH LINE ID
// =========================================

const updatedCart =
  await getCurrentShopifyCart(cart.id);

if (!updatedCart) {
  throw new Error(
    "Unable to retrieve Shopify cart."
  );
}

// Find the exact cart line
const shopifyCartLine =
  updatedCart.lines?.nodes?.find(
    line =>
      line.merchandise?.id ===
      selectedVariant.id
  );

if (!shopifyCartLine) {
  throw new Error(
    "Shopify cart line not found."
  );
}

// =========================================
// GET SELECTED SIZE / COLOR
// =========================================

const selectedSize =
  selectedVariant.selectedOptions?.find(
    option =>
      option.name?.toLowerCase() === "size"
  )?.value || "";

const selectedColor =
  selectedVariant.selectedOptions?.find(
    option =>
      option.name?.toLowerCase() === "color"
  )?.value || "";

// =========================================
// CREATE LOCAL BAG ITEM
// =========================================

const bagItem = {

  productId:
    currentQuickViewProduct.id,

  title:
    currentQuickViewProduct.title,

  price:
    Number(
      selectedVariant.price?.amount ||
      currentQuickViewProduct.price
    ),

  image:
    currentQuickViewProduct.front,

  category:
    currentQuickViewProduct.category,

  size:
    selectedSize,

  color:
    selectedColor,

  quantity:
    shopifyCartLine.quantity,

  shopifyProductId:
    currentQuickViewProduct.shopifyId || null,

  shopifyVariantId:
    selectedVariant.id,

  shopifyCartLineId:
    shopifyCartLine.id,

  currencyCode:
    selectedVariant.price?.currencyCode ||
    "INR"
};

// =========================================
// SAVE LOCAL BAG
// =========================================

let bag = [];

try {

  bag =
    JSON.parse(
      localStorage.getItem("genzmodeBag")
    ) || [];

} catch (error) {

  console.warn(
    "Unable to read existing bag.",
    error
  );

  bag = [];
}

// =========================================
// CHECK IF VARIANT ALREADY EXISTS
// =========================================

const existingItemIndex =
  bag.findIndex(
    item =>
      item.shopifyVariantId ===
      selectedVariant.id
  );

// =========================================
// UPDATE EXISTING ITEM
// =========================================

if (existingItemIndex !== -1) {

  bag[existingItemIndex] = {
    ...bag[existingItemIndex],
    quantity:
      shopifyCartLine.quantity,
    shopifyCartLineId:
      shopifyCartLine.id
  };

}

// =========================================
// ADD NEW ITEM
// =========================================

else {

  bag.push(bagItem);

}

// =========================================
// SAVE BAG
// =========================================

localStorage.setItem(
  "genzmodeBag",
  JSON.stringify(bag)
);

localStorage.setItem(
  "genzmodeShopifyCartId",
  updatedCart.id
);

if (updatedCart.checkoutUrl) {

  localStorage.setItem(
    "genzmodeShopifyCheckoutUrl",
    updatedCart.checkoutUrl
  );

}

console.log(
  "GENZMODE Bag Updated:",
  bag
);

// =========================================
// CLOSE QUICK VIEW
// =========================================

modal.classList.remove("active");
document.body.style.overflow = "";

// =========================================
// UPDATE BAG COUNT ONLY
// =========================================

if (typeof updateBagCountOnLoad === "function") {
  updateBagCountOnLoad();
}

showWishlistToast("Added to bag");

console.log("Add to Bag process completed.");




    } catch (error) {

      console.error("Add to Bag failed:", error);

      alert(
        error.message ||
        "Unable to add product to bag."
      );

    } finally {

      addToBagButton.disabled = false;
      addToBagButton.textContent = "Add to Bag";

    }

  });

}



// =========================================
// ADD PRODUCT TO SHOPIFY CART
// =========================================

async function addToShopifyCart(variant, quantity = 1) {

  const existingCartId =
    localStorage.getItem("genzmodeShopifyCartId");

  // =========================================
  // EXISTING CART
  // =========================================

  if (existingCartId) {

    const mutation = `
      mutation cartLinesAdd(
        $cartId: ID!,
        $lines: [CartLineInput!]!
      ) {
        cartLinesAdd(
          cartId: $cartId,
          lines: $lines
        ) {
          cart {
            id
            checkoutUrl
            totalQuantity
          }

          userErrors {
            field
            message
          }
        }
      }
    `;

    const data =
      await genzmodeShopifyRequest(
        mutation,
        {
          cartId: existingCartId,
          lines: [
            {
              merchandiseId: variant.id,
              quantity: quantity
            }
          ]
        }
      );

    const result = data.cartLinesAdd;

    if (result.userErrors?.length) {
      throw new Error(
        result.userErrors[0].message
      );
    }

    return result.cart;
  }

  // =========================================
  // CREATE NEW CART
  // =========================================

  const mutation = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          id
          checkoutUrl
          totalQuantity
        }

        userErrors {
          field
          message
        }
      }
    }
  `;

  const data =
    await genzmodeShopifyRequest(
      mutation,
      {
        input: {
          lines: [
            {
              merchandiseId: variant.id,
              quantity: quantity
            }
          ]
        }
      }
    );

  const result = data.cartCreate;

  if (result.userErrors?.length) {
    throw new Error(
      result.userErrors[0].message
    );
  }

  return result.cart;
}



// =========================================
// COLOR SELECTION
// =========================================

modal.addEventListener("click", function (event) {

  const colorButton =
    event.target.closest(".color-btn");


  if (!colorButton) return;


  const allColorButtons =
    modal.querySelectorAll(".color-btn");


  allColorButtons.forEach((button) => {

    button.classList.remove("active");

  });


  colorButton.classList.add("active");

});




// =========================================
// CLOSE MODAL
// =========================================

function closeQuickView() {

  modal.classList.remove("active");

  document.body.style.overflow = "";

}


modal.addEventListener("click", function (event) {

  if (
    event.target === modal ||
    event.target.closest(".modal-close")
  ) {

    closeQuickView();

  }

});


document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {

    closeQuickView();

  }

});



// =========================================
// SHOPIFY HOMEPAGE CATEGORIES
// =========================================

const categoryCarousel =
  document.getElementById("categoryCarousel");

const categoryPrev =
  document.querySelector(".category-prev");

const categoryNext =
  document.querySelector(".category-next");


// =========================================
// LOAD SHOPIFY COLLECTIONS
// =========================================

async function loadHomepageShopifyCollections() {

  const query = `
  {
    collections(first: 50) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
        }
      }
    }
  }
`;

  try {

    const data =
      await shopifyStorefrontRequest(query);

    const collections =
      data.collections?.nodes || [];

    console.log(
      "Homepage Shopify Collections:",
      collections
    );


    // Clear existing static category cards

    categoryCarousel.innerHTML = "";


    // No collections

    if (collections.length === 0) {

      categoryCarousel.innerHTML = `
        <p style="
          width:100%;
          text-align:center;
          padding:40px;
        ">
          No categories available.
        </p>
      `;

      return;

    }


    // Create category cards

    collections.forEach(collection => {

      const card =
        document.createElement("a");

      card.className =
        "category-card";

      card.href =
        `category.html?category=${encodeURIComponent(collection.handle)}`;


      const title =
        collection.title || collection.handle;


      card.innerHTML = `

        ${
          collection.image?.url
            ? `
              <img
                src="${collection.image.url}"
                alt="${collection.image.altText || title}"
              >
            `
            : ""
        }

        <div class="category-overlay">

          <span>
            ${title.toUpperCase()}
          </span>

          <small>
            Explore
          </small>

        </div>

      `;


      categoryCarousel.appendChild(card);

    });


    console.log(
      `Rendered ${collections.length} Shopify categories.`
    );

  } catch (error) {

    console.error(
      "Homepage Shopify collections failed:",
      error
    );

  }

}



// =========================================
// CATEGORY CAROUSEL CONTROLS
// =========================================

if (categoryNext && categoryCarousel) {

  categoryNext.addEventListener("click", () => {

    categoryCarousel.scrollBy({
      left:
        categoryCarousel.clientWidth * 0.85,
      behavior: "smooth"
    });

  });

}


if (categoryPrev && categoryCarousel) {

  categoryPrev.addEventListener("click", () => {

    categoryCarousel.scrollBy({
      left:
        -categoryCarousel.clientWidth * 0.85,
      behavior: "smooth"
    });

  });

}




/* =========================================
   BAG DRAWER
========================================= */

const bagButton = document.getElementById("bagButton");
const bagDrawer = document.getElementById("bagDrawer");
const bagOverlay = document.getElementById("bagOverlay");
const bagClose = document.getElementById("bagClose");


function openBag() {

  bagDrawer.classList.add("active");

  bagOverlay.classList.add("active");

  document.body.style.overflow = "hidden";

}


function closeBag() {

  bagDrawer.classList.remove("active");

  bagOverlay.classList.remove("active");

  document.body.style.overflow = "";

}


if (bagButton) {

  bagButton.addEventListener(
    "click",
    openBag
  );

}


if (bagClose) {

  bagClose.addEventListener(
    "click",
    closeBag
  );

}


if (bagOverlay) {

  bagOverlay.addEventListener(
    "click",
    closeBag
  );

}



/* =========================================
   BAG CONTENT
========================================= */

function getGenZModeBag() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "genzmodeBag"
      )
    ) || [];

  } catch (error) {

    console.error(
      "Unable to read GENZMODE bag:",
      error
    );

    return [];

  }

}


function formatBagPrice(
  price,
  currency = "INR"
) {

  const amount =
    Number(price) || 0;


  if (currency === "INR") {

    return `₹${amount.toLocaleString("en-IN")}`;

  }


  return `${currency} ${amount.toLocaleString("en-IN")}`;

}


function renderBagDuplicate() {

  const bagContent =
    document.getElementById("bagContent");

  const bagCount =
    document.getElementById("bagCount");

  const bagSubtotal =
    document.getElementById("bagSubtotal");


  if (
    !bagContent ||
    !bagCount ||
    !bagSubtotal
  ) return;


  const bag =
    getGenZModeBag();




  /* ================================
     TOTAL QUANTITY
  ================================= */

  const totalQuantity =
    bag.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );


  bagCount.textContent =
    totalQuantity;


  /* ================================
     EMPTY BAG
  ================================= */

  if (bag.length === 0) {

    bagContent.innerHTML = `
      <div class="bag-empty">

        <div class="bag-empty-icon">
          &#128717;
        </div>

        <h3>Your bag is empty</h3>

        <p>
          Discover something you'll love.
        </p>

      </div>
    `;

    bagSubtotal.textContent =
      "₹0";

    return;

  }


  /* ================================
     BAG ITEMS
  ================================= */

  let subtotal = 0;


  bagContent.innerHTML =
    bag.map(
      (item, index) => {

        const quantity =
          Number(item.quantity || 1);

        const price =
          Number(item.price || 0);


        subtotal +=
          price * quantity;


        return `
          <div class="bag-item">

            <img
              src="${item.image || ""}"
              alt="${item.title || "Product"}"
              class="bag-item-image"
            >

            <div class="bag-item-details">

              <h3>
                ${item.title || "Product"}
              </h3>

              ${
                item.size
                  ? `
                    <p class="bag-item-meta">
                      Size: ${item.size}
                    </p>
                  `
                  : ""
              }

              ${
                item.color
                  ? `
                    <p class="bag-item-meta">
                      Color: ${item.color}
                    </p>
                  `
                  : ""
              }

              <div class="bag-item-bottom">

                <span class="bag-item-price">
                  ${formatBagPrice(
                    price,
                    item.currencyCode || "INR"
                  )}
                </span>

                <div class="bag-quantity-controls">

                  <button
                    class="bag-quantity-btn"
                    type="button"
                    data-bag-action="decrease"
                    data-bag-index="${index}"
                  >
                    −
                  </button>

                  <span class="bag-quantity-number">
                    ${quantity}
                  </span>

                  <button
                    class="bag-quantity-btn"
                    type="button"
                    data-bag-action="increase"
                    data-bag-index="${index}"
                  >
                    +
                  </button>

                </div>

              </div>


              <button
                class="bag-remove"
                type="button"
                data-bag-action="remove"
                data-bag-index="${index}"
              >
                Remove
              </button>

            </div>

          </div>
        `;

      }
    )
    .join("");


  /* =========================================
     SUBTOTAL
  ========================================= */

  bagSubtotal.textContent =
    `₹${subtotal.toLocaleString("en-IN")}`;


  /* =========================================
     BUTTON EVENTS
  ========================================= */

  bagContent
    .querySelectorAll(
      "[data-bag-action]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          const action =
            button.dataset.bagAction;

          const index =
            Number(
              button.dataset.bagIndex
            );


          await updateBagQuantity(
            index,
            action
          );

        }
      );

    });

}


/* =========================================
   UPDATE BAG WHEN OPENED
========================================= */

if (bagButton) {

  bagButton.addEventListener(
    "click",
    () => {

      renderBag();

    }
  );

}


/* =========================================
   UPDATE BAG WHEN STORAGE CHANGES
========================================= */

window.addEventListener(
  "storage",
  (event) => {

    if (
      event.key === "genzmodeBag"
    ) {

      renderBag();

    }

  }
);


/* =========================================
   UPDATE BAG FROM CUSTOM EVENT
========================================= */

window.addEventListener(
  "genzmodeBagUpdated",
  () => {

    renderBag();

  }
);


/* =========================================
   INITIAL BAG COUNT
========================================= */

function renderBag() {

  const bagContent =
    document.getElementById(
      "bagContent"
    );

  const bagCount =
    document.getElementById(
      "bagCount"
    );

  const bagSubtotal =
    document.getElementById(
      "bagSubtotal"
    );


  if (
    !bagContent ||
    !bagCount ||
    !bagSubtotal
  ) return;


  const bag =
    getGenZModeBag();


  /* =========================================
     TOTAL QUANTITY
  ========================================= */

  const totalQuantity =
    bag.reduce(
      (total, item) =>
        total +
        Number(item.quantity || 0),
      0
    );


  bagCount.textContent =
    totalQuantity;


  /* =========================================
     EMPTY BAG
  ========================================= */

  if (bag.length === 0) {

    bagContent.innerHTML = `
      <div class="bag-empty">

        <div class="bag-empty-icon">
          &#128717;
        </div>

        <h3>Your bag is empty</h3>

        <p>
          Discover something you'll love.
        </p>

      </div>
    `;

    bagSubtotal.textContent =
      "₹0";

    return;

  }


  /* =========================================
     BAG ITEMS
  ========================================= */

  let subtotal = 0;


  bagContent.innerHTML =
    bag.map(
      (item, index) => {

        const quantity =
          Number(item.quantity || 1);

        const price =
          Number(item.price || 0);


        subtotal +=
          price * quantity;


        return `
          <div class="bag-item">

            <img
              src="${item.image || ""}"
              alt="${item.title || "Product"}"
              class="bag-item-image"
            >

            <div class="bag-item-details">

              <h3>
                ${item.title || "Product"}
              </h3>

              ${
                item.size
                  ? `
                    <p class="bag-item-meta">
                      Size: ${item.size}
                    </p>
                  `
                  : ""
              }

              ${
                item.color
                  ? `
                    <p class="bag-item-meta">
                      Color: ${item.color}
                    </p>
                  `
                  : ""
              }

              <div class="bag-item-bottom">

                <span class="bag-item-price">

                  ${formatBagPrice(
                    price,
                    item.currencyCode || "INR"
                  )}

                </span>


                <div class="bag-quantity-controls">

                  <button
                    class="bag-quantity-btn"
                    type="button"
                    data-bag-action="decrease"
                    data-bag-index="${index}"
                  >
                    −
                  </button>

                  <span class="bag-quantity-number">
                    ${quantity}
                  </span>

                  <button
                    class="bag-quantity-btn"
                    type="button"
                    data-bag-action="increase"
                    data-bag-index="${index}"
                  >
                    +
                  </button>

                </div>

              </div>


              <button
                class="bag-remove"
                type="button"
                data-bag-action="remove"
                data-bag-index="${index}"
              >
                Remove
              </button>

            </div>

          </div>
        `;

      }
    )
    .join("");


  /* =========================================
     SUBTOTAL
  ========================================= */

  bagSubtotal.textContent =
    `₹${subtotal.toLocaleString("en-IN")}`;


  /* =========================================
     BUTTON EVENTS
  ========================================= */

  bagContent
    .querySelectorAll(
      "[data-bag-action]"
    )
    .forEach(button => {

      button.addEventListener(
        "click",
        async () => {

          const action =
            button.dataset.bagAction;

          const index =
            Number(
              button.dataset.bagIndex
            );


          await updateBagQuantity(
            index,
            action
          );

        }
      );

    });

}



// =========================================
// SHOPIFY CART
// =========================================

const GENZMODE_SHOPIFY_DOMAIN =
  "jeh1wh-jt.myshopify.com";


const GENZMODE_SHOPIFY_API_VERSION =
  "2026-07";


const GENZMODE_SHOPIFY_ENDPOINT =
  `https://${GENZMODE_SHOPIFY_DOMAIN}/api/${GENZMODE_SHOPIFY_API_VERSION}/graphql.json`;



// =========================================
// SHOPIFY REQUEST
// =========================================

async function genzmodeShopifyRequest(
  query,
  variables = {}
) {

  const response =
    await fetch(
      GENZMODE_SHOPIFY_ENDPOINT,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          query,
          variables
        })

      }
    );


  const result =
    await response.json();


  if (
    !response.ok ||
    result.errors
  ) {

    

    console.error(
  "Shopify Storefront API Error:",
  JSON.stringify(
    result.errors || result,
    null,
    2
  )
);


    throw new Error(
      "Shopify Storefront API request failed."
    );

  }


  return result.data;

}



// =========================================
// UPDATE SHOPIFY CART LINE QUANTITY
// =========================================

async function updateShopifyCartLineQuantity(
  cartId,
  cartLineId,
  quantity
) {

  const mutation = `
    mutation cartLinesUpdate(
      $cartId: ID!,
      $lines: [CartLineUpdateInput!]!
    ) {

      cartLinesUpdate(
        cartId: $cartId,
        lines: $lines
      ) {

        cart {

          id
          checkoutUrl
          totalQuantity

          lines(first: 100) {

            nodes {

              id
              quantity

              merchandise {

                ... on ProductVariant {
                  id
                }

              }

            }

          }

        }


        userErrors {

          field
          message

        }

      }

    }
  `;


  const variables = {

    cartId: cartId,

    lines: [

      {
        id: cartLineId,
        quantity: quantity
      }

    ]

  };


  const data =
    await genzmodeShopifyRequest(
      mutation,
      variables
    );


  const result =
    data.cartLinesUpdate;


  if (
    result.userErrors &&
    result.userErrors.length > 0
  ) {

    console.error(
      "Shopify Cart Update Errors:",
      result.userErrors
    );


    throw new Error(
      result.userErrors[0].message
    );

  }


  if (!result.cart) {

    throw new Error(
      "Unable to update Shopify cart."
    );

  }


  return result.cart;

}



// =========================================
// REMOVE SHOPIFY CART LINE
// =========================================

async function removeShopifyCartLine(
  cartId,
  cartLineId
) {

  const mutation = `
    mutation cartLinesRemove(
      $cartId: ID!,
      $lineIds: [ID!]!
    ) {

      cartLinesRemove(
        cartId: $cartId,
        lineIds: $lineIds
      ) {

        cart {

          id
          checkoutUrl
          totalQuantity

          lines(first: 100) {

            nodes {

              id
              quantity

              merchandise {

                ... on ProductVariant {
                  id
                }

              }

            }

          }

        }


        userErrors {

          field
          message

        }

      }

    }
  `;


  const variables = {

    cartId: cartId,

    lineIds: [
      cartLineId
    ]

  };


  const data =
    await genzmodeShopifyRequest(
      mutation,
      variables
    );


  const result =
    data.cartLinesRemove;


  if (
    result.userErrors &&
    result.userErrors.length > 0
  ) {

    console.error(
      "Shopify Cart Remove Errors:",
      result.userErrors
    );


    throw new Error(
      result.userErrors[0].message
    );

  }


  if (!result.cart) {

    throw new Error(
      "Unable to remove item from Shopify cart."
    );

  }


  return result.cart;

}



// =========================================
// HANDLE BAG QUANTITY / REMOVE
// =========================================

async function updateBagQuantity(
  bagIndex,
  action
) {

  try {

    let bag =
      JSON.parse(
        localStorage.getItem(
          "genzmodeBag"
        )
      ) || [];


    const item =
      bag[bagIndex];


    if (!item) {

      console.error(
        "Bag item not found."
      );

      return;

    }


    const cartId =
      localStorage.getItem(
        "genzmodeShopifyCartId"
      );


    if (!cartId) {

      throw new Error(
        "Shopify cart not found."
      );

    }


    if (!item.shopifyCartLineId) {

      throw new Error(
        "Shopify cart line ID not found."
      );

    }


    // =========================================
    // REMOVE
    // =========================================

    if (action === "remove") {

      await removeShopifyCartLine(
        cartId,
        item.shopifyCartLineId
      );


      bag.splice(
        bagIndex,
        1
      );

    }


    // =========================================
    // INCREASE / DECREASE
    // =========================================

    else {

      let newQuantity =
        Number(item.quantity) || 1;


      if (action === "increase") {

        newQuantity += 1;

      }


      if (action === "decrease") {

        newQuantity -= 1;

      }


      // If quantity reaches zero,
      // remove the Shopify line.

      if (newQuantity <= 0) {

        await removeShopifyCartLine(
          cartId,
          item.shopifyCartLineId
        );


        bag.splice(
          bagIndex,
          1
        );

      }


      // Otherwise update Shopify quantity.

      else {

        await updateShopifyCartLineQuantity(
          cartId,
          item.shopifyCartLineId,
          newQuantity
        );


        bag[bagIndex].quantity =
          newQuantity;

      }

    }


    // =========================================
    // SAVE LOCAL BAG
    // =========================================

    localStorage.setItem(
      "genzmodeBag",
      JSON.stringify(bag)
    );


    // =========================================
    // UPDATE CHECKOUT URL
    // =========================================

    const updatedCart =
      await getCurrentShopifyCart(
        cartId
      );


    if (updatedCart?.checkoutUrl) {

      localStorage.setItem(
        "genzmodeShopifyCheckoutUrl",
        updatedCart.checkoutUrl
      );

    }


    // =========================================
    // REFRESH BAG UI
    // =========================================

    renderBag();

    if (action === "remove") {
  showWishlistToast("Removed from bag");
}


  } catch (error) {

    console.error(
      "BAG UPDATE ERROR:",
      error
    );


    alert(
      error.message ||
      "Unable to update bag."
    );

  }

}



// =========================================
// GET CURRENT SHOPIFY CART
// =========================================

async function getCurrentShopifyCart(
  cartId
) {

  const query = `
    query getCart($cartId: ID!) {

      cart(id: $cartId) {

        id
        checkoutUrl
        totalQuantity

        lines(first: 100) {

          nodes {

            id
            quantity

            merchandise {

              ... on ProductVariant {

                id

              }

            }

          }

        }

      }

    }
  `;


  const data =
    await genzmodeShopifyRequest(
      query,
      {
        cartId: cartId
      }
    );


  return data.cart;

}



// =========================================
// SHOPIFY CHECKOUT
// =========================================

const bagCheckout =
  document.getElementById(
    "bagCheckout"
  );


if (bagCheckout) {

  bagCheckout.addEventListener(
    "click",
    async () => {

      try {

        const cartId =
          localStorage.getItem(
            "genzmodeShopifyCartId"
          );


        if (!cartId) {

          alert(
            "Your bag is empty."
          );

          return;

        }


        const cart =
          await getCurrentShopifyCart(
            cartId
          );


        if (
          !cart ||
          !cart.checkoutUrl
        ) {

          alert(
            "Unable to open checkout."
          );

          return;

        }


        localStorage.setItem(
          "genzmodeShopifyCheckoutUrl",
          cart.checkoutUrl
        );


        window.location.href =
          cart.checkoutUrl;


      } catch (error) {

        console.error(
          "CHECKOUT ERROR:",
          error
        );


        alert(
          "Unable to proceed to checkout."
        );

      }

    }
  );

}



// =========================================
// BAG COUNT - PAGE LOAD SYNC
// =========================================

function updateBagCountOnLoad() {

  const bagCount =
    document.getElementById(
      "bagCount"
    );


  if (!bagCount) return;


  const bag =
    JSON.parse(
      localStorage.getItem(
        "genzmodeBag"
      )
    ) || [];


  const totalQuantity =
    bag.reduce(
      (total, item) =>
        total +
        (Number(item.quantity) || 0),
      0
    );


  bagCount.textContent =
    totalQuantity;

}


updateBagCountOnLoad();




// =========================================
// SHOPIFY CONFIGURATION
// =========================================

const SHOPIFY_DOMAIN =
  "jeh1wh-jt.myshopify.com";


const SHOPIFY_API_VERSION =
  "2026-07";


const SHOPIFY_STOREFRONT_ENDPOINT =
  `https://${SHOPIFY_DOMAIN}/api/${SHOPIFY_API_VERSION}/graphql.json`;



// =========================================
// SHOPIFY REQUEST HELPER
// =========================================

async function shopifyStorefrontRequest(
  query,
  variables = {}
) {

  const response =
    await fetch(
      SHOPIFY_STOREFRONT_ENDPOINT,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          query,
          variables
        })

      }
    );


  const result =
    await response.json();


  if (
    !response.ok ||
    result.errors
  ) {

    console.error(
      "Shopify Storefront API Error:",
      result.errors || result
    );


    throw new Error(
      "Shopify Storefront API request failed."
    );

  }


  return result.data;

}



// =========================================
// INITIALIZE HOMEPAGE CATEGORIES
// =========================================

loadHomepageShopifyCollections();



// =========================================
// SHOPIFY HOMEPAGE PRODUCTS
// =========================================

async function loadHomepageShopifyProducts() {

  const query = `
    {
      products(first: 50) {

        nodes {

          id
          title
          handle
          description
          productType
          createdAt
          featuredImage {

            url
            altText

          }

          images(first: 10) {

            nodes {

              url
              altText

            }

          }

          variants(first: 100) {

            nodes {

              id
              title

              price {

                amount
                currencyCode

              }

              compareAtPrice {

                amount
                currencyCode

              }

              selectedOptions {

                name
                value

              }

            }

          }

        }

      }

    }
  `;


  try {

    const data =
      await shopifyStorefrontRequest(
        query
      );


    const shopifyProducts =
      data.products?.nodes || [];


    console.log(
      "Homepage Shopify Products:",
      shopifyProducts
    );



    // Clear existing homepage products

    productGrid.innerHTML = "";


    // No products

    if (
      shopifyProducts.length === 0
    ) {

      productGrid.innerHTML = `
        <p style="
          grid-column: 1 / -1;
          text-align: center;
          padding: 40px;
        ">
          No products available.
        </p>
      `;

      return;

    }


    // =========================================
    // CONVERT SHOPIFY PRODUCTS
    // =========================================

    products =
      shopifyProducts.map(
        (shopifyProduct) => {

          const variants =
            shopifyProduct
              .variants?.nodes || [];


          const firstVariant =
            variants[0];


          const price =
            Number(
              firstVariant
                ?.price
                ?.amount || 0
            );


          const oldPrice =
            firstVariant
              ?.compareAtPrice
              ?.amount
              ? Number(
                  firstVariant
                    .compareAtPrice
                    .amount
                )
              : null;


          // =========================================
          // GET SIZES
          // =========================================

          const sizes = [
            ...new Set(

              variants
                .map(
                  variant => {

                    const option =
                      variant
                        .selectedOptions
                        ?.find(
                          option =>
                            option.name
                              .toLowerCase() ===
                            "size"
                        );


                    return option?.value;

                  }
                )
                .filter(Boolean)

            )
          ];


          // =========================================
          // GET COLORS
          // =========================================

          const colors = [
            ...new Set(

              variants
                .map(
                  variant => {

                    const option =
                      variant
                        .selectedOptions
                        ?.find(
                          option =>
                            option.name
                              .toLowerCase() ===
                            "color"
                        );


                    return option?.value;

                  }
                )
                .filter(Boolean)

            )
          ];


          return {

            id:
              shopifyProduct.id,

            title:
              shopifyProduct.title,

            category:
              shopifyProduct.productType ||
              "Collection",

            price:
              price,

            oldPrice:
              oldPrice,

            createdAt: shopifyProduct.createdAt,

            rating:
              0,

            reviews:
              0,

            front:
              shopifyProduct
                .featuredImage
                ?.url ||
              "",

            back:
              shopifyProduct
                .images
                ?.nodes?.[1]
                ?.url ||
              shopifyProduct
                .featuredImage
                ?.url ||
              "",

            colors:
              colors,

            sizes:
              sizes,

            shopifyId:
              shopifyProduct.id,

            shopifyHandle:
              shopifyProduct.handle,

            shopifyVariants:
              variants,

            isShopifyProduct:
              true

          };

        }
      );


    // =========================================
    // RENDER SHOPIFY PRODUCTS
    // =========================================

    products.forEach(
      product => {

        productGrid.appendChild(
          createProductCard(
            product
          )
        );

      }
    );

    restoreWishlistState();

    updateWishlistCount();


    console.log(
      `Rendered ${products.length} Shopify homepage products.`
    );


  } catch (error) {

    console.error(
      "Homepage Shopify products failed:",
      error
    );


    productGrid.innerHTML = `
      <p style="
        grid-column: 1 / -1;
        text-align: center;
        padding: 40px;
      ">
        Unable to load products.
      </p>
    `;

  }

}



// =========================================
// INITIALIZE HOMEPAGE PRODUCTS
// =========================================

loadHomepageShopifyProducts();




/* =========================================
   SEARCH OVERLAY
========================================= */

const searchButton =
  document.getElementById("searchButton");

const searchOverlay =
  document.getElementById("searchOverlay");

const searchClose =
  document.getElementById("searchClose");

const searchInput =
  document.getElementById("searchInput");

const searchClear =
  document.getElementById("searchClear");


/* OPEN SEARCH */

if (searchButton) {

  searchButton.addEventListener(
    "click",
    function () {

      searchOverlay.classList.add("active");

      setTimeout(() => {
        searchInput.focus();
      }, 300);

      document.body.style.overflow = "hidden";

    }
  );

}


/* CLOSE SEARCH */

function closeSearch() {

  searchOverlay.classList.remove("active");

  searchInput.value = "";

  searchClear.classList.remove("visible");

  document.body.style.overflow = "";

}


if (searchClose) {

  searchClose.addEventListener(
    "click",
    closeSearch
  );

}


/* CLEAR SEARCH */

if (searchClear) {

  searchClear.addEventListener(
    "click",
    function () {

      searchInput.value = "";

      searchInput.focus();

      searchClear.classList.remove("visible");

    }
  );

}


/* ESC KEY */

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      searchOverlay.classList.contains("active")
    ) {

      closeSearch();

    }

  }
);


/* SHOW / HIDE CLEAR BUTTON */

if (searchInput) {

  searchInput.addEventListener(
    "input",
    function () {

      if (searchInput.value.trim()) {

        searchClear.classList.add("visible");

      } else {

        searchClear.classList.remove("visible");

      }

    }
  );

}


/* =========================================
   LIVE PRODUCT SEARCH
========================================= */

if (searchInput) {

  searchInput.addEventListener(
    "input",
    function () {

      const searchTerm =
        searchInput.value
          .trim()
          .toLowerCase();

      const searchResults =
        document.getElementById("searchResults");

      if (!searchResults) return;

      /* Empty search */

      if (!searchTerm) {

        searchResults.innerHTML = "";

        return;

      }

      /* Search Shopify products */

      const matchedProducts =
        products.filter(product =>
          product.title
            ?.toLowerCase()
            .includes(searchTerm)
        );

      /* No results */

      if (matchedProducts.length === 0) {

        searchResults.innerHTML = `
          <div class="search-empty">
            NO PRODUCTS FOUND
          </div>
        `;

        return;

      }

      /* Display results */

      searchResults.innerHTML =
  matchedProducts
    .map(product => `
      
      <div
        class="search-result-item"
        data-product="${product.id}"
      >

        <img
          src="${product.front || ""}"
          alt="${product.title}"
        >

        <div class="search-result-info">

          <h3>
            ${product.title}
          </h3>

          <p>
            ₹${product.price}
          </p>

        </div>

      </div>

    `)
    .join("");

    }
  );

}



/* =========================================
   SEARCH RESULT → QUICK VIEW
========================================= */

if (searchResults) {

  searchResults.addEventListener(
    "click",
    function (event) {

      const result =
        event.target.closest(
          ".search-result-item"
        );

      if (!result) return;

      const productId =
        result.dataset.product;

      console.log(
        "SEARCH RESULT CLICKED:",
        productId
      );

      const product =
        products.find(
          item =>
            String(item.id) ===
            String(productId)
        );

      console.log(
        "SEARCH PRODUCT FOUND:",
        product
      );

      if (!product) {

        console.error(
          "SEARCH PRODUCT NOT FOUND:",
          productId
        );

        return;

      }

      /*
        Open the SAME Quick View
        that the homepage uses.
      */

      const quickViewButton =
        document.querySelector(
          `.quick-view-btn[data-product="${CSS.escape(String(productId))}"]`
        );

      console.log(
        "QUICK VIEW BUTTON:",
        quickViewButton
      );

      if (quickViewButton) {

        closeSearch();

        quickViewButton.click();

      } else {

        console.error(
          "NO QUICK VIEW BUTTON FOUND FOR:",
          productId
        );

      }

    }
  );

}


// ========================================
// FILTER DRAWER CONTROLS
// ========================================

const filterButton =
  document.getElementById("filterButton");

const filterOverlay =
  document.getElementById("filterOverlay");

const filterClose =
  document.getElementById("filterClose");

const clearFilters =
  document.getElementById("clearFilters");

const applyFilters =
  document.getElementById("applyFilters");


// OPEN FILTER DRAWER

filterButton.addEventListener("click", function () {

  // Close sort if it is open
  sortOverlay.classList.remove("active");

  // Open filter
  filterOverlay.classList.add("active");

  document.body.style.overflow = "hidden";

});


// CLOSE FILTER DRAWER

filterClose.addEventListener("click", function () {

  filterOverlay.classList.remove("active");

  document.body.style.overflow = "";

});


// CLOSE WHEN CLICKING OUTSIDE DRAWER

filterOverlay.addEventListener("click", function (event) {

  if (event.target === filterOverlay) {

    filterOverlay.classList.remove("active");

    document.body.style.overflow = "";

  }

});


// ESC KEY

document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {

    filterOverlay.classList.remove("active");

    document.body.style.overflow = "";

  }

});


// CLEAR ALL FILTERS

clearFilters.addEventListener("click", function () {

  const checkboxes =
    filterOverlay.querySelectorAll(
      'input[type="checkbox"]'
    );

  checkboxes.forEach(function (checkbox) {

    checkbox.checked = false;

  });

  productGrid.innerHTML = "";

  products.forEach(function (product) {

    productGrid.appendChild(
      createProductCard(product)
    );

  });

});


applyFilters.addEventListener("click", function () {

  applyProductFilters();

  filterOverlay.classList.remove("active");

  document.body.style.overflow = "";

});

// ========================================
// PRODUCT FILTERING
// ========================================

function applyProductFilters() {

  const selectedFilters = {
    categories: [],
    prices: [],
    sizes: [],
    colors: []
  };

  const checkedBoxes =
    filterOverlay.querySelectorAll(
      'input[type="checkbox"]:checked'
    );

  checkedBoxes.forEach(function (checkbox) {

    const value = checkbox.value;

    // CATEGORY
    if (
      [
        "mini",
        "midi",
        "maxi",
        "bodycon",
        "satin",
        "jeans",
        "tshirts",
        "shirts"
      ].includes(value)
    ) {
      selectedFilters.categories.push(value);
    }

    // PRICE
    else if (
      [
        "under-1000",
        "1000-2000",
        "2000-3000",
        "3000-plus"
      ].includes(value)
    ) {
      selectedFilters.prices.push(value);
    }

    // SIZE
    else if (
      ["XS", "S", "M", "L", "XL"].includes(value)
    ) {
      selectedFilters.sizes.push(value);
    }

    // COLOR
    else {
      selectedFilters.colors.push(
        value.toLowerCase()
      );
    }

  });


  const filteredProducts =
    products.filter(function (product) {

      // ----------------------------
      // CATEGORY FILTER
      // ----------------------------

      if (
        selectedFilters.categories.length > 0
      ) {

        const productCategory =
          String(
            product.category || ""
          ).toLowerCase();

        const productTitle =
          String(
            product.title || ""
          ).toLowerCase();

        const categoryMatch =
          selectedFilters.categories.some(
            function (category) {

              return (
                productCategory.includes(category) ||
                productTitle.includes(category)
              );

            }
          );

        if (!categoryMatch) {
          return false;
        }

      }


      // ----------------------------
      // PRICE FILTER
      // ----------------------------

      if (
        selectedFilters.prices.length > 0
      ) {

        const price =
          Number(product.price || 0);

        const priceMatch =
          selectedFilters.prices.some(
            function (range) {

              if (range === "under-1000") {
                return price < 1000;
              }

              if (range === "1000-2000") {
                return price >= 1000 &&
                       price <= 2000;
              }

              if (range === "2000-3000") {
                return price > 2000 &&
                       price <= 3000;
              }

              if (range === "3000-plus") {
                return price > 3000;
              }

              return false;

            }
          );

        if (!priceMatch) {
          return false;
        }

      }


      // ----------------------------
      // SIZE FILTER
      // ----------------------------

      if (
        selectedFilters.sizes.length > 0
      ) {

        const productSizes =
          (product.sizes || [])
            .map(size =>
              String(size).toUpperCase()
            );

        const sizeMatch =
          selectedFilters.sizes.some(
            size =>
              productSizes.includes(size)
          );

        if (!sizeMatch) {
          return false;
        }

      }


      // ----------------------------
      // COLOR FILTER
      // ----------------------------

      if (
        selectedFilters.colors.length > 0
      ) {

        const productColors =
          (product.colors || [])
            .map(color =>
              String(color).toLowerCase()
            );

        const colorMatch =
          selectedFilters.colors.some(
            color => {

              return productColors.some(
                productColor =>
                  productColor.includes(color) ||
                  color.includes(productColor)
              );

            }
          );

        if (!colorMatch) {
          return false;
        }

      }


      return true;

    });


  // ----------------------------
  // RENDER FILTERED PRODUCTS
  // ----------------------------

  productGrid.innerHTML = "";

  if (filteredProducts.length === 0) {

    productGrid.innerHTML = `
      <p style="
        grid-column: 1 / -1;
        text-align: center;
        padding: 60px 20px;
        color: var(--champagne-gold);
      ">
        No products match your filters.
      </p>
    `;

    return;

  }


  filteredProducts.forEach(function (product) {

    productGrid.appendChild(
      createProductCard(product)
    );

  });

}



function applyProductSort(productsToSort) {

  const selectedSort =
    document.querySelector(
      'input[name="sortOption"]:checked'
    )?.value || "featured";

  const sortedProducts =
    [...productsToSort];

  if (selectedSort === "price-low") {

    sortedProducts.sort(
      (a, b) =>
        Number(a.price || 0) -
        Number(b.price || 0)
    );

  }

  else if (selectedSort === "price-high") {

    sortedProducts.sort(
      (a, b) =>
        Number(b.price || 0) -
        Number(a.price || 0)
    );

  }

  else if (selectedSort === "newest") {

    sortedProducts.sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    );

  }

  return sortedProducts;
}




// ========================================
// SORT PANEL CONTROLS
// ========================================

const sortButton =
  document.getElementById("sortButton");

const sortOverlay =
  document.getElementById("sortOverlay");

const sortClose =
  document.getElementById("sortClose");


// OPEN SORT PANEL
if (sortButton && sortOverlay) {

  sortButton.addEventListener(
    "click",
    function () {

      // Close filter drawer
      if (filterOverlay) {
        filterOverlay.classList.remove("active");
      }

      // Open sort panel
      sortOverlay.classList.add("active");

      document.body.style.overflow = "hidden";

      console.log("SORT PANEL OPENED");

    }
  );

}


// CLOSE SORT PANEL
if (sortClose && sortOverlay) {

  sortClose.addEventListener(
    "click",
    function () {

      sortOverlay.classList.remove("active");

      document.body.style.overflow = "";

    }
  );

}


// CLOSE WHEN CLICKING OUTSIDE
if (sortOverlay) {

  sortOverlay.addEventListener(
    "click",
    function (event) {

      if (event.target === sortOverlay) {

        sortOverlay.classList.remove("active");

        document.body.style.overflow = "";

      }

    }
  );

}


// ========================================
// SORT PRODUCTS
// ========================================

document
  .querySelectorAll(
    'input[name="sortOption"]'
  )
  .forEach(function (option) {

    option.addEventListener(
      "change",
      function () {

        console.log(
          "SORT SELECTED:",
          this.value
        );

        // Make sure Shopify products
        // are available
        if (!Array.isArray(products)) {

          console.error(
            "Products array is not available."
          );

          return;

        }

        const sortedProducts =
          applyProductSort(products);

        console.log(
          "SORTED PRODUCTS:",
          sortedProducts
        );

        // Render sorted products
        productGrid.innerHTML = "";

        sortedProducts.forEach(
          function (product) {

            productGrid.appendChild(
              createProductCard(product)
            );

          }
        );

        // Close sort panel
        sortOverlay.classList.remove(
          "active"
        );

        document.body.style.overflow = "";

      }
    );

  });



  // =========================================
// GENDER SWITCH + MEN COMING SOON
// =========================================

const genderSwitch = document.getElementById("genderSwitch");
const genderOptions = document.querySelectorAll(".gender-option");

const homeMain = document.getElementById("home");
const menComingSoon = document.getElementById("menComingSoon");

let activeGender = "women";

// All existing homepage sections except Men Coming Soon
const womenHomepageSections = homeMain
  ? Array.from(homeMain.children).filter(
      section => section.id !== "menComingSoon"
    )
  : [];

function setGenderView(gender) {

  activeGender = gender;

  // Update active WOMEN / MEN text
  genderOptions.forEach(option => {
    option.classList.toggle(
      "active",
      option.dataset.gender === activeGender
    );
  });

  // Move toggle thumb
  if (activeGender === "men") {
    genderSwitch?.classList.add("men-active");
  } else {
    genderSwitch?.classList.remove("men-active");
  }

  // =========================================
  // MEN VIEW
  // =========================================

  if (activeGender === "men") {

    // Hide all existing Women content
    womenHomepageSections.forEach(section => {
      section.style.display = "none";
    });

    // Show Men Coming Soon
    if (menComingSoon) {
      menComingSoon.style.display = "flex";
    }

  }

  // =========================================
  // WOMEN VIEW
  // =========================================

  else {

    // Hide Men Coming Soon
    if (menComingSoon) {
      menComingSoon.style.display = "none";
    }

    // Restore Women content
    womenHomepageSections.forEach(section => {
      section.style.display = "";
    });

  }
}


// =========================================
// SWITCH CLICK
// =========================================

if (genderSwitch) {

  genderSwitch.addEventListener("click", function (event) {

    // Clicked WOMEN / MEN text
    const clickedOption =
      event.target.closest(".gender-option");

    if (clickedOption) {

      setGenderView(
        clickedOption.dataset.gender
      );

      return;
    }

    // Clicked toggle track
    setGenderView(
      activeGender === "women"
        ? "men"
        : "women"
    );

  });

}


// =========================================
// DEFAULT VIEW
// =========================================

setGenderView("women");



// ========================================
// GENZMODE CUSTOMER AUTH UI
// ========================================

function updateAccountUI() {
  const token = sessionStorage.getItem(
    "genzmodeShopifyAccessToken"
  );

  const loginButton = document.getElementById(
    "loginNavButton"
  );

  const accountButton = document.getElementById(
    "myAccountButton"
  );

  const logoutButton = document.getElementById(
    "logoutButton"
  );

  if (!loginButton || !accountButton || !logoutButton) {
    return;
  }

  const isLoggedIn = Boolean(token);

  loginButton.style.display = isLoggedIn ? "none" : "inline-block";
  accountButton.style.display = isLoggedIn ? "inline-block" : "none";
  logoutButton.style.display = isLoggedIn ? "inline-block" : "none";
}

// My Account button
document.getElementById("myAccountButton")
  ?.addEventListener("click", function () {
    alert("My Account page integration is the next step.");
  });

// Logout button
document.getElementById("logoutButton")
  ?.addEventListener("click", function () {
    sessionStorage.removeItem("genzmodeShopifyAccessToken");
    updateAccountUI();
    window.location.href = "index.html";
  });

// Update when page loads
updateAccountUI();
