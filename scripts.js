const mediumFeed = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@xploiterd";
const githubApi = "https://api.github.com/users/Rounak999/repos";

const content = document.getElementById("content");
const tabMedium = document.getElementById("tabMedium");
const tabGithub = document.getElementById("tabGithub");

// Load Medium blogs
async function loadMedium() {
  content.innerHTML = "<p>Loading Medium blogs...</p>";
  const res = await fetch(mediumFeed);
  const data = await res.json();
  content.innerHTML = "";
  data.items.slice(0, 5).forEach(post => {
    content.innerHTML += `
      <div class="bg-[#161b22] p-4 rounded shadow">
        <h3 class="text-xl font-bold mb-2"><a href="${post.link}" target="_blank" class="text-cyan-400 hover:underline">${post.title}</a></h3>
        <p class="text-gray-400">${new Date(post.pubDate).toDateString()}</p>
      </div>
    `;
  });
}

// Load GitHub repos
async function loadGithub() {
  content.innerHTML = "<p>Loading GitHub repos...</p>";
  const res = await fetch(githubApi);
  const repos = await res.json();
  content.innerHTML = "";
  repos.forEach(repo => {
    content.innerHTML += `
      <div class="bg-[#161b22] p-4 rounded shadow">
        <h3 class="text-xl font-bold mb-2"><a href="${repo.html_url}" target="_blank" class="text-cyan-400 hover:underline">${repo.name}</a></h3>
        <p class="text-gray-400">${repo.description || "No description"}</p>
      </div>
    `;
  });
}

// Tab switching
tabMedium.addEventListener("click", () => {
  tabMedium.classList.add("bg-cyan-600");
  tabGithub.classList.remove("bg-cyan-600");
  loadMedium();
});

tabGithub.addEventListener("click", () => {
  tabGithub.classList.add("bg-cyan-600");
  tabMedium.classList.remove("bg-cyan-600");
  loadGithub();
});

// Load Medium by default
loadMedium();
