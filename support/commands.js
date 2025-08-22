const fs = require("fs");
const path = require("path");

Cypress.Commands.add("resetDataFile", () => {
  const filePath = path.join(__dirname, "../../data.json");
  // Réécrit le fichier avec un tableau vide
  fs.writeFileSync(filePath, JSON.stringify([], null, 2));
});
