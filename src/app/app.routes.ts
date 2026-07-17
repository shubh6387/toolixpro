import { Routes } from '@angular/router';
import { seoResolver } from './core/seo/seo.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
    resolve: { seo: seoResolver }
  },
  {
    path: 'about',
    loadComponent: () => import('./features/static/about/about.component').then(m => m.AboutComponent),
    resolve: { seo: seoResolver }
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/static/contact/contact.component').then(m => m.ContactComponent),
    resolve: { seo: seoResolver }
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./features/static/privacy/privacy.component').then(m => m.PrivacyComponent),
    resolve: { seo: seoResolver }
  },
  {
    path: 'terms',
    loadComponent: () => import('./features/static/terms/terms.component').then(m => m.TermsComponent),
    resolve: { seo: seoResolver }
  },
  {
    path: 'blogs',
    loadChildren: () => import('./features/blogs/blogs.routes').then(m => m.BLOG_ROUTES)
  },
  {
    path: '',
    loadComponent: () => import('./layouts/tool-layout/tool-layout.component').then(m => m.ToolLayoutComponent),
    children: [
      {
        path: 'json-formatter',
        loadComponent: () => import('./features/tools/components/json-formatter/json-formatter.component').then(m => m.JsonFormatterComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'json-formatter' }
      },
      {
        path: 'jwt-decoder',
        loadComponent: () => import('./features/tools/components/jwt-decoder/jwt-decoder.component').then(m => m.JwtDecoderComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'jwt-decoder' }
      },
      {
        path: 'password-generator',
        loadComponent: () => import('./features/tools/components/password-generator/password-generator.component').then(m => m.PasswordGeneratorComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'password-generator' }
      },
      {
        path: 'regex-tester',
        loadComponent: () => import('./features/tools/components/regex-tester/regex-tester.component').then(m => m.RegexTesterComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'regex-tester' }
      },
      {
        path: 'base64',
        loadComponent: () => import('./features/tools/components/base64/base64.component').then(m => m.Base64Component),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'base64' }
      },
      {
        path: 'qr-generator',
        loadComponent: () => import('./features/tools/components/qr-generator/qr-generator.component').then(m => m.QrGeneratorComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'qr-generator' }
      },
      {
        path: 'uuid-generator',
        loadComponent: () => import('./features/tools/components/uuid-generator/uuid-generator.component').then(m => m.UuidGeneratorComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'uuid-generator' }
      },
      {
        path: 'url-encoder-decoder',
        loadComponent: () => import('./features/tools/components/url-encoder-decoder/url-encoder-decoder.component').then(m => m.UrlEncoderDecoderComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'url-encoder-decoder' }
      },
      {
        path: 'hash-generator',
        loadComponent: () => import('./features/tools/components/hash-generator/hash-generator.component').then(m => m.HashGeneratorComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'hash-generator' }
      },
      {
        path: 'lorem-ipsum',
        loadComponent: () => import('./features/tools/components/lorem-ipsum/lorem-ipsum.component').then(m => m.LoremIpsumComponent),
        resolve: { seo: seoResolver },
        data: { toolSlug: 'lorem-ipsum' }
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./features/static/not-found/not-found.component').then(m => m.NotFoundComponent),
    resolve: { seo: seoResolver }
  }
];
