import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-code-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="code-editor-wrapper d-flex border rounded-3 overflow-hidden">
      <!-- Line Numbers Sidebar -->
      <div #lineNumbersCol class="line-numbers-col px-2 py-3 text-end select-none">
        @for (line of lines; track line) {
          <div class="line-number">{{ line }}</div>
        }
      </div>
      
      <!-- Text Area input -->
      <textarea #editorTextarea
                class="editor-textarea w-100 p-3"
                [placeholder]="placeholder"
                [readOnly]="readOnly"
                [(ngModel)]="value"
                (ngModelChange)="onValueChange($event)"
                (scroll)="syncScroll($event)"
                spellcheck="false"></textarea>
    </div>
  `,
  styles: [`
    .code-editor-wrapper {
      background: var(--bg-secondary);
      border-color: var(--border-color) !important;
      font-family: var(--font-mono);
      font-size: 0.9rem;
      height: 400px;
      position: relative;
    }
    .line-numbers-col {
      background: var(--code-bg);
      color: var(--text-secondary);
      border-right: 1px solid var(--border-color);
      overflow-y: hidden;
      font-size: 0.85rem;
      line-height: 1.5;
      user-select: none;
      min-width: 45px;
    }
    .line-number {
      height: 1.5rem;
    }
    .editor-textarea {
      background: transparent;
      color: var(--code-text);
      border: none;
      outline: none;
      resize: none;
      font-family: inherit;
      font-size: inherit;
      line-height: 1.5;
      white-space: pre;
      overflow-x: auto;
      overflow-y: auto;
      height: 100%;
      box-shadow: none;
      
      &[readonly] {
        color: var(--text-secondary);
        background: var(--bg-primary);
      }
    }
  `]
})
export class CodeEditorComponent implements AfterViewInit, OnChanges {
  @Input() value: string = '';
  @Input() placeholder: string = 'Paste or type your code here...';
  @Input() readOnly: boolean = false;
  
  @Output() valueChange = new EventEmitter<string>();

  @ViewChild('lineNumbersCol') lineNumbersCol!: ElementRef<HTMLDivElement>;
  @ViewChild('editorTextarea') editorTextarea!: ElementRef<HTMLTextAreaElement>;

  lines: number[] = [1];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      this.recalculateLines();
    }
  }

  ngAfterViewInit(): void {
    this.recalculateLines();
  }

  onValueChange(val: string) {
    this.value = val;
    this.valueChange.emit(val);
    this.recalculateLines();
  }

  syncScroll(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    if (this.lineNumbersCol) {
      this.lineNumbersCol.nativeElement.scrollTop = textarea.scrollTop;
    }
  }

  private recalculateLines() {
    const text = this.value || '';
    const lineCount = text.split('\n').length;
    this.lines = Array.from({ length: Math.max(lineCount, 1) }, (_, i) => i + 1);
  }
}
