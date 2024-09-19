import './App.css';
import './forms.css';
import Header from './headerFooter/Header'
import Footer from './headerFooter/Footer'
import CrudTree from './crud/CrudTree'
import CrudItems from './crud/CrudItems'
import CrudItemEdit from './crud/CrudItemEdit'
import { useRef, useState, useEffect } from 'react';

function App() {

  const [itemSelected, setItemSelected] = useState({});
  function itemSelect(data_, rw) {
    if (rw !== undefined)
      if (rw === "w")
        setItemSelected(data_);
    if (rw === "r" && data_.role === "dir") {
      setSelectedCat(data_.skid)
    }

  }
  const [selectedCat, setSelectedCat] = useState(0);

  return (<>
    <div className="App">
      <Header />
      <div className='containerRow'>
        <CrudTree callbackSelectItem={itemSelect} />
        <CrudItems callbackSelectItem={itemSelect} selectedCat={selectedCat} />
      </div>
      <Footer />
    </div>

    <CrudItemEdit data={itemSelected} />
  </>
  );
}

export default App;
