import React from 'react';

export const Guards = {};

export function PublicRoute({ children }: { children: React.ReactNode }) { return <>{children}</>; }
export function ProtectedRoute({ children }: { children: React.ReactNode }) { return <>{children}</>; }
export function GuestRoute({ children }: { children: React.ReactNode }) { return <>{children}</>; }
export function RoleRoute({ children, roles }: { children: React.ReactNode, roles: string[] }) { return <>{children}</>; }
export function PermissionRoute({ children, permission }: { children: React.ReactNode, permission: string }) { return <>{children}</>; }
export function OrganizationRoute({ children, orgId }: { children: React.ReactNode, orgId: string }) { return <>{children}</>; }
export function FeatureFlagRoute({ children, flag }: { children: React.ReactNode, flag: string }) { return <>{children}</>; }
