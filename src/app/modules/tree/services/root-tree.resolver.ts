import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {NodeViewModel} from './models';
import {TreeModelService} from './tree-model.service';

@Injectable({
    providedIn: 'root'
})
export class RootTreeResolver implements Resolve<NodeViewModel[]> {
    constructor(
        private _treeModelService: TreeModelService,
    ) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<NodeViewModel[]> {
        return this._treeModelService.getRootTree();
    }
}
