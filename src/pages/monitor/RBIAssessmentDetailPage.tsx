import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageHeader from '@/components/shared/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

// Form validation schemas
const pofGeneralSchema = z.object({
  asset: z.string().min(1, { message: "Asset is required" }),
  coatingQuality: z.string().min(1, { message: "Coating Quality is required" }),
  dataConfidence: z.string().min(1, { message: "Data Confidence is required" }),
  hasClading: z.boolean().default(false),
  nominalThickness: z.string()
    .transform(val => val === '' ? '0' : val)
    .refine(val => !isNaN(Number(val)), { message: "Must be a number" }),
  tMin: z.string()
    .transform(val => val === '' ? '0' : val)
    .refine(val => !isNaN(Number(val)), { message: "Must be a number" }),
  currentThickness: z.string()
    .transform(val => val === '' ? '0' : val)
    .refine(val => !isNaN(Number(val)), { message: "Must be a number" }),
  description: z.string().optional(),
});

const damageFactorSchema = z.object({
  // DF THIN
  lastInspectionDate: z.string().optional(),
  lastCoatingDate: z.string().optional(),
  nthinA: z.string().transform(val => val === '' ? '0' : val),
  nthinB: z.string().transform(val => val === '' ? '0' : val),
  fsThin: z.string().transform(val => val === '' ? '0' : val),
  srThin: z.string().transform(val => val === '' ? '0' : val),
  dfthin1: z.string().transform(val => val === '' ? '0' : val),
  dfthin2: z.string().transform(val => val === '' ? '0' : val),
  creep: z.string().transform(val => val === '' ? '0' : val),
  pothin1: z.string().transform(val => val === '' ? '0' : val),
  agerc: z.string().transform(val => val === '' ? '0' : val),
  bhthin: z.string().transform(val => val === '' ? '0' : val),
  
  // DF EXT
  dfext: z.string().transform(val => val === '' ? '0' : val),
  
  // DF EXT.CLSCC
  dfextclscc: z.string().transform(val => val === '' ? '0' : val),
  
  // DF MFAT
  dfmfat: z.string().transform(val => val === '' ? '0' : val),
  
  // DF CUI
  dfcui: z.string().transform(val => val === '' ? '0' : val),
  
  // DF SCC SSC
  dfsccSSC: z.string().transform(val => val === '' ? '0' : val),
  
  // DF SCC SOHIC
  dfsccSOHIC: z.string().transform(val => val === '' ? '0' : val),
});

const cofProdSchema = z.object({
  fcommd: z.string().transform(val => val === '' ? '0' : val),
  fatta: z.string().transform(val => val === '' ? '0' : val),
  outagehrs: z.string().transform(val => val === '' ? '0' : val),
  outagemult: z.string().transform(val => val === '' ? '0' : val),
  lrapprod: z.string().transform(val => val === '' ? '0' : val),
  fprodd: z.string().transform(val => val === '' ? '0' : val),
  popdens: z.string().transform(val => val === '' ? '0' : val),
  injcost: z.string().transform(val => val === '' ? '0' : val),
  facexp: z.string().transform(val => val === '' ? '0' : val),
  volinv: z.string().transform(val => val === '' ? '0' : val),
  fc: z.string().transform(val => val === '' ? '0' : val),
  ftotal: z.string().transform(val => val === '' ? '0' : val),
  envcost: z.string().transform(val => val === '' ? '0' : val),
  fatality: z.string().transform(val => val === '' ? '0' : val),
  evacuation: z.string().transform(val => val === '' ? '0' : val),
});

const cofAreaSchema = z.object({
  isoSys: z.string(),
  detSys: z.string(),
  mitigationSystem: z.string(),
  idealGasSpecificHeatEQ: z.string(),
  pkkpa: z.string().transform(val => val === '' ? '0' : val),
  prtankkpa: z.string().transform(val => val === '' ? '0' : val),
  wtkg: z.string().transform(val => val === '' ? '0' : val),
  releaseType: z.string(),
  ratton: z.string().transform(val => val === '' ? '0' : val),
  inventorykg: z.string().transform(val => val === '' ? '0' : val),
  caCmdfail: z.string().transform(val => val === '' ? '0' : val),
  caInjfail: z.string().transform(val => val === '' ? '0' : val),
  caInjfatal: z.string().transform(val => val === '' ? '0' : val),
  caCmdfatal: z.string().transform(val => val === '' ? '0' : val),
  k: z.string().transform(val => val === '' ? '0' : val),
  timemstep: z.string().transform(val => val === '' ? '0' : val),
  ldmax: z.string().transform(val => val === '' ? '0' : val),
});

