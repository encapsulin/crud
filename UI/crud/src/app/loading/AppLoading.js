import './AppLoading.css'
import img from './arrow-clockwise.svg'

export default function AppLoading() {
    let loading =
        //<div className="loading">Loading...<i /></div>;
        (<div className="loading2"><img src={img} className='rotating' /></div>);

    return loading;
}