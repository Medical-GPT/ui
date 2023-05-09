import { TestBed } from '@angular/core/testing';
import { ChatboxService } from './chatbox.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { SocketFactoryService } from '../utils/socket-factory.service';
import { of, Subject } from 'rxjs';

describe('ChatboxService', () => {
    let service: ChatboxService;
    let mockWebSocket: jasmine.SpyObj<WebSocketSubject<any>>;
    let fakeSocketFactory: jasmine.SpyObj<SocketFactoryService>;

    beforeEach(() => {
        fakeSocketFactory = jasmine.createSpyObj(SocketFactoryService, [
            'makeSocket',
        ]);
        mockWebSocket = jasmine.createSpyObj<WebSocketSubject<any>>(
            'WebSocketSubject',
            ['subscribe', 'next', 'complete']
        );

        fakeSocketFactory.makeSocket.and.returnValue(mockWebSocket);

        TestBed.configureTestingModule({
            providers: [
                { provide: SocketFactoryService, useValue: fakeSocketFactory },
            ],
        });
        service = TestBed.inject(ChatboxService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should send a message', () => {
        const message = 'Test message';
        const model = 'Test model';

        service.sendMessage(message, model);

        expect(mockWebSocket.next).toHaveBeenCalledWith({ message, model });
    });

    it('should close the socket', () => {
        service.close();

        expect(mockWebSocket.complete).toHaveBeenCalled();
    });

    it('should respond with a message', (done) => {
        const message = 'Test message';
        service.responses.subscribe((text) => {
            expect(text).toEqual(message);
            done();
        });

        service.respond({ message });
    });
});
