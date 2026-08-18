#!/usr/bin/env python3
"""Split index.html sections into separate pages."""

import re
from pathlib import Path

ROOT = Path(__file__).parent
INDEX = ROOT / "index.html"
content = INDEX.read_text(encoding="utf-8")

# Extract document parts
head_match = re.search(r"(<head>.*?</head>)", content, re.DOTALL)
header_match = re.search(r"(<header id=\"header\".*?</header>)", content, re.DOTALL)
footer_match = re.search(r"(<footer id=\"footer\".*?</footer>)", content, re.DOTALL)
tail_match = re.search(r"(<!-- Scroll Top -->.*?</html>)", content, re.DOTALL)
main_match = re.search(r"<main class=\"main\">(.*?)</main>", content, re.DOTALL)

head = head_match.group(1)
header = header_match.group(1)
footer = footer_match.group(1)
tail = tail_match.group(1)
main_body = main_match.group(1)

sections = {}
for match in re.finditer(
    r"(    <!-- .*? -->\n    <section id=\"([^\"]+)\".*?</section><!-- /.*? -->)",
    main_body,
    re.DOTALL,
):
    sections[match.group(2)] = match.group(1)

# Gallery is embedded inside portfolio — extract for standalone page
portfolio = sections.get("portfolio", "")
gallery_match = re.search(
    r"(          <div id=\"gallery\" class=\"row g-0 isotope-container\".*?</div><!-- End Portfolio Container -->)",
    portfolio,
    re.DOTALL,
)
if gallery_match:
    gallery_inner = gallery_match.group(1)
    sections["gallery"] = f"""    <!-- Gallery Section -->
    <section id="gallery" class="portfolio section">

      <!-- Section Title -->
      <div class="container section-title" data-aos="fade-up">
        <h2>Gallery</h2>
        <p>Engineering, fabrication and manufacturing work from DMCTECH SOLUTIONS</p>
      </div><!-- End Section Title -->

      <div class="container-fluid">

        <div class="isotope-layout" data-default-filter="*" data-layout="masonry" data-sort="original-order">

{gallery_inner}

        </div>

      </div>

    </section><!-- /Gallery Section -->"""

LINK_MAP = {
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
}

NAV_ITEMS = [
    ("index.html", "Home"),
    ("about.html", "About Us"),
    ("services.html", "Services"),
    ("industries.html", "Industries"),
    ("portfolio.html", "Projects"),
    ("gallery.html", "Gallery"),
    ("quote.html", "Request a Quote"),
    ("blog.html", "Blog"),
    ("contact.html", "Contact Us"),
]

