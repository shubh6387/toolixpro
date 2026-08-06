import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { BlogService, BlogPost } from '../../../core/services/blog.service';

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3" *ngIf="blog()">
      <div class="container-xl" style="max-width: 850px;">
        <!-- Breadcrumb Navigation -->
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><a routerLink="/" class="text-decoration-none">Home</a></li>
            <li class="breadcrumb-item"><a routerLink="/blogs" class="text-decoration-none">Blogs</a></li>
            <li class="breadcrumb-item active text-truncate" aria-current="page" style="max-width: 300px;">{{ blog()?.title }}</li>
          </ol>
        </nav>

        <!-- Article Header -->
        <div class="mb-4">
          <span class="badge bg-indigo-subtle text-indigo-emphasis rounded-pill px-3 py-1.5 mb-2">{{ blog()?.category }}</span>
          <h1 class="display-5 font-weight-black mb-3">{{ blog()?.title }}</h1>
          
          <div class="d-flex align-items-center gap-3 text-secondary small py-2 border-top border-bottom">
            <span>By <strong>{{ blog()?.author }}</strong></span>
            <span>&bull;</span>
            <span>{{ blog()?.publishedDate | date:'mediumDate' }}</span>
            <span>&bull;</span>
            <span>{{ blog()?.readingTime }}</span>
          </div>
        </div>

        <!-- Featured Image -->
        <img [src]="blog()?.featuredImage" class="img-fluid rounded-4 mb-5 w-100 shadow-sm" [alt]="blog()?.title" style="max-height: 420px; object-fit: cover;">

        <!-- Blog Body Content -->
        <div class="blog-content text-secondary lh-lg fs-5 mb-5" [innerHTML]="blog()?.content">
        </div>

        <!-- Try Related Tool Banner Call-To-Action -->
        @if (blog()?.toolSlug) {
          <div class="card premium-card p-4 my-5 bg-gradient-cta">
            <div class="d-flex flex-column flex-md-row align-items-center justify-content-between gap-3">
              <div>
                <h3 class="h4 font-weight-bold mb-1 text-body">Ready to test this in action?</h3>
                <p class="text-secondary mb-0">Use our free 100% client-side tool with instant browser execution and privacy.</p>
              </div>
              <a [routerLink]="['/' + blog()?.toolSlug]" class="btn btn-primary rounded-pill px-4 py-2 fw-semibold flex-shrink-0">
                Open Utility <i class="bi bi-arrow-right ms-2"></i>
              </a>
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Fallback 404 -->
    <section class="py-5 text-center" *ngIf="!blog()">
      <div class="container-xl py-5">
        <h2 class="h3 font-weight-bold mb-3">Blog Article Not Found</h2>
        <p class="text-secondary mb-4">The blog post you are looking for does not exist or has been moved.</p>
        <a routerLink="/blogs" class="btn btn-primary rounded-pill px-4">Browse All Articles</a>
      </div>
    </section>

    <app-footer></app-footer>
  `,
  styles: [`
    h1 {
      font-family: var(--font-title);
    }
    .bg-indigo-subtle {
      background-color: var(--badge-bg);
      color: var(--badge-text);
    }
    .blog-content {
      line-height: 1.8;
    }
    .bg-gradient-cta {
      border-left: 4px solid var(--accent-color);
    }
  `]
})
export class BlogDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private blogService = inject(BlogService);
  blog = signal<BlogPost | undefined>(undefined);

  ngOnInit() {
    this.route.params.subscribe(params => {
      const slug = params['slug'];
      if (slug) {
        this.blog.set(this.blogService.getBlogBySlug(slug));
      }
    });
  }
}
