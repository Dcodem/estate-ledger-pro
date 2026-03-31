"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import PropertyForm from "@/components/PropertyForm";

export default function EditOakRidgePage() {
  return (
    <AppLayout>
      <PageHeader
        title="Edit Property"
        subtitle="Oak Ridge Estate"
        breadcrumb={{ label: "Back to Property", href: "/properties/oak-ridge" }}
      />
      <PropertyForm
        mode="edit"
        propertySlug="oak-ridge"
        initialData={{
          name: "Oak Ridge Estate",
          location: "North Highlands",
          type: "residential",
          totalUnits: 1,
          status: "Active",
          monthlyYield: "$4,500",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBM1qBF_qesiMI7AFje_F_zGzA-k2Ca2G18TnBV3tnFQGDDBN9AT_pM5WG9Zz4Zos6PntT8CmCxH76DuUHvpl2x6eb49ba6j6VW8HxoJeLD4AqHCg8QRdF0zy10Bwzn0vVswIgDDAYkwyVNCqcimb72A8EJkDSGLl6cDxkqp8asytmIxMUxP6hfSTBCTa2GXC8vQN6YvwXMc1hLkfRVkIRqeukyzKhkntjzCXK7T2maMY7Oeex4jAwOQTaSHJFhGA5_s_E1CqFStuOw",
          manager: "R. Barrett",
          notes: "Single-family rental property. Long-term tenant (Morrison Family). Lease renewal scheduled for Apr 2025.",
        }}
        initialTenants={[
          { id: "or-t1", unit: "Single Unit", name: "The Morrison Family", rent: "$4,500", status: "Current", leaseEnd: "Jun 2025", notes: "Long-term tenant, excellent payment history" },
        ]}
        initialDocuments={[
          { id: "or-d1", name: "Purchase_Agreement_2022.pdf", size: "3.8 MB", type: "pdf" },
          { id: "or-d2", name: "Homeowners_Insurance_Policy.pdf", size: "1.4 MB", type: "pdf" },
          { id: "or-d3", name: "Property_Appraisal_2024.pdf", size: "4.2 MB", type: "pdf" },
          { id: "or-d4", name: "Tax_Assessment_2024.pdf", size: "680 KB", type: "pdf" },
          { id: "or-d5", name: "Pool_Maintenance_Contract.pdf", size: "1.1 MB", type: "document" },
        ]}
      />
    </AppLayout>
  );
}
