"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import PropertyForm from "@/components/PropertyForm";

export default function EditDowntownPlazaPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Edit Property"
        subtitle="Downtown Plaza"
        breadcrumb={{ label: "Back to Property", href: "/properties/downtown-plaza" }}
      />
      <PropertyForm
        mode="edit"
        propertySlug="downtown-plaza"
        initialData={{
          name: "Downtown Plaza",
          location: "Business District",
          type: "commercial",
          totalUnits: 4,
          status: "Attention",
          monthlyYield: "$6,000",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAyFIdsKID_haOZAONiZxzY3CcUedKeS3rYg7HuXwQi6ZyC550OMFHvsO-XggctDoGnpzca7wMsGw2PcLH25VRE2iGQCKlIlGy_NMtmciRojEJkcBFHtdot4Jq-y76IB3y5sjcRprFHiQyPFQWsIO5Ksw-KFVtKrI_dDej16mCFBsb86wYtN40bhrKtQ0mXBV3g-pxQjjq5glCuZ8GGiw6XhaW3b7SHRwZ08jaYiCYetcDlDU0FX5XnUSR97NleCjf8Dii7MdcXLFhr",
          manager: "J. Davis, L. Martin, T. Clark",
          notes: "Commercial property. Unit 3 vacant since Oct 2023. Unit 4 (Legal Associates) has 2 late payments.",
        }}
        initialTenants={[
          { id: "dp-t1", unit: "Unit 1", name: "Acme Corp", rent: "$2,200", status: "Current", leaseEnd: "Nov 2026", notes: "3-year commercial lease" },
          { id: "dp-t2", unit: "Unit 2", name: "StartupXYZ", rent: "$1,800", status: "Current", leaseEnd: "", notes: "Month-to-month" },
          { id: "dp-t3", unit: "Unit 3", name: "", rent: "", status: "Vacant", leaseEnd: "", notes: "Listed since Oct 2023" },
          { id: "dp-t4", unit: "Unit 4", name: "Legal Associates", rent: "$2,000", status: "Late", leaseEnd: "Mar 2026", notes: "Late payment — 2nd occurrence" },
        ]}
        initialDocuments={[
          { id: "dp-d1", name: "Commercial_Lease_Suite_A.pdf", size: "3.2 MB", type: "pdf" },
          { id: "dp-d2", name: "Commercial_Lease_Suite_B.pdf", size: "2.9 MB", type: "pdf" },
          { id: "dp-d3", name: "Liability_Insurance_Policy.pdf", size: "1.8 MB", type: "pdf" },
          { id: "dp-d4", name: "Zoning_Permit_2024.pdf", size: "560 KB", type: "document" },
          { id: "dp-d5", name: "Fire_Safety_Inspection.pdf", size: "2.1 MB", type: "pdf" },
        ]}
      />
    </AppLayout>
  );
}
