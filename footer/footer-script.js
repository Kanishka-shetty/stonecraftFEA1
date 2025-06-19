fetch("https://meaningful-horse-99e25d03c1.strapiapp.com/api/footers")
  .then(res => res.json())
  .then(data => {
    const footerData = data.data[0];
    const footer = footerData.attributes || footerData;

    // Phone
    const phone = footer.Phone;
    const phoneElement = document.getElementById("footer-phone");
    if (phoneElement && phone) {
      phoneElement.textContent = phone;
      phoneElement.href = `tel:${phone}`;
    }

    // Email
    const email = footer.Email;
    const emailElement = document.getElementById("footer-email");
    if (emailElement && email) {
      emailElement.textContent = email;
      emailElement.href = `mailto:${email}`;
    }

    // Address
    const address = footer.Address;
    const addressElement = document.getElementById("footer-address");
    if (addressElement && address) {
      addressElement.innerHTML = address.replace(/\n/g, "<br>");
    }
  })
  .catch(err => console.error("Error loading footer data:", err));
