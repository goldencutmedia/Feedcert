import { EventEmitter } from '@angular/core';
export declare class PdfZoomToolbarComponent {
    showZoomButtons: boolean;
    zoomChange: EventEmitter<string | number>;
    emitZoomChange(event: string | number | undefined): void;
}
