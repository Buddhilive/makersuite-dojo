import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';
import { HttpClient } from '@angular/common/http';
import { my_api_key } from 'temp/api-key';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  responses: Array<any> = [];

  constructor(private chatService: ChatService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  getResponse(input: HTMLInputElement) {
    const inputValue = input.value;

    // this.fromChatService(inputValue);
    this.fromLocalService(inputValue);
  }

  /**
   * Fetch from Google APIs directly in production
   * @param inputValue 
   */
  fromChatService(inputValue: string) {
    this.chatService.getChatResponse(inputValue).subscribe(
      (val) => {
        this.responses.push(val);
        console.log(val);
      },
      response => {
        console.log(response);
      }
    );
  }

  /**
   * Fetch from local service
   * @param inputValue 
   */
  fromLocalService(inputValue: string) {
    this.httpClient.post('http://localhost:3000/post', {
      text: inputValue,
      api_key: my_api_key
    }).subscribe(
      (val) => {
        this.responses.push(val);
        console.log(val);
      },
      response => {
        console.log(response);
      }
    );
  }
}
