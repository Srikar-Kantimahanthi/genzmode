// =========================================

// CATEGORY PAGE

// =========================================


// Get category from URL

const urlParams = new URLSearchParams(
  window.location.search
);

const selectedCategory =
  urlParams.get("category");


const products = [

  // =========================
  // MINI
  // =========================

  {
    id: 1,
    title: "Satin Sculpt Dress",
    category: "mini",
    price: 6490,
    oldPrice: 7990,
    rating: 4.9,
    reviews: 38,
    front: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85",
    colors: ["#1E1715", "#C6A77B", "#8B4B3E"]
  },

  {
    id: 2,
    title: "After Dark Mini",
    category: "mini",
    price: 5990,
    oldPrice: null,
    rating: 4.8,
    reviews: 27,
    front: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=85",
    colors: ["#171413", "#D8C4A5"]
  },

  // =========================
  // MIDI
  // =========================

  {
    id: 3,
    title: "Champagne Slip Dress",
    category: "midi",
    price: 5890,
    oldPrice: 6990,
    rating: 4.7,
    reviews: 31,
    front: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=85",
    colors: ["#E4CFA9", "#4A3028", "#111111"]
  },

  {
    id: 4,
    title: "Mocha Midi Dress",
    category: "midi",
    price: 6790,
    oldPrice: null,
    rating: 4.8,
    reviews: 22,
    front: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
    colors: ["#2B1B17", "#8B6F61"]
  },

  // =========================
  // MAXI
  // =========================

  {
    id: 5,
    title: "Lumière Maxi Dress",
    category: "maxi",
    price: 9490,
    oldPrice: 10990,
    rating: 4.9,
    reviews: 42,
    front: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1506629905607-d9c297d0b4d6?auto=format&fit=crop&w=1000&q=85",
    colors: ["#E8C98A", "#211310"]
  },

  {
    id: 6,
    title: "Velvet Floor Length",
    category: "maxi",
    price: 8990,
    oldPrice: null,
    rating: 4.8,
    reviews: 29,
    front: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85",
    colors: ["#211310", "#4A3028"]
  },

  // =========================
  // BODYCON
  // =========================

  {
    id: 7,
    title: "Sculpted Bodycon",
    category: "bodycon",
    price: 7290,
    oldPrice: 8490,
    rating: 4.9,
    reviews: 35,
    front: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
    colors: ["#171413", "#8B4B3E"]
  },

  {
    id: 8,
    title: "Noir Curve Dress",
    category: "bodycon",
    price: 6990,
    oldPrice: null,
    rating: 4.8,
    reviews: 21,
    front: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1506629905607-d9c297d0b4d6?auto=format&fit=crop&w=1000&q=85",
    colors: ["#111111", "#2B1B17"]
  },

  // =========================
  // SATIN
  // =========================

  {
    id: 9,
    title: "Satin Muse Dress",
    category: "satin",
    price: 6490,
    oldPrice: null,
    rating: 4.9,
    reviews: 33,
    front: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=85",
    colors: ["#E4CFA9", "#C6A77B", "#111111"]
  },

  {
    id: 10,
    title: "Champagne Satin Slip",
    category: "satin",
    price: 7190,
    oldPrice: 7990,
    rating: 4.8,
    reviews: 26,
    front: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
    colors: ["#E8C98A", "#8B6F61"]
  },

  // =========================
  // PARTY
  // =========================

  {
    id: 11,
    title: "Midnight Party Dress",
    category: "party",
    price: 8290,
    oldPrice: 9490,
    rating: 4.9,
    reviews: 41,
    front: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85",
    colors: ["#111111", "#211310"]
  },

  {
    id: 12,
    title: "Golden Hour Dress",
    category: "party",
    price: 8790,
    oldPrice: null,
    rating: 4.8,
    reviews: 18,
    front: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=85",
    colors: ["#E8C98A", "#D8C4A5"]
  },

  // =========================
  // JEANS
  // =========================

  {
    id: 13,
    title: "Classic Wide Leg Jeans",
    category: "jeans",
    price: 4990,
    oldPrice: null,
    rating: 4.8,
    reviews: 37,
    front: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=85",
    colors: ["#24364B", "#111111"]
  },

  {
    id: 14,
    title: "Relaxed Straight Jeans",
    category: "jeans",
    price: 4590,
    oldPrice: 5290,
    rating: 4.7,
    reviews: 24,
    front: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85",
    colors: ["#314A63", "#1B1B1B"]
  },

  // =========================
  // T-SHIRTS
  // =========================

  {
    id: 15,
    title: "Essential Oversized Tee",
    category: "tshirts",
    price: 2490,
    oldPrice: null,
    rating: 4.8,
    reviews: 52,
    front: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85",
    colors: ["#F5F1E8", "#211310", "#6F5143"]
  },

  {
    id: 16,
    title: "Minimal Luxe Tee",
    category: "tshirts",
    price: 2790,
    oldPrice: 3290,
    rating: 4.7,
    reviews: 28,
    front: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
    colors: ["#E8C98A", "#111111"]
  },

  // =========================
  // SHIRTS
  // =========================

  {
    id: 17,
    title: "Silk Statement Shirt",
    category: "shirts",
    price: 4290,
    oldPrice: 4990,
    rating: 4.9,
    reviews: 32,
    front: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1603252110481-7ba873bf42ab?auto=format&fit=crop&w=1000&q=85",
    colors: ["#E4CFA9", "#211310", "#F5F1E8"]
  },

  {
    id: 18,
    title: "Relaxed Luxe Shirt",
    category: "shirts",
    price: 3890,
    oldPrice: null,
    rating: 4.8,
    reviews: 20,
    front: "https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85",
    colors: ["#D8C4A5", "#6F5143"]
  },

  // =========================
  // SHORTS
  // =========================

  {
    id: 19,
    title: "Tailored Mini Shorts",
    category: "shorts",
    price: 3490,
    oldPrice: null,
    rating: 4.7,
    reviews: 19,
    front: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1566206091558-7f218b696731?auto=format&fit=crop&w=1000&q=85",
    colors: ["#211310", "#E4CFA9"]
  },

  {
    id: 20,
    title: "Relaxed Denim Shorts",
    category: "shorts",
    price: 2990,
    oldPrice: 3490,
    rating: 4.6,
    reviews: 23,
    front: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=85",
    colors: ["#314A63", "#111111"]
  },

  // =========================
  // PAJAMAS
  // =========================

  {
    id: 21,
    title: "Satin Sleep Set",
    category: "pajamas",
    price: 4490,
    oldPrice: null,
    rating: 4.9,
    reviews: 45,
    front: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=1000&q=85",
    colors: ["#E8C98A", "#8B6F61"]
  },

  {
    id: 22,
    title: "Luxe Lounge Pajamas",
    category: "pajamas",
    price: 3990,
    oldPrice: 4690,
    rating: 4.8,
    reviews: 34,
    front: "https://images.unsplash.com/photo-1583845112203-454c4c11d2e5?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1578681994506-b8f463449011?auto=format&fit=crop&w=1000&q=85",
    colors: ["#2B1B17", "#D8C4A5"]
  },

  // =========================
  // CO-ORDS
  // =========================

  {
    id: 23,
    title: "Noir Tailored Co-ord",
    category: "co-ords",
    price: 7490,
    oldPrice: null,
    rating: 4.8,
    reviews: 30,
    front: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=1000&q=85",
    colors: ["#111111", "#2B1B17"]
  },

  {
    id: 24,
    title: "Espresso Lounge Set",
    category: "co-ords",
    price: 8290,
    oldPrice: null,
    rating: 4.9,
    reviews: 36,
    front: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?auto=format&fit=crop&w=1000&q=85",
    back: "https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=1000&q=85",
    colors: ["#4A3028", "#E4CFA9"]
  }

];


