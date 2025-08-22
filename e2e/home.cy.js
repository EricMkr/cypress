/// <reference types="cypress" />

describe("Vérification du titre de la page", () => {
  beforeEach(() => {
    // Charge la page (grâce au baseUrl défini dans cypress.config.js)
    cy.visit("http://localhost:3000");
  });

  it("Le titre doit être 'Formulaire Landing Page'", () => {
    cy.title().should("eq", "Formulaire Landing Page");
  });
});

describe("Formulaire -> Enregistrement dans data.json", () => {
  beforeEach(() => {
    // Vide le fichier data.json avant chaque test
    // cy.request("POST", "http://127.0.0.1:3000/adwa/index.html/reset");
    // cy.visit("http://127.0.0.1:3000/adwa/index.html");
  });
});