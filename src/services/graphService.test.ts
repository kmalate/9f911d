import { BuildGraph, BuildReverseGraph, GetAncestors } from './graphServices';
import { Graph } from "../types/graph";

describe('BuildGraph', () => {
    it('should build a graph from the given data', () => {        
        const edges = [
        { source: 'a', target: 'b' },
        { source: 'a', target: 'c' },
        { source: 'b', target: 'd' },
        { source: 'c', target: 'e' },
        ];
    
        const graph = BuildGraph(edges);
    
        expect(Object.keys(graph).length).toBe(5);
        expect(graph['a'].length).toBe(2);
    });
});

describe('BuildReverseGraph', () => {
    it('it should build a reverse graph from the given data', () => {
        const edges = [
        { source: 'a', target: 'b' },
        { source: 'a', target: 'c' },
        { source: 'b', target: 'd' },
        { source: 'c', target: 'e' },
        ];

        const graph = BuildReverseGraph(edges);
        expect(Object.keys(graph).length).toBe(5);
        expect(graph['d'].length).toBe(1);
    });
});

describe('GetAncestors', () => {
    it('should return corrent ancestors from the given target', () => {
        const graph : Graph = {
            'a' : [],
            'b' : ['a'],
            'c' : ['a'],
            'd' : ['b'],
            'e' : ['c']
        };

        let result = GetAncestors(graph, 'd');
        expect(result.length).toBe(2);
        result = GetAncestors(graph, 'b');
        expect(result.length).toBe(1);
    });
});