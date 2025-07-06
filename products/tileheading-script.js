// SCRIPT FOR LOGO
fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/heroes?populate=*")
  .then(res => res.json())
  .then(data => {
    const logoImage = data.data[0].logo[0];
    
    const imageUrl = logoImage.url;

    // Set it into the <img> tag
    document.getElementById("logo-img").src = imageUrl;
  })
  .catch(error => console.error("Error loading logo image:", error));


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

// SCRIPT TO LOAD TILES FROM STRAPI API
document.addEventListener("DOMContentLoaded", function () {
    const tilesPerClick = 4;

    // Config for all categories
    const categories = [
      { name: "Wall", id: "wall" },
      { name: "Floor", id: "floor" },
      { name: "Bathroom", id: "bathroom" },
      { name: "Kitchen", id: "kitchen" },
      { name: "General", id: "general" }
    ];

    const tileDataMap = {};

    // Card Generator
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
      return col;
    }

    // Renderer
    function renderTiles(catId) {
      const { tiles, count, container, viewMoreBtn, viewLessBtn } = tileDataMap[catId];
      const next = tiles.slice(count.value, count.value + tilesPerClick);
      next.forEach(tile => {
        const card = createTileCard(tile.title, tile.price, tile.image, tile.colorsArray);
        container.appendChild(card);
      });
      count.value += next.length;

      if (count.value >= tiles.length) {
        viewMoreBtn.classList.add("d-none");
        viewLessBtn.classList.remove("d-none");
      } else {
        viewMoreBtn.classList.remove("d-none");
        viewLessBtn.classList.add("d-none");
      }
    }

    // Fetch tiles
    fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/tiles?populate=*")
      .then(res => res.json())
      .then(data => {
        const tiles = data.data;

        // Init data storage per category
        categories.forEach(({ name, id }) => {
          tileDataMap[id] = {
            tiles: [],
            count: { value: 0 },
            container: document.getElementById(`${id}-tiles-container`),
            viewMoreBtn: document.getElementById(`viewMore${name}`),
            viewLessBtn: document.getElementById(`viewLess${name}`)
          };
        });

        // Distribute tiles into categories
        tiles.forEach(tile => {
          const title = tile.title;
          const price = tile.price;
          const category = tile.tilecategory?.name?.toLowerCase();
          const image = tile.image?.url
            ? tile.image.url.startsWith("http")
              ? tile.image.url
              : `https://meaningful-horse-99e25d03c1.media.strapiapp.com${tile.image.url}`
            : "";
          const colorsRaw = tile.colors || [];
          const colorsArray = [image, ...colorsRaw.map(c =>
            c.url.startsWith("http")
              ? c.url
              : `https://meaningful-horse-99e25d03c1.media.strapiapp.com${c.url}`
          )];

          categories.forEach(({ name, id }) => {
            if (category === name.toLowerCase()) {
              tileDataMap[id].tiles.push({ title, price, image, colorsArray });
            }
          });
        });

        // Initial render + button setup
        categories.forEach(({ name, id }) => {
          const { tiles, viewMoreBtn, viewLessBtn } = tileDataMap[id];
          if (tiles.length > 0) {
            renderTiles(id);

            if (tiles.length <= tilesPerClick) {
              viewMoreBtn.classList.add("d-none");
              viewLessBtn.classList.add("d-none");
            } else {
              viewMoreBtn.classList.remove("d-none");
              viewLessBtn.classList.add("d-none");
            }

            viewMoreBtn.addEventListener("click", () => renderTiles(id));
            viewLessBtn.addEventListener("click", () => {
              tileDataMap[id].container.innerHTML = "";
              tileDataMap[id].count.value = 0;
              renderTiles(id);
            });
          }
        });
      })
      .catch(err => console.error("Error fetching tiles:", err));
  });