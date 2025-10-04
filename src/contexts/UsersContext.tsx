import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { User, UserRole } from "./RoleContext";

interface UsersContextType {
	users: User[];
	addUser: (input: Omit<User, 'id'>) => User;
	updateUser: (id: string, updates: Partial<User>) => void;
	removeUser: (id: string) => void;
	metrics: {
		totalUsers: number;
		adminUsers: number;
		companyAdminUsers: number;
		managerUsers: number;
		staffUsers: number;
	};
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const useUsers = () => {
	const ctx = useContext(UsersContext);
	if (!ctx) throw new Error('useUsers must be used within UsersProvider');
	return ctx;
};

const DEFAULT_USERS: User[] = [
	{ id: "1", name: "John Doe", email: "john@watersquares.com", role: "admin" },
	{ id: "2", name: "Emily Clark", email: "emily@purewater.com", role: "company_admin", companyId: "c1", companyName: "PureWater" },
	{ id: "3", name: "Marcus Lee", email: "marcus@hydromax.io", role: "manager", companyId: "c2", companyName: "HydroMax" },
	{ id: "4", name: "Sara Khan", email: "sara@bluedrop.net", role: "staff", companyId: "c3", companyName: "Blue Drop" },
];

export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [users, setUsers] = useState<User[]>(() => {
		const stored = localStorage.getItem('users');
		if (stored) {
			try {
				const parsed = JSON.parse(stored) as User[];
				if (Array.isArray(parsed)) return parsed;
			} catch {}
		}
		return DEFAULT_USERS;
	});

	useEffect(() => {
		localStorage.setItem('users', JSON.stringify(users));
	}, [users]);

	const addUser: UsersContextType['addUser'] = (input) => {
		const user: User = {
			id: Date.now().toString(),
			...input,
		};
		setUsers(prev => [user, ...prev]);
		return user;
	};

	const updateUser: UsersContextType['updateUser'] = (id, updates) => {
		setUsers(prev => prev.map(u => (u.id === id ? { ...u, ...updates } : u)));
	};

	const removeUser: UsersContextType['removeUser'] = (id) => {
		setUsers(prev => prev.filter(u => u.id !== id));
	};

	const metrics = useMemo(() => {
		const totalUsers = users.length;
		const adminUsers = users.filter(u => u.role === 'admin').length;
		const companyAdminUsers = users.filter(u => u.role === 'company_admin').length;
		const managerUsers = users.filter(u => u.role === 'manager').length;
		const staffUsers = users.filter(u => u.role === 'staff').length;
		return { totalUsers, adminUsers, companyAdminUsers, managerUsers, staffUsers };
	}, [users]);

	return (
		<UsersContext.Provider value={{ users, addUser, updateUser, removeUser, metrics }}>
			{children}
		</UsersContext.Provider>
	);
};
