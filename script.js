// Handle form submission & store data
document.getElementById("queryForm")?.addEventListener("submit", (e) => {
  e.preventDefault();

  const supplier = document.getElementById("supplier").value;
  const category = document.getElementById("category").value;
  const topic = document.getElementById("topic").value;
  const details = document.getElementById("details").value;

  const newQuery = {
    supplier,
    category,
    topic,
    details,
    status: "Pending",
    date: new Date().toLocaleDateString(),
  };

  // Save to localStorage
  const queries = JSON.parse(localStorage.getItem("queries") || "[]");
  queries.push(newQuery);
  localStorage.setItem("queries", JSON.stringify(queries));

  alert("✅ Query submitted successfully!");
  window.location.href = "index.html";
});

// Load queries dynamically on dashboard
const table = document.getElementById("supplierTable");
if (table) {
  const queries = JSON.parse(localStorage.getItem("queries") || "[]");
  if (queries.length > 0) {
    queries.forEach((q) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${q.supplier}</td>
        <td>${q.category}</td>
        <td>${q.topic}</td>
        <td><span class="badge pending">${q.status}</span></td>
        <td><a href="query-status.html" class="link">View</a></td>
      `;
      table.querySelector("tbody").appendChild(row);
    });
  }
}
