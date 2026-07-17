import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { CopyButtonComponent } from '../../../../shared/components/copy-button/copy-button.component';

@Component({
  selector: 'app-lorem-ipsum',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyButtonComponent],
  template: `
    <div class="row g-4">
      <!-- Options Panel -->
      <div class="col-lg-5">
        <h5 class="fw-bold mb-3 small text-secondary text-uppercase">Generation Settings</h5>
        
        <div class="row g-3 mb-4">
          <div class="col-6">
            <label class="form-label small fw-semibold">Count:</label>
            <input type="number" class="form-control" min="1" max="100" 
                   [ngModel]="count()" (ngModelChange)="onCountChange($event)">
          </div>
          <div class="col-6">
            <label class="form-label small fw-semibold">Type:</label>
            <select class="form-select" [ngModel]="type()" (ngModelChange)="onTypeChange($event)">
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>
        </div>

        <div class="mb-4">
          <div class="form-check form-switch mb-3">
            <input class="form-check-input" type="checkbox" id="startWithLorem" 
                   [ngModel]="startWithLorem()" (ngModelChange)="onStartWithLoremChange($event)">
            <label class="form-check-label small fw-semibold" for="startWithLorem">Start with "Lorem ipsum..."</label>
          </div>
        </div>

        <button class="btn btn-primary w-100 rounded-pill py-2 fw-semibold mb-3" (click)="generateText()">
          <i class="bi bi-file-text-fill me-2"></i>Generate Text
        </button>
      </div>

      <!-- Output Panel -->
      <div class="col-lg-7 border-start ps-lg-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <label class="form-label small fw-semibold mb-0">Generated Text Output:</label>
          <button class="btn btn-link btn-sm p-0 text-decoration-none text-secondary" (click)="clearAll()">
            <i class="bi bi-trash3 me-1"></i>Clear
          </button>
        </div>

        <textarea class="form-control mb-3" rows="12" readonly
                  [value]="outputText()" 
                  placeholder="Generated placeholder text will appear here..."></textarea>

        <div class="d-flex gap-2">
          <app-copy-button class="flex-fill" [text]="outputText()"></app-copy-button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    textarea {
      font-size: 0.95rem;
      line-height: 1.6;
    }
  `]
})
export class LoremIpsumComponent implements OnInit {
  private toastService = inject(ToastService);

  count = signal<number>(3);
  type = signal<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  startWithLorem = signal<boolean>(true);
  outputText = signal<string>('');

  private readonly wordsList = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do',
    'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut',
    'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris',
    'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure',
    'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore',
    'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
    'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id',
    'est', 'laborum', 'et', 'harum', 'quidem', 'rerum', 'facilis', 'est', 'et', 'expedita',
    'distinctio', 'nam', 'libero', 'tempore', 'cum', 'soluta', 'nobis', 'est', 'eligendi',
    'optio', 'cumque', 'nihil', 'impedit', 'quo', 'minus', 'id', 'quod', 'maxime', 'placeat',
    'facere', 'possimus', 'omnis', 'voluptas', 'assumenda', 'est', 'omnis', 'dolor', 'repellendus',
    'temporibus', 'autem', 'quibusdam', 'et', 'aut', 'officiis', 'debitis', 'aut', 'rerum',
    'necessitatibus', 'saepe', 'eveniet', 'ut', 'et', 'voluptates', 'repudiandae', 'sint',
    'et', 'molestiae', 'non', 'recusandae', 'itaque', 'earum', 'rerum', 'hic', 'tenetur', 'a',
    'sapiente', 'delectus', 'ut', 'aut', 'reiciendis', 'voluptatibus', 'maiores', 'alias',
    'consequatur', 'aut', 'perferendis', 'doloribus', 'asperiores', 'repellat'
  ];

  ngOnInit() {
    this.generateText();
  }

  onCountChange(val: number) {
    this.count.set(val > 0 ? val : 1);
    this.generateText();
  }

  onTypeChange(val: 'paragraphs' | 'sentences' | 'words') {
    this.type.set(val);
    this.generateText();
  }

  onStartWithLoremChange(val: boolean) {
    this.startWithLorem.set(val);
    this.generateText();
  }

  generateText() {
    const count = this.count();
    const type = this.type();
    const start = this.startWithLorem();
    let result = '';

    if (type === 'words') {
      result = this.generateWords(count, start);
    } else if (type === 'sentences') {
      result = this.generateSentences(count, start);
    } else {
      result = this.generateParagraphs(count, start);
    }

    this.outputText.set(result);
  }

  private generateWords(numWords: number, startWithLorem: boolean): string {
    const words: string[] = [];
    if (startWithLorem) {
      const intro = ['lorem', 'ipsum', 'dolor', 'sit', 'amet'];
      for (let i = 0; i < Math.min(numWords, 5); i++) {
        words.push(intro[i]);
      }
    }
    while (words.length < numWords) {
      const idx = Math.floor(Math.random() * this.wordsList.length);
      words.push(this.wordsList[idx]);
    }
    return words.join(' ');
  }

  private generateSentences(numSentences: number, startWithLorem: boolean): string {
    const sentences: string[] = [];
    for (let i = 0; i < numSentences; i++) {
      let sentence = '';
      if (i === 0 && startWithLorem) {
        sentence = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
      } else {
        const sentenceLen = 6 + Math.floor(Math.random() * 10);
        const words = this.generateWords(sentenceLen, false).split(' ');
        words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
        sentence = words.join(' ');
      }
      sentences.push(sentence + '.');
    }
    return sentences.join(' ');
  }

  private generateParagraphs(numParagraphs: number, startWithLorem: boolean): string {
    const paragraphs: string[] = [];
    for (let i = 0; i < numParagraphs; i++) {
      const paragraphLen = 4 + Math.floor(Math.random() * 5);
      const isFirst = i === 0 && startWithLorem;
      paragraphs.push(this.generateSentences(paragraphLen, isFirst));
    }
    return paragraphs.join('\n\n');
  }

  clearAll() {
    this.outputText.set('');
  }
}
