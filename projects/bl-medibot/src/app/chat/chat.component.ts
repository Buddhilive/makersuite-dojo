import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';
import { HttpClient } from '@angular/common/http';
import { my_api_key } from 'temp/api-key';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('msgInput') msgInput!: ElementRef;
  inputValue!: string;
  responses: Array<any> = [];
  isBotThinking: boolean = false;

  constructor(private chatService: ChatService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  getResponse() {
    this.isBotThinking = true;
    this.responses.push({content: this.inputValue, author: 'user'});
    // this.fromChatService(this.inputValue);
    this.fromLocalService(this.inputValue);
    this.inputValue = '';
  }

  /**
   * Fetch from Google APIs directly in production
   * @param inputValue 
   */
  fromChatService(inputVal: string) {
    this.chatService.getChatResponse(inputVal).subscribe(
      (val: any) => {
        const msgItem = {
          content: val[0]?.candidates[0]?.content,
          author: 'bot'
        }
        this.responses.push(msgItem);
        console.log(val);
        this.isBotThinking = false;
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
  fromLocalService(inputVal: string) {
    this.httpClient.post('http://localhost:3000/post', {
      text: inputVal,
      api_key: my_api_key
    }).subscribe(
      (val: any) => {
        const msgItem = {
          content: val[0]?.candidates[0]?.content,
          author: 'bot'
        }
        this.responses.push(msgItem);
        console.log(val);
        this.isBotThinking = false;
      },
      response => {
        console.log(response);
      }
    );
  }
}
