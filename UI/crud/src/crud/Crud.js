import './style-form.css';
import './style-align.css';
import Header from './header/Header'
import Footer from './footer/Footer'
import DirsTree from './crud/DirsTree'
import Docs from './crud/Docs'
import ItemEdit from './crud/ItemEdit'
import { useState } from 'react';

function Crud() {

  const [itemSelected, setItemSelected] = useState({});
  function itemSelect(data_, rw) {
    if (rw !== undefined)
      if (rw === "w")
        setItemSelected(data_);

    if (rw === "r" && data_.role === "dir") {
      setSelectedCat(data_)
    }

  }
  const [selectedCat, setSelectedCat] = useState(0);

  return (<>

    <Header />
    <div className='align-row-center'>
      <DirsTree callbackSelectItem={itemSelect} />
      <Docs callbackSelectItem={itemSelect} selectedCat={selectedCat} />
    </div>
    <Footer />

    <ItemEdit data={itemSelected} />
  </>
  );
}

export default Crud;
