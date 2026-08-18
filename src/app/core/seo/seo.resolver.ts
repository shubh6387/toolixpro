import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { ToolRegistryService } from '../registry/tool-registry.service';
import { BlogService } from '../services/blog.service';
import { SeoService } from './seo.service';

export const seoResolver: ResolveFn<boolean> = (route, state) => {
  const toolRegistryService = inject(ToolRegistryService);
  const blogService = inject(BlogService);
  const seoService = inject(SeoService);

  const toolSlug = route.data['toolSlug'] || route.params['toolSlug'];

  if (toolSlug) {
    const tool = toolRegistryService.getToolBySlug(toolSlug);
    if (tool) {
      const url = `https://toolixpro.vercel.app/${tool.slug}`;
      const softwareSchema = seoService.generateSoftwareSchema(tool.name, tool.description, url);
      const breadcrumbSchema = seoService.generateBreadcrumbSchema([
        { name: 'Home', url: 'https://toolixpro.vercel.app/' },
        { name: tool.category, url: 'https://toolixpro.vercel.app/' },
        { name: tool.name, url: url }
      ]);
      const faqSchema = tool.faqs && tool.faqs.length > 0 ? seoService.generateFaqSchema(tool.faqs) : null;
      
      const combinedSchema = {
        '@context': 'https://schema.org',
        '@graph': [
          softwareSchema,
          breadcrumbSchema,
          ...(faqSchema ? [faqSchema] : [])
        ]
      };

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

  // Handle Blog Post Resolution
  const blogSlug = route.params['slug'];
  if (blogSlug) {
    const blog = blogService.getBlogBySlug(blogSlug);
    if (blog) {
      const blogUrl = `https://toolixpro.vercel.app/blogs/${blog.slug}`;
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': blog.title,
        'description': blog.metaDescription,
        'image': blog.featuredImage,
        'datePublished': blog.publishedDate,
        'author': {
          '@type': 'Organization',
          'name': blog.author
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'ToolixPro',
          'url': 'https://toolixpro.vercel.app/'
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': blogUrl
        }
      };

      seoService.updateMeta({
        title: blog.metaTitle,
        description: blog.metaDescription,
        keywords: blog.keywords,
        slug: `blogs/${blog.slug}`,
        schema: articleSchema
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
      description = 'Free online developer tools. Format JSON, decode JWT, generate passwords, test regex, convert Base64, generate QR codes and UUIDs instantly.';
      keywords = ['developer tools', 'online formatters', 'free dev utilities', 'jwt tool', 'regex helper', 'json formatter'];
      break;
    case 'blogs':
      title = 'Developer Articles & Technical Tutorials';
      description = 'Read developer guides, security tutorials, JSON tips, and tool usage articles from the ToolixPro team.';
      keywords = ['developer blogs', 'programming tutorials', 'security articles', 'json guide', 'jwt tutorial'];
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
