/**
 * Renders a JSON-LD block. Server component, so the markup is in the HTML
 * that crawlers receive rather than being injected later by script.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // The payload is built in our own code from our own content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
