import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3">
      <div class="container-xl" style="max-width: 800px;">
        <h1 class="display-5 font-weight-black mb-4">About ToolixPro</h1>
        <p class="lead text-secondary mb-4">
          ToolixPro is an open-source, high-performance toolkit designed specifically for developers, engineering managers, and security auditors.
        </p>
        
        <div class="my-5">
          <h2 class="h4 fw-bold mb-3">Our Core Philosophies</h2>
          <div class="row g-4">
            <div class="col-md-6">
              <div class="premium-card p-3 h-100">
                <h5 class="fw-bold mb-2"><i class="bi bi-shield-fill-check text-success me-2"></i>Absolute Privacy</h5>
                <p class="text-secondary small m-0">We never transmit, store, or view your tokens, keys, or formatting code. All execution completes in your browser memory.</p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="premium-card p-3 h-100">
                <h5 class="fw-bold mb-2"><i class="bi bi-lightning-fill text-warning me-2"></i>Lightning Speed</h5>
                <p class="text-secondary small m-0">No API calls or latency. Direct, reactive browser computation with modern Angular change detection.</p>
              </div>
            </div>
          </div>
        </div>

        <h2 class="h4 fw-bold mb-3">The Technology Stack</h2>
        <p class="text-secondary mb-4">
          ToolixPro is engineered using Angular 21, standalone architecture, Signals-based change detection, and Server-Side Rendering (SSR) to output fully hydrated, SEO-optimized markup. For styling, we utilize Bootstrap 5 customized with fine-tuned CSS variables for automatic light and dark themes.
        </p>
      </div>
    </section>
    <app-footer></app-footer>
  `,
  styles: [`
    h1 {
      font-family: var(--font-title);
    }
  `]
})
export class AboutComponent {}
