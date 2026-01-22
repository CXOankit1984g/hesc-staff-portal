import { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  MapPin,
  Phone,
  Mail,
  User,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface College {
  id: string;
  name: string;
  code: string;
  status: "active" | "inactive";
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  mainContact: {
    phone: string;
    email: string;
  };
  pointOfContact: {
    name: string;
    title: string;
    phone: string;
    email: string;
  };
}

const mockColleges: College[] = [
  {
    id: "1",
    name: "City University of New York",
    code: "CUNY-001",
    status: "active",
    address: {
      street: "535 East 80th Street",
      city: "New York",
      state: "NY",
      zip: "10021",
    },
    mainContact: {
      phone: "(212) 794-5555",
      email: "info@cuny.edu",
    },
    pointOfContact: {
      name: "Dr. Sarah Johnson",
      title: "Director of Financial Aid",
      phone: "(212) 794-5556",
      email: "sjohnson@cuny.edu",
    },
  },
  {
    id: "2",
    name: "SUNY, Albany",
    code: "SUNY-001",
    status: "active",
    address: {
      street: "1400 Washington Avenue",
      city: "Albany",
      state: "NY",
      zip: "12222",
    },
    mainContact: {
      phone: "(518) 442-3300",
      email: "info@suny.edu",
    },
    pointOfContact: {
      name: "Michael Chen",
      title: "Financial Aid Coordinator",
      phone: "(518) 442-3301",
      email: "mchen@suny.edu",
    },
  },
  {
    id: "3",
    name: "Columbia University",
    code: "PRIV-001",
    status: "active",
    address: {
      street: "2860 Broadway",
      city: "New York",
      state: "NY",
      zip: "10027",
    },
    mainContact: {
      phone: "(212) 854-6000",
      email: "financialaid@columbia.edu",
    },
    pointOfContact: {
      name: "Emily Rodriguez",
      title: "Senior Financial Aid Officer",
      phone: "(212) 854-6001",
      email: "erodriguez@columbia.edu",
    },
  },
  {
    id: "4",
    name: "New York University",
    code: "PRIV-002",
    status: "inactive",
    address: {
      street: "70 Washington Square South",
      city: "New York",
      state: "NY",
      zip: "10012",
    },
    mainContact: {
      phone: "(212) 998-1212",
      email: "financialaid@nyu.edu",
    },
    pointOfContact: {
      name: "James Wilson",
      title: "Financial Aid Director",
      phone: "(212) 998-1213",
      email: "jwilson@nyu.edu",
    },
  },
];

export default function College() {
  const [colleges, setColleges] = useState<College[]>(mockColleges);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCollege, setEditingCollege] = useState<College | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<College | null>(null);
  const [formData, setFormData] = useState<College>({
    id: "",
    name: "",
    code: "",
    status: "active",
    address: { street: "", city: "", state: "", zip: "" },
    mainContact: { phone: "", email: "" },
    pointOfContact: { name: "", title: "", phone: "", email: "" },
  });

  const filteredColleges = colleges.filter((college) => {
    const matchesSearch =
      college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      college.address.city.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || college.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleOpenDialog = (college?: College) => {
    if (college) {
      setEditingCollege(college);
      setFormData(college);
    } else {
      setEditingCollege(null);
      setFormData({
        id: Date.now().toString(),
        name: "",
        code: "",
        status: "active",
        address: { street: "", city: "", state: "", zip: "" },
        mainContact: { phone: "", email: "" },
        pointOfContact: { name: "", title: "", phone: "", email: "" },
      });
    }
    setIsDialogOpen(true);
  };

  const handleSaveCollege = () => {
    if (editingCollege) {
      setColleges(
        colleges.map((c) => (c.id === editingCollege.id ? formData : c))
      );
    } else {
      setColleges([...colleges, formData]);
    }
    setIsDialogOpen(false);
  };

  const handleDeleteCollege = (college: College) => {
    setColleges(colleges.filter((c) => c.id !== college.id));
    setDeleteConfirm(null);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          College Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage college information and points of contact
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input
              placeholder="Search by college name, code, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => handleOpenDialog()}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Plus size={18} className="mr-2" />
                New College
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingCollege ? "Edit College" : "Add New College"}
                </DialogTitle>
                <DialogDescription>
                  {editingCollege
                    ? "Update college information and points of contact"
                    : "Enter college information and primary contact details"}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                {/* College Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">
                    College Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">College Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        placeholder="e.g., City University of New York"
                      />
                    </div>
                    <div>
                      <Label htmlFor="code">College Code *</Label>
                      <Input
                        id="code"
                        value={formData.code}
                        onChange={(e) =>
                          setFormData({ ...formData, code: e.target.value })
                        }
                        placeholder="e.g., CUNY-001"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="status">Status</Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "inactive") =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Address</h3>
                  <div>
                    <Label htmlFor="street">Street Address</Label>
                    <Input
                      id="street"
                      value={formData.address.street}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          address: {
                            ...formData.address,
                            street: e.target.value,
                          },
                        })
                      }
                      placeholder="Street address"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.address.city}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              city: e.target.value,
                            },
                          })
                        }
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={formData.address.state}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              state: e.target.value,
                            },
                          })
                        }
                        placeholder="State"
                        maxLength={2}
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input
                        id="zip"
                        value={formData.address.zip}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            address: {
                              ...formData.address,
                              zip: e.target.value,
                            },
                          })
                        }
                        placeholder="ZIP"
                      />
                    </div>
                  </div>
                </div>

                {/* Main Contact */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">Main Contact</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="mainPhone">Phone</Label>
                      <Input
                        id="mainPhone"
                        value={formData.mainContact.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mainContact: {
                              ...formData.mainContact,
                              phone: e.target.value,
                            },
                          })
                        }
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="mainEmail">Email</Label>
                      <Input
                        id="mainEmail"
                        type="email"
                        value={formData.mainContact.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            mainContact: {
                              ...formData.mainContact,
                              email: e.target.value,
                            },
                          })
                        }
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </div>

                {/* Point of Contact */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-foreground">
                    Point of Contact
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pocName">Name</Label>
                      <Input
                        id="pocName"
                        value={formData.pointOfContact.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pointOfContact: {
                              ...formData.pointOfContact,
                              name: e.target.value,
                            },
                          })
                        }
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pocTitle">Title</Label>
                      <Input
                        id="pocTitle"
                        value={formData.pointOfContact.title}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pointOfContact: {
                              ...formData.pointOfContact,
                              title: e.target.value,
                            },
                          })
                        }
                        placeholder="Job title"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="pocPhone">Phone</Label>
                      <Input
                        id="pocPhone"
                        value={formData.pointOfContact.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pointOfContact: {
                              ...formData.pointOfContact,
                              phone: e.target.value,
                            },
                          })
                        }
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="pocEmail">Email</Label>
                      <Input
                        id="pocEmail"
                        type="email"
                        value={formData.pointOfContact.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            pointOfContact: {
                              ...formData.pointOfContact,
                              email: e.target.value,
                            },
                          })
                        }
                        placeholder="Email address"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveCollege}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {editingCollege ? "Update College" : "Add College"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* College Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <div
            key={college.id}
            className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
          >
            {/* Header with Name and Status */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {college.name}
                </h3>
                <p className="text-sm text-muted-foreground">{college.code}</p>
              </div>
              <Badge
                variant={college.status === "active" ? "default" : "secondary"}
                className={
                  college.status === "active"
                    ? "bg-green-500 text-white"
                    : "bg-gray-400 text-white"
                }
              >
                {college.status === "active" ? "Active" : "Inactive"}
              </Badge>
            </div>

            {/* Address */}
            <div className="mb-4 pb-4 border-b border-border">
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-foreground font-medium">
                    {college.address.street}
                  </p>
                  <p className="text-muted-foreground">
                    {college.address.city}, {college.address.state}{" "}
                    {college.address.zip}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Contact */}
            <div className="mb-4 pb-4 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Main Contact
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2 text-foreground">
                  <Phone size={14} className="text-primary" />
                  <a href={`tel:${college.mainContact.phone}`}>
                    {college.mainContact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-foreground">
                  <Mail size={14} className="text-primary" />
                  <a href={`mailto:${college.mainContact.email}`}>
                    {college.mainContact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Point of Contact */}
            <div className="mb-4 pb-4 border-b border-border">
              <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                Point of Contact
              </p>
              <div className="space-y-1 text-sm">
                <div className="flex items-start gap-2">
                  <User size={14} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">
                      {college.pointOfContact.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {college.pointOfContact.title}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-foreground ml-6">
                  <Phone size={12} className="text-primary" />
                  <a href={`tel:${college.pointOfContact.phone}`}>
                    {college.pointOfContact.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2 text-foreground ml-6">
                  <Mail size={12} className="text-primary" />
                  <a href={`mailto:${college.pointOfContact.email}`}>
                    {college.pointOfContact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenDialog(college)}
                className="flex-1"
              >
                <Edit2 size={16} className="mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setDeleteConfirm(college)}
                className="flex-1 text-destructive hover:text-destructive"
              >
                <Trash2 size={16} className="mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredColleges.length === 0 && (
        <div className="text-center py-12">
          <AlertCircle className="mx-auto mb-4 text-muted-foreground" size={48} />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No colleges found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filters
          </p>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteConfirm} onOpenChange={() => setDeleteConfirm(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete College</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {deleteConfirm?.name}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteConfirm && handleDeleteCollege(deleteConfirm)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
