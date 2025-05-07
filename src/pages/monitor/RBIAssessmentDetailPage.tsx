import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from '@/components/ui/tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Form } from '@/components/ui/form';

// Sample data for the RBI assessment
const initialRbiData = [
  { 
    id: '1',
    rbiId: 'RBI-001',
    asset: 'PV-1001',
    likelihood: 'Medium',
    consequence: 'High',
    riskRank: 'High',
    nextAssessmentDate: '2025-09-15',
    status: 'Active',
    // POF Assessment - General
    coatingQuality: 'Good',
    dataConfidence: 'Medium',
    cladding: 'Yes',
    nominalThickness: 12.5,
    tMin: 6.0,
    currentThickness: 10.8,
    description: 'Pressure vessel used for separation of liquid and gas phases.',
    // POF Assessment - Damage Factors
    lastInspectionDate: '2025-03-10',
    lastCoatingDate: '2024-11-15',
    nthinA: 0.85,
    nthinB: 0.92,
    fsThin: 1.2,
    srThin: 0.95,
    dfThin1: 1.5,
    dfThin2: 1.8,
    creep: 0.3,
    pothin1: 1.1,
    agerc: 5.2,
    bhthin: 0.78,
    // COF Assessment - COF PROD
    fcommd: 0.65,
    fatta: 0.45,
    outagehrs: 48,
    outagemult: 1.2,
    lrapprod: 0.85,
    fprodd: 0.95,
    popdens: 'Medium',
    injcost: 150000,
    facexp: 0.75,
    volinv: 2500,
    fc: 1.25,
    ftotal: 3.5,
    envcost: 500000,
    fatality: 0.01,
    evacuation: 'Required',
    // COF Assessment - COF AREA
    isoSys: 'Automatic',
    detSys: 'Gas Detector',
    mitigationSystem: 'Sprinkler',
    idealGasSpecificHeatEQ: 'Option B',
    pkKpa: 450,
    prtankKpa: 350,
    wtKg: 15000,
    releaseType: 'Gas',
    ratton: 2.5,
    inventoryKg: 5000,
    caCmdfail: 0.65,
    caInjfail: 0.32,
    caInjfatal: 0.08,
    caCmdfatal: 0.05,
    kValue: 1.2,
    timemstep: 600,
    ldmax: 150,
    // Risk & IRP
    dfhta: 1.8,
    dbrint: 1.2,
    dfmat: 1.5,
    dfextclsc: 1.3,
    dfcuiiff: 1.1,
    dmsccssc: 1.4,
    dmfat: 1.6,
    dpSccSohic: 1.3,
    cofFinancial: 3500000,
    cofArea: 'High',
    dfthin: 1.7,
    pof: 'Medium',
    pofValue: 0.25,
    riskLevel: 'High',
    riskRanking: '4B'
  },
  { 
    id: '2',
    rbiId: 'RBI-002',
    asset: 'PP-2003',
    likelihood: 'Low',
    consequence: 'Medium',
    riskRank: 'Medium',
    nextAssessmentDate: '2025-10-22',
    status: 'Active',
    // Other fields with default values...
    coatingQuality: 'Excellent',
    dataConfidence: 'High',
    cladding: 'No',
    nominalThickness: 8.2,
    tMin: 4.1,
    currentThickness: 7.9,
    description: 'Pipeline section transporting processed fluid to storage.',
    // POF factors would continue here...
    lastInspectionDate: '2025-02-15',
    lastCoatingDate: '2024-10-20',
    // ... and so on for all other fields
  }
];

const RBIAssessmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState<string>('pof');
  const [pofSubtab, setPofSubtab] = useState<string>('general');
  const [cofSubtab, setCofSubtab] = useState<string>('cof-prod');
  
  const [formData, setFormData] = useState<any>(null);
  const [lastInspectionDate, setLastInspectionDate] = useState<Date | undefined>(undefined);
  const [lastCoatingDate, setLastCoatingDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (id) {
      const assessment = initialRbiData.find(item => item.id === id);
      if (assessment) {
        setFormData(assessment);
        
        // Convert string dates to Date objects
        if (assessment.lastInspectionDate) {
          setLastInspectionDate(new Date(assessment.lastInspectionDate));
        }
        if (assessment.lastCoatingDate) {
          setLastCoatingDate(new Date(assessment.lastCoatingDate));
        }
      }
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log('Saving assessment data:', formData);
    // In a real application, you would save the data to your backend
    navigate('/monitor/rbi-assessment');
  };

  if (!formData) {
    return <div className="p-6">Loading assessment data...</div>;
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">RBI Assessment: {formData.rbiId}</h1>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate('/monitor/rbi-assessment')}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Assessment</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <Tabs value={mainTab} onValueChange={setMainTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="pof">POF Assessment</TabsTrigger>
              <TabsTrigger value="cof">COF Assessment</TabsTrigger>
              <TabsTrigger value="risk">Risk & IRP</TabsTrigger>
            </TabsList>

            {/* POF Assessment Tab */}
            <TabsContent value="pof" className="space-y-6">
              <Tabs value={pofSubtab} onValueChange={setPofSubtab}>
                <TabsList>
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="damage-factor">Damage Factor</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="pt-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="asset">Asset</Label>
                      <Input
                        id="asset"
                        name="asset"
                        value={formData.asset}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="coatingQuality">Coating Quality</Label>
                      <select
                        id="coatingQuality"
                        name="coatingQuality"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.coatingQuality}
                        onChange={handleInputChange}
                      >
                        <option value="Poor">Poor</option>
                        <option value="Fair">Fair</option>
                        <option value="Good">Good</option>
                        <option value="Excellent">Excellent</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dataConfidence">Data Confidence</Label>
                      <select
                        id="dataConfidence"
                        name="dataConfidence"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.dataConfidence}
                        onChange={handleInputChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="cladding">Cladding</Label>
                      <select
                        id="cladding"
                        name="cladding"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.cladding}
                        onChange={handleInputChange}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nominalThickness">Nominal Thickness (MM)</Label>
                      <Input
                        id="nominalThickness"
                        name="nominalThickness"
                        type="number"
                        step="0.1"
                        value={formData.nominalThickness}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tMin">TMin</Label>
                      <Input
                        id="tMin"
                        name="tMin"
                        type="number"
                        step="0.1"
                        value={formData.tMin}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentThickness">Current Thickness (MM)</Label>
                      <Input
                        id="currentThickness"
                        name="currentThickness"
                        type="number"
                        step="0.1"
                        value={formData.currentThickness}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="resize-none"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="damage-factor" className="pt-4 space-y-6">
                  <Accordion type="multiple" className="w-full">
                    <AccordionItem value="df-thin">
                      <AccordionTrigger className="font-medium text-lg">DF THIN</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="lastInspectionDate">Last Inspection Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !lastInspectionDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {lastInspectionDate ? format(lastInspectionDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={lastInspectionDate}
                                  onSelect={setLastInspectionDate}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="lastCoatingDate">Last Coating Date</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !lastCoatingDate && "text-muted-foreground"
                                  )}
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {lastCoatingDate ? format(lastCoatingDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={lastCoatingDate}
                                  onSelect={setLastCoatingDate}
                                  initialFocus
                                  className="p-3 pointer-events-auto"
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="nthinA">Nthin A</Label>
                            <Input
                              id="nthinA"
                              name="nthinA"
                              type="number"
                              step="0.01"
                              value={formData.nthinA}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="nthinB">Nthin B</Label>
                            <Input
                              id="nthinB"
                              name="nthinB"
                              type="number"
                              step="0.01"
                              value={formData.nthinB}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="fsThin">FS Thin</Label>
                            <Input
                              id="fsThin"
                              name="fsThin"
                              type="number"
                              step="0.1"
                              value={formData.fsThin}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="srThin">SR Thin</Label>
                            <Input
                              id="srThin"
                              name="srThin"
                              type="number"
                              step="0.01"
                              value={formData.srThin}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dfThin1">DFthin1</Label>
                            <Input
                              id="dfThin1"
                              name="dfThin1"
                              type="number"
                              step="0.1"
                              value={formData.dfThin1}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="dfThin2">DFthin2</Label>
                            <Input
                              id="dfThin2"
                              name="dfThin2"
                              type="number"
                              step="0.1"
                              value={formData.dfThin2}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="creep">Creep</Label>
                            <Input
                              id="creep"
                              name="creep"
                              type="number"
                              step="0.01"
                              value={formData.creep}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="pothin1">Pothin1</Label>
                            <Input
                              id="pothin1"
                              name="pothin1"
                              type="number"
                              step="0.1"
                              value={formData.pothin1}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="agerc">Agerc</Label>
                            <Input
                              id="agerc"
                              name="agerc"
                              type="number"
                              step="0.1"
                              value={formData.agerc}
                              onChange={handleInputChange}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="bhthin">Bhthin</Label>
                            <Input
                              id="bhthin"
                              name="bhthin"
                              type="number"
                              step="0.01"
                              value={formData.bhthin}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="df-ext">
                      <AccordionTrigger className="font-medium text-lg">DF EXT</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* DF EXT fields would go here, similar to DF THIN */}
                          <div className="text-center col-span-3 text-gray-500 italic">
                            Additional damage factor fields for external corrosion
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="df-ext-clscc">
                      <AccordionTrigger className="font-medium text-lg">DF EXT.CLSCC</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* DF EXT.CLSCC fields would go here */}
                          <div className="text-center col-span-3 text-gray-500 italic">
                            Additional damage factor fields for external chloride stress corrosion cracking
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="df-mfat">
                      <AccordionTrigger className="font-medium text-lg">DF MFAT</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* DF MFAT fields would go here */}
                          <div className="text-center col-span-3 text-gray-500 italic">
                            Additional damage factor fields for mechanical fatigue
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="df-cui">
                      <AccordionTrigger className="font-medium text-lg">DF CUI</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* DF CUI fields would go here */}
                          <div className="text-center col-span-3 text-gray-500 italic">
                            Additional damage factor fields for corrosion under insulation
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="df-scc-ssc">
                      <AccordionTrigger className="font-medium text-lg">DF SCC SSC</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* DF SCC SSC fields would go here */}
                          <div className="text-center col-span-3 text-gray-500 italic">
                            Additional damage factor fields for stress corrosion cracking / sulfide stress cracking
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="df-scc-sohic">
                      <AccordionTrigger className="font-medium text-lg">DF SCC SOHIC</AccordionTrigger>
                      <AccordionContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* DF SCC SOHIC fields would go here */}
                          <div className="text-center col-span-3 text-gray-500 italic">
                            Additional damage factor fields for stress oriented hydrogen induced cracking
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* COF Assessment Tab */}
            <TabsContent value="cof" className="space-y-6">
              <Tabs value={cofSubtab} onValueChange={setCofSubtab}>
                <TabsList>
                  <TabsTrigger value="cof-prod">COF PROD</TabsTrigger>
                  <TabsTrigger value="cof-area">COF AREA</TabsTrigger>
                </TabsList>
                
                <TabsContent value="cof-prod" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fcommd">Fcommd</Label>
                      <Input
                        id="fcommd"
                        name="fcommd"
                        type="number"
                        step="0.01"
                        value={formData.fcommd}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fatta">Fatta</Label>
                      <Input
                        id="fatta"
                        name="fatta"
                        type="number"
                        step="0.01"
                        value={formData.fatta}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="outagehrs">Outagehrs</Label>
                      <Input
                        id="outagehrs"
                        name="outagehrs"
                        type="number"
                        value={formData.outagehrs}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="outagemult">Outagemult</Label>
                      <Input
                        id="outagemult"
                        name="outagemult"
                        type="number"
                        step="0.1"
                        value={formData.outagemult}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="lrapprod">Lrapprod</Label>
                      <Input
                        id="lrapprod"
                        name="lrapprod"
                        type="number"
                        step="0.01"
                        value={formData.lrapprod}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fprodd">Fprodd</Label>
                      <Input
                        id="fprodd"
                        name="fprodd"
                        type="number"
                        step="0.01"
                        value={formData.fprodd}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="popdens">Popdens</Label>
                      <select
                        id="popdens"
                        name="popdens"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.popdens}
                        onChange={handleInputChange}
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="injcost">Injcost</Label>
                      <Input
                        id="injcost"
                        name="injcost"
                        type="number"
                        value={formData.injcost}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="facexp">Facexp</Label>
                      <Input
                        id="facexp"
                        name="facexp"
                        type="number"
                        step="0.01"
                        value={formData.facexp}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="volinv">Volinv</Label>
                      <Input
                        id="volinv"
                        name="volinv"
                        type="number"
                        value={formData.volinv}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fc">FC</Label>
                      <Input
                        id="fc"
                        name="fc"
                        type="number"
                        step="0.01"
                        value={formData.fc}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ftotal">Ftotal</Label>
                      <Input
                        id="ftotal"
                        name="ftotal"
                        type="number"
                        step="0.1"
                        value={formData.ftotal}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="envcost">Envcost</Label>
                      <Input
                        id="envcost"
                        name="envcost"
                        type="number"
                        value={formData.envcost}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="fatality">Fatality</Label>
                      <Input
                        id="fatality"
                        name="fatality"
                        type="number"
                        step="0.01"
                        value={formData.fatality}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="evacuation">Evacuation</Label>
                      <select
                        id="evacuation"
                        name="evacuation"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.evacuation}
                        onChange={handleInputChange}
                      >
                        <option value="Not Required">Not Required</option>
                        <option value="Required">Required</option>
                      </select>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="cof-area" className="pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="isoSys">Iso Sys</Label>
                      <select
                        id="isoSys"
                        name="isoSys"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.isoSys}
                        onChange={handleInputChange}
                      >
                        <option value="Manual">Manual</option>
                        <option value="Automatic">Automatic</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="detSys">Det Sys</Label>
                      <select
                        id="detSys"
                        name="detSys"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.detSys}
                        onChange={handleInputChange}
                      >
                        <option value="Gas Detector">Gas Detector</option>
                        <option value="Fire Detector">Fire Detector</option>
                        <option value="Both">Both</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="mitigationSystem">Mitigation System</Label>
                      <select
                        id="mitigationSystem"
                        name="mitigationSystem"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.mitigationSystem}
                        onChange={handleInputChange}
                      >
                        <option value="Sprinkler">Sprinkler</option>
                        <option value="Foam">Foam</option>
                        <option value="Water Curtain">Water Curtain</option>
                        <option value="None">None</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="idealGasSpecificHeatEQ">Ideal Gas Specific Heat EQ</Label>
                      <select
                        id="idealGasSpecificHeatEQ"
                        name="idealGasSpecificHeatEQ"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.idealGasSpecificHeatEQ}
                        onChange={handleInputChange}
                      >
                        <option value="Option A">Option A</option>
                        <option value="Option B">Option B</option>
                        <option value="Option C">Option C</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="pkKpa">Pk kpa</Label>
                      <Input
                        id="pkKpa"
                        name="pkKpa"
                        type="number"
                        value={formData.pkKpa}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prtankKpa">Prtank kpa</Label>
                      <Input
                        id="prtankKpa"
                        name="prtankKpa"
                        type="number"
                        value={formData.prtankKpa}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="wtKg">Wt kg</Label>
                      <Input
                        id="wtKg"
                        name="wtKg"
                        type="number"
                        value={formData.wtKg}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="releaseType">Release Type</Label>
                      <select
                        id="releaseType"
                        name="releaseType"
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        value={formData.releaseType}
                        onChange={handleInputChange}
                      >
                        <option value="Gas">Gas</option>
                        <option value="Liquid">Liquid</option>
                        <option value="Two-Phase">Two-Phase</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ratton">Ratton</Label>
                      <Input
                        id="ratton"
                        name="ratton"
                        type="number"
                        step="0.1"
                        value={formData.ratton}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="inventoryKg">Inventory kg</Label>
                      <Input
                        id="inventoryKg"
                        name="inventoryKg"
                        type="number"
                        value={formData.inventoryKg}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caCmdfail">Ca Cmdfail</Label>
                      <Input
                        id="caCmdfail"
                        name="caCmdfail"
                        type="number"
                        step="0.01"
                        value={formData.caCmdfail}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caInjfail">Ca Injfail</Label>
                      <Input
                        id="caInjfail"
                        name="caInjfail"
                        type="number"
                        step="0.01"
                        value={formData.caInjfail}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caInjfatal">Ca Injfatal</Label>
                      <Input
                        id="caInjfatal"
                        name="caInjfatal"
                        type="number"
                        step="0.01"
                        value={formData.caInjfatal}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="caCmdfatal">Ca Cmdfatal</Label>
                      <Input
                        id="caCmdfatal"
                        name="caCmdfatal"
                        type="number"
                        step="0.01"
                        value={formData.caCmdfatal}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="kValue">K</Label>
                      <Input
                        id="kValue"
                        name="kValue"
                        type="number"
                        step="0.1"
                        value={formData.kValue}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timemstep">Timemstep</Label>
                      <Input
                        id="timemstep"
                        name="timemstep"
                        type="number"
                        value={formData.timemstep}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ldmax">Ldmax</Label>
                      <Input
                        id="ldmax"
                        name="ldmax"
                        type="number"
                        value={formData.ldmax}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </TabsContent>

            {/* Risk & IRP Tab */}
            <TabsContent value="risk" className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h3 className="font-medium text-lg mb-4">Risk & Incident Response Plan (IRP)</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dfhta">Dfhta</Label>
                    <Input
                      id="dfhta"
                      name="dfhta"
                      type="number"
                      step="0.1"
                      value={formData.dfhta}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dbrint">Dbrint</Label>
                    <Input
                      id="dbrint"
                      name="dbrint"
                      type="number"
                      step="0.1"
                      value={formData.dbrint}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dfmat">Dfmat</Label>
                    <Input
                      id="dfmat"
                      name="dfmat"
                      type="number"
                      step="0.1"
                      value={formData.dfmat}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dfextclsc">Dfextclsc</Label>
                    <Input
                      id="dfextclsc"
                      name="dfextclsc"
                      type="number"
                      step="0.1"
                      value={formData.dfextclsc}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dfcuiiff">Dfcuiiff</Label>
                    <Input
                      id="dfcuiiff"
                      name="dfcuiiff"
                      type="number"
                      step="0.1"
                      value={formData.dfcuiiff}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dmsccssc">Dmsccssc</Label>
                    <Input
                      id="dmsccssc"
                      name="dmsccssc"
                      type="number"
                      step="0.1"
                      value={formData.dmsccssc}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dmfat">Dmfat</Label>
                    <Input
                      id="dmfat"
                      name="dmfat"
                      type="number"
                      step="0.1"
                      value={formData.dmfat}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dpSccSohic">DP SCC SOHIC</Label>
                    <Input
                      id="dpSccSohic"
                      name="dpSccSohic"
                      type="number"
                      step="0.1"
                      value={formData.dpSccSohic}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4 pt-4"></div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cofFinancial">Cof (Financial)</Label>
                    <Input
                      id="cofFinancial"
                      name="cofFinancial"
                      type="number"
                      value={formData.cofFinancial}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cofArea">Cof (Area)</Label>
                    <select
                      id="cofArea"
                      name="cofArea"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.cofArea}
                      onChange={handleInputChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dfthin">Dfthin</Label>
                    <Input
                      id="dfthin"
                      name="dfthin"
                      type="number"
                      step="0.1"
                      value={formData.dfthin}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pof">PoF</Label>
                    <select
                      id="pof"
                      name="pof"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.pof}
                      onChange={handleInputChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pofValue">PoF Value</Label>
                    <Input
                      id="pofValue"
                      name="pofValue"
                      type="number"
                      step="0.01"
                      value={formData.pofValue}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="riskLevel">Risk Level</Label>
                    <select
                      id="riskLevel"
                      name="riskLevel"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={formData.riskLevel}
                      onChange={handleInputChange}
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="riskRanking">Risk Ranking</Label>
                    <Input
                      id="riskRanking"
                      name="riskRanking"
                      value={formData.riskRanking}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={() => navigate('/monitor/rbi-assessment')}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save Assessment</Button>
      </div>
    </div>
  );
};

export default RBIAssessmentDetailPage;
