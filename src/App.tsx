import { useEffect, useState } from 'react';
import './App.css';
import { GetBlueprintGraph } from './services/blueprintGraphServices';
import FormsList from './components/FormsList';
import { BlueprintGraph } from './types/BlueprintGraph';
import { PrefillMapping } from './types/prefillmapping';
import Prefill from './components/Prefill';
import { PrefillInfo } from './types/PrefillInfo';
import PrefillMap from './components/PrefillMap';

function App() {
  const [data, setData] = useState<BlueprintGraph>({} as BlueprintGraph);
  const [prefillMapping, setPrefillMapping] = useState<PrefillMapping>({});
  const [selectedForm, setSelectedForm] = useState<string>();
  const [prefillInfo, setPrefillInfo] = useState<PrefillInfo>();

  useEffect(() => {    
      GetBlueprintGraph().then((data :BlueprintGraph) => {
        setData(data);
      });  
         
  },[]);

  function onNodeClick(id: string) {
    setSelectedForm(id);
    setPrefillInfo({} as PrefillInfo);
  }

  function onPropertyClick(property: string) {
    const info = {
      property : property,
      id : selectedForm
    } as PrefillInfo;

    setPrefillInfo(info);
  }

  function onPropertyMapDeleteClick(property: string) {
    if (selectedForm) {
      let pm = {...prefillMapping};
      if (pm[selectedForm]) {
        delete pm[selectedForm][property];
        setPrefillMapping(pm);
      }

    }
  }

  function onPropertyMapClick(property: string, id: string, name: string, mapProperty: string) {
    if (selectedForm) {
      let pm = {...prefillMapping};
      if (!pm[selectedForm]) {
        pm[selectedForm] = {};
      }
      
      pm[selectedForm][property] = {
        id: id,
        name: name,
        property: mapProperty
      };

      setPrefillMapping(pm);
    }
  }

  return (
    <div>
      <FormsList blueprintGraph={data} onNodeClick={onNodeClick} />
      <Prefill selectedForm={selectedForm} blueprintGraph={data} 
        onPropertyClick={onPropertyClick} onPropertyMapDeleteClick={onPropertyMapDeleteClick}
        prefillMapping={prefillMapping} />
      <PrefillMap info={prefillInfo} data={data} onPropertyMapClick={onPropertyMapClick} />
    </div>
  );
}

export default App;
