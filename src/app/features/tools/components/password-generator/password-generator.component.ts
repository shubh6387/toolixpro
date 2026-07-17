import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CopyButtonComponent } from '../../../../shared/components/copy-button/copy-button.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-password-generator',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyButtonComponent],
  template: `
    <div class="row g-4">
      <!-- Options Column -->
      <div class="col-lg-6">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase">Generator Settings</h5>
        
        <!-- Length Selection -->
        <div class="mb-4">
          <div class="d-flex justify-content-between mb-2">
            <span class="small fw-semibold">Password Length:</span>
            <span class="badge bg-indigo text-white fw-bold px-2 py-1 fs-6">{{ length }}</span>
          </div>
          <input type="range" class="form-range" min="6" max="64" [(ngModel)]="length" (ngModelChange)="generatePassword()">
        </div>

        <!-- Options Checkboxes -->
        <div class="d-flex flex-column gap-3 mb-4">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="upper" [(ngModel)]="includeUpper" (ngModelChange)="generatePassword()">
            <label class="form-check-label fw-semibold" for="upper">Include Uppercase Letters (A-Z)</label>
          </div>
          
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="lower" [(ngModel)]="includeLower" (ngModelChange)="generatePassword()">
            <label class="form-check-label fw-semibold" for="lower">Include Lowercase Letters (a-z)</label>
          </div>
          
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="digits" [(ngModel)]="includeDigits" (ngModelChange)="generatePassword()">
            <label class="form-check-label fw-semibold" for="digits">Include Numbers (0-9)</label>
          </div>
          
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="symbols" [(ngModel)]="includeSymbols" (ngModelChange)="generatePassword()">
            <label class="form-check-label fw-semibold" for="symbols">Include Special Symbols (!&#64;#$%^&*...)</label>
          </div>
          
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="similar" [(ngModel)]="excludeSimilar" (ngModelChange)="generatePassword()">
            <label class="form-check-label fw-semibold" for="similar">Exclude Similar Characters (i, l, 1, L, o, 0, O)</label>
          </div>
        </div>
      </div>

      <!-- Result / Strength Meter Column -->
      <div class="col-lg-6 d-flex flex-column justify-content-between">
        <div>
          <h5 class="fw-bold mb-3 small text-secondary text-uppercase">Generated Password</h5>
          
          <!-- Password Viewer Box -->
          <div class="password-viewer-box d-flex align-items-center justify-content-between p-3 border rounded-3 mb-4 bg-body-tertiary">
            <span class="password-text font-monospace select-all overflow-hidden text-truncate">{{ password() }}</span>
            <div class="d-flex gap-2">
              <app-copy-button [text]="password()"></app-copy-button>
              <button class="btn btn-outline-secondary btn-sm" (click)="generatePassword()" aria-label="Generate new password">
                <i class="bi bi-arrow-clockwise"></i>
              </button>
            </div>
          </div>

          <!-- Strength Meter Box -->
          <div class="strength-meter-container mb-4">
            <div class="d-flex justify-content-between mb-2">
              <span class="small fw-semibold">Security Strength:</span>
              <span class="badge" [ngClass]="strengthClass()">{{ strengthLabel() }}</span>
            </div>
            
            <div class="progress" style="height: 8px;">
              <div class="progress-bar" role="progressbar" 
                   [style.width]="strengthPercentage() + '%'" 
                   [ngClass]="strengthBarClass()"
                   [attr.aria-valuenow]="strengthPercentage()" 
                   aria-valuemin="0" 
                   aria-valuemax="100"></div>
            </div>
          </div>
        </div>

        <div class="alert alert-warning p-3 rounded-3 mb-0 small lh-base">
          <i class="bi bi-info-circle-fill text-warning me-2 fs-5 float-start"></i>
          Passwords are generated client-side inside your browser via cryptographically secure APIs (CSPRNG). We never see or log your keys.
        </div>
      </div>
    </div>
  `,
  styles: [`
    .password-text {
      font-size: 1.25rem;
      letter-spacing: 0.5px;
      color: var(--text-primary);
    }
    .form-range::-webkit-slider-thumb {
      background: var(--accent-color);
    }
    .form-check-input:checked {
      background-color: var(--accent-color);
      border-color: var(--accent-color);
    }
    .bg-indigo {
      background: var(--accent-color);
    }
    .bg-weak { background-color: #dc3545 !important; }
    .bg-medium { background-color: #ffc107 !important; }
    .bg-strong { background-color: #198754 !important; }
    .bg-very-strong { background-color: #0f5132 !important; }
    
    .text-weak { color: #dc3545 !important; background-color: #f8d7da !important; }
    .text-medium { color: #664d03 !important; background-color: #fff3cd !important; }
    .text-strong { color: #0f5132 !important; background-color: #d1e7dd !important; }
    .text-very-strong { color: #0f5132 !important; background-color: #d1e7dd !important; border: 1px solid #a3cfbb; }
  `]
})
export class PasswordGeneratorComponent implements OnInit {
  private toastService = inject(ToastService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  length = 16;
  includeUpper = true;
  includeLower = true;
  includeDigits = true;
  includeSymbols = true;
  excludeSimilar = false;

  password = signal<string>('');
  strengthLabel = signal<string>('Strong');
  strengthClass = signal<string>('text-strong');
  strengthBarClass = signal<string>('bg-strong');
  strengthPercentage = signal<number>(75);

  ngOnInit() {
    if (this.isBrowser) {
      this.generatePassword();
    }
  }

  generatePassword() {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const similarChars = /[il1Lo0O]/g;

    let charPool = '';
    let mandatoryChars = '';

    if (this.includeUpper) {
      let pool = uppercaseChars;
      if (this.excludeSimilar) pool = pool.replace(similarChars, '');
      charPool += pool;
      if (pool) mandatoryChars += this.getRandomChar(pool);
    }
    if (this.includeLower) {
      let pool = lowercaseChars;
      if (this.excludeSimilar) pool = pool.replace(similarChars, '');
      charPool += pool;
      if (pool) mandatoryChars += this.getRandomChar(pool);
    }
    if (this.includeDigits) {
      let pool = numberChars;
      if (this.excludeSimilar) pool = pool.replace(similarChars, '');
      charPool += pool;
      if (pool) mandatoryChars += this.getRandomChar(pool);
    }
    if (this.includeSymbols) {
      charPool += symbolChars;
      mandatoryChars += this.getRandomChar(symbolChars);
    }

    if (!charPool) {
      this.password.set('');
      this.calculateStrength(0, 0);
      return;
    }

    let generated = '';
    const remainingLength = this.length - mandatoryChars.length;

    for (let i = 0; i < remainingLength; i++) {
      generated += this.getRandomChar(charPool);
    }

    const passwordArray = (mandatoryChars + generated).split('');
    const shuffledPassword = this.shuffleArray(passwordArray).join('');

    this.password.set(shuffledPassword);
    this.calculateStrength(shuffledPassword.length, charPool.length);
  }

  private getRandomChar(pool: string): string {
    if (!pool) return '';
    const isBrowser = typeof window !== 'undefined';
    const cryptoObj = isBrowser ? (window.crypto || (window as any).msCrypto) : null;
    if (cryptoObj) {
      const randomBuffer = new Uint32Array(1);
      cryptoObj.getRandomValues(randomBuffer);
      const index = randomBuffer[0] % pool.length;
      return pool.charAt(index);
    } else {
      const index = Math.floor(Math.random() * pool.length);
      return pool.charAt(index);
    }
  }

  private shuffleArray(array: any[]): any[] {
    const isBrowser = typeof window !== 'undefined';
    const cryptoObj = isBrowser ? (window.crypto || (window as any).msCrypto) : null;
    for (let i = array.length - 1; i > 0; i--) {
      let j = 0;
      if (cryptoObj) {
        const randomBuffer = new Uint32Array(1);
        cryptoObj.getRandomValues(randomBuffer);
        j = randomBuffer[0] % (i + 1);
      } else {
        j = Math.floor(Math.random() * (i + 1));
      }
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  private calculateStrength(len: number, poolSize: number) {
    if (len === 0 || poolSize === 0) {
      this.strengthLabel.set('None');
      this.strengthClass.set('text-secondary');
      this.strengthBarClass.set('bg-secondary');
      this.strengthPercentage.set(0);
      return;
    }

    const entropy = len * (Math.log(poolSize) / Math.log(2));

    if (entropy < 40) {
      this.strengthLabel.set('Weak');
      this.strengthClass.set('text-weak');
      this.strengthBarClass.set('bg-weak');
      this.strengthPercentage.set(25);
    } else if (entropy >= 40 && entropy < 60) {
      this.strengthLabel.set('Medium');
      this.strengthClass.set('text-medium');
      this.strengthBarClass.set('bg-medium');
      this.strengthPercentage.set(50);
    } else if (entropy >= 60 && entropy < 80) {
      this.strengthLabel.set('Strong');
      this.strengthClass.set('text-strong');
      this.strengthBarClass.set('bg-strong');
      this.strengthPercentage.set(75);
    } else {
      this.strengthLabel.set('Very Strong');
      this.strengthClass.set('text-very-strong');
      this.strengthBarClass.set('bg-very-strong');
      this.strengthPercentage.set(100);
    }
  }
}
