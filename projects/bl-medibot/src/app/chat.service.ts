import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private httpService: HttpClient) { }

  getChatResponse(message: string) {
    const chatResponse = this.httpService.post('http://localhost:3000/post', {text: message});

    return chatResponse;
  }
};
