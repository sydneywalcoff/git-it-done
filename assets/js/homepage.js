const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");
const languageButtonsEl = document.querySelector("div#language-buttons");
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

const getUserRepos = function(user) {
    // format the githup api url
    let apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        response.json().then(function(data) {
            displayRepos(data, user);
        });
    });
};

const getFeaturedRepos = language => {
    let apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                displayRepos(data.items, language);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

const displayRepos = function(repos, searchTerm) {
    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (let i =0; i < repos.length; i++) {
        // format repo name
        let repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        let repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name
        let titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element
        let statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issue or not
        if(repos[i].open_issues_count > 0) {
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);

        // append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

const buttonClickHandler = event => {
    let language = event.target.getAttribute("data-language");
    if (language) {
        getFeaturedRepos(language);

        // clear old content
        repoContainerEl.textContent = "";
    }
}

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);