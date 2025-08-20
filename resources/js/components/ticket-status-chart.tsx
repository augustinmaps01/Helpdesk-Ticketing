import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, Area, AreaChart, ComposedChart } from 'recharts';

interface TicketData {
    id: string;
    status: string;
}

interface TicketStatusChartProps {
    tickets: TicketData[];
}

export function TicketStatusChart({ tickets }: TicketStatusChartProps) {
    // Process ticket data for charts
    const statusCounts = tickets.reduce((acc, ticket) => {
        acc[ticket.status] = (acc[ticket.status] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    // Data for pie chart
    const pieData = Object.entries(statusCounts).map(([status, count]) => ({
        name: status,
        value: count,
        percentage: ((count / tickets.length) * 100).toFixed(1)
    }));

    // Data for bar chart (recent activity simulation)
    const barData = [
        { day: 'Mon', Open: 2, 'In Progress': 1, Pending: 0, Closed: 3 },
        { day: 'Tue', Open: 1, 'In Progress': 2, Pending: 1, Closed: 2 },
        { day: 'Wed', Open: 3, 'In Progress': 1, Pending: 2, Closed: 1 },
        { day: 'Thu', Open: 1, 'In Progress': 3, Pending: 0, Closed: 4 },
        { day: 'Fri', Open: 2, 'In Progress': 2, Pending: 1, Closed: 2 },
        { day: 'Sat', Open: 0, 'In Progress': 1, Pending: 0, Closed: 1 },
        { day: 'Sun', Open: 1, 'In Progress': 0, Pending: 1, Closed: 1 }
    ];

    // Data for monthly ticket trends
    const monthlyData = [
        { month: 'Jan', Created: 45, Resolved: 38, Open: 7 },
        { month: 'Feb', Created: 52, Resolved: 41, Open: 18 },
        { month: 'Mar', Created: 38, Resolved: 45, Open: 11 },
        { month: 'Apr', Created: 63, Resolved: 52, Open: 22 },
        { month: 'May', Created: 57, Resolved: 48, Open: 31 },
        { month: 'Jun', Created: 71, Resolved: 59, Open: 43 },
        { month: 'Jul', Created: 48, Resolved: 55, Open: 36 },
        { month: 'Aug', Created: 65, Resolved: 61, Open: 40 },
        { month: 'Sep', Created: 59, Resolved: 53, Open: 46 },
        { month: 'Oct', Created: 73, Resolved: 68, Open: 51 },
        { month: 'Nov', Created: 67, Resolved: 71, Open: 47 },
        { month: 'Dec', Created: 55, Resolved: 62, Open: 40 }
    ];

    // Colors for different statuses
    const COLORS = {
        'Open': '#EF4444',
        'In Progress': '#F59E0B', 
        'Pending': '#8B5CF6',
        'Closed': '#10B981'
    };

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium text-foreground">{`${label}`}</p>
                    {payload.map((entry: any, index: number) => (
                        <p key={index} className="text-sm text-muted-foreground">
                            <span style={{ color: entry.color }}>{entry.dataKey}: </span>
                            {entry.value}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    const PieTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                    <p className="text-sm font-medium text-foreground">{data.name}</p>
                    <p className="text-sm text-muted-foreground">
                        Count: {data.value} ({data.payload.percentage}%)
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="space-y-6">
            {/* Monthly Ticket Trends - Full Width */}
            <motion.div
                className="bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
            >
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Monthly Ticket Trends</h3>
                        <p className="text-sm text-muted-foreground">Year-over-year ticket creation and resolution trends</p>
                    </div>
                    
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <defs>
                                    <linearGradient id="colorCreated" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                                    </linearGradient>
                                    <linearGradient id="colorOpen" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                <XAxis 
                                    dataKey="month" 
                                    axisLine={false}
                                    tickLine={false}
                                    className="text-xs text-muted-foreground"
                                />
                                <YAxis 
                                    axisLine={false}
                                    tickLine={false}
                                    className="text-xs text-muted-foreground"
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend 
                                    wrapperStyle={{ 
                                        fontSize: '12px',
                                        color: 'hsl(var(--muted-foreground))'
                                    }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="Created" 
                                    stroke="#3B82F6" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#colorCreated)" 
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="Resolved" 
                                    stroke="#10B981" 
                                    strokeWidth={2}
                                    fillOpacity={1} 
                                    fill="url(#colorResolved)" 
                                />
                                <Line 
                                    type="monotone" 
                                    dataKey="Open" 
                                    stroke="#F59E0B" 
                                    strokeWidth={3}
                                    dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                                    activeDot={{ r: 6, stroke: '#F59E0B', strokeWidth: 2, fill: '#FFFFFF' }}
                                />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Monthly Stats Summary */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/30">
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">686</div>
                            <div className="text-xs text-muted-foreground">Total Created</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">653</div>
                            <div className="text-xs text-muted-foreground">Total Resolved</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">95.2%</div>
                            <div className="text-xs text-muted-foreground">Resolution Rate</div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Weekly and Status Charts Row */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Ticket Status Distribution - Pie Chart */}
            <motion.div
                className="bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
            >
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Ticket Status Distribution</h3>
                        <p className="text-sm text-muted-foreground">Current status breakdown of all tickets</p>
                    </div>
                    
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={COLORS[entry.name as keyof typeof COLORS] || '#6B7280'} 
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<PieTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2">
                        {pieData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div 
                                    className="w-3 h-3 rounded-full" 
                                    style={{ backgroundColor: COLORS[entry.name as keyof typeof COLORS] || '#6B7280' }}
                                />
                                <span className="text-xs text-muted-foreground">
                                    {entry.name} ({entry.value})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Weekly Ticket Activity - Bar Chart */}
            <motion.div
                className="bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm border border-border/50 rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
            >
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-semibold text-foreground">Weekly Ticket Activity</h3>
                        <p className="text-sm text-muted-foreground">Daily ticket status changes this week</p>
                    </div>
                    
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                                <XAxis 
                                    dataKey="day" 
                                    axisLine={false}
                                    tickLine={false}
                                    className="text-xs text-muted-foreground"
                                />
                                <YAxis 
                                    axisLine={false}
                                    tickLine={false}
                                    className="text-xs text-muted-foreground"
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend 
                                    wrapperStyle={{ 
                                        fontSize: '12px',
                                        color: 'hsl(var(--muted-foreground))'
                                    }}
                                />
                                <Bar dataKey="Open" stackId="a" fill={COLORS.Open} radius={[0, 0, 0, 0]} />
                                <Bar dataKey="In Progress" stackId="a" fill={COLORS['In Progress']} radius={[0, 0, 0, 0]} />
                                <Bar dataKey="Pending" stackId="a" fill={COLORS.Pending} radius={[0, 0, 0, 0]} />
                                <Bar dataKey="Closed" stackId="a" fill={COLORS.Closed} radius={[2, 2, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>
            </div>
        </div>
    );
}