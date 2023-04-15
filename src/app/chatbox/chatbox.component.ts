import { Component, OnDestroy, OnInit } from '@angular/core';
import { Message } from './message';
import { ChatboxService } from './chatbox.service';
import { ModelService } from '../model/model.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-chatbox',
	templateUrl: './chatbox.component.html'
})
export class ChatboxComponent implements OnInit, OnDestroy {

	messages: Message[] = [];
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
			this.messages = [greetingsMessage(this.modelInfo.alias, this.modelInfo.color)];
			this.inputText = '';
		});

		this.chatboxService.responses.subscribe((messageText: string) => {
			const newMessage: Message = {
				text: messageText,
				user: {
					name: this.modelInfo.alias,
					avatar: `assets/${this.modelInfo.color}.png`
				},
				reply: false
			};
			this.messages.push(newMessage);
		});
	}

	sendMessage(event: { message: string; }): void {
		const newMessage: Message = {
			text: event.message,
			user: {
				name: "You",
				avatar: ""
			},
			reply: true
		};

		this.messages.push(newMessage);
		this.chatboxService.sendMessage(event.message, this.modelInfo.name);
	}

	ngOnDestroy(): void {
		this.chatboxService.close();
	}
}

function greetingsMessage(chatbotName: string, avatar: string): Message {
	return {
		text: "Hi! How may I help today?",
		user: {
			name: chatbotName,
			avatar: `assets/${avatar}.png`
		},
		reply: false,
	};
}