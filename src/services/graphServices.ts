import { Edge } from "../types/edge";
import { Graph } from "../types/graph";

export const BuildGraph = (edges: Edge[]) : Graph => {
    const graph: Graph =  {};

    for(let edge of edges) {
        if (!graph[edge.source]) {
           graph[edge.source] = [];
        }

        graph[edge.source].push(edge.target);
    }

    return graph;
};