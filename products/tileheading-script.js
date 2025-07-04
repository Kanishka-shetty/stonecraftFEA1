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