const issueContainerEl = document.querySelector("#issues-container");
const limitWarningEl = document.querySelector("#limit-warning");

const getRepoIssues = function(repo) {
    // console.log(repo)
    let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        // request was successful
        if(response.ok) {
            response.json().then(function(data) {
                displayIssues(data);

                // check if api has paginated issues
                if(displayWarning(repo)) {
                    console.log("repo has more than 30 issues");
                }
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
};

const displayIssues = function(issues) {
    if(issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
    }
    for (let i =0; i <issues.length; i++) {
        // create <a> element to take users to the issue on github
        let issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        let titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        let typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if(issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        // append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};

const displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
    
    // add link element
    let linkEl = document.createElement("a");
    linkEl.textContent = "Github.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");

    // append to warning
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");