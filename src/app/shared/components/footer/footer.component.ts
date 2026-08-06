import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolRegistryService } from '../../../core/registry/tool-registry.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="footer mt-auto py-5 border-top">
      <div class="container-xl">
        <div class="row g-4">
          <!-- Col 1: Brand -->
          <div class="col-lg-4 col-md-12">
            <div class="d-flex align-items-center gap-2 mb-3">
              <div class="logo-icon d-flex align-items-center justify-content-center">
                <i class="bi bi-cpu-fill text-white fs-5"></i>
              </div>
              <span class="logo-text font-weight-bold fs-5">Toolix<span class="text-accent">Pro</span></span>
            </div>
            <p class="text-secondary small mb-4">
              ToolixPro is a premium developer helper suite offering fast, local-first web utilities to optimize your daily coding workflows. 100% private, free, and secure.
            </p>
            <div class="d-flex gap-3">
              <a href="https://github.com/shubh6387" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="GitHub"><i class="bi bi-github"></i></a>
              <a href="https://www.linkedin.com/in/shubham-tiwari-317456202/" target="_blank" rel="noopener noreferrer" class="social-link" aria-label="LinkedIn"><i class="bi bi-linkedin"></i></a>
            </div>
          </div>

          <!-- Col 2: Categories -->
          <div class="col-lg-3 col-md-4 col-sm-6">
            <h6 class="footer-title text-uppercase mb-3">Categories</h6>
            <ul class="list-unstyled d-flex flex-column gap-2 small">
              @for (cat of registryService.getCategories()(); track cat.name) {
                <li><a [routerLink]="['/']" [fragment]="cat.name.replace(' ', '-')" class="footer-link">{{ cat.name }}</a></li>
              }
            </ul>
          </div>

          <!-- Col 3: Popular Tools -->
          <div class="col-lg-3 col-md-4 col-sm-6">
            <h6 class="footer-title text-uppercase mb-3">Popular Tools</h6>
            <ul class="list-unstyled d-flex flex-column gap-2 small">
              @for (tool of registryService.getPopularTools()(); track tool.slug) {
                <li><a [routerLink]="['/', tool.slug]" class="footer-link">{{ tool.name }}</a></li>
              }
            </ul>
          </div>

          <!-- Col 4: Resources -->
          <div class="col-lg-2 col-md-4 col-sm-6">
            <h6 class="footer-title text-uppercase mb-3">Resources</h6>
            <ul class="list-unstyled d-flex flex-column gap-2 small">
              <li><a routerLink="/about" class="footer-link">About Us</a></li>
              <li><a routerLink="/contact" class="footer-link">Contact</a></li>
              <li><a routerLink="/privacy-policy" class="footer-link">Privacy Policy</a></li>
              <li><a routerLink="/terms" class="footer-link">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <hr class="my-4 border-color">

        <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
          <span class="small text-secondary">&copy; {{ currentYear }} ToolixPro. All rights reserved.</span>
          <span class="small text-secondary d-flex align-items-center gap-1">
            Made with <i class="bi bi-heart-fill text-danger"></i> for Developers.
          </span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background: var(--bg-secondary);
      border-color: var(--border-color) !important;
    }
    .logo-icon {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      width: 28px;
      height: 28px;
      border-radius: 6px;
    }
    .text-accent {
      color: var(--accent-color);
    }
    .logo-text {
      font-family: var(--font-title);
      color: var(--text-primary);
    }
    .footer-title {
      font-family: var(--font-title);
      font-size: 0.85rem;
      font-weight: 700;
      color: var(--text-primary);
      letter-spacing: 0.5px;
    }
    .footer-link {
      color: var(--text-secondary);
      text-decoration: none;
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--accent-color);
      }
    }
    .social-link {
      color: var(--text-secondary);
      font-size: 1.25rem;
      transition: color 0.2s ease;
      
      &:hover {
        color: var(--accent-color);
      }
    }
    .border-color {
      color: var(--border-color);
      opacity: 0.8;
    }
  `]
})
export class FooterComponent {
  registryService = inject(ToolRegistryService);
  currentYear = new Date().getFullYear();
}
