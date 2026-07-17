import { Component, inject, signal, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../../core/theme/theme.service';
import { ToolRegistryService } from '../../../core/registry/tool-registry.service';
import { ToolConfig } from '../../models/tool-config.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <header class="glass-header d-flex align-items-center w-100 px-3 px-md-4">
      <div class="container-fluid d-flex align-items-center justify-content-between p-0">
        <!-- Logo -->
        <a routerLink="/" class="navbar-brand d-flex align-items-center gap-2">
          <div class="logo-icon d-flex align-items-center justify-content-center">
            <i class="bi bi-cpu-fill text-white fs-5"></i>
          </div>
          <span class="logo-text">Toolix<span class="text-accent">Pro</span></span>
        </a>

        <!-- Middle Search Bar -->
        <div #searchContainer class="search-bar-container position-relative d-none d-lg-block">
          <div class="input-group">
            <span class="input-group-text bg-transparent border-end-0">
              <i class="bi bi-search text-secondary"></i>
            </span>
            <input type="text" 
                   class="form-control border-start-0 ps-0" 
                   placeholder="Search tools instantly... (e.g. JSON)"
                   [(ngModel)]="searchQuery"
                   (ngModelChange)="onSearchChange($event)"
                   (focus)="showResults.set(true)">
          </div>
          
          <!-- Search Dropdown Results -->
          @if (showResults() && searchResults().length > 0) {
            <div class="search-results-dropdown shadow-lg border rounded-3 p-2">
              @for (tool of searchResults(); track tool.slug) {
                <a [routerLink]="['/', tool.slug]" 
                   (click)="clearSearch()"
                   class="search-result-item d-flex align-items-center gap-3 p-2 rounded-2 text-decoration-none">
                  <div class="tool-icon-mini d-flex align-items-center justify-content-center rounded-2">
                    <i [class]="'bi ' + tool.iconClass"></i>
                  </div>
                  <div>
                    <div class="tool-name-mini font-weight-bold">{{ tool.name }}</div>
                    <div class="tool-tagline-mini text-secondary">{{ tool.tagline }}</div>
                  </div>
                </a>
              }
            </div>
          }
        </div>

        <!-- Navigation Links & Actions -->
        <nav class="d-flex align-items-center gap-3">
          <ul class="nav-menu d-flex align-items-center gap-3 mb-0 list-unstyled d-none d-md-flex">
            <li><a routerLink="/blogs" routerLinkActive="active" class="nav-link">Blogs</a></li>
            <li><a routerLink="/about" routerLinkActive="active" class="nav-link">About</a></li>
            <li><a routerLink="/contact" routerLinkActive="active" class="nav-link">Contact</a></li>
          </ul>

          <div class="divider-y d-none d-md-block"></div>

          <!-- Theme Toggle -->
          <button class="btn-theme-toggle d-flex align-items-center justify-content-center" 
                  (click)="themeService.toggleTheme()"
                  [attr.aria-label]="themeService.theme() === 'light' ? 'Switch to dark theme' : 'Switch to light theme'">
            @if (themeService.theme() === 'light') {
              <i class="bi bi-moon-stars-fill"></i>
            } @else {
              <i class="bi bi-sun-fill text-warning"></i>
            }
          </button>

          <!-- Mobile Menu Button -->
          <button class="btn btn-outline-secondary d-md-none border-0 px-2" (click)="toggleMobileMenu()">
            <i class="bi bi-list fs-3"></i>
          </button>
        </nav>
      </div>

      <!-- Mobile Dropdown Navigation -->
      @if (mobileMenuOpen()) {
        <div class="mobile-menu shadow-lg border-bottom p-3">
          <!-- Mobile Search -->
          <div class="mb-3">
            <div class="input-group">
              <span class="input-group-text bg-transparent border-end-0">
                <i class="bi bi-search text-secondary"></i>
              </span>
              <input type="text" 
                     class="form-control border-start-0 ps-0" 
                     placeholder="Search tools..."
                     [(ngModel)]="searchQuery"
                     (ngModelChange)="onSearchChange($event)">
            </div>
            
            @if (searchResults().length > 0) {
              <div class="mobile-search-results mt-2 border rounded p-1 max-height-200 overflow-y-auto">
                @for (tool of searchResults(); track tool.slug) {
                  <a [routerLink]="['/', tool.slug]" 
                     (click)="clearSearch(); mobileMenuOpen.set(false)"
                     class="d-flex align-items-center gap-2 p-2 text-decoration-none text-body">
                    <i [class]="'bi ' + tool.iconClass + ' text-primary'"></i>
                    <span class="small font-weight-bold">{{ tool.name }}</span>
                  </a>
                }
              </div>
            }
          </div>
          
          <ul class="list-unstyled mb-0 d-flex flex-column gap-2">
            <li><a routerLink="/" (click)="mobileMenuOpen.set(false)" class="nav-link py-2 border-bottom">Home</a></li>
            <li><a routerLink="/blogs" (click)="mobileMenuOpen.set(false)" class="nav-link py-2 border-bottom">Blogs</a></li>
            <li><a routerLink="/about" (click)="mobileMenuOpen.set(false)" class="nav-link py-2 border-bottom">About</a></li>
            <li><a routerLink="/contact" (click)="mobileMenuOpen.set(false)" class="nav-link py-2">Contact</a></li>
          </ul>
        </div>
      }
    </header>
  `,
  styles: [`
    .navbar-brand {
      font-family: var(--font-title);
      font-weight: 700;
      font-size: 1.4rem;
      letter-spacing: -0.5px;
      color: var(--text-primary);
    }
    .logo-icon {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      width: 32px;
      height: 32px;
      border-radius: 8px;
    }
    .text-accent {
      color: var(--accent-color);
    }
    .search-bar-container {
      width: 360px;
    }
    .form-control {
      background: var(--bg-primary);
      border-color: var(--border-color);
      color: var(--text-primary);
      border-radius: 10px;
      font-size: 0.9rem;
      padding: 0.5rem 0.75rem;
      transition: all 0.2s ease;
      
      &:focus {
        background: var(--bg-secondary);
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
    }
    .input-group-text {
      border-color: var(--border-color);
      border-radius: 10px;
    }
    .search-results-dropdown {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 8px;
      background: var(--bg-secondary);
      border-color: var(--border-color) !important;
      z-index: 1010;
      max-height: 380px;
      overflow-y: auto;
    }
    .search-result-item {
      color: var(--text-primary);
      transition: background 0.2s ease;
      
      &:hover {
        background: var(--bg-primary);
      }
    }
    .tool-icon-mini {
      background: var(--code-bg);
      color: var(--accent-color);
      width: 40px;
      height: 40px;
      border-radius: 8px;
      font-size: 1.2rem;
    }
    .tool-name-mini {
      font-size: 0.85rem;
      font-weight: 600;
    }
    .tool-tagline-mini {
      font-size: 0.75rem;
    }
    .nav-link {
      color: var(--text-secondary);
      font-weight: 500;
      font-size: 0.95rem;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      transition: all 0.2s ease;
      
      &:hover, &.active {
        color: var(--accent-color);
        background: rgba(99, 102, 241, 0.05);
      }
    }
    .divider-y {
      width: 1px;
      height: 24px;
      background: var(--border-color);
    }
    .btn-theme-toggle {
      border: 1px solid var(--border-color);
      background: var(--bg-secondary);
      color: var(--text-primary);
      width: 40px;
      height: 40px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.2s ease;
      font-size: 1.1rem;
      
      &:hover {
        background: var(--bg-primary);
        border-color: var(--accent-color);
      }
    }
    .mobile-menu {
      position: absolute;
      top: var(--header-height);
      left: 0;
      right: 0;
      background: var(--bg-secondary);
      border-color: var(--border-color) !important;
      z-index: 999;
      animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .max-height-200 {
      max-height: 200px;
    }
    @keyframes slideDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class HeaderComponent {
  themeService = inject(ThemeService);
  private toolRegistryService = inject(ToolRegistryService);

  searchQuery = '';
  searchResults = signal<ToolConfig[]>([]);
  showResults = signal<boolean>(false);
  mobileMenuOpen = signal<boolean>(false);

  @ViewChild('searchContainer') searchContainer!: ElementRef;

  onSearchChange(query: string) {
    this.searchResults.set(this.toolRegistryService.searchTools(query));
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults.set([]);
    this.showResults.set(false);
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (this.searchContainer && !this.searchContainer.nativeElement.contains(event.target)) {
      this.showResults.set(false);
    }
  }
}
