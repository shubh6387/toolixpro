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

              <!-- SEO Rich Content Section for JSON Formatter -->
              @if (activeTool()?.slug === 'json-formatter') {
                <div class="tool-seo-content mb-5">
                  <!-- H2: About JSON Formatter & Validator -->
                  <div class="premium-card p-4 mb-4">
                    <h2 class="h4 font-weight-bold mb-3">
                      <i class="bi bi-info-circle-fill text-primary me-2"></i>About JSON Formatter & Validator
                    </h2>
                    <p class="text-secondary lh-lg mb-3 fs-6">
                      The ToolixPro <strong>JSON Formatter & Validator</strong> is a free, 100% browser-based online developer utility built to format, clean, validate, pretty print, and minify JSON (JavaScript Object Notation) data instantly. Whether you are debugging backend REST API payloads, inspecting GraphQL query responses, or editing configuration files like <code>package.json</code> and <code>tsconfig.json</code>, raw JSON is often minified into a single dense line without indentation or line breaks.
                    </p>
                    <p class="text-secondary lh-lg mb-0 fs-6">
                      Our tool converts unformatted JSON text into a clean, human-readable structure with standard 2-space indentation. In addition to beautification, the integrated <strong>JSON Validator</strong> checks your payload against the RFC 8259 specification to detect syntax errors in real-time, providing line-level error location details so you can fix issues immediately. Because all computations execute locally inside your web browser via client-side JavaScript, confidential API payloads, passwords, customer records, and internal system logs remain strictly private.
                    </p>
                  </div>

                  <!-- H2: How to Format JSON Online -->
                  <div class="premium-card p-4 mb-4">
                    <h2 class="h4 font-weight-bold mb-3">
                      <i class="bi bi-card-checklist text-info me-2"></i>How to Format JSON Online
                    </h2>
                    <ol class="list-group list-group-numbered list-group-flush bg-transparent">
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong>Paste or Upload:</strong> Copy your raw JSON code and paste it into the code editor input box, or click <strong>Upload</strong> to load a local <code>.json</code> or <code>.txt</code> file directly from your device.
                      </li>
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong>Click Beautify JSON:</strong> Click the <strong>Beautify JSON</strong> button to automatically clean, indent, and format your JSON payload into a structured, readable layout.
                      </li>
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong>Check Validation Status:</strong> If your JSON contains syntax errors (such as missing double quotes or trailing commas), the validation status banner will pinpoint the exact line and position of the issue.
                      </li>
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong>Copy or Download:</strong> Click <strong>Copy</strong> to copy the formatted output to your clipboard, or click <strong>Download</strong> to save the formatted <code>.json</code> file to your computer. You can also click <strong>Minify JSON</strong> to remove all whitespace for production API calls.
                      </li>
                    </ol>
                  </div>

                  <!-- H2: JSON Validator Online -->
                  <div class="premium-card p-4 mb-4">
                    <h2 class="h4 font-weight-bold mb-3">
                      <i class="bi bi-check-square-fill text-success me-2"></i>JSON Validator Online
                    </h2>
                    <p class="text-secondary lh-lg mb-3 fs-6">
                      A <strong>JSON Validator</strong> verifies that your JSON payload strictly adheres to standard JSON syntax specifications. Standard JavaScript engines throw strict runtime exceptions when <code>JSON.parse()</code> encounters malformed code.
                    </p>
                    <p class="text-secondary lh-lg mb-0 fs-6">
                      Our online validator inspects every bracket, brace, quote, colon, and comma in real-time. If an issue is found, the validator highlights the exact error description and position (for example, <em>Unexpected token ' in JSON at position 14</em> or <em>Trailing comma in object at line 6</em>). You can easily <a routerLink="/json-formatter" class="text-primary font-weight-semibold">validate JSON online</a> anytime with zero setup.
                    </p>
                  </div>

                  <!-- H2: JSON Beautifier -->
                  <div class="premium-card p-4 mb-4">
                    <h2 class="h4 font-weight-bold mb-3">
                      <i class="bi bi-code-square text-primary me-2"></i>JSON Beautifier
                    </h2>
                    <p class="text-secondary lh-lg mb-0 fs-6">
                      A <strong>JSON Beautifier</strong> (also known as a <strong>JSON Pretty Printer</strong>) adds structured line breaks, spacing, and vertical indentation to nested JSON objects and arrays. When reading large API responses or complex logs, beautified JSON makes key-value relationships immediately apparent, reducing visual fatigue and helping software engineers pinpoint specific data fields instantly.
                    </p>
                  </div>

                  <!-- H2: JSON Minifier -->
                  <div class="premium-card p-4 mb-4">
                    <h2 class="h4 font-weight-bold mb-3">
                      <i class="bi bi-file-earmark-zip-fill text-warning me-2"></i>JSON Minifier
                    </h2>
                    <p class="text-secondary lh-lg mb-0 fs-6">
                      While beautified JSON is ideal for human reading, it includes unnecessary spaces, tabs, and newlines that increase total file size. A <strong>JSON Minifier</strong> strips away all non-essential whitespace while preserving exact data integrity. Minifying JSON payloads can reduce bandwidth usage by up to 30%, speeding up HTTP response delivery across REST APIs, microservices, and mobile web applications.
                    </p>
                  </div>

                  <!-- H2: Common JSON Errors -->
                  <div class="premium-card p-4 mb-4">
                    <h2 class="h4 font-weight-bold mb-3">
                      <i class="bi bi-exclamation-triangle-fill text-danger me-2"></i>Common JSON Errors
                    </h2>
                    <p class="text-secondary lh-lg mb-3 fs-6">
                      When working with JSON data, developers frequently encounter syntax errors that cause validation failures:
                    </p>
                    <ul class="list-group list-group-flush bg-transparent">
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong class="text-body">Single Quotes instead of Double Quotes:</strong> JSON strictly requires double quotes for keys and string values (e.g., <code>&#123;"name": "Alice"&#125;</code> is valid, but <code>&#123;'name': 'Alice'&#125;</code> is invalid).
                      </li>
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong class="text-body">Unquoted Property Keys:</strong> All object property names must be enclosed in double quotes (e.g., <code>&#123;id: 1&#125;</code> is invalid; <code>&#123;"id": 1&#125;</code> is valid).
                      </li>
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong class="text-body">Trailing Commas:</strong> Leaving a comma after the last key-value pair in an object or array (e.g., <code>&#123;"a": 1, "b": 2,&#125;</code>) violates RFC 8259 standards.
                      </li>
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong class="text-body">Unescaped Special Characters:</strong> Double quotes, backslashes, and control characters inside string literals must be properly escaped (e.g., <code>\"</code>).
                      </li>
                      <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                        <strong class="text-body">Unmatched Brackets or Braces:</strong> Missing a closing <code>&#125;</code> or <code>]</code> breaks the entire parser hierarchy.
                      </li>
                    </ul>
                  </div>

                  <!-- H2: JSON Formatter Example -->
                  <div class="premium-card p-4 mb-4">
                    <h2 class="h4 font-weight-bold mb-3">
                      <i class="bi bi-journal-code text-accent me-2"></i>JSON Formatter Example
                    </h2>
                    <p class="text-secondary lh-lg mb-3 fs-6">
                      Compare raw unformatted JSON with its formatted version to see how beautification improves legibility:
                    </p>
                    
                    <div class="mb-3">
                      <span class="badge bg-secondary mb-2">Unformatted Input:</span>
                      <pre class="p-3 rounded-3 bg-body-tertiary border text-body font-monospace small mb-0 overflow-x-auto"><code>&#123;"name":"John","age":30,"skills":["JavaScript","Angular","Node.js"]&#125;</code></pre>
                    </div>

                    <div class="mb-3">
                      <span class="badge bg-success mb-2">Formatted Output:</span>
                      <pre class="p-3 rounded-3 bg-body-tertiary border text-body font-monospace small mb-0 overflow-x-auto"><code>&#123;
  "name": "John",
  "age": 30,
  "skills": [
    "JavaScript",
    "Angular",
    "Node.js"
  ]
&#125;</code></pre>
                    </div>
                    
                    <p class="text-secondary lh-lg mb-0 fs-6">
                      <strong>Why formatted JSON is easier to read:</strong> Unformatted JSON merges all data fields into a dense single-line string. The formatted version introduces vertical structure, 2-space indentation, and distinct bracket alignment, making it significantly easier for software engineers to audit nested arrays, identify data types, and debug complex API responses.
                    </p>
                  </div>
                </div>
              } @else if (activeTool()?.longDescription) {
                <div class="tool-seo-content mb-5">
                  <div class="premium-card p-4 mb-4">
                    <h2 class="h4 font-weight-bold mb-3">
                      <i class="bi bi-info-circle-fill text-primary me-2"></i>About {{ activeTool()?.name }}
                    </h2>
                    <p class="text-secondary lh-lg mb-0 fs-6">
                      {{ activeTool()?.longDescription }}
                    </p>
                  </div>

                  @if (activeTool()?.keyFeatures && activeTool()!.keyFeatures!.length > 0) {
                    <div class="premium-card p-4 mb-4">
                      <h3 class="h5 font-weight-bold mb-3">
                        <i class="bi bi-star-fill text-warning me-2"></i>Key Features & Capabilities
                      </h3>
                      <div class="row g-3">
                        @for (feature of activeTool()?.keyFeatures; track feature) {
                          <div class="col-md-6">
                            <div class="d-flex align-items-start gap-2">
                              <i class="bi bi-check-circle-fill text-success fs-5 flex-shrink-0 mt-1"></i>
                              <span class="text-secondary">{{ feature }}</span>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  }

                  @if (activeTool()?.howToUse && activeTool()!.howToUse!.length > 0) {
                    <div class="premium-card p-4 mb-4">
                      <h3 class="h5 font-weight-bold mb-3">
                        <i class="bi bi-card-checklist text-info me-2"></i>How to Use {{ activeTool()?.name }}
                      </h3>
                      <ol class="list-group list-group-numbered list-group-flush bg-transparent">
                        @for (step of activeTool()?.howToUse; track step) {
                          <li class="list-group-item bg-transparent text-secondary border-0 px-0 py-2">
                            {{ step }}
                          </li>
                        }
                      </ol>
                    </div>
                  }

                  @if (activeTool()?.useCases && activeTool()!.useCases!.length > 0) {
                    <div class="premium-card p-4 mb-4">
                      <h3 class="h5 font-weight-bold mb-3">
                        <i class="bi bi-lightbulb-fill text-accent me-2"></i>Common Developer Scenarios & Use Cases
                      </h3>
                      <ul class="list-unstyled mb-0 row g-2">
                        @for (useCase of activeTool()?.useCases; track useCase) {
                          <li class="col-md-6 text-secondary d-flex align-items-center gap-2">
                            <i class="bi bi-arrow-right-short text-primary fs-4"></i>
                            <span>{{ useCase }}</span>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                </div>
              }

              <!-- Tool FAQs Section -->
              @if (activeTool()?.faqs && activeTool()!.faqs!.length > 0) {
                <div class="tool-faqs-section mb-5">
                  <h2 class="h4 mb-4 font-weight-bold">Frequently Asked Questions</h2>
                  <div class="accordion border-0" id="faqAccordion">
                    @for (faq of activeTool()?.faqs; track faq.question; let idx = $index) {
                      <div class="accordion-item mb-3 border rounded-3 overflow-hidden bg-transparent">
                        <h3 class="accordion-header" [id]="'heading' + idx">
                          <button class="accordion-button fw-semibold text-body bg-transparent shadow-none" 
                                  [class.collapsed]="activeFaqIndex() !== idx"
                                  type="button" 
                                  (click)="toggleFaq(idx)">
                            {{ faq.question }}
                          </button>
                        </h3>
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

              <!-- H2: Related Developer Tools -->
              @if (activeTool()?.slug === 'json-formatter') {
                <div class="premium-card p-4 mb-5">
                  <h2 class="h4 font-weight-bold mb-3">
                    <i class="bi bi-tools text-primary me-2"></i>Related Developer Tools
                  </h2>
                  <p class="text-secondary mb-4 fs-6">
                    Explore other free, 100% client-side developer utilities to optimize your daily programming workflow:
                  </p>
                  <div class="row g-3">
                    <div class="col-md-6">
                      <a routerLink="/jwt-decoder" class="p-3 border rounded-3 d-flex align-items-center gap-3 text-decoration-none text-body h-100 hover-card">
                        <i class="bi bi-shield-lock-fill fs-3 text-primary"></i>
                        <div>
                          <strong class="d-block text-body">JWT Decoder</strong>
                          <span class="small text-secondary">Inspect claims &amp; <span class="text-primary text-decoration-underline">decode JWT</span> tokens</span>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-6">
                      <a routerLink="/base64" class="p-3 border rounded-3 d-flex align-items-center gap-3 text-decoration-none text-body h-100 hover-card">
                        <i class="bi bi-code-slash fs-3 text-info"></i>
                        <div>
                          <strong class="d-block text-body">Base64 Encoder / Decoder</strong>
                          <span class="small text-secondary">Encode strings &amp; <span class="text-primary text-decoration-underline">decode Base64</span> data</span>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-6">
                      <a routerLink="/uuid-generator" class="p-3 border rounded-3 d-flex align-items-center gap-3 text-decoration-none text-body h-100 hover-card">
                        <i class="bi bi-hash fs-3 text-success"></i>
                        <div>
                          <strong class="d-block text-body">UUID Generator</strong>
                          <span class="small text-secondary">Instantly <span class="text-primary text-decoration-underline">generate UUID</span> v4 keys</span>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-6">
                      <a routerLink="/hash-generator" class="p-3 border rounded-3 d-flex align-items-center gap-3 text-decoration-none text-body h-100 hover-card">
                        <i class="bi bi-key-fill fs-3 text-warning"></i>
                        <div>
                          <strong class="d-block text-body">Hash Generator</strong>
                          <span class="small text-secondary">Compute MD5 &amp; <span class="text-primary text-decoration-underline">generate hashes</span></span>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-6">
                      <a routerLink="/password-generator" class="p-3 border rounded-3 d-flex align-items-center gap-3 text-decoration-none text-body h-100 hover-card">
                        <i class="bi bi-lock-fill fs-3 text-danger"></i>
                        <div>
                          <strong class="d-block text-body">Password Generator</strong>
                          <span class="small text-secondary">Create secure <span class="text-primary text-decoration-underline">generate passwords</span></span>
                        </div>
                      </a>
                    </div>
                    <div class="col-md-6">
                      <a routerLink="/regex-tester" class="p-3 border rounded-3 d-flex align-items-center gap-3 text-decoration-none text-body h-100 hover-card">
                        <i class="bi bi-regex fs-3 text-accent"></i>
                        <div>
                          <strong class="d-block text-body">Regex Tester</strong>
                          <span class="small text-secondary">Build &amp; <span class="text-primary text-decoration-underline">test regular expressions</span></span>
                        </div>
                      </a>
                    </div>
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