PAGE_CONFIG = {
    "index.html": {
        "section_ids": ["hero"],
        "title": "DMCTECH SOLUTIONS | Engineering, Manufacturing & Precision Laser Cutting",
        "body_class": "index-page",
        "page_title": None,
        "active": "index.html",
        "extra_scripts": False,
    },
    "featured-services.html": {
        "section_ids": ["featured-services"],
        "title": "Featured Services | DMCTECH SOLUTIONS",
        "body_class": "featured-services-page",
        "page_title": "Featured Services",
        "active": None,
        "extra_scripts": False,
    },
    "about.html": {
        "section_ids": ["about"],
        "title": "About Us | DMCTECH SOLUTIONS",
        "body_class": "about-page",
        "page_title": "About Us",
        "active": "about.html",
        "extra_scripts": False,
    },
    "clients.html": {
        "section_ids": ["clients"],
        "title": "Our Clients | DMCTECH SOLUTIONS",
        "body_class": "clients-page",
        "page_title": "Our Clients",
        "active": None,
        "extra_scripts": False,
    },
    "call-to-action.html": {
        "section_ids": ["call-to-action"],
        "title": "Get Started | DMCTECH SOLUTIONS",
        "body_class": "call-to-action-page",
        "page_title": "Get Started",
        "active": None,
        "extra_scripts": False,
    },
    "onfocus.html": {
        "section_ids": ["onfocus"],
        "title": "Capabilities | DMCTECH SOLUTIONS",
        "body_class": "onfocus-page",
        "page_title": "Our Capabilities",
        "active": None,
        "extra_scripts": False,
    },
    "industries.html": {
        "section_ids": ["industries"],
        "title": "Industries We Serve | DMCTECH SOLUTIONS",
        "body_class": "industries-page",
        "page_title": "Industries We Serve",
        "active": "industries.html",
        "extra_scripts": False,
    },
    "services.html": {
        "section_ids": ["services"],
        "title": "Our Services | DMCTECH SOLUTIONS",
        "body_class": "services-page",
        "page_title": "Our Services",
        "active": "services.html",
        "extra_scripts": False,
    },
    "testimonials.html": {
        "section_ids": ["testimonials"],
        "title": "Testimonials | DMCTECH SOLUTIONS",
        "body_class": "testimonials-page",
        "page_title": "Testimonials",
        "active": None,
        "extra_scripts": True,
    },
    "pricing.html": {
        "section_ids": ["pricing"],
        "title": "Pricing & Quotes | DMCTECH SOLUTIONS",
        "body_class": "pricing-page",
        "page_title": "Request a Quote",
        "active": None,
        "extra_scripts": False,
    },
    "quote.html": {
        "section_ids": ["pricing", "contact"],
        "title": "Request a Quote | DMCTECH SOLUTIONS",
        "body_class": "quote-page",
        "page_title": "Request a Quote",
        "active": "quote.html",
        "extra_scripts": False,
    },
    "faq.html": {
        "section_ids": ["faq"],
        "title": "FAQ | DMCTECH SOLUTIONS",
        "body_class": "faq-page",
        "page_title": "FAQ",
        "active": None,
        "extra_scripts": False,
    },
    "portfolio.html": {
        "section_ids": ["portfolio"],
        "title": "Our Projects | DMCTECH SOLUTIONS",
        "body_class": "portfolio-page",
        "page_title": "Our Projects",
        "active": "portfolio.html",
        "extra_scripts": True,
    },
    "gallery.html": {
        "section_ids": ["gallery"],
        "title": "Gallery | DMCTECH SOLUTIONS",
        "body_class": "gallery-page",
        "page_title": "Gallery",
        "active": "gallery.html",
        "extra_scripts": True,
    },
    "team.html": {
        "section_ids": ["team"],
        "title": "Our Expertise | DMCTECH SOLUTIONS",
        "body_class": "team-page",
        "page_title": "Our Expertise",
        "active": None,
        "extra_scripts": False,
    },
    "recent-posts.html": {
        "section_ids": ["recent-posts"],
        "title": "Industry Insights | DMCTECH SOLUTIONS",
        "body_class": "recent-posts-page",
        "page_title": "Industry Insights",
        "active": None,
        "extra_scripts": False,
    },
    "contact.html": {
        "section_ids": ["contact"],
        "title": "Contact Us | DMCTECH SOLUTIONS",
        "body_class": "contact-page",
        "page_title": "Contact Us",
        "active": "contact.html",
        "extra_scripts": False,
    },
}


def replace_links(text: str) -> str:
    for old, new in LINK_MAP.items():
        text = text.replace(old, new)
    return text


def build_nav(active_href: str | None) -> str:
    items = []
    for href, label in NAV_ITEMS:
        cls = ' class="active"' if href == active_href else ""
        items.append(f'          <li><a href="{href}"{cls}>{label}</a></li>')
    return "\n".join(items)


def build_header(active_href: str | None) -> str:
    nav = build_nav(active_href)
    h = header
    h = re.sub(r"<ul>\s*.*?\s*</ul>", f"<ul>\n{nav}\n        </ul>", h, count=1, flags=re.DOTALL)
    return replace_links(h)


