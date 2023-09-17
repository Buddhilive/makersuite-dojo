import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  API_HEADERS: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  });
  BASE_URL = "http://localhost:3000/";

  constructor(private httpService: HttpClient) { }

  getChatResponse(message: string) {
    
    const REST_URL = `${this.BASE_URL}/chat`;

    const CHAT_REQUEST = {
      text: message
    };

    const chatResponse = this.httpService.post(REST_URL, CHAT_REQUEST, {
      headers: this.API_HEADERS,
    });

    return chatResponse;
  }
};