const riskIRPSchema = z.object({
  dfhta: z.string().transform(val => val === '' ? '0' : val),
  dbrint: z.string().transform(val => val === '' ? '0' : val),
  dfmat: z.string().transform(val => val === '' ? '0' : val),
  dfextclsc: z.string().transform(val => val === '' ? '0' : val),
  dfcuiiff: z.string().transform(val => val === '' ? '0' : val),
  dmsccssc: z.string().transform(val => val === '' ? '0' : val),
  dmfat: z.string().transform(val => val === '' ? '0' : val),
  dpSccSohic: z.string().transform(val => val === '' ? '0' : val),
  cofFinancial: z.string().transform(val => val === '' ? '0' : val),
  cofArea: z.string().transform(val => val === '' ? '0' : val),
  dfthin: z.string().transform(val => val === '' ? '0' : val),
  pof: z.string().transform(val => val === '' ? '0' : val),
  pofValue: z.string().transform(val => val === '' ? '0' : val),
  riskLevel: z.string(),
  riskRanking: z.string(),
});

// Sample dropdown options
const coatingQualityOptions = [
  { value: 'excellent', label: 'Excellent' },
  { value: 'good', label: 'Good' },
  { value: 'fair', label: 'Fair' },
  { value: 'poor', label: 'Poor' },
];

const dataConfidenceOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const systemOptions = [
  { value: 'present', label: 'Present' },
  { value: 'absent', label: 'Absent' },
  { value: 'unknown', label: 'Unknown' },
];

const releaseTypeOptions = [
  { value: 'instantaneous', label: 'Instantaneous' },
  { value: 'continuous', label: 'Continuous' },
];

const riskLevelOptions = [
  { value: 'high', label: 'High' },
  { value: 'medium', label: 'Medium' },
  { value: 'low', label: 'Low' },
];

const RBIAssessmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mainTab, setMainTab] = useState("pof");
  const [pofSubTab, setPofSubTab] = useState("general");
  const [cofSubTab, setCofSubTab] = useState("cofProd");
  
  // Initialize forms for each section
  const pofGeneralForm = useForm<z.infer<typeof pofGeneralSchema>>({
    resolver: zodResolver(pofGeneralSchema),
    defaultValues: {
      asset: '',
      coatingQuality: 'good',
      dataConfidence: 'medium',
      hasClading: false,
      nominalThickness: '0',
      tMin: '0',
      currentThickness: '0',
      description: '',
    }
  });
  
  const damageFactorForm = useForm<z.infer<typeof damageFactorSchema>>({
    resolver: zodResolver(damageFactorSchema),
    defaultValues: {
      lastInspectionDate: '',
      lastCoatingDate: '',
      nthinA: '0',
      nthinB: '0',
      fsThin: '0',
      srThin: '0',
      dfthin1: '0',
      dfthin2: '0',
      creep: '0',
      pothin1: '0',
      agerc: '0',
      bhthin: '0',
      dfext: '0',
      dfextclscc: '0',
      dfmfat: '0',
      dfcui: '0',
      dfsccSSC: '0',
      dfsccSOHIC: '0',
    }
  });
  
  const cofProdForm = useForm<z.infer<typeof cofProdSchema>>({
    resolver: zodResolver(cofProdSchema),
    defaultValues: {
      fcommd: '0',
      fatta: '0',
      outagehrs: '0',
      outagemult: '0',
      lrapprod: '0',
      fprodd: '0',
      popdens: '0',
      injcost: '0',
      facexp: '0',
      volinv: '0',
      fc: '0',
      ftotal: '0',
      envcost: '0',
      fatality: '0',
      evacuation: '0',
    }
  });
  
  const cofAreaForm = useForm<z.infer<typeof cofAreaSchema>>({
    resolver: zodResolver(cofAreaSchema),
    defaultValues: {
      isoSys: 'absent',
      detSys: 'absent',
      mitigationSystem: 'absent',
      idealGasSpecificHeatEQ: '',
      pkkpa: '0',
      prtankkpa: '0',
      wtkg: '0',
      releaseType: 'instantaneous',
      ratton: '0',
      inventorykg: '0',
      caCmdfail: '0',
      caInjfail: '0',
      caInjfatal: '0',
      caCmdfatal: '0',
      k: '0',
      timemstep: '0',
      ldmax: '0',
    }
  });
  
  const riskIRPForm = useForm<z.infer<typeof riskIRPSchema>>({
    resolver: zodResolver(riskIRPSchema),
    defaultValues: {
      dfhta: '0',
      dbrint: '0',
      dfmat: '0',
      dfextclsc: '0',
      dfcuiiff: '0',
      dmsccssc: '0',
      dmfat: '0',
      dpSccSohic: '0',
      cofFinancial: '0',
      cofArea: '0',
      dfthin: '0',
      pof: '0',
      pofValue: '0',
      riskLevel: 'medium',
      riskRanking: 'Medium',
    }
  });

  // Load data based on ID
  useEffect(() => {
    if (id) {
      console.log(`Loading RBI Assessment data for ID: ${id}`);
      // In a real app, fetch data from API here
      // For now we're using default values
    }
  }, [id]);

  const handleSubmitAll = async () => {
    setLoading(true);
    
    try {
      // Validate all forms
      const pofGeneralData = await pofGeneralForm.trigger();
      const damageFactorData = await damageFactorForm.trigger();
      const cofProdData = await cofProdForm.trigger();
      const cofAreaData = await cofAreaForm.trigger();
      const riskIRPData = await riskIRPForm.trigger();
      
      if (!pofGeneralData || !damageFactorData || !cofProdData || !cofAreaData || !riskIRPData) {
        throw new Error("Please fix validation errors before submitting");
      }
      
      const allData = {
        id,
        pofGeneral: pofGeneralForm.getValues(),
        damageFactor: damageFactorForm.getValues(),
        cofProd: cofProdForm.getValues(),
        cofArea: cofAreaForm.getValues(),
        riskIRP: riskIRPForm.getValues(),
      };
      
      // Simulate API call
      console.log('Submitting data:', allData);
      
      // Success message
      toast.success("RBI Assessment updated successfully");
      
      // Navigate back after successful submit
      navigate('/monitor/rbi-assessment');
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error(error instanceof Error ? error.message : "Failed to save assessment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          title="RBI Assessment Detail" 
          subtitle={`Assessment ID: ${id}`}
        />
        <Button variant="outline" onClick={() => navigate('/monitor/rbi-assessment')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to RBI Assessment List
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk-Based Inspection Assessment #{id}</CardTitle>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue="pof" value={mainTab} onValueChange={setMainTab}>
            <TabsList className="grid w-full md:w-[600px] grid-cols-3">
              <TabsTrigger value="pof">POF Assessment</TabsTrigger>
              <TabsTrigger value="cof">COF Assessment</TabsTrigger>
              <TabsTrigger value="risk">Risk & IRP</TabsTrigger>
            </TabsList>
            
            {/* POF Assessment Tab */}
            <TabsContent value="pof" className="pt-6 space-y-6">
              <Tabs value={pofSubTab} onValueChange={setPofSubTab}>
                <TabsList className="w-full md:w-[400px]">
                  <TabsTrigger value="general" className="flex-1">General</TabsTrigger>
                  <TabsTrigger value="damageFactor" className="flex-1">Damage Factor</TabsTrigger>
                </TabsList>
                
                {/* General Subtab */}
                <TabsContent value="general" className="pt-6">
                  <Form {...pofGeneralForm}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-4">
                        <FormField
                          control={pofGeneralForm.control}
                          name="asset"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Asset<span className="text-red-500 ml-1">*</span>
                              </FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={pofGeneralForm.control}
                          name="coatingQuality"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Coating Quality<span className="text-red-500 ml-1">*</span>
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Coating Quality" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {coatingQualityOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={pofGeneralForm.control}
                          name="dataConfidence"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Data Confidence<span className="text-red-500 ml-1">*</span>
                              </FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select Data Confidence" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {dataConfidenceOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={pofGeneralForm.control}
                          name="hasClading"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm font-medium">
                                  Cladding
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Right Column */}
                      <div className="space-y-4">
                        <FormField
                          control={pofGeneralForm.control}
                          name="nominalThickness"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Nominal Thickness (MM)
                              </FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={pofGeneralForm.control}
                          name="tMin"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                TMin
                              </FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={pofGeneralForm.control}
                          name="currentThickness"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Current Thickness (MM)
                              </FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <FormField
                        control={pofGeneralForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                {...field} 
                                rows={3}
                                className="resize-none"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Form>
                </TabsContent>
                
                {/* Damage Factor Subtab */}
                <TabsContent value="damageFactor" className="pt-6">
                  <Form {...damageFactorForm}>
                    <div className="space-y-6">
                      {/* DF THIN Section */}
                      <Accordion type="single" collapsible defaultValue="df-thin" className="w-full">
                        <AccordionItem value="df-thin">
                          <AccordionTrigger className="bg-gray-100 px-4 py-2 rounded-t-md font-medium">
                            DF THIN
                          </AccordionTrigger>
                          <AccordionContent className="border border-t-0 border-gray-200 rounded-b-md p-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <FormField
                                control={damageFactorForm.control}
                                name="lastInspectionDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Last Inspection Date</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="date" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="lastCoatingDate"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Last Coating Date</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="date" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="nthinA"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Nthin A</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="nthinB"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Nthin B</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="fsThin"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">FS Thin</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="srThin"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">SR Thin</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="dfthin1"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">DFthin1</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="dfthin2"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">DFthin2</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="creep"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Creep</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="pothin1"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Pothin1</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="agerc"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Agerc</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              
                              <FormField
                                control={damageFactorForm.control}
                                name="bhthin"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="text-sm font-medium">Bhthin</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" step="0.01" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      
                      {/* Other DF Sections */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* DF EXT */}
                        <Collapsible className="w-full">
                          <CollapsibleTrigger className="w-full bg-gray-100 px-4 py-2 rounded-t-md font-medium text-left">
                            DF EXT
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border border-t-0 border-gray-200 rounded-b-md p-4">
                            <FormField
                              control={damageFactorForm.control}
                              name="dfext"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">DF EXT Value</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CollapsibleContent>
                        </Collapsible>
                        
                        {/* DF EXT.CLSCC */}
                        <Collapsible className="w-full">
                          <CollapsibleTrigger className="w-full bg-gray-100 px-4 py-2 rounded-t-md font-medium text-left">
                            DF EXT.CLSCC
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border border-t-0 border-gray-200 rounded-b-md p-4">
                            <FormField
                              control={damageFactorForm.control}
                              name="dfextclscc"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">DF EXT.CLSCC Value</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CollapsibleContent>
                        </Collapsible>
                        
                        {/* DF MFAT */}
                        <Collapsible className="w-full">
                          <CollapsibleTrigger className="w-full bg-gray-100 px-4 py-2 rounded-t-md font-medium text-left">
                            DF MFAT
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border border-t-0 border-gray-200 rounded-b-md p-4">
                            <FormField
                              control={damageFactorForm.control}
                              name="dfmfat"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">DF MFAT Value</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CollapsibleContent>
                        </Collapsible>
                        
                        {/* DF CUI */}
                        <Collapsible className="w-full">
                          <CollapsibleTrigger className="w-full bg-gray-100 px-4 py-2 rounded-t-md font-medium text-left">
                            DF CUI
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border border-t-0 border-gray-200 rounded-b-md p-4">
                            <FormField
                              control={damageFactorForm.control}
                              name="dfcui"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">DF CUI Value</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CollapsibleContent>
                        </Collapsible>
                        
                        {/* DF SCC SSC */}
                        <Collapsible className="w-full">
                          <CollapsibleTrigger className="w-full bg-gray-100 px-4 py-2 rounded-t-md font-medium text-left">
                            DF SCC SSC
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border border-t-0 border-gray-200 rounded-b-md p-4">
                            <FormField
                              control={damageFactorForm.control}
                              name="dfsccSSC"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">DF SCC SSC Value</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CollapsibleContent>
                        </Collapsible>
                        
                        {/* DF SCC SOHIC */}
                        <Collapsible className="w-full">
                          <CollapsibleTrigger className="w-full bg-gray-100 px-4 py-2 rounded-t-md font-medium text-left">
                            DF SCC SOHIC
                          </CollapsibleTrigger>
                          <CollapsibleContent className="border border-t-0 border-gray-200 rounded-b-md p-4">
                            <FormField
                              control={damageFactorForm.control}
                              name="dfsccSOHIC"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">DF SCC SOHIC Value</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </CollapsibleContent>
                        </Collapsible>
                      </div>
                    </div>
                  </Form>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* COF Assessment Tab */}
            <TabsContent value="cof" className="pt-6 space-y-6">
              <Tabs value={cofSubTab} onValueChange={setCofSubTab}>
                <TabsList className="w-full md:w-[400px]">
                  <TabsTrigger value="cofProd" className="flex-1">COF PROD</TabsTrigger>
                  <TabsTrigger value="cofArea" className="flex-1">COF AREA</TabsTrigger>
                </TabsList>
                
                {/* COF PROD Subtab */}
                <TabsContent value="cofProd" className="pt-6">
                  <Form {...cofProdForm}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={cofProdForm.control}
                        name="fcommd"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Fcommd</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="fatta"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Fatta</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="outagehrs"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Outage hrs</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="1" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="outagemult"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Outage mult</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="lrapprod"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Lrapprod</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="fprodd"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Fprodd</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="popdens"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Pop density</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="injcost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Injury cost</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="facexp"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Facexp</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="volinv"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Vol inv</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="fc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">FC</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="ftotal"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Ftotal</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="envcost"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Env cost</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="fatality"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Fatality</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={cofProdForm.control}
                        name="evacuation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">Evacuation</FormLabel>
                            <FormControl>
                              <Input {...field} type="number" step="0.01" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </Form>
                </TabsContent>
                
                {/* COF AREA Subtab */}
                <TabsContent value="cofArea" className="pt-6">
                  <Form {...cofAreaForm}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Left Column - Dropdowns */}
                      <div className="space-y-4">
                        <FormField
                          control={cofAreaForm.control}
                          name="isoSys"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Iso System</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {systemOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="detSys"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Det System</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {systemOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="mitigationSystem"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Mitigation System</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {systemOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="releaseType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Release Type</FormLabel>
                              <Select
                                value={field.value}
                                onValueChange={field.onChange}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {releaseTypeOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="idealGasSpecificHeatEQ"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Ideal Gas Specific Heat EQ</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      {/* Right Column - Numeric Inputs */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={cofAreaForm.control}
                          name="pkkpa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Pk kpa</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="prtankkpa"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Prtank kpa</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="wtkg"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Wt kg</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="ratton"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Ratton</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="inventorykg"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Inventory kg</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="caCmdfail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Ca Cmdfail</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="caInjfail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Ca Injfail</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="caInjfatal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Ca Injfatal</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="caCmdfatal"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Ca Cmdfatal</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="k"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">K</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="timemstep"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Timemstep</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={cofAreaForm.control}
                          name="ldmax"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-sm font-medium">Ldmax</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" step="0.01" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </Form>
                </TabsContent>
              </Tabs>
            </TabsContent>
            
            {/* Risk & IRP Tab */}
            <TabsContent value="risk" className="pt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Risk & Incident Response Plan (IRP)</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...riskIRPForm}>
                    <div className="space-y-6">
                      {/* Damage Factors Section */}
                      <div className="border border-gray-200 rounded-md p-4">
                        <h3 className="font-medium text-md mb-4">Damage Factors</h3>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <FormField
                            control={riskIRPForm.control}
                            name="dfhta"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Dfhta</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={riskIRPForm.control}
                            name="dbrint"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Dbrint</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={riskIRPForm.control}
                            name="dfmat"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Dfmat</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={riskIRPForm.control}
                            name="dfextclsc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Dfextclsc</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={riskIRPForm.control}
                            name="dfcuiiff"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Dfcuiiff</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={riskIRPForm.control}
                            name="dmsccssc"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Dmsccssc</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={riskIRPForm.control}
                            name="dmfat"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">Dmfat</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={riskIRPForm.control}
                            name="dpSccSohic"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-sm font-medium">DP SCC SOHIC</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" step="0.01" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      
                      {/* Risk Assessment Section */}
                      <div className="border border-gray-200 rounded-md p-4">
                        <h3 className="font-medium text-md mb-4">Risk Assessment</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {/* Left Column */}
                          <div className="space-y-4">
                            <FormField
                              control={riskIRPForm.control}
                              name="cofFinancial"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">COF (Financial)</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={riskIRPForm.control}
                              name="cofArea"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">COF (Area)</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={riskIRPForm.control}
                              name="dfthin"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">DFthin</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          {/* Right Column */}
                          <div className="space-y-4">
                            <FormField
                              control={riskIRPForm.control}
                              name="pof"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">POF</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={riskIRPForm.control}
                              name="pofValue"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">POF Value</FormLabel>
                                  <FormControl>
                                    <Input {...field} type="number" step="0.01" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={riskIRPForm.control}
                              name="riskLevel"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-sm font-medium">Risk Level</FormLabel>
                                  <Select
                                    value={field.value}
                                    onValueChange={field.onChange}
                                  >
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select level" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {riskLevelOptions.map(option => (
                                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="flex justify-end space-x-2 mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate('/monitor/rbi-assessment')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              onClick={handleSubmitAll}
              disabled={loading}
              className="flex gap-2 items-center"
            >
              {loading ? 'Saving...' : (<><Save className="h-4 w-4" /> Save</>)}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RBIAssessmentDetailPage;
