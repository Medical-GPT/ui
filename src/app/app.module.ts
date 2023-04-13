import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatboxModule } from './chatbox/chatbox.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { NbThemeModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';
import { HttpClientModule } from '@angular/common/http';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomepageModule } from './homepage/homepage.module';

@NgModule({
	declarations: [
		AppComponent,
		MainLayoutComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ChatboxModule,
		HomepageModule,
		SidebarModule,
		BrowserAnimationsModule,
		NbThemeModule.forRoot({ name: 'dark' }),
		NbSidebarModule.forRoot(),
		NbLayoutModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
