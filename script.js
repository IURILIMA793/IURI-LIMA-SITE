document.addEventListener("DOMContentLoaded", () => {
  const whatsappDropdown = document.querySelector(".whatsapp-dropdown");
  const whatsappCard = document.querySelector(".whatsapp-card");

  if (whatsappDropdown && whatsappCard) {
    // Alterna a abertura do menu ao clicar/tocar no cartão (melhor experiência em telemóveis)
    whatsappCard.addEventListener("click", (e) => {
      e.stopPropagation();
      whatsappDropdown.classList.toggle("is-active");
    });

    // Fecha o menu se o utilizador clicar em qualquer outro lugar da página
    document.addEventListener("click", (e) => {
      if (!whatsappDropdown.contains(e.target)) {
        whatsappDropdown.classList.remove("is-active");
      }
    });

    // Fecha o menu após selecionar um dos idiomas
    const langLinks = whatsappDropdown.querySelectorAll(".whatsapp-menu a");
    langLinks.forEach((link) => {
      link.addEventListener("click", () => {
        whatsappDropdown.classList.remove("is-active");
      });
    });
  }
});