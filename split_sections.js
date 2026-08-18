const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const content = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');

const head = content.match(/<head>[\s\S]*?<\/head>/)[0];
const header = content.match(/<header id="header"[\s\S]*?<\/header>/)[0];
const footer = content.match(/<footer id="footer"[\s\S]*?<\/footer>/)[0];
const tail = content.match(/<!-- Scroll Top -->[\s\S]*?<\/html>/)[0];
const mainBody = content.match(/<main class="main">([\s\S]*?)<\/main>/)[1];

const sections = {};
const sectionRegex = /    <!-- .*? -->\n    <section id="([^"]+)"[\s\S]*?    <\/section><!-- \/.*? -->/g;
let m;
while ((m = sectionRegex.exec(mainBody)) !== null) {
  sections[m[1]] = m[0];
}

const portfolio = sections.portfolio || '';
const galleryMatch = portfolio.match(/(          <div id="gallery" class="row g-0 isotope-container"[\s\S]*?          <\/div><!-- End Portfolio Container -->)/);
if (galleryMatch) {
  sections.gallery = `    <!-- Gallery Section -->
    <section id="gallery" class="portfolio section">

      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Engineering, fabrication and manufacturing work from DMCTECH SOLUTIONS</p>
      </div><!-- End Section Title -->

      <div class="container-fluid">

        <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

${galleryMatch[1]}

        </div>

      </div>

    </section><!-- /Gallery Section -->`;
}

const LINK_MAP = {
  'href="#hero"': 'href="index.html"',
  'href="#about"': 'href="about.html"',
  'href="#services"': 'href="services.html"',
  'href="#industries"': 'href="industries.html"',
  'href="#portfolio"': 'href="portfolio.html"',
  'href="#gallery"': 'href="gallery.html"',
  'href="#contact"': 'href="contact.html"',
  'href="#featured-services"': 'href="featured-services.html"',
  'href="#clients"': 'href="clients.html"',
  'href="#call-to-action"': 'href="call-to-action.html"',
  'href="#onfocus"': 'href="onfocus.html"',
  'href="#testimonials"': 'href="testimonials.html"',
  'href="#pricing"': 'href="pricing.html"',
  'href="#faq"': 'href="faq.html"',
  'href="#team"': 'href="team.html"',
  'href="#recent-posts"': 'href="recent-posts.html"',
  'href="index.html#about"': 'href="about.html"',
  'href="index.html#services"': 'href="services.html"',
  'href="index.html#industries"': 'href="industries.html"',
  'href="index.html#portfolio"': 'href="portfolio.html"',
  'href="index.html#gallery"': 'href="gallery.html"',
  'href="index.html#contact"': 'href="contact.html"',
};

const NAV_ITEMS = [
  ['index.html', 'Home'],
  ['about.html', 'About Us'],
  ['services.html', 'Services'],
  ['industries.html', 'Industries'],
  ['portfolio.html', 'Projects'],
  ['gallery.html', 'Gallery'],
  ['quote.html', 'Request a Quote'],
  ['blog.html', 'Blog'],
  ['contact.html', 'Contact Us'],
];

const PAGE_CONFIG = {
  'index.html': { sectionIds: ['hero'], title: 'DMCTECH SOLUTIONS | Engineering, Manufacturing & Precision Laser Cutting', bodyClass: 'index-page', pageTitle: null, active: 'index.html', extraScripts: false },
  'featured-services.html': { sectionIds: ['featured-services'], title: 'Featured Services | DMCTECH SOLUTIONS', bodyClass: 'featured-services-page', pageTitle: 'Featured Services', active: null, extraScripts: false },
  'about.html': { sectionIds: ['about'], title: 'About Us | DMCTECH SOLUTIONS', bodyClass: 'about-page', pageTitle: 'About Us', active: 'about.html', extraScripts: false },
  'clients.html': { sectionIds: ['clients'], title: 'Our Clients | DMCTECH SOLUTIONS', bodyClass: 'clients-page', pageTitle: 'Our Clients', active: null, extraScripts: false },
  'call-to-action.html': { sectionIds: ['call-to-action'], title: 'Get Started | DMCTECH SOLUTIONS', bodyClass: 'call-to-action-page', pageTitle: 'Get Started', active: null, extraScripts: false },
  'onfocus.html': { sectionIds: ['onfocus'], title: 'Capabilities | DMCTECH SOLUTIONS', bodyClass: 'onfocus-page', pageTitle: 'Our Capabilities', active: null, extraScripts: false },
  'industries.html': { sectionIds: ['industries'], title: 'Industries We Serve | DMCTECH SOLUTIONS', bodyClass: 'industries-page', pageTitle: 'Industries We Serve', active: 'industries.html', extraScripts: false },
  'services.html': { sectionIds: ['services'], title: 'Our Services | DMCTECH SOLUTIONS', bodyClass: 'services-page', pageTitle: 'Our Services', active: 'services.html', extraScripts: false },
  'testimonials.html': { sectionIds: ['testimonials'], title: 'Testimonials | DMCTECH SOLUTIONS', bodyClass: 'testimonials-page', pageTitle: 'Testimonials', active: null, extraScripts: true },
  'pricing.html': { sectionIds: ['pricing'], title: 'Pricing & Quotes | DMCTECH SOLUTIONS', bodyClass: 'pricing-page', pageTitle: 'Request a Quote', active: null, extraScripts: false },
  'quote.html': { sectionIds: ['pricing', 'contact'], title: 'Request a Quote | DMCTECH SOLUTIONS', bodyClass: 'quote-page', pageTitle: 'Request a Quote', active: 'quote.html', extraScripts: false },
  'faq.html': { sectionIds: ['faq'], title: 'FAQ | DMCTECH SOLUTIONS', bodyClass: 'faq-page', pageTitle: 'FAQ', active: null, extraScripts: false },
  'portfolio.html': { sectionIds: ['portfolio'], title: 'Our Projects | DMCTECH SOLUTIONS', bodyClass: 'portfolio-page', pageTitle: 'Our Projects', active: 'portfolio.html', extraScripts: true },
  'gallery.html': { sectionIds: ['gallery'], title: 'Gallery | DMCTECH SOLUTIONS', bodyClass: 'gallery-page', pageTitle: 'Gallery', active: 'gallery.html', extraScripts: true },
  'team.html': { sectionIds: ['team'], title: 'Our Expertise | DMCTECH SOLUTIONS', bodyClass: 'team-page', pageTitle: 'Our Expertise', active: null, extraScripts: false },
  'recent-posts.html': { sectionIds: ['recent-posts'], title: 'Industry Insights | DMCTECH SOLUTIONS', bodyClass: 'recent-posts-page', pageTitle: 'Industry Insights', active: null, extraScripts: false },
  'contact.html': { sectionIds: ['contact'], title: 'Contact Us | DMCTECH SOLUTIONS', bodyClass: 'contact-page', pageTitle: 'Contact Us', active: 'contact.html', extraScripts: false },
};

