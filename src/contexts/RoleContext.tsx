import React, { createContext, useContext, useState, ReactNode } from 'react';

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
  // Mock user for demonstration - in real app this would come from auth
  const [user, setUser] = useState<User | null>({
    id: '1',
    name: 'John Doe',
    email: 'john@WaterSquares.com',
    role: 'admin',
    companyId: '1',
    companyName: 'WaterSquares Systems'
  });

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