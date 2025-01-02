import getDomain from "./getDomain";

const visitDomains = (Domains: string[], Paths: string[]) => {
  Domains.forEach((Domain) => {
    Paths.forEach((Path) => {
      const URL = `${getDomain(Domain)}/${Path}`;
      it(`Visit: ${URL}`, () => {
        cy.visit(URL);
      });
    });
  });
};

export default visitDomains;
