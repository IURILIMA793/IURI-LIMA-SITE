document.addEventListener("DOMContentLoaded", () => {
  renderProjects();

  const whatsappDropdown = document.querySelector(".whatsapp-dropdown");
  const whatsappCard = document.querySelector(".whatsapp-card");

  if (whatsappDropdown && whatsappCard) {
    whatsappCard.addEventListener("click", (e) => {
      e.stopPropagation();
      whatsappDropdown.classList.toggle("is-active");
    });

    document.addEventListener("click", (e) => {
      if (!whatsappDropdown.contains(e.target)) {
        whatsappDropdown.classList.remove("is-active");
      }
    });

    const langLinks = whatsappDropdown.querySelectorAll(".whatsapp-menu a");
    langLinks.forEach((link) => {
      link.addEventListener("click", () => {
        whatsappDropdown.classList.remove("is-active");
      });
    });
  }
});

async function renderProjects() {
  const container = document.querySelector("#projects");
  if (!container) return;

  try {
    const response = await fetch("projects.json");
    if (!response.ok) {
      throw new Error(`Não foi possível carregar projects.json (${response.status}).`);
    }

    const projects = await response.json();
    validateProjects(projects);

    [...projects].reverse().forEach((project, index) => {
      if (index > 0) {
        container.append(createElement("hr", { className: "divider" }));
      }
      container.append(createProject(project));
    });
  } catch (error) {
    console.error("Erro ao carregar os trabalhos do portfólio:", error);
    const message = createElement("p", {
      className: "projects-error",
      role: "alert",
    });
    message.textContent =
      "Não foi possível carregar os trabalhos. Verifique o ficheiro projects.json e abra o site através de um servidor local.";
    container.append(message);
  }
}

function validateProjects(projects) {
  if (!Array.isArray(projects)) {
    throw new Error("projects.json deve conter uma lista de trabalhos.");
  }

  const ids = new Set();
  projects.forEach((project) => {
    const validId =
      typeof project?.id === "string" &&
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.id);
    const validLayout = ["event", "gallery"].includes(project?.layout);
    const validContent =
      typeof project?.title === "string" &&
      Array.isArray(project?.paragraphs) &&
      project.paragraphs.length > 0 &&
      project.paragraphs.every((paragraph) => typeof paragraph === "string") &&
      Array.isArray(project?.media) &&
      project.media.length > 0 &&
      project.media.every(
        (media) =>
          ["image", "video"].includes(media?.type) &&
          typeof media?.src === "string" &&
          typeof media?.alt === "string",
      ) &&
      (project.quote === undefined || typeof project.quote === "string");

    if (!validId || !validLayout || !validContent || ids.has(project.id)) {
      throw new Error("Há um trabalho inválido ou com ID repetido em projects.json.");
    }
    ids.add(project.id);
  });
}

function createProject(project) {
  const sectionId = `project-${project.id}`;
  const section = createElement("section", {
    className: `section ${project.layout === "event" ? "porto-section" : "obidos-section"}`,
    id: sectionId,
    "aria-labelledby": `${sectionId}-title`,
  });
  const heading = createElement("h2", {
    className: "section-heading",
    id: `${sectionId}-title`,
  });
  heading.textContent = project.title;
  section.append(heading);

  if (project.layout === "event") {
    section.append(createEventLayout(project));
  } else {
    section.append(createGalleryLayout(project));
  }

  return section;
}

function createEventLayout(project) {
  const grid = createElement("div", { className: "porto-grid" });
  if (project.media.length === 1) {
    grid.classList.add("porto-grid--single-media");
  }

  const copy = createElement("div", { className: "porto-copy" });
  project.paragraphs.forEach((text) => {
    const paragraph = createElement("p");
    paragraph.textContent = text;
    copy.append(paragraph);
  });

  if (project.quote) {
    const quote = createElement("blockquote");
    quote.textContent = project.quote;
    copy.append(quote);
  }

  if (project.media.length === 1) {
    grid.append(createMedia(project.media[0], "porto-media media-frame"));
    grid.append(copy);
    return grid;
  }

  grid.append(
    createMedia(
      project.media[0],
      "porto-media media-frame media-frame--portrait",
    ),
    copy,
  );

  if (project.media.length === 2) {
    grid.append(
      createMedia(
        project.media[1],
        "porto-media media-frame media-frame--portrait-tall",
      ),
    );
  } else {
    const rail = createElement("div", { className: "project-media-rail" });
    project.media.slice(1).forEach((media) => {
      rail.append(createMedia(media, "porto-media media-frame"));
    });
    grid.append(rail);
  }

  return grid;
}

function createGalleryLayout(project) {
  const wrapper = createElement("div");
  const copy = createElement("div", { className: "obidos-copy" });
  project.paragraphs.forEach((text) => {
    const paragraph = createElement("p");
    paragraph.textContent = text;
    copy.append(paragraph);
  });

  const gallery = createElement("div", { className: "obidos-gallery" });
  project.media.forEach((media) => {
    gallery.append(createMedia(media, "obidos-media media-frame"));
  });
  wrapper.append(copy, gallery);
  return wrapper;
}

function createMedia(media, className) {
  const figure = createElement("figure", { className });
  const element = createElement(media.type === "video" ? "video" : "img");

  if (media.type === "video") {
    element.setAttribute("src", media.src);
    element.setAttribute("aria-label", media.alt);
    element.controls = true;
    element.autoplay = true;
    element.muted = true;
    element.loop = true;
    element.playsInline = true;
  } else {
    element.setAttribute("src", media.src);
    element.setAttribute("alt", media.alt);
  }

  figure.append(element);
  return figure;
}

function createElement(tag, attributes = {}) {
  const element = document.createElement(tag);
  Object.entries(attributes).forEach(([name, value]) => {
    if (name === "className") {
      element.className = value;
    } else {
      element.setAttribute(name, value);
    }
  });
  return element;
}
