import './style-form.css';
import './style-align.css';
import './style-button.css';
import Header from './header/Header'
import Footer from './footer/Footer'
import DirsTree from './core/Dirs'
import Docs from './core/Docs'
import ItemEdit from './core/ItemEdit'
import { useState, useEffect } from 'react';
import config from './config.js'
import { restGet } from './misc/utils/restGet.js'
import { AuthDataProvider } from './misc/context/AuthDataContext'

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

  useEffect(() => {
    const fetchDataDirs = async () => {
      setLoadingDirs(true);
      let data_dir = await restGet(config.URL_API + "?role=dir");
      setLoadingDirs(false);
      setDataDirs(data_dir.data.Items);
      setSelectedDir(dataDirs[0]);
    };
    fetchDataDirs();
  }, [reload])

  //TODO
  async function callbackSearch(str) {
    setSelectedDir({ title: "Search: " + str, search: str })
    //setLoadingDocs(true);
    //let data_search = await restGet(config.URL_API + "?search=" + str);
    //setDataDocs(data_search.data.Items);
    //setLoadingDocs(false);
  }

  return (<>

    <AuthDataProvider>
      <Header callbackSearch={callbackSearch} />
      <div className='align-row-center'>
        <DirsTree callbackSelectItem={callbackSelectItem} callbackReload={setReload} data={dataDirs}
          loading={loadingDirs} />
        <Docs callbackSelectItem={callbackSelectItem} selectedDir={selectedDir}
          callbackReload={setReload} />
      </div>
      <Footer />

      <ItemEdit data={itemSelected} callbackModified={callbackModified} />

    </AuthDataProvider>

  </>
  );
}

export default Crud;
