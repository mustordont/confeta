import {NgModule} from '@angular/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import { TreeComponent } from './components/tree/tree.component';
import { EditNodeComponent } from './components/tree/edit-node/edit-node.component';

const routes: Routes = [
    {
        path: '',
        component: TreeComponent,
    },
    {
        path: ':path',
        component: TreeComponent,
    }
];

@NgModule({
    declarations: [
        TreeComponent,
        EditNodeComponent,
    ],
    imports: [
        RouterModule.forChild(routes),
        SharedModule,
        MatTableModule,
        MatSelectModule,
        MatCheckboxModule,
        MatToolbarModule,
    ]
})
export class TreeModule {
}
