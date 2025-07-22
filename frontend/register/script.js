document.getElementById("registerForm").
  addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value.trim();
  const address = document.getElementById("address").value.trim();

  // for sending data to backend
  const res = await fetch("http://localhost/Template_CRUD_Auth_PHPMySQL/backend/config/register.php", {
    
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, mobile, password, address }),
  });

  // for getting data from backend
  const data = await res.json();
  alert(data.message);

  if (data.status === "success") {
    // Optionally redirect to login page
    window.location.href = "../login/index.html";
  }
});
