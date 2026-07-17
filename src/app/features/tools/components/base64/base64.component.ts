import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeEditorComponent } from '../../../../shared/components/code-editor/code-editor.component';
import { CopyButtonComponent } from '../../../../shared/components/copy-button/copy-button.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-base64',
  standalone: true,
  imports: [CommonModule, FormsModule, CodeEditorComponent, CopyButtonComponent],
  template: `
    <div class="row g-4">
      <!-- Input Panel -->
      <div class="col-lg-6 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="fw-bold text-secondary small">Input Text</label>
          <div class="d-flex gap-2">
            <!-- File Upload -->
            <label class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 cursor-pointer">
              <i class="bi bi-upload"></i>
              <span>Upload</span>
              <input type="file" accept="text/*" class="d-none" (change)="handleFileUpload($event)">
            </label>
            <button class="btn btn-outline-secondary btn-sm" (click)="clearAll()" [disabled]="!inputText">
              <i class="bi bi-trash"></i> Clear
            </button>
          </div>
        </div>
        
        <app-code-editor [value]="inputText" 
                         (valueChange)="onInputChanged($event)"
                         placeholder="Type or paste text/base64 content here..."></app-code-editor>
      </div>

      <!-- Output Panel -->
      <div class="col-lg-6 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="fw-bold text-secondary small">Result Output</label>
          <div class="d-flex gap-2">
            <app-copy-button [text]="outputText"></app-copy-button>
            <button class="btn btn-outline-secondary btn-sm" 
                    [disabled]="!outputText" 
                    (click)="downloadResult()">
              <i class="bi bi-download"></i> Download
            </button>
          </div>
        </div>
        
        <app-code-editor [value]="outputText" 
                         [readOnly]="true"
                         placeholder="Resulting Base64 output will appear here..."></app-code-editor>
      </div>
    </div>

    <!-- Control Actions -->
    <div class="d-flex flex-wrap gap-2 mt-4">
      <button class="btn btn-primary px-4 py-2" (click)="encode()" [disabled]="!inputText">
        <i class="bi bi-file-earmark-arrow-up me-1"></i> Encode to Base64
      </button>
      <button class="btn btn-outline-primary px-4 py-2" (click)="decode()" [disabled]="!inputText">
        <i class="bi bi-file-earmark-arrow-down me-1"></i> Decode Base64
      </button>
    </div>
  `,
  styles: [`
    .cursor-pointer {
      cursor: pointer;
    }
    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      border: none;
      
      &:hover {
        background: linear-gradient(135deg, #4f46e5, #4338ca);
      }
    }
  `]
})
export class Base64Component {
  private toastService = inject(ToastService);

  inputText = '';
  outputText = '';

  onInputChanged(val: string) {
    this.inputText = val;
  }

  clearAll() {
    this.inputText = '';
    this.outputText = '';
    this.toastService.show('Inputs and outputs cleared.', 'info');
  }

  encode() {
    if (!this.inputText.trim()) return;

    try {
      const bytes = new TextEncoder().encode(this.inputText);
      const binString = String.fromCodePoint(...bytes);
      this.outputText = btoa(binString);
      this.toastService.show('Text encoded to Base64.', 'success');
    } catch (e: any) {
      this.outputText = '';
      this.toastService.show('Failed to encode: ' + e.message, 'danger');
    }
  }

  decode() {
    if (!this.inputText.trim()) return;

    try {
      const binString = atob(this.inputText.trim());
      const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
      this.outputText = new TextDecoder().decode(bytes);
      this.toastService.show('Base64 decoded successfully.', 'success');
    } catch (e: any) {
      this.outputText = '';
      this.toastService.show('Failed to decode. Ensure input is a valid Base64 string.', 'danger');
    }
  }

  handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string;
        this.inputText = text;
        this.toastService.show(`Loaded file: ${file.name}`, 'info');
      };
      reader.readAsText(file);
    }
  }

  downloadResult() {
    if (!this.outputText) return;
    const blob = new Blob([this.outputText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'base64_result.txt';
    link.click();
    URL.revokeObjectURL(url);
    this.toastService.show('Result file downloaded.', 'success');
  }
}
