document.getElementById("registerForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
    const password = document.getElementById("password").value.trim();
    const address = document.getElementById("address").value.trim();

    // Send data to backend
    try {
      const res = await fetch("http://208.91.199.11:3306/Template_CRUD_Auth_PHPMySQL/backend/config/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, mobile, password, address }),
      });

    const data = await res.json();
    alert(data.message); //register alert

    // for clearing data in input fields
    name.value = "";
    email.value = "";
    mobile.value = "";
    password.value = "";
    address.value = "";

    if (data.status === "success") {
      window.location.href = "../login/index.html";
    }

  } catch (error) {
    alert("Registration failed. Server not responding.");
    console.error("Error:", error);
  }
});
