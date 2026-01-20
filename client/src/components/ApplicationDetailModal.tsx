import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  Download,
  Eye,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

interface ApplicationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  application: {
    id: string;
    studentName: string;
    email: string;
    status: "New" | "Under Review" | "Pending" | "Approved" | "Rejected";
    amount: number;
    submittedDate: string;
  };
}

interface WorkflowStage {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
  description?: string;
}

export default function ApplicationDetailModal({
  isOpen,
  onClose,
  application,
}: ApplicationDetailModalProps) {
  const [currentStatus, setCurrentStatus] = useState(application.status);
  const [reviewerComments, setReviewerComments] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Define workflow stages based on current path
  const getWorkflowStages = (): WorkflowStage[] => {
    // Always start with New and Under Review as completed
    const baseStages: WorkflowStage[] = [
      { id: "new", label: "New", status: "completed", description: "Application submitted" },
      { id: "under-review", label: "Under Review", status: "completed", description: "Being reviewed by staff" },
    ];

    // Add the final stage based on current status
    if (currentStatus === "New") {
      // If still new, show Under Review as upcoming
      baseStages[1].status = "current";
    } else if (currentStatus === "Under Review") {
      baseStages[1].status = "current";
    } else if (currentStatus === "Pending") {
      baseStages.push({ 
        id: "pending", 
        label: "Pending (Needs Info)", 
        status: "current",
        description: "Awaiting additional information from applicant"
      });
    } else if (currentStatus === "Approved") {
      baseStages.push({ 
        id: "approved", 
        label: "Approved", 
        status: "current",
        description: "Application has been approved"
      });
    } else if (currentStatus === "Rejected") {
      baseStages.push({ 
        id: "rejected", 
        label: "Rejected", 
        status: "current",
        description: "Application has been rejected"
      });
    }

    return baseStages;
  };

  const workflowStages = getWorkflowStages();

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-gray-100 text-gray-800";
      case "Under Review":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Approved":
        return "bg-green-100 text-green-800";
      case "Rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStageIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "current":
        return <Clock className="w-6 h-6 text-blue-600" />;
      case "upcoming":
        return <AlertCircle className="w-6 h-6 text-gray-400" />;
      default:
        return null;
    }
  };

  const handleApprove = async () => {
    setIsProcessing(true);
    try {
      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setCurrentStatus("Approved");
      toast.success(
        `Application approved! Email sent to agupta@cloudandthings.com with subject: "${application.id} - Application Approved"`
      );
      
      // Log to case history
      console.log(
        `Email sent: Congratulations ${application.studentName}, Your application has been approved.`
      );
    } catch (error) {
      toast.error("Failed to approve application");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDecline = async () => {
    setIsProcessing(true);
    try {
      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setCurrentStatus("Rejected");
      toast.success(
        `Application declined! Email sent to agupta@cloudandthings.com with subject: "${application.id} - Application Rejected"`
      );
      
      // Log to case history
      console.log(
        `Email sent: Hi ${application.studentName}, Your application has been rejected. Please contact HESC for further information or appeal.`
      );
    } catch (error) {
      toast.error("Failed to decline application");
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePending = async () => {
    if (!reviewerComments.trim()) {
      toast.error("Please provide reviewer comments before marking as pending");
      return;
    }

    setIsProcessing(true);
    try {
      // Simulate email sending
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setCurrentStatus("Pending");
      toast.success(
        `Application marked as pending! Email sent to agupta@cloudandthings.com with subject: "${application.id} - Needs additional Information"`
      );
      
      // Log to case history
      console.log(
        `Email sent with reviewer comments: ${reviewerComments}`
      );
    } catch (error) {
      toast.error("Failed to mark application as pending");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
        <DialogHeader className="sticky top-0 bg-white z-10 pb-4">
          <DialogTitle className="text-3xl">
            Application Details - {application.id}
          </DialogTitle>
        </DialogHeader>

        {/* Case Workflow Visualization - Enhanced */}
        <div className="bg-gradient-to-r from-blue-50 via-teal-50 to-blue-50 p-8 rounded-lg border-2 border-blue-200 mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">
            📊 Case Workflow Status
          </h3>
          
          {/* Workflow Steps */}
          <div className="flex items-stretch justify-between gap-2 mb-8">
            {workflowStages.map((stage, index) => (
              <div key={stage.id} className="flex-1 flex flex-col items-center">
                {/* Stage Circle */}
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all ${
                    stage.status === "completed"
                      ? "bg-green-100 ring-2 ring-green-400"
                      : stage.status === "current"
                      ? "bg-blue-100 ring-2 ring-blue-500 scale-110"
                      : "bg-gray-100 ring-2 ring-gray-300"
                  }`}
                >
                  {getStageIcon(stage.status)}
                </div>
                
                {/* Stage Label */}
                <p className="text-sm font-bold text-gray-800 text-center mb-1">
                  {stage.label}
                </p>
                
                {/* Stage Description */}
                {stage.description && (
                  <p className="text-xs text-gray-600 text-center max-w-24">
                    {stage.description}
                  </p>
                )}

                {/* Connector Line */}
                {index < workflowStages.length - 1 && (
                  <div
                    className={`absolute mt-20 w-12 h-1 ${
                      stage.status === "completed"
                        ? "bg-green-400"
                        : "bg-gray-300"
                    }`}
                    style={{
                      left: `calc(${((index + 1) / workflowStages.length) * 100}% - 24px)`,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Status Summary */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-blue-200">
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-600 uppercase">Current Status</p>
              <Badge className={`mt-2 text-sm py-1 px-3 ${getStatusColor(currentStatus)}`}>
                {currentStatus}
              </Badge>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-600 uppercase">Submitted Date</p>
              <p className="text-sm font-medium text-gray-900 mt-2">
                {application.submittedDate}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs font-semibold text-gray-600 uppercase">Application Amount</p>
              <p className="text-sm font-medium text-gray-900 mt-2">
                ${application.amount.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="financial">Financial</TabsTrigger>
          </TabsList>

          {/* Personal Info Tab */}
          <TabsContent value="personal" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <Input
                    value={application.studentName}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <Input
                    value="01/15/2002"
                    disabled
                    className="mt-1"
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <Input
                    value="123 Main Street, New York, NY 10001"
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    value={application.email}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <Input
                    value="(555) 123-4567"
                    disabled
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Educational Background Tab */}
          <TabsContent value="education" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Educational Background
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Undergraduate Degree
                  </label>
                  <Input
                    value="Bachelor of Science in Computer Science"
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Undergraduate Institution
                  </label>
                  <Input
                    value="State University of New York"
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Current Graduate Program
                  </label>
                  <Input
                    value="Master of Science in Data Science"
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Current Institution
                  </label>
                  <Input
                    value="Columbia University"
                    disabled
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Eligibility Requirements Tab */}
          <TabsContent value="eligibility" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Eligibility Requirements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium">NY State Residency</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium">Citizenship Status</span>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium">GPA Requirement</span>
                  <Badge className="bg-green-100 text-green-800">3.5/4.0</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium">Enrollment Status</span>
                  <Badge className="bg-green-100 text-green-800">Full-Time</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium">Program Eligibility</span>
                  <Badge className="bg-green-100 text-green-800">Eligible</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm font-medium">Service Agreement</span>
                  <Badge className="bg-green-100 text-green-800">Signed</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Uploaded Documents Tab */}
          <TabsContent value="documents" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Uploaded Documents</h3>
              <div className="space-y-3">
                {[
                  "Academic_Transcripts.pdf",
                  "Residency_Proof.pdf",
                  "Enrollment_Proof.pdf",
                  "Service_Agreement.pdf",
                ].map((doc) => (
                  <div
                    key={doc}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">{doc}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Financial Information Tab */}
          <TabsContent value="financial" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Financial Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Requested Amount
                  </label>
                  <Input
                    value={`$${application.amount.toLocaleString()}`}
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Previous Awards
                  </label>
                  <Input
                    value="$5,000 (2023-2024)"
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Award Period
                  </label>
                  <Input
                    value="2024-2025 Academic Year"
                    disabled
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Financial Need Assessment
                  </label>
                  <Input
                    value="High Need"
                    disabled
                    className="mt-1"
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Additional Tabs */}
        <Tabs defaultValue="reviewer" className="w-full mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reviewer">Reviewer Decision</TabsTrigger>
            <TabsTrigger value="history">Case History</TabsTrigger>
            <TabsTrigger value="correspondence">Correspondence</TabsTrigger>
          </TabsList>

          {/* Reviewer Decision Tab */}
          <TabsContent value="reviewer" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Reviewer Comments</h3>
              <Textarea
                placeholder="Enter your reviewer comments and guidance here..."
                value={reviewerComments}
                onChange={(e) => setReviewerComments(e.target.value)}
                className="min-h-32 mb-4"
              />
              <p className="text-xs text-gray-500 mb-4">
                These comments will be sent to the applicant if you mark the application as pending.
              </p>
            </Card>
          </TabsContent>

          {/* Case History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Case History</h3>
              <div className="space-y-3">
                <div className="flex gap-3 pb-3 border-b">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Application Submitted</p>
                    <p className="text-xs text-gray-500">
                      {application.submittedDate}
                    </p>
                  </div>
                </div>
                <div className="flex gap-3 pb-3 border-b">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Status: Under Review</p>
                    <p className="text-xs text-gray-500">
                      January 19, 2026
                    </p>
                  </div>
                </div>
                {currentStatus !== "New" && currentStatus !== "Under Review" && (
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div
                        className={`flex items-center justify-center h-8 w-8 rounded-full ${
                          currentStatus === "Approved"
                            ? "bg-green-100"
                            : currentStatus === "Rejected"
                            ? "bg-red-100"
                            : "bg-yellow-100"
                        }`}
                      >
                        {currentStatus === "Approved" ? (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        ) : currentStatus === "Rejected" ? (
                          <XCircle className="w-4 h-4 text-red-600" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-600" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        Status: {currentStatus}
                      </p>
                      <p className="text-xs text-gray-500">
                        January 20, 2026
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>

          {/* Correspondence Tab */}
          <TabsContent value="correspondence" className="space-y-4">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Correspondence Logs</h3>
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm font-medium">Application Confirmation Email</p>
                  <p className="text-xs text-gray-600 mt-1">
                    Sent to: {application.email}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    January 19, 2026 - 10:30 AM
                  </p>
                </div>
                {currentStatus === "Approved" && (
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-medium">Application Approved Email</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Subject: {application.id} - Application Approved
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      January 20, 2026 - 2:15 PM
                    </p>
                  </div>
                )}
                {currentStatus === "Rejected" && (
                  <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-sm font-medium">Application Rejected Email</p>
                    <p className="text-xs text-gray-600 mt-1">
                      Subject: {application.id} - Application Rejected
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      January 20, 2026 - 2:15 PM
                    </p>
                  </div>
                )}
                {currentStatus === "Pending" && (
                  <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-sm font-medium">
                      Additional Information Requested Email
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Subject: {application.id} - Needs additional Information
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      January 20, 2026 - 2:15 PM
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-8 pt-6 border-t sticky bottom-0 bg-white">
          <Button
            onClick={handleApprove}
            disabled={isProcessing || currentStatus === "Approved"}
            className="flex-1 bg-teal-600 hover:bg-teal-700 text-white text-base py-6"
          >
            {isProcessing ? "Processing..." : "Approve Application"}
          </Button>
          <Button
            onClick={handlePending}
            disabled={isProcessing || currentStatus === "Pending"}
            className="flex-1 bg-blue-900 hover:bg-blue-950 text-white text-base py-6"
          >
            {isProcessing ? "Processing..." : "Pending - Request Information"}
          </Button>
          <Button
            onClick={handleDecline}
            disabled={isProcessing || currentStatus === "Rejected"}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white text-base py-6"
          >
            {isProcessing ? "Processing..." : "Decline Application"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
