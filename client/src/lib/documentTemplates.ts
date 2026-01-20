// Document parsing templates with field definitions and validation rules

export interface FieldDefinition {
  name: string;
  label: string;
  type: "text" | "number" | "currency" | "date" | "email" | "ssn" | "gpa";
  required: boolean;
  pattern?: RegExp;
  description: string;
}

export interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
  description: string;
  fields: FieldDefinition[];
  keywords: string[]; // Keywords to detect document type
}

// FAFSA Template
export const fAFSATemplate: DocumentTemplate = {
  id: "fafsa",
  name: "FAFSA",
  type: "FAFSA",
  description: "Free Application for Federal Student Aid",
  keywords: ["fafsa", "federal student aid", "application", "dependency"],
  fields: [
    {
      name: "studentName",
      label: "Student Name",
      type: "text",
      required: true,
      description: "Full legal name of the student",
    },
    {
      name: "ssn",
      label: "SSN",
      type: "ssn",
      required: true,
      pattern: /^\d{3}-\d{2}-\d{4}$/,
      description: "Social Security Number (XXX-XX-XXXX)",
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: true,
      description: "Student's date of birth (MM/DD/YYYY)",
    },
    {
      name: "expectedFamilyContribution",
      label: "Expected Family Contribution",
      type: "currency",
      required: true,
      description: "EFC amount in dollars",
    },
    {
      name: "filingStatus",
      label: "Filing Status",
      type: "text",
      required: true,
      description: "Tax filing status (Single, Married, Head of Household, etc.)",
    },
    {
      name: "totalIncome",
      label: "Total Income",
      type: "currency",
      required: true,
      description: "Total household income",
    },
    {
      name: "dependencyStatus",
      label: "Dependency Status",
      type: "text",
      required: true,
      description: "Dependent or Independent",
    },
    {
      name: "numberOfFamilyMembers",
      label: "Number of Family Members",
      type: "number",
      required: false,
      description: "Total family members in household",
    },
  ],
};

// Tax Return Template
export const taxReturnTemplate: DocumentTemplate = {
  id: "taxReturn",
  name: "Tax Return",
  type: "Tax Return",
  description: "Federal Income Tax Return (Form 1040)",
  keywords: ["tax return", "form 1040", "irs", "income tax", "tax year"],
  fields: [
    {
      name: "studentName",
      label: "Student Name",
      type: "text",
      required: true,
      description: "Name of taxpayer",
    },
    {
      name: "ssn",
      label: "SSN",
      type: "ssn",
      required: true,
      pattern: /^\d{3}-\d{2}-\d{4}$/,
      description: "Social Security Number (XXX-XX-XXXX)",
    },
    {
      name: "taxYear",
      label: "Tax Year",
      type: "number",
      required: true,
      description: "Year of tax return (e.g., 2023)",
    },
    {
      name: "filingStatus",
      label: "Filing Status",
      type: "text",
      required: true,
      description: "Filing status (Single, Married Filing Jointly, etc.)",
    },
    {
      name: "totalIncome",
      label: "Total Income",
      type: "currency",
      required: true,
      description: "Line 9: Total income",
    },
    {
      name: "adjustedGrossIncome",
      label: "Adjusted Gross Income",
      type: "currency",
      required: true,
      description: "Line 11: Adjusted Gross Income (AGI)",
    },
    {
      name: "taxableIncome",
      label: "Taxable Income",
      type: "currency",
      required: false,
      description: "Line 15: Taxable income",
    },
    {
      name: "totalTaxes",
      label: "Total Taxes",
      type: "currency",
      required: false,
      description: "Total tax liability",
    },
    {
      name: "spouseSSN",
      label: "Spouse SSN (if applicable)",
      type: "ssn",
      required: false,
      pattern: /^\d{3}-\d{2}-\d{4}$/,
      description: "Spouse's Social Security Number",
    },
  ],
};

