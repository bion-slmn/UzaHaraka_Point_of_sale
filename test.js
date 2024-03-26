<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Product Categories</title>
<style>
    /* Add your CSS styles here */
</style>
</head>
<body>

<h2>Product Categories</h2>

<div id="categories">
    <!-- Categories will be dynamically added here -->
</div>

<div id="products">
    <!-- Products will be dynamically added here -->
</div>

<script>
document.addEventListener("DOMContentLoaded", function() {
    // Function to fetch categories
    function fetchCategories() {
        fetch('http://localhost:8000/product/view-category/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': '2XORN895V8mX8oUPuZDB1Qhz3PoELUVC',
                'Cookie': 'csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot'
            }
        })
        .then(response => response.json())
        .then(data => {
            let categoriesHTML = '';
            data.forEach(category => {
                categoriesHTML += `<div class="category" data-category-id="${category.id}">${category.name}</div>`;
            });
            document.getElementById('categories').innerHTML = categoriesHTML;

            // Add click event listener to each category
            document.querySelectorAll('.category').forEach(category => {
                category.addEventListener('click', function() {
                    const categoryId = this.getAttribute('data-category-id');
                    fetchProducts(categoryId);
                });
            });
        })
        .catch(error => console.error('Error:', error));
    }

    // Function to fetch products based on category
    function fetchProducts(categoryId) {
        fetch(`http://localhost:8000/product/view-a-category/?id=${categoryId}`, {
            method: 'GET',
            headers: {
                'X-CSRFToken': '2XORN895V8mX8oUPuZDB1Qhz3PoELUVC',
                'Cookie': 'csrftoken=2XORN895V8mX8oUPuZDB1Qhz3PoELUVC; sessionid=gc8knitxkpzuuxkfcvfw0iu5fgf81zot'
            }
        })
        .then(response => response.json())
        .then(data => {
            let productsHTML = '<h2>Products</h2>';
            data.product_set.forEach(product => {
                productsHTML += `
                    <div class="product">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                        <img src="${product.product_image}" alt="${product.name}">
                    </div>`;
            });
            document.getElementById('products').innerHTML = productsHTML;
        })
        .catch(error => console.error('Error:', error));
    }

    // Fetch categories when the page loads
    fetchCategories();
});
</script>

</body>
</html>
