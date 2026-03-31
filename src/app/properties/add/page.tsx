"use client";

import AppLayout from "@/components/AppLayout";
import PageHeader from "@/components/PageHeader";
import PropertyForm from "@/components/PropertyForm";

export default function AddPropertyPage() {
  return (
    <AppLayout>
      <PageHeader
        title="Add Property"
        subtitle="Add a new property to your portfolio"
        breadcrumb={{ label: "Back to Properties", href: "/properties" }}
      />
      <PropertyForm mode="add" />
    </AppLayout>
  );
}
