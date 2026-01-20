import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Mail, Phone, MessageSquare, BookOpen, Video } from "lucide-react";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    id: "1",
    category: "Dashboard",
    question: "How do I view the Executive Dashboard?",
    answer: "The Executive Dashboard is the default landing page when you log in. It provides a comprehensive overview of all financial aid applications, including total applications, approval rates, denied applications, and total disbursed amounts. You can filter data by academic year, program, and college using the dropdown menus at the top of the page.",
  },
  {
    id: "2",
    category: "Applications",
    question: "How can I search for a specific application?",
    answer: "Use the search bar at the top of the Applications page to search by student name, application ID, or other identifiers. You can also use the filter options to narrow down results by status, program, or date range.",
  },
  {
    id: "3",
    category: "Applications",
    question: "What are the different application statuses?",
    answer: "Applications can have the following statuses: Pending (awaiting review), Approved (eligible for aid), Denied (not eligible), and Withdrawn (student cancelled). Each status is color-coded for easy identification.",
  },
  {
    id: "4",
    category: "Programs",
    question: "How do I configure program eligibility rules?",
    answer: "Navigate to the Programs page, select a program, and click on the Eligibility tab. You can set rules for undergraduate/graduate awards, school requirements, enrollment requirements, application requirements, and residency/citizenship rules. Click 'Save Eligibility Rules' when done.",
  },
  {
    id: "5",
    category: "Programs",
    question: "Can I create a new program?",
    answer: "Yes, click the 'New Program' button on the Programs page. You'll need to enter the program name, code, category, effective date, and sunset date. After creation, you can configure eligibility rules and other settings.",
  },
  {
    id: "6",
    category: "Documents",
    question: "What document formats are supported?",
    answer: "The document processing system supports PDF, PNG, JPG, and TIFF formats. Documents are automatically processed to extract key data fields with confidence scoring.",
  },
  {
    id: "7",
    category: "Documents",
    question: "How do I upload documents?",
    answer: "Navigate to the Documents page and use the upload area to drag and drop files or click to browse your computer. Supported formats are PDF, PNG, JPG, and TIFF. The system will automatically process the documents and extract data.",
  },
  {
    id: "8",
    category: "Reports",
    question: "What reports are available?",
    answer: "Available reports include Applications Report, Disbursement Report, Program Performance Report, College Comparison Report, and Processing Time Analysis. You can schedule reports to run automatically or generate them on demand.",
  },
  {
    id: "9",
    category: "Student Records",
    question: "How do I update student information?",
    answer: "Navigate to Student Records, search for the student, and click on their record. You can edit personal information, contact details, and enrollment status. Remember to save changes after editing.",
  },
  {
    id: "10",
    category: "Grants & Scholarships",
    question: "How do I manage grant and scholarship programs?",
    answer: "Use the Grants & Scholarships page to view all active programs, manage funding allocations, track recipients, and monitor disbursements. You can filter by program type, status, and funding status.",
  },
];

const guidesData = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of navigating the HESC Staff Portal and understanding the main features.",
    icon: BookOpen,
  },
  {
    title: "Application Processing Guide",
    description: "Step-by-step guide for processing student applications and managing their status.",
    icon: BookOpen,
  },
  {
    title: "Program Management Guide",
    description: "Comprehensive guide for configuring programs, eligibility rules, and deadlines.",
    icon: BookOpen,
  },
  {
    title: "Document Processing Guide",
    description: "Learn how to upload, process, and manage financial aid documents.",
    icon: BookOpen,
  },
];

export default function Help() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(faqData.map((item) => item.category)));

  const filteredFAQ = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">Find answers to common questions and access documentation</p>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <MessageSquare size={32} className="text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Contact Support</h3>
              <p className="text-sm text-muted-foreground">Email us at support@hesc.edu or call 1-888-697-4372</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <Video size={32} className="text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">Watch step-by-step tutorials on key features</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <BookOpen size={32} className="text-primary flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-foreground mb-1">Documentation</h3>
              <p className="text-sm text-muted-foreground">Access comprehensive user guides and manuals</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Guides Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Getting Started Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {guidesData.map((guide, idx) => (
            <Card key={idx} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start gap-4">
                <guide.icon size={28} className="text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{guide.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{guide.description}</p>
                  <Button variant="outline" size="sm">
                    Read Guide
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Frequently Asked Questions</h2>

        {/* Search and Filter */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-3 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(null)}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {filteredFAQ.length > 0 ? (
            filteredFAQ.map((item) => (
              <Card
                key={item.id}
                className="overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === item.id ? null : item.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="font-semibold text-foreground">{item.question}</h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-muted-foreground flex-shrink-0 ml-4 transition-transform ${
                      expandedFAQ === item.id ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedFAQ === item.id && (
                  <div className="px-4 py-4 bg-muted/30 border-t border-border">
                    <p className="text-foreground leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No FAQs found matching your search. Try different keywords.</p>
            </Card>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <Card className="p-8 bg-primary/5 border-primary/20">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Still Need Help?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our support team is available to assist you. Contact us through any of the following channels.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="space-y-2">
              <Mail size={24} className="mx-auto text-primary" />
              <p className="font-semibold text-foreground">Email</p>
              <a href="mailto:support@hesc.edu" className="text-primary hover:underline">
                support@hesc.edu
              </a>
            </div>

            <div className="space-y-2">
              <Phone size={24} className="mx-auto text-primary" />
              <p className="font-semibold text-foreground">Phone</p>
              <a href="tel:1-888-697-4372" className="text-primary hover:underline">
                1-888-697-4372
              </a>
            </div>

            <div className="space-y-2">
              <MessageSquare size={24} className="mx-auto text-primary" />
              <p className="font-semibold text-foreground">Live Chat</p>
              <button className="text-primary hover:underline">Start Chat</button>
            </div>
          </div>

          <Button className="mt-6">Submit Support Ticket</Button>
        </div>
      </Card>
    </div>
  );
}
