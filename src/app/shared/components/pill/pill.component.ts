import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
    selector: 'app-pill',
    standalone: true,
    templateUrl: './pill.component.html',
    styleUrls: [
        './pill.component.css',
    ]
})
export class PillComponent{
    @Input()
    public pillText: string = "Placeholder";

    @Output()
    public onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

    constructor() { }

    clickResponse(evt: MouseEvent){
        this.onClick.emit(evt);
    }
}