import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
    providedIn: 'root'
})
export class SocketFactoryService {
    constructor() { }

    public makeSocket<T>(urlConfigOrSource: string): WebSocketSubject<T> {
        return webSocket<T>(urlConfigOrSource);
    }
}
