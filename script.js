const heroCta = document.querySelector(".hero-cta");
const projectSection = document.querySelector(".project-container");
const projectToggleBtn = document.querySelectorAll(".project-toggle-button");
const projectSlider = document.querySelector(".slider");
const projectItemWeb = document.querySelector(".projects-items-web");

heroCta.addEventListener("click", () => {
  projectSection.scrollIntoView({ behavior: "smooth", block: "start" });
});

projectToggleBtn.forEach((button) => {
  button.addEventListener("click", () => {
    projectToggleBtn.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    const index = parseInt(button.getAttribute("data-index"));
    const translateX = -100 * index;
    projectSlider.style.transform = `translateX(${translateX}%)`;
  });
});

fetch("https://api.github.com/users/arisdwii/repos?per_page=100")
  .then((res) => res.json())
  .then((data) => {
    data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

    const lastSix = data.slice(0, 6);

    const projectCard = lastSix
      .map(
        (item) => `
                <article class="project-card">
                     <a href="${item.homepage}">
                        <div class="project-img-wrapper">
                            <img src="https://raw.githubusercontent.com/arisdwii/${item.name}/main/design/preview.jpg" alt="${item.description}" class="project-card-img" draggable="false">
                        </div>
                        <h3 class="project-card-title">${item.description}</h3>
                    </a>
                </article>`
      )
      .join("");

    projectItemWeb.innerHTML = projectCard;
  });
