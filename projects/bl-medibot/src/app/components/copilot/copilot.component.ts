import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.scss']
})
export class CopilotComponent {
  @ViewChild('copilot') copilot!: ElementRef<HTMLDivElement>;
  
  toggleCopilot() {
    this.copilot.nativeElement.classList.toggle('copilot--show');
  }
}
