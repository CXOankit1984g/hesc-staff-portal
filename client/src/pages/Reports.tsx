import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Play, Settings } from "lucide-react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const reportsData = [
  {
    id: 1,
    title: "Financial Aid Overview",
    description: "Comprehensive overview of all financial aid programs",
    lastGenerated: "2024-01-16",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Application Analytics",
    description: "Detailed analysis of application trends and processing",
    lastGenerated: "2024-01-15",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Funding Distribution",
    description: "Analysis of fund allocation across programs",
    lastGenerated: "2024-01-14",
    size: "3.1 MB",
  },
  {
    id: 4,
    title: "Student Demographics",
    description: "Demographic breakdown of aid recipients",
    lastGenerated: "2024-01-13",
    size: "1.5 MB",
  },
  {
    id: 5,
    title: "Program Performance",
    description: "Performance metrics for each aid program",
    lastGenerated: "2024-01-12",
    size: "2.7 MB",
  },
  {
    id: 6,
    title: "Historical Trends",
    description: "Multi-year trend analysis and forecasting",
    lastGenerated: "2024-01-11",
    size: "4.2 MB",
  },
];

const scheduledReports = [
  {
    id: 1,
    title: "Weekly Application Summary",
    frequency: "Weekly",
    nextRun: "2024-01-22",
    recipients: 5,
    status: "Active",
  },
  {
    id: 2,
    title: "Monthly Funding Report",
    frequency: "Monthly",
    nextRun: "2024-02-01",
    recipients: 12,
    status: "Active",
  },
  {
    id: 3,
    title: "Quarterly Performance Review",
    frequency: "Quarterly",
    nextRun: "2024-04-01",
    recipients: 8,
    status: "Active",
  },
  {
    id: 4,
    title: "Annual Compliance Report",
    frequency: "Annually",
    nextRun: "2024-12-31",
    recipients: 3,
    status: "Scheduled",
  },
];

const applicationStatusData = [
  { name: "Approved", value: 67.5, fill: "#22c55e" },
  { name: "Under Review", value: 19.2, fill: "#3b82f6" },
  { name: "Pending", value: 8.7, fill: "#f59e0b" },
  { name: "Rejected", value: 4.6, fill: "#ef4444" },
];

const fundingByProgramData = [
  { program: "TAP Grant", amount: 125 },
  { program: "Excelsior", amount: 75 },
  { program: "Enhanced Tuition", amount: 50 },
  { program: "STEM Incentive", amount: 25 },
  { program: "Dream Act", amount: 15 },
];

export default function Reports() {
  const [selectedYear, setSelectedYear] = useState("2024-2025");

  const reportsGenerated = 847;
  const dataPointsAnalyzed = 2400000;
  const activeDashboards = 12;
  const scheduledReportsCount = 34;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Generate insights and track performance metrics</p>
      </div>

      {/* Top Actions */}
      <div className="flex gap-3 items-center">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
        >
          <option>2024-2025</option>
          <option>2023-2024</option>
          <option>2022-2023</option>
        </select>
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Download size={18} />
          Generate Report
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-primary">
          <p className="text-sm text-muted-foreground">Reports Generated</p>
          <p className="text-2xl font-bold text-foreground">{reportsGenerated}</p>
          <p className="text-xs text-green-600 mt-1">+23% This Month</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-sm text-muted-foreground">Data Points Analyzed</p>
          <p className="text-2xl font-bold text-foreground">{(dataPointsAnalyzed / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-green-600 mt-1">+15% This Quarter</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-sm text-muted-foreground">Active Dashboards</p>
          <p className="text-2xl font-bold text-foreground">{activeDashboards}</p>
          <p className="text-xs text-green-600 mt-1">+2 Current</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-accent">
          <p className="text-sm text-muted-foreground">Scheduled Reports</p>
          <p className="text-2xl font-bold text-foreground">{scheduledReportsCount}</p>
          <p className="text-xs text-green-600 mt-1">+8% Active</p>
        </Card>
      </div>

      {/* Available Reports */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Available Reports</h3>
        <p className="text-sm text-muted-foreground mb-6">Select and generate comprehensive reports for analysis</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportsData.map((report) => (
            <Card key={report.id} className="p-4 border border-border hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-foreground mb-2">{report.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                <span>Last: {report.lastGenerated}</span>
                <span>Size: {report.size}</span>
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90 gap-2" size="sm">
                <Play size={16} />
                Generate
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
            <p className="text-sm text-muted-foreground">Automated report generation schedule</p>
          </div>
          <Button variant="outline" gap-2 size="sm">
            <Settings size={16} />
            Manage Schedule
          </Button>
        </div>

        <div className="space-y-3">
          {scheduledReports.map((report) => (
            <div key={report.id} className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{report.title}</h4>
                <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                  <span>Frequency: {report.frequency}</span>
                  <span>Next Run: {report.nextRun}</span>
                  <span>{report.recipients} recipients</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${report.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {report.status}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Report Preview */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-6 text-foreground">Report Preview</h3>
        <p className="text-sm text-muted-foreground mb-6">Interactive preview of selected report data</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Application Status */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-4">Application Status</h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={applicationStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {applicationStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: any) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Funding by Program */}
          <div className="border border-border rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-4">Funding by Program</h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={fundingByProgramData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="program" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip formatter={(value: any) => `$${value}M`} />
                <Bar dataKey="amount" fill="#0B5A66" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 bg-gray-50">
            <p className="text-sm text-muted-foreground mb-1">Processing Time</p>
            <p className="text-2xl font-bold text-foreground">12.3 days</p>
            <p className="text-xs text-green-600 mt-1">↓ 2.1 days from last month</p>
          </Card>
          <Card className="p-4 bg-gray-50">
            <p className="text-sm text-muted-foreground mb-1">Approval Rate</p>
            <p className="text-2xl font-bold text-foreground">78.9%</p>
            <p className="text-xs text-green-600 mt-1">↑ 3.2% from last month</p>
          </Card>
          <Card className="p-4 bg-gray-50">
            <p className="text-sm text-muted-foreground mb-1">Avg. Award</p>
            <p className="text-2xl font-bold text-foreground">$4,847</p>
            <p className="text-xs text-green-600 mt-1">↑ $234 from last month</p>
          </Card>
        </div>
      </Card>
    </div>
  );
}
