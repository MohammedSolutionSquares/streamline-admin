import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CompanyStatus = 'active' | 'pending' | 'suspended';

export interface Company {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	status: CompanyStatus;
	users: number;
	orders: number;
	createdAt: string;
	totalRevenue?: number;
}

interface CompaniesContextType {
	companies: Company[];
	addCompany: (input: Omit<Company, 'id' | 'createdAt'>) => Company;
	updateCompany: (id: string, updates: Partial<Company>) => void;
	removeCompany: (id: string) => void;
	metrics: {
		totalCompanies: number;
		activeCompanies: number;
		pendingCompanies: number;
		suspendedCompanies: number;
		totalUsers: number;
		totalOrders: number;
		totalRevenue: number;
	};
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(undefined);

export const useCompanies = () => {
	const ctx = useContext(CompaniesContext);
	if (!ctx) throw new Error('useCompanies must be used within CompaniesProvider');
	return ctx;
};

const DEFAULT_COMPANIES: Company[] = [
	{
		id: '1',
		name: 'PureWater Solutions',
		email: 'contact@purewater.com',
		phone: '+1 (555) 123-4567',
		address: '123 Water Street, City, State 12345',
		status: 'active',
		users: 45,
		orders: 234,
		createdAt: '2024-01-15',
		totalRevenue: 89250,
	},
	{
		id: '2',
		name: 'AquaFresh Delivery',
		email: 'info@aquafresh.com',
		phone: '+1 (555) 987-6543',
		address: '456 Fresh Ave, City, State 67890',
		status: 'pending',
		users: 12,
		orders: 0,
		createdAt: '2024-03-20',
		totalRevenue: 67800,
	},
	{
		id: '3',
		name: 'Crystal Clear Water',
		email: 'hello@crystalclear.com',
		phone: '+1 (555) 456-7890',
		address: '789 Crystal Blvd, City, State 13579',
		status: 'active',
		users: 78,
		orders: 456,
		createdAt: '2023-11-10',
		totalRevenue: 145600,
	},
	{
		id: '4',
		name: 'Blue Drop Services',
		email: 'support@bluedrop.com',
		phone: '+1 (555) 321-0987',
		address: '321 Blue Lane, City, State 24680',
		status: 'suspended',
		users: 23,
		orders: 89,
		createdAt: '2024-02-05',
		totalRevenue: 32400,
	},
];

export const CompaniesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [companies, setCompanies] = useState<Company[]>(() => {
		const stored = localStorage.getItem('companies');
		if (stored) {
			try {
				const parsed = JSON.parse(stored) as Company[];
				if (Array.isArray(parsed)) return parsed;
			} catch {}
		}
		return DEFAULT_COMPANIES;
	});

	useEffect(() => {
		localStorage.setItem('companies', JSON.stringify(companies));
	}, [companies]);

	const addCompany: CompaniesContextType['addCompany'] = (input) => {
		const company: Company = {
			id: Date.now().toString(),
			createdAt: new Date().toISOString().split('T')[0],
			...input,
		};
		setCompanies(prev => [...prev, company]);
		return company;
	};

	const updateCompany: CompaniesContextType['updateCompany'] = (id, updates) => {
		setCompanies(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
	};

	const removeCompany: CompaniesContextType['removeCompany'] = (id) => {
		setCompanies(prev => prev.filter(c => c.id !== id));
	};

	const metrics = useMemo(() => {
		const totalCompanies = companies.length;
		const activeCompanies = companies.filter(c => c.status === 'active').length;
		const pendingCompanies = companies.filter(c => c.status === 'pending').length;
		const suspendedCompanies = companies.filter(c => c.status === 'suspended').length;
		const totalUsers = companies.reduce((sum, c) => sum + (c.users || 0), 0);
		const totalOrders = companies.reduce((sum, c) => sum + (c.orders || 0), 0);
		const totalRevenue = companies.reduce((sum, c) => sum + (c.totalRevenue || 0), 0);
		return { totalCompanies, activeCompanies, pendingCompanies, suspendedCompanies, totalUsers, totalOrders, totalRevenue };
	}, [companies]);

	return (
		<CompaniesContext.Provider value={{ companies, addCompany, updateCompany, removeCompany, metrics }}>
			{children}
		</CompaniesContext.Provider>
	);
};
