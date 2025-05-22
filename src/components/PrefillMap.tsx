import { BuildReverseGraph, GetAncestors } from "../services/graphServices";
import { BlueprintGraph } from "../types/BlueprintGraph"
import { PrefillInfo } from "../types/PrefillInfo";
import { PrefillSource } from "../types/prefillSource";
import { Accordion } from "react-bootstrap";

export default function PrefillMap({info, data, onPropertyMapClick}: 
{info: PrefillInfo | undefined,  data: BlueprintGraph, onPropertyMapClick: any}) {


    if (info) {
        //Get Nodes Ancestors using RerverseGraph and DPS
        const reverseGraph = BuildReverseGraph(data.edges);
        const ancestors = GetAncestors(reverseGraph, info.id);

        if(ancestors && ancestors.length > 0) {
            const prefillSources : PrefillSource[] = [];
            ancestors.forEach(a => {
                const node = data.nodes.find(n => n.id === a);
                if (node) {
                    const form = data.forms.find(f => f.id === node.data.component_id);
                    if (form) {
                        const source =  {
                            id : node.id,
                            name: node.data.name,
                            properties: Object.keys(form.field_schema.properties)
                        } as PrefillSource
                        prefillSources.push(source);
                    }
                }
            });
            const p = prefillSources.map(a => 
                
                <Accordion.Item eventKey={a.name} key={a.id}>
                    <Accordion.Header>{a.name}</Accordion.Header>
                     <Accordion.Body>
                         <ul>
                        {
                            a.properties.map(p => 
                                <div key={`${a.id}-${p}`}>
                                    <button type="button" className="btn btn-link"
                                        onClick={() => 
                                            onPropertyMapClick(info.property, a.id, a.name, p)}
                                    >{p}</button>
                                </div>
                            )
                        }
                        </ul>
                     </Accordion.Body>
                </Accordion.Item>
            );

            return (
                <div>
                    <Accordion defaultActiveKey={['0']} alwaysOpen>
                        {p}
                    </Accordion>
                </div>
            );
        }
        else {
            //Node has no ancestors
            const nodeInfo = data.nodes.find(d => d.id === info.id);
            if (nodeInfo) {
                return (
                    <div>{nodeInfo.data.name} Has no ancestors</div>
                )
            }
        }
    }
    //no info set
    return (<></> );
}