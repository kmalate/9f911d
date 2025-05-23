import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form component', () => {
        const mockNode = {
                data: { name: 'Test Node' }
        } as any;

        it('renders the button with node name', () => {
                render(<Form node={mockNode} onButtonClick={jest.fn()} />);
                expect(screen.getByRole('button', { name: /Test Node/i })).toBeInTheDocument();
        });

        it('calls onButtonClick when button is clicked', () => {
                const onButtonClick = jest.fn();
                render(<Form node={mockNode} onButtonClick={onButtonClick} />);
                fireEvent.click(screen.getByRole('button'));
                expect(onButtonClick).toHaveBeenCalled();
        });
});