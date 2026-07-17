import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CopyButtonComponent } from '../../../../shared/components/copy-button/copy-button.component';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-regex-tester',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyButtonComponent],
  template: `
    <div class="row g-4">
      <!-- Input Panel -->
      <div class="col-lg-6">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase">Regex Settings</h5>
        
        <!-- Regex Input -->
        <div class="mb-3">
          <label for="regexInput" class="form-label small fw-bold text-secondary">Regular Expression</label>
          <div class="input-group">
            <span class="input-group-text font-monospace bg-light-subtle border-end-0">/</span>
            <input type="text" 
                   id="regexInput" 
                   class="form-control font-monospace border-start-0 border-end-0 ps-0" 
                   placeholder="[a-zA-Z0-9]+" 
                   [(ngModel)]="pattern" 
                   (ngModelChange)="onRegexChanged()">
            <span class="input-group-text font-monospace bg-light-subtle border-start-0">/</span>
          </div>
        </div>

        <!-- Flags Checks -->
        <div class="d-flex gap-3 mb-4">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="flagG" [(ngModel)]="flagGlobal" (ngModelChange)="onRegexChanged()">
            <label class="form-check-label small fw-semibold" for="flagG" title="Global search">g</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="flagI" [(ngModel)]="flagIgnoreCase" (ngModelChange)="onRegexChanged()">
            <label class="form-check-label small fw-semibold" for="flagI" title="Case-insensitive">i</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="flagM" [(ngModel)]="flagMultiline" (ngModelChange)="onRegexChanged()">
            <label class="form-check-label small fw-semibold" for="flagM" title="Multiline matching">m</label>
          </div>
        </div>

        <!-- Test String Input -->
        <div class="mb-3">
          <label for="testString" class="form-label small fw-bold text-secondary">Test String</label>
          <textarea id="testString" 
                    class="form-control font-monospace p-3" 
                    rows="8" 
                    placeholder="Enter test text here to run matches..." 
                    [(ngModel)]="testString" 
                    (ngModelChange)="onRegexChanged()"></textarea>
        </div>
      </div>

      <!-- Results / Highlighting Column -->
      <div class="col-lg-6">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase">Matches & Preview</h5>
        
        <!-- Regex status or error -->
        @if (regexError()) {
          <div class="alert alert-danger p-3 rounded-3 mb-3 small">
            <i class="bi bi-exclamation-triangle-fill me-2 text-danger"></i>
            <span class="fw-bold">Regex Syntax Error:</span> {{ regexError() }}
          </div>
        } @else {
          <div class="d-flex align-items-center justify-content-between mb-3">
            <span class="badge bg-indigo text-white px-2.5 py-1.5 fs-6">{{ matchCount() }} Matches Found</span>
            <app-copy-button [text]="testString"></app-copy-button>
          </div>
        }

        <!-- Highlighted HTML Preview Box -->
        <div class="highlight-preview-box border rounded-3 p-3 mb-4 select-none" 
             [innerHTML]="highlightedHtml()"></div>

        <!-- Individual Matches List -->
        @if (matches().length > 0) {
          <div class="matches-list-card border rounded-3 p-3 bg-body-tertiary max-height-250 overflow-y-auto">
            <span class="d-block small fw-bold text-secondary mb-2">Match List:</span>
            <div class="d-flex flex-wrap gap-1">
              @for (match of matches(); track $index) {
                <span class="badge bg-secondary-subtle text-secondary-emphasis font-monospace border px-2 py-1.5">{{ match }}</span>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .form-control {
      background: var(--bg-primary);
      border-color: var(--border-color);
      color: var(--text-primary);
      border-radius: 10px;
      
      &:focus {
        background: var(--bg-secondary);
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
      }
    }
    .input-group-text {
      border-color: var(--border-color);
      color: var(--text-secondary);
    }
    .form-check-input:checked {
      background-color: var(--accent-color);
      border-color: var(--accent-color);
    }
    .bg-indigo {
      background: var(--accent-color);
    }
    .highlight-preview-box {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      background: var(--bg-secondary);
      border-color: var(--border-color) !important;
      color: var(--text-primary);
      min-height: 200px;
      white-space: pre-wrap;
      word-break: break-all;
      overflow-y: auto;
      height: 200px;
    }
    ::ng-deep .regex-match {
      background-color: rgba(99, 102, 241, 0.3);
      color: var(--text-primary);
      border-bottom: 2px solid var(--accent-color);
      border-radius: 2px;
      padding: 1px 0;
    }
    .max-height-250 {
      max-height: 250px;
    }
  `]
})
export class RegexTesterComponent implements OnInit {
  private toastService = inject(ToastService);

  pattern = '[a-zA-Z0-9_.-]+@[a-zA-Z0-9.-]+\\\\.[a-zA-Z]{2,6}';
  testString = 'Hello, support@toolixpro.net or admin@toolixpro.net. Please contact us!';
  flagGlobal = true;
  flagIgnoreCase = true;
  flagMultiline = false;

  highlightedHtml = signal<string>('');
  matches = signal<string[]>([]);
  matchCount = signal<number>(0);
  regexError = signal<string | null>(null);

  ngOnInit() {
    this.onRegexChanged();
  }

  onRegexChanged() {
    this.runRegex();
  }

  private runRegex() {
    if (!this.pattern) {
      this.highlightedHtml.set(this.escapeHtml(this.testString));
      this.matches.set([]);
      this.matchCount.set(0);
      this.regexError.set(null);
      return;
    }

    try {
      const flags = (this.flagGlobal ? 'g' : '') + (this.flagIgnoreCase ? 'i' : '') + (this.flagMultiline ? 'm' : '');
      new RegExp(this.pattern, flags);

      const html = this.highlightMatches(this.testString, this.pattern, flags);
      this.highlightedHtml.set(html);

      const searchFlags = flags.includes('g') ? flags : flags + 'g';
      const searchRegex = new RegExp(this.pattern, searchFlags);
      const list: string[] = [];
      let match;
      let count = 0;
      let iterations = 0;

      while ((match = searchRegex.exec(this.testString)) !== null) {
        if (iterations++ > 1000) break;
        if (match[0].length === 0) {
          searchRegex.lastIndex++;
          continue;
        }
        list.push(match[0]);
        count++;
      }

      this.matches.set(list);
      this.matchCount.set(count);
      this.regexError.set(null);
    } catch (e: any) {
      this.highlightedHtml.set(this.escapeHtml(this.testString));
      this.matches.set([]);
      this.matchCount.set(0);
      this.regexError.set(e.message);
    }
  }

  private highlightMatches(testStr: string, pattern: string, flags: string): string {
    const searchFlags = flags.includes('g') ? flags : flags + 'g';
    const regex = new RegExp(pattern, searchFlags);
    let match;
    let lastIndex = 0;
    let html = '';
    let iterations = 0;

    while ((match = regex.exec(testStr)) !== null) {
      if (iterations++ > 2000) break;
      const matchIndex = match.index;
      const matchText = match[0];

      if (matchText.length === 0) {
        regex.lastIndex++;
        continue;
      }

      html += this.escapeHtml(testStr.substring(lastIndex, matchIndex));
      html += `<mark class="regex-match">${this.escapeHtml(matchText)}</mark>`;
      lastIndex = regex.lastIndex;
    }

    html += this.escapeHtml(testStr.substring(lastIndex));
    return html;
  }

  private escapeHtml(text: string): string {
    if (!text) return '';
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
