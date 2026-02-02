const API_URL = "https://akcay-ahsap-api.onrender.com";

let token = "";

// LOGIN
document.getElementById("login-btn").onclick = async () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const res = await fetch(API_URL + "/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData
  });

  if (!res.ok) {
    document.getElementById("login-error").innerText = "Giriş başarısız";
    return;
  }

  const data = await res.json();
  token = data.access_token;

  document.getElementById("login-screen").style.display = "none";
  document.getElementById("app").style.display = "block";

  loadEmployees();
};

// LOAD EMPLOYEES
async function loadEmployees() {
  const res = await fetch(API_URL + "/employees", {
    headers: {
      "Authorization": "Bearer " + token
    }
  });

  const employees = await res.json();
  const tbody = document.getElementById("employee-table");
  tbody.innerHTML = "";

  employees.forEach(e => {
    const row = `
      <tr>
        <td>${e.id}</td>
        <td>${e.full_name}</td>
        <td>${e.daily_wage}</td>
        <td>${e.active ? "Aktif" : "Pasif"}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}
