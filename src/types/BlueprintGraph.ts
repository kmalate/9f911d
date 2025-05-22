import { Node } from './node'
import { Edge } from './edge';
import { Form } from './form';

export interface BlueprintGraph {
    nodes: Node[],
    edges: Edge[],
    forms: Form[]
}