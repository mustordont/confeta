import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import {NodeOut} from '../../api/models/node-out';
import {NodeView} from '../../api/models/node-view';
import {TreeService} from '../../api/services/tree.service';
import {INodeIn, NodeViewModel} from './models';

@Injectable({
    providedIn: 'root'
})
export class TreeModelService {

    constructor(
        private _treeService: TreeService,
    ) {
    }

    public getRootTree(): Observable<NodeViewModel[]> {
        return this._treeService.rootTreeGet()
            .pipe(
                map((data) => data.map(i => new NodeViewModel(i))),
            );
    }

    public getNode(path: string | null = null): Observable<NodeViewModel[]> {
        return of(path)
            .pipe(
                switchMap((node_path: string | null) => !!node_path ?
                    this._treeService.viewNodeByPathTreeNodePathGet({node_path})
                        .pipe(
                            map((data: NodeView) => (new NodeViewModel(data)).children),
                        )
                    : this._treeService.rootTreeGet()
                        .pipe(
                            map((data: NodeView[]) => data.map(i => new NodeViewModel(i))),
                        )
                ),
            );
    }

    public make(body: INodeIn): Observable<NodeOut> {
        return this._treeService.createNodeTreePost({body});
    }

    public update(node_id: number, body: INodeIn): Observable<NodeOut> {
        return this._treeService.updateNodeTreeNodeIdPut({node_id, body});
    }

    public delete(node_id: number, comment: string): Observable<void> {
        return this._treeService.disableNodeTreeNodeIdDelete({node_id, body: {comment}});
    }
}
