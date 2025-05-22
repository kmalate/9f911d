import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import * as blueprintGraphService from './services/blueprintGraphServices';

test('calls GetBlueprintGraph', async () => {
  const mockGetBlueprintGraph = jest.spyOn(blueprintGraphService, 'GetBlueprintGraph')
    .mockImplementation(async () => {
      return  {
        edges: []
      };
    });
  
  await act(async () => { 
     render(<App />);
  });
 
  expect(mockGetBlueprintGraph).toHaveBeenCalled();
  
});
