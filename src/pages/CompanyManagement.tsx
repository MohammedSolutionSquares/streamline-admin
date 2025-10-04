import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, Plus, Trash2, Edit, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Company, useCompanies } from "@/contexts/CompaniesContext";

export function CompanyManagement() {
  const { toast } = useToast();
  const { companies, addCompany, removeCompany, updateCompany, metrics } = useCompanies();

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [newCompany, setNewCompany] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [editCompanyData, setEditCompanyData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'active' as Company['status']
  });

  const handleAddCompany = () => {
    if (!newCompany.name || !newCompany.email || !newCompany.phone || !newCompany.address) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }

    addCompany({
      name: newCompany.name,
      email: newCompany.email,
      phone: newCompany.phone,
      address: newCompany.address,
      status: 'pending',
      users: 0,
      orders: 0,
      totalRevenue: 0,
    });

    setNewCompany({ name: '', email: '', phone: '', address: '' });
    setIsAddDialogOpen(false);
    toast({ title: "Success", description: "Company added successfully" });
  };

  const handleRemoveCompany = (id: string) => {
    removeCompany(id);
    toast({ title: "Success", description: "Company removed successfully" });
  };

  const openEditDialog = (company: Company) => {
    setEditingCompany(company);
    setEditCompanyData({
      name: company.name,
      email: company.email,
      phone: company.phone,
      address: company.address,
      status: company.status
    });
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingCompany) return;
    if (!editCompanyData.name || !editCompanyData.email || !editCompanyData.phone || !editCompanyData.address) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    updateCompany(editingCompany.id, {
      name: editCompanyData.name,
      email: editCompanyData.email,
      phone: editCompanyData.phone,
      address: editCompanyData.address,
      status: editCompanyData.status
    });

    setIsEditDialogOpen(false);
    setEditingCompany(null);
    toast({ title: "Success", description: "Company updated successfully" });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'suspended':
        return <Badge variant="destructive">Suspended</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-[#1B3C53]">Company Management</h2>
          <p className="text-black/60">
            Manage water delivery companies on your platform
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#1B3C53]">
              <Plus className="h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#1B3C53]">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
              <DialogDescription className="text-white/60">
                Enter the details for the new water delivery company.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Company Name</Label>
                <Input
                className="bg-white text-black"
                  id="name"
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                className="bg-white text-black"
                  id="email"
                  type="email"
                  value={newCompany.email}
                  onChange={(e) => setNewCompany({ ...newCompany, email: e.target.value })}
                  placeholder="Enter contact email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                className="bg-white text-black"
                  id="phone"
                  value={newCompany.phone}
                  onChange={(e) => setNewCompany({ ...newCompany, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                className="bg-white text-black"
                  id="address"
                  value={newCompany.address}
                  onChange={(e) => setNewCompany({ ...newCompany, address: e.target.value })}
                  placeholder="Enter company address"
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="text-[#1B3C53] bg:white" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCompany} className="bg-white text-[#1B3C53]">Add Company</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Company Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px] bg-[#1B3C53]">
            <DialogHeader>
              <DialogTitle>Edit Company</DialogTitle>
              <DialogDescription className="text:white/60">Update the company details.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Company Name</Label>
                <Input
                className="text-black bg-white"
                  id="edit-name"
                  value={editCompanyData.name}
                  onChange={(e) => setEditCompanyData({ ...editCompanyData, name: e.target.value })}
                  placeholder="Enter company name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-email">Email</Label>
                <Input
                className="text-black bg-white"
                  id="edit-email"
                  type="email"
                  value={editCompanyData.email}
                  onChange={(e) => setEditCompanyData({ ...editCompanyData, email: e.target.value })}
                  placeholder="Enter contact email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-phone">Phone</Label>
                <Input
                className="text-black bg:white"
                  id="edit-phone"
                  value={editCompanyData.phone}
                  onChange={(e) => setEditCompanyData({ ...editCompanyData, phone: e.target.value })}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-address">Address</Label>
                <Textarea
                className="text-black bg-white"
                  id="edit-address"
                  value={editCompanyData.address}
                  onChange={(e) => setEditCompanyData({ ...editCompanyData, address: e.target.value })}
                  placeholder="Enter company address"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Status</Label>
                <select
                  id="edit-status"
                  className="bg-background border rounded-md px-2 py-2 text-black bg-white"
                  value={editCompanyData.status}
                  onChange={(e) => setEditCompanyData({ ...editCompanyData, status: e.target.value as Company['status'] })}
                >
                  <option value="active">Active</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="text-black bg-white">
                Cancel
              </Button>
              <Button onClick={handleSaveEdit} className="text-black bg-white">Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-[#1B3C53]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building2 className="h-4 w-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.totalCompanies}</div>
          </CardContent>
        </Card>
        <Card className="bg-[#1B3C53]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <div className="h-2 w-2 bg-green-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.activeCompanies}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1B3C53]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <div className="h-2 w-2 bg-yellow-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.pendingCompanies}
            </div>
          </CardContent>
        </Card>
        <Card className="bg-[#1B3C53]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Suspended</CardTitle>
            <div className="h-2 w-2 bg-red-500 rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {metrics.suspendedCompanies}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Companies Table */}
      <Card className="border border-[#1B3C53] bg-white">
        <CardHeader>
          <CardTitle className="text-black">Companies</CardTitle>
          <CardDescription className="text-black/50">
            A list of all water delivery companies registered on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-black">Company</TableHead>
                <TableHead className="text-black">Contact</TableHead>
                <TableHead className="text-black">Status</TableHead>
                <TableHead className="text-black">Users</TableHead>
                <TableHead className="text-black">Orders</TableHead>
                <TableHead className="text-black">Created</TableHead>
                <TableHead className="text-black text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map((company) => (
                <TableRow key={company.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium text-black">{company.name}</div>
                      <div className="flex items-center gap-1 text-sm text-black">
                        <MapPin className="h-3 w-3 text-black" />
                        {company.address}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm text-black">
                        <Mail className="h-3 w-3" />
                        {company.email}
                      </div>
                      <div className="flex items:center gap-1 text-sm text-black">
                        <Phone className="h-3 w-3" />
                        {company.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(company.status)}</TableCell>
                  <TableCell className="text-black">{company.users}</TableCell>
                  <TableCell className="text-black">{company.orders}</TableCell>
                  <TableCell className="text-black">{company.createdAt}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(company)} className="bg-[#1B3C53] border border-[#1B3C53]">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm" className="bg-[#1B3C53] border border-[#1B3C53]">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-[#1B3C53]">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription className="text-white/50">
                              This action cannot be undone. This will permanently delete the
                              company "{company.name}" and remove all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="text-black bg-white">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleRemoveCompany(company.id)}
                              className="text-black bg-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
    </AdminLayout>
  );
}