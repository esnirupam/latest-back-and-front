document.addEventListener("DOMContentLoaded", function() {
    loadAPIs(); // Load APIs when the page loads
});

// Function to Load APIs from the Server
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

// Function to Add API
function addAPI() {
    const apiName = document.getElementById('apiName').value;
    const apiURL = document.getElementById('apiURL').value;
    const description = document.getElementById('description').value;
    const apiCategory = document.getElementById('apiCategory').value;

    if (apiName && apiURL && description && apiCategory) {
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
                // Add the new API to the displayed list without reloading
                displayAPIs([newApiData]); // Display the new API immediately
                // Optionally clear the form
                document.getElementById('contribute-form').reset();
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
