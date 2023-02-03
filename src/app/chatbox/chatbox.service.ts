import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './message';
import { Subject } from 'rxjs';
@Injectable({
	providedIn: 'root'
})
export class ChatboxService {

	responses = new Subject<Message>();

	constructor(private http: HttpClient) { }

	sendMessage(message: string): void {
		this.http
			.post('http://localhost:3000/message', { message })
			.subscribe((response) => this.respond(response));
	}

	respond(data: any) {
		const { message: text } = data;
		const message: Message = {
			sender: '',
			text,
			reply: false
		};
		this.responses.next(message);
	}
}
