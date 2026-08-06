import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { BlogService, BlogPost } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-list',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3">
      <div class="container-xl">
        <div class="text-center mb-5">
          <h1 class="display-5 font-weight-black mb-2">Developer Guides & Articles</h1>
          <p class="text-secondary fs-5">Deep-dive technical tutorials, security guides, and dev utilities tips from ToolixPro.</p>
        </div>

        <div class="row g-4">
          @for (blog of blogs(); track blog.slug) {
            <div class="col-lg-4 col-md-6">
              <div class="card premium-card h-100 overflow-hidden d-flex flex-column" [routerLink]="['/blogs', blog.slug]" style="cursor: pointer;">
                <img [src]="blog.featuredImage" class="card-img-top" [alt]="blog.title" style="height: 200px; object-fit: cover;">
                <div class="card-body p-4 d-flex flex-column">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <span class="badge bg-indigo-subtle text-indigo-emphasis rounded-pill px-2.5 py-1">{{ blog.category }}</span>
                    <span class="small text-secondary"><i class="bi bi-clock me-1"></i>{{ blog.readingTime }}</span>
                  </div>
                  <h2 class="h5 fw-bold mb-2 text-body">{{ blog.title }}</h2>
                  <p class="text-secondary small mb-3 text-truncate-2">{{ blog.description }}</p>
                  <div class="d-flex align-items-center justify-content-between mt-auto border-top pt-3">
                    <div class="d-flex align-items-center gap-2">
                      <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 32px; height: 32px; font-size: 0.75rem;">
                        TP
                      </div>
                      <div>
                        <div class="small fw-bold text-body">{{ blog.author }}</div>
                        <div class="text-secondary" style="font-size: 0.75rem;">{{ blog.publishedDate | date }}</div>
                      </div>
                    </div>
                    <span class="btn btn-sm btn-outline-primary rounded-pill px-3">Read <i class="bi bi-arrow-right"></i></span>
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
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .bg-indigo-subtle {
      background-color: var(--badge-bg);
      color: var(--badge-text);
    }
  `]
})
export class BlogListComponent implements OnInit {
  private blogService = inject(BlogService);
  blogs = signal<BlogPost[]>([]);

  ngOnInit() {
    this.blogs.set(this.blogService.getAllBlogs());
  }
}
