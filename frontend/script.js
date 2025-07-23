document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("emp-form");
    const tbody = document.querySelector(".table1 tbody");
    const submit_btn = document.querySelector(".btn");
  
    let editingId = null; // For tracking update mode
  
    // Load data from DB
    loadDataFromDB();
  
    // Handle form submit (add or update)
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      const name = document.getElementById("name").value.trim();
      const code = document.getElementById("code").value.trim();
  
      if (name === "" || code === "") {
        alert("Both fields are required!");
        return;
      }
  
      if (editingId) {
        // UPDATE existing employee
        fetch("../backend/crud/update.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingId, name: name, code: code }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              alert("Employee updated successfully");
              form.reset();
              editingId = null;
              submit_btn.textContent = "Add";
              loadDataFromDB(); // Reload updated data
            } else {
              alert("Update failed: " + data.message);
            }
          })
          .catch((err) => {
            console.error("Update Error:", err);
          });
      } else {
        // ADD new employee
        fetch("../backend/crud/add.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, code: code }),
        })
          .then((res) => res.json())  
          .then((data) => {
            //   print data
              console.log(data)        
            if (data.status === "success") {
              alert("Employee added successfully");
              console.log("Employee added successfully");
              form.reset();
              loadDataFromDB();
            } else {
                console.log("Insert failed: " + data.message);                
              alert("Insert failed: " + data.message);
            }
          })
          .catch((err) => {
            console.error("Add Error:", err);
          });
      }
    });
  
    // Load and display all employees
    function loadDataFromDB() {
      const tbody = document.querySelector("tbody"); // Make sure this matches your HTML
    
      fetch("../backend/crud/show.php")
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetch data : ", data);
    
          tbody.innerHTML = ""; // Clear old rows
    
          if (data.status === "success") {
            if (data.data.length === 0) {
              tbody.innerHTML = "<tr><td colspan='5'>No records found</td></tr>";
            }
    
            data.data.forEach((item) => {
              const row = document.createElement("tr");
              row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.emp_code}</td>
                <td><button class="edit"><i class="ri-edit-line"></i></button></td>
                <td><button class="delete"><i class="ri-chat-delete-line"></i></button></td>
              `;
    
              // Edit button logic
              row.querySelector(".edit").addEventListener("click", () => {
                document.getElementById("name").value = item.name;
                document.getElementById("code").value = item.emp_code;
                editingId = item.id;
                submit_btn.textContent = "Update";
              });
    
              // Delete button logic
              row.querySelector(".delete").addEventListener("click", () => {
                if (confirm("Are you sure you want to delete this entry?")) {
                  deleteEmployee(item.id);
                }
              });
    
              tbody.appendChild(row);
            });
          } else {
            console.error("Show Error:", data.message);
          }
        })
        .catch((err) => {
          console.error("Fetch Error (show):", err);
        });
    }
    
  
    // Delete employee
    function deleteEmployee(id) {
      fetch("../backend/crud/delete.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "success") {
            alert("Deleted successfully");
            loadDataFromDB();
          } else {
            alert("Delete failed: " + data.message);
          }
        })
        .catch((err) => {
          console.error("Delete Error:", err);
        });
    }
  });
  