import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ToolRegistryService } from '../registry/tool-registry.service';
import { SeoService } from './seo.service';

export const seoResolver: ResolveFn<boolean> = (route, state) => {
  const toolRegistryService = inject(ToolRegistryService);
  const seoService = inject(SeoService);

  const toolSlug = route.data['toolSlug'] || route.params['toolSlug'];

  if (toolSlug) {
    const tool = toolRegistryService.getToolBySlug(toolSlug);
    if (tool) {
      const url = `https://toolixpro.net/${tool.slug}`;
      const softwareSchema = seoService.generateSoftwareSchema(tool.name, tool.description, url);
      const faqSchema = tool.faqs && tool.faqs.length > 0 ? seoService.generateFaqSchema(tool.faqs) : null;
      
      const combinedSchema = faqSchema 
        ? {
            '@context': 'https://schema.org',
            '@graph': [softwareSchema, faqSchema]
          }
        : softwareSchema;

      seoService.updateMeta({
        title: tool.metaTitle || tool.name,
        description: tool.metaDescription || tool.tagline,
        keywords: tool.keywords,
        slug: tool.slug,
        schema: combinedSchema
      });
      return true;
    }
  }

  const path = route.routeConfig?.path || '';
  let title = '';
  let description = '';
  let keywords: string[] = [];

  switch (path) {
    case '':
      title = '100+ Free Online Developer Tools';
      description = 'ToolixPro provides a fast, modern suite of free online tools for developers. Format JSON, decode JWT, generate secure passwords, test regex, convert base64, and more.';
      keywords = ['developer tools', 'online formatters', 'free dev utilities', 'jwt tool', 'regex helper'];
      break;
    case 'about':
      title = 'About Us';
      description = 'Learn more about ToolixPro, our mission to provide the fastest developer utility tools, and our privacy-first client-side processing approach.';
      break;
    case 'contact':
      title = 'Contact Support';
      description = 'Get in touch with the ToolixPro team. Send us feedback, suggest new developer tools, or report bugs.';
      break;
    case 'privacy-policy':
      title = 'Privacy Policy';
      description = 'Read the ToolixPro privacy policy. Learn how we process all developer data client-side in the browser to ensure absolute security.';
      break;
    case 'terms':
      title = 'Terms of Service';
      description = 'Read the terms of service for utilizing the ToolixPro free online developer utilities.';
      break;
    default:
      title = '404 - Page Not Found';
      description = 'The requested developer tool or page could not be found on ToolixPro.';
      break;
  }

  seoService.updateMeta({
    title,
    description,
    keywords,
    slug: path
  });

  return true;
};
