import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {ConfirmModalComponent} from '@modules/core';
import {Observable, Subject} from 'rxjs';
import {filter, startWith, switchMap, tap} from 'rxjs/operators';
import {NodeViewModel, TreeModelService} from '../../services';
import {EditNodeComponent} from './edit-node/edit-node.component';

@Component({
    selector: 'app-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent implements OnInit {

    public refresh$: Subject<void> = new Subject<void>();
    public displayedColumns: string[] = ['id', 'kind', 'name', 'description', 'value', 'version', 'created', 'updated', 'actions'];
    public data$: Observable<NodeViewModel[]> = this.refresh$
        .pipe(
            startWith(null),
            switchMap(() => this._treeService.getNode(this._route.snapshot.paramMap.get('path'))),
        );

    constructor(
        private _treeService: TreeModelService,
        private _dialog: MatDialog,
        private _route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
    }

    public editNode(node = null): void {
        this._dialog.open(EditNodeComponent, {
            data: {
                node,
            }
        })
            .afterClosed()
            .pipe(
                filter(Boolean),
                tap(() => this.refresh$.next()),
            )
            .subscribe();
    }

    public delete(item: NodeViewModel): void {
        this._dialog.open(ConfirmModalComponent, {
            data: {
                title: 'Delete node',
                content: `Are you sure to delete ${item.name}?`,
            }
        })
            .afterClosed()
            .pipe(
                filter(Boolean),
                switchMap(() => this._treeService.delete(item.id, 'Delete')),
                tap(() => this.refresh$.next()),
            )
            .subscribe();
    }
}
