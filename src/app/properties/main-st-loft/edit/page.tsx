"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import PropertyForm from "@/components/PropertyForm";

export default function EditMainStLoftPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Edit Property"
        subtitle="Main St. Loft"
        breadcrumb={{ label: "Back to Property", href: "/properties/main-st-loft" }}
      />
      <PropertyForm
        mode="edit"
        propertySlug="main-st-loft"
        initialData={{
          name: "Main St. Loft",
          location: "Downtown District",
          type: "residential",
          totalUnits: 6,
          status: "Active",
          monthlyYield: "$8,200",
          imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuATEt7tgpb6XS9AZciyqwO-lUbRJkafEHby7BGUW6UWQ5rWBMr8VijcPZRMgkIYUByeAuEXd5SnJOB9HvXG8ulUTSxNcSlGaYu1oQMGWZ11hzuiuWvKnxk4khzD6q-fL_tAuDO0W8EOXJl3qXUy1lnU-j8C1zWlCwo5rmhJj5P6BGt36FHNdBcIug9Ap-64_Gbg0TEdqJHvDIkj4bjDirMtLDl4gEVt6SJUoxZTh8Df42XuDuBvKVoeb30RDg6HXRXFRgPH9XIuPcS3",
          manager: "A. Shah, M. Kim",
          notes: "Multi-unit residential. 5 of 6 units occupied. Unit D listed on Zillow with 2 inquiries.",
        }}
        initialTenants={[
          { id: "msl-t1", unit: "Unit A", name: "Sarah Chen", rent: "$1,400", status: "Current", leaseEnd: "Apr 2024", notes: "Lease renewal due" },
          { id: "msl-t2", unit: "Unit B", name: "Michael Torres", rent: "$1,350", status: "Current", leaseEnd: "Dec 2025", notes: "" },
          { id: "msl-t3", unit: "Unit C", name: "Jennifer Walsh", rent: "$1,500", status: "Current", leaseEnd: "Jan 2026", notes: "New tenant, started Jan 2024" },
          { id: "msl-t4", unit: "Unit D", name: "", rent: "", status: "Vacant", leaseEnd: "", notes: "Listed on Zillow, 2 inquiries" },
          { id: "msl-t5", unit: "Unit E", name: "Robert Kim", rent: "$1,450", status: "Current", leaseEnd: "Jun 2025", notes: "" },
          { id: "msl-t6", unit: "Unit F", name: "Lisa Park", rent: "$1,500", status: "Current", leaseEnd: "Dec 2025", notes: "Renewed through Dec 2025" },
        ]}
        initialDocuments={[
          { id: "msl-d1", name: "Unit_A_Lease_Agreement.pdf", size: "2.4 MB", type: "pdf" },
          { id: "msl-d2", name: "Unit_B_Lease_Agreement.pdf", size: "2.1 MB", type: "pdf" },
          { id: "msl-d3", name: "Building_Insurance_Certificate.pdf", size: "890 KB", type: "pdf" },
          { id: "msl-d4", name: "Annual_Inspection_Report_2024.pdf", size: "5.6 MB", type: "pdf" },
          { id: "msl-d5", name: "Floor_Plans_All_Units.pdf", size: "12.3 MB", type: "document" },
        ]}
      />
    </AppLayout>
  );
}