function replaceLinks(text) {
  let out = text;
  for (const [oldLink, newLink] of Object.entries(LINK_MAP)) {
    out = out.split(oldLink).join(newLink);
  }
  return out;
}

function buildNav(activeHref) {
  return NAV_ITEMS.map(([href, label]) => {
    const cls = href === activeHref ? ' class="active"' : '';
    return `          <li><a href="${href}"${cls}>${label}</a></li>`;
  }).join('\n');
}

function buildHeader(activeHref) {
  const nav = buildNav(activeHref);
  let h = header.replace(/<ul>[\s\S]*?<\/ul>/, `<ul>\n${nav}\n        </ul>`);
  return replaceLinks(h);
}

function buildFooterBlock() {
  let f = footer;
  f = f.replace(/<h4>Useful Links<\/h4>\s*<ul>[\s\S]*?<\/ul>/,
    `<h4>Useful Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="quote.html">Request a Quote</a></li>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
            </ul>`);
  f = f.replace(/<h4>Our Services<\/h4>\s*<ul>[\s\S]*?<\/ul>/,
    `<h4>Our Services</h4>
            <ul>
              <li><a href="services.html">Laser Cutting</a></li>
              <li><a href="services.html">CNC Bending</a></li>
              <li><a href="services.html">Steel Fabrication</a></li>
              <li><a href="services.html">Conveyor Systems</a></li>
              <li><a href="services.html">Project Engineering</a></li>
            </ul>`);
  f = f.replace(/<h4>Industries<\/h4>\s*<ul>[\s\S]*?<\/ul>/,
    `<h4>Industries</h4>
            <ul>
              <li><a href="industries.html">Mining</a></li>
              <li><a href="industries.html">Materials Handling</a></li>
              <li><a href="industries.html">Manufacturing</a></li>
              <li><a href="industries.html">Energy</a></li>
              <li><a href="industries.html">Infrastructure</a></li>
            </ul>`);
  f = f.replace(/<h4>Resources<\/h4>\s*<ul>[\s\S]*?<\/ul>/,
    `<h4>Resources</h4>
            <ul>
              <li><a href="portfolio.html">Projects</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="quote.html">Get a Quote</a></li>
            </ul>`);
  return replaceLinks(f);
}

function buildPageTitle(title) {
  return `
    <!-- Page Title -->
    <div class="page-title">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">${title}</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li class="current">${title}</li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->
`;
}

function buildTail(extraScripts) {
  if (extraScripts) return tail;
  return tail
    .replace(/\n  <script src="assets\/vendor\/imagesloaded[\s\S]*?<\/script>/, '')
    .replace(/\n  <script src="assets\/vendor\/isotope-layout[\s\S]*?<\/script>/, '');
}

function buildHead(title) {
  return head.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
}

for (const [filename, cfg] of Object.entries(PAGE_CONFIG)) {
  const pageSections = cfg.sectionIds.map((sid) => {
    if (!sections[sid]) throw new Error(`Missing section '${sid}' for ${filename}`);
    return replaceLinks(sections[sid]);
  });

  const mainParts = [];
  if (cfg.pageTitle) mainParts.push(buildPageTitle(cfg.pageTitle));
  mainParts.push(...pageSections);

  const pageHtml = `<!DOCTYPE html>
<html lang="en">

${buildHead(cfg.title)}

<body class="${cfg.bodyClass}">

${buildHeader(cfg.active)}

  <main class="main">
${mainParts.join('\n')}
  </main>

${buildFooterBlock()}

${buildTail(cfg.extraScripts)}

`;
  fs.writeFileSync(path.join(ROOT, filename), pageHtml, 'utf8');
  console.log(`Wrote ${filename}`);
}

console.log('Done.');
