import { RenderMode, ServerRoute } from '@angular/ssr';
import { BlogService } from './core/services/blog.service';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'blogs/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      const blogService = new BlogService();
      return blogService.getAllBlogs().map(blog => ({ slug: blog.slug }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
