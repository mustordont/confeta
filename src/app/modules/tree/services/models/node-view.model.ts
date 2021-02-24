import {NodeKind} from '../../../api/models/node-kind';
import {NodeView} from '../../../api/models/node-view';

export type CommonValueType<R = number | boolean | string> = R | Array<R>;

export interface INodeIn {
    comment: string;
    description?: string;
    kind: NodeKind;
    name: string;
    parent_id?: number;
    value?: CommonValueType;
}

type Modify<T, R> = Omit<T, keyof R> & R;
type NodeViewType = Modify<NodeView, {has_children?: boolean, children: NodeViewModel[], created_at: Date, modified_at: Date | undefined}>;

export class NodeViewModel implements NodeViewType {
    public readonly description?: string;
    public readonly kind: NodeKind;
    public readonly name: string;
    public readonly parent_id?: number;
    private _value?: CommonValueType;
    public get value(): CommonValueType | undefined {
        return this._value;
    }

    public readonly children: NodeViewModel[] = [];
    public readonly created_at: Date;
    public readonly id: number;
    public readonly modified_at: Date | undefined;
    public readonly version: number;
    public readonly path: string;

    constructor(
        data: NodeView,
    ) {
        this.description = data.description;
        this.kind = NodeKind[this._capitalizeFirstLetter(data.kind) as keyof typeof NodeKind];
        this.name = data.name;
        this.parent_id = data.parent_id;
        this._value = data.value;

        if (Array.isArray(data.children)) {
            this.children = data.children.map(i => new NodeViewModel(i));
        }
        this.created_at = new Date(data.created_at);
        this.id = data.id;
        if (data.modified_at) {
            this.modified_at = new Date(data.modified_at);
        }
        this.version = data.version;
        this.path = data.path;
    }

    private _capitalizeFirstLetter(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    public getNodeIn(): Omit<INodeIn, 'comment'> {
        return {
            name: this.name,
            description: this.description,
            parent_id: this.parent_id,
            kind: this.kind,
            value: this._value,
        };
    }
}
