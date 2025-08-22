describe("Landing Page Form Rendering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000"); // URL locale
  });

  it("Vérifie que le formulaire est visible", () => {
    cy.get("#signupForm").should("be.visible");
    cy.get("input#name").should("exist");
    cy.get("input#email").should("exist");
    cy.get("textarea#message").should("exist");
    cy.get("button#submitBtn").should("contain", "Envoyer");
  });
});
describe("Form Validation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Affiche une alerte si nom ou email manquant", () => {
    cy.get("button#submitBtn").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contains("Veuillez remplir au moins votre nom et votre email.");
    });
  });
});
describe("Form Submission Success", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Soumet le formulaire et affiche le message de succès", () => {
    const name = "Test User";
    const email = "testuser@example.com";
    const message = "Hello Cypress!";

    cy.intercept("POST", "/save", {
      statusCode: 200,
      body: "✅ Données enregistrées !"
    }).as("postSave");

    cy.get("input#name").type(name);
    cy.get("input#email").type(email);
    cy.get("textarea#message").type(message);

    cy.get("button#submitBtn").click();
    cy.wait("@postSave");

    cy.get("#successMessage").should("be.visible").and("contain", "Merci ! Votre inscription");
  });
});
describe("Duplicate User Handling", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Affiche une alerte si l’utilisateur existe déjà", () => {
    const name = "Existing User";
    const email = "existing@example.com";

    cy.intercept("POST", "/save", {
      statusCode: 400,
      body: "User already exists"
    }).as("postDuplicate");

    cy.get("input#name").type(name);
    cy.get("input#email").type(email);

    cy.get("button#submitBtn").click();

    cy.wait("@postDuplicate");
    cy.on("window:alert", (txt) => {
      expect(txt).to.eq("User already exists");
    });
  });
});
describe("Loader and Animation", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Affiche le loader pendant l’envoi et l’animation check après", () => {
  cy.intercept("POST", "/save", (req) => {
    return new Promise((resolve) =>
      setTimeout(() => resolve({ statusCode: 200, body: "OK" }), 1000)
    );
  }).as("postWithDelay");

  cy.get("input#name").type("Cypress Loader");
  cy.get("input#email").type("loader@example.com");

  cy.get("button#submitBtn").click();
  cy.get("#loader").should("be.visible");

  cy.wait("@postWithDelay");
  cy.get("#loader").should("not.be.visible");

  // Vérifie l’état final : message succès + checkmark dans le bouton
  cy.get("#successMessage")
    .should("be.visible")
    .and("contain.text", "Merci ! Votre inscription");

  cy.get("button#submitBtn").find("svg.checkmark").should("exist");

  });
});
describe("Responsive Design", () => {
  it("Vérifie que le formulaire reste visible sur mobile", () => {
    cy.viewport(375, 667); // iPhone X
    cy.visit("http://localhost:3000");
    cy.get(".form-container").should("be.visible");
  });
});
