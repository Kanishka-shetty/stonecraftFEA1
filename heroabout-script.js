  fetch("http://localhost:1337/api/heroabouts")
    .then(response => response.json())
    .then(data => {
      const aboutText = data.data[0]?.content || "About content not available.";
      document.getElementById("about-para").textContent = aboutText;
    })
    .catch(error => {
      console.error("Error fetching About Us content:", error);
    });