// =========================================
// CATEGORY INFORMATION
// =========================================

const categoryInfo = {

  mini: {
    title: "Mini Dresses",
    description:
      "Short silhouettes designed for statement moments."
  },

  midi: {
    title: "Midi Dresses",
    description:
      "Elegant mid-length silhouettes with a refined finish."
  },

  maxi: {
    title: "Maxi Dresses",
    description:
      "Floor-length silhouettes made for elevated occasions."
  },

  bodycon: {
    title: "Bodycon Dresses",
    description:
      "Figure-hugging silhouettes designed to sculpt and define."
  },

  satin: {
    title: "Satin Dresses",
    description:
      "Luminous satin silhouettes with a luxurious finish."
  },

  party: {
    title: "Party Dresses",
    description:
      "Statement pieces made for nights that deserve attention."
  },

  jeans: {
    title: "Jeans",
    description:
      "Modern denim essentials for effortless everyday styling."
  },

  tshirts: {
    title: "T-Shirts",
    description:
      "Premium everyday essentials with a modern edge."
  },

  shirts: {
    title: "Shirts",
    description:
      "Refined shirts designed for effortless luxury."
  },

  shorts: {
    title: "Shorts",
    description:
      "Clean, contemporary shorts for elevated casual looks."
  },

  pajamas: {
    title: "Pajamas",
    description:
      "Luxury lounge essentials made for comfort and style."
  },

  "co-ords": {
    title: "Co-ords",
    description:
      "Perfectly paired sets for effortless styling."
  }

};


// ==========================================
// SHOPIFY PRODUCTS → GENZMODE PRODUCTS
// ==========================================

function convertShopifyProduct(shopifyProduct) {
  const variants = shopifyProduct.variants?.nodes || [];

  const firstVariant = variants[0];

  const price = firstVariant
    ? Number(firstVariant.price.amount)
    : 0;

  const currencyCode = firstVariant?.price?.currencyCode || "INR";

  const sizes = [
    ...new Set(
      variants
        .map(variant => {
          const sizeOption = variant.selectedOptions?.find(
            option => option.name.toLowerCase() === "size"
          );

          return sizeOption?.value;
        })
        .filter(Boolean)
    )
  ];

  const colors = [
    ...new Set(
      variants
        .map(variant => {
          const colorOption = variant.selectedOptions?.find(
            option => option.name.toLowerCase() === "color"
          );

          return colorOption?.value;
        })
        .filter(Boolean)
    )
  ];

  return {
  id: shopifyProduct.id,

  title: shopifyProduct.title,

  price: price,
  currencyCode: currencyCode,

  description: shopifyProduct.description || "",

  front:
    shopifyProduct.featuredImage?.url || "",

  back:
    shopifyProduct.images?.nodes?.[1]?.url ||
    shopifyProduct.featuredImage?.url ||
    "",

  sizes: sizes,
  colors: colors,

  category: selectedCategory,

  rating: 0,
  reviews: 0,

  shopifyId: shopifyProduct.id,
  shopifyHandle: shopifyProduct.handle,
  shopifyVariants: variants,

  isShopifyProduct: true
};
}


// =========================================
// DOM ELEMENTS
// =========================================

const categoryTitle =
  document.getElementById("categoryTitle");

const categoryDescription =
  document.getElementById("categoryDescription");

const categoryProductGrid =
  document.getElementById("categoryProductGrid");


// =========================================
// UPDATE CATEGORY HEADER
// =========================================

if (
  selectedCategory &&
  categoryInfo[selectedCategory]
) {

  categoryTitle.textContent =
    categoryInfo[selectedCategory].title;

  categoryDescription.textContent =
    categoryInfo[selectedCategory].description;

}


// =========================================
// PRODUCT CARD
// =========================================

function createProductCard(product) {

  const card =
    document.createElement("article");

  card.className =
    "category-product-card";


  const saleBadge =
    product.oldPrice
      ? `<span class="sale-badge">SALE</span>`
      : "";


  const colorDots =
    (product.colors || [])
      .map(
        color => `
          <span
            class="product-color-dot"
            style="background:${color};"
          ></span>
        `
      )
      .join("");


  card.innerHTML = `

    <div class="category-product-image">

      ${saleBadge}

      <img
        class="product-image-front"
        src="${product.front}"
        alt="${product.title}"
      >

      <img
        class="product-image-back"
        src="${product.back}"
        alt="${product.title} back view"
      >

      
<div class="product-action-bar">

  <button
    type="button"
    class="product-action wishlist-btn"
    data-product="${product.id}"
    aria-label="Add to wishlist"
  >
    ♡
  </button>

  <button
  type="button"
  class="product-action share-product-btn"
  data-product="${product.id}"
  aria-label="Share product"
  title="Share product"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.6 10.5 15.4 6.5" />
    <path d="M8.6 13.5 15.4 17.5" />
  </svg>
</button>

  <button
    type="button"
    class="product-action quick-view-btn"
    data-product="${product.id}"
  >
    Quick View
  </button>

</div>


    </div>


    <div class="category-product-info">

      <div class="product-category">
        ${product.category
          .replace("-", " ")
          .toUpperCase()}
      </div>

      <h3>
        ${product.title}
      </h3>

      <div class="product-rating">

        <span>
          ★ ${product.rating}
        </span>

        <span>
          (${product.reviews})
        </span>

      </div>


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


      <div class="product-colors">
        ${colorDots}
      </div>

    </div>

  `;


  return card;

}




// =========================================
// PRODUCT SHARE
// =========================================

