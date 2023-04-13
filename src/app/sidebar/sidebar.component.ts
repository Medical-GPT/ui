import { Component, OnInit } from '@angular/core';
import { ModelService } from '../model/model.service';
import { NbMenuItem, NbMenuService } from '@nebular/theme';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
	models: { model: string; alias: string; }[] = [];
	colorMap: string[] = ['primary', 'alert', 'warning', 'info'];
	homeButton: NbMenuItem = { title: 'Home', link: '/' };
	menuItems: NbMenuItem[] = [{
		title: 'Home',
		link: '/',
	}, {
		title: 'Models',
		expanded: true,
		children: []
	}];

	constructor(private modelService: ModelService, private menuService: NbMenuService) { }

	ngOnInit(): void {
		this.models = this.modelService.getModels();
		this.menuItems[1].children = this.models.map((model, index) => ({
			title: model.alias,
			link: `/model/${model.model}`,
		}));
	};
}
