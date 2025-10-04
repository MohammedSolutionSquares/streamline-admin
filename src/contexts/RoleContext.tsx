import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'company_admin' | 'manager' | 'staff';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
}

interface RoleContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  switchRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export const useRole = () => {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

interface RoleProviderProps {
  children: ReactNode;
}

export const RoleProvider: React.FC<RoleProviderProps> = ({ children }) => {
  // Default user - will be overridden by localStorage if available
  const defaultUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@WaterSquares.com',
    role: 'admin',
    companyId: '1',
    companyName: 'WaterSquares Systems'
  };

  const [user, setUser] = useState<User | null>(() => {
    // Load user from localStorage on initialization
    try {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        const parsed = JSON.parse(stored) as User;
        if (parsed && parsed.id && parsed.name && parsed.email && parsed.role) {
          return parsed;
        }
      }
    } catch {}
    return defaultUser;
  });

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }, [user]);

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({
        ...user,
        role,
        companyName: role === 'company_admin' ? 'PureWater Co.' : user.companyName
      });
    }
  };

  return (
    <RoleContext.Provider value={{ user, setUser, switchRole }}>
      {children}
    </RoleContext.Provider>
  );
};