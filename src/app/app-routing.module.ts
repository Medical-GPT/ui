import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { ModelsResolver } from './model/models.resolver';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
	{
		path: '',
		component: MainLayoutComponent,
		resolve: { models: ModelsResolver },
		children: [
			{ path: '', redirectTo: '', pathMatch: 'full', component: HomepageComponent }, // Add a fallback route
			{ path: 'model/:modelName', component: ChatboxComponent },
		],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }
