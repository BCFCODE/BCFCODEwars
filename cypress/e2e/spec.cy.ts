const getDomain = (Domain: string) => {
  const localUrl = "http://localhost:3000";
  const isLocalURL = Domain === "/";
  return isLocalURL ? localUrl : Domain;
};

describe("Page tests", () => {
  const Paths = ["", "dashboard", "orders", "wars", "missions", "leaderboard"];
  const Domains = [
    "/", // Visit local urls
    "https://bcfcode.ir", // Visit online urls
  ];

  Domains.forEach((Domain) => {
    Paths.forEach((Path) => {
      const URL = `${getDomain(Domain)}/${Path}`;
      it(`Visit ${URL}`, () => {
        cy.visit(URL);
      });
    });
  });
});
