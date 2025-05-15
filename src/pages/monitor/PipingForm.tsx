
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, Check, Plus, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import PageHeader from '@/components/shared/PageHeader';
import Breadcrumbs from '@/components/shared/Breadcrumbs';
import { toast } from "sonner";

// Form schema using zod
const pipingFormSchema = z.object({
  // General Tab
  asset: z.string({ required_error: "Please select an asset" }),
  yearInService: z.date({ required_error: "Year in service is required" }),
  materialConstruction: z.string({ required_error: "Material construction is required" }),
  area: z.string().optional(),
  system: z.string().optional(),
  circuitId: z.string().optional(),
  lineNo: z.string().optional(),
  tmin: z.string().optional(),
  pipeClass: z.string().optional(),
  pipeSchedule: z.string().optional(),
  nominalWallThickness: z.string().optional(),
  nominalBoreDiameter: z.string().optional(),
  pressureRating: z.string().optional(),
  description: z.string().optional(),
  insulation: z.boolean().default(false),
  lineH2S: z.boolean().default(false),
  internalLining: z.boolean().default(false),
  pwht: z.boolean().default(false),
  cladding: z.boolean().default(false),

  // Design Tab
  internalDiameter: z.string().optional(),
  outerDiameter: z.string().optional(),
  length: z.string().optional(),
  weldJoinEfficiency: z.string().optional(),
  designTemperature: z.string().optional(),
  operatingTemperature: z.string().optional(),
  designPressure: z.string().optional(),
  operatingPressure: z.string().optional(),
  allowableStress: z.string().optional(),
  corrosionAllowance: z.string().optional(),
  externalEnvironment: z.string().optional(),
  geometry: z.string().optional(),
  pipeSupport: z.boolean().default(false),
  soilWaterInterface: z.boolean().default(false),
  deadLegs: z.boolean().default(false),
  mixPoint: z.boolean().default(false),

  // Protection Tab
  coatingQuality: z.string().optional(),
  isolationSystem: z.string().optional(),
  onlineMonitor: z.string().optional(),
  trd: z.string().optional(),
  minimumThickness: z.string().optional(),
  postWeldHeatTreatment: z.string().optional(),
  lineDescription: z.string().optional(),
  replacementLine: z.string().optional(),
  detectionSystem: z.string().optional(),
  mitigationSystem: z.string().optional(),
  active: z.boolean().default(true),
  crExp: z.string().optional(),
  sretCorr: z.string().optional(),
  fsectCorr: z.string().optional(),

  // Service Tab
  toxicity: z.string().optional(),
  toxicMassFraction: z.string().optional(),
});

type PipingFormValues = z.infer<typeof pipingFormSchema>;

