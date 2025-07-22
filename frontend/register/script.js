const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); //for  stoping browser by-default behaviour

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const password = document.getElementById("password").value;
  const address = document.getElementById("address").value.trim;

  const response = await fetch("http://localhost/TEMPLATE/backend/auth/config/register.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, mobile, password, address })
  });

  const data = await response.json();

  if (data.status === "success") {
    msg.innerText = "Registered successfully. Please login.";
    msg.style.color = "green";
    form.reset();
  } else {
    msg.innerText = ` ${data.message}`;
    msg.style.color = "red";
  }
});
