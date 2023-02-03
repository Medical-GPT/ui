import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatboxModule } from './chatbox/chatbox.module';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ChatboxModule,
		BrowserAnimationsModule,
		NbThemeModule.forRoot({ name: 'cosmic' }),
		NbLayoutModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
