import './App.css';
import './forms.css';
import Header from './header/Header'
import CrudTree from './crud/CrudTree'
import CrudItems from './crud/CrudItems'
import CrudItemEdit from './crud/CrudItemEdit'
import { useRef, useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState({});
  function modalShow(data_) {
    setData(data_);
  }

  return (<>
    <div className="App">
      <Header />
      <div className='containerRow'>
        <CrudTree callbackModalShow={modalShow} />
        <CrudItems callbackModalShow={modalShow} />
      </div>
    </div>

    <CrudItemEdit data={data} />
  </>
  );
}

export default App;