// Academic Transcript Template
export const transcriptTemplate: DocumentTemplate = {
  id: "transcript",
  name: "Academic Transcript",
  type: "Academic Transcript",
  description: "Official College/University Transcript",
  keywords: ["transcript", "academic record", "university", "college", "grades", "gpa"],
  fields: [
    {
      name: "studentName",
      label: "Student Name",
      type: "text",
      required: true,
      description: "Full name of student",
    },
    {
      name: "studentID",
      label: "Student ID",
      type: "text",
      required: false,
      description: "University student identification number",
    },
    {
      name: "institution",
      label: "Institution",
      type: "text",
      required: true,
      description: "Name of college or university",
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      required: false,
      description: "Student's date of birth",
    },
    {
      name: "gpa",
      label: "GPA",
      type: "gpa",
      required: true,
      pattern: /^[0-4]\.[0-9]{2}$/,
      description: "Cumulative GPA (0.00-4.00)",
    },
    {
      name: "currentProgram",
      label: "Current Program",
      type: "text",
      required: true,
      description: "Degree program or major",
    },
    {
      name: "enrollmentStatus",
      label: "Enrollment Status",
      type: "text",
      required: true,
      description: "Full-time, Part-time, or Graduated",
    },
    {
      name: "creditsEarned",
      label: "Credits Earned",
      type: "number",
      required: false,
      description: "Total credit hours completed",
    },
    {
      name: "creditsAttempted",
      label: "Credits Attempted",
      type: "number",
      required: false,
      description: "Total credit hours attempted",
    },
    {
      name: "degreeConferred",
      label: "Degree Conferred",
      type: "text",
      required: false,
      description: "Degree type (Bachelor's, Master's, etc.)",
    },
  ],
};

// Template registry
export const documentTemplates: DocumentTemplate[] = [
  fAFSATemplate,
  taxReturnTemplate,
  transcriptTemplate,
];

// Function to detect document type based on filename and keywords
export const detectDocumentType = (filename: string): DocumentTemplate | null => {
  const lowerFilename = filename.toLowerCase();
  
  for (const template of documentTemplates) {
    for (const keyword of template.keywords) {
      if (lowerFilename.includes(keyword)) {
        return template;
      }
    }
  }
  
  return null;
};

// Function to validate extracted field against template
export const validateField = (
  fieldDef: FieldDefinition,
  value: string
): { valid: boolean; error?: string } => {
  if (!value && fieldDef.required) {
    return { valid: false, error: `${fieldDef.label} is required` };
  }

  if (!value) {
    return { valid: true };
  }

  switch (fieldDef.type) {
    case "ssn":
      if (!/^\d{3}-\d{2}-\d{4}$/.test(value)) {
        return { valid: false, error: "Invalid SSN format (XXX-XX-XXXX)" };
      }
      break;

    case "gpa":
      const gpaNum = parseFloat(value);
      if (isNaN(gpaNum) || gpaNum < 0 || gpaNum > 4.0) {
        return { valid: false, error: "GPA must be between 0.00 and 4.00" };
      }
      break;

    case "currency":
      if (!/^\$?[\d,]+\.?\d{0,2}$/.test(value.replace(/\s/g, ""))) {
        return { valid: false, error: "Invalid currency format" };
      }
      break;

    case "number":
      if (!/^\d+$/.test(value)) {
        return { valid: false, error: "Must be a valid number" };
      }
      break;

    case "date":
      if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(value)) {
        return { valid: false, error: "Invalid date format (MM/DD/YYYY)" };
      }
      break;

    case "email":
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return { valid: false, error: "Invalid email format" };
      }
      break;
  }

  if (fieldDef.pattern && !fieldDef.pattern.test(value)) {
    return { valid: false, error: `Invalid ${fieldDef.label} format` };
  }

  return { valid: true };
};

// Function to get template by ID
export const getTemplateById = (id: string): DocumentTemplate | undefined => {
  return documentTemplates.find((t) => t.id === id);
};
