import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { CopyButtonComponent } from '../../../../shared/components/copy-button/copy-button.component';

@Component({
  selector: 'app-url-encoder-decoder',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyButtonComponent],
  template: `
    <div class="row g-4">
      <!-- Input Panel -->
      <div class="col-lg-6">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="form-label small fw-semibold mb-0">Input Plain or Encoded URL Text:</label>
          <div class="d-flex gap-2">
            <button class="btn btn-link btn-sm p-0 text-decoration-none text-secondary" (click)="fileInput.click()">
              <i class="bi bi-upload me-1"></i>Upload File
            </button>
            <input type="file" #fileInput class="d-none" accept=".txt,.url,.html,.json" (change)="onFileUpload($event)">
          </div>
        </div>

        <textarea class="form-control mb-3" rows="12" 
                  [(ngModel)]="inputText" 
                  placeholder="Paste your link, query parameters, or string here..."></textarea>

        <div class="d-flex gap-2">
          <button class="btn btn-primary flex-fill rounded-pill py-2" (click)="encode()">
            <i class="bi bi-shield-check me-2"></i>Encode URL
          </button>
          <button class="btn btn-secondary flex-fill rounded-pill py-2" (click)="decode()">
            <i class="bi bi-shield-slash me-2"></i>Decode URL
          </button>
        </div>
      </div>

      <!-- Output Panel -->
      <div class="col-lg-6 border-start ps-lg-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="form-label small fw-semibold mb-0">Result Output:</label>
          @if (outputText()) {
            <div class="d-flex gap-3">
              <button class="btn btn-link btn-sm p-0 text-decoration-none text-secondary" (click)="downloadOutput()">
                <i class="bi bi-download me-1"></i>Download
              </button>
            </div>
          }
        </div>

        <textarea class="form-control mb-3" rows="12" readonly
                  [value]="outputText()" 
                  placeholder="Output results will appear here..."></textarea>

        <div class="d-flex gap-2">
          <app-copy-button class="flex-fill" [text]="outputText()"></app-copy-button>
          <button class="btn btn-outline-secondary px-4 rounded-pill" (click)="clearAll()">
            <i class="bi bi-trash3 me-2"></i>Clear
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    textarea {
      font-family: var(--font-mono, 'JetBrains Mono', monospace);
      font-size: 0.9rem;
    }
  `]
})
export class UrlEncoderDecoderComponent {
  private toastService = inject(ToastService);

  inputText = '';
  outputText = signal<string>('');

  encode() {
    if (!this.inputText) {
      this.toastService.show('Please enter text to encode', 'warning');
      return;
    }
    try {
      const result = encodeURIComponent(this.inputText);
      this.outputText.set(result);
      this.toastService.show('URL encoded successfully!', 'success');
    } catch (e) {
      this.toastService.show('Error encoding URL content', 'danger');
    }
  }

  decode() {
    if (!this.inputText) {
      this.toastService.show('Please enter text to decode', 'warning');
      return;
    }
    try {
      const result = decodeURIComponent(this.inputText);
      this.outputText.set(result);
      this.toastService.show('URL decoded successfully!', 'success');
    } catch (e) {
      this.toastService.show('Malformed URI component detected during decoding', 'danger');
    }
  }

  onFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.inputText = reader.result as string;
        this.toastService.show(`File ${file.name} loaded successfully!`, 'success');
      };
      reader.onerror = () => {
        this.toastService.show('Failed to read uploaded file', 'danger');
      };
      reader.readAsText(file);
    }
  }

  downloadOutput() {
    const output = this.outputText();
    if (!output) return;

    try {
      const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `url-result-${Date.now()}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      this.toastService.show('File downloaded successfully!', 'success');
    } catch (e) {
      this.toastService.show('Failed to download output file', 'danger');
    }
  }

  clearAll() {
    this.inputText = '';
    this.outputText.set('');
  }
}
