document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("emp-form");
    const tbody = document.querySelector(".table1 tbody");
    const submit_btn = document.querySelector(".btn");
    const loadDataBtn = document.querySelector("#loadData");

    let editingId = 0;

    printAllEmployees();

    // Handle form submit (add or update)
    form.addEventListener("submit", function (e) {
      e.preventDefault();  //for stoping browser defaulting behaviour
  
      const name = document.getElementById("name").value.trim();
      const code = document.getElementById("code").value.trim();

      console.log("print name : ", name, "print code : ", code);
      

      if (name === "" || code === "") {
        alert("Both fields are required!");
        return;
      }
  
      if (editingId !== 0) {
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
              editingId = 0;
              submit_btn.value = "Add Data";
              printAllEmployees();
            } 
            else {
              alert("Update failed: " + data.message);
            }
          })
          .catch((err) => {
            console.error("Update Error:", err);
          });
      } 
      else {
        // ADD new employee
        fetch("../backend/crud/add.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: name, code: code }),
        })
          .then((res) => res.json())  
          .then((data) => {
            //   print data
              console.log("print data from --// ADD new employee ",data)        
            if (data.status === "success") {
              alert("Employee added successfully");
              console.log("Employee added successfully(line:67)");
              form.reset();
              // loadDataFromDB();
              printAllEmployees();
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


    // Show data on page loading
    function printAllEmployees() {
      fetch("../backend/crud/show.php")
        .then((res) => res.json())
        .then((data) => {
          console.log("Raw data from show.php:", data);
    
          // Clear existing table rows first
          tbody.innerHTML = "";
    
          if (data.status === "success" && data.data.length > 0) {
            data.data.forEach((item, index) => {
              const tr = document.createElement("tr");
    
              tr.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.emp_code}</td>
                <td><button class="edit-btn" data-id="${item.id}" data-name="${item.name}" data-code="${item.emp_code}"><i class="ri-edit-line"></i></button></td>
                <td><button class="delete-btn" data-id="${item.id}"><i class="ri-chat-delete-line"></i></button></td>
              `;
    
              tbody.appendChild(tr);
            });
  
            // call function
            handleEditButtons();
            handleDeleteButtons();

          } else {
            // No records found
            const tr = document.createElement("tr");
            tr.innerHTML = `<td colspan="5" style="text-align:center; color: gray;">No records found</td>`;
            tbody.appendChild(tr);
          }
        })
        .catch((err) => {
          console.error("Error fetching all employees:", err);
        });
    }
    


 // Delete handler
 function handleDeleteButtons() {
  const deleteButtons = document.querySelectorAll(".delete-btn");
  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");

      if (confirm("Are you sure you want to delete this employee?")) {
        fetch("../backend/crud/delete.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: id }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "success") {
              alert("Employee deleted successfully");
              printAllEmployees();
            } else {
              alert("Delete failed: " + data.message);
            }
          })
          .catch((err) => console.error("Delete Error:", err));
      }
    });
  });
}

// Edit handler
function handleEditButtons() {
  const editButtons = document.querySelectorAll(".edit-btn");
  editButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const name = btn.getAttribute("data-name");
      const code = btn.getAttribute("data-code");

      // Fill form
      document.getElementById("name").value = name;
      document.getElementById("code").value = code;

      editingId = id;
      submit_btn.value = "Update Data"; // Change button text
    });
  });
}
});