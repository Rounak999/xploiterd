// Projects section on Home page
async function loadProjects() {
  const projectsDiv = document.getElementById("projects");
  if (!projectsDiv) return; // only run on index.html

  projectsDiv.innerHTML = "<p class='col-span-full text-center'>Loading projects...</p>";
  try {
    const res = await fetch("https://api.github.com/users/Rounak999/repos?sort=updated");
    const repos = await res.json();
    projectsDiv.innerHTML = "";
    repos.slice(0, 6).forEach(repo => {
      projectsDiv.innerHTML += `
        <div class="bg-[#161b22] p-4 rounded shadow hover:shadow-cyan-500/30 transition">
          <h3 class="text-xl font-bold mb-2">
            <a href="${repo.html_url}" target="_blank" class="text-cyan-400 hover:underline">${repo.name}</a>
          </h3>
          <p class="text-gray-400 mb-2">${repo.description || "No description provided."}</p>
          <span class="text-sm text-gray-500">⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count}</span>
        </div>
      `;
    });
  } catch (err) {
    projectsDiv.innerHTML = "<p class='text-center'>Failed to load projects.</p>";
  }
}
loadProjects();
