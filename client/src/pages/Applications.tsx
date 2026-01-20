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
import ApplicationDetailModal from "@/components/ApplicationDetailModal";

const applicationsData = [
  {
    id: "APP-2024-001",
    student: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    type: "TAP Grant",
    amount: "$5,165",
    status: "Under Review",
    priority: "High",
    submitted: "2024-01-15",
  },
  {
    id: "APP-2024-002",
    student: "Michael Chen",
    email: "michael.chen@email.com",
    type: "Excelsior Scholarship",
    amount: "$6,470",
    status: "Approved",
    priority: "Normal",
    submitted: "2024-01-14",
  },
  {
    id: "APP-2024-003",
    student: "Emily Rodriguez",
    email: "emily.rodriguez@email.com",
    type: "STEM Incentive",
    amount: "$3,000",
    status: "Pending",
    priority: "Normal",
    submitted: "2024-01-14",
  },
  {
    id: "APP-2024-004",
    student: "David Thompson",
    email: "david.thompson@email.com",
    type: "TAP Grant",
    amount: "$4,350",
    status: "Approved",
    priority: "Low",
    submitted: "2024-01-13",
  },
  {
    id: "APP-2024-005",
    student: "Jessica Williams",
    email: "jessica.williams@email.com",
    type: "Dream Act",
    amount: "$5,500",
    status: "Under Review",
    priority: "High",
    submitted: "2024-01-13",
  },
  {
    id: "APP-2024-006",
    student: "Robert Davis",
    email: "robert.davis@email.com",
    type: "Enhanced Tuition Award",
    amount: "$6,000",
    status: "Rejected",
    priority: "Normal",
    submitted: "2024-01-12",
  },
];

const statusColors = {
  "Approved": "bg-green-100 text-green-800",
  "Under Review": "bg-yellow-100 text-yellow-800",
  "Pending": "bg-blue-100 text-blue-800",
  "Rejected": "bg-red-100 text-red-800",
};

const priorityColors = {
  "High": "bg-red-100 text-red-800",
  "Normal": "bg-gray-100 text-gray-800",
  "Low": "bg-gray-50 text-gray-600",
};

export default function Applications() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedApplication, setSelectedApplication] = useState<typeof applicationsData[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleApplicationClick = (app: typeof applicationsData[0]) => {
    setSelectedApplication(app);
    setIsModalOpen(true);
  };

  const filteredApplications = applicationsData.filter((app) => {
    const matchesSearch =
      app.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesType = typeFilter === "All" || app.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Applications</h1>
        <p className="text-muted-foreground">Manage and review financial aid applications</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button className="bg-primary hover:bg-primary/90 flex gap-2">
          <Plus size={18} />
          New Application
        </Button>
        <Button variant="outline" className="flex gap-2">
          <Download size={18} />
          Export
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-primary">
          <p className="text-sm text-muted-foreground">Total Applications</p>
          <p className="text-2xl font-bold text-foreground">2,847</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-sm text-muted-foreground">Approved</p>
          <p className="text-2xl font-bold text-foreground">1,923</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-sm text-muted-foreground">Under Review</p>
          <p className="text-2xl font-bold text-foreground">542</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-accent">
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold text-foreground">$4.2M</p>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Application Management</h3>
        <p className="text-sm text-muted-foreground mb-4">Search, filter, and manage financial aid applications</p>

        <div className="space-y-4">
          {/* Search */}
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="Search by student name, application ID, or email..."
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
              <option>Approved</option>
              <option>Under Review</option>
              <option>Pending</option>
              <option>Rejected</option>
            </select>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
            >
              <option>All Types</option>
              <option>TAP Grant</option>
              <option>Excelsior Scholarship</option>
              <option>STEM Incentive</option>
              <option>Dream Act</option>
              <option>Enhanced Tuition Award</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Applications Table */}
      <Card className="p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-4 font-semibold text-foreground">Application ID</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Student</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Type</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Amount</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Status</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Priority</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Submitted</th>
              <th className="text-left py-3 px-4 font-semibold text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.id} className="border-b border-border hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-medium text-foreground">
                  <button
                    onClick={() => handleApplicationClick(app)}
                    className="text-primary hover:text-primary/80 hover:underline cursor-pointer"
                  >
                    {app.id}
                  </button>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <p className="font-medium text-foreground">{app.student}</p>
                    <p className="text-xs text-muted-foreground">{app.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-foreground">{app.type}</td>
                <td className="py-3 px-4 font-medium text-foreground">{app.amount}</td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status as keyof typeof statusColors]}`}>
                    {app.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${priorityColors[app.priority as keyof typeof priorityColors]}`}>
                    {app.priority}
                  </span>
                </td>
                <td className="py-3 px-4 text-foreground">{app.submitted}</td>
                <td className="py-3 px-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleApplicationClick(app)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>Change Status</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Application Detail Modal */}
      {selectedApplication && (
        <ApplicationDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          application={{
            id: selectedApplication.id,
            studentName: selectedApplication.student,
            email: selectedApplication.email,
            status: selectedApplication.status as "New" | "Under Review" | "Pending" | "Approved" | "Rejected",
            amount: parseFloat(selectedApplication.amount.replace(/[$,]/g, "")),
            submittedDate: selectedApplication.submitted,
          }}
        />
      )}
    </div>
  );
}
