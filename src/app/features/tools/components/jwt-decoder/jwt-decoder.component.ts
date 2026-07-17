import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeEditorComponent } from '../../../../shared/components/code-editor/code-editor.component';
import { CopyButtonComponent } from '../../../../shared/components/copy-button/copy-button.component';
import { ToastService } from '../../../../core/services/toast.service';

interface DecodedJwt {
  header: any;
  payload: any;
  headerStr: string;
  payloadStr: string;
  expiryDate?: Date;
  isExpired?: boolean;
}

@Component({
  selector: 'app-jwt-decoder',
  standalone: true,
  imports: [CommonModule, FormsModule, CodeEditorComponent, CopyButtonComponent],
  template: `
    <div class="row g-4">
      <!-- Input Panel -->
      <div class="col-lg-5 d-flex flex-column">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="fw-bold text-secondary small">Encoded JWT Token</label>
          <button class="btn btn-outline-secondary btn-sm" (click)="clearAll()" [disabled]="!token">
            <i class="bi bi-trash"></i> Clear
          </button>
        </div>
        <textarea class="form-control jwt-textarea flex-grow-1 p-3 mb-3" 
                  placeholder="Paste your encoded JWT token here..."
                  [(ngModel)]="token"
                  (ngModelChange)="onTokenChanged($event)"
                  rows="12"></textarea>

        <button class="btn btn-primary w-100 py-2.5" (click)="decodeToken()" [disabled]="!token">
          <i class="bi bi-unlock me-1"></i> Decode JWT
        </button>
      </div>

      <!-- Output Panel -->
      <div class="col-lg-7">
        @if (error()) {
          <div class="alert alert-danger p-3 rounded-3 mb-0">
            <i class="bi bi-exclamation-triangle-fill fs-5 text-danger me-2"></i>
            <span class="fw-bold">Invalid JWT Token:</span> {{ error() }}
          </div>
        } @else if (decoded()) {
          <div class="d-flex flex-column gap-4">
            
            <!-- Expiry Status Banner -->
            @if (decoded()?.expiryDate) {
              <div class="alert p-3 rounded-3 m-0" 
                   [class.alert-danger]="decoded()?.isExpired" 
                   [class.alert-success]="!decoded()?.isExpired">
                <div class="d-flex align-items-center gap-2">
                  @if (decoded()?.isExpired) {
                    <i class="bi bi-shield-fill-x fs-4 text-danger"></i>
                    <div>
                      <div class="fw-bold">Token Expired</div>
                      <div class="small text-danger-emphasis">Expired on: {{ decoded()?.expiryDate | date:'medium' }}</div>
                    </div>
                  } @else {
                    <i class="bi bi-shield-fill-check fs-4 text-success"></i>
                    <div>
                      <div class="fw-bold">Token Active</div>
                      <div class="small text-success-emphasis">Expires on: {{ decoded()?.expiryDate | date:'medium' }}</div>
                    </div>
                  }
                </div>
              </div>
            } @else {
              <div class="alert alert-warning p-3 rounded-3 m-0">
                <i class="bi bi-exclamation-circle-fill fs-4 text-warning me-2"></i>
                <span class="fw-bold">No Expiry Claim (exp) found in payload.</span>
              </div>
            }

            <!-- Header Section -->
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-bold text-secondary small">Header (Algorithms & Token Type)</span>
                <app-copy-button [text]="decoded()!.headerStr"></app-copy-button>
              </div>
              <app-code-editor [value]="decoded()!.headerStr" [readOnly]="true" style="height: 180px;"></app-code-editor>
            </div>

            <!-- Payload Section -->
            <div>
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="fw-bold text-secondary small">Payload (Claims & User Data)</span>
                <app-copy-button [text]="decoded()!.payloadStr"></app-copy-button>
              </div>
              <app-code-editor [value]="decoded()!.payloadStr" [readOnly]="true" style="height: 250px;"></app-code-editor>
            </div>
            
          </div>
        } @else {
          <div class="d-flex flex-column align-items-center justify-content-center border border-dashed rounded-3 p-5 text-center text-secondary h-100" style="min-height: 350px;">
            <i class="bi bi-shield-lock-fill fs-1 text-secondary opacity-50 mb-3"></i>
            <h5 class="fw-bold">Awaiting JWT Input</h5>
            <p class="small m-0">Paste an encoded token on the left and click "Decode JWT".</p>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .jwt-textarea {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      border-color: var(--border-color);
      background: var(--bg-secondary);
      color: var(--text-primary);
      resize: none;
      
      &:focus {
        background: var(--bg-secondary);
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
    }
    .border-dashed {
      border-style: dashed !important;
      border-color: var(--border-color) !important;
    }
    .btn-primary {
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      border: none;
      font-weight: 600;
      
      &:hover {
        background: linear-gradient(135deg, #4f46e5, #4338ca);
      }
    }
  `]
})
export class JwtDecoderComponent {
  private toastService = inject(ToastService);

  token = '';
  decoded = signal<DecodedJwt | null>(null);
  error = signal<string | null>(null);

  onTokenChanged(val: string) {
    this.token = val;
    if (!val) {
      this.decoded.set(null);
      this.error.set(null);
    }
  }

  clearAll() {
    this.token = '';
    this.decoded.set(null);
    this.error.set(null);
    this.toastService.show('Form cleared.', 'info');
  }

  decodeToken() {
    if (!this.token.trim()) return;

    try {
      const parts = this.token.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must have exactly 3 parts separated by dots.');
      }

      const headerDecoded = this.base64UrlDecode(parts[0]);
      const payloadDecoded = this.base64UrlDecode(parts[1]);

      const headerObj = JSON.parse(headerDecoded);
      const payloadObj = JSON.parse(payloadDecoded);

      let expiryDate: Date | undefined;
      let isExpired: boolean | undefined;

      if (payloadObj.exp) {
        expiryDate = new Date(payloadObj.exp * 1000);
        isExpired = expiryDate < new Date();
      }

      this.decoded.set({
        header: headerObj,
        payload: payloadObj,
        headerStr: JSON.stringify(headerObj, null, 2),
        payloadStr: JSON.stringify(payloadObj, null, 2),
        expiryDate,
        isExpired
      });
      this.error.set(null);
      this.toastService.show('JWT decoded successfully.', 'success');
    } catch (e: any) {
      this.decoded.set(null);
      this.error.set(e.message || 'Malformed token.');
      this.toastService.show('Failed to decode JWT.', 'danger');
    }
  }

  private base64UrlDecode(str: string): string {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    const pad = base64.length % 4;
    if (pad) {
      if (pad === 1) {
        throw new Error('Invalid Base64Url string');
      }
      base64 += new Array(5 - pad).join('=');
    }
    
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
  }
}
