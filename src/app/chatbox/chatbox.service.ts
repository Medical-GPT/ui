import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class ChatboxService {

	responses = new Subject<string>();

	private socket: WebSocketSubject<{ message: string; model: string; }>;

	constructor() {
		this.socket = webSocket(`ws://${environment.API}/session`);
		this.socket.subscribe((response: any) => {
			this.respond(response);
		});
	}

	sendMessage(message: string, model: string) {
		this.socket.next({ message, model });
	}

	close() {
		this.socket.complete();
	}

	respond(data: { message: string; }) {
		const { message: text } = data;
		this.responses.next(text);
	}
}
