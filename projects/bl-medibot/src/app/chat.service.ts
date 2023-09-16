import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { my_api_key } from 'temp/api-key';
import { ChatRequestInterface } from './shared/chat.interface';
import { SAMPLE_CONTEXT, SAMPLE_PROMPTS } from './shared/chat-samples';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  API_HEADERS: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*'
  });
  BASE_URL = "https://generativelanguage.googleapis.com/";
  API_VERSION = 'v1beta2';
  MODEL = 'chat-bison-001';
  API_KEY = my_api_key; // Replace with your API key

  constructor(private httpService: HttpClient) { }

  getChatResponse(message: string) {
    
    const REST_URL = `${this.BASE_URL}${this.API_VERSION}/models/${this.MODEL}:generateMessage?key=${this.API_KEY}`;

    const CHAT_REQUEST: ChatRequestInterface = {
      context: SAMPLE_CONTEXT,
      examples: SAMPLE_PROMPTS,
      messages: [
        {
          content: message
        }
      ],
      // optional, 0.0 always uses the highest-probability result
      temperature: 0.25,
      // optional, how many candidate results to generate
      candidate_cunt: 1,
      // optional, number of most probable tokens to consider for generation
      top_k: 40,
      // optional, for nucleus sampling decoding strategy
      top_p: 0.95,
    };

    const chatResponse = this.httpService.post(REST_URL, {prompt: CHAT_REQUEST}, {
      headers: this.API_HEADERS,
    });

    return chatResponse;
  }
};
