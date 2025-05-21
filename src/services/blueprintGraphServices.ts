export const GetBlueprintGraph = async () => {
  const response = await fetch('http://localhost:3000/api/v1/1/actions/blueprints/1/graph');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  const data = await response.json();
  return data;
}