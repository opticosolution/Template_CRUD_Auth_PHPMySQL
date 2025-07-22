document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const data = {
      mobile: document.getElementById("mobile").value,
      password: document.getElementById("password").value
    };
  
    fetch("http://localhost/backend/config/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(res => {
        document.getElementById("message").innerText = res.message;
      })
      .catch(err => console.error("Error:", err));
  });
  