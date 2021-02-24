import {ChangeDetectionStrategy, Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {fadeTransition} from '@modules/core';
import { of } from 'rxjs';
import {finalize, switchMap, tap} from 'rxjs/operators';
import {NodeKind} from '../../../../api/models';
import {TreeModelService, NodeViewModel, CommonValueType} from '../../../services';

export const DEFAULT_ANIMATION = '0.5s cubic-bezier(0.66, 0.0, 0.34, 1)';

@Component({
    selector: 'app-edit-node',
    templateUrl: './edit-node.component.html',
    styleUrls: ['./edit-node.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        fadeTransition
    ]
})
export class EditNodeComponent implements OnInit {
    public kinds: typeof NodeKind = NodeKind;

    @Input() item?: NodeViewModel;

    form: FormGroup = new FormGroup({
        comment: new FormControl('', Validators.required),
        description: new FormControl(''),
        kind: new FormControl(null, Validators.required),
        name: new FormControl('', Validators.required),
        value: new FormControl(null, this._valueValidator),
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) @Optional() dialogData: {
            node: NodeViewModel;
        },
        private _service: TreeModelService,
        private _dialogRef: MatDialogRef<EditNodeComponent>,
    ) {
        if (dialogData) {
            this.item = dialogData.node;
        }
    }

    ngOnInit(): void {
        this.form.patchValue({...this.item});
    }

    public get title(): string {
        return this.item ? `Edit ${this.item.name} node` : `Make new node`;
    }

    public save(): void {
        this.form.disable();
        let {value, ...node} = this.form.getRawValue();
        switch (this.form.get('kind')?.value) {
            case NodeKind.Section:
                value = null;
                break;
            case NodeKind.Boolean:
                value = Boolean(value);
                break;
            case NodeKind.Array:
                value = value.split(',');
                break;
        }
        if (value !== null) {
            node.value = value;
        }
        of(this.item?.id)
            .pipe(
                switchMap((id) =>
                    id ? this._service.update(id, node)
                        : this._service.make(node)
                ),
                tap((result) => this._dialogRef.close(result)),
                finalize(() => this.form.enable()),
            )
            .subscribe();
    }

    private _valueValidator(): ValidatorFn {
        return (control: AbstractControl): {[key: string]: any} | null => {
            const value: CommonValueType = control?.value;
            let error;
            switch (this.form?.get('kind')?.value) {
                case NodeKind.Section:
                    error = null;
                    break;
                default:
                    error = String(value).length >= 1;
                    break;
            }
            return error ? {value: control.value} : null;
        };
    }
}
