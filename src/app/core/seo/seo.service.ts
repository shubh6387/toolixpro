import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private document = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private readonly SITE_NAME = 'ToolixPro';
  private readonly DEFAULT_TITLE = 'ToolixPro - 100+ Free Online Developer Tools';
  private readonly DEFAULT_DESCRIPTION = 'Free, client-side, fast developer utilities: JSON Formatter, JWT Decoder, Password Generator, Regex Tester, Base64 Encoder/Decoder, and more.';
  private readonly DEFAULT_KEYWORDS = 'developer tools, online formatter, jwt decoder, regex tester, base64 encoder, developer utilities';

  updateMeta(config: {
    title?: string;
    description?: string;
    keywords?: string[];
    slug?: string;
    noIndex?: boolean;
    schema?: any;
  }): void {
    const title = config.title ? `${config.title} | ${this.SITE_NAME}` : this.DEFAULT_TITLE;
    const description = config.description || this.DEFAULT_DESCRIPTION;
    const keywords = config.keywords ? config.keywords.join(', ') : this.DEFAULT_KEYWORDS;
    const url = `https://toolixpro.net/${config.slug || ''}`;

    // Set Document Title
    this.titleService.setTitle(title);

    // Standard Meta Tags
    this.metaService.updateTag({ name: 'description', content: description });
    this.metaService.updateTag({ name: 'keywords', content: keywords });
    this.metaService.updateTag({ name: 'robots', content: config.noIndex ? 'noindex, nofollow' : 'index, follow' });

    // Open Graph Meta Tags
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    this.metaService.updateTag({ property: 'og:url', content: url });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    this.metaService.updateTag({ property: 'og:image', content: 'https://toolixpro.net/assets/og-image.png' });
    this.metaService.updateTag({ property: 'og:site_name', content: this.SITE_NAME });

    // Twitter Card Meta Tags
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });
    this.metaService.updateTag({ name: 'twitter:image', content: 'https://toolixpro.net/assets/og-image.png' });

    // Canonical Link
    this.updateCanonicalUrl(url);

    // Dynamic JSON-LD Schema
    if (config.schema) {
      this.updateJsonLdSchema(config.schema);
    } else {
      // Default Website Schema
      this.updateJsonLdSchema(this.getDefaultWebsiteSchema());
    }
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private updateJsonLdSchema(schema: any): void {
    const existingScripts = this.document.head.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    const script = this.document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.text = JSON.stringify(schema);
    this.document.head.appendChild(script);
  }

  private getDefaultWebsiteSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': this.SITE_NAME,
      'url': 'https://toolixpro.net',
      'potentialAction': {
        '@type': 'SearchAction',
        'target': 'https://toolixpro.net/?q={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    };
  }

  generateSoftwareSchema(toolName: string, description: string, url: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': toolName,
      'description': description,
      'applicationCategory': 'DeveloperApplication',
      'operatingSystem': 'Windows, macOS, Linux, Android, iOS',
      'url': url,
      'offers': {
        '@type': 'Offer',
        'price': '0',
        'priceCurrency': 'USD'
      }
    };
  }

  generateFaqSchema(faqs: { question: string; answer: string }[]) {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    };
  }
}
