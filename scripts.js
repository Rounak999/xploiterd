const mediumFeed = "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@xploiterd";
const githubApi = "https://api.github.com/users/Rounak999/repos";

// ---------------- Medium (Blogs Tab) ----------------
async function loadMedium() {
  const content = document.getElementById("content");
  if (!content) return;
  content.innerHTML = "<p>Loading Medium blogs...</p>";
  const res = await fetch(mediumFeed);
  const data = await res.json();
  content.innerHTML = "";
  data.items.slice(0, 5).forEach(post => {
    content.innerHTML += `
      <div class="glass p-4 rounded-xl shadow-lg hover:shadow-cyan-500/40 transition">
        <h3 class="text-xl font-bold mb-2"><a href="${post.link}" target="_blank" class="text-cyan-400 hover:underline">${post.title}</a></h3>
        <p class="text-gray-400">${new Date(post.pubDate).toDateString()}</p>
      </div>
    `;
  });
}

// ---------------- GitHub (Repos Tab) ----------------
async function loadGithub() {
  const content = document.getElementById("content");
  if (!content) return;
  content.innerHTML = "<p>Loading GitHub repos...</p>";
  const res = await fetch(githubApi);
  const repos = await res.json();
  content.innerHTML = "";
  repos.forEach(repo => {
    content.innerHTML += `
      <div class="glass p-4 rounded-xl shadow-lg hover:shadow-cyan-500/40 transition">
        <h3 class="text-xl font-bold mb-2"><a href="${repo.html_url}" target="_blank" class="text-cyan-400 hover:underline">${repo.name}</a></h3>
        <p class="text-gray-400">${repo.description || "No description provided."}</p>
        <span class="text-sm text-gray-500">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</span>
      </div>
    `;
  });
}

// ---------------- Projects (Home Page) ----------------
async function loadProjects() {
  const projectsDiv = document.getElementById("projects");
  if (!projectsDiv) return;

  projectsDiv.innerHTML = "<p class='col-span-full text-center'>Loading projects...</p>";
  const res = await fetch("https://api.github.com/users/Rounak999/repos?sort=updated");
  const repos = await res.json();
  projectsDiv.innerHTML = "";
  repos.slice(0, 6).forEach(repo => {
    projectsDiv.innerHTML += `
      <div class="glass p-6 rounded-xl shadow-lg hover:shadow-cyan-500/40 transition">
        <h3 class="text-xl font-bold mb-2"><a href="${repo.html_url}" target="_blank" class="text-cyan-400 hover:underline">${repo.name}</a></h3>
        <p class="text-gray-400">${repo.description || "No description provided."}</p>
        <span class="text-sm text-gray-500">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</span>
      </div>
    `;
  });
}

// ---------------- Latest Blogs (Home Page) ----------------
async function loadLatestBlogs() {
  const blogDiv = document.getElementById("latestBlogs");
  if (!blogDiv) return;

  blogDiv.innerHTML = "<p class='col-span-full text-center'>Loading blogs...</p>";
  const res = await fetch(mediumFeed);
  const data = await res.json();
  blogDiv.innerHTML = "";
  data.items.slice(0, 3).forEach(post => {
    blogDiv.innerHTML += `
      <div class="glass p-6 rounded-xl shadow-lg hover:shadow-cyan-500/40 transition">
        <h3 class="text-xl font-bold mb-2"><a href="${post.link}" target="_blank" class="text-cyan-400 hover:underline">${post.title}</a></h3>
        <p class="text-gray-400">${new Date(post.pubDate).toDateString()}</p>
      </div>
    `;
  });
}

// ---------------- Tab Switching ----------------
const tabMedium = document.getElementById("tabMedium");
const tabGithub = document.getElementById("tabGithub");
if (tabMedium && tabGithub) {
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
  loadMedium(); // default
}

// ---------------- Run Home Functions ----------------
loadProjects();
loadLatestBlogs();
