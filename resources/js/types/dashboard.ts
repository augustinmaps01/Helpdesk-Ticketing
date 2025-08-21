export interface DashboardData {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  pendingTickets: number;
  closedTickets: number;
  avgResponseTime: number;
  satisfactionRate: number;
}

export interface TicketData {
  id: string;
  status: string;
}

export interface CategoryData {
  id: string;
  name: string;
}

export interface DashboardProps {
  dashboardData: DashboardData;
  tickets: TicketData[];
  categories: CategoryData[];
}