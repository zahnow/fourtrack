import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

function BandList() {
    const history = useHistory();
    const bands = useSelector(store => store.bands);
    
    return (
        <div>
            <h1>Band List</h1>
            <button onClick={() => history.push('/addband')}>New Band</button>
            <ul>
                {bands.map(band => {
                    return (
                        <li key={band.id}><Link to={`/bands/${band.id}`}>{band.name}</Link></li>
                    )
                })}
            </ul>
        </div>
    )
}

export default BandList;