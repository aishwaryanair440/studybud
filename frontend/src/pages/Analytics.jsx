import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import api from '../utils/api';
import { Calendar, TrendingUp, Clock, Activity } from 'lucide-react';

const Analytics = () => {
    const [dailyStats, setDailyStats] = useState({});
    const [weeklyStats, setWeeklyStats] = useState([]);
    const [monthlyStats, setMonthlyStats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [dailyRes, weeklyRes, monthlyRes] = await Promise.all([
                    api.get('/stats/daily'),
                    api.get('/stats/weekly'),
                    api.get('/stats/monthly')
                ]);

                setDailyStats(dailyRes.data);
                setWeeklyStats(weeklyRes.data);
                setMonthlyStats(monthlyRes.data);
            } catch (error) {
                console.error("Error fetching stats", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Loading stats...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            <h1 className="text-3xl font-bold text-secondary-900 dark:text-white">Performance Analytics</h1>

            {/* Overview Cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white dark:bg-secondary-800 overflow-hidden shadow rounded-lg p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-primary-500 rounded-md p-3">
                            <Clock className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-secondary-500 truncate dark:text-secondary-400">Today's Focus</dt>
                                <dd className="text-lg font-medium text-secondary-900 dark:text-white">{Math.round(dailyStats.totalDuration || 0)} min</dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-secondary-800 overflow-hidden shadow rounded-lg p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                            <Activity className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-secondary-500 truncate dark:text-secondary-400">Avg Focus Score</dt>
                                <dd className="text-lg font-medium text-secondary-900 dark:text-white">{Math.round(dailyStats.avgFocusScore || 0)}</dd>
                            </dl>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-secondary-800 overflow-hidden shadow rounded-lg p-5">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div className="ml-5 w-0 flex-1">
                            <dl>
                                <dt className="text-sm font-medium text-secondary-500 truncate dark:text-secondary-400">Sessions Completed</dt>
                                <dd className="text-lg font-medium text-secondary-900 dark:text-white">{dailyStats.sessionCount || 0}</dd>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium leading-6 text-secondary-900 dark:text-white mb-4">Weekly Focus Time</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={weeklyStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="_id" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Bar dataKey="totalDuration" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white dark:bg-secondary-800 p-6 rounded-lg shadow">
                    <h3 className="text-lg font-medium leading-6 text-secondary-900 dark:text-white mb-4">Monthly Progress</h3>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={monthlyStats}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                                <XAxis dataKey="_id" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Line type="monotone" dataKey="totalDuration" stroke="#f97316" strokeWidth={3} dot={{ r: 4, fill: '#f97316', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
