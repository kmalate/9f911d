
import { BlueprintGraph } from '../types/BlueprintGraph';
import Form  from './Form'

export default function FormsList({blueprintGraph, onNodeClick, show}:
{blueprintGraph : BlueprintGraph, onNodeClick: any, show: boolean}) {
    if (show && blueprintGraph && blueprintGraph.nodes && blueprintGraph.nodes.length > 0) {
        const listItems = blueprintGraph.nodes.map(n => 
            <div className="row" key={n.id}>
                <Form node={n} onButtonClick={() => onNodeClick(n.id)} />
            </div>
        );
         return (            
            <div className="container">
                {listItems}
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }
}