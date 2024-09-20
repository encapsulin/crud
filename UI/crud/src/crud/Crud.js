import './style-form.css';
import './style-align.css';
import Header from './header/Header'
import Footer from './footer/Footer'
import CrudTree from './crud/CrudTree'
import CrudItems from './crud/CrudItems'
import CrudItemEdit from './crud/CrudItemEdit'
import { useRef, useState, useEffect } from 'react';

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
      <CrudTree callbackSelectItem={itemSelect} />
      <CrudItems callbackSelectItem={itemSelect} selectedCat={selectedCat} />
    </div>
    <Footer />

    <CrudItemEdit data={itemSelected} />
  </>
  );
}

export default Crud;
