import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message, CHATBOT_NAME } from './message';
import { ChatboxService } from './chatbox.service';
import { ModelService } from '../model/model.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-chatbox',
	templateUrl: './chatbox.component.html'
})
export class ChatboxComponent implements OnInit, OnDestroy {

	messages: Message[] = [GREETINGS_MESSAGE];
	inputText: string;

	modelInfo: { name: string; alias: string; color: string; } = {
		name: 'medical',
		alias: 'Medical',
		color: 'primary'
	};

	constructor(
		private route: ActivatedRoute,
		private chatboxService: ChatboxService,
		private modelService: ModelService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe((params) => {
			const result = this.modelService.getModelInfo(params['modelName']);
			if (result) {
				this.modelInfo = result;
			}
			this.messages = [GREETINGS_MESSAGE];
			this.inputText = '';
		});

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
	sender: CHATBOT_NAME,
	reply: false,
};