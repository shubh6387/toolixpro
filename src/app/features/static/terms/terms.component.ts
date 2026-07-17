import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3">
      <div class="container-xl" style="max-width: 800px;">
        <h1 class="display-5 font-weight-black mb-4">Terms of Service</h1>
        <p class="text-secondary mb-4">Last Updated: July 15, 2026</p>
        
        <p class="lead text-secondary mb-4">
          By accessing and using ToolixPro, you agree to comply with and be bound by the following terms of use.
        </p>

        <h2 class="h4 fw-bold mt-5 mb-3">1. License and Scope of Use</h2>
        <p class="text-secondary mb-4">
          ToolixPro grants you a free, non-exclusive license to use our web developer utility tools for personal, educational, or commercial software engineering purposes. All processing occurs locally.
        </p>

        <h2 class="h4 fw-bold mt-5 mb-3">2. Disclaimer of Warranties</h2>
        <p class="text-secondary mb-4">
          The utilities are provided "as is" without warranty of any kind, either expressed or implied. We do not guarantee that the formatters, decoders, or converters are free from minor errors. Use at your own discretion.
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
export class TermsComponent {}
