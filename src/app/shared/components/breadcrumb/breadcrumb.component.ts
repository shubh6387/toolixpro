import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface BreadcrumbItem {
  label: string;
  url?: string;
}

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav aria-label="breadcrumb" class="mb-4">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a routerLink="/" class="text-decoration-none">
            <i class="bi bi-house-door-fill me-1"></i>Home
          </a>
        </li>
        @for (item of items; track item.label; let last = $last) {
          @if (last) {
            <li class="breadcrumb-item active" aria-current="page">{{ item.label }}</li>
          } @else {
            <li class="breadcrumb-item">
              @if (item.url) {
                <a [routerLink]="item.url" class="text-decoration-none">{{ item.label }}</a>
              } @else {
                <span>{{ item.label }}</span>
              }
            </li>
          }
        }
      </ol>
    </nav>
  `,
  styles: [`
    .breadcrumb {
      background: transparent;
      padding: 0;
      margin: 0;
      font-size: 0.9rem;
    }
    .breadcrumb-item {
      display: flex;
      align-items: center;
      color: var(--text-secondary);
      
      a {
        color: var(--accent-color);
        font-weight: 500;
        transition: color 0.2s ease;
        
        &:hover {
          color: var(--accent-hover);
        }
      }
    }
    .active {
      color: var(--text-primary);
      font-weight: 600;
    }
  `]
})
export class BreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
}
