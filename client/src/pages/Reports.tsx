import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Play, Settings } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";

const reportsData = [
  {
    id: 1,
    title: "Financial Aid Overview",
    description: "Comprehensive overview of all financial aid programs",
    lastGenerated: "2024-01-16",
    size: "2.4 MB",
  },
  {
    id: 2,
    title: "Application Analytics",
    description: "Detailed analysis of application trends and processing",
    lastGenerated: "2024-01-15",
    size: "1.8 MB",
  },
  {
    id: 3,
    title: "Funding Distribution",
    description: "Analysis of fund allocation across programs",
    lastGenerated: "2024-01-14",
    size: "3.1 MB",
  },
  {
    id: 4,
    title: "Student Demographics",
    description: "Demographic breakdown of aid recipients",
    lastGenerated: "2024-01-13",
    size: "1.5 MB",
  },
  {
    id: 5,
    title: "Program Performance",
    description: "Performance metrics for each aid program",
    lastGenerated: "2024-01-12",
    size: "2.7 MB",
  },
  {
    id: 6,
    title: "Historical Trends",
    description: "Multi-year trend analysis and forecasting",
    lastGenerated: "2024-01-11",
    size: "4.2 MB",
  },
];

const scheduledReports = [
  {
    id: 1,
    title: "Weekly Application Summary",
    frequency: "Weekly",
    nextRun: "2024-01-22",
    recipients: 5,
    status: "Active",
  },
  {
    id: 2,
    title: "Monthly Funding Report",
    frequency: "Monthly",
    nextRun: "2024-02-01",
    recipients: 12,
    status: "Active",
  },
  {
    id: 3,
    title: "Quarterly Performance Review",
    frequency: "Quarterly",
    nextRun: "2024-04-01",
    recipients: 8,
    status: "Active",
  },
  {
    id: 4,
    title: "Annual Compliance Report",
    frequency: "Annually",
    nextRun: "2024-12-31",
    recipients: 3,
    status: "Scheduled",
  },
];

