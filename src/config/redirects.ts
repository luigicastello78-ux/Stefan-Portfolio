import type { Redirect } from "next/dist/lib/load-custom-routes";

/**
 * Legacy URL map. PRD section 9.4, open decision 11.
 *
 * Empty because the owner has not supplied the list of currently ranking
 * URLs from the old site. Every path left out of this list loses whatever
 * search traffic it had the day the new site goes live.
 *
 * To fill it: open Search Console, take the pages with impressions, and add
 * one entry each pointing at the nearest equivalent here. Use permanent
 * redirects so the ranking signal transfers.
 *
 * Example:
 *   { source: "/webflow-developer", destination: "/services", permanent: true }
 */
export const legacyRedirects: Redirect[] = [];
