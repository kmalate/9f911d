import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormsList from './FormsList';
import { BlueprintGraph } from '../types/BlueprintGraph';
import { Data } from '../types/Data';

// Mock Form component
jest.mock('./Form', () => ({ node, onButtonClick }: any) => (
    <button data-testid={`form-${node.id}`} onClick={onButtonClick}>
        {node.label}
    </button>
));

const mockBlueprintGraph: BlueprintGraph = {
    nodes: [
        { id: '1', data: {} as Data, type: 'form' },
        { id: '2', data: {}as Data, type: 'form' }
    ]
} as BlueprintGraph;

describe('FormsList', () => {
    it('renders nothing when show is false', () => {
        render(
            <FormsList
                blueprintGraph={mockBlueprintGraph}
                onNodeClick={jest.fn()}
                show={false}
            />
        );
        expect(screen.queryByTestId('form-1')).toBeNull();
        expect(screen.queryByTestId('form-2')).toBeNull();
    });

    it('renders nothing when blueprintGraph is missing nodes', () => {
        render(
            <FormsList
                blueprintGraph={{ nodes: [], edges:[], forms:[] } as BlueprintGraph}
                onNodeClick={jest.fn()}
                show={true}
            />
        );
        expect(screen.queryByTestId('form-1')).toBeNull();
        expect(screen.queryByTestId('form-2')).toBeNull();
    });

    it('renders a list of Form components when show is true', () => {
        render(
            <FormsList
                blueprintGraph={mockBlueprintGraph}
                onNodeClick={jest.fn()}
                show={true}
            />
        );
        expect(screen.getByTestId('form-1')).toBeInTheDocument();
        expect(screen.getByTestId('form-2')).toBeInTheDocument();
    });

    it('calls onNodeClick with correct id when Form button is clicked', () => {
        const onNodeClick = jest.fn();
        render(
            <FormsList
                blueprintGraph={mockBlueprintGraph}
                onNodeClick={onNodeClick}
                show={true}
            />
        );
        fireEvent.click(screen.getByTestId('form-1'));
        expect(onNodeClick).toHaveBeenCalledWith('1');
        fireEvent.click(screen.getByTestId('form-2'));
        expect(onNodeClick).toHaveBeenCalledWith('2');
    });
});