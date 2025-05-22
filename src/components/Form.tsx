import { Node } from '../types/node'

export default function Form({node, onButtonClick}:{node: Node, onButtonClick: any}) {
        return (
            <div>
                 <button type="button" className="btn btn-light" 
                    onClick={onButtonClick}>{node.data.name}</button>
            </div>
        )
}