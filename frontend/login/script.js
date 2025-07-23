document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const data = {
    mobile: document.getElementById("mobile").value,
    password: document.getElementById("password").value
  };

  console.log("print data : ", data);

  fetch("http://localhost/Template_CRUD_Auth_PHPMySQL/backend/config/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(res => {
      // document.getElementById("message").innerText = res.message;
      alert("Login Successfully") //login alert

      // for clear input field
      mobile.value = "";
      password.value = "";


      if (res.status === "success") {
        window.location.href = "../index.html"; 
      }
    })
    .catch(err => console.error("Error:", err));
});
