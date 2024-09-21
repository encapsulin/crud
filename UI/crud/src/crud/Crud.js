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

  const [reload, setReload] = useState("")
  function callbackModified(item) {
    console.log(item)
    setReload(item.role)
  }

  return (<>

    <Header />
    <div className='align-row-center'>
      <DirsTree callbackSelectItem={itemSelect} reload={reload === "dir"} callbackReload={setReload} />
      <Docs callbackSelectItem={itemSelect} selectedCat={selectedCat} reload={reload === "doc"} callbackReload={setReload} />
    </div>
    <Footer />

    <ItemEdit data={itemSelected} callbackModified={callbackModified} />
  </>
  );
}

export default Crud;
