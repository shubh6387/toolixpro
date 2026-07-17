import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

export interface BlogDetail {
  title: string;
  slug: string;
  description: string;
  category: string;
  featuredImage: string;
  author: string;
  publishedDate: string;
  readingTime: string;
  content: string;
}

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3" *ngIf="blog()">
      <div class="container-xl" style="max-width: 800px;">
        <!-- Header -->
        <div class="mb-4">
          <span class="badge bg-indigo-subtle text-indigo-emphasis rounded-pill px-3 py-1.5 mb-2">{{ blog()?.category }}</span>
          <h1 class="display-5 font-weight-black mb-3">{{ blog()?.title }}</h1>
          
          <div class="d-flex align-items-center gap-3 text-secondary small py-2 border-top border-bottom">
            <span>By <strong>{{ blog()?.author }}</strong></span>
            <span>&bull;</span>
            <span>{{ blog()?.publishedDate | date }}</span>
            <span>&bull;</span>
            <span>{{ blog()?.readingTime }}</span>
          </div>
        </div>

        <!-- Image -->
        <img [src]="blog()?.featuredImage" class="img-fluid rounded-4 mb-5 w-100" [alt]="blog()?.title" style="max-height: 400px; object-fit: cover;">

        <!-- Content -->
        <div class="blog-content text-secondary lh-lg fs-5" [innerHTML]="blog()?.content">
        </div>
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
  `]
})
export class BlogDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  blog = signal<BlogDetail | undefined>(undefined);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug === 'parsing-and-decoding-jwts-safely') {
      this.blog.set({
        title: 'Parsing and Decoding JWTs Safely in Client Applications',
        slug: 'parsing-and-decoding-jwts-safely',
        description: 'Understanding JSON Web Tokens, why client-side decoding is safe, and how to read user payloads securely.',
        category: 'Security',
        featuredImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60',
        author: 'ToolixPro Team',
        publishedDate: '2026-07-15T00:00:00Z',
        readingTime: '4 min read',
        content: `
          <p>JSON Web Tokens (JWT) are an open standard that defines a compact and self-contained way for securely transmitting information between parties as a JSON object.</p>
          <p>When implementing user authentication workflows in frontend apps, developers frequently need to inspect the token's payload to extract expiration times, user profiles, or permissions list.</p>
          <h3 class="mt-4 text-body fw-bold">Why local client-side decoding is safe</h3>
          <p>Unlike backend validation which checks signatures using secrets, simply decoding a JWT does not require secret keys. JWTs are encoded with Base64URL, meaning anyone can read their contents. Performing decoding client-side ensures that sensitive credentials are never sent to external servers, protecting developer secrets.</p>
        `
      });
    } else {
      this.blog.set({
        title: 'How to Validate JSON Structures and Avoid Runtime Errors',
        slug: 'how-to-validate-json-structures',
        description: 'A deep-dive tutorial into JSON schema validation, common syntax issues, and client-side beautification techniques.',
        category: 'JSON Utilities',
        featuredImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60',
        author: 'ToolixPro Team',
        publishedDate: '2026-07-14T00:00:00Z',
        readingTime: '5 min read',
        content: `
          <p>JSON (JavaScript Object Notation) is the backbone of modern web APIs. However, ill-formatted JSON objects can crash processes and trigger fatal runtime exceptions.</p>
          <p>Validating JSON string schemas before execution protects systems from payload injection or parsing failures. Using standard parser try-catch blocks and visualization tools allows developers to debug API data instantly.</p>
        `
      });
    }
  }
}
