
      fetch("http://localhost:1337/api/footers")
        .then(res => res.json())
        .then(data => {
          const footerData = data.data[0];
          const footer = footerData.attributes || footerData;

          document.getElementById("footer-phone").textContent = footer.Phone || "N/A";
          document.getElementById("footer-email").textContent = footer.Email || "N/A";
          document.getElementById("footer-address").textContent = footer.Address || "N/A";
        })
        .catch(err => console.error("Error loading footer data:", err));
  
