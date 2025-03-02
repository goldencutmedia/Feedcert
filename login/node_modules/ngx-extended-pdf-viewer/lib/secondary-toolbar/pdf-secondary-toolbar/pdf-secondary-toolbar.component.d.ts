import { OnInit, EventEmitter, OnChanges, SimpleChanges, TemplateRef, ElementRef, AfterViewInit } from '@angular/core';
export declare class PdfSecondaryToolbarComponent implements OnInit, OnChanges, AfterViewInit {
    private element;
    customSecondaryToolbar: TemplateRef<any>;
    secondaryToolbarTop: any;
    mobileFriendlyZoomScale: number;
    showPresentationModeButton: boolean;
    showOpenFileButton: boolean;
    showPrintButton: boolean;
    showDownloadButton: boolean;
    showBookmarkButton: boolean;
    showPagingButtons: boolean;
    showRotateButton: boolean;
    showHandToolButton: boolean;
    showScrollingButton: boolean;
    showSpreadButton: boolean;
    showPropertiesButton: boolean;
    spreadChange: EventEmitter<string>;
    secondaryMenuIsEmpty: EventEmitter<boolean>;
    constructor(element: ElementRef);
    onSpreadChange(newSpread: string): void;
    ngOnChanges(changes: SimpleChanges): void;
    onResize(): void;
    ngAfterViewInit(): void;
    ngOnInit(): void;
    checkVisibility(): void;
    private checkVisibilityRecursively;
}
