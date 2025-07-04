fetch('https://meaningful-horse-99e25d03c1.strapiapp.com/api/tileheading?populate=images')
  .then(res => res.json())
  .then(data => {
    const heading = data.data.heading || "Default Heading";
    document.getElementById('tile-heading').textContent = heading;

    const images = data.data.images || [];
    if (images.length > 0) {
      const imageUrl = images[0].url;
      const fullUrl = imageUrl.startsWith('http') ? imageUrl : `https://meaningful-horse-99e25d03c1.strapiapp.com${imageUrl}`;

      const heroSection = document.querySelector('.position-relative.bg-dark.text-white');
      if (heroSection) {
        heroSection.style.backgroundImage = `url('${fullUrl}')`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'center';
      }
    }
  })
  .catch(err => console.error("Error fetching granite heading or image:", err));


//  SCRIPT TO LOAD TILE CATEGORIES AT THE TOP
fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/tilecategories?populate=*")
  .then(res => res.json())
  .then(data => {
    const categories = data.data;
    const container = document.getElementById("tile-category-buttons");

    categories.forEach(category => {
      const name = category.name || category.attributes?.name;
      const slug = category.slug || category.attributes?.slug;

      const imageData = category.image?.[0] || category.attributes?.image?.data?.[0];
      const imageUrl = imageData?.formats?.thumbnail?.url || imageData?.url || "https://via.placeholder.com/55";
      const button = document.createElement("div");
      button.className = "text-center";

      button.innerHTML = `
        <button class="btn btn-light rounded-circle border border-dark category-btn"
          data-target="${slug}-tiles"
          style="width: 55px; height: 55px; overflow: hidden; padding: 0;">
          <img src="${imageUrl}" class="w-100 h-100" style="object-fit: cover;">
        </button>
        <div class="small fw-bold mt-1">${name}</div>
      `;
      container.appendChild(button);
    });

    // After appending all buttons
    container.querySelectorAll(".category-btn").forEach(button => {
      button.addEventListener("click", function () {
        const targetId = this.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
          targetSection.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

  })
  .catch(error => {
    console.error("Error fetching tile categories:", error);
  });

//  SCRIPT TO LOAD IMAGES FROM THE STRAPI FOR PRODUCT GRID
document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("wall-tiles-container");

  const viewMoreBtn = document.getElementById("viewMoreWall");
  const viewLessBtn = document.getElementById("viewLessWall");

  const allWallTiles = [];
  let currentVisibleCount = 0;
  const tilesPerClick = 4;

  function createTileCard(title, price, imageUrl, colorsArray) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3";

    col.innerHTML = `
        <div class="card h-100 shadow-sm border-0">
            <img src="${imageUrl}" class="card-img-top" alt="${title}" style="height: 180px; object-fit: cover;">
            <h6 class="bg-dark text-white py-2 fw-semibold text-center m-0">${title}</h6>
            <div class="card-body text-center px-2">
                <div class="d-flex justify-content-between align-items-center">
                    <span class="fw-bold text-dark">₹${price}</span>
                    <button class="btn btn-outline-dark btn-sm view-btn" data-bs-toggle="modal"
                            data-bs-target="#quickViewModal"
                            data-title="${title}" data-price="${price}"
                            data-colors='${JSON.stringify(colorsArray)}'>
                        View
                    </button>
                </div>
            </div>
        </div>
      `;
    container.appendChild(col);
  }

  function renderTiles(count) {
    const nextTiles = allWallTiles.slice(currentVisibleCount, currentVisibleCount + count);
    nextTiles.forEach(tile => {
      createTileCard(tile.title, tile.price, tile.image, tile.colorsArray);
    });
    currentVisibleCount += nextTiles.length;

    if (currentVisibleCount >= allWallTiles.length) {
      viewMoreBtn.classList.add("d-none");
      viewLessBtn.classList.remove("d-none");
    } else {
      viewMoreBtn.classList.remove("d-none");
      viewLessBtn.classList.add("d-none");
    }
  }

  fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/tiles?populate=*")
    .then(response => response.json())
    .then(data => {
      const tiles = data.data;

      tiles.forEach(tile => {
        const title = tile.title;
        const price = tile.price;

        const image = tile.image?.url
          ? tile.image.url.startsWith("http")
            ? tile.image.url
            : `https://meaningful-horse-99e25d03c1.media.strapiapp.com${tile.image.url}`
          : "";

        const category = tile.tilecategory?.name;

        const colorsRaw = tile.colors || [];
        const colorsArray = [image, ...colorsRaw.map(c =>
          c.url.startsWith("http")
            ? c.url
            : `https://meaningful-horse-99e25d03c1.media.strapiapp.com${c.url}`
        )];

        if (category && category.toLowerCase() === "wall") {
          allWallTiles.push({
            title,
            price,
            image,
            colorsArray
          });
        }
      });

      renderTiles(tilesPerClick);

      if (allWallTiles.length <= tilesPerClick) {
        viewMoreBtn.classList.add("d-none");
        viewLessBtn.classList.add("d-none");
      } else {
        viewMoreBtn.classList.remove("d-none");
      }
    })
    .catch(err => console.error("Error fetching tiles:", err));

  viewMoreBtn.addEventListener("click", function () {
    renderTiles(tilesPerClick);
  });

  viewLessBtn.addEventListener("click", function () {
    container.innerHTML = "";
    currentVisibleCount = 0;
    renderTiles(tilesPerClick);
  });
});

// SCRIPT FOR VIEW BUTTON UNDER EACH PRODUCT GRID
document.addEventListener("click", function (e) {
  if (e.target && e.target.classList.contains("view-btn")) {
    const button = e.target;
    const title = button.getAttribute("data-title");
    const price = button.getAttribute("data-price");
    const colors = JSON.parse(button.getAttribute("data-colors") || "[]");

    // Set modal content
    document.getElementById("modalTileTitle").textContent = title;
    document.getElementById("modalTilePrice").textContent = `₹${price}`;
    console.log("Clicked button:", title, price, colors);
    document.getElementById("modalTileImg").src = colors[0] || "";

    // Clear and add color circles
    const colorContainer = document.getElementById("colorVariants");
    colorContainer.innerHTML = "";
    colors.forEach((colorUrl, index) => {
      const btn = document.createElement("button");
      btn.className = "border rounded-circle p-2";
      btn.style.width = "40px";
      btn.style.height = "40px";
      btn.style.backgroundImage = `url(${colorUrl})`;
      btn.style.backgroundSize = "cover";
      btn.style.backgroundPosition = "center";
      btn.title = `Color ${index + 1}`;
      btn.onclick = () => {
        document.getElementById("modalTileImg").src = colorUrl;
      };
      colorContainer.appendChild(btn);
    });
  }
});
