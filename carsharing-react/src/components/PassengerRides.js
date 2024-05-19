import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const YourRides = () => {
    const { passengerId } = useParams();

    return (
                <ul className='nav flex-column m-3'>
                    <li className='nav-item'><Link className='nav-link' to={`/your-rides/${passengerId}/upcoming`}>Upcoming Rides</Link></li>
                    <li className='nav-item'><Link className='nav-link' to={`/your-rides/${passengerId}/past`}>Past Rides</Link></li>
                    <li className='nav-item'><Link className='nav-link' to={`/passenger/${passengerId}/requests`}>Requests</Link></li>
                  
                </ul>
    );
};

export default YourRides;
