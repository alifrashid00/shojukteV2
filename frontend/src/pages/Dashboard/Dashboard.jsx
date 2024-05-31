import {Link} from "react-router-dom";

const Dashboard = () => {
    return (
        <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
            <Link to='/filesharing' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                File sharing
            </Link>
            <Link to='/message' className='text-sm  hover:underline hover:text-blue-600 mt-2 inline-block'>
                Message
            </Link>
        </div>
    );
};
export default Dashboard;