const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");

const formSubmitHandler = function(e) {
    e.preventDefault();
    // get value from input element
    let username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert("Please enter a GitHub username");
    }
};





var getUserRepos = function(user) {
    // format the githup api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        });
    });
};

userFormEl.addEventListener("submit", formSubmitHandler);