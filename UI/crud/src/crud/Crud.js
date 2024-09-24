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

  const [loadingDirs, setLoadingDirs] = useState(false);
  const [dataDirs, setDataDirs] = useState([]);
  const [selectedDir, setSelectedDir] = useState({ skid: 0 });

  const [dataDocs, setDataDocs] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(false);

  useEffect(() => {
    const fetchDataDirs = async () => {
      setLoadingDirs(true);
      let data_ = await restGet(config.URL_API + "?role=dir");
      setLoadingDirs(false);
      setDataDirs(data_.data);
      setSelectedDir(dataDirs[0]);
    };
    fetchDataDirs();
  }, [reload])

  useEffect(() => {
    const fetchDataDocs = async () => {
      if (selectedDir === undefined || selectedDir.skid === undefined || selectedDir.skid === null)
        return;

      setLoadingDocs(true);
      let url = config.URL_API + `?parent=${selectedDir.skid}`;
      let data_json = await restGet(url);
      setDataDocs(data_json.data);
      setLoadingDocs(false);
    };
    fetchDataDocs();
  }, [selectedDir])

  async function callbackSearch(str) {
    setSelectedDir({ title: "Search: " + str })
    setLoadingDocs(true);
    let data_ = await restGet(config.URL_API + "?search=" + str);
    setDataDocs(data_.data);
    setLoadingDocs(false);
  }

  return (<>

    <Header callbackSearch={callbackSearch} />
    <div className='align-row-center'>
      <DirsTree callbackSelectItem={callbackSelectItem} callbackReload={setReload} data={dataDirs}
        loading={loadingDirs} />
      <Docs callbackSelectItem={callbackSelectItem} selectedDir={selectedDir}
        callbackReload={setReload} data={dataDocs} loading={loadingDocs} />
    </div>
    <Footer />

    <ItemEdit data={itemSelected} callbackModified={callbackModified} />
  </>
  );
}

export default Crud;
