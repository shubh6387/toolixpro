import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeEditorComponent } from '../../../../shared/components/code-editor/code-editor.component';
import { CopyButtonComponent } from '../../../../shared/components/copy-button/copy-button.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-json-formatter',
  standalone: true,
  imports: [CommonModule, FormsModule, CodeEditorComponent, CopyButtonComponent],
  template: `
    <div class="row g-4">
      <!-- Input Panel -->
      <div class="col-lg-6 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="fw-bold text-secondary small">Input JSON</label>
          <div class="d-flex gap-2">
            <!-- File Upload -->
            <label class="btn btn-outline-secondary btn-sm d-flex align-items-center gap-1 cursor-pointer">
              <i class="bi bi-upload"></i>
              <span>Upload</span>
              <input type="file" accept=".json,text/*" class="d-none" (change)="handleFileUpload($event)">
            </label>
            <button class="btn btn-outline-secondary btn-sm" (click)="clearInput()" [disabled]="!inputText">
              <i class="bi bi-trash"></i> Clear
            </button>
          </div>
        </div>
        
        <app-code-editor [value]="inputText" 
                         (valueChange)="onInputChanged($event)"
                         placeholder="Paste raw JSON here..."></app-code-editor>
      </div>

      <!-- Output Panel -->
      <div class="col-lg-6 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="fw-bold text-secondary small">Output Result</label>
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
                         placeholder="Formatted JSON will appear here..."></app-code-editor>
      </div>
    </div>

    <!-- Control Actions Bar -->
    <div class="d-flex flex-wrap gap-2 mt-4">
      <button class="btn btn-primary px-4 py-2" (click)="formatJSON()" [disabled]="!inputText">
        <i class="bi bi-braces me-1"></i> Beautify JSON
      </button>
      <button class="btn btn-outline-primary px-4 py-2" (click)="minifyJSON()" [disabled]="!inputText">
        <i class="bi bi-file-earmark-zip me-1"></i> Minify JSON
      </button>
      <button class="btn btn-outline-secondary px-4 py-2" (click)="validateJSON()" [disabled]="!inputText">
        <i class="bi bi-check2-all me-1"></i> Validate JSON
      </button>
    </div>

    <!-- Validation Status Feedback -->
    @if (validationStatus()) {
      <div class="alert mt-4 p-3 rounded-3" 
           [class.alert-success]="validationStatus()?.valid" 
           [class.alert-danger]="!validationStatus()?.valid">
        <div class="d-flex align-items-center gap-2">
          @if (validationStatus()?.valid) {
            <i class="bi bi-check-circle-fill fs-5 text-success"></i>
            <span class="fw-bold">Valid JSON!</span>
          } @else {
            <i class="bi bi-exclamation-triangle-fill fs-5 text-danger"></i>
            <div>
              <span class="fw-bold">Invalid JSON:</span> 
              <span class="small d-block">{{ validationStatus()?.error }}</span>
            </div>
          }
        </div>
      </div>
    }
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
export class JsonFormatterComponent {
  private toastService = inject(ToastService);

  inputText = '';
  outputText = '';
  validationStatus = signal<{ valid: boolean; error?: string } | null>(null);

  onInputChanged(val: string) {
    this.inputText = val;
    if (this.validationStatus()) {
      this.validationStatus.set(null);
    }
  }

  clearInput() {
    this.inputText = '';
    this.outputText = '';
    this.validationStatus.set(null);
    this.toastService.show('Input and Output cleared.', 'info');
  }

  formatJSON() {
    try {
      if (!this.inputText.trim()) return;
      const parsed = JSON.parse(this.inputText);
      this.outputText = JSON.stringify(parsed, null, 2);
      this.validationStatus.set({ valid: true });
      this.toastService.show('JSON formatted successfully.', 'success');
    } catch (e: any) {
      this.outputText = '';
      this.validationStatus.set({ valid: false, error: e.message });
      this.toastService.show('Failed to format. Invalid JSON structure.', 'danger');
    }
  }

  minifyJSON() {
    try {
      if (!this.inputText.trim()) return;
      const parsed = JSON.parse(this.inputText);
      this.outputText = JSON.stringify(parsed);
      this.validationStatus.set({ valid: true });
      this.toastService.show('JSON minified successfully.', 'success');
    } catch (e: any) {
      this.outputText = '';
      this.validationStatus.set({ valid: false, error: e.message });
      this.toastService.show('Failed to minify. Invalid JSON structure.', 'danger');
    }
  }

  validateJSON() {
    try {
      if (!this.inputText.trim()) return;
      JSON.parse(this.inputText);
      this.validationStatus.set({ valid: true });
      this.toastService.show('JSON is valid.', 'success');
    } catch (e: any) {
      this.validationStatus.set({ valid: false, error: e.message });
      this.toastService.show('Invalid JSON syntax detected.', 'danger');
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
        this.validationStatus.set(null);
        this.toastService.show(`Loaded file: ${file.name}`, 'info');
      };
      reader.readAsText(file);
    }
  }

  downloadResult() {
    if (!this.outputText) return;
    const blob = new Blob([this.outputText], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'formatted.json';
    link.click();
    URL.revokeObjectURL(url);
    this.toastService.show('JSON file downloaded.', 'success');
  }
}
