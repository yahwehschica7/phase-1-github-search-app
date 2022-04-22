const form = document.getElementById("github-form")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let name = e.target[0].value
    
    fetch(`https://api.github.com/search/users?q=${name}`)
    .then(res => res.json())
    .then(res => {
        const userList = document.querySelector("#user-list")
        userList.innerHTML = ""
        const reposList = document.getElementById("repos-list")
        reposList.innerText = ""

        //login, avatar-url, url 
        res.items.map(item => {
            const li = document.createElement("li")
            const h2 = document.createElement("h2")
            h2.textContent = item.login 
            h2.addEventListener("click", e => showRepos(item.login, e))
            const image = document.createElement("img")
            image.src = item.avatar_url
            li.append(h2, image)
            userList.append(li)
        })
    })
    form.reset()
})

function showRepos(username, e) {
    e.preventDefault()
    const reposList = document.getElementById("repos-list")
    reposList.innerText = ""
    
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(res => res.json())
    .then(res => res.map(repo => {
        const li = document.createElement("li")
        const h1 = document.createElement("h1")
        h1.textContent = repo.name 
        
        li.append(h1)
        reposList.append(li)
    }))
}