// Every page route the site serves. install and install.ps1 are scripts, not
// pages, and are compared byte for byte instead.
export const ROUTES = [
  "/",
  "/about",
  "/download",
  "/products",
  "/products/agent",
  "/products/analyst",
  "/products/capture",
  "/products/deck",
  "/products/local",
  "/products/polaris",
  "/products/polaris/licence",
  "/legal/privacy",
  "/legal/terms",
  "/legal/security",
  "/legal/licenses",
  "/this-route-does-not-exist",
];
export const WIDTHS = [390, 768, 1440];
export const slug = (route) => (route === "/" ? "_home" : route.replaceAll("/", "_"));
