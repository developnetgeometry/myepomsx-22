
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { CalendarIcon, Save } from 'lucide-react';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { toast } from 'sonner';

// Sample data for dropdowns
const assets = [
  { id: '1', name: 'Asset 1' },
  { id: '2', name: 'Asset 2' },
  { id: '3', name: 'Asset 3' },
];

const materialConstructions = [
  { id: '1', name: 'Carbon Steel' },
  { id: '2', name: 'Stainless Steel' },
  { id: '3', name: 'Alloy Steel' },
];

const circuitIds = [
  { id: '1', name: 'CID-001' },
  { id: '2', name: 'CID-002' },
  { id: '3', name: 'CID-003' },
];

const pipeClasses = [
  { id: '1', name: 'Class A' },
  { id: '2', name: 'Class B' },
  { id: '3', name: 'Class C' },
];

const pipeSchedules = [
  { id: '1', name: 'Schedule 40' },
  { id: '2', name: 'Schedule 80' },
  { id: '3', name: 'Schedule 160' },
];

const nominalBoreDiameters = [
  { id: '1', name: '1/2"' },
  { id: '2', name: '1"' },
  { id: '3', name: '2"' },
  { id: '4', name: '4"' },
  { id: '5', name: '6"' },
];

const externalEnvironments = [
  { id: '1', name: 'Marine' },
  { id: '2', name: 'Industrial' },
  { id: '3', name: 'Desert' },
  { id: '4', name: 'Tropical' },
];

const geometries = [
  { id: '1', name: 'Straight' },
  { id: '2', name: 'Bend' },
  { id: '3', name: 'Tee' },
  { id: '4', name: 'Elbow' },
];

const coatingQualities = [
  { id: '1', name: 'Excellent' },
  { id: '2', name: 'Good' },
  { id: '3', name: 'Fair' },
  { id: '4', name: 'Poor' },
];

const isolationSystems = [
  { id: '1', name: 'System A' },
  { id: '2', name: 'System B' },
  { id: '3', name: 'System C' },
];

const onlineMonitors = [
  { id: '1', name: 'Monitor A' },
  { id: '2', name: 'Monitor B' },
  { id: '3', name: 'Monitor C' },
];

const detectionSystems = [
  { id: '1', name: 'System A' },
  { id: '2', name: 'System B' },
  { id: '3', name: 'System C' },
];

const mitigationSystems = [
  { id: '1', name: 'System X' },
  { id: '2', name: 'System Y' },
  { id: '3', name: 'System Z' },
];

const toxicities = [
  { id: '1', name: 'Low' },
  { id: '2', name: 'Medium' },
  { id: '3', name: 'High' },
  { id: '4', name: 'Very High' },
];

