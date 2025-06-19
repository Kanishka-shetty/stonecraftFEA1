fetch('https://meaningful-horse-99e25d03c1.strapiapp.com/api/quartzheading?populate=images')
  .then(res => res.json())
  .then(data => {
    const heading = data.data.heading || "Default Heading";
    document.getElementById('quartz-heading').textContent = heading;

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
  .catch(err => console.error("Error fetching quartz heading or image:", err));
