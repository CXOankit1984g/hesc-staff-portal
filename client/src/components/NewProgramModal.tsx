import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

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

interface NewProgramModalProps {
  programs: Program[];
  onProgramCreate?: (program: any) => void;
}

// Custom Toggle Switch Component with HESC colors
function HESCToggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-[#0B5A66]" : "bg-[#FFAC00]"
      }`}
      role="switch"
      aria-checked={checked}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function NewProgramModal({ programs, onProgramCreate }: NewProgramModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [newProgramData, setNewProgramData] = useState({
    code: "",
    abbreviation: "",
    title: "",
    category: "Grant",
    status: "Active",
    effectiveDate: new Date().toISOString().split("T")[0],
    sunsetDate: "",
    enableAutoID: false,
  });

  const [eligibilityRules, setEligibilityRules] = useState({
    allowUndergraduate: true,
    maxUndergraduatePoints: 100,
    allowGraduate: true,
    maxGraduatePoints: 150,
    degreeGrantingSchoolRequired: true,
    vocationalSchoolAllowed: false,
    outOfStateStudyAllowed: true,
    fullTimeStudyRequired: false,
    partTimeStudyAllowed: true,
    leaveAllowed: false,
    fafsaRequired: true,
    nysApplicationRequired: true,
    nysResidencyRequired: true,
    usCitizenRequired: false,
  });

  const [awardRules, setAwardRules] = useState({
    minAward: 500,
    maxAward: 5665,
    awardFrequency: "Annual",
    renewable: true,
    renewalYears: 4,
    fallDistribution: 50,
    springDistribution: 50,
  });

  const [deadlineRules, setDeadlineRules] = useState({
    applicationDeadline: "",
    awardNotificationDate: "",
    fundDisbursementDate: "",
    enrollmentVerificationDeadline: "",
  });

  const handleToggle = (key: keyof typeof eligibilityRules) => {
    if (typeof eligibilityRules[key] === "boolean") {
      setEligibilityRules({
        ...eligibilityRules,
        [key]: !eligibilityRules[key],
      });
    }
  };

  const handleInputChange = (key: keyof typeof eligibilityRules, value: string) => {
    setEligibilityRules({
      ...eligibilityRules,
      [key]: isNaN(Number(value)) ? value : Number(value),
    });
  };

  const handleAwardChange = (key: keyof typeof awardRules, value: string | number) => {
    setAwardRules({
      ...awardRules,
      [key]: typeof value === "string" ? (isNaN(Number(value)) ? value : Number(value)) : value,
    });
  };

  const handleDeadlineChange = (key: keyof typeof deadlineRules, value: string) => {
    setDeadlineRules({
      ...deadlineRules,
      [key]: value,
    });
  };

  const handleNewProgramChange = (field: string, value: string | boolean) => {
    setNewProgramData({
      ...newProgramData,
      [field]: value,
    });
  };

  const handleCreateProgram = () => {
    if (!newProgramData.code || !newProgramData.title || !newProgramData.sunsetDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newProgram = {
      id: `PROG-${Date.now()}`,
      code: newProgramData.code,
      name: newProgramData.title,
      category: newProgramData.category,
      status: newProgramData.status,
      effectiveDate: newProgramData.effectiveDate,
      sunsetDate: newProgramData.sunsetDate,
      eligibility: eligibilityRules,
      awards: awardRules,
      deadlines: deadlineRules,
    };

    if (onProgramCreate) {
      onProgramCreate(newProgram);
    }

    setIsOpen(false);
    setStep(1);
    setNewProgramData({
      code: "",
      abbreviation: "",
      title: "",
      category: "Grant",
      status: "Active",
      effectiveDate: new Date().toISOString().split("T")[0],
      sunsetDate: "",
      enableAutoID: false,
    });
    toast.success("Program created successfully");
  };

  const handleReset = () => {
    setStep(1);
    setNewProgramData({
      code: "",
      abbreviation: "",
      title: "",
      category: "Grant",
      status: "Active",
      effectiveDate: new Date().toISOString().split("T")[0],
      sunsetDate: "",
      enableAutoID: false,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 flex gap-2">
          <Plus size={18} />
          New Program
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Program</DialogTitle>
          <DialogDescription>
            {step === 1 && "Step 1 of 5: Choose to copy from existing or start fresh"}
            {step === 2 && "Step 2 of 5: Program code, title, and dates"}
            {step === 3 && "Step 3 of 5: Configure eligibility requirements"}
            {step === 4 && "Step 4 of 5: Set award amounts and deadlines"}
            {step === 5 && "Step 5 of 5: Review program settings"}
          </DialogDescription>
        </DialogHeader>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>

        {/* Step 1: Copy Program */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select a Program to Copy From</p>
            <div className="space-y-2">
              {programs.map((program) => (
                <div
                  key={program.id}
                  onClick={() => {
                    setNewProgramData({
                      ...newProgramData,
                      code: program.id,
                      title: program.name,
                      category: program.type,
                    });
                    setStep(2);
                  }}
                  className="p-4 border border-border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <p className="font-semibold text-foreground">{program.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ID: {program.id} • Type: {program.type} • Max Award: {program.maxAward}
                  </p>
                </div>
              ))}
            </div>
            <div
              onClick={() => setStep(2)}
              className="p-4 border border-border rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
            >
              <p className="font-semibold text-foreground">Start Fresh (No Copy)</p>
              <p className="text-sm text-muted-foreground">Create a new program from scratch</p>
            </div>
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="code">Program Code *</Label>
              <Input
                id="code"
                placeholder="e.g., TAP"
                value={newProgramData.code}
                onChange={(e) => handleNewProgramChange("code", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="abbreviation">Abbreviation</Label>
              <Input
                id="abbreviation"
                placeholder="e.g., TAP"
                value={newProgramData.abbreviation}
                onChange={(e) => handleNewProgramChange("abbreviation", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="title">Program Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Tuition Assistance Program"
                value={newProgramData.title}
                onChange={(e) => handleNewProgramChange("title", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={newProgramData.category} onValueChange={(value) => handleNewProgramChange("category", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Grant">Grant</SelectItem>
                  <SelectItem value="Loan">Loan</SelectItem>
                  <SelectItem value="Scholarship">Scholarship</SelectItem>
                  <SelectItem value="Tax Credit">Tax Credit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={newProgramData.status} onValueChange={(value) => handleNewProgramChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Input
                  id="effectiveDate"
                  type="date"
                  value={newProgramData.effectiveDate}
                  onChange={(e) => handleNewProgramChange("effectiveDate", e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="sunsetDate">Sunset Date *</Label>
                <Input
                  id="sunsetDate"
                  type="date"
                  value={newProgramData.sunsetDate}
                  onChange={(e) => handleNewProgramChange("sunsetDate", e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <HESCToggle
                checked={newProgramData.enableAutoID}
                onChange={() => handleNewProgramChange("enableAutoID", !newProgramData.enableAutoID)}
              />
              <Label className="text-sm">Enable Auto ID Processing</Label>
            </div>
          </div>
        )}

        {/* Step 3: Eligibility */}
        {step === 3 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Configure eligibility requirements for this program</p>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">Undergraduate</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Allow Undergraduate Awards</Label>
                    <HESCToggle
                      checked={eligibilityRules.allowUndergraduate}
                      onChange={() => handleToggle("allowUndergraduate")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Max Undergraduate Points</Label>
                    <Input
                      type="number"
                      value={eligibilityRules.maxUndergraduatePoints}
                      onChange={(e) => handleInputChange("maxUndergraduatePoints", e.target.value)}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>

              <div className="border-b pb-4">
                <h4 className="font-semibold mb-3">Graduate</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Allow Graduate Awards</Label>
                    <HESCToggle
                      checked={eligibilityRules.allowGraduate}
                      onChange={() => handleToggle("allowGraduate")}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Max Graduate Points</Label>
                    <Input
                      type="number"
                      value={eligibilityRules.maxGraduatePoints}
                      onChange={(e) => handleInputChange("maxGraduatePoints", e.target.value)}
                      className="w-20"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Degree Granting School Required</Label>
                  <HESCToggle
                    checked={eligibilityRules.degreeGrantingSchoolRequired}
                    onChange={() => handleToggle("degreeGrantingSchoolRequired")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Full-Time Study Required</Label>
                  <HESCToggle
                    checked={eligibilityRules.fullTimeStudyRequired}
                    onChange={() => handleToggle("fullTimeStudyRequired")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">NY Residency Required</Label>
                  <HESCToggle
                    checked={eligibilityRules.nysResidencyRequired}
                    onChange={() => handleToggle("nysResidencyRequired")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">FAFSA Required</Label>
                  <HESCToggle
                    checked={eligibilityRules.fafsaRequired}
                    onChange={() => handleToggle("fafsaRequired")}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Awards & Deadlines */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold mb-4">Award Configuration</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Minimum Award</Label>
                    <Input
                      type="number"
                      value={awardRules.minAward}
                      onChange={(e) => handleAwardChange("minAward", e.target.value)}
                      placeholder="e.g., 500"
                    />
                  </div>
                  <div>
                    <Label className="text-sm">Maximum Award</Label>
                    <Input
                      type="number"
                      value={awardRules.maxAward}
                      onChange={(e) => handleAwardChange("maxAward", e.target.value)}
                      placeholder="e.g., 5665"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm">Award Frequency</Label>
                    <Select value={awardRules.awardFrequency} onValueChange={(value) => handleAwardChange("awardFrequency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Annual">Annual</SelectItem>
                        <SelectItem value="Semester">Semester</SelectItem>
                        <SelectItem value="Monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-sm">Renewable Years</Label>
                    <Input
                      type="number"
                      value={awardRules.renewalYears}
                      onChange={(e) => handleAwardChange("renewalYears", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Deadlines</h4>
              <div className="space-y-4">
                <div>
                  <Label className="text-sm">Application Deadline</Label>
                  <Input
                    type="date"
                    value={deadlineRules.applicationDeadline}
                    onChange={(e) => handleDeadlineChange("applicationDeadline", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm">Award Notification Date</Label>
                  <Input
                    type="date"
                    value={deadlineRules.awardNotificationDate}
                    onChange={(e) => handleDeadlineChange("awardNotificationDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label className="text-sm">Fund Disbursement Date</Label>
                  <Input
                    type="date"
                    value={deadlineRules.fundDisbursementDate}
                    onChange={(e) => handleDeadlineChange("fundDisbursementDate", e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Review */}
        {step === 5 && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Review your program settings before creating</p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <p className="text-xs text-muted-foreground">Program Code</p>
                <p className="font-semibold">{newProgramData.code}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Program Title</p>
                <p className="font-semibold">{newProgramData.title}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Category</p>
                  <p className="font-semibold">{newProgramData.category}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Status</p>
                  <p className="font-semibold">{newProgramData.status}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Max Award</p>
                  <p className="font-semibold">${awardRules.maxAward}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Application Deadline</p>
                  <p className="font-semibold">{deadlineRules.applicationDeadline || "Not set"}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 justify-end pt-4">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          {step > 1 && (
            <Button variant="outline" onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          {step < 5 && (
            <Button onClick={() => setStep(step + 1)} className="bg-primary hover:bg-primary/90">
              Next
            </Button>
          )}
          {step === 5 && (
            <Button onClick={handleCreateProgram} className="bg-primary hover:bg-primary/90">
              Create Program
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
