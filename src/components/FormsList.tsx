
import { BlueprintGraph } from '../types/BlueprintGraph';
import Form  from './Form'

export default function FormsList({blueprintGraph, onNodeClick}:
{blueprintGraph : BlueprintGraph, onNodeClick: any}) {
    if (blueprintGraph && blueprintGraph.nodes && blueprintGraph.nodes.length > 0) {
        const listItems = blueprintGraph.nodes.map(n => 
            <li key={n.id}>
                <Form node={n} onButtonClick={() => onNodeClick(n.id)} />
            </li>
        );
         return (
            <ul>{listItems}</ul>
        );
    } else {
        return (
            <div></div>
        )
    }
}