import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  responses: Array<any> = [];

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    
  }

  getResponse(input: HTMLInputElement) {
    const inputValue = input.value;

    this.chatService.getChatResponse(inputValue).subscribe(
      (val) => {
        this.responses.push(val);
        console.log(val);
      },
      response => {
        console.log("POST call in error", response);
      },
      () => {
        console.log("The POST observable is now completed.");
      }
    );
  }
}
