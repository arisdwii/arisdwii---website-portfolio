// DOM SELECTORS
const loaderSection = document.querySelector(".loader-section");
const heroCta = document.querySelector(".hero-cta");
const projectSection = document.querySelector(".project-container");
const projectToggleBtn = document.querySelectorAll(".project-toggle-button");
const projectSlider = document.querySelector(".slider");
const projectItemWeb = document.querySelector(".projects-items-web");

// FUNCTION: Hide loader after page load
window.addEventListener("load", () => {
  if (loaderSection) {
    loaderSection.style.transform = "translateY(-100%)";
  }
});

// FUNCTION: Smooth scroll to project section
heroCta.addEventListener("click", () => {
  projectSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

// FUNCTION: Handle project slider toggle
projectToggleBtn.forEach((button) => {
  button.addEventListener("click", () => {
    projectToggleBtn.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const index = Number(button.dataset.index || 0);
    projectSlider.style.transform = `translateX(${-100 * index}%)`;
  });
});

// FUNCTION: Fetch and render GitHub projects
async function loadGithubProjects() {
  try {
    const res = await fetch(
      "https://api.github.com/users/arisdwii/repos?per_page=100"
    );
    const data = await res.json();

    const lastSix = data
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 6);

    const markup = lastSix
      .map(
        ({ name, homepage, description }) => `
                <article class="project-card">
                     <a href="${homepage}">
                        <div class="project-img-wrapper">
                            <img src="https://raw.githubusercontent.com/arisdwii/${name}/main/design/preview.jpg" alt="${description}" class="project-card-img" draggable="false">
                        </div>
                        <h3 class="project-card-title">${description}</h3>
                    </a>
                </article>`
      )
      .join("");

    if (projectItemWeb) {
      projectItemWeb.innerHTML = markup;
    }
  } catch (error) {
    console.log("Gagal memuat repository:", error);
  }
}

loadGithubProjects();
