import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="toast-container position-fixed bottom-0 end-0 p-3" style="z-index: 1200;">
      @for (toast of toastService.toasts(); track toast.id) {
        <div class="toast show align-items-center border-0 mb-2 shadow-lg" 
             [class.bg-success-subtle]="toast.type === 'success'"
             [class.text-success-emphasis]="toast.type === 'success'"
             [class.bg-danger-subtle]="toast.type === 'danger'"
             [class.text-danger-emphasis]="toast.type === 'danger'"
             [class.bg-warning-subtle]="toast.type === 'warning'"
             [class.text-warning-emphasis]="toast.type === 'warning'"
             [class.bg-info-subtle]="toast.type === 'info'"
             [class.text-info-emphasis]="toast.type === 'info'"
             role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body d-flex align-items-center gap-2">
              @if (toast.type === 'success') {
                <i class="bi bi-check-circle-fill"></i>
              } @else if (toast.type === 'danger') {
                <i class="bi bi-exclamation-triangle-fill"></i>
              } @else if (toast.type === 'warning') {
                <i class="bi bi-exclamation-circle-fill"></i>
              } @else {
                <i class="bi bi-info-circle-fill"></i>
              }
              <span>{{ toast.message }}</span>
            </div>
            <button type="button" class="btn-close me-2 m-auto" 
                    (click)="toastService.remove(toast.id)" 
                    aria-label="Close"></button>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast {
      border-radius: 12px;
      backdrop-filter: blur(8px);
      animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      min-width: 250px;
    }
    @keyframes slideIn {
      from {
        transform: translateY(100%) scale(0.9);
        opacity: 0;
      }
      to {
        transform: translateY(0) scale(1);
        opacity: 1;
      }
    }
  `]
})
export class ToastComponent {
  toastService = inject(ToastService);
}
