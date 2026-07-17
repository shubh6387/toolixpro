import { Component, OnInit, inject, signal, ViewChild, ElementRef, PLATFORM_ID } from '@angular/core';
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
            <i class="bi bi-arrow-counterclockwise me-2"></i>Reset
          </button>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="col-lg-5 text-center d-flex flex-column align-items-center justify-content-center border-start ps-lg-4">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase align-self-start">QR Code Preview</h5>
        
        <div class="qr-canvas-container p-3 border rounded-3 bg-white mb-4 shadow-sm d-flex align-items-center justify-content-center">
          <canvas #qrCanvas></canvas>
        </div>

        <div class="d-flex flex-column gap-2 w-100 max-width-250">
          <button class="btn btn-primary w-100 rounded-pill px-4" 
                  [disabled]="!qrText()" 
                  (click)="downloadQr()">
            <i class="bi bi-download me-2"></i>Download PNG
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .qr-canvas-container {
      min-width: 280px;
      min-height: 280px;
      border-color: var(--border-color) !important;
      transition: all 0.3s ease;
    }
    .form-control-color {
      height: 42px;
      padding: 6px;
      border-radius: 8px;
    }
    .max-width-250 {
      max-width: 250px;
    }
  `]
})
export class QrGeneratorComponent implements OnInit {
  private toastService = inject(ToastService);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  @ViewChild('qrCanvas', { static: true }) qrCanvas!: ElementRef<HTMLCanvasElement>;

  qrText = signal<string>('https://toolixpro.net');
  errorLevel = signal<'L' | 'M' | 'Q' | 'H'>('M');
  qrSize = signal<number>(256);
  fgColor = signal<string>('#0f172a');
  bgColor = signal<string>('#ffffff');

  ngOnInit() {
    if (this.isBrowser) {
      setTimeout(() => this.generateQr(), 0);
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

    const canvas = this.qrCanvas.nativeElement;
    const text = this.qrText() || ' ';

    QRCode.toCanvas(canvas, text, {
      width: this.qrSize(),
      errorCorrectionLevel: this.errorLevel(),
      color: {
        dark: this.fgColor(),
        light: this.bgColor()
      },
      margin: 2
    }, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }

  downloadQr() {
    if (!this.isBrowser) return;
    const canvas = this.qrCanvas.nativeElement;
    try {
      const url = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = url;
      a.download = `qr-code-${Date.now()}.png`;
      a.click();
      this.toastService.show('QR code downloaded successfully!', 'success');
    } catch (e) {
      this.toastService.show('Failed to download QR code image', 'danger');
    }
  }

  resetFields() {
    this.qrText.set('https://toolixpro.net');
    this.errorLevel.set('M');
    this.qrSize.set(256);
    this.fgColor.set('#0f172a');
    this.bgColor.set('#ffffff');
    this.generateQr();
  }
}
