import visitDomains from "../utils/visitDomains";

describe("Page tests", () => {
  const Paths = [
    "",
    "dashboard",
    "orders",
    "wars",
    "wars/validation/steps/0",
    "wars/validation/steps/1",
    "wars/validation/steps/2",
    "wars/validation/steps/2?username=BCFCODE",
    "missions",
    "leaderboard",
  ];
  const Domains = [
    "/", // Visit local urls
    // "https://bcfcode.ir", // Visit online urls
  ];

  visitDomains(Domains, Paths);
});
