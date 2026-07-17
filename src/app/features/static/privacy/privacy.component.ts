import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3">
      <div class="container-xl" style="max-width: 800px;">
        <h1 class="display-5 font-weight-black mb-4">Privacy Policy</h1>
        <p class="text-secondary mb-4">Last Updated: July 15, 2026</p>
        
        <p class="lead text-secondary mb-4">
          At ToolixPro, we prioritize user privacy. Unlike other developer utility sites that parse your JSON data, certificates, or tokens on their backend databases, ToolixPro runs all calculations entirely inside your browser.
        </p>

        <h2 class="h4 fw-bold mt-5 mb-3">1. Data Transmission</h2>
        <p class="text-secondary mb-4">
          We do not transmit your inputs, keys, payloads, or text content to our servers. Any actions (such as JSON validation, JWT decoding, Base64 conversion, or password generation) occur inside your computer's browser session. Your data is secure and confidential.
        </p>

        <h2 class="h4 fw-bold mt-5 mb-3">2. Cookies & Telemetry</h2>
        <p class="text-secondary mb-4">
          We use local storage only to remember your layout selections, such as theme configurations (Light or Dark mode). We do not load invasive tracking cookies or track individual identities.
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
export class PrivacyComponent {}
