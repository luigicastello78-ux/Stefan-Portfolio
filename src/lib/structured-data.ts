import { faq } from "@/content/faq";
import { siteConfig } from "@/config/site";
import type { Post } from "@/content/posts";

/**
 * JSON-LD builders. PRD section 9.3.
 *
 * Every claim here has to match something a visitor can see on the page.
 * Structured data that describes a different site than the one rendered is
 * a manual action waiting to happen.
 */

const PERSON_ID = `${siteConfig.url}/#person`;
const SERVICE_ID = `${siteConfig.url}/#service`;

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    jobTitle: "Web Developer",
    description:
      "Web developer and designer building websites, web apps and automation.",
    knowsAbout: [
      "Web development",
      "Web design",
      "Web application development",
      "Webflow",
      "Workflow automation",
      "Technical SEO",
    ],
  };
}

export function professionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": SERVICE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    email: `mailto:${siteConfig.email}`,
    description: siteConfig.description,
    provider: { "@id": PERSON_ID },
    // Global, per the positioning decision. No local business markup.
    areaServed: "Worldwide",
    availableLanguage: "English",
    serviceType: [
      "Web development",
      "Web design",
      "Web application development",
      "Webflow development",
      "Workflow automation",
      "Technical SEO",
    ],
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function articleSchema(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    keywords: post.tags.join(", "),
  };
}
