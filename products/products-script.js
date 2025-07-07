fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/products?populate=image")
  .then(res => res.json())
  .then(data => {
    const products = data.data;
    const container = document.querySelector('.products-container');
    container.innerHTML = ''; 

    products.forEach(product => {
      const id = product.id;
      const name = product.productname;
      const slug = product.slug;
      const images = product.image;

      if (!images || images.length === 0) return;

      const imageUrl = images[0].url;
      const fullImageUrl = imageUrl.startsWith("http") ? imageUrl : "https://meaningful-horse-99e25d03c1.strapiapp.com" + imageUrl;

      // ✅ Create Bootstrap column
      const col = document.createElement('div');
      col.className = 'col-md-3 col-sm-6 mb-4';

      // ✅ Create product card inside it
      const card = document.createElement('div');
      card.className = 'product-card loaded';
      card.innerHTML = `
        <div class="product-title">${name}</div>
        <img class="product-img" src="${fullImageUrl}" alt="${name}" />
        <a href="products/${slug}.html" class="btn btn-outline-light btn-sm mt-2">View More</a>
      `;

      col.appendChild(card);      // add card to column
      container.appendChild(col); // add column to row container
    });
  })
  .catch(err => console.error("Error fetching products:", err));
