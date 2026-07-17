import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, startWith } from 'rxjs/operators';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { BreadcrumbComponent, BreadcrumbItem } from '../../shared/components/breadcrumb/breadcrumb.component';
import { ToolRegistryService } from '../../core/registry/tool-registry.service';
import { ToolConfig } from '../../shared/models/tool-config.model';

@Component({
  selector: 'app-tool-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, HeaderComponent, FooterComponent, BreadcrumbComponent],
  template: `
    <app-header></app-header>
    <div class="tool-layout-wrapper py-5">
      <div class="container-xl">
        <div class="row g-4">
          <!-- Main Content (Left Column) -->
          <div class="col-lg-9">
            @if (activeTool()) {
              <!-- Breadcrumb -->
              <app-breadcrumb [items]="breadcrumbItems()"></app-breadcrumb>

              <!-- Header Info -->
              <div class="tool-header mb-4">
                <div class="d-flex align-items-center gap-3">
                  <div class="tool-logo-box d-flex align-items-center justify-content-center rounded-3">
                    <i [class]="'bi ' + activeTool()?.iconClass + ' fs-2 text-primary'"></i>
                  </div>
                  <div>
                    <h1 class="tool-title mb-1">{{ activeTool()?.name }}</h1>
                    <p class="tool-tagline text-secondary m-0">{{ activeTool()?.tagline }}</p>
                  </div>
                </div>
              </div>

              <!-- Real Tool Component (Workspace) -->
              <div class="tool-workspace-container p-4 premium-card mb-5">
                <router-outlet></router-outlet>
              </div>

              <!-- Tool FAQs Section -->
              @if (activeTool()?.faqs && activeTool()!.faqs!.length > 0) {
                <div class="tool-faqs-section mb-5">
                  <h3 class="mb-4 font-weight-bold">Frequently Asked Questions</h3>
                  <div class="accordion border-0" id="faqAccordion">
                    @for (faq of activeTool()?.faqs; track faq.question; let idx = $index) {
                      <div class="accordion-item mb-3 border rounded-3 overflow-hidden bg-transparent">
                        <h2 class="accordion-header" [id]="'heading' + idx">
                          <button class="accordion-button fw-semibold text-body bg-transparent shadow-none" 
                                  [class.collapsed]="activeFaqIndex() !== idx"
                                  type="button" 
                                  (click)="toggleFaq(idx)">
                            {{ faq.question }}
                          </button>
                        </h2>
                        <div [id]="'collapse' + idx" 
                             class="accordion-collapse collapse" 
                             [class.show]="activeFaqIndex() === idx">
                          <div class="accordion-body text-secondary lh-lg bg-body-tertiary">
                            {{ faq.answer }}
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              }
            } @else {
              <router-outlet></router-outlet>
            }
          </div>

          <!-- Sidebar (Right Column) -->
          <div class="col-lg-3">
            <!-- Sidebar Card: Popular Tools -->
            <div class="sidebar-card premium-card p-3 mb-4">
              <h5 class="sidebar-title mb-3"><i class="bi bi-fire text-danger me-2"></i>Popular Tools</h5>
              <div class="d-flex flex-column gap-2">
                @for (tool of registryService.getPopularTools()(); track tool.slug) {
                  <a [routerLink]="['/', tool.slug]" 
                     [class.active]="activeTool()?.slug === tool.slug"
                     class="sidebar-item d-flex align-items-center gap-2 p-2 rounded text-decoration-none">
                    <i [class]="'bi ' + tool.iconClass"></i>
                    <span class="small font-weight-bold">{{ tool.name }}</span>
                  </a>
                }
              </div>
            </div>

            <!-- Sidebar Card: Categories -->
            <div class="sidebar-card premium-card p-3 mb-4">
              <h5 class="sidebar-title mb-3"><i class="bi bi-grid me-2"></i>Categories</h5>
              <div class="d-flex flex-column gap-2">
                @for (cat of registryService.getCategories()(); track cat.name) {
                  <div class="category-item-sidebar p-2 rounded">
                    <i [class]="'bi ' + cat.iconClass + ' me-2 text-primary'"></i>
                    <span class="small font-weight-semibold">{{ cat.name }}</span>
                  </div>
                }
              </div>
            </div>
            
            <!-- Sidebar Card: Privacy Warning -->
            <div class="sidebar-card border-0 bg-info-subtle p-3 rounded-3">
              <h6 class="text-info-emphasis fw-bold"><i class="bi bi-shield-check me-2"></i>100% Client-Side</h6>
              <p class="text-info-emphasis small m-0 lh-base">
                Your data is secure. Processing occurs entirely in your browser using local Javascript. No data is sent to our servers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <app-footer></app-footer>
  `,
  styles: [`
    .tool-layout-wrapper {
      background: var(--bg-primary);
      min-height: calc(100vh - var(--header-height));
    }
    .tool-logo-box {
      background: var(--code-bg);
      width: 60px;
      height: 60px;
      flex-shrink: 0;
      border: 1px solid var(--border-color);
    }
    .tool-title {
      font-family: var(--font-title);
      font-weight: 800;
      font-size: 1.8rem;
      letter-spacing: -0.5px;
    }
    .tool-tagline {
      font-size: 1rem;
    }
    .tool-workspace-container {
      background: var(--bg-secondary);
      border-color: var(--border-color) !important;
      position: relative;
    }
    .sidebar-title {
      font-family: var(--font-title);
      font-size: 0.95rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-primary);
    }
    .sidebar-item {
      color: var(--text-secondary);
      transition: all 0.2s ease;
      font-size: 0.85rem;
      
      &:hover {
        background: var(--bg-primary);
        color: var(--accent-color);
      }
      
      &.active {
        background: rgba(99, 102, 241, 0.08);
        color: var(--accent-color);
      }
    }
    .category-item-sidebar {
      color: var(--text-primary);
      background: var(--bg-primary);
      font-size: 0.85rem;
    }
    .accordion-item {
      border-color: var(--border-color) !important;
    }
    .accordion-button {
      color: var(--text-primary);
      font-family: var(--font-title);
      font-size: 1.05rem;
      
      &:not(.collapsed) {
        background-color: var(--code-bg);
        color: var(--accent-color);
        box-shadow: none;
      }
    }
  `]
})
export class ToolLayoutComponent implements OnInit {
  registryService = inject(ToolRegistryService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  activeTool = signal<ToolConfig | undefined>(undefined);
  breadcrumbItems = signal<BreadcrumbItem[]>([]);
  activeFaqIndex = signal<number | null>(null);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      startWith(null)
    ).subscribe(() => {
      this.updateActiveTool();
      this.activeFaqIndex.set(null); // Reset FAQ state on route transition
    });
  }

  toggleFaq(index: number) {
    this.activeFaqIndex.update(current => current === index ? null : index);
  }

  private updateActiveTool() {
    let currentRoute = this.route.root;
    let toolSlug: string | undefined;

    while (currentRoute.children.length > 0) {
      currentRoute = currentRoute.children[0];
      if (currentRoute.snapshot.data['toolSlug']) {
        toolSlug = currentRoute.snapshot.data['toolSlug'];
      }
    }

    if (toolSlug) {
      const tool = this.registryService.getToolBySlug(toolSlug);
      this.activeTool.set(tool);

      if (tool) {
        this.breadcrumbItems.set([
          { label: tool.category },
          { label: tool.name }
        ]);
      }
    } else {
      this.activeTool.set(undefined);
    }
  }
}
