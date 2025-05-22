import { useEffect, useState } from 'react';
import './App.css';
import { GetBlueprintGraph } from './services/blueprintGraphServices';
import FormsList from './components/FormsList';
import { BlueprintGraph } from './types/BlueprintGraph';
import { PrefillMapping } from './types/prefillmapping';
import Prefill from './components/Prefill';
import { PrefillInfo } from './types/PrefillInfo';
import PrefillMap from './components/PrefillMap';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

function App() {
  const [data, setData] = useState<BlueprintGraph>({} as BlueprintGraph);
  const [prefillMapping, setPrefillMapping] = useState<PrefillMapping>({});
  const [selectedForm, setSelectedForm] = useState<string>();
  const [prefillInfo, setPrefillInfo] = useState<PrefillInfo>();
  const [showFormsList, setShowFormsList] = useState<boolean>(true);

  const[show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {    
      GetBlueprintGraph().then((data :BlueprintGraph) => {
        setData(data);
      });  
  },[]);

  function onNodeClick(id: string) {
    setSelectedForm(id);
    setPrefillInfo({} as PrefillInfo);
    setShowFormsList(false);
  }

  function onPropertyClick(property: string) {
    const info = {
      property : property,
      id : selectedForm
    } as PrefillInfo;

    setPrefillInfo(info);
    setShow(true);
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

  function onPreFillCloseClick() {
    setSelectedForm(undefined);
    setShowFormsList(true);
  }

  return (
    <div className="container">
      <FormsList blueprintGraph={data} onNodeClick={onNodeClick} show={showFormsList} />
      <Prefill selectedForm={selectedForm} blueprintGraph={data} 
        onPropertyClick={onPropertyClick} onPropertyMapDeleteClick={onPropertyMapDeleteClick}
        prefillMapping={prefillMapping} onPreFillCloseClick={onPreFillCloseClick}/>      
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <PrefillMap info={prefillInfo} data={data} onPropertyMapClick={onPropertyMapClick} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    </div>
  );
}

export default App;
