import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { User, UserRole } from "@/contexts/RoleContext";
import { useUsers } from "@/contexts/UsersContext";
import { useCompanies } from "@/contexts/CompaniesContext";
import { Plus, Pencil, Trash2 } from "lucide-react";

const roleBadgeVariant = (role: UserRole) => {
	if (role === "admin") return "default" as const;
	if (role === "company_admin") return "secondary" as const;
	if (role === "manager") return "outline" as const;
	return "outline" as const;
};

export default function Users() {
	const { users, addUser, updateUser, removeUser } = useUsers();
	const { companies } = useCompanies();

	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [editingUserId, setEditingUserId] = useState<string | null>(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState<UserRole>("staff");
	const [selectedCompanyId, setSelectedCompanyId] = useState("");

	const canHaveCompany = useMemo(() => role !== "admin", [role]);

	const selectedCompany = useMemo(() => {
		return companies.find(c => c.id === selectedCompanyId);
	}, [companies, selectedCompanyId]);

	const resetForm = () => {
		setName("");
		setEmail("");
		setRole("staff");
		setSelectedCompanyId("");
		setIsEditing(false);
		setEditingUserId(null);
	};

	const handleSaveUser = () => {
		if (!name.trim() || !email.trim()) return;
		if (isEditing && editingUserId) {
			updateUser(editingUserId, {
				name: name.trim(),
				email: email.trim(),
				role,
				companyName: canHaveCompany && selectedCompany ? selectedCompany.name : undefined,
				companyId: canHaveCompany && selectedCompanyId ? selectedCompanyId : undefined,
			});
		} else {
			addUser({
				name: name.trim(),
				email: email.trim(),
				role,
				companyName: canHaveCompany && selectedCompany ? selectedCompany.name : undefined,
				companyId: canHaveCompany && selectedCompanyId ? selectedCompanyId : undefined,
			});
		}
		setOpen(false);
		resetForm();
	};

	const startEditUser = (user: User) => {
		setIsEditing(true);
		setEditingUserId(user.id);
		setName(user.name);
		setEmail(user.email);
		setRole(user.role);
		// Find company by companyId or companyName
		const company = companies.find(c => c.id === user.companyId || c.name === user.companyName);
		setSelectedCompanyId(company?.id || "");
		setOpen(true);
	};

	const deleteUser = (id: string) => {
		removeUser(id);
	};

	return (
		<AdminLayout>
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-3xl font-bold tracking-tight text-[#1B3C53]">All Users</h2>
						<p className="text-muted-foreground">Manage test users across roles for QA</p>
					</div>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button className="bg-[#1B3C53] hover:bg-[#2D5A77] text-white">
								<Plus className="h-4 w-4 mr-2" /> Add User
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[520px]">
							<DialogHeader>
								<DialogTitle>{isEditing ? "Edit User" : "Add User"}</DialogTitle>
								<DialogDescription>{isEditing ? "Update the user details." : "Create a new test user with a specific role."}</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">Name</Label>
									<Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="email" className="text-right">Email</Label>
									<Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="col-span-3" />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Role</Label>
									<div className="col-span-3">
										<Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
											<SelectTrigger>
												<SelectValue placeholder="Select a role" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="admin">Admin</SelectItem>
												<SelectItem value="company_admin">Company Admin</SelectItem>
												<SelectItem value="manager">Manager</SelectItem>
												<SelectItem value="staff">Staff</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								{canHaveCompany && (
									<div className="grid grid-cols-4 items-center gap-4">
										<Label className="text-right">Company</Label>
										<div className="col-span-3">
											<Select value={selectedCompanyId} onValueChange={setSelectedCompanyId}>
												<SelectTrigger>
													<SelectValue placeholder="Select a company" />
												</SelectTrigger>
												<SelectContent>
													{companies.map((company) => (
														<SelectItem key={company.id} value={company.id}>
															{company.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</div>
									</div>
								)}
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancel</Button>
								<Button className="bg-[#1B3C53] hover:bg-[#2D5A77] text-white" onClick={handleSaveUser}>{isEditing ? "Update" : "Save"}</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<Card className="shadow-card">
					<CardHeader>
						<CardTitle>Users</CardTitle>
						<CardDescription>All roles are visible here for admins only</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="w-full overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Name</TableHead>
										<TableHead>Email</TableHead>
										<TableHead>Role</TableHead>
										<TableHead>Company</TableHead>
										<TableHead className="w-[140px] text-right">Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map(u => (
										<TableRow key={u.id}>
											<TableCell className="font-medium">{u.name}</TableCell>
											<TableCell>{u.email}</TableCell>
											<TableCell>
												<Badge variant={roleBadgeVariant(u.role)} className="bg-[#1B3C53] text-white border-0">
													{u.role.replace("_", " ")}
												</Badge>
											</TableCell>
										<TableCell>{u.companyName || "-"}</TableCell>
										<TableCell className="text-right space-x-2">
											<Button variant="outline" size="sm" onClick={() => startEditUser(u)}>
												<Pencil className="h-4 w-4 mr-1" /> Edit
											</Button>
											<AlertDialog>
												<AlertDialogTrigger asChild>
													<Button variant="destructive" size="sm">
														<Trash2 className="h-4 w-4 mr-1" /> Delete
													</Button>
												</AlertDialogTrigger>
												<AlertDialogContent>
													<AlertDialogHeader>
														<AlertDialogTitle>Delete user?</AlertDialogTitle>
														<AlertDialogDescription>
															This action cannot be undone. This will permanently remove the user.
														</AlertDialogDescription>
													</AlertDialogHeader>
													<AlertDialogFooter>
														<AlertDialogCancel>Cancel</AlertDialogCancel>
														<AlertDialogAction onClick={() => deleteUser(u.id)}>Delete</AlertDialogAction>
													</AlertDialogFooter>
												</AlertDialogContent>
											</AlertDialog>
										</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</AdminLayout>
	);
}
