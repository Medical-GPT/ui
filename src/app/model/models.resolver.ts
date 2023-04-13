import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ModelService } from './model.service';
import { tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class ModelsResolver implements Resolve<boolean> {
	constructor(private modelService: ModelService) { }

	resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		if (this.modelService.hasModels()) {
			// If models have already been fetched, return true
			return of(true);
		}

		// Fetch models if not already fetched
		return this.modelService.fetchModels().pipe(tap(() => true));
	}
}

