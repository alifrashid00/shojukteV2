import { Link } from 'react-router-dom'
import { ArrowPathIcon, CloudArrowUpIcon,ChatBubbleLeftIcon,GlobeAltIcon,CalendarDaysIcon} from '@heroicons/react/24/outline'
import LogoutButton from "../../components/sidebar/LogoutButton.jsx";
const features = [
    {
        name: 'Filesharing',
        description:
            'Share Files With Your Homies.',
        icon: CloudArrowUpIcon,
        url: '/filesharing',
    },
    {
        name: 'Message',
        description:
            'Connect With Your Homies.',
        icon: ChatBubbleLeftIcon,
        url:'/message'
    },
    {
        name: 'Discussion',
        description:
            'Start Event Here And Ask Questions. Homies Are There To Help You',
        icon: GlobeAltIcon,
        url:'http://localhost:5000/event'
    },
    {
        name: 'Routine',
        description:
            'Check Your Routine',
        icon: CalendarDaysIcon,
        url:'/routine'
    },
]

export default function Example() {
    return (
        <div className="bg-grey min-h-screen w-full py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <p className="mt-2 text-3xl font-bold tracking-tight text-blue-500 sm:text-7xl">
                        ShongJukTea
                    </p>
                    <p className="mt-6 text-lg font-bold leading-8 text-white">
                        CONNECTING IUT
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-5 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                                    </div >

                                    {feature.url ? (
                                        <Link
                                            to={feature.url}
                                            className={`hover:underline text-white`}
                                        >
                                            {feature.name}
                                        </Link>
                                    ) : (
                                        <span className="text-white">{feature.name}</span>
                                    )}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-white">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
            <LogoutButton/>

        </div>
    )

}

