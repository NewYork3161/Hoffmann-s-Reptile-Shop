document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message")
  };

  try {
    const res = await fetch("/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      alert("Message sent successfully!");
      this.reset();
    } else {
      alert("Failed to send message. Please try again.");
    }
  } catch (err) {
    alert("An error occurred.");
    console.error(err);
  }
});
