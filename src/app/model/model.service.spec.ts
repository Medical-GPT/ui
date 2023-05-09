import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModelService } from './model.service';
import { environment } from 'src/environments/environment';

describe('ModelService', () => {
    let service: ModelService;
    let httpTestingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ModelService],
        });

        service = TestBed.inject(ModelService);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify(); // Verify that no unmatched requests are outstanding
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch models', () => {
        const mockModels = [
            { model: 'ModelA', alias: 'AliasA' },
            { model: 'ModelB', alias: 'AliasB' },
        ];

        service.fetchModels().subscribe((response) => {
            expect(response).toBe(true);
            expect(service.getModels()).toEqual(mockModels);
        });

        const req = httpTestingController.expectOne(`http://${environment.API}/models`);
        expect(req.request.method).toEqual('GET');
        req.flush(mockModels);
    });

    it('should handle fetch models timeout', () => {
        service.fetchModels().subscribe((response) => {
            expect(response).toBe(true);
            expect(service.getModels()).toEqual([]);
        });

        const req = httpTestingController.expectOne(`http://${environment.API}/models`);
        expect(req.request.method).toEqual('GET');
        req.error(new ErrorEvent('timeout'), { status: 0, statusText: 'Timeout' });
    });

    it('should return true if models are fetched', () => {
        const mockModels = [
            { model: 'ModelA', alias: 'AliasA' },
            { model: 'ModelB', alias: 'AliasB' },
        ];

        expect(service.hasModels()).toBe(false);

        service.fetchModels().subscribe(() => {
            expect(service.hasModels()).toBe(true);
        });

        const req = httpTestingController.expectOne(`http://${environment.API}/models`);
        req.flush(mockModels);
    });

    it('should return model info if model exists', () => {
        const mockModels = [
            { model: 'ModelA', alias: 'AliasA' },
            { model: 'ModelB', alias: 'AliasB' },
        ];

        service.fetchModels().subscribe(() => {
            const modelInfo = service.getModelInfo('ModelA');
            expect(modelInfo).toEqual({
                name: 'ModelA',
                alias: 'AliasA',
                color: 'info',
            });
        });

        const req = httpTestingController.expectOne(`http://${environment.API}/models`);
        req.flush(mockModels);
    });

    it('should throw an error if model does not exist', () => {
        const mockModels = [
            { model: 'ModelA', alias: 'AliasA' },
            { model: 'ModelB', alias: 'AliasB' },
        ];

        service.fetchModels().subscribe(() => {
            expect(() => {
                service.getModelInfo('ModelC');
            }).toThrow(new Error('Model not found'));
        });

        const req = httpTestingController.expectOne(`http://${environment.API}/models`);
        req.flush(mockModels);
    });
});