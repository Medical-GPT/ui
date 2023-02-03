import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox.component';
import { NbChatModule } from '@nebular/theme';
import { NbPopoverModule } from '@nebular/theme';

@NgModule({
	declarations: [
		ChatboxComponent
	],
	imports: [
		CommonModule,
		NbChatModule,
		NbPopoverModule
	],
	exports: [
		ChatboxComponent
	]
})
export class ChatboxModule { }
