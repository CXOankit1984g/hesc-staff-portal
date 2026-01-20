import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Eye, AlertCircle, CheckCircle, Clock, X } from "lucide-react";
import { detectDocumentType, validateField, DocumentTemplate } from "@/lib/documentTemplates";

interface ProcessedDocument {
  id: string;
  filename: string;
  type: string;
  status: "completed" | "processing" | "error";
  uploadedTime: string;
  progress?: number;
  extractedFields: Array<{
    name: string;
    value: string;
    confidence: number;
  }>;
  issues?: string[];
}

const processedDocumentsData: ProcessedDocument[] = [
  {
    id: "1",
    filename: "FAFSA_2024.pdf",
    type: "FAFSA",
    status: "completed",
    uploadedTime: "2 hours ago",
    extractedFields: [
      { name: "Student Name", value: "John Smith", confidence: 98 },
      { name: "SSN", value: "123-45-6789", confidence: 95 },
      { name: "Expected Family Contribution", value: "$5,000", confidence: 92 },
    ],
    issues: ["Missing: Income field", "Invalid: Assets value unclear - manual review needed"],
  },
  {
    id: "2",
    filename: "Tax_Return_2023.pdf",
    type: "Tax Return",
    status: "processing",
    uploadedTime: "1 hour ago",
    progress: 65,
    extractedFields: [
      { name: "Filing Status", value: "Married Filing Jointly", confidence: 96 },
      { name: "Total Income", value: "$85,000", confidence: 93 },
      { name: "Adjusted Gross Income", value: "$78,500", confidence: 91 },
    ],
  },
  {
    id: "3",
    filename: "Transcript.pdf",
    type: "Academic Transcript",
    status: "processing",
    uploadedTime: "30 minutes ago",
    progress: 45,
    extractedFields: [
      { name: "Institution", value: "State University", confidence: 97 },
      { name: "GPA", value: "3.45", confidence: 94 },
    ],
  },
];

// Enhanced document parser using templates
const parseDocument = (file: File): ProcessedDocument => {
  const id = Date.now().toString();
  const filename = file.name;
  
  // Detect document type using template keywords
  const template = detectDocumentType(filename);
  const type = template?.type || "Unknown Document";
  
  // Generate extracted fields based on template
  const extractedFields: Array<{ name: string; value: string; confidence: number }> = [];
  const issues: string[] = [];
  
  if (template) {
    // Use template fields to generate realistic mock data
    const mockValues: { [key: string]: { value: string; confidence: number } } = {
      // FAFSA
      studentName: { value: "Jane Doe", confidence: 96 },
      ssn: { value: "987-65-4321", confidence: 94 },
      dateOfBirth: { value: "05/15/2000", confidence: 92 },
      expectedFamilyContribution: { value: "$4,500", confidence: 93 },
      filingStatus: { value: "Single", confidence: 95 },
      totalIncome: { value: "$45,000", confidence: 91 },
      dependencyStatus: { value: "Dependent", confidence: 98 },
      numberOfFamilyMembers: { value: "4", confidence: 89 },
      
      // Tax Return
      taxYear: { value: "2023", confidence: 99 },
      adjustedGrossIncome: { value: "$68,500", confidence: 92 },
      taxableIncome: { value: "$55,000", confidence: 90 },
      totalTaxes: { value: "$8,250", confidence: 88 },
      spouseSSN: { value: "N/A", confidence: 100 },
      
      // Transcript
      studentID: { value: "STU-987654", confidence: 95 },
      institution: { value: "University of New York", confidence: 98 },
      gpa: { value: "3.72", confidence: 96 },
      currentProgram: { value: "Bachelor of Science in Computer Science", confidence: 97 },
      enrollmentStatus: { value: "Full-time", confidence: 99 },
      creditsEarned: { value: "120", confidence: 94 },
      creditsAttempted: { value: "124", confidence: 93 },
      degreeConferred: { value: "N/A", confidence: 100 },
    };
    
    // Add fields from template
    template.fields.forEach((field) => {
      const mockData = mockValues[field.name];
      if (mockData) {
        extractedFields.push({
          name: field.label,
          value: mockData.value,
          confidence: mockData.confidence,
        });
        
        // Validate field
        const validation = validateField(field, mockData.value);
        if (!validation.valid && validation.error) {
          issues.push(`${field.label}: ${validation.error}`);
        }
      } else if (field.required) {
        issues.push(`Missing required field: ${field.label}`);
      }
    });
  } else {
    // Fallback for unknown document types
    extractedFields.push(
      { name: "Student Name", value: "Jane Doe", confidence: 96 },
      { name: "SSN", value: "987-65-4321", confidence: 94 }
    );
    issues.push("Document type not recognized. Please verify extracted data manually.");
  }
  
  return {
    id,
    filename,
    type,
    status: "processing",
    uploadedTime: "just now",
    progress: 0,
    extractedFields,
    issues: issues.length > 0 ? issues : undefined,
  };
};

