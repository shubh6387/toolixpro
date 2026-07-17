import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToolRegistryService } from '../../core/registry/tool-registry.service';
import { ToolConfig } from '../../shared/models/tool-config.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    
    <!-- Hero Section -->
    <section class="hero-section text-center py-5 px-3">
      <div class="glow-container">
        <div class="glow-orb glow-orb-1"></div>
        <div class="glow-orb glow-orb-2"></div>
      </div>
      <div class="container-xl position-relative">
        <span class="badge bg-indigo-subtle text-indigo-emphasis rounded-pill px-3 py-2 mb-3">
          <i class="bi bi-stars me-1"></i>100% Free & Browser-Based
        </span>
        <h1 class="hero-title display-4 font-weight-black mb-3">
          100+ Free Online <br class="d-none d-md-inline">
          <span class="gradient-text">Developer Utilities</span>
        </h1>
        <p class="hero-subtitle text-secondary mx-auto mb-5">
          Fast, secure, client-side tools for formatting JSON, decoding JWT tokens, generating passwords, testing regular expressions, and encoding Base64.
        </p>

        <!-- Large Search Bar -->
        <div class="search-bar-hero mx-auto position-relative mb-4">
          <div class="input-group input-group-lg shadow-sm border rounded-pill overflow-hidden">
            <span class="input-group-text bg-transparent border-0 ps-4">
              <i class="bi bi-search text-secondary"></i>
            </span>
            <input type="text" 
                   class="form-control border-0 ps-2 py-3" 
                   placeholder="Search tools... (e.g. JWT Decoder, Base64)"
                   [(ngModel)]="searchQuery"
                   (ngModelChange)="onSearchChange($event)">
          </div>

          <!-- Dropdown Results -->
          @if (searchResults().length > 0) {
            <div class="hero-search-results border shadow-lg rounded-4 p-3 text-start mt-2">
              @for (tool of searchResults(); track tool.slug) {
                <a [routerLink]="['/', tool.slug]" 
                   class="search-result-hero-item d-flex align-items-center gap-3 p-2 rounded-3 text-decoration-none">
                  <div class="tool-icon-circle d-flex align-items-center justify-content-center rounded-circle">
                    <i [class]="'bi ' + tool.iconClass + ' text-primary fs-5'"></i>
                  </div>
                  <div>
                    <div class="fw-bold text-body">{{ tool.name }}</div>
                    <div class="small text-secondary">{{ tool.tagline }}</div>
                  </div>
                </a>
              }
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Popular Tools -->
    <section class="py-5 px-3 bg-light-subtle">
      <div class="container-xl">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 class="section-title h3 mb-1">Popular Utilities</h2>
            <p class="text-secondary small m-0">The most widely used developer tools by our community.</p>
          </div>
        </div>
        <div class="row g-4">
          @for (tool of registryService.getPopularTools()(); track tool.slug) {
            <div class="col-lg-4 col-md-6">
              <div class="card premium-card h-100 p-4" [routerLink]="['/', tool.slug]" style="cursor: pointer;">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <div class="tool-icon-box d-flex align-items-center justify-content-center rounded-3">
                    <i [class]="'bi ' + tool.iconClass + ' fs-3 text-primary'"></i>
                  </div>
                  <span class="badge rounded-pill text-indigo-emphasis bg-indigo-subtle small">Browser Only</span>
                </div>
                <h4 class="h5 fw-bold mb-2">{{ tool.name }}</h4>
                <p class="text-secondary small mb-0 lh-base">{{ tool.tagline }}</p>
              </div>
            </div>
          }
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-5 px-3">
      <div class="container-xl">
        <div class="text-center mb-5">
          <h2 class="section-title h3 mb-2">Explore by Category</h2>
          <p class="text-secondary">Quick access to tools categorized for your developer workflows.</p>
        </div>

        @for (cat of registryService.getCategories()(); track cat.name) {
          <div [id]="cat.name.replace(' ', '-')" class="category-block mb-5">
            <h3 class="h5 fw-bold border-bottom pb-3 mb-4 d-flex align-items-center gap-2">
              <i [class]="'bi ' + cat.iconClass + ' text-primary'"></i>
              {{ cat.name }}
            </h3>
            <div class="row g-4">
              @for (tool of registryService.getToolsByCategory(cat.name)(); track tool.slug) {
                <div class="col-lg-4 col-md-6">
                  <div class="card border rounded-3 p-3 h-100 d-flex flex-row align-items-start gap-3 hover-shadow"
                       [routerLink]="['/', tool.slug]" style="cursor: pointer;">
                    <div class="tool-icon-box-sm d-flex align-items-center justify-content-center rounded-3 flex-shrink-0">
                      <i [class]="'bi ' + tool.iconClass + ' fs-4 text-primary'"></i>
                    </div>
                    <div>
                      <h4 class="h6 fw-bold mb-1">{{ tool.name }}</h4>
                      <p class="text-secondary small m-0 lh-base">{{ tool.tagline }}</p>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>

    <!-- Features / Security -->
    <section class="py-5 px-3 bg-light-subtle">
      <div class="container-xl">
        <div class="row align-items-center g-5">
          <div class="col-md-6">
            <h2 class="display-6 font-weight-black mb-4">Built with developer privacy in mind</h2>
            <p class="text-secondary lh-lg mb-4">
              Developer tools should not be data harvesting fields. ToolixPro performs all formatting, decoding, generation, and validation computations directly inside your browser. No strings, keys, or passwords ever touch our backend servers.
            </p>
            <div class="d-flex flex-column gap-3">
              <div class="d-flex gap-3">
                <i class="bi bi-shield-lock-fill text-success fs-4"></i>
                <div>
                  <h5 class="fw-bold mb-1">100% Client-Side Processing</h5>
                  <p class="text-secondary small m-0">Zero server calls. Maximum security for API payloads and keys.</p>
                </div>
              </div>
              <div class="d-flex gap-3">
                <i class="bi bi-lightning-charge-fill text-warning fs-4"></i>
                <div>
                  <h5 class="fw-bold mb-1">Ultra-Fast Performance</h5>
                  <p class="text-secondary small m-0">Instant results powered by standard Web APIs and Signals change detection.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="premium-card p-4 bg-secondary-subtle border rounded-4 d-flex flex-column gap-3">
              <div class="d-flex align-items-center gap-3 border-bottom pb-3">
                <i class="bi bi-code-square fs-3 text-primary"></i>
                <span class="fw-bold">Fast JSON Beautifier Preview</span>
              </div>
              <pre class="m-0 text-secondary" style="font-family: var(--font-mono); font-size: 0.8rem;">
{{ '{' }}
  "tool": "JSON Formatter",
  "secure": true,
  "execution": "0.02ms",
  "features": [
    "Format",
    "Minify",
    "Validate"
  ]
{{ '}' }}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-5 px-3">
      <div class="container-xl">
        <div class="text-center mb-5">
          <h2 class="section-title h3 mb-2">Frequently Asked Questions</h2>
          <p class="text-secondary">Answers to the most common inquiries about the ToolixPro platform.</p>
        </div>
        <div class="row g-4 justify-content-center">
          <div class="col-lg-8">
            <div class="accordion border-0" id="siteFaqAccordion">
              <div class="accordion-item mb-3 border rounded-3 overflow-hidden bg-transparent">
                <h2 class="accordion-header" id="siteFaqHeadingOne">
                  <button class="accordion-button fw-semibold text-body bg-transparent shadow-none" 
                          [class.collapsed]="activeFaqIndex() !== 0"
                          type="button" (click)="toggleFaq(0)">
                    Are these tools free to use?
                  </button>
                </h2>
                <div id="siteFaqCollapseOne" class="accordion-collapse collapse" [class.show]="activeFaqIndex() === 0">
                  <div class="accordion-body text-secondary lh-lg bg-body-tertiary">
                    Yes, ToolixPro is 100% free with no monthly subscription charges or account registrations required.
                  </div>
                </div>
              </div>
              <div class="accordion-item mb-3 border rounded-3 overflow-hidden bg-transparent">
                <h2 class="accordion-header" id="siteFaqHeadingTwo">
                  <button class="accordion-button fw-semibold text-body bg-transparent shadow-none" 
                          [class.collapsed]="activeFaqIndex() !== 1"
                          type="button" (click)="toggleFaq(1)">
                    Does ToolixPro log or store my queries?
                  </button>
                </h2>
                <div id="siteFaqCollapseTwo" class="accordion-collapse collapse" [class.show]="activeFaqIndex() === 1">
                  <div class="accordion-body text-secondary lh-lg bg-body-tertiary">
                    Absolutely not. All computations (such as JSON parsing, JWT decoding, Base64 conversion) run entirely locally in your browser. We have zero interest in viewing your data.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <app-footer></app-footer>
  `,
  styles: [`
    .hero-section {
      background: var(--bg-primary);
      position: relative;
    }
    .glow-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    .glow-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(100px);
      opacity: var(--glow-opacity);
    }
    .glow-orb-1 {
      top: -10%;
      left: 10%;
      width: 300px;
      height: 300px;
      background: #6366f1;
    }
    .glow-orb-2 {
      bottom: -10%;
      right: 10%;
      width: 400px;
      height: 400px;
      background: #4f46e5;
    }
    .bg-indigo-subtle {
      background-color: var(--badge-bg);
    }
    .text-indigo-emphasis {
      color: var(--badge-text);
    }
    .hero-title {
      font-family: var(--font-title);
      font-weight: 800;
      color: var(--text-primary);
      letter-spacing: -1.5px;
    }
    .gradient-text {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .hero-subtitle {
      max-width: 650px;
      font-size: 1.15rem;
      line-height: 1.6;
    }
    .search-bar-hero {
      max-width: 600px;
      z-index: 10;
    }
    .search-bar-hero .form-control {
      background: var(--bg-secondary);
      color: var(--text-primary);
      font-size: 1.05rem;
      border-radius: 50px;
      
      &:focus {
        background: var(--bg-secondary);
        box-shadow: 0 10px 25px -5px rgba(99, 102, 241, 0.15);
      }
    }
    .search-bar-hero .input-group-text {
      border: 1px solid var(--border-color);
      border-right: none;
      border-radius: 50px 0 0 50px;
    }
    .search-bar-hero .form-control {
      border: 1px solid var(--border-color);
      border-left: none;
      border-radius: 0 50px 50px 0;
    }
    .hero-search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: var(--bg-secondary);
      border-color: var(--border-color) !important;
      z-index: 1100;
      max-height: 350px;
      overflow-y: auto;
    }
    .search-result-hero-item {
      color: var(--text-primary);
      transition: background 0.2s ease;
      
      &:hover {
        background: var(--bg-primary);
      }
    }
    .tool-icon-circle {
      background: var(--code-bg);
      width: 44px;
      height: 44px;
      flex-shrink: 0;
    }
    .tool-icon-box {
      background: var(--code-bg);
      width: 52px;
      height: 52px;
      border: 1px solid var(--border-color);
    }
    .tool-icon-box-sm {
      background: var(--code-bg);
      width: 44px;
      height: 44px;
      border: 1px solid var(--border-color);
    }
    .hover-shadow {
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      background: var(--bg-secondary);
      border-color: var(--border-color) !important;
      
      &:hover {
        border-color: var(--accent-color) !important;
        box-shadow: 0 10px 20px -5px rgba(0, 0, 0, 0.05);
      }
    }
    .accordion-item {
      border-color: var(--border-color) !important;
    }
    .accordion-button {
      color: var(--text-primary);
      font-family: var(--font-title);
      
      &:not(.collapsed) {
        background-color: var(--code-bg);
        color: var(--accent-color);
      }
    }
  `]
})
export class HomeComponent {
  registryService = inject(ToolRegistryService);

  searchQuery = '';
  searchResults = signal<ToolConfig[]>([]);
  activeFaqIndex = signal<number | null>(null);

  onSearchChange(query: string) {
    this.searchResults.set(this.registryService.searchTools(query));
  }

  toggleFaq(index: number) {
    this.activeFaqIndex.update(current => current === index ? null : index);
  }
}
