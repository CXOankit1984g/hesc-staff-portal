import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Save, RotateCcw, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Program {
  id: string;
  code: string;
  name: string;
  category: string;
  status: "active" | "inactive";
  effectiveDate: string;
  sunsetDate: string;
}

const initialProgramsData: Program[] = [
  {
    id: "1",
    code: "GRANT",
    name: "NYS Grant Program",
    category: "Grant",
    status: "active",
    effectiveDate: "2024-01-01",
    sunsetDate: "2025-12-31",
  },
  {
    id: "2",
    code: "LOAN",
    name: "NYS Loan Program",
    category: "Loan",
    status: "active",
    effectiveDate: "2024-01-01",
    sunsetDate: "2025-12-31",
  },
  {
    id: "3",
    code: "SCHOLAR",
    name: "Merit Scholarship",
    category: "Scholarship",
    status: "inactive",
    effectiveDate: "2023-01-01",
    sunsetDate: "2024-12-31",
  },
];

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

export default function Programs() {
  const [programs, setPrograms] = useState<Program[]>(initialProgramsData);
  const [selectedProgram, setSelectedProgram] = useState<Program>(initialProgramsData[0]);
  const [isNewProgramOpen, setIsNewProgramOpen] = useState(false);
  const [newProgramStep, setNewProgramStep] = useState(1);
  const [newProgramData, setNewProgramData] = useState({
    code: "",
    abbreviation: "",
    title: "",
    category: "Grant",
    status: "active",
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
    lengthOfAvailability: 4,
    nysResidencyRequired: true,
    usCitizenRequired: false,
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

    const newProgram: Program = {
      id: Date.now().toString(),
      code: newProgramData.code,
      name: newProgramData.title,
      category: newProgramData.category,
      status: newProgramData.status as "active" | "inactive",
      effectiveDate: newProgramData.effectiveDate,
      sunsetDate: newProgramData.sunsetDate,
    };

    setPrograms([...programs, newProgram]);
    setSelectedProgram(newProgram);
    setIsNewProgramOpen(false);
    setNewProgramStep(1);
    setNewProgramData({
      code: "",
      abbreviation: "",
      title: "",
      category: "Grant",
      status: "active",
      effectiveDate: new Date().toISOString().split("T")[0],
      sunsetDate: "",
      enableAutoID: false,
    });
    toast.success("Program created successfully");
  };

  const handleSaveEligibility = () => {
    toast.success("Eligibility rules saved successfully");
  };

  const handleResetDefault = () => {
    setEligibilityRules({
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
      lengthOfAvailability: 4,
      nysResidencyRequired: true,
      usCitizenRequired: false,
    });
    toast.success("Reset to default values");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Program Management</h1>
        <p className="text-muted-foreground">Configure programs, eligibility rules, and payment options</p>
      </div>

      {/* New Program Button */}
      <Dialog open={isNewProgramOpen} onOpenChange={setIsNewProgramOpen}>
        <DialogTrigger asChild>
          <Button className="bg-primary hover:bg-primary/90 gap-2">
            <Plus size={18} />
            New Program
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Program</DialogTitle>
            <DialogDescription>
              {newProgramStep === 1 && "Step 1 of 5: Choose to copy from existing or start fresh"}
              {newProgramStep === 2 && "Step 2 of 5: Program code, title, and dates"}
              {newProgramStep === 3 && "Step 3 of 5: Configure eligibility requirements"}
              {newProgramStep === 4 && "Step 4 of 5: Set award amounts and options"}
              {newProgramStep === 5 && "Step 5 of 5: Review program settings"}
            </DialogDescription>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{ width: `${(newProgramStep / 5) * 100}%` }}
            />
          </div>

          {/* Step 1: Copy Program */}
          {newProgramStep === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Select a Program to Copy From</p>
              <div className="space-y-2">
                {programs.map((program) => (
                  <div
                    key={program.id}
                    className="p-4 border border-border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <p className="font-semibold text-foreground">{program.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Code: {program.code} • Category: {program.category} • Max Award: $5000/year
                    </p>
                  </div>
                ))}
              </div>
              <div className="p-4 border border-border rounded-lg bg-blue-50">
                <p className="font-semibold text-foreground">Start Fresh (No Copy)</p>
                <p className="text-sm text-muted-foreground">Create a new program from scratch</p>
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {newProgramStep === 2 && (
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
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
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
          {newProgramStep === 3 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Configure eligibility requirements for this program</p>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Allow Undergraduate Awards</Label>
                  <HESCToggle
                    checked={eligibilityRules.allowUndergraduate}
                    onChange={() => handleToggle("allowUndergraduate")}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Allow Graduate Awards</Label>
                  <HESCToggle
                    checked={eligibilityRules.allowGraduate}
                    onChange={() => handleToggle("allowGraduate")}
                  />
                </div>
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
              </div>
            </div>
          )}

          {/* Step 4: Awards */}
          {newProgramStep === 4 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Set award amounts and payment options</p>
              <div className="text-center py-8 text-muted-foreground">
                Award configuration options will be available here
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {newProgramStep === 5 && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">Review your program settings before creating</p>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                <p><strong>Code:</strong> {newProgramData.code}</p>
                <p><strong>Title:</strong> {newProgramData.title}</p>
                <p><strong>Category:</strong> {newProgramData.category}</p>
                <p><strong>Status:</strong> {newProgramData.status}</p>
                <p><strong>Effective Date:</strong> {newProgramData.effectiveDate}</p>
                <p><strong>Sunset Date:</strong> {newProgramData.sunsetDate}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 justify-end pt-4">
            <Button variant="outline" onClick={() => setIsNewProgramOpen(false)}>
              Cancel
            </Button>
            {newProgramStep > 1 && (
              <Button variant="outline" onClick={() => setNewProgramStep(newProgramStep - 1)}>
                Back
              </Button>
            )}
            {newProgramStep < 5 && (
              <Button onClick={() => setNewProgramStep(newProgramStep + 1)} className="bg-primary hover:bg-primary/90">
                Next
              </Button>
            )}
            {newProgramStep === 5 && (
              <Button onClick={handleCreateProgram} className="bg-primary hover:bg-primary/90">
                Create Program
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Programs List */}
        <Card className="p-4 lg:col-span-1">
          <h3 className="font-semibold text-foreground mb-4">Programs</h3>
          <p className="text-xs text-muted-foreground mb-4">Select a program to configure</p>
          <div className="space-y-2">
            {programs.map((program) => (
              <div
                key={program.id}
                onClick={() => setSelectedProgram(program)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedProgram.id === program.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200 text-foreground"
                }`}
              >
                <div className="font-semibold text-sm">{program.code}</div>
                <div className="text-xs mt-1">{program.name}</div>
                <div
                  className={`text-xs mt-2 px-2 py-1 rounded-full w-fit ${
                    program.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-300 text-gray-800"
                  }`}
                >
                  {program.status.charAt(0).toUpperCase() + program.status.slice(1)}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Program Details */}
        <Card className="p-6 lg:col-span-3">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-foreground">{selectedProgram.name}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    selectedProgram.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {selectedProgram.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{selectedProgram.category} Program</p>
            </div>
          </div>

          {/* Program Info Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 pb-6 border-b border-border">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Program Code</p>
              <p className="font-semibold text-foreground">{selectedProgram.code}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Category</p>
              <p className="font-semibold text-foreground">{selectedProgram.category}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Effective Date</p>
              <p className="font-semibold text-foreground">{selectedProgram.effectiveDate}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Sunset Date</p>
              <p className="font-semibold text-foreground">{selectedProgram.sunsetDate}</p>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="eligibility" className="w-full">
            <TabsList className="grid w-full grid-cols-7 mb-6">
              <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
              <TabsTrigger value="awards">Awards</TabsTrigger>
              <TabsTrigger value="deadlines">Deadlines</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="postgrad">Post-Grad</TabsTrigger>
              <TabsTrigger value="yeardata">Year Data</TabsTrigger>
              <TabsTrigger value="audit">Audit</TabsTrigger>
            </TabsList>

            {/* Eligibility Tab */}
            <TabsContent value="eligibility" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Eligibility Rules</h3>
                <p className="text-sm text-muted-foreground mb-6">Configure program eligibility requirements</p>

                {/* Undergraduate Section */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-semibold text-foreground mb-4">Undergraduate</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Allow Undergraduate Awards</label>
                      <HESCToggle
                        checked={eligibilityRules.allowUndergraduate}
                        onChange={() => handleToggle("allowUndergraduate")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Max Undergraduate Points</label>
                      <input
                        type="number"
                        value={eligibilityRules.maxUndergraduatePoints}
                        onChange={(e) => handleInputChange("maxUndergraduatePoints", e.target.value)}
                        className="w-20 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Graduate Section */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-semibold text-foreground mb-4">Graduate</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Allow Graduate Awards</label>
                      <HESCToggle
                        checked={eligibilityRules.allowGraduate}
                        onChange={() => handleToggle("allowGraduate")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Max Graduate Points</label>
                      <input
                        type="number"
                        value={eligibilityRules.maxGraduatePoints}
                        onChange={(e) => handleInputChange("maxGraduatePoints", e.target.value)}
                        className="w-20 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* School Requirements Section */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-semibold text-foreground mb-4">School Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Degree Granting School Required</label>
                      <HESCToggle
                        checked={eligibilityRules.degreeGrantingSchoolRequired}
                        onChange={() => handleToggle("degreeGrantingSchoolRequired")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Vocational School Allowed</label>
                      <HESCToggle
                        checked={eligibilityRules.vocationalSchoolAllowed}
                        onChange={() => handleToggle("vocationalSchoolAllowed")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Out-of-State Study Allowed</label>
                      <HESCToggle
                        checked={eligibilityRules.outOfStateStudyAllowed}
                        onChange={() => handleToggle("outOfStateStudyAllowed")}
                      />
                    </div>
                  </div>
                </div>

                {/* Enrollment Requirements Section */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-semibold text-foreground mb-4">Enrollment Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Full-Time Study Required</label>
                      <HESCToggle
                        checked={eligibilityRules.fullTimeStudyRequired}
                        onChange={() => handleToggle("fullTimeStudyRequired")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Part-Time Study Allowed</label>
                      <HESCToggle
                        checked={eligibilityRules.partTimeStudyAllowed}
                        onChange={() => handleToggle("partTimeStudyAllowed")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Leave Allowed</label>
                      <HESCToggle
                        checked={eligibilityRules.leaveAllowed}
                        onChange={() => handleToggle("leaveAllowed")}
                      />
                    </div>
                  </div>
                </div>

                {/* Application Requirements Section */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-semibold text-foreground mb-4">Application Requirements</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">FAFSA / Federal App Required</label>
                      <HESCToggle
                        checked={eligibilityRules.fafsaRequired}
                        onChange={() => handleToggle("fafsaRequired")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">NYS Application Required</label>
                      <HESCToggle
                        checked={eligibilityRules.nysApplicationRequired}
                        onChange={() => handleToggle("nysApplicationRequired")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Length of Availability (years)</label>
                      <input
                        type="number"
                        value={eligibilityRules.lengthOfAvailability}
                        onChange={(e) => handleInputChange("lengthOfAvailability", e.target.value)}
                        className="w-20 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Residency & Citizenship Section */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-4">Residency & Citizenship</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">NYS Residency Required</label>
                      <HESCToggle
                        checked={eligibilityRules.nysResidencyRequired}
                        onChange={() => handleToggle("nysResidencyRequired")}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">US Citizen Required</label>
                      <HESCToggle
                        checked={eligibilityRules.usCitizenRequired}
                        onChange={() => handleToggle("usCitizenRequired")}
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button onClick={handleSaveEligibility} className="bg-primary hover:bg-primary/90 gap-2">
                    <Save size={18} />
                    Save Eligibility Rules
                  </Button>
                  <Button onClick={handleResetDefault} variant="outline" className="gap-2">
                    <RotateCcw size={18} />
                    Reset to Default
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Awards Tab */}
            <TabsContent value="awards" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Award & Payment Rules</h3>
                <p className="text-sm text-muted-foreground mb-6">Configure award basis, limits, and payment options</p>

                {/* Award Basis Section */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-semibold text-foreground mb-4">Award Basis</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Award Calculation Method</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" defaultValue="tuition" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tuition">Tuition</SelectItem>
                          <SelectItem value="coa">Cost of Attendance</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Award Limits Section */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-semibold text-foreground mb-4">Award Limits</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Annual Maximum</label>
                      <input
                        type="number"
                        defaultValue="5000"
                        className="w-24 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Term Maximum</label>
                      <input
                        type="number"
                        defaultValue="2500"
                        className="w-24 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Lifetime Maximum</label>
                      <input
                        type="number"
                        defaultValue="20000"
                        className="w-24 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Options Section */}
                <div className="mb-8">
                  <h4 className="font-semibold text-foreground mb-4">Payment Options</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Paid at End of Year</label>
                      <HESCToggle checked={true} onChange={() => {}} />
                    </div>
                    <div className="flex items-center justify-between">
                      <label className="text-sm text-muted-foreground">Number of Payments</label>
                      <input
                        type="number"
                        defaultValue="2"
                        className="w-20 px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button onClick={() => toast.success("Award rules saved successfully")} className="bg-primary hover:bg-primary/90 gap-2">
                    <Save size={18} />
                    Save Award Rules
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <RotateCcw size={18} />
                    Reset to Default
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Deadlines Tab */}
            <TabsContent value="deadlines" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Deadline & Application Windows</h3>
                <p className="text-sm text-muted-foreground mb-6">Set application deadlines and windows</p>

                {/* Accepting Applications */}
                <div className="mb-8 pb-8 border-b border-border">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-semibold text-foreground">Accepting Applications</label>
                    <HESCToggle checked={true} onChange={() => {}} />
                  </div>
                </div>

                {/* Application Deadlines */}
                <div className="mb-8 pb-8 border-b border-border">
                  <h4 className="font-semibold text-foreground mb-4">Application Deadlines</h4>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Application Deadline (2024-2025)</label>
                      <input
                        type="date"
                        defaultValue="2025-03-15"
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-muted-foreground mb-2 block">Application Deadline (2025-2026)</label>
                      <input
                        type="date"
                        defaultValue="2026-03-15"
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button onClick={() => toast.success("Deadlines saved successfully")} className="bg-primary hover:bg-primary/90 gap-2">
                    <Save size={18} />
                    Save Deadlines
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Required Documents</h3>
                <p className="text-sm text-muted-foreground mb-6">Define required document checklist</p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">FAFSA Confirmation</p>
                      <p className="text-xs text-muted-foreground">Federal aid form confirmation</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">Required</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Proof of Residency</p>
                      <p className="text-xs text-muted-foreground">NYS residency documentation</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">Required</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Enrollment Verification</p>
                      <p className="text-xs text-muted-foreground">School enrollment status</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">Required</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <p className="font-semibold text-foreground">Income Documentation</p>
                      <p className="text-xs text-muted-foreground">Tax returns or income verification</p>
                    </div>
                    <span className="text-sm font-semibold text-primary">Required</span>
                  </div>
                </div>

                {/* Add Document Type Button */}
                <div className="flex gap-3 pt-6 border-t border-border">
                  <Button variant="outline" className="gap-2">
                    <Plus size={18} />
                    Add Document Type
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Post-Grad Tab */}
            <TabsContent value="postgrad" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Post-Graduation Settings</h3>
                <p className="text-sm text-muted-foreground mb-6">Configure post-graduation program options</p>

                <div className="space-y-6">
                  <div className="mb-8 pb-8 border-b border-border">
                    <h4 className="font-semibold text-foreground mb-4">Repayment Options</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Allow Loan Consolidation</label>
                        <HESCToggle checked={true} onChange={() => {}} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Income-Driven Repayment Available</label>
                        <HESCToggle checked={false} onChange={() => {}} />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Public Service Loan Forgiveness</label>
                        <HESCToggle checked={true} onChange={() => {}} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-8 pb-8 border-b border-border">
                    <h4 className="font-semibold text-foreground mb-4">Grace Period</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Grace Period (months)</label>
                        <input
                          type="number"
                          defaultValue="6"
                          className="w-20 px-3 py-2 border border-border rounded-lg text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t border-border">
                    <Button onClick={() => toast.success("Post-grad settings saved successfully")} className="bg-primary hover:bg-primary/90 gap-2">
                      <Save size={18} />
                      Save Settings
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Year Data Tab */}
            <TabsContent value="yeardata" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Year-Specific Data</h3>
                <p className="text-sm text-muted-foreground mb-6">Configure program data for specific academic years</p>

                <div className="space-y-6">
                  <div className="mb-8 pb-8 border-b border-border">
                    <h4 className="font-semibold text-foreground mb-4">Academic Year 2024-2025</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Total Funding Allocated</label>
                        <input
                          type="number"
                          defaultValue="500000"
                          className="w-32 px-3 py-2 border border-border rounded-lg text-sm"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Expected Recipients</label>
                        <input
                          type="number"
                          defaultValue="1000"
                          className="w-32 px-3 py-2 border border-border rounded-lg text-sm"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <label className="text-sm text-muted-foreground">Year Active</label>
                        <HESCToggle checked={true} onChange={() => {}} />
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t border-border">
                    <Button onClick={() => toast.success("Year data saved successfully")} className="bg-primary hover:bg-primary/90 gap-2">
                      <Save size={18} />
                      Save Year Data
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Audit Tab */}
            <TabsContent value="audit" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">Audit Trail</h3>
                <p className="text-sm text-muted-foreground mb-6">View program configuration change history</p>

                <div className="space-y-3">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">Eligibility Rules Updated</p>
                        <p className="text-xs text-muted-foreground">Max Undergraduate Points changed from 100 to 120</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2024-01-15 10:30 AM</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Updated by: Admin User</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">Award Limits Modified</p>
                        <p className="text-xs text-muted-foreground">Annual Maximum updated to $5,500</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2024-01-10 02:15 PM</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Updated by: Program Manager</p>
                  </div>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">Program Created</p>
                        <p className="text-xs text-muted-foreground">NYS Grant Program (GRANT) created</p>
                      </div>
                      <span className="text-xs text-muted-foreground">2024-01-01 09:00 AM</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Created by: Administrator</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
