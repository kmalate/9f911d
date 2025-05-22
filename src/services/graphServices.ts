import { Edge } from "../types/edge";
import { Graph } from "../types/graph";

export const BuildGraph = (edges: Edge[]) : Graph => {
    const graph: Graph =  {};

    for(let edge of edges) {
        if (!graph[edge.source]) graph[edge.source] = [];
        if (!graph[edge.target]) graph[edge.target] = [];

        graph[edge.source].push(edge.target);
    }

    return graph;
};

/**
 * Creates a Reverse Graph given an array of Edges
 * @param edges string array of Edges
 * @returns {Graph} Reverse Graph
 */
export const BuildReverseGraph = (edges: Edge[]) : Graph => {
    const graph: Graph =  {};

    for(let edge of edges) {
        if (!graph[edge.source]) graph[edge.source] = [];
        if (!graph[edge.target]) graph[edge.target] = [];

        graph[edge.target].push(edge.source);
    }

    return graph;
}

/**
 * Returns the Ancestors of a Node
 * @param graph - Reverse Graph
 * @param target - Target Node
 * @returns {string[]} - List of Ancestor Nodes
 */
export const GetAncestors = (graph: Graph, target: string) : string[] => {
    const visited = new Set<string>();
    const queue = [ target ];

    while (queue.length > 0) {
        //depth first search
        const current = queue.pop();
        if (current) {
            graph[current].forEach(parent => {
                if (!visited.has(parent)) {
                    visited.add(parent);
                }

                queue.push(parent);
            });
        }
    }

    return Array.from(visited);
}