const PipingForm = () => {
  const [activeTab, setActiveTab] = useState("general");
  const navigate = useNavigate();

  // Default values for the form
  const defaultValues: Partial<PipingFormValues> = {
    insulation: false,
    lineH2S: false,
    internalLining: false,
    pwht: false,
    cladding: false,
    pipeSupport: false,
    soilWaterInterface: false,
    deadLegs: false,
    mixPoint: false,
    active: true,
  };

  const form = useForm<PipingFormValues>({
    resolver: zodResolver(pipingFormSchema),
    defaultValues,
  });

  function onSubmit(data: PipingFormValues) {
    console.log(data);
    toast.success("Piping added successfully");
    // In a real application, save the data to your database or API
    // Then navigate back to the list page
    navigate("/monitor/integrity");
  }

  return (
    <div className="space-y-6">
      <Breadcrumbs />
      <PageHeader
        title="Add New Piping"
        subtitle="Add a new piping to RBI Assessment"
        icon={<ShieldAlert className="h-6 w-6" />}
      />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="general" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="mb-4 w-full justify-start">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="protection">Protection</TabsTrigger>
                  <TabsTrigger value="service">Service</TabsTrigger>
                  <TabsTrigger value="risk">Risk</TabsTrigger>
                  <TabsTrigger value="inspection">Inspection</TabsTrigger>
                  <TabsTrigger value="attachment">Attachment</TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="asset"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Asset *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Asset" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="PV-1001">PV-1001</SelectItem>
                              <SelectItem value="PP-2003">PP-2003</SelectItem>
                              <SelectItem value="PV-1002">PV-1002</SelectItem>
                              <SelectItem value="PP-2001">PP-2001</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="yearInService"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Year In Service *</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "yyyy-MM-dd")
                                  ) : (
                                    <span>Select date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="materialConstruction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Material Construction *</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Material" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="carbon_steel">Carbon Steel</SelectItem>
                              <SelectItem value="stainless_steel">Stainless Steel</SelectItem>
                              <SelectItem value="alloy_steel">Alloy Steel</SelectItem>
                              <SelectItem value="duplex">Duplex</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="area"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Area</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="system"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>System</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="circuitId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Circuit ID</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Circuit ID" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="circuit_1">Circuit 1</SelectItem>
                              <SelectItem value="circuit_2">Circuit 2</SelectItem>
                              <SelectItem value="circuit_3">Circuit 3</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lineNo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Line No</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="tmin"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tmin</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pipeClass"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pipe Class</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Pipe Class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="class_a">Class A</SelectItem>
                              <SelectItem value="class_b">Class B</SelectItem>
                              <SelectItem value="class_c">Class C</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pipeSchedule"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pipe Schedule</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Pipe Schedule" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="sch_10">Schedule 10</SelectItem>
                              <SelectItem value="sch_20">Schedule 20</SelectItem>
                              <SelectItem value="sch_40">Schedule 40</SelectItem>
                              <SelectItem value="sch_80">Schedule 80</SelectItem>
                              <SelectItem value="sch_160">Schedule 160</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nominalWallThickness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nominal Wall Thickness</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="nominalBoreDiameter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nominal Bore Diameter</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Nominal Bore Diameter" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="1-2">1/2"</SelectItem>
                              <SelectItem value="3-4">3/4"</SelectItem>
                              <SelectItem value="1">1"</SelectItem>
                              <SelectItem value="1-1-4">1-1/4"</SelectItem>
                              <SelectItem value="1-1-2">1-1/2"</SelectItem>
                              <SelectItem value="2">2"</SelectItem>
                              <SelectItem value="2-1-2">2-1/2"</SelectItem>
                              <SelectItem value="3">3"</SelectItem>
                              <SelectItem value="4">4"</SelectItem>
                              <SelectItem value="6">6"</SelectItem>
                              <SelectItem value="8">8"</SelectItem>
                              <SelectItem value="10">10"</SelectItem>
                              <SelectItem value="12">12"</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pressureRating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pressure Rating</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} rows={3} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 pt-4">
                    <FormField
                      control={form.control}
                      name="insulation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Insulation</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lineH2S"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Line H2S</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="internalLining"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Internal Lining</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pwht"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">PWHT</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="cladding"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Cladding</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Design Tab */}
                <TabsContent value="design" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="internalDiameter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internal Diameter</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="outerDiameter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Outer Diameter</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="length"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Length</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="weldJoinEfficiency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weld Join Efficiency</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="designTemperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Design Temperature</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="operatingTemperature"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operating Temperature</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="designPressure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Design Pressure (MPa)</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="operatingPressure"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Operating Pressure (MPa)</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="allowableStress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allowable Stress (MPa)</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="corrosionAllowance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Corrosion Allowance</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="externalEnvironment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>External Environment</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Environment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="marine">Marine</SelectItem>
                              <SelectItem value="industrial">Industrial</SelectItem>
                              <SelectItem value="desert">Desert</SelectItem>
                              <SelectItem value="arctic">Arctic</SelectItem>
                              <SelectItem value="tropical">Tropical</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="geometry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Geometry</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Geometry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="straight">Straight</SelectItem>
                              <SelectItem value="elbow">Elbow</SelectItem>
                              <SelectItem value="tee">Tee</SelectItem>
                              <SelectItem value="reducer">Reducer</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
                    <FormField
                      control={form.control}
                      name="pipeSupport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Pipe Support</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="soilWaterInterface"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Soil Water Interface</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="deadLegs"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Dead Legs</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mixPoint"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Mix Point</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Protection Tab */}
                <TabsContent value="protection" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <FormField
                      control={form.control}
                      name="coatingQuality"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Coating Quality</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Coating Quality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="good">Good</SelectItem>
                              <SelectItem value="fair">Fair</SelectItem>
                              <SelectItem value="poor">Poor</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isolationSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Isolation System</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Isolation System" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="manual">Manual</SelectItem>
                              <SelectItem value="auto">Auto</SelectItem>
                              <SelectItem value="semi-auto">Semi-Auto</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="onlineMonitor"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Online Monitor</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Online Monitor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="full">Full</SelectItem>
                              <SelectItem value="partial">Partial</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="trd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Trd (mm)</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="minimumThickness"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Thickness (mm)</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="postWeldHeatTreatment"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Post Weld Heat Treatment</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lineDescription"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Line Description</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="replacementLine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Replacement Line</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="detectionSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Detection System</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Detection System" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="manual">Manual</SelectItem>
                              <SelectItem value="auto">Auto</SelectItem>
                              <SelectItem value="semi-auto">Semi-Auto</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="mitigationSystem"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mitigation System</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Mitigation System" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="basic">Basic</SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                              <SelectItem value="premium">Premium</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="crExp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CR Exp</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="sretCorr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sret Corr</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fsectCorr"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Fsect Corr</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="active"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                          <FormLabel className="text-base">Active</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Service Tab */}
                <TabsContent value="service" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="toxicity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Toxicity</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select Toxicity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="toxicMassFraction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Toxic Mass Fraction</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>

                {/* Risk Tab */}
                <TabsContent value="risk" className="space-y-4">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Risk assessment information will be added later</p>
                  </div>
                </TabsContent>

                {/* Inspection Tab */}
                <TabsContent value="inspection" className="space-y-4">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Inspection information will be added later</p>
                  </div>
                </TabsContent>

                {/* Attachment Tab */}
                <TabsContent value="attachment" className="space-y-4">
                  <div className="flex items-center justify-center h-40">
                    <p className="text-muted-foreground">Attachments can be added later</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate("/monitor/integrity")}>
              Cancel
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" /> Save Piping
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PipingForm;
