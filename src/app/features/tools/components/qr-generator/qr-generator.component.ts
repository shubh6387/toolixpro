import { Component, OnInit, inject, signal, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as QRCode from 'qrcode';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-qr-generator',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="row g-4">
      <!-- Input Panel -->
      <div class="col-lg-7">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase">QR Code Configuration</h5>
        
        <div class="mb-4">
          <label class="form-label small fw-semibold">Text or URL:</label>
          <textarea class="form-control" rows="4" 
                    [ngModel]="qrText()" 
                    (ngModelChange)="onTextChange($event)"
                    placeholder="Enter text, link, email, or credentials to encode..."></textarea>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label small fw-semibold">Error Correction Level:</label>
            <select class="form-select" [ngModel]="errorLevel()" (ngModelChange)="onErrorLevelChange($event)">
              <option value="L">Low (7% recovery)</option>
              <option value="M">Medium (15% recovery)</option>
              <option value="Q">Quartile (25% recovery)</option>
              <option value="H">High (30% recovery)</option>
            </select>
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-semibold">Size (Pixels):</label>
            <select class="form-select" [ngModel]="qrSize()" (ngModelChange)="onSizeChange($event)">
              <option [ngValue]="128">128 x 128</option>
              <option [ngValue]="256">256 x 256</option>
              <option [ngValue]="350">350 x 350</option>
              <option [ngValue]="512">512 x 512</option>
            </select>
          </div>
        </div>

        <div class="row g-3 mb-4">
          <div class="col-md-6">
            <label class="form-label small fw-semibold">Foreground Color:</label>
            <div class="input-group">
              <input type="color" class="form-control form-control-color w-100" [ngModel]="fgColor()" (ngModelChange)="onFgColorChange($event)">
            </div>
          </div>
          <div class="col-md-6">
            <label class="form-label small fw-semibold">Background Color:</label>
            <div class="input-group">
              <input type="color" class="form-control form-control-color w-100" [ngModel]="bgColor()" (ngModelChange)="onBgColorChange($event)">
            </div>
          </div>
        </div>

        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary px-4 rounded-pill" (click)="resetFields()">
            <i class="bi bi-arrow-counterclockwise me-2"></i>Reset Defaults
          </button>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="col-lg-5 text-center d-flex flex-column align-items-center justify-content-center border-start ps-lg-4">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase align-self-start">QR Code Preview</h5>
        
        <div class="qr-preview-box p-3 border rounded-3 mb-4 shadow-sm d-flex align-items-center justify-content-center w-100"
             [style.background-color]="bgColor()">
          @if (qrDataUrl()) {
            <img [src]="qrDataUrl()" 
                 alt="Generated QR Code" 
                 class="img-fluid rounded" 
                 [style.max-width.px]="qrSize() > 280 ? 280 : qrSize()" 
                 style="height: auto; transition: all 0.2s ease;">
          } @else {
            <div class="spinner-border text-primary py-3" role="status">
              <span class="visually-hidden">Generating QR...</span>
            </div>
          }
        </div>

        <div class="d-flex flex-column gap-2 w-100 max-width-250">
          <button class="btn btn-primary w-100 rounded-pill px-4 py-2 fw-semibold" 
                  [disabled]="!qrText() || !qrDataUrl()" 
                  (click)="downloadQr()">
            <i class="bi bi-download me-2"></i>Download PNG
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .qr-preview-box {
      min-height: 280px;
      border-color: var(--border-color) !important;
      transition: all 0.3s ease;
    }
    .form-control-color {
      height: 42px;
      padding: 6px;
      border-radius: 8px;
      cursor: pointer;
    }
    .max-width-250 {
      max-width: 250px;
    }
  `]
})
export class QrGeneratorComponent implements OnInit, AfterViewInit {
  private toastService = inject(ToastService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  qrText = signal<string>('https://toolixpro.vercel.app');
  errorLevel = signal<'L' | 'M' | 'Q' | 'H'>('M');
  qrSize = signal<number>(256);
  fgColor = signal<string>('#0f172a');
  bgColor = signal<string>('#ffffff');

  qrDataUrl = signal<string>('');

  ngOnInit() {
    if (this.isBrowser) {
      this.generateQr();
    }
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.generateQr();
    }
  }

  onTextChange(val: string) {
    this.qrText.set(val);
    this.generateQr();
  }

  onErrorLevelChange(val: 'L' | 'M' | 'Q' | 'H') {
    this.errorLevel.set(val);
    this.generateQr();
  }

  onSizeChange(val: number) {
    this.qrSize.set(val);
    this.generateQr();
  }

  onFgColorChange(val: string) {
    this.fgColor.set(val);
    this.generateQr();
  }

  onBgColorChange(val: string) {
    this.bgColor.set(val);
    this.generateQr();
  }

  generateQr() {
    if (!this.isBrowser) return;

    const text = this.qrText() || ' ';

    QRCode.toDataURL(text, {
      width: this.qrSize(),
      errorCorrectionLevel: this.errorLevel(),
      color: {
        dark: this.fgColor(),
        light: this.bgColor()
      },
      margin: 2
    }, (error, url) => {
      if (error) {
        console.error('QR generation error:', error);
      } else if (url) {
        this.qrDataUrl.set(url);
      }
    });
  }

  downloadQr() {
    const url = this.qrDataUrl();
    if (!url) return;

    try {
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr-code-${Date.now()}.png`;
      a.click();
      this.toastService.show('QR code image downloaded successfully!', 'success');
    } catch (e) {
      this.toastService.show('Failed to download QR code image', 'danger');
    }
  }

  resetFields() {
    this.qrText.set('https://toolixpro.vercel.app');
    this.errorLevel.set('M');
    this.qrSize.set(256);
    this.fgColor.set('#0f172a');
    this.bgColor.set('#ffffff');
    this.generateQr();
  }
}
