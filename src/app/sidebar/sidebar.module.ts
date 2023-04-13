import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbListModule, NbButtonModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { SidebarComponent } from './sidebar.component';

@NgModule({
	declarations: [
		SidebarComponent,
	],
	imports: [
		CommonModule,
		NbCardModule,
		NbListModule,
		NbButtonModule,
		NbMenuModule.forRoot(),
		NbSidebarModule.forRoot(),
	],
	exports: [SidebarComponent],
})
export class SidebarModule { }
