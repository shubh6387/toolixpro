import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

export interface Blog {
  title: string;
  slug: string;
  description: string;
  category: string;
  featuredImage: string;
  author: string;
  publishedDate: string;
  readingTime: string;
}

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3">
      <div class="container-xl">
        <div class="text-center mb-5">
          <h1 class="display-5 font-weight-black mb-2">Latest Developer Articles</h1>
          <p class="text-secondary">Tutorials, security guides, and dev tips from the ToolixPro team.</p>
        </div>

        <div class="row g-4">
          @for (blog of blogs(); track blog.slug) {
            <div class="col-lg-4 col-md-6">
              <div class="card premium-card h-100 overflow-hidden" [routerLink]="['/blogs', blog.slug]" style="cursor: pointer;">
                <img [src]="blog.featuredImage" class="card-img-top" [alt]="blog.title" style="height: 200px; object-fit: cover;">
                <div class="card-body p-4">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="badge bg-indigo-subtle text-indigo-emphasis rounded-pill px-2.5 py-1">{{ blog.category }}</span>
                    <span class="small text-secondary"><i class="bi bi-clock me-1"></i>{{ blog.readingTime }}</span>
                  </div>
                  <h4 class="h5 fw-bold mb-2 text-body">{{ blog.title }}</h4>
                  <p class="text-secondary small mb-3 text-truncate-2">{{ blog.description }}</p>
                  <div class="d-flex align-items-center gap-2 mt-auto border-top pt-3">
                    <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style="width: 32px; height: 32px; font-size: 0.8rem; font-weight: bold;">
                      TN
                    </div>
                    <div>
                      <div class="small fw-bold text-body">{{ blog.author }}</div>
                      <div class="text-secondary" style="font-size: 0.75rem;">{{ blog.publishedDate | date }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
    <app-footer></app-footer>
  `,
  styles: [`
    h1 {
      font-family: var(--font-title);
    }
    .text-truncate-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .bg-indigo-subtle {
      background-color: var(--badge-bg);
      color: var(--badge-text);
    }
  `]
})
export class BlogListComponent {
  blogs = signal<Blog[]>([
    {
      title: 'Parsing and Decoding JWTs Safely in Client Applications',
      slug: 'parsing-and-decoding-jwts-safely',
      description: 'Understanding JSON Web Tokens, why client-side decoding is safe, and how to read user payloads securely.',
      category: 'Security',
      featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60',
      author: 'ToolixPro Team',
      publishedDate: '2026-07-15T00:00:00Z',
      readingTime: '4 min read'
    },
    {
      title: 'How to Validate JSON Structures and Avoid Runtime Errors',
      slug: 'how-to-validate-json-structures',
      description: 'A deep-dive tutorial into JSON schema validation, common syntax issues, and client-side beautification techniques.',
      category: 'JSON Utilities',
      featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60',
      author: 'ToolixPro Team',
      publishedDate: '2026-07-14T00:00:00Z',
      readingTime: '5 min read'
    }
  ]);
}
