import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { timeout, catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ModelService {

	private colorMap: string[] = ['info', 'danger', 'warning', 'success'];
	private models: { model: string; alias: string; }[] | [] = [];

	constructor(private http: HttpClient) { }

	fetchModels(): Observable<any> {
		return this.http
			.get(`http://${environment.API}/models`)
			.pipe(
				timeout(5000), // Set a timeout of 5 seconds
				catchError(error => {
					if (error.name === 'TimeoutError') {
						console.log('Request timed out!');
					}
					return of([]);
				})
			)
			.pipe(map((response: any) => {
				this.models = response;
				return true;
			}));
	}

	hasModels(): boolean {
		return this.models.length > 0;
	}

	getModels(): { model: string; alias: string; }[] | [] {
		return this.models;
	}

	getModelInfo(modelName: string): { name: string, alias: string; color: string; } | null {

		if (this.models.length === 0) {
			return null; // Redirect to 404
		}
		const modelIndex = this.models.findIndex(modelInfo => modelInfo?.model === modelName);
		if (modelIndex === -1) {
			throw new Error('Model not found'); // REDIRECT to 404
		}

		const model = this.models[modelIndex];

		const modelInfo = {
			name: model.model,
			alias: model.alias,
			color: this.colorMap[modelIndex % this.colorMap.length]
		};

		return modelInfo;
	}
}