export default function Reports() {
  const [selectedYear, setSelectedYear] = useState("2025-2026");

  const reportsGenerated = 847;
  const dataPointsAnalyzed = 16000;
  const activeDashboards = 5;
  const scheduledReportsCount = 4;

  const generatePDF = (reportId: number, reportTitle: string) => {
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      let yPosition = 20;

      // Header
      doc.setFontSize(20);
      doc.text("HESC Financial Aid Report", 20, yPosition);
      yPosition += 10;

      // Report Title
      doc.setFontSize(14);
      doc.text(reportTitle, 20, yPosition);
      yPosition += 8;

      // Report Metadata
      doc.setFontSize(10);
      doc.setTextColor(100);
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, yPosition);
      yPosition += 5;
      doc.text(`Academic Year: ${selectedYear}`, 20, yPosition);
      yPosition += 10;

      // Reset text color
      doc.setTextColor(0);

      // Report-specific content
      switch (reportId) {
        case 1: // Financial Aid Overview
          doc.setFontSize(12);
          doc.text("Financial Aid Overview Report", 20, yPosition);
          yPosition += 8;
          doc.setFontSize(10);
          doc.text("Total Applications: 2,847", 20, yPosition);
          yPosition += 5;
          doc.text("Approved: 1,923 (67.54%)", 20, yPosition);
          yPosition += 5;
          doc.text("Denied: 382 (13.42%)", 20, yPosition);
          yPosition += 5;
          doc.text("Under Review: 542 (19.04%)", 20, yPosition);
          yPosition += 10;
          doc.text("Total Funding Allocated: $240M", 20, yPosition);
          yPosition += 5;
          doc.text("Average Award: $4,847", 20, yPosition);
          yPosition += 5;
          doc.text("Total Students: 42,000", 20, yPosition);
          yPosition += 5;
          doc.text("Active Students: 37,000", 20, yPosition);
          break;

        case 2: // Application Analytics
          doc.setFontSize(12);
          doc.text("Application Analytics Report", 20, yPosition);
          yPosition += 8;
          doc.setFontSize(10);
          doc.text("Monthly Application Trends:", 20, yPosition);
          yPosition += 5;
          doc.text("January: 350 applications, 280 approved", 20, yPosition);
          yPosition += 4;
          doc.text("February: 420 applications, 340 approved", 20, yPosition);
          yPosition += 4;
          doc.text("March: 480 applications, 410 approved", 20, yPosition);
          yPosition += 4;
          doc.text("April: 520 applications, 450 approved", 20, yPosition);
          yPosition += 4;
          doc.text("May: 580 applications, 510 approved", 20, yPosition);
          yPosition += 4;
          doc.text("June: 650 applications, 600 approved", 20, yPosition);
          yPosition += 10;
          doc.text("Average Processing Time: 12.3 days", 20, yPosition);
          yPosition += 5;
          doc.text("Approval Rate: 67.54%", 20, yPosition);
          break;

        case 3: // Funding Distribution
          doc.setFontSize(12);
          doc.text("Funding Distribution Report", 20, yPosition);
          yPosition += 8;
          doc.setFontSize(10);
          doc.text("Program Funding Allocation:", 20, yPosition);
          yPosition += 5;
          doc.text("TAP Grant Program: $125M (52.08%)", 20, yPosition);
          yPosition += 4;
          doc.text("Excelsior Scholarship: $75M (31.25%)", 20, yPosition);
          yPosition += 4;
          doc.text("Enhanced Tuition Award: $50M (20.83%)", 20, yPosition);
          yPosition += 4;
          doc.text("STEM Incentive Program: $25M (10.42%)", 20, yPosition);
          yPosition += 4;
          doc.text("Dream Act Financial Aid: $15M (6.25%)", 20, yPosition);
          yPosition += 10;
          doc.text("Total Funding Distributed: $290M", 20, yPosition);
          break;

        case 4: // Student Demographics
          doc.setFontSize(12);
          doc.text("Student Demographics Report", 20, yPosition);
          yPosition += 8;
          doc.setFontSize(10);
          doc.text("Total Students: 42,000", 20, yPosition);
          yPosition += 5;
          doc.text("Active Students: 37,000 (88.1%)", 20, yPosition);
          yPosition += 5;
          doc.text("Inactive Students: 5,000 (11.9%)", 20, yPosition);
          yPosition += 10;
          doc.text("Student Distribution by College:", 20, yPosition);
          yPosition += 5;
          doc.text("CUNY: 18,000 students (42.86%)", 20, yPosition);
          yPosition += 4;
          doc.text("SUNY: 16,000 students (38.10%)", 20, yPosition);
          yPosition += 4;
          doc.text("Private: 8,000 students (19.05%)", 20, yPosition);
          break;

        case 5: // Program Performance
          doc.setFontSize(12);
          doc.text("Program Performance Report", 20, yPosition);
          yPosition += 8;
          doc.setFontSize(10);
          doc.text("TAP Grant Program:", 20, yPosition);
          yPosition += 4;
          doc.text("  Applications: 1,200 | Approval Rate: 85%", 20, yPosition);
          yPosition += 5;
          doc.text("Excelsior Scholarship:", 20, yPosition);
          yPosition += 4;
          doc.text("  Applications: 850 | Approval Rate: 92%", 20, yPosition);
          yPosition += 5;
          doc.text("STEM Incentive Program:", 20, yPosition);
          yPosition += 4;
          doc.text("  Applications: 580 | Approval Rate: 78%", 20, yPosition);
          yPosition += 5;
          doc.text("Dream Act Financial Aid:", 20, yPosition);
          yPosition += 4;
          doc.text("  Applications: 217 | Approval Rate: 88%", 20, yPosition);
          break;

        case 6: // Historical Trends
          doc.setFontSize(12);
          doc.text("Historical Trends Report", 20, yPosition);
          yPosition += 8;
          doc.setFontSize(10);
          doc.text("Year-over-Year Comparison:", 20, yPosition);
          yPosition += 5;
          doc.text("2025-2026: 2,847 applications", 20, yPosition);
          yPosition += 4;
          doc.text("2024-2025: 2,200 applications (+29.4%)", 20, yPosition);
          yPosition += 4;
          doc.text("2023-2024: 1,800 applications (+22.2%)", 20, yPosition);
          yPosition += 10;
          doc.text("Funding Trends:", 20, yPosition);
          yPosition += 5;
          doc.text("2025-2026: $290M allocated", 20, yPosition);
          yPosition += 4;
          doc.text("2024-2025: $250M allocated (+16%)", 20, yPosition);
          yPosition += 4;
          doc.text("2023-2024: $215M allocated (+16.3%)", 20, yPosition);
          break;

        default:
          doc.text("Report data not available", 20, yPosition);
      }

      // Footer
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(
        `Page 1 of 1 | ${new Date().toLocaleString()}`,
        20,
        pageHeight - 10
      );

      // Save PDF
      const fileName = `${reportTitle.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.pdf`;
      doc.save(fileName);

      toast.success(`${reportTitle} downloaded successfully`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast.error("Failed to generate PDF report");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
        <p className="text-muted-foreground">Generate insights and track performance metrics</p>
      </div>

      {/* Top Actions */}
      <div className="flex gap-3 items-center">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="px-3 py-2 border border-border rounded-lg text-sm bg-white"
        >
          <option>2025-2026</option>
          <option>2024-2025</option>
          <option>2023-2024</option>
          <option>2022-2023</option>
        </select>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-primary">
          <p className="text-sm text-muted-foreground">Reports Generated</p>
          <p className="text-2xl font-bold text-foreground">{reportsGenerated}</p>
          <p className="text-xs text-green-600 mt-1">+23% This Month</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-blue-500">
          <p className="text-sm text-muted-foreground">Data Points Analyzed</p>
          <p className="text-2xl font-bold text-foreground">{(dataPointsAnalyzed / 1000).toFixed(0)}K</p>
          <p className="text-xs text-green-600 mt-1">+15% This Quarter</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-green-500">
          <p className="text-sm text-muted-foreground">Active Dashboards</p>
          <p className="text-2xl font-bold text-foreground">{activeDashboards}</p>
          <p className="text-xs text-green-600 mt-1">+2 Current</p>
        </Card>
        <Card className="p-4 border-l-4 border-l-accent">
          <p className="text-sm text-muted-foreground">Scheduled Reports</p>
          <p className="text-2xl font-bold text-foreground">{scheduledReportsCount}</p>
          <p className="text-xs text-green-600 mt-1">+8% Active</p>
        </Card>
      </div>

      {/* Available Reports */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 text-foreground">Available Reports</h3>
        <p className="text-sm text-muted-foreground mb-6">Select and generate comprehensive reports for analysis</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportsData.map((report) => (
            <Card key={report.id} className="p-4 border border-border hover:shadow-md transition-shadow">
              <h4 className="font-semibold text-foreground mb-2">{report.title}</h4>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex justify-between items-center text-xs text-muted-foreground mb-4">
                <span>Last: {report.lastGenerated}</span>
                <span>Size: {report.size}</span>
              </div>
              <Button
                className="w-full bg-primary hover:bg-primary/90 gap-2"
                size="sm"
                onClick={() => generatePDF(report.id, report.title)}
              >
                <Play size={16} />
                Generate
              </Button>
            </Card>
          ))}
        </div>
      </Card>

      {/* Scheduled Reports */}
      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Scheduled Reports</h3>
            <p className="text-sm text-muted-foreground">Automated report generation schedule</p>
          </div>
          <Button variant="outline" className="gap-2" size="sm">
            <Settings size={16} />
            Manage Schedule
          </Button>
        </div>

        <div className="space-y-3">
          {scheduledReports.map((report) => (
            <div key={report.id} className="flex justify-between items-center p-4 border border-border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{report.title}</h4>
                <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                  <span>Frequency: {report.frequency}</span>
                  <span>Next Run: {report.nextRun}</span>
                  <span>{report.recipients} recipients</span>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${report.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                {report.status}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
