import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/lib/query/keys";
import { getCRMDashboard } from "@/lib/api/crm";
import { useLeads, useCreateLead, useUpdateLead, useDeleteLead } from "./useLeads";
import { useCompanies, useCreateCompany, useUpdateCompany, useDeleteCompany } from "./useCompanies";
import { useContacts, useCreateContact, useUpdateContact, useDeleteContact } from "./useContacts";

export function useCRMDashboard() {
  return useQuery({
    queryKey: queryKeys.crm.dashboard,
    queryFn: getCRMDashboard,
  });
}

/**
 * Unified Facade for CRM domain.
 */
export function useCRM() {
  return {
    dashboard: useCRMDashboard,
    leads: {
      useList: useLeads,
      useCreate: useCreateLead,
      useUpdate: useUpdateLead,
      useDelete: useDeleteLead,
    },
    companies: {
      useList: useCompanies,
      useCreate: useCreateCompany,
      useUpdate: useUpdateCompany,
      useDelete: useDeleteCompany,
    },
    contacts: {
      useList: useContacts,
      useCreate: useCreateContact,
      useUpdate: useUpdateContact,
      useDelete: useDeleteContact,
    },
  };
}
