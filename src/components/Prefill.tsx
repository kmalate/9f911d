import { BlueprintGraph } from "../types/BlueprintGraph";
import { Form } from "../types/form";
import { Node } from "../types/node";
import { PrefillMapping } from "../types/prefillmapping";

export default function Prefill({selectedForm, 
    blueprintGraph, prefillMapping, onPropertyClick, 
    onPropertyMapDeleteClick,onPreFillCloseClick}
:{selectedForm: string | undefined, 
    blueprintGraph: BlueprintGraph | undefined, 
    prefillMapping: PrefillMapping,
    onPropertyClick: any
    onPropertyMapDeleteClick: any
    onPreFillCloseClick: any}
) {
    let form: Form | undefined;
    let node: Node | undefined;
    let mapping: {[key:string]: { id: string, name: string, property: string}} = {};
    if (selectedForm && blueprintGraph) {
        node = blueprintGraph.nodes.find (n => n.id === selectedForm);
        if (node) {
            form = blueprintGraph.forms.find(f => f.id === node?.data.component_id);
        }

        mapping = prefillMapping[selectedForm];
    }

    if (form && node) {        
        const properties = Object.keys(form.field_schema.properties);
      
        const prefills = properties.map(p => 
                <div key={p}>
                    {(mapping && mapping[p]) ?
                    <div>{p}:{mapping[p].name}.{mapping[p].property} <button onClick={() => onPropertyMapDeleteClick(p)}>x</button></div>
                    :
                    <button type="button" className="btn btn-secondary"
                         onClick={() => onPropertyClick(p)}>{p}</button>
                    }
                </div>
        );
        return (
            <div className="container">
                <div className="row">
                    <div className="col">{node.data.name}</div>
                    <div className="col">
                        <button type="button" className="close" 
                            onClick={onPreFillCloseClick}
                            aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                </div>    
                {prefills} 
            </div>
        );
    } else {
        return <div></div>
    }
}