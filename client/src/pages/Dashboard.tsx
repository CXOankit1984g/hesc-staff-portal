import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, CheckCircle, XCircle, DollarSign, TrendingUp } from "lucide-react";

const applicationsTrendData = [
  { month: "Jan", applications: 350, approved: 280, denied: 70 },
  { month: "Feb", applications: 420, approved: 340, denied: 80 },
  { month: "Mar", applications: 480, approved: 410, denied: 70 },
  { month: "Apr", applications: 520, approved: 450, denied: 70 },
  { month: "May", applications: 580, approved: 510, denied: 70 },
  { month: "Jun", applications: 650, approved: 600, denied: 50 },
];

const applicationsByStatusData = [
  { name: "Approved", value: 1923, fill: "#22c55e" },
  { name: "Under Review", value: 542, fill: "#3b82f6" },
  { name: "Pending", value: 0, fill: "#f59e0b" },
  { name: "Rejected", value: 382, fill: "#ef4444" },
];

const programPerformanceData = [
  { program: "TAP Grant", applications: 1200, approvalRate: 85 },
  { program: "Excelsior", applications: 850, approvalRate: 92 },
  { program: "STEM", applications: 580, approvalRate: 78 },
  { program: "Dream Act", applications: 217, approvalRate: 88 },
];

const disbursementData = [
  { month: "Jan", amount: 1200000 },
  { month: "Feb", amount: 1400000 },
  { month: "Mar", amount: 1800000 },
  { month: "Apr", amount: 2100000 },
  { month: "May", amount: 2500000 },
  { month: "Jun", amount: 2800000 },
];

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive overview of all financial aid applications and programs
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Academic Year</label>
          <select className="px-3 py-2 border border-border rounded-lg text-sm bg-white">
            <option>2025-2026</option>
            <option>2024-2025</option>
            <option>2023-2024</option>
            <option>2022-2023</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Program</label>
          <select className="px-3 py-2 border border-border rounded-lg text-sm bg-white">
            <option>All Programs</option>
            <option>TAP Grant</option>
            <option>Excelsior</option>
            <option>STEM</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">College</label>
          <select className="px-3 py-2 border border-border rounded-lg text-sm bg-white">
            <option>All Colleges</option>
            <option>CUNY</option>
            <option>SUNY</option>
            <option>Private</option>
          </select>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Apply Filters</Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 border-l-4 border-l-primary">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Applications</p>
              <p className="text-3xl font-bold text-foreground">2,847</p>
              <p className="text-xs text-muted-foreground mt-2">All submitted applications</p>
            </div>
            <Users className="text-primary" size={24} />
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-green-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Approved</p>
              <p className="text-3xl font-bold text-foreground">1,923</p>
              <p className="text-xs text-muted-foreground mt-2">67.54% approval rate</p>
            </div>
            <CheckCircle className="text-green-500" size={24} />
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-red-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Denied</p>
              <p className="text-3xl font-bold text-foreground">382</p>
              <p className="text-xs text-muted-foreground mt-2">Applications rejected</p>
            </div>
            <XCircle className="text-red-500" size={24} />
          </div>
        </Card>

        <Card className="p-6 border-l-4 border-l-accent">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Disbursed</p>
              <p className="text-3xl font-bold text-foreground">$4.2M</p>
              <p className="text-xs text-muted-foreground mt-2">Amount paid to students</p>
            </div>
            <DollarSign className="text-accent" size={24} />
          </div>
        </Card>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Applications Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Applications Trend</h3>
          <p className="text-sm text-muted-foreground mb-4">Monthly application submissions and approvals</p>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={applicationsTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="applications" stroke="#0B5A66" strokeWidth={2} />
              <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} />
              <Line type="monotone" dataKey="denied" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        {/* Applications by Status */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Applications by Status</h3>
          <p className="text-sm text-muted-foreground mb-4">Distribution of application statuses</p>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={applicationsByStatusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {applicationsByStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        {/* Program Performance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Program Performance</h3>
          <p className="text-sm text-muted-foreground mb-4">Applications and approval rates by program</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={programPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="program" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Bar dataKey="applications" fill="#0B5A66" />
              <Bar dataKey="approvalRate" fill="#5E9CA0" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Payment Disbursement Trend */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 text-foreground">Payment Disbursement Trend</h3>
          <p className="text-sm text-muted-foreground mb-4">Monthly payment amounts disbursed to students</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={disbursementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip formatter={(value: any) => `$${(value / 1000).toFixed(0)}K`} />
              <Bar dataKey="amount" fill="#0B5A66" />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Button className="bg-primary hover:bg-primary/90">New Application</Button>
          <Button variant="outline">Student Lookup</Button>
          <Button variant="outline">Process Payments</Button>
          <Button variant="outline">Generate Report</Button>
        </div>
      </Card>
    </div>
  );
}
