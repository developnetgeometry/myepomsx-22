
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { assetService } from "@/services/assetService";
import PageHeader from "@/components/shared/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Edit, FileText, Settings, Activity } from "lucide-react";

const AssetDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const assetId = parseInt(id || "0", 10);

  const { data: asset, isLoading, error } = useQuery({
    queryKey: ["asset", assetId],
    queryFn: () => assetService.getAssetByIdWithRelations(assetId),
    enabled: !!assetId,
  });

  if (isLoading) return <div>Loading asset details...</div>;
  if (error) return <div>Error loading asset: {error.message}</div>;
  if (!asset) return <div>Asset not found</div>;

  const getStatusBadge = (statusId: number) => {
    switch (statusId) {
      case 1:
        return <Badge variant="default">Active</Badge>;
      case 2:
        return <Badge variant="secondary">Maintenance</Badge>;
      case 3:
        return <Badge variant="outline">Standby</Badge>;
      default:
        return <Badge variant="destructive">Inactive</Badge>;
    }
  };

  const getCriticalityBadge = (criticalityId: number) => {
    switch (criticalityId) {
      case 1:
        return <Badge variant="destructive">Critical</Badge>;
      case 2:
        return <Badge variant="secondary">High</Badge>;
      case 3:
        return <Badge variant="default">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          onClick={() => navigate("/manage/assets")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Assets
        </Button>
      </div>

      <PageHeader 
        title={`Asset: ${asset.asset_no}`}
        subtitle={asset.asset_name || "Asset Details"}
      />

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Basic Information</CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Asset Number</label>
                  <p className="text-sm font-medium">{asset.asset_no}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Asset Name</label>
                  <p className="text-sm">{asset.asset_name || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Status</label>
                  <div className="mt-1">{getStatusBadge(asset.status_id || 0)}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Commission Date</label>
                  <p className="text-sm">{asset.commission_date ? new Date(asset.commission_date).toLocaleDateString() : "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Location & Hierarchy</CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Facility ID</label>
                  <p className="text-sm">{asset.facility_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">System ID</label>
                  <p className="text-sm">{asset.system_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Package ID</label>
                  <p className="text-sm">{asset.package_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Parent Asset</label>
                  <p className="text-sm">{asset.parent_asset_no || "N/A"}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">Classification</CardTitle>
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Asset Tag</label>
                  <p className="text-sm">{asset.asset_tag_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Asset Group</label>
                  <p className="text-sm">{asset.asset_group_id || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">SCE Code</label>
                  <p className="text-sm">{asset.asset_sce_id || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-lg mb-4">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold">Operational Status</h3>
                <Badge variant="info" className="mt-2">Running</Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-yellow-100 rounded-lg mb-4">
                  <Settings className="h-6 w-6 text-yellow-600" />
                </div>
                <h3 className="font-semibold">Next Maintenance</h3>
                <Badge variant="warning" className="mt-2">Due in 15 days</Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-lg mb-4">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold">Uptime</h3>
                <Badge variant="success" className="mt-2">98.5%</Badge>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-lg mb-4">
                  <Activity className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold">Criticality</h3>
                {getCriticalityBadge(1)}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="technical">
          <Card>
            <CardHeader>
              <CardTitle>Technical Specifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Technical details will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance">
          <Card>
            <CardHeader>
              <CardTitle>Maintenance History</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Maintenance records will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Asset Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">Document attachments will be displayed here...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssetDetailsPage;
