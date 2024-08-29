document.addEventListener("DOMContentLoaded", function() {
    loadProducts();
});

function loadProducts() {
    fetch('products.xml')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "application/xml"))
        .then(data => {
            const products = data.getElementsByTagName("product");
            const tableBody = document.querySelector("#productTable tbody");

            for (let i = 0; i < products.length; i++) {
                const product = products[i];
                const row = createProductRow(product);
                tableBody.appendChild(row);
            }
        })
        .catch(error => {
            console.error("Error loading or parsing XML file:", error);
            const tableBody = document.querySelector("#productTable tbody");
            const row = document.createElement("tr");
            const cell = document.createElement("td");
            cell.colSpan = 6;
            cell.textContent = "Failed to load products.";
            row.appendChild(cell);
            tableBody.appendChild(row);
        });
}

function createProductRow(product) {
    const row = document.createElement("tr");

    const cellCategory = document.createElement("td");
    cellCategory.textContent = product.getElementsByTagName("category")[0].textContent;
    row.appendChild(cellCategory);

    const cellCode = document.createElement("td");
    cellCode.textContent = product.getElementsByTagName("code")[0].textContent;
    row.appendChild(cellCode);

    const cellName = document.createElement("td");
    cellName.textContent = product.getElementsByTagName("name")[0].textContent;
    row.appendChild(cellName);

    const cellDescription = document.createElement("td");
    cellDescription.textContent = product.getElementsByTagName("description")[0].textContent;
    row.appendChild(cellDescription);

    const cellQuantity = document.createElement("td");
    cellQuantity.textContent = product.getElementsByTagName("quantity")[0].textContent;
    row.appendChild(cellQuantity);

    const cellUnitPrice = document.createElement("td");
    cellUnitPrice.textContent = `$${parseFloat(product.getElementsByTagName("unitPrice")[0].textContent).toFixed(2)}`;
    row.appendChild(cellUnitPrice);

    return row;
}

function searchProduct() {
    const code = document.getElementById("searchCode").value.trim().toLowerCase();
    const tableBody = document.querySelector("#productTable tbody");
    const rows = tableBody.getElementsByTagName("tr");
    let found = false;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const productCode = row.cells[1].textContent.trim().toLowerCase();
        
        if (productCode === code) {
            row.style.display = "";  // Show the matched product row
            found = true;
        } else {
            row.style.display = "none";  // Hide non-matching product rows
        }
    }

    if (!found) {
        document.getElementById("searchResult").textContent = "Product not found or out of stock.";
    } else {
        document.getElementById("searchResult").textContent = "";
    }
}
