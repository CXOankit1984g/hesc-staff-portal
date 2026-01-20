import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Plus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const programsData = [
  {
    id: "PROG-001",
    name: "TAP Grant Program",
    description: "Tuition Assistance Program for NY residents",
    type: "Grant",
    funding: { allocated: 98750000, total: 125000000, percentage: 79 },
    recipients: 15234,
    maxAward: "$5,665",
    deadline: "2024-05-15",
    status: "Active",
  },
  {
    id: "PROG-002",
    name: "Excelsior Scholarship",
    description: "Free tuition for middle-class families",
    type: "Scholarship",
    funding: { allocated: 62250000, total: 75000000, percentage: 83 },
    recipients: 8945,
    maxAward: "$6,470",
    deadline: "2024-04-30",
    status: "Active",
  },
  {
    id: "PROG-003",
    name: "STEM Incentive Program",
    description: "Incentive for STEM field students",
    type: "Scholarship",
    funding: { allocated: 18750000, total: 25000000, percentage: 75 },
    recipients: 3421,
    maxAward: "$3,000",
    deadline: "2024-06-01",
    status: "Active",
  },
  {
    id: "PROG-004",
    name: "Dream Act Financial Aid",
    description: "Aid for undocumented students",
    type: "Grant",
    funding: { allocated: 11250000, total: 15000000, percentage: 75 },
    recipients: 1876,
    maxAward: "$5,500",
    deadline: "2024-05-30",
    status: "Active",
  },
  {
    id: "PROG-005",
    name: "Enhanced Tuition Award",
    description: "Additional aid for private college students",
    type: "Grant",
    funding: { allocated: 42500000, total: 50000000, percentage: 85 },
    recipients: 6789,
    maxAward: "$6,000",
    deadline: "2024-04-15",
    status: "Active",
  },
  {
    id: "PROG-006",
    name: "NYS Math and Science Teaching Incentive",
    description: "For future math and science teachers",
    type: "Scholarship",
    funding: { allocated: 7500000, total: 10000000, percentage: 75 },
    recipients: 1234,
    maxAward: "$3,400",
    deadline: "2024-03-31",
    status: "Closed",
  },
];

const statusColors = {
  "Active": "bg-green-100 text-green-800",
  "Closed": "bg-gray-100 text-gray-800",
};

export default function Programs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredPrograms = programsData.filter((program) => {
    const matchesSearch =
      program.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || program.status === statusFilter;
    const matchesType = typeFilter === "All" || program.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const totalFunding = programsData.reduce((sum, p) => sum + p.funding.total, 0);
  const totalRecipients = programsData.reduce((sum, p) => sum + p.recipients, 0);
  const activePrograms = programsData.filter((p) => p.status === "Active").length;
  const avgEligibility = (
    programsData.reduce((sum, p) => sum + p.funding.percentage, 0) / programsData.length
  ).toFixed(1);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Programs</h1>
        <p className="text-muted-foreground">Manage financial aid programs and funding allocation</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="bg-primary hover:bg-primary/90 flex gap-2">
          <Plus size={18} />
          New Program
        </Button>
        <Button variant="outline" className="flex gap-2">
          <Download size={18} />
          Export Report
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-primary">
          <p className="text-sm text-muted-foreground">Active Programs</p>
          <p className="text-2xl font-bold text-foreground">{activePrograms}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-sm text-muted-foreground">Total Funding</p>
          <p className="text-2xl font-bold text-foreground">${(totalFunding / 1000000).toFixed(0)}M</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-sm text-muted-foreground">Recipients</p>
          <p className="text-2xl font-bold text-foreground">{(totalRecipients / 1000).toFixed(0)}K</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-accent">
          <p className="text-sm text-muted-foreground">Avg. Eligibility</p>
          <p className="text-2xl font-bold text-foreground">{avgEligibility}%</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Program Management</h3>
        <p className="text-sm text-muted-foreground mb-4">Monitor and manage financial aid programs and their funding status</p>

        <div className="space-y-4">
          {/* Search */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by program name, ID, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
            >
              <option>All Statuses</option>
              <option>Active</option>
              <option>Closed</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
            >
              <option>All Types</option>
              <option>Grant</option>
              <option>Scholarship</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Programs Table */}
      <Card className="p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Program</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Funding Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Recipients</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Max Award</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Deadline</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPrograms.map((program) => (
              <tr key={program.id} className="border-b border-border hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-foreground">{program.name}</p>
                    <p className="text-xs text-muted-foreground">{program.id}</p>
                    <p className="text-xs text-muted-foreground">{program.description}</p>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                    {program.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="space-y-1">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary"
                        style={{ width: `${program.funding.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {program.funding.percentage}% • ${(program.funding.allocated / 1000000).toFixed(1)}M of ${(program.funding.total / 1000000).toFixed(0)}M
                    </p>
                  </div>
                </td>
                <td className="py-3 px-4 text-foreground">{program.recipients.toLocaleString()}</td>
                <td className="py-3 px-4 font-medium text-foreground">{program.maxAward}</td>
                <td className="py-3 px-4 text-foreground">{program.deadline}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[program.status as keyof typeof statusColors]}`}>
                    {program.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit Program</DropdownMenuItem>
                      <DropdownMenuItem>View Recipients</DropdownMenuItem>
                      <DropdownMenuItem>Generate Report</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
