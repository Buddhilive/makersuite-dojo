import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-copilot',
  template: `<button (click)="toggleCopilot()">Open Panel</button>

  <div class="copilot" #copilot>
    <div class="copilot__header">
      <h3 class="copilot__title">Copilot</h3>
      <div class="copilot__top-actions">
        <button class="copilot__btn" (click)="toggleCopilot()">
          <span class="material-icons">close</span>
        </button>
      </div>
    </div>
  
    <div class="copilot__body">
      <div class="copilot__response"></div>
      <div class="copilot__footer">
        <p class="copilot__input" [contentEditable]="true"></p>
        <div class="copilot__msg-actions">
          <button class="copilot__btn">
            <span class="material-icons">send</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./copilot.component.scss']
})
export class CopilotComponent {
  @ViewChild('copilot') copilot!: ElementRef<HTMLDivElement>;
  
  toggleCopilot() {
    this.copilot.nativeElement.classList.toggle('copilot--show');
  }
}
