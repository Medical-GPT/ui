import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatboxComponent } from './chatbox.component';
import { NbChatModule, NbSpinnerModule } from '@nebular/theme';


@NgModule({
  declarations: [
    ChatboxComponent
  ],
  imports: [
    CommonModule,
    NbChatModule,
    NbSpinnerModule,
  ],
  exports: [
    ChatboxComponent
  ]
})
export class ChatboxModule { }
