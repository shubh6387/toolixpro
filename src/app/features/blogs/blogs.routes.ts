import { Routes } from '@angular/router';
import { seoResolver } from '../../core/seo/seo.resolver';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./blog-list/blog-list.component').then(m => m.BlogListComponent),
    resolve: { seo: seoResolver }
  },
  {
    path: ':slug',
    loadComponent: () => import('./blog-details/blog-details.component').then(m => m.BlogDetailsComponent),
    resolve: { seo: seoResolver }
  }
];
