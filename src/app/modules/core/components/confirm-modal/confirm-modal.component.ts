import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmModalComponent implements AfterViewInit {
    @ViewChild('confirm') confirmButton!: MatButton;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: {
            title: string;
            content: string;
        },
    ) {
    }

    ngAfterViewInit(): void {
        // this.confirmButton.focus();
    }
}
