import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as blueprintGraphService from './services/blueprintGraphServices';


test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('calls GetBlueprintGraph', async () => {
  const mockGetBlueprintGraph = jest.spyOn(blueprintGraphService, 'GetBlueprintGraph')
    .mockImplementation(async () => {});
  
  await act(async () => { 
     render(<App />);
  });
 
  expect(mockGetBlueprintGraph).toHaveBeenCalled();
  
});
