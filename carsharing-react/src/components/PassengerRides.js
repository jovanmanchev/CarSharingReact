import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const YourRides = () => {
    const { passengerId } = useParams();

    return (
        <div className='mb-4'>
                <ul className='nav nav-tabs'>
                    <li className='nav-item'><Link className='nav-link' to={`/your-rides/${passengerId}/upcoming`}>Upcoming Rides</Link></li>
                    <li className='nav-item'><Link className='nav-link' to={`/your-rides/${passengerId}/past`}>Past Rides</Link></li>
                    <li className='nav-item'><Link className='nav-link' to={`/passenger/${passengerId}/requests`}>Requests</Link></li>
                </ul>
        </div>
    );
};

export default YourRides;
