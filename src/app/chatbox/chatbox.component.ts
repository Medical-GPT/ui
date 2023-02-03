import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { ChatboxState } from './chatboxState';
import { ChatboxService } from './chatbox.service';

@Component({
	selector: 'app-chatbox',
	templateUrl: './chatbox.component.html',
	styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
	messages: Message[] = [GREETINGS_MESSAGE];

	state: ChatboxState = PRIMARY_STATE;

	constructor(private chatboxService: ChatboxService) { }

	ngOnInit(): void {
		this.chatboxService.responses.subscribe((message: Message) => {
			this.messages.push(message);
			this.state = PRIMARY_STATE;
		});
	}

	sendMessage(event: { message: string; }): void {
		const newMessage: Message = {
			text: event.message,
			sender: "You",
			reply: true
		};
		this.state = LOADING_STATE;
		this.messages.push(newMessage);
	}

	respond(): void {
		this.chatboxService.mockResponse();
	}
}

const GREETINGS_MESSAGE: Message = {
	text: "Hi! How may I help today?",
	sender: "GPT GP",
	reply: false,
};

const PRIMARY_STATE: ChatboxState = {
	theme: 'primary',
	placeholderText: 'Enter a message',
	loading: false
};

const LOADING_STATE: ChatboxState = {
	theme: 'warning',
	placeholderText: 'I am looking into it. Please give me a second...',
	loading: true
};