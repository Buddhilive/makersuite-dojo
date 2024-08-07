import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../chat.service';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `<div class="medibot__container">
  <div class="medibot__header">
    <h1>Medibot</h1>
  </div>
  <div class="medibot__chat">
    <div
      *ngFor="let msg of responses"
      [ngClass]="'medibot__chat--' + msg.author"
    >
      {{ msg.content }}
    </div>
    <ng-container *ngIf="isBotThinking">
      <div class="medibot__chat--bot medibot--typing">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
    </ng-container>
  </div>
  <div class="medibot__sender">
    <input type="text" [(ngModel)]="inputValue" #msgInput />
    <button (click)="getResponse()"><i class="pi pi-send"></i></button>
  </div>
</div>
`,
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
    this.fromChatService(this.inputValue);
    this.inputValue = '';
  }

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
}