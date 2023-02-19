import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from './message';
import { ChatboxService } from './chatbox.service';
import { ViewChild } from '@angular/core';
import { NbPopoverDirective } from '@nebular/theme';

@Component({
	selector: 'app-chatbox',
	templateUrl: './chatbox.component.html',
	styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit, OnDestroy {

	messages: Message[] = [GREETINGS_MESSAGE];
	inputText: string;
	popoverTimeout: any;
	@ViewChild(NbPopoverDirective) popover: NbPopoverDirective;

	constructor(private chatboxService: ChatboxService) { }

	ngOnInit(): void {

		this.chatboxService.connect();

		this.chatboxService.responses.subscribe((message: Message) => {
			this.messages.push(message);
		});
	}

	sendMessage(event: { message: string; }): void {
		const newMessage: Message = {
			text: event.message,
			sender: "You",
			reply: true
		};

		this.messages.push(newMessage);
		this.chatboxService.sendMessage(event.message);
	}

	ngOnDestroy(): void {
		this.chatboxService.close();
	}
}

const GREETINGS_MESSAGE: Message = {
	text: "Hi! How may I help today?",
	sender: "GPT GP",
	reply: false,
};