categoryProductGrid.addEventListener("click", async function (event) {
  const shareButton = event.target.closest(".share-product-btn");

  if (!shareButton) return;

  const productId = shareButton.dataset.product;

  const product = categoryProducts.find(
    item => String(item.id) === String(productId)
  );

  if (!product) return;

  // Use the Shopify product URL when available
  const productUrl = product.shopifyHandle
    ? `${window.location.origin}/products/${product.shopifyHandle}`
    : `${window.location.origin}/category.html?category=${encodeURIComponent(product.category)}`;

  const shareData = {
    title: product.title,
    text: `Check out ${product.title} on GENZMODE!`,
    url: productUrl
  };

  try {
    if (navigator.share) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(productUrl);
      showWishlistToast("Product link copied!");
    }
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Product sharing failed:", error);
      showWishlistToast("Unable to share product");
    }
  }
});




// =========================================
// RESTORE WISHLIST HEARTS
// =========================================

function restoreCategoryWishlistState() {

  const wishlistButtons =
    categoryProductGrid.querySelectorAll(".wishlist-btn");

  wishlistButtons.forEach(button => {

    const productId = button.dataset.product;

    if (isProductInWishlist(productId)) {

      button.classList.add("active");
      button.innerHTML = "♥";

    } else {

      button.classList.remove("active");
      button.innerHTML = "♡";

    }

  });

}

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

  const response = await fetch(
    SHOPIFY_STOREFRONT_ENDPOINT,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
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




async function loadShopifyCollections() {
  try {
    const data = await shopifyStorefrontRequest(
      SHOPIFY_COLLECTIONS_QUERY
    );

    const collections =
      data.collections?.nodes || [];

    console.log(
      "Shopify Collections:",
      collections
    );

    return collections;

  } catch (error) {

    console.error(
      "Shopify collection loading failed:",
      error
    );

    return [];
  }
}



async function loadShopifyCollectionProducts(collectionHandle) {
  const query = `
    {
      collectionByHandle(handle: "${collectionHandle}") {
        id
        title
        handle

        products(first: 50) {
          nodes {
            id
            title
            handle
            description

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

                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyStorefrontRequest(query);

    const collection = data.collectionByHandle;

    console.log("Shopify Collection:", collection);

    console.table(
      collection?.products?.nodes?.map(product => ({
        title: product.title,
        handle: product.handle,
        id: product.id
      })) || []
    );

    return collection;

  } catch (error) {
    console.error(
      "Shopify collection products loading failed:",
      error
    );

    return null;
  }
}


// =========================================
// CREATE SHOPIFY CART
// =========================================

async function createShopifyCart(variantId, quantity = 1) {
  const mutation = `
    mutation cartCreate($input: CartInput) {
      cartCreate(input: $input) {
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
    input: {
      lines: [
        {
          merchandiseId: variantId,
          quantity
        }
      ]
    }
  };

  const data = await shopifyStorefrontRequest(mutation, variables);

  const cartCreate = data.cartCreate;

  if (cartCreate.userErrors && cartCreate.userErrors.length > 0) {
    console.error("Shopify Cart Errors:", cartCreate.userErrors);
    throw new Error(cartCreate.userErrors[0].message);
  }

  if (!cartCreate.cart) {
    throw new Error("Shopify cart was not created.");
  }

  return cartCreate.cart;
};





// =========================================
// CREATE SHOPIFY CART FROM BAG
// =========================================

async function createShopifyCartFromBag(bag) {
  if (!Array.isArray(bag) || bag.length === 0) {
    throw new Error("Your bag is empty.");
  }

  const lines = bag.map((item) => {
    if (!item.shopifyVariantId) {
      throw new Error(
        `Shopify variant missing for ${item.title}. Please remove and add it again.`
      );
    }

    return {
      merchandiseId: item.shopifyVariantId,
      quantity: Math.max(
        1,
        Math.floor(Number(item.quantity) || 1)
      )
    };
  });

  const mutation = `
    mutation cartCreate($input: CartInput) {
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

  const variables = {
    input: {
      lines: lines
    }
  };

  const data = await shopifyStorefrontRequest(
    mutation,
    variables
  );

  const cartCreate = data.cartCreate;

  if (cartCreate.userErrors?.length > 0) {
    throw new Error(
      cartCreate.userErrors
        .map((error) => error.message)
        .join(", ")
    );
  }

  if (!cartCreate.cart?.checkoutUrl) {
    throw new Error(
      "Shopify checkout URL could not be created."
    );
  }

  return cartCreate.cart;
}


// =========================================
// ADD TO EXISTING SHOPIFY CART
// =========================================


async function addToExistingShopifyCart(cartId, variantId, quantity = 1) {
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
    cartId,
    lines: [
      {
        merchandiseId: variantId,
        quantity
      }
    ]
  };

  const data = await shopifyStorefrontRequest(mutation, variables);
  const result = data.cartLinesAdd;

  if (result.userErrors && result.userErrors.length > 0) {
    console.error("Shopify Cart Line Errors:", result.userErrors);
    throw new Error(result.userErrors[0].message);
  }

  if (!result.cart) {
    throw new Error("Unable to add item to Shopify cart.");
  }

  return result.cart;
}


// =========================================
// SHOPIFY PRODUCT QUERY
// =========================================

const SHOPIFY_PRODUCT_QUERY = `
  {
    products(first: 50) {
      nodes {
        id
        title
        handle
        description
        featuredImage {
          url
          altText
        }
        variants(first: 100) {
          nodes {
            id
            title
            price {
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


const SHOPIFY_COLLECTIONS_QUERY = `
  {
    collections(first: 50) {
      nodes {
        id
        title
        handle
      }
    }
  }
`;



// =========================================
// NORMALIZE PRODUCT TITLE
// =========================================

function normalizeProductTitle(title) {

  return String(title || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

}


// =========================================
// LOAD ALL PRODUCTS FROM SHOPIFY
// =========================================

async function loadShopifyProducts() {

  try {

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
            query:
              SHOPIFY_PRODUCT_QUERY
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
        "Shopify GraphQL errors:",
        result.errors
      );

      throw new Error(
        "Shopify API request failed."
      );

    }


    const shopifyProducts =
      result.data?.products?.nodes || [];


    console.log("Shopify products loaded:", shopifyProducts.length);

    const convertedShopifyProducts = shopifyProducts.map(
  convertShopifyProduct
);

console.log(
  "Converted Shopify Products:",
  convertedShopifyProducts
);

console.table(
  convertedShopifyProducts.map(product => ({
    name: product.name,
    price: product.price,
    sizes: product.sizes.join(", "),
    colors: product.colors.join(", "),
    image: product.image
  }))
);

console.table(
  shopifyProducts.map(product => ({
    title: product.title,
    handle: product.handle,
    id: product.id
  }))
);  


    products.forEach(
      localProduct => {

        const normalizedLocalTitle =
          normalizeProductTitle(
            localProduct.title
          );


        const shopifyProduct =
          shopifyProducts.find(
            product =>
              normalizeProductTitle(
                product.title
              ) ===
              normalizedLocalTitle
          );


        if (!shopifyProduct) {

          console.warn(
            `No Shopify product found for: ${localProduct.title}`
          );

          return;

        }


        localProduct.shopifyId =
          shopifyProduct.id;

        localProduct.shopifyHandle =
          shopifyProduct.handle;

        localProduct.shopifyVariants =
          shopifyProduct.variants?.nodes || [];


        const firstVariant =
          localProduct.shopifyVariants[0];


        if (
          firstVariant?.price?.amount
        ) {

          localProduct.price =
            Number(
              firstVariant.price.amount
            );

        }


        if (
          shopifyProduct.featuredImage?.url
        ) {

          localProduct.front =
            shopifyProduct.featuredImage.url;

        }


        console.log(
          `Shopify matched: ${localProduct.title}`,
          {
            shopifyId:
              localProduct.shopifyId,

            variants:
              localProduct.shopifyVariants
          }
        );

      }
    );


  } catch (error) {

    console.error(
      "Shopify product loading failed:",
      error
    );

    // Keep local product data as fallback.

  }

}


// =========================================
// INITIALIZE CATEGORY PAGE
// =========================================

let categoryProducts = [];

async function initializeCategoryPage() {

  const collectionHandle =
    selectedCategory;

  const collection =
    await loadShopifyCollectionProducts(
      collectionHandle
    );

  const shopifyProducts =
    collection?.products?.nodes || [];

  categoryProductGrid.innerHTML = "";

  if (shopifyProducts.length === 0) {

    categoryProductGrid.innerHTML = `
      <p style="grid-column: 1 / -1; text-align:center;">
        No products found in this collection.
      </p>
    `;

    return;
  }

  categoryProducts =
    shopifyProducts.map(
      shopifyProduct =>
        convertShopifyProduct(
          shopifyProduct
        )
    );

  console.log(
    "Category Products:",
    categoryProducts
  );

  categoryProducts.forEach(
    product => {

      categoryProductGrid.appendChild(
        createProductCard(product)
      );

    }
  );
}

initializeCategoryPage();





// =========================================
// WISHLIST
// =========================================

let wishlist = [];

try {
  wishlist =
    JSON.parse(
      localStorage.getItem("genzmodeWishlist")
    ) || [];
} catch (error) {
  console.warn(
    "Unable to read wishlist.",
    error
  );

  wishlist = [];
}


// =========================================
// SAVE WISHLIST
// =========================================

function saveWishlist() {

  localStorage.setItem(
    "genzmodeWishlist",
    JSON.stringify(wishlist)
  );

}


// =========================================
// CHECK WISHLIST
// =========================================

function isProductInWishlist(productId) {

  return wishlist.some(
    item =>
      String(item.id) ===
      String(productId)
  );

}


// =========================================
// UPDATE WISHLIST COUNT
// =========================================

function updateWishlistCount() {

  const wishlistCount =
    document.getElementById("wishlistCount");

  if (!wishlistCount) return;

  wishlistCount.textContent = wishlist.length;

}


// =========================================
// WISHLIST TOAST
// =========================================

function showWishlistToast(message) {

  let toast =
    document.getElementById("wishlistToast");

  if (!toast) {

    toast = document.createElement("div");

    toast.id = "wishlistToast";
    toast.className = "wishlist-toast";

    document.body.appendChild(toast);

  }

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toast._timeout);

  toast._timeout = setTimeout(() => {

    toast.classList.remove("show");

  }, 2200);

}


// =========================================
// CATEGORY WISHLIST BUTTON
// =========================================

categoryProductGrid.addEventListener("click", function (event) {

  const wishlistButton = event.target.closest(".wishlist-btn");

  if (!wishlistButton) return;

  const productId = wishlistButton.dataset.product;

  const product = categoryProducts.find(
    item => String(item.id) === String(productId)
  );

  if (!product) return;

  const existingIndex = wishlist.findIndex(
    item => String(item.id) === String(product.id)
  );

  if (existingIndex !== -1) {

  // REMOVE FROM WISHLIST
  wishlist.splice(existingIndex, 1);

  saveWishlist();

  wishlistButton.classList.remove("active");
  wishlistButton.innerHTML = "♡";

  updateWishlistCount();

  showWishlistToast("Removed from wishlist");

} else {

  // ADD TO WISHLIST
  wishlist.push(product);

  saveWishlist();

  wishlistButton.classList.add("active");
  wishlistButton.innerHTML = "♥";

  updateWishlistCount();

  showWishlistToast("Added to wishlist");

}

});



// =========================================
// QUICK VIEW MODAL
// =========================================

const categoryQuickView =
  document.createElement("div");


categoryQuickView.className =
  "quick-view-modal";


categoryQuickView.innerHTML = `

  <div class="quick-view-overlay"></div>

  <div
    class="quick-view-content"
    role="dialog"
    aria-modal="true"
    aria-label="Product quick view"
  >

    <button
      type="button"
      class="quick-view-close"
      aria-label="Close quick view"
    >
      ×
    </button>


    <div class="quick-view-content">

      <div class="quick-view-image-wrapper">

        <img
          id="categoryQuickViewImage"
          src=""
          alt=""
        >

      </div>


      <div class="quick-view-details">

        <div
          id="categoryQuickViewCategory"
          class="quick-view-category"
        ></div>


        <h2
          id="categoryQuickViewTitle"
        ></h2>


        <div class="quick-view-rating">

          <span>
            ★
          </span>

          <span
            id="categoryQuickViewRating"
          ></span>

          <span
            id="categoryQuickViewReviews"
          ></span>

        </div>


        <div class="quick-view-price">

          <span
            id="categoryQuickViewPrice"
            class="quick-current-price"
          ></span>

          <span
            id="categoryQuickViewOldPrice"
            class="quick-old-price"
          ></span>

        </div>


        <div class="quick-view-option">

          <div class="quick-view-option-title">
            Color
          </div>

          <div
            id="categoryQuickViewColors"
            class="quick-view-colors"
          ></div>

        </div>


        <div class="quick-view-option">

          <div class="quick-view-option-title">
            Size
          </div>

          <div class="quick-view-sizes">

            <button
              type="button"
              class="size-btn"
              data-size="XS"
            >
              XS
            </button>

            <button
              type="button"
              class="size-btn"
              data-size="S"
            >
              S
            </button>

            <button
              type="button"
              class="size-btn"
              data-size="M"
            >
              M
            </button>

            <button
              type="button"
              class="size-btn"
              data-size="L"
            >
              L
            </button>

            <button
              type="button"
              class="size-btn"
              data-size="XL"
            >
              XL
            </button>

          </div>

        </div>


        <div
          id="categoryQuickViewSelection"
          class="quick-view-selection"
        >
          Select a color and size
        </div>


        <button
          type="button"
          id="categoryQuickViewAdd"
          class="quick-view-add"
        >
          Add to Bag
        </button>

      </div>

    </div>

  </div>

`;

document.body.appendChild(
  categoryQuickView
);


// =========================================
// QUICK VIEW STATE
// =========================================

let currentQuickViewProduct =
  null;

let selectedQuickViewColor =
  null;

let selectedQuickViewColorIndex =
  null;

let selectedQuickViewSize =
  null;


// =========================================
// OPEN QUICK VIEW
// =========================================

function openCategoryQuickView(
  product
) {

  currentQuickViewProduct =
    product;


  selectedQuickViewColor =
    product.colors?.[0] || null;


  selectedQuickViewColorIndex =
    product.colors?.length
      ? 0
      : null;


  selectedQuickViewSize =
    null;


  const image =
    categoryQuickView.querySelector(
      "#categoryQuickViewImage"
    );


  const title =
    categoryQuickView.querySelector(
      "#categoryQuickViewTitle"
    );


  const category =
    categoryQuickView.querySelector(
      "#categoryQuickViewCategory"
    );


  const rating =
    categoryQuickView.querySelector(
      "#categoryQuickViewRating"
    );


  const reviews =
    categoryQuickView.querySelector(
      "#categoryQuickViewReviews"
    );


  const price =
    categoryQuickView.querySelector(
      "#categoryQuickViewPrice"
    );


  const oldPrice =
    categoryQuickView.querySelector(
      "#categoryQuickViewOldPrice"
    );


  const colors =
    categoryQuickView.querySelector(
      "#categoryQuickViewColors"
    );


  image.src =
    product.front;


  image.alt =
    product.title;


  title.textContent =
    product.title;


  category.textContent =
    product.category
      .replace("-", " ")
      .toUpperCase();


  rating.textContent =
    product.rating;


  reviews.textContent =
    `(${product.reviews})`;


  price.textContent =
    `₹${product.price.toLocaleString("en-IN")}`;


  if (product.oldPrice) {

    oldPrice.textContent =
      `₹${product.oldPrice.toLocaleString("en-IN")}`;

  } else {

    oldPrice.textContent =
      "";

  }


  colors.innerHTML =
    (product.colors || [])
      .map(
        (color, index) => `
          <button
            type="button"
            class="quick-color ${
              index === 0 ? "active" : ""
            }"
            data-color="${color}"
            data-color-index="${index}"
            style="background:${color};"
            aria-label="Select color ${index + 1}"
          ></button>
        `
      )
      .join("");


  categoryQuickView
    .querySelectorAll(
      ".size-btn"
    )
    .forEach(
      button => {

        button.classList.remove(
          "active"
        );

      }
    );


  updateQuickViewSelection();


  categoryQuickView.classList.add(
    "active"
  );


  document.body.style.overflow =
    "hidden";


  categoryQuickView
    .querySelector(
      ".quick-view-close"
    )
    .focus();

}


// =========================================
// CLOSE QUICK VIEW
// =========================================

function closeCategoryQuickView() {

  categoryQuickView.classList.remove(
    "active"
  );


  document.body.style.overflow =
    "";


  currentQuickViewProduct =
    null;

  selectedQuickViewColor =
    null;

  selectedQuickViewColorIndex =
    null;

  selectedQuickViewSize =
    null;

}


// =========================================
// QUICK VIEW BUTTON
// =========================================

categoryProductGrid.addEventListener(
  "click",
  function (event) {

    const quickViewButton =
      event.target.closest(".quick-view-btn");

    if (!quickViewButton) {
      return;
    }

    console.log("QUICK VIEW CLICKED");

    const productId =
      quickViewButton.dataset.product;

    console.log(
      "Clicked Product ID:",
      productId
    );

    console.log(
      "Category Products:",
      categoryProducts
    );

    const product =
      categoryProducts.find(
        item =>
          String(item.id) ===
          String(productId)
      );

    console.log(
      "Found Product:",
      product
    );

    if (!product) {

      console.error(
        "PRODUCT NOT FOUND FOR QUICK VIEW:",
        productId
      );

      return;
    }

    openCategoryQuickView(product);

  }
);

// =========================================
// COLOR + SIZE SELECTION
// =========================================

categoryQuickView.addEventListener(
  "click",
  function (event) {

    // =========================================
    // COLOR
    // =========================================

    const colorButton =
      event.target.closest(
        ".quick-color"
      );


    if (colorButton) {

      categoryQuickView
        .querySelectorAll(
          ".quick-color"
        )
        .forEach(
          button => {

            button.classList.remove(
              "active"
            );

          }
        );


      colorButton.classList.add(
        "active"
      );


      selectedQuickViewColor =
        colorButton.dataset.color;


      selectedQuickViewColorIndex =
        Number(
          colorButton.dataset.colorIndex
        );


      updateQuickViewSelection();

      return;

    }


    // =========================================
    // SIZE
    // =========================================

    const sizeButton =
      event.target.closest(
        ".size-btn"
      );


    if (sizeButton) {

      categoryQuickView
        .querySelectorAll(
          ".size-btn"
        )
        .forEach(
          button => {

            button.classList.remove(
              "active"
            );

          }
        );


      sizeButton.classList.add(
        "active"
      );


      selectedQuickViewSize =
        sizeButton.dataset.size;


      updateQuickViewSelection();

    }

  }
);


// =========================================
// UPDATE SELECTION TEXT
// =========================================

function updateQuickViewSelection() {

  const selection =
    categoryQuickView.querySelector(
      "#categoryQuickViewSelection"
    );


  if (
    selectedQuickViewColor &&
    selectedQuickViewSize
  ) {

    selection.textContent =
      `Color ${
        selectedQuickViewColorIndex + 1
      } • Size ${
        selectedQuickViewSize
      }`;

    return;

  }


  if (selectedQuickViewColor) {

    selection.textContent =
      "Select a size";

    return;

  }


  selection.textContent =
    "Select a color and size";

}


// =========================================
// CLOSE BUTTON
// =========================================

categoryQuickView
  .querySelector(
    ".quick-view-close"
  )
  .addEventListener(
    "click",
    closeCategoryQuickView
  );


// =========================================
// OVERLAY CLOSE
// =========================================

categoryQuickView
  .querySelector(
    ".quick-view-overlay"
  )
  .addEventListener(
    "click",
    closeCategoryQuickView
  );


// =========================================
// ESC KEY
// =========================================

document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape" &&
      categoryQuickView.classList.contains(
        "active"
      )
    ) {

      closeCategoryQuickView();

    }

  }
);


// =========================================
// FIND SHOPIFY VARIANT
// =========================================

function findShopifyVariant(
  product,
  selectedColor,
  selectedSize
) {

  const variants =
    product.shopifyVariants || [];


  if (!variants.length) {
    return null;
  }


  const normalizedSize =
    String(selectedSize || "")
      .trim()
      .toLowerCase();


  const normalizedColor =
    String(selectedColor || "")
      .trim()
      .toLowerCase();


  // =========================================
  // TRY COLOR + SIZE MATCH
  // =========================================

  const exactVariant =
    variants.find(
      variant => {

        const options =
          variant.selectedOptions || [];


        const sizeOption =
          options.find(
            option =>
              option.name
                ?.trim()
                .toLowerCase() ===
              "size"
          );


        const colorOption =
          options.find(
            option => {

              const name =
                option.name
                  ?.trim()
                  .toLowerCase();


              return (
                name === "color" ||
                name === "colour"
              );

            }
          );


        const sizeMatches =
          sizeOption?.value
            ?.trim()
            .toLowerCase() ===
          normalizedSize;


        const colorMatches =
          !colorOption ||
          colorOption.value
            ?.trim()
            .toLowerCase() ===
          normalizedColor;


        return (
          sizeMatches &&
          colorMatches
        );

      }
    );


  if (exactVariant) {
    return exactVariant;
  }


  // =========================================
  // FALLBACK: SIZE ONLY
  // =========================================

  return variants.find(
    variant => {

      const sizeOption =
        variant.selectedOptions
          ?.find(
            option =>
              option.name
                ?.trim()
                .toLowerCase() ===
              "size"
          );


      return (
        sizeOption?.value
          ?.trim()
          .toLowerCase() ===
        normalizedSize
      );

    }
  ) || null;

}


// =========================================
// ADD TO BAG
// =========================================

categoryQuickView
  .querySelector("#categoryQuickViewAdd")
  .addEventListener(
    "click",
    async function () {

      if (!currentQuickViewProduct) {
        return;
      }


      if (!selectedQuickViewSize) {

        alert(
          "Please select a size."
        );

        return;

      }


      const selectedShopifyVariant =
        findShopifyVariant(
          currentQuickViewProduct,
          selectedQuickViewColor,
          selectedQuickViewSize
        );


      if (!selectedShopifyVariant) {

        alert(
          "Selected size is not available."
        );

        return;

      }


      try {

        // =========================================
        // GET EXISTING SHOPIFY CART
        // =========================================

        let shopifyCartId =
          localStorage.getItem(
            "genzmodeShopifyCartId"
          );


        let shopifyCart;


        // =========================================
        // CREATE NEW SHOPIFY CART
        // =========================================

        if (!shopifyCartId) {

          shopifyCart =
            await createShopifyCart(
              selectedShopifyVariant.id,
              1
            );

        }


        // =========================================
        // ADD TO EXISTING SHOPIFY CART
        // =========================================

        else {

          shopifyCart =
            await addToExistingShopifyCart(
              shopifyCartId,
              selectedShopifyVariant.id,
              1
            );

        }


        // =========================================
        // GET SHOPIFY CART LINE ID
        // =========================================

        const shopifyCartLine =
          shopifyCart.lines?.nodes?.find(line => {
            return (
              line.merchandise?.id ===
              selectedShopifyVariant.id
            );
          });

        const shopifyCartLineId =
          shopifyCartLine?.id || "";


        // =========================================
        // SAVE SHOPIFY CART
        // =========================================

        localStorage.setItem(
          "genzmodeShopifyCartId",
          shopifyCart.id
        );


        localStorage.setItem(
          "genzmodeShopifyCheckoutUrl",
          shopifyCart.checkoutUrl
        );


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
              selectedShopifyVariant.price?.amount ||
              currentQuickViewProduct.price
            ),

          image:
            currentQuickViewProduct.front,

          category:
            currentQuickViewProduct.category,

          color:
            selectedQuickViewColor,

          colorIndex:
            selectedQuickViewColorIndex,

          size:
            selectedQuickViewSize,

          quantity:
            1,

          shopifyProductId:
            currentQuickViewProduct.shopifyId ||
            null,

          shopifyVariantId:
            selectedShopifyVariant.id,


            shopifyCartLineId: shopifyCartLineId,

          currencyCode:
            selectedShopifyVariant.price?.currencyCode ||
            "INR"


            
        };

        console.log("Shopify Cart Line ID:", shopifyCartLineId);


        // =========================================
        // GET LOCAL BAG
        // =========================================

        let bag = [];


        try {

          bag =
            JSON.parse(
              localStorage.getItem(
                "genzmodeBag"
              )
            ) || [];

        } catch (error) {

          console.warn(
            "Unable to read existing bag.",
            error
          );

          bag = [];

        }


        // =========================================
        // CHECK EXISTING ITEM
        // =========================================

        const existingItemIndex =
          bag.findIndex(
            item =>
              item.productId ===
                bagItem.productId &&

              item.color ===
                bagItem.color &&

              item.size ===
                bagItem.size
          );


        // =========================================
        // INCREASE QUANTITY
        // =========================================

        if (
          existingItemIndex !== -1
        ) {

          bag[
            existingItemIndex
          ].quantity += 1;

        }


        // =========================================
        // ADD NEW ITEM
        // =========================================

        else {

          bag.push(
            bagItem
          );

        }


        // =========================================
        // SAVE LOCAL BAG
        // =========================================

        localStorage.setItem(
          "genzmodeBag",
          JSON.stringify(bag)
        );

updateCategoryBagCount();


        // =========================================
        // NOTIFY BAG
        // =========================================

        document.dispatchEvent(
          new CustomEvent(
            "genzmodeBagUpdated",
            {
              detail: {
                bag: bag,
                addedItem: bagItem
              }
            }
          )
        );


        // =========================================
        // SUCCESS
        // =========================================

       showWishlistToast("Added to bag");

closeCategoryQuickView();

        // =========================================
        // CLOSE MODAL
        // =========================================

        closeCategoryQuickView();


      } catch (error) {

        console.error(
          "ADD TO BAG ERROR:",
          error
        );


        alert(
          error.message ||
          "Unable to add item to bag."
        );

      }

    }
  );


  
  // =========================================
// CATEGORY NAVBAR - WISHLIST + BAG
// =========================================

const categoryWishlistButton =
  document.getElementById("wishlistNavButton");

const categoryWishlistOverlay =
  document.getElementById("wishlistOverlay");

const categoryWishlistClose =
  document.getElementById("wishlistDrawerClose");

const categoryWishlistItems =
  document.getElementById("wishlistItems");

const categoryBagButton =
  document.getElementById("bagButton");

const categoryBagOverlay =
  document.getElementById("bagOverlay");

const categoryBagDrawer =
  document.getElementById("bagDrawer");

const categoryBagClose =
  document.getElementById("bagClose");

const categoryBagContent =
  document.getElementById("bagContent");

const categoryBagCount =
  document.getElementById("bagCount");

  const categoryBagSubtotal =
  document.getElementById("bagSubtotal");

const categoryBagCheckout =
  document.getElementById("bagCheckout");

const categoryWishlistCount =
  document.getElementById("wishlistCount");


// =========================================
// GET WISHLIST
// =========================================

function getCategoryWishlist() {
  try {
    return JSON.parse(
      localStorage.getItem("genzmodeWishlist")
    ) || [];
  } catch {
    return [];
  }
}


// =========================================
// GET BAG
// =========================================

function getCategoryBag() {
  try {
    return JSON.parse(
      localStorage.getItem("genzmodeBag")
    ) || [];
  } catch {
    return [];
  }
}


// =========================================
// UPDATE WISHLIST COUNT
// =========================================

function updateCategoryWishlistCount() {

  const wishlist =
    getCategoryWishlist();

  if (categoryWishlistCount) {
    categoryWishlistCount.textContent =
      wishlist.length;
  }
}



// =========================================
// RENDER CATEGORY WISHLIST
// =========================================

function renderCategoryWishlist() {

  if (!categoryWishlistItems) return;

  const wishlist =
    getCategoryWishlist();

  if (wishlist.length === 0) {

    categoryWishlistItems.innerHTML = `
      <div class="wishlist-empty">
        <p>Your wishlist is empty.</p>
      </div>
    `;

    return;
  }

  categoryWishlistItems.innerHTML =
    wishlist.map(product => {

      const image =
        product.front ||
        product.image ||
        product.images?.[0] ||
        "";

      return `
        <div
          class="wishlist-item"
          data-product="${product.id}"
        >

          <img
            src="${image}"
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

        </div>
      `;

    }).join("");
}


// =========================================
// CATEGORY WISHLIST DRAWER ACTIONS
// =========================================

if (categoryWishlistItems) {

  categoryWishlistItems.addEventListener(
    "click",
    function (event) {

      // -----------------------------
      // REMOVE FROM WISHLIST
      // -----------------------------

      const removeButton =
        event.target.closest(".wishlist-remove-btn");

      if (removeButton) {

        const productId =
          removeButton.dataset.product;

        let wishlist =
          getCategoryWishlist();

        wishlist =
          wishlist.filter(
            item =>
              String(item.id) !==
              String(productId)
          );

        localStorage.setItem(
          "genzmodeWishlist",
          JSON.stringify(wishlist)
        );

        updateCategoryWishlistCount();

        renderCategoryWishlist();

        // Update heart on category page
        const wishlistButton =
          categoryProductGrid.querySelector(
            `.wishlist-btn[data-product="${productId}"]`
          );

        if (wishlistButton) {
          wishlistButton.classList.remove("active");
          wishlistButton.innerHTML = "♡";
        }

        showWishlistToast(
          "Removed from wishlist"
        );

        return;
      }


      // -----------------------------
      // ADD TO BAG
      // -----------------------------

      const addButton =
        event.target.closest(
          ".wishlist-add-to-bag-btn"
        );

      if (addButton) {

        const productId =
          addButton.dataset.product;

        const wishlist =
          getCategoryWishlist();

        const product =
          wishlist.find(
            item =>
              String(item.id) ===
              String(productId)
          );

        if (!product) {
          console.error(
            "Wishlist product not found:",
            productId
          );
          return;
        }

        // Close wishlist drawer
        categoryWishlistOverlay?.classList.remove(
          "active"
        );

        // Open the existing Quick View
        // so user can select size/color
        openCategoryQuickView(product);
      }

    }
  );

}



// =========================================
// UPDATE BAG COUNT
// =========================================

function updateCategoryBagCount() {

  const bag =
    getCategoryBag();

  const totalQuantity =
    bag.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );

  if (categoryBagCount) {
    categoryBagCount.textContent =
      totalQuantity;
  }
}


// =========================================
// OPEN WISHLIST
// =========================================

if (categoryWishlistButton) {

  categoryWishlistButton.addEventListener(
    "click",
    function () {

      renderCategoryWishlist();

      if (categoryWishlistOverlay) {
        categoryWishlistOverlay.classList.add(
          "active"
        );
      }

    }
  );
}


// =========================================
// CLOSE WISHLIST
// =========================================

if (categoryWishlistClose) {

  categoryWishlistClose.addEventListener(
    "click",
    function () {

      categoryWishlistOverlay?.classList.remove(
        "active"
      );

    }
  );
}


// =========================================
// OPEN BAG
// =========================================

if (categoryBagButton) {

  categoryBagButton.addEventListener(
    "click",
    function () {

      renderCategoryBag();

      categoryBagOverlay?.classList.add(
        "active"
      );

      categoryBagDrawer?.classList.add(
        "active"
      );

    }
  );
}


// =========================================
// CLOSE BAG
// =========================================

if (categoryBagClose) {

  categoryBagClose.addEventListener(
    "click",
    function () {

      categoryBagOverlay?.classList.remove(
        "active"
      );

      categoryBagDrawer?.classList.remove(
        "active"
      );

    }
  );
}


// =========================================
// CLOSE BAG BY OVERLAY
// =========================================

if (categoryBagOverlay) {

  categoryBagOverlay.addEventListener(
    "click",
    function () {

      categoryBagOverlay.classList.remove(
        "active"
      );

      categoryBagDrawer?.classList.remove(
        "active"
      );

    }
  );
}


// =========================================
// INITIAL COUNTS
// =========================================

updateCategoryWishlistCount();
updateCategoryBagCount();


// =========================================
// LISTEN FOR BAG UPDATES
// =========================================

window.addEventListener(
  "genzmodeBagUpdated",
  function () {

    updateCategoryBagCount();

  }
);


// =========================================
// LISTEN FOR STORAGE UPDATES
// =========================================

window.addEventListener(
  "storage",
  function () {

    updateCategoryWishlistCount();
    updateCategoryBagCount();

  }
);


// =========================================
// WISHLIST DRAWER
// =========================================

if (categoryWishlistButton) {

  categoryWishlistButton.addEventListener(
    "click",
    function () {

      renderCategoryWishlist();
      updateCategoryWishlistCount();

      if (categoryWishlistOverlay) {
        categoryWishlistOverlay.classList.add("active");
      }

    }
  );

}


if (categoryWishlistClose) {

  categoryWishlistClose.addEventListener(
    "click",
    function () {

      categoryWishlistOverlay.classList.remove(
        "active"
      );

    }
  );

}


if (categoryWishlistOverlay) {

  categoryWishlistOverlay.addEventListener(
    "click",
    function (event) {

      if (
        event.target ===
        categoryWishlistOverlay
      ) {

        categoryWishlistOverlay.classList.remove(
          "active"
        );

      }

    }
  );

}



// =========================================
// CATEGORY BAG - RENDER ITEMS
// =========================================

function renderCategoryBag() {

  if (!categoryBagContent) return;

  const bag = getCategoryBag();

  if (bag.length === 0) {

    categoryBagContent.innerHTML = `
      <div class="bag-empty">
        <div class="bag-empty-icon">&#128717;</div>
        <h3>Your bag is empty</h3>
        <p>Discover something you'll love.</p>
      </div>
    `;

    if (categoryBagCheckout) {
      categoryBagCheckout.disabled = true;
    }

    updateCategoryBagSubtotal();

    return;
  }

  categoryBagContent.innerHTML = bag.map(item => {

    const image =
      item.front ||
      item.image ||
      item.images?.[0] ||
      "";

    const quantity =
      Number(item.quantity || 1);

    const price =
      Number(item.price || 0);

    return `
      <div
        class="bag-item"
        data-product="${item.id}"
        data-size="${item.size || ""}"
        data-color="${item.color || ""}"
      >

        <img
          src="${image}"
          alt="${item.title}"
          class="bag-item-image"
        >

        <div class="bag-item-info">

          <h3>${item.title}</h3>

          ${
            item.color
              ? `<p>Color: ${item.color}</p>`
              : ""
          }

          ${
            item.size
              ? `<p>Size: ${item.size}</p>`
              : ""
          }

          <strong>
            ₹${price.toLocaleString("en-IN")}
          </strong>

          <div class="bag-item-bottom">

            <div class="bag-quantity">

              <button
                type="button"
                class="bag-quantity-btn bag-minus"
                data-product="${item.id}"
                data-size="${item.size || ""}"
                data-color="${item.color || ""}"
              >
                −
              </button>

              <span>${quantity}</span>

              <button
                type="button"
                class="bag-quantity-btn bag-plus"
                data-product="${item.id}"
                data-size="${item.size || ""}"
                data-color="${item.color || ""}"
              >
                +
              </button>

            </div>

            <button
              type="button"
              class="bag-remove-btn"
              data-product="${item.id}"
              data-size="${item.size || ""}"
              data-color="${item.color || ""}"
            >
              REMOVE
            </button>

          </div>

        </div>

      </div>
    `;

  }).join("");

  updateCategoryBagSubtotal();

  if (categoryBagCheckout) {
    categoryBagCheckout.disabled = false;
  }
}



// =========================================
// CATEGORY BAG - QUANTITY + REMOVE
// =========================================

if (categoryBagContent) {

  categoryBagContent.addEventListener(
    "click",
    function (event) {

      // ---------------------------------
      // GET BUTTON
      // ---------------------------------

      const button =
        event.target.closest(
          ".bag-quantity-btn, .bag-remove-btn"
        );

      if (!button) return;

      const productId =
        button.dataset.product;

      const size =
        button.dataset.size || "";

      const color =
        button.dataset.color || "";

      let bag =
        getCategoryBag();

      // Find exact product + size + color
      const itemIndex =
        bag.findIndex(item =>
          String(item.id) === String(productId) &&
          String(item.size || "") === String(size) &&
          String(item.color || "") === String(color)
        );

      if (itemIndex === -1) {
        console.error(
          "Bag item not found:",
          productId,
          size,
          color
        );
        return;
      }


      // ---------------------------------
      // REMOVE
      // ---------------------------------

      if (
        button.classList.contains(
          "bag-remove-btn"
        )
      ) {

        bag.splice(itemIndex, 1);

        localStorage.setItem(
          "genzmodeBag",
          JSON.stringify(bag)
        );

        renderCategoryBag();
        updateCategoryBagCount();

        window.dispatchEvent(
          new Event("genzmodeBagUpdated")
        );

        showWishlistToast(
          "Removed from bag"
        );

        return;
      }


      // ---------------------------------
      // PLUS
      // ---------------------------------

      if (
        button.classList.contains(
          "bag-plus"
        )
      ) {

        bag[itemIndex].quantity =
          Number(
            bag[itemIndex].quantity || 1
          ) + 1;
      }


      // ---------------------------------
      // MINUS
      // ---------------------------------

      if (
        button.classList.contains(
          "bag-minus"
        )
      ) {

        const currentQuantity =
          Number(
            bag[itemIndex].quantity || 1
          );

        if (currentQuantity > 1) {
          bag[itemIndex].quantity =
            currentQuantity - 1;
        }
      }


      // ---------------------------------
      // SAVE
      // ---------------------------------

      localStorage.setItem(
        "genzmodeBag",
        JSON.stringify(bag)
      );

      // Update drawer
      renderCategoryBag();

      // Update navbar count
      updateCategoryBagCount();

      // Notify other bag listeners
      window.dispatchEvent(
        new Event("genzmodeBagUpdated")
      );

    }
  );

}

// =========================================
// CATEGORY BAG - SUBTOTAL
// =========================================

function updateCategoryBagSubtotal() {

  if (!categoryBagSubtotal) return;

  const bag = getCategoryBag();

  const subtotal =
    bag.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
        Number(item.quantity || 1),
      0
    );

  categoryBagSubtotal.textContent =
    `₹${subtotal.toLocaleString("en-IN")}`;
}



 
// =========================================
// CATEGORY BAG - SHOPIFY CHECKOUT
// =========================================

if (categoryBagCheckout) {
  categoryBagCheckout.addEventListener("click", async function () {
    const bag = getCategoryBag();

    if (!bag.length) {
      showWishlistToast("Your bag is empty");
      return;
    }

    const originalText = categoryBagCheckout.textContent;
    categoryBagCheckout.disabled = true;
    categoryBagCheckout.textContent = "PREPARING CHECKOUT...";

    try {
      const cart = await createShopifyCartFromBag(bag);

      localStorage.setItem("genzmodeShopifyCartId", cart.id);
      localStorage.setItem("genzmodeShopifyCheckoutUrl", cart.checkoutUrl);

      window.location.href = cart.checkoutUrl;
    } catch (error) {
      console.error("Shopify checkout failed:", error);
      alert(error.message || "Unable to start checkout. Please try again.");
    } finally {
      categoryBagCheckout.disabled = false;
      categoryBagCheckout.textContent = originalText;
    }
  });
}
