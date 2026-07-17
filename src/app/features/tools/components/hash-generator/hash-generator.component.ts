import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-hash-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row g-4">
      <!-- Input Section -->
      <div class="col-lg-12">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="form-label small fw-semibold mb-0">Input Text to Hash:</label>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="hashCaseSwitch" 
                   [ngModel]="uppercase()" (ngModelChange)="onUppercaseChange($event)">
            <label class="form-check-label small fw-semibold" for="hashCaseSwitch">Uppercase Hashes</label>
          </div>
        </div>
        <textarea class="form-control mb-4" rows="4" 
                  [ngModel]="inputText()" 
                  (ngModelChange)="onInputTextChange($event)"
                  placeholder="Type or paste your text content here..."></textarea>
      </div>

      <!-- Outputs Section -->
      <div class="col-lg-12">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase">Cryptographic Hashes</h5>
        
        <div class="row g-3">
          <!-- MD5 -->
          <div class="col-md-6">
            <div class="card p-3 bg-body border border-light-subtle h-100">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-secondary-subtle text-secondary fw-bold px-2 py-1">MD5</span>
                <button class="btn btn-link btn-sm p-0 text-secondary" 
                        [disabled]="!md5Hash()" (click)="copyHash(md5Hash(), 'MD5')">
                  <i class="bi bi-clipboard me-1"></i>Copy
                </button>
              </div>
              <code class="hash-display text-indigo">{{ md5Hash() || '...' }}</code>
            </div>
          </div>

          <!-- SHA-1 -->
          <div class="col-md-6">
            <div class="card p-3 bg-body border border-light-subtle h-100">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-secondary-subtle text-secondary fw-bold px-2 py-1">SHA-1</span>
                <button class="btn btn-link btn-sm p-0 text-secondary" 
                        [disabled]="!sha1Hash()" (click)="copyHash(sha1Hash(), 'SHA-1')">
                  <i class="bi bi-clipboard me-1"></i>Copy
                </button>
              </div>
              <code class="hash-display text-indigo">{{ sha1Hash() || '...' }}</code>
            </div>
          </div>

          <!-- SHA-256 -->
          <div class="col-md-6">
            <div class="card p-3 bg-body border border-light-subtle h-100">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-secondary-subtle text-secondary fw-bold px-2 py-1">SHA-256</span>
                <button class="btn btn-link btn-sm p-0 text-secondary" 
                        [disabled]="!sha256Hash()" (click)="copyHash(sha256Hash(), 'SHA-256')">
                  <i class="bi bi-clipboard me-1"></i>Copy
                </button>
              </div>
              <code class="hash-display text-indigo">{{ sha256Hash() || '...' }}</code>
            </div>
          </div>

          <!-- SHA-512 -->
          <div class="col-md-6">
            <div class="card p-3 bg-body border border-light-subtle h-100">
              <div class="d-flex justify-content-between align-items-center mb-2">
                <span class="badge bg-secondary-subtle text-secondary fw-bold px-2 py-1">SHA-512</span>
                <button class="btn btn-link btn-sm p-0 text-secondary" 
                        [disabled]="!sha512Hash()" (click)="copyHash(sha512Hash(), 'SHA-512')">
                  <i class="bi bi-clipboard me-1"></i>Copy
                </button>
              </div>
              <code class="hash-display text-indigo">{{ sha512Hash() || '...' }}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .hash-display {
      word-break: break-all;
      font-size: 0.95rem;
      min-height: 24px;
      display: block;
    }
    .text-indigo {
      color: var(--accent-color);
    }
    .bg-secondary-subtle {
      background-color: var(--code-bg) !important;
      color: var(--text-primary) !important;
    }
  `]
})
export class HashGeneratorComponent implements OnInit {
  private toastService = inject(ToastService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  inputText = signal<string>('ToolixPro');
  uppercase = signal<boolean>(false);

  md5Hash = signal<string>('');
  sha1Hash = signal<string>('');
  sha256Hash = signal<string>('');
  sha512Hash = signal<string>('');

  ngOnInit() {
    this.calculateHashes();
  }

  onInputTextChange(val: string) {
    this.inputText.set(val);
    this.calculateHashes();
  }

  onUppercaseChange(val: boolean) {
    this.uppercase.set(val);
    this.formatHashesCasing();
  }

  async calculateHashes() {
    const text = this.inputText();
    if (!text) {
      this.md5Hash.set('');
      this.sha1Hash.set('');
      this.sha256Hash.set('');
      this.sha512Hash.set('');
      return;
    }

    // 1. MD5 (local pure-js implementation)
    const md5Value = this.computeMd5(text);
    this.md5Hash.set(this.applyCasing(md5Value));

    if (!this.isBrowser) {
      return;
    }

    // 2. SHA-1, SHA-256, SHA-512 via SubtleCrypto Web API
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);

      const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
      this.sha1Hash.set(this.applyCasing(this.bufferToHex(sha1Buffer)));

      const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
      this.sha256Hash.set(this.applyCasing(this.bufferToHex(sha256Buffer)));

      const sha512Buffer = await crypto.subtle.digest('SHA-512', data);
      this.sha512Hash.set(this.applyCasing(this.bufferToHex(sha512Buffer)));
    } catch (e) {
      console.error('Cryptographic hash computation failed', e);
    }
  }

  formatHashesCasing() {
    this.md5Hash.set(this.applyCasing(this.md5Hash()));
    this.sha1Hash.set(this.applyCasing(this.sha1Hash()));
    this.sha256Hash.set(this.applyCasing(this.sha256Hash()));
    this.sha512Hash.set(this.applyCasing(this.sha512Hash()));
  }

  private applyCasing(hexStr: string): string {
    return this.uppercase() ? hexStr.toUpperCase() : hexStr.toLowerCase();
  }

  private bufferToHex(buffer: ArrayBuffer): string {
    return Array.from(new Uint8Array(buffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  copyHash(hash: string, algorithm: string) {
    if (!hash) return;
    navigator.clipboard.writeText(hash).then(() => {
      this.toastService.show(`${algorithm} hash copied!`, 'success');
    });
  }

  private computeMd5(str: string): string {
    const k = [
      0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501,
      0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821,
      0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8,
      0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a,
      0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70,
      0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665,
      0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1,
      0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391
    ];

    const r = [
      7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,  7, 12, 17, 22,
      5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,  5,  9, 14, 20,
      4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,  4, 11, 16, 23,
      6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21,  6, 10, 15, 21
    ];

    const utf8 = unescape(encodeURIComponent(str));
    const len = utf8.length;
    const words = new Uint32Array(((len + 8) >> 6) + 1 << 4);
    for (let i = 0; i < len; i++) {
      words[i >> 2] |= utf8.charCodeAt(i) << ((i % 4) << 3);
    }
    words[len >> 2] |= 0x80 << ((len % 4) << 3);
    words[words.length - 2] = len * 8;

    let h0 = 0x67452301;
    let h1 = 0xefcdab89;
    let h2 = 0x98badcfe;
    let h3 = 0x10325476;

    const safeAdd = (x: number, y: number) => (x + y) | 0;
    const rot = (x: number, s: number) => (x << s) | (x >>> (32 - s));

    for (let i = 0; i < words.length; i += 16) {
      let a = h0;
      let b = h1;
      let c = h2;
      let d = h3;

      for (let j = 0; j < 64; j++) {
        let f = 0;
        let g = 0;

        if (j < 16) {
          f = (b & c) | (~b & d);
          g = j;
        } else if (j < 32) {
          f = (d & b) | (~d & c);
          g = (5 * j + 1) % 16;
        } else if (j < 48) {
          f = b ^ c ^ d;
          g = (3 * j + 5) % 16;
        } else {
          f = c ^ (b | ~d);
          g = (7 * j) % 16;
        }

        const temp = d;
        d = c;
        c = b;
        b = safeAdd(b, rot(safeAdd(a, safeAdd(f, safeAdd(k[j], words[i + g]))), r[j]));
        a = temp;
      }

      h0 = safeAdd(h0, a);
      h1 = safeAdd(h1, b);
      h2 = safeAdd(h2, c);
      h3 = safeAdd(h3, d);
    }

    const hex = (n: number) => {
      let s = '';
      for (let i = 0; i < 4; i++) {
        s += ((n >> (i * 8)) & 0xff).toString(16).padStart(2, '0');
      }
      return s;
    };

    return hex(h0) + hex(h1) + hex(h2) + hex(h3);
  }
}
