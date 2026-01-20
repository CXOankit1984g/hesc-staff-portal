import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, Eye, AlertCircle, CheckCircle, Clock, X } from "lucide-react";

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

// Mock document parser - simulates parsing different document types
const parseDocument = (file: File): ProcessedDocument => {
  const id = Date.now().toString();
  const filename = file.name;
  
  // Simulate document type detection
  let type = "Unknown Document";
  if (filename.toLowerCase().includes("fafsa")) type = "FAFSA";
  else if (filename.toLowerCase().includes("tax")) type = "Tax Return";
  else if (filename.toLowerCase().includes("transcript")) type = "Academic Transcript";
  else if (filename.toLowerCase().includes("income")) type = "Income Statement";
  else if (filename.toLowerCase().includes("verification")) type = "Verification Document";
  
  // Simulate extracted fields based on document type
  const extractedFields: Array<{ name: string; value: string; confidence: number }> = [];
  
  // Common fields for all documents
  extractedFields.push(
    { name: "Student Name", value: "Jane Doe", confidence: 96 },
    { name: "SSN", value: "987-65-4321", confidence: 94 }
  );
  
  // Type-specific fields
  if (type === "FAFSA") {
    extractedFields.push(
      { name: "Expected Family Contribution", value: "$4,500", confidence: 93 },
      { name: "Filing Status", value: "Single", confidence: 95 }
    );
  } else if (type === "Tax Return") {
    extractedFields.push(
      { name: "Filing Status", value: "Head of Household", confidence: 97 },
      { name: "Total Income", value: "$72,000", confidence: 94 },
      { name: "Adjusted Gross Income", value: "$68,500", confidence: 92 }
    );
  } else if (type === "Academic Transcript") {
    extractedFields.push(
      { name: "Institution", value: "University of New York", confidence: 98 },
      { name: "GPA", value: "3.72", confidence: 96 }
    );
  } else if (type === "Income Statement") {
    extractedFields.push(
      { name: "Total Income", value: "$95,000", confidence: 91 },
      { name: "Adjusted Gross Income", value: "$88,000", confidence: 89 }
    );
  }
  
  return {
    id,
    filename,
    type,
    status: "processing",
    uploadedTime: "just now",
    progress: 0,
    extractedFields,
    issues: [],
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
        <p className="text-sm text-muted-foreground mb-6">Drag and drop or click to upload PDF, images, or documents. Supported formats: PDF, PNG, JPG, TIFF</p>

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
          <label>
            <input
              type="file"
              multiple
              accept=".pdf,.png,.jpg,.jpeg,.tiff"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <Button className="bg-primary hover:bg-primary/90 cursor-pointer">
              <Upload size={18} className="mr-2" />
              Upload Documents
            </Button>
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
