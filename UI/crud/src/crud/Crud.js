import './style-form.css';
import './style-align.css';
import Header from './header/Header'
import Footer from './footer/Footer'
import DirsTree from './crud/DirsTree'
import Docs from './crud/Docs'
import ItemEdit from './crud/ItemEdit'
import { useState, useEffect } from 'react';

import config from './config.js'
import { restGet } from './misc/utils/restGet.js'

function Crud() {

  const [itemSelected, setItemSelected] = useState({});
  function callbackSelectItem(data_, rw) {
    if (rw !== undefined) {

      if (rw === "w")
        setItemSelected(data_);

      if (rw === "r" && data_.role === "dir")
        setSelectedCat(data_)

    }

  }
  const [selectedCat, setSelectedCat] = useState(0);

  const [reload, setReload] = useState("")
  function callbackModified(item) {
    setReload(item.role)
  }

  const [loading, setLoading] = useState(false);
  const [dataDirs, setDataDirs] = useState([]);
  const [dataDocs, setDataDocs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data_ = await restGet(config.URL_API + "?parent=0&role=dir");
      setLoading(false);
      setDataDirs(data_);
    };
    fetchData();
  }, [reload])

  async function callbackSearch(str) {
    let data_ = await restGet(config.URL_API + "?search=" + str);
    setDataDocs(data_);
  }

  return (<>

    <Header callbackSearch={callbackSearch} />
    <div className='align-row-center'>
      {/* <DirsTree callbackSelectItem={callbackSelectItem} callbackReload={setReload} data={dataDirs} /> */}
      <Docs callbackSelectItem={callbackSelectItem} selectedCat={selectedCat} reload={reload === "doc"} callbackReload={setReload} />
    </div>
    <Footer />

    <ItemEdit data={itemSelected} callbackModified={callbackModified} />
  </>
  );
}

export default Crud;
