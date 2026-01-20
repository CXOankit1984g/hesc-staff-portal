import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Plus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const studentRecordsData = [
  {
    id: "STU-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    college: "CUNY",
    program: "TAP Grant",
    status: "Active",
    totalAid: "$5,165",
    lastUpdated: "2024-01-15",
  },
  {
    id: "STU-002",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    college: "SUNY",
    program: "Excelsior Scholarship",
    status: "Active",
    totalAid: "$6,470",
    lastUpdated: "2024-01-14",
  },
  {
    id: "STU-003",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    college: "Private",
    program: "STEM Incentive",
    status: "Active",
    totalAid: "$3,000",
    lastUpdated: "2024-01-14",
  },
  {
    id: "STU-004",
    name: "David Thompson",
    email: "david.thompson@email.com",
    college: "CUNY",
    program: "TAP Grant",
    status: "Inactive",
    totalAid: "$4,350",
    lastUpdated: "2024-01-13",
  },
  {
    id: "STU-005",
    name: "Jessica Williams",
    email: "jessica.williams@email.com",
    college: "SUNY",
    program: "Dream Act",
    status: "Active",
    totalAid: "$5,500",
    lastUpdated: "2024-01-13",
  },
  {
    id: "STU-006",
    name: "Robert Davis",
    email: "robert.davis@email.com",
    college: "Private",
    program: "Enhanced Tuition Award",
    status: "Active",
    totalAid: "$6,000",
    lastUpdated: "2024-01-12",
  },
];

const statusColors = {
  "Active": "bg-green-100 text-green-800",
  "Inactive": "bg-gray-100 text-gray-800",
};

export default function StudentRecords() {
  const [searchTerm, setSearchTerm] = useState("");
  const [collegeFilter, setCollegeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const filteredRecords = studentRecordsData.filter((record) => {
    const matchesSearch =
      record.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCollege = collegeFilter === "All" || record.college === collegeFilter;
    const matchesStatus = statusFilter === "All" || record.status === statusFilter;
    return matchesSearch && matchesCollege && matchesStatus;
  });

  const totalStudents = studentRecordsData.length;
  const activeStudents = studentRecordsData.filter((s) => s.status === "Active").length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Student Records</h1>
        <p className="text-muted-foreground">Manage and review student financial aid records</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="bg-primary hover:bg-primary/90 gap-2">
          <Plus size={18} />
          New Record
        </Button>
        <Button variant="outline" gap-2>
          <Search size={18} />
          Advanced Search
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-l-4 border-l-primary">
          <p className="text-sm text-muted-foreground">Total Students</p>
          <p className="text-2xl font-bold text-foreground">{totalStudents}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-sm text-muted-foreground">Active Students</p>
          <p className="text-2xl font-bold text-foreground">{activeStudents}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-accent">
          <p className="text-sm text-muted-foreground">Total Aid Distributed</p>
          <p className="text-2xl font-bold text-foreground">$30.5K</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Student Search</h3>
        <p className="text-sm text-muted-foreground mb-4">Search and filter student records</p>

        <div className="space-y-4">
          {/* Search */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by student name, ID, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-border rounded-lg text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select
              value={collegeFilter}
              onChange={(e) => setCollegeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
            >
              <option>All Colleges</option>
              <option>CUNY</option>
              <option>SUNY</option>
              <option>Private</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Student Records Table */}
      <Card className="p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Student ID</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Name</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">College</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Program</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Total Aid</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Last Updated</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((record) => (
              <tr key={record.id} className="border-b border-border hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">{record.id}</td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-foreground">{record.name}</p>
                    <p className="text-xs text-muted-foreground">{record.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-foreground">{record.college}</td>
                <td className="py-3 px-4 text-foreground">{record.program}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[record.status as keyof typeof statusColors]}`}>
                    {record.status}
                  </span>
                </td>
                <td className="py-3 px-4 font-medium text-foreground">{record.totalAid}</td>
                <td className="py-3 px-4 text-foreground">{record.lastUpdated}</td>
                <td className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Record</DropdownMenuItem>
                      <DropdownMenuItem>Edit Record</DropdownMenuItem>
                      <DropdownMenuItem>View Applications</DropdownMenuItem>
                      <DropdownMenuItem>View Payments</DropdownMenuItem>
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