export default function Documents() {
  const [documents, setDocuments] = useState<ProcessedDocument[]>(processedDocumentsData);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingIds, setUploadingIds] = useState<string[]>([]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    files.forEach((file) => {
      // Parse the document
      const newDoc = parseDocument(file);
      setUploadingIds((prev) => [...prev, newDoc.id]);
      
      // Add to documents list
      setDocuments((prev) => [newDoc, ...prev]);
      
      // Simulate processing
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.id === newDoc.id
                ? { ...doc, status: "completed", progress: 100 }
                : doc
            )
          );
          setUploadingIds((prev) => prev.filter((id) => id !== newDoc.id));
        } else {
          setDocuments((prev) =>
            prev.map((doc) =>
              doc.id === newDoc.id ? { ...doc, progress: Math.round(progress) } : doc
            )
          );
        }
      }, 500);
    });
  };

  const removeDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const getTemplateInfo = (type: string): DocumentTemplate | null => {
    const template = detectDocumentType(type);
    return template || null;
  };

  const getStatusBadge = (status: string, progress?: number) => {
    switch (status) {
      case "completed":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            <CheckCircle size={14} />
            Completed
          </div>
        );
      case "processing":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
            <Clock size={14} />
            Processing {progress}%
          </div>
        );
      case "error":
        return (
          <div className="flex items-center gap-2 px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
            <AlertCircle size={14} />
            Error
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Intelligent Document Processing</h1>
        <p className="text-muted-foreground">Upload and automatically extract data from financial aid documents</p>
      </div>

      {/* Upload Section */}
      <Card className="p-8">
        <h2 className="text-lg font-semibold text-foreground mb-2">Upload Documents</h2>
        <p className="text-sm text-muted-foreground mb-4">Drag and drop or click to upload PDF, images, or documents. Supported formats: PDF, PNG, JPG, TIFF</p>
        
        {/* Supported Templates Info */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm font-semibold text-blue-900 mb-2">Supported Document Templates:</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="text-sm text-blue-800">
              <span className="font-medium">FAFSA</span> - Extracts student info, EFC, income, filing status
            </div>
            <div className="text-sm text-blue-800">
              <span className="font-medium">Tax Returns</span> - Extracts income, AGI, filing status, tax data
            </div>
            <div className="text-sm text-blue-800">
              <span className="font-medium">Transcripts</span> - Extracts GPA, institution, enrollment status, credits
            </div>
          </div>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border hover:border-primary/50 bg-gray-50"
          }`}
        >
          <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-semibold text-foreground mb-2">Drop files here or click to upload</p>
          <p className="text-sm text-muted-foreground mb-4">Supported formats: PDF, PNG, JPG, TIFF</p>
          <label className="cursor-pointer inline-block">
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.tiff"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <div className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-md font-medium inline-flex items-center gap-2 cursor-pointer transition-colors">
              <Upload size={18} />
              Upload Documents
            </div>
          </label>
        </div>
      </Card>

      {/* Processed Documents Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Processed Documents</h2>

        {documents.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No documents uploaded yet. Upload documents to get started.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {documents.map((doc) => (
              <Card key={doc.id} className="p-6">
                {/* Document Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">{doc.filename}</h3>
                      {getStatusBadge(doc.status, doc.progress)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {doc.type} • Uploaded {doc.uploadedTime}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Eye size={16} />
                      View Details
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download size={16} />
                      Download
                    </Button>
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <X size={16} className="text-red-600" />
                    </button>
                  </div>
                </div>

                {/* Issues Section */}
                {doc.issues && doc.issues.length > 0 && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2 mb-2">
                      <AlertCircle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
                      <p className="font-semibold text-red-800">Issues Detected:</p>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {doc.issues.map((issue, idx) => (
                        <li key={idx} className="text-sm text-red-700">
                          • {issue}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Extracted Fields */}
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-foreground">Extracted Data:</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {doc.extractedFields.map((field, idx) => (
                      <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs text-muted-foreground mb-1">{field.name}</p>
                        <p className="text-sm font-semibold text-foreground mb-2">{field.value}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500"
                              style={{ width: `${field.confidence}%` }}
                            ></div>
                          </div>
                          <span className="text-xs font-semibold text-green-600">✓{field.confidence}%</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {doc.extractedFields.length > 3 && (
                    <button className="text-sm text-primary hover:text-primary/80 font-medium">
                      +{doc.extractedFields.length - 3} more fields
                    </button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
