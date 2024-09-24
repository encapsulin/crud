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
        setSelectedDir(data_)

    }

  }

  const [reload, setReload] = useState("")
  function callbackModified(item) {
    setReload(item.role)
  }

  const [loading, setLoading] = useState(false);
  const [dataDirs, setDataDirs] = useState([]);
  const [selectedDir, setSelectedDir] = useState(0);
  const [dataDocs, setDataDocs] = useState([]);

  useEffect(() => {
    const fetchDataDirs = async () => {
      setLoading(true);
      let data_ = await restGet(config.URL_API + "?role=dir");
      setLoading(false);
      setDataDirs(data_.data);
      setSelectedDir(dataDirs[0]);
    };
    fetchDataDirs();
  }, [reload])

  useEffect(() => {
    const fetchDataDocs = async () => {
      setLoading(true);
      let parent = selectedDir !== undefined && selectedDir.skid !== undefined ? selectedDir.skid : 0;
      let url = config.URL_API + `?parent=${parent}`;
      let data_json = await restGet(url);
      setDataDocs(data_json.data);
      setLoading(false);
    };
    fetchDataDocs();
  }, [selectedDir])

  async function callbackSearch(str) {
    let data_ = await restGet(config.URL_API + "?search=" + str);
    setDataDocs(data_.data);
  }

  return (<>

    <Header callbackSearch={callbackSearch} />
    <div className='align-row-center'>
      <DirsTree callbackSelectItem={callbackSelectItem} callbackReload={setReload} data={dataDirs} />
      <Docs callbackSelectItem={callbackSelectItem} selectedDir={selectedDir} reload={reload === "doc"}
        callbackReload={setReload} data={dataDocs} />
    </div>
    <Footer />

    <ItemEdit data={itemSelected} callbackModified={callbackModified} />
  </>
  );
}

export default Crud;
