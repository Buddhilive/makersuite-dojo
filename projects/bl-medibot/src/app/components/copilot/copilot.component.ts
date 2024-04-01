import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-copilot',
  templateUrl: './copilot.component.html',
  styleUrls: ['./copilot.component.scss']
})
export class CopilotComponent {
  @ViewChild('sidepanel') sidepanel!: ElementRef<HTMLDivElement>;

  openNav() {
    this.sidepanel.nativeElement.classList.toggle('show');
  }
}
