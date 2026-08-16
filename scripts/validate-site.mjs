import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, extname, join, normalize, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const requiredFiles = [
  "index.html",
  "about.html",
  "services.html",
  "gallery.html",
  "contact.html",
  "contact.js",
  "diagnostic.html",
  "diagnostic.js",
  "reservation.html",
  "reservation.js",
  "securite.html",
  "confidentialite.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "og.png",
  "og-site.webp",
  ".nojekyll",
  ".well-known/security.txt",
];
const errors = [];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Fichier requis absent : ${file}`);
}

if (existsSync(join(root, "og-site.webp")) && statSync(join(root, "og-site.webp")).size > 150_000) {
  errors.push("og-site.webp : l'image d'accueil dépasse le budget de 150 Ko");
}

const pages = readdirSync(root)
  .filter((file) => extname(file) === ".html" && !file.startsWith("google"));

for (const page of pages) {
  const pagePath = join(root, page);
  const html = readFileSync(pagePath, "utf8");

  if (!/<html\s+lang=["']fr["']/.test(html)) errors.push(`${page} : langue française absente`);
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${page} : titre absent`);
  if (!/Content-Security-Policy/.test(html)) errors.push(`${page} : politique CSP absente`);
  if (/file:\/{2,}|[A-Z]:\\/i.test(html)) errors.push(`${page} : chemin local interdit`);
  if (/<script\b[^>]*\bsrc=["']https?:\/\//i.test(html)) errors.push(`${page} : script distant interdit`);
  if (/<link\b[^>]*\brel=["'](?:stylesheet|preconnect)["'][^>]*\bhref=["']https?:\/\//i.test(html)) {
    errors.push(`${page} : feuille de style ou préconnexion distante interdite`);
  }

  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) errors.push(`${page} : identifiant dupliqué (${[...new Set(duplicateIds)].join(", ")})`);

  for (const match of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\bwidth=["']\d+["']/.test(match[0]) || !/\bheight=["']\d+["']/.test(match[0])) {
      errors.push(`${page} : image sans dimensions explicites`);
    }
  }

  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const reference = match[1].trim();
    if (!reference || /^(?:#|https?:|mailto:|tel:|data:)/i.test(reference)) continue;
    const cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
    if (!cleanReference) continue;
    const target = normalize(join(dirname(pagePath), cleanReference));
    const relativeTarget = relative(root, target);
    if (relativeTarget.startsWith("..") || resolve(target) === resolve(root, "..")) {
      errors.push(`${page} : référence hors du site (${reference})`);
    } else if (!existsSync(target)) {
      errors.push(`${page} : cible locale absente (${reference})`);
    }
  }
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`${pages.length} pages validées : structure, CSP, dépendances, identifiants et liens locaux.`);
