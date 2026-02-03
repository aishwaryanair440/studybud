import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { Clock, BarChart2, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-extrabold text-secondary-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                    Welcome back, <span className="text-primary-600">{user?.name}</span>
                </h1>
                <p className="mt-5 max-w-xl mx-auto text-xl text-secondary-500 dark:text-secondary-400">
                    Ready to achieve your study goals today?
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                    <div className="flow-root bg-white dark:bg-secondary-800 rounded-lg px-6 pb-8 shadow-xl h-full hover:shadow-2xl transition-shadow duration-300">
                        <div className="-mt-6">
                            <div>
                                <span className="inline-flex items-center justify-center p-3 bg-primary-500 rounded-md shadow-lg">
                                    <Clock className="h-8 w-8 text-white" aria-hidden="true" />
                                </span>
                            </div>
                            <h3 className="mt-8 text-lg font-medium text-secondary-900 dark:text-white tracking-tight">Start Session</h3>
                            <p className="mt-5 text-base text-secondary-500 dark:text-secondary-400">
                                Jump into a focused study session with our Pomodoro timer.
                            </p>
                            <div className="mt-6">
                                <Link to="/timer" className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                                    Start Timer
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <div className="flow-root bg-white dark:bg-secondary-800 rounded-lg px-6 pb-8 shadow-xl h-full hover:shadow-2xl transition-shadow duration-300">
                        <div className="-mt-6">
                            <div>
                                <span className="inline-flex items-center justify-center p-3 bg-accent rounded-md shadow-lg">
                                    <BarChart2 className="h-8 w-8 text-white" aria-hidden="true" />
                                </span>
                            </div>
                            <h3 className="mt-8 text-lg font-medium text-secondary-900 dark:text-white tracking-tight">View Analytics</h3>
                            <p className="mt-5 text-base text-secondary-500 dark:text-secondary-400">
                                Check your daily, weekly, and monthly progress reports.
                            </p>
                            <div className="mt-6">
                                <Link to="/analytics" className="inline-flex px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                                    See Stats
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-6">
                    <div className="flow-root bg-white dark:bg-secondary-800 rounded-lg px-6 pb-8 shadow-xl h-full hover:shadow-2xl transition-shadow duration-300">
                        <div className="-mt-6">
                            <div>
                                <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                                    <CheckCircle className="h-8 w-8 text-white" aria-hidden="true" />
                                </span>
                            </div>
                            <h3 className="mt-8 text-lg font-medium text-secondary-900 dark:text-white tracking-tight">Stay Consistent</h3>
                            <p className="mt-5 text-base text-secondary-500 dark:text-secondary-400">
                                Track your streaks and maintain your focus habits.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
