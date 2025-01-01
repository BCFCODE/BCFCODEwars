import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000/", // Ensure this matches your app's running URL
    supportFile: false,
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
