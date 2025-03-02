import { OnInit, EventEmitter } from '@angular/core';
export declare class PdfZoomDropdownComponent implements OnInit {
    sizeSelector: any;
    zoomChange: EventEmitter<string | number>;
    constructor();
    ngOnInit(): void;
    emitZoomChange(): void;
}
