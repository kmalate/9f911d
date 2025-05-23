import { PrefillSource } from "../types/prefillSource";

export const GetBlueprintGraph = async () => {
  const response = await fetch('http://localhost:3000/api/v1/1/actions/blueprints/1/graph');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  return data;
}

export const GetInitialPrefillSource = () : PrefillSource[] => {
  return [
    {
      id: '1',
      name: 'Action Properties',
      properties: [
          'fieldA',
          'field2',
          'fieldV',
      ]
    },
    {
      id: '12',
      name: 'Client Organization Properties',
      properties: [
          'fieldz',
          'fieldX'
      ]
    }
  ];
}