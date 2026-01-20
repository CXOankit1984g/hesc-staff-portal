import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, Edit } from "lucide-react";

interface Program {
  id: string;
  name: string;
  description: string;
  type: string;
  funding: { allocated: number; total: number; percentage: number };
  recipients: number;
  maxAward: string;
  deadline: string;
  status: string;
}

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

export default function ProgramDetail() {
  const [, setLocation] = useLocation();
  const [programId] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id") || "PROG-001";
  });

  const program = programsData.find((p) => p.id === programId);

  if (!program) {
    return (
      <div className="p-6">
        <Button onClick={() => setLocation("/grants-scholarships")} variant="outline" className="gap-2 mb-4">
          <ArrowLeft size={18} />
          Back
        </Button>
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">Program not found</p>
        </Card>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    return status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Button onClick={() => setLocation("/grants-scholarships")} variant="outline" className="gap-2 mb-4">
            <ArrowLeft size={18} />
            Back to Grants & Scholarships
          </Button>
          <h1 className="text-3xl font-bold text-foreground">{program.name}</h1>
          <p className="text-muted-foreground">{program.description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Edit size={18} />
            Edit
          </Button>
          <Button variant="outline" className="gap-2">
            <Download size={18} />
            Export
          </Button>
        </div>
      </div>

      {/* Program Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-primary">
          <p className="text-sm text-muted-foreground">Program Type</p>
          <p className="text-2xl font-bold text-foreground">{program.type}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-sm text-muted-foreground">Total Recipients</p>
          <p className="text-2xl font-bold text-foreground">{program.recipients.toLocaleString()}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-sm text-muted-foreground">Max Award</p>
          <p className="text-2xl font-bold text-foreground">{program.maxAward}</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-accent">
          <p className="text-sm text-muted-foreground">Status</p>
          <Badge className={`mt-2 ${getStatusColor(program.status)}`}>{program.status}</Badge>
        </Card>
      </div>

      {/* Funding Status */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Funding Status</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Allocation Progress</span>
              <span className="text-sm font-bold">{program.funding.percentage}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary"
                style={{ width: `${program.funding.percentage}%` }}
              ></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <p className="text-sm text-muted-foreground">Allocated</p>
              <p className="text-lg font-bold">${(program.funding.allocated / 1000000).toFixed(1)}M</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-lg font-bold">${(program.funding.total / 1000000).toFixed(0)}M</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Remaining</p>
              <p className="text-lg font-bold">
                ${(
                  (program.funding.total - program.funding.allocated) /
                  1000000
                ).toFixed(1)}M
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="eligibility" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="awards">Awards</TabsTrigger>
          <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="yeardata">Year Data</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
        </TabsList>

        {/* Eligibility Tab */}
        <TabsContent value="eligibility" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Eligibility Requirements</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium">NY State Residency Required</span>
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium">US Citizenship Required</span>
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium">Minimum GPA</span>
                <Badge className="bg-blue-100 text-blue-800">2.0</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium">Full-Time Enrollment Required</span>
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium">FAFSA Required</span>
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <span className="text-sm font-medium">Degree-Granting Institution</span>
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Awards Tab */}
        <TabsContent value="awards" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Award Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Maximum Award</p>
                  <p className="text-2xl font-bold">{program.maxAward}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Minimum Award</p>
                  <p className="text-2xl font-bold">$500</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Award Frequency</p>
                  <p className="text-lg font-semibold">Annual</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Renewable</p>
                  <p className="text-lg font-semibold">Yes (up to 4 years)</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Award Distribution</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Fall Semester</span>
                    <span className="font-semibold">50%</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Spring Semester</span>
                    <span className="font-semibold">50%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Deadlines Tab */}
        <TabsContent value="deadlines" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Important Deadlines</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div>
                  <p className="font-semibold">Application Deadline</p>
                  <p className="text-sm text-muted-foreground">Last day to submit applications</p>
                </div>
                <p className="text-lg font-bold">{program.deadline}</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="font-semibold">Award Notification Date</p>
                  <p className="text-sm text-muted-foreground">When applicants will be notified</p>
                </div>
                <p className="text-lg font-bold">2024-06-15</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                <div>
                  <p className="font-semibold">Fund Disbursement Date</p>
                  <p className="text-sm text-muted-foreground">When funds will be distributed</p>
                </div>
                <p className="text-lg font-bold">2024-08-01</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div>
                  <p className="font-semibold">Enrollment Verification Deadline</p>
                  <p className="text-sm text-muted-foreground">Last day to verify enrollment</p>
                </div>
                <p className="text-lg font-bold">2024-09-30</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Required Documents</h3>
            <div className="space-y-3">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Program Guidelines</p>
                    <p className="text-sm text-muted-foreground">Official program guidelines and requirements</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Application Form</p>
                    <p className="text-sm text-muted-foreground">Standard application form for this program</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Eligibility Checklist</p>
                    <p className="text-sm text-muted-foreground">Quick reference for eligibility requirements</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">FAQ Document</p>
                    <p className="text-sm text-muted-foreground">Frequently asked questions and answers</p>
                  </div>
                  <Button variant="outline" size="sm">Download</Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Year Data Tab */}
        <TabsContent value="yeardata" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Year-by-Year Data</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold">Academic Year</th>
                    <th className="text-left py-3 px-4 font-semibold">Recipients</th>
                    <th className="text-left py-3 px-4 font-semibold">Total Awarded</th>
                    <th className="text-left py-3 px-4 font-semibold">Avg Award</th>
                    <th className="text-left py-3 px-4 font-semibold">Budget Allocated</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">2023-2024</td>
                    <td className="py-3 px-4">14,856</td>
                    <td className="py-3 px-4">$84.2M</td>
                    <td className="py-3 px-4">$5,665</td>
                    <td className="py-3 px-4">$98.7M</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">2022-2023</td>
                    <td className="py-3 px-4">14,234</td>
                    <td className="py-3 px-4">$80.5M</td>
                    <td className="py-3 px-4">$5,655</td>
                    <td className="py-3 px-4">$95.2M</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">2021-2022</td>
                    <td className="py-3 px-4">13,567</td>
                    <td className="py-3 px-4">$76.8M</td>
                    <td className="py-3 px-4">$5,645</td>
                    <td className="py-3 px-4">$92.1M</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-3 px-4">2020-2021</td>
                    <td className="py-3 px-4">12,890</td>
                    <td className="py-3 px-4">$73.2M</td>
                    <td className="py-3 px-4">$5,635</td>
                    <td className="py-3 px-4">$88.5M</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        {/* Audit Tab */}
        <TabsContent value="audit" className="space-y-4">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Audit Trail</h3>
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Program Created</p>
                    <p className="text-sm text-muted-foreground">Initial program setup</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">January 1, 2024</p>
                    <p className="text-xs text-muted-foreground">by Admin User</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Budget Allocated</p>
                    <p className="text-sm text-muted-foreground">$125,000,000 allocated</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">January 15, 2024</p>
                    <p className="text-xs text-muted-foreground">by Finance Manager</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Eligibility Rules Updated</p>
                    <p className="text-sm text-muted-foreground">Modified GPA requirement to 2.0</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">February 1, 2024</p>
                    <p className="text-xs text-muted-foreground">by Program Director</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Status Changed to Active</p>
                    <p className="text-sm text-muted-foreground">Program is now accepting applications</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">February 15, 2024</p>
                    <p className="text-xs text-muted-foreground">by Admin User</p>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">Application Period Opened</p>
                    <p className="text-sm text-muted-foreground">Deadline set to May 15, 2024</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">March 1, 2024</p>
                    <p className="text-xs text-muted-foreground">by Program Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
