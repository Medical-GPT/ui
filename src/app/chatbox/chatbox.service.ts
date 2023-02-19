import { Injectable } from '@angular/core';
import { Message } from './message';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatboxService {

	responses = new Subject<Message>();

	private socket: WebSocketSubject<{ message: string; }>;

	connect() {
		this.socket = webSocket(`ws://${environment.API}/ws`);
		this.socket.subscribe((response: any) => {
			this.respond(response);
		});
	}

	sendMessage(message: string) {
		this.socket.next({ message });
	}

	close() {
		this.socket.complete();
	}

	respond(data: { message: string; }) {
		const { message: text } = data;
		const message: Message = {
			sender: '',
			text,
			reply: false
		};
		this.responses.next(message);
	}
}
