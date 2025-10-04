import React, { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { User, UserRole } from "@/contexts/RoleContext";
import { Plus } from "lucide-react";

const roleBadgeVariant = (role: UserRole) => {
	if (role === "admin") return "default" as const;
	if (role === "company_admin") return "secondary" as const;
	if (role === "manager") return "outline" as const;
	return "outline" as const;
};

export default function Users() {
	const [users, setUsers] = useState<User[]>([
		{ id: "1", name: "John Doe", email: "john@watersquares.com", role: "admin" },
		{ id: "2", name: "Emily Clark", email: "emily@purewater.com", role: "company_admin", companyId: "c1", companyName: "PureWater" },
		{ id: "3", name: "Marcus Lee", email: "marcus@hydromax.io", role: "manager", companyId: "c2", companyName: "HydroMax" },
		{ id: "4", name: "Sara Khan", email: "sara@bluedrop.net", role: "staff", companyId: "c3", companyName: "Blue Drop" },
	]);

	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [role, setRole] = useState<UserRole>("staff");
	const [companyName, setCompanyName] = useState("");

	const canHaveCompany = useMemo(() => role !== "admin", [role]);

	const resetForm = () => {
		setName("");
		setEmail("");
		setRole("staff");
		setCompanyName("");
	};

	const handleAddUser = () => {
		if (!name.trim() || !email.trim()) return;
		const newUser: User = {
			id: String(Date.now()),
			name: name.trim(),
			email: email.trim(),
			role,
			companyName: canHaveCompany && companyName.trim() ? companyName.trim() : undefined,
			companyId: canHaveCompany && companyName.trim() ? `c_${Math.random().toString(36).slice(2, 8)}` : undefined,
		};
		setUsers(prev => [newUser, ...prev]);
		setOpen(false);
		resetForm();
	};

	return (
		<AdminLayout>
			<div className="space-y-6 ">
				<div className="flex items-center justify-between">
					<div>
						<h2 className="text-3xl font-bold tracking-tight text-[#1B3C53]">All Users</h2>
						<p className="text-black/50">Manage test users across roles for QA</p>
					</div>
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button className="bg-[#1B3C53] text-white">
								<Plus className="h-4 w-4 mr-2" /> Add User
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[520px] bg-[#2D5A77]">
							<DialogHeader>
								<DialogTitle>Add User</DialogTitle>
								<DialogDescription className="text-white/50">Create a new test user with a specific role.</DialogDescription>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="name" className="text-right">Name</Label>
									<Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3 bg-white text-black" />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label htmlFor="email" className="text-right">Email</Label>
									<Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="col-span-3 bg-white text-black" />
								</div>
								<div className="grid grid-cols-4 items-center gap-4">
									<Label className="text-right">Role</Label>
									<div className="col-span-3">
										<Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
											<SelectTrigger className="bg-white text-black">
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
										<Label htmlFor="company" className="text-right">Company</Label>
										<Input id="company" value={companyName} onChange={e => setCompanyName(e.target.value)} className="col-span-3 text-black bg-white" placeholder="Optional" />
									</div>
								)}
							</div>
							<DialogFooter>
								<Button variant="outline" onClick={() => setOpen(false)} className="text-black bg-white">Cancel</Button>
								<Button className="text-black bg-white" onClick={handleAddUser}>Save</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</div>

				<Card className="shadow-card bg-[#1B3C53]">
					<CardHeader>
						<CardTitle className="text-white">Users</CardTitle>
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
									</TableRow>
								</TableHeader>
								<TableBody>
									{users.map(u => (
										<TableRow key={u.id}>
											<TableCell className="font-medium">{u.name}</TableCell>
											<TableCell>{u.email}</TableCell>
											<TableCell>
												<Badge variant={roleBadgeVariant(u.role)} className="bg-white text-[#1B3C53] border-0">
													{u.role.replace("_", " ")}
												</Badge>
											</TableCell>
											<TableCell>{u.companyName || "-"}</TableCell>
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
