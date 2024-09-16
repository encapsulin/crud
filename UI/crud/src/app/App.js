
import './App.css';
import Header from './header/Header'
import CrudTree from './crud/CrudTree'
import CrudItems from './crud/CrudItems'

function App() {

  return (
    <div className="App">
      <Header />
      <div className='containerRow'>
        <CrudTree />
        <CrudItems />
      </div>

    </div>
  );
}

export default App;
