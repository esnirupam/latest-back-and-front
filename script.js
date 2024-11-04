document.addEventListener("DOMContentLoaded", function() {
    loadCategories();  // Load categories when the page loads
    loadAPIs();       // Load APIs as well
});

// Function to Load APIs from the Flask Server
function loadAPIs() {
    fetch("http://127.0.0.1:5000/get-apis")
        .then(response => response.json())
        .then(data => {
            displayAPIs(data); // Pass the entire data array to displayAPIs
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

// Function to Display APIs
function displayAPIs(apis) {
    const apiList = document.getElementById('api-list');
    apiList.innerHTML = ''; // Clear the list before displaying
    apis.forEach(api => {
        const apiCard = document.createElement('div');
        apiCard.className = 'api-card';
        apiCard.innerHTML = `
            <h3>${api.name}</h3>
            <p><strong>URL:</strong> <a href="${api.url}" target="_blank">${api.url}</a></p>
            <p><strong>Description:</strong> ${api.description}</p>
            <p><strong>Category:</strong> ${api.category}</p>
        `;
        apiList.appendChild(apiCard);
    });
}

// Function to Add a New API
function addAPI() {
    const apiName = document.getElementById('apiName').value;
    const apiURL = document.getElementById('apiURL').value;
    const description = document.getElementById('description').value;
    const apiCategory = document.getElementById('apiCategory').value || 'General';

    if (apiName && apiURL && description) {
        const newApiData = {
            name: apiName,
            url: apiURL,
            description: description,
            category: apiCategory,
        };
        fetch("http://127.0.0.1:5000/add-api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newApiData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);  // Alert the message from the server
                loadAPIs(); // Refresh the API list
                document.getElementById('contribute-form').reset(); // Clear the form
            }
        })
        .catch(error => {
            console.error("Error:", error);
            alert("An error occurred while adding the API.");
        });
    } else {
        alert("Please fill in all required fields.");
    }
}

// Function to Filter APIs
function filterAPIs() {
    const query = document.getElementById('main-search').value.toLowerCase();
    const apiList = document.getElementById('api-list');
    const apiCards = apiList.getElementsByClassName('api-card');

    Array.from(apiCards).forEach(card => {
        const name = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
        const category = card.querySelector('p:nth-of-type(3)').textContent.toLowerCase();

        // Show card if it matches the query
        card.style.display = name.includes(query) || description.includes(query) || category.includes(query) ? '' : 'none';
    });
}

// Function to Load Categories from the Server
function loadCategories() {
    fetch("http://127.0.0.1:5000/get-categories")
        .then(response => response.json())
        .then(categories => {
            populateCategories(categories); // Pass the categories array to populate function
        })
        .catch(error => {
            console.error("Error fetching categories:", error);
        });
}

// Function to Populate Categories
function populateCategories(categories) {
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = ''; // Clear previous entries
    categories.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = category;
        categoryList.appendChild(categoryItem);
    });
}

// Function to Filter Categories
function filterCategories() {
    const query = document.getElementById('category-search').value.toLowerCase();
    const categoryList = document.getElementById('category-list');
    const categoryItems = categoryList.getElementsByTagName('li');

    Array.from(categoryItems).forEach(item => {
        // Show item if it matches the query
        item.style.display = item.textContent.toLowerCase().includes(query) ? '' : 'none';
    });
}
