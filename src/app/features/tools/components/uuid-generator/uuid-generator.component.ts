import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-uuid-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row g-4">
      <!-- Options panel -->
      <div class="col-lg-5">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase">Generation Parameters</h5>
        
        <div class="mb-4">
          <label class="form-label small fw-semibold">Number of UUIDs:</label>
          <select class="form-select" [ngModel]="count()" (ngModelChange)="onCountChange($event)">
            <option [ngValue]="1">1 UUID</option>
            <option [ngValue]="5">5 UUIDs</option>
            <option [ngValue]="10">10 UUIDs</option>
            <option [ngValue]="20">20 UUIDs</option>
            <option [ngValue]="50">50 UUIDs</option>
            <option [ngValue]="100">100 UUIDs</option>
          </select>
        </div>

        <div class="mb-4">
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="caseSwitch" 
                   [ngModel]="uppercase()" (ngModelChange)="onUppercaseChange($event)">
            <label class="form-check-label small fw-semibold" for="caseSwitch">Uppercase output</label>
          </div>
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="hyphenSwitch" 
                   [ngModel]="includeHyphens()" (ngModelChange)="onHyphensChange($event)">
            <label class="form-check-label small fw-semibold" for="hyphenSwitch">Include hyphens</label>
          </div>
        </div>

        <button class="btn btn-primary w-100 rounded-pill py-2 fw-semibold mb-3" (click)="generateUuids()">
          <i class="bi bi-gear-fill me-2"></i>Generate UUIDs
        </button>
      </div>

      <!-- Results panel -->
      <div class="col-lg-7 border-start ps-lg-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="fw-bold mb-0 small text-secondary text-uppercase">Generated Output</h5>
          @if (uuids().length > 0) {
            <button class="btn btn-sm btn-outline-primary rounded-pill px-3" (click)="copyAll()">
              <i class="bi bi-clipboard-plus me-1"></i>Copy All
            </button>
          }
        </div>

        <div class="uuid-results-container border rounded-3 p-3 bg-body-tertiary">
          @if (uuids().length > 0) {
            <div class="d-flex flex-column gap-2">
              @for (uuid of uuids(); track uuid; let idx = $index) {
                <div class="d-flex justify-content-between align-items-center p-2 rounded bg-body border border-light-subtle">
                  <code class="uuid-text fs-6 text-indigo">{{ uuid }}</code>
                  <button class="btn btn-link btn-sm p-0 text-secondary" (click)="copySingle(uuid)" title="Copy UUID">
                    <i class="bi bi-copy"></i>
                  </button>
                </div>
              }
            </div>
          } @else {
            <p class="text-center text-secondary py-5 my-0 small">No UUIDs generated yet. Click generate to start.</p>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .uuid-results-container {
      max-height: 400px;
      overflow-y: auto;
      border-color: var(--border-color) !important;
    }
    .uuid-text {
      word-break: break-all;
    }
    .text-indigo {
      color: var(--accent-color);
    }
  `]
})
export class UuidGeneratorComponent implements OnInit {
  private toastService = inject(ToastService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  count = signal<number>(5);
  uppercase = signal<boolean>(false);
  includeHyphens = signal<boolean>(true);
  uuids = signal<string[]>([]);

  ngOnInit() {
    if (this.isBrowser) {
      this.generateUuids();
    }
  }

  onCountChange(val: number) {
    this.count.set(val);
    this.generateUuids();
  }

  onUppercaseChange(val: boolean) {
    this.uppercase.set(val);
    this.formatExistingUuids();
  }

  onHyphensChange(val: boolean) {
    this.includeHyphens.set(val);
    this.generateUuids();
  }

  generateUuids() {
    const list: string[] = [];
    const count = this.count();
    const withHyphens = this.includeHyphens();
    const isUpper = this.uppercase();

    for (let i = 0; i < count; i++) {
      let uuid = this.createUuidV4();
      if (!withHyphens) {
        uuid = uuid.replace(/-/g, '');
      }
      if (isUpper) {
        uuid = uuid.toUpperCase();
      }
      list.push(uuid);
    }

    this.uuids.set(list);
  }

  formatExistingUuids() {
    const isUpper = this.uppercase();
    const formatted = this.uuids().map(u => isUpper ? u.toUpperCase() : u.toLowerCase());
    this.uuids.set(formatted);
  }

  private createUuidV4(): string {
    if (this.isBrowser && typeof window !== 'undefined' && window.crypto && window.crypto.randomUUID) {
      return window.crypto.randomUUID();
    }
    
    // Fallback secure math-based generator
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  copySingle(uuid: string) {
    navigator.clipboard.writeText(uuid).then(() => {
      this.toastService.show('UUID copied to clipboard!', 'success');
    });
  }

  copyAll() {
    const text = this.uuids().join('\n');
    navigator.clipboard.writeText(text).then(() => {
      this.toastService.show('All UUIDs copied to clipboard!', 'success');
    });
  }
}
