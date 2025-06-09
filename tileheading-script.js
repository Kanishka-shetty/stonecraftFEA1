  fetch('http://localhost:1337/api/tileheading')
    .then(res => res.json())
    .then(data => {
      const heading = data.data.tileheading || "Default Heading";
      document.getElementById('tiles-heading').textContent = heading;
    })
    .catch(err => console.error("Error fetching tile heading:", err));