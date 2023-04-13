import { Injectable } from '@angular/core';
import { Message, CHATBOT_NAME } from './message';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatboxService {

	responses = new Subject<Message>();

	private socket: WebSocketSubject<{ message: string; model: string; }>;

	constructor() {
		this.socket = webSocket(`ws://${environment.API}/session`);
		this.socket.subscribe((response: any) => {
			this.respond(response);
		});
	}

	sendMessage(message: string, model: string = 'medical-finetuned') {
		this.socket.next({ message, model });
	}

	close() {
		this.socket.complete();
	}

	respond(data: { message: string; }) {
		const { message: text } = data;
		const message: Message = {
			sender: CHATBOT_NAME,
			text,
			reply: false
		};
		this.responses.next(message);
	}
}
