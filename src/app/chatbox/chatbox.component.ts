import { Component } from '@angular/core';
import { Message } from './message';
import { ChatboxState } from './chatboxState';

@Component({
	selector: 'app-chatbox',
	templateUrl: './chatbox.component.html',
	styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent {
	messages: Message[] = [
		{
			text: "What is up",
			sender: "GPT GP",
			reply: false,
		}
	];

	state: ChatboxState = PRIMARY_STATE;
	loading: boolean = false;

	sendMessage(event: { message: string }) {
		const newMessage: Message = {
			text: event.message,
			sender: "You",
			reply: !this.messages[this.messages.length - 1]?.reply,
		}
		this.state = this.state === PRIMARY_STATE ? LOADING_STATE : PRIMARY_STATE
		this.messages.push(newMessage)
	}

	respond() {
		this.state = this.state === PRIMARY_STATE ? LOADING_STATE : PRIMARY_STATE
	}
}

const PRIMARY_STATE: ChatboxState = {
	theme: 'primary',
	placeholderText: 'Enter a message',
	loading: false
}

const LOADING_STATE: ChatboxState = {
	theme: 'warning',
	placeholderText: 'I am looking into it. Please give me a second...',
	loading: true
}