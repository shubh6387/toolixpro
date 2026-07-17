import { Component, Input, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-copy-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1"
            [disabled]="!text"
            (click)="copyToClipboard()"
            aria-label="Copy to clipboard">
      @if (copied()) {
        <i class="bi bi-check-lg text-success"></i>
        <span>Copied!</span>
      } @else {
        <i class="bi bi-clipboard"></i>
        <span>Copy</span>
      }
    </button>
  `,
  styles: [`
    button {
      border-radius: 8px;
      padding: 0.375rem 0.75rem;
      transition: all 0.2s ease;
      font-size: 0.85rem;
    }
  `]
})
export class CopyButtonComponent {
  @Input() text: string = '';
  private toastService = inject(ToastService);
  copied = signal<boolean>(false);

  copyToClipboard() {
    if (!this.text) return;
    
    navigator.clipboard.writeText(this.text).then(() => {
      this.copied.set(true);
      this.toastService.show('Copied to clipboard!', 'success', 2000);
      setTimeout(() => this.copied.set(false), 2000);
    }).catch(() => {
      this.toastService.show('Failed to copy to clipboard', 'danger');
    });
  }
}
