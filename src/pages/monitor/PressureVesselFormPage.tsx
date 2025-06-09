
import React from "react";
import PageHeader from "@/components/shared/PageHeader";
import { Gauge } from "lucide-react";

const PressureVesselFormPage = () => {
  return (
    <div className="space-y-6">
      <PageHeader 
        title="Pressure Vessel Assessment"
        subtitle="Risk assessment for pressure vessels"
        icon={<Gauge className="h-6 w-6" />}
      />
      
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">
          Pressure vessel assessment form will be implemented here.
        </p>
      </div>
    </div>
  );
};

export default PressureVesselFormPage;
