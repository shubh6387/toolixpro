import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../shared/components/header/header.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent, FooterComponent],
  template: `
    <app-header></app-header>
    <section class="py-5 px-3 text-center d-flex align-items-center justify-content-center" style="min-height: 60vh;">
      <div class="container-xl">
        <h1 class="display-1 font-weight-black mb-3 gradient-text">404</h1>
        <h2 class="h3 fw-bold mb-3">Page Not Found</h2>
        <p class="text-secondary mb-5 mx-auto" style="max-width: 500px;">
          The requested developer utility or page does not exist. It might have been moved or renamed, or is currently under development.
        </p>
        <a routerLink="/" class="btn btn-primary px-4 py-3 rounded-pill">
          <i class="bi bi-house-door-fill me-2"></i>Back to Home
        </a>
      </div>
    </section>
    <app-footer></app-footer>
  `,
  styles: [`
    h1 {
      font-family: var(--font-title);
      font-size: 7rem;
      font-weight: 850;
      letter-spacing: -2px;
    }
    .gradient-text {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      border: none;
      font-weight: 600;
      transition: transform 0.2s ease;
      
      &:hover {
        transform: translateY(-2px);
        background: linear-gradient(135deg, #4f46e5, #4338ca);
      }
    }
  `]
})
export class NotFoundComponent {}
