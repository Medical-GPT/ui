import { Component } from '@angular/core';
import { Message } from './message';
@Component({
	selector: 'app-chatbox',
	templateUrl: './chatbox.component.html',
	styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {

	messages: Message[] = [{
		text: "What is up",
		sender: "GPT GP",
		reply: false,
	}
	];

	sendMessage(event: { message: string }) {
		const newMessage: Message = {
			text: event.message,
			sender: "You",
			reply: !this.messages[this.messages.length - 1]?.reply,
		}

		this.messages.push(newMessage)
	}

}