// Form schema
const formSchema = z.object({
  // General Tab
  asset: z.string({ required_error: "Asset is required" }),
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

type FormValues = z.infer<typeof formSchema>;

const PipingFormPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
    },
  });
  
  const onSubmit = (data: FormValues) => {
    console.log('Form submitted:', data);
    // In a real application, this would send the data to your API
    toast.success("Piping record created successfully", {
      description: "The new piping record has been added to the system"
    });
    
    // For demo, let's navigate to a detail page with a fake ID
    navigate("/monitor/integrity/piping/new-piping-1");
  };
  
  return (
    <div className="space-y-6">
      <PageHeader
        title="Add New Piping"
        subtitle="Create a new piping record in the system"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pipe"><path d="M3 10h18M3 14h18"/><path d="M10 3v18M14 3v18"/></svg>}
      />
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 md:grid-cols-7 w-full mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="design">Design</TabsTrigger>
              <TabsTrigger value="protection">Protection</TabsTrigger>
              <TabsTrigger value="service">Service</TabsTrigger>
              <TabsTrigger value="risk">Risk</TabsTrigger>
              <TabsTrigger value="inspection" className="hidden md:block">Inspection</TabsTrigger>
              <TabsTrigger value="attachment" className="hidden md:block">Attachment</TabsTrigger>
            </TabsList>
            
            <Card>
              <CardContent className="pt-6">
                {/* General Tab */}
                <TabsContent value="general" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <SelectValue placeholder="Select an asset" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {assets.map(asset => (
                                <SelectItem key={asset.id} value={asset.id}>
                                  {asset.name}
                                </SelectItem>
                              ))}
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
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
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
                                className="p-3 pointer-events-auto"
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
                                <SelectValue placeholder="Select material" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {materialConstructions.map(material => (
                                <SelectItem key={material.id} value={material.id}>
                                  {material.name}
                                </SelectItem>
                              ))}
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
                            <Input {...field} placeholder="Enter area" />
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
                            <Input {...field} placeholder="Enter system" />
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
                                <SelectValue placeholder="Select circuit ID" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {circuitIds.map(circuit => (
                                <SelectItem key={circuit.id} value={circuit.id}>
                                  {circuit.name}
                                </SelectItem>
                              ))}
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
                            <Input {...field} placeholder="Enter line number" />
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
                            <Input {...field} placeholder="Enter Tmin" />
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
                                <SelectValue placeholder="Select pipe class" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {pipeClasses.map(pipeClass => (
                                <SelectItem key={pipeClass.id} value={pipeClass.id}>
                                  {pipeClass.name}
                                </SelectItem>
                              ))}
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
                                <SelectValue placeholder="Select pipe schedule" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {pipeSchedules.map(schedule => (
                                <SelectItem key={schedule.id} value={schedule.id}>
                                  {schedule.name}
                                </SelectItem>
                              ))}
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
                            <Input {...field} placeholder="Enter thickness" />
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
                                <SelectValue placeholder="Select diameter" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {nominalBoreDiameters.map(diameter => (
                                <SelectItem key={diameter.id} value={diameter.id}>
                                  {diameter.name}
                                </SelectItem>
                              ))}
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
                            <Input {...field} placeholder="Enter pressure rating" />
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
                          <Textarea {...field} placeholder="Enter description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <FormField
                      control={form.control}
                      name="insulation"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Insulation</FormLabel>
                          </div>
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Line H2S</FormLabel>
                          </div>
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Internal Lining</FormLabel>
                          </div>
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">PWHT</FormLabel>
                          </div>
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Cladding</FormLabel>
                          </div>
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
                <TabsContent value="design" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="internalDiameter"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Internal Diameter</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Enter internal diameter" />
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
                            <Input {...field} placeholder="Enter outer diameter" />
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
                            <Input {...field} placeholder="Enter length" />
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
                            <Input {...field} placeholder="Enter efficiency" />
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
                            <Input {...field} placeholder="Enter design temperature" />
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
                            <Input {...field} placeholder="Enter operating temperature" />
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
                            <Input {...field} placeholder="Enter design pressure" />
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
                            <Input {...field} placeholder="Enter operating pressure" />
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
                            <Input {...field} placeholder="Enter allowable stress" />
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
                            <Input {...field} placeholder="Enter corrosion allowance" />
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
                                <SelectValue placeholder="Select environment" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {externalEnvironments.map(env => (
                                <SelectItem key={env.id} value={env.id}>
                                  {env.name}
                                </SelectItem>
                              ))}
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
                                <SelectValue placeholder="Select geometry" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {geometries.map(geometry => (
                                <SelectItem key={geometry.id} value={geometry.id}>
                                  {geometry.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <FormField
                      control={form.control}
                      name="pipeSupport"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Pipe Support</FormLabel>
                          </div>
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Soil Water Interface</FormLabel>
                          </div>
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Dead Legs</FormLabel>
                          </div>
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
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Mix Point</FormLabel>
                          </div>
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
                <TabsContent value="protection" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <SelectValue placeholder="Select coating quality" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {coatingQualities.map(quality => (
                                <SelectItem key={quality.id} value={quality.id}>
                                  {quality.name}
                                </SelectItem>
                              ))}
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
                                <SelectValue placeholder="Select isolation system" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {isolationSystems.map(system => (
                                <SelectItem key={system.id} value={system.id}>
                                  {system.name}
                                </SelectItem>
                              ))}
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
                                <SelectValue placeholder="Select online monitor" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {onlineMonitors.map(monitor => (
                                <SelectItem key={monitor.id} value={monitor.id}>
                                  {monitor.name}
                                </SelectItem>
                              ))}
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
                            <Input {...field} placeholder="Enter Trd value" />
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
                            <Input {...field} placeholder="Enter minimum thickness" />
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
                            <Input {...field} placeholder="Enter PWHT details" />
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
                            <Input {...field} placeholder="Enter line description" />
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
                            <Input {...field} placeholder="Enter replacement line" />
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
                                <SelectValue placeholder="Select detection system" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {detectionSystems.map(system => (
                                <SelectItem key={system.id} value={system.id}>
                                  {system.name}
                                </SelectItem>
                              ))}
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
                                <SelectValue placeholder="Select mitigation system" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {mitigationSystems.map(system => (
                                <SelectItem key={system.id} value={system.id}>
                                  {system.name}
                                </SelectItem>
                              ))}
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
                            <Input {...field} placeholder="Enter CR Exp" />
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
                            <Input {...field} placeholder="Enter Sret Corr" />
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
                            <Input {...field} placeholder="Enter Fsect Corr" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 max-w-xs">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Active</FormLabel>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </TabsContent>
                
                {/* Service Tab */}
                <TabsContent value="service" className="space-y-6">
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
                                <SelectValue placeholder="Select toxicity level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {toxicities.map(level => (
                                <SelectItem key={level.id} value={level.id}>
                                  {level.name}
                                </SelectItem>
                              ))}
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
                            <Input {...field} placeholder="Enter toxic mass fraction" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </TabsContent>
                
                {/* Risk Tab */}
                <TabsContent value="risk" className="space-y-6">
                  <div className="h-40 flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">
                      Risk data will be available after creating the piping record
                    </p>
                  </div>
                </TabsContent>
                
                {/* Inspection Tab */}
                <TabsContent value="inspection" className="space-y-6">
                  <div className="h-40 flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">
                      Inspection data will be available after creating the piping record
                    </p>
                  </div>
                </TabsContent>
                
                {/* Attachment Tab */}
                <TabsContent value="attachment" className="space-y-6">
                  <div className="h-40 flex items-center justify-center border rounded-md bg-muted/20">
                    <p className="text-muted-foreground">
                      Attachments will be available after creating the piping record
                    </p>
                  </div>
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
          
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" onClick={() => navigate('/monitor/integrity')}>
              Cancel
            </Button>
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> Save Piping
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PipingFormPage;