def build_footer() -> str:
    f = footer
    f = re.sub(
        r"<h4>Useful Links</h4>\s*<ul>.*?</ul>",
        """<h4>Useful Links</h4>
            <ul>
              <li><a href="index.html">Home</a></li>
              <li><a href="about.html">About Us</a></li>
              <li><a href="services.html">Services</a></li>
              <li><a href="quote.html">Request a Quote</a></li>
              <li><a href="privacy-policy.html">Privacy Policy</a></li>
            </ul>""",
        f,
        count=1,
        flags=re.DOTALL,
    )
    f = re.sub(
        r"<h4>Our Services</h4>\s*<ul>.*?</ul>",
        """<h4>Our Services</h4>
            <ul>
              <li><a href="services.html">Laser Cutting</a></li>
              <li><a href="services.html">CNC Bending</a></li>
              <li><a href="services.html">Steel Fabrication</a></li>
              <li><a href="services.html">Conveyor Systems</a></li>
              <li><a href="services.html">Project Engineering</a></li>
            </ul>""",
        f,
        count=1,
        flags=re.DOTALL,
    )
    f = re.sub(
        r"<h4>Industries</h4>\s*<ul>.*?</ul>",
        """<h4>Industries</h4>
            <ul>
              <li><a href="industries.html">Mining</a></li>
              <li><a href="industries.html">Materials Handling</a></li>
              <li><a href="industries.html">Manufacturing</a></li>
              <li><a href="industries.html">Energy</a></li>
              <li><a href="industries.html">Infrastructure</a></li>
            </ul>""",
        f,
        count=1,
        flags=re.DOTALL,
    )
    f = re.sub(
        r"<h4>Resources</h4>\s*<ul>.*?</ul>",
        """<h4>Resources</h4>
            <ul>
              <li><a href="portfolio.html">Projects</a></li>
              <li><a href="gallery.html">Gallery</a></li>
              <li><a href="blog.html">Blog</a></li>
              <li><a href="contact.html">Contact Us</a></li>
              <li><a href="quote.html">Get a Quote</a></li>
            </ul>""",
        f,
        count=1,
        flags=re.DOTALL,
    )
    return replace_links(f)


def build_page_title(title: str) -> str:
    return f"""
    <!-- Page Title -->
    <div class="page-title">
      <div class="container d-lg-flex justify-content-between align-items-center">
        <h1 class="mb-2 mb-lg-0">{title}</h1>
        <nav class="breadcrumbs">
          <ol>
            <li><a href="index.html">Home</a></li>
            <li class="current">{title}</li>
          </ol>
        </nav>
      </div>
    </div><!-- End Page Title -->
"""


def build_tail(extra_scripts: bool) -> str:
    t = tail
    if not extra_scripts:
        t = re.sub(
            r"\n  <script src=\"assets/vendor/imagesloaded.*?</script>\n  <script src=\"assets/vendor/isotope-layout.*?</script>",
            "",
            t,
            flags=re.DOTALL,
        )
    return t


def build_head(title: str) -> str:
    h = re.sub(r"<title>.*?</title>", f"<title>{title}</title>", head)
    return h


for filename, cfg in PAGE_CONFIG.items():
    page_sections = []
    for sid in cfg["section_ids"]:
        if sid not in sections:
            raise KeyError(f"Missing section '{sid}' for {filename}")
        page_sections.append(replace_links(sections[sid]))

    main_parts = []
    if cfg["page_title"]:
        main_parts.append(build_page_title(cfg["page_title"]))
    main_parts.extend(page_sections)

    page_html = f"""<!DOCTYPE html>
<html lang="en">

{build_head(cfg["title"])}

<body class="{cfg["body_class"]}">

{build_header(cfg["active"])}

  <main class="main">
{"".join(main_parts)}
  </main>

{build_footer()}

{build_tail(cfg["extra_scripts"])}

"""
    (ROOT / filename).write_text(page_html, encoding="utf-8")
    print(f"Wrote {filename}")

print("Done.")
