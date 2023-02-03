import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
import { Subject } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class ChatboxService {
	constructor(private http: HttpClient) { }

	responses: Subject<Message> = new Subject<Message>();

	sendMessage(message: string): void {
		this.http
			.post('http://localhost:3000/message', { message })
			.subscribe(this.respond);
	}

	respond(data: any) {
		const { text } = data;
		const message: Message = {
			sender: '',
			text,
			reply: false
		};

		this.responses.next(message);
	}

	mockIndex: number = 0;
	mockResponse() {
		console.log(setTimeout(() => this.respond(MOCK_RESPONSES[this.mockIndex]), 1000));
		this.mockIndex = (this.mockIndex + 1) % MOCK_RESPONSES.length;
	}
}

const MOCK_RESPONSES: { text: string; }[] = [
	{ text: 'I think you will be okay' },
	{ text: 'I am sorry to hear that!' },
	{ text: 'It is probably best to talk to an expert for this matter.' },
	{ text: 'Have a nice day!' }
];