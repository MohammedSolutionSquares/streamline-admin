import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Droplets, 
  Package, 
  Upload, 
  CheckCircle, 
  AlertCircle,
  Plus,
  Trash2,
  FileText,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabaseClient";

interface WaterJarSize {
  id: string;
  size: string;
  quantity: number;
}

interface CustomerDocument {
  id: string;
  name: string;
  file: File;
  uploadedAt: Date;
}

interface CompanyDetails {
  companyName: string;
  businessType: string;
  registrationNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  description: string;
}

interface OnboardingData {
  companyDetails: CompanyDetails;
  waterJarInventory: WaterJarSize[];
  customerDocuments: CustomerDocument[];
}

const WATER_JAR_SIZES = [
  { value: "5L", label: "5 Liters" },
  { value: "10L", label: "10 Liters" },
  { value: "15L", label: "15 Liters" },
  { value: "20L", label: "20 Liters" },
  { value: "25L", label: "25 Liters" },
  { value: "30L", label: "30 Liters" },
  { value: "40L", label: "40 Liters" },
  { value: "50L", label: "50 Liters" },
];

const BUSINESS_TYPES = [
  { value: "water_supplier", label: "Water Supplier" },
  { value: "water_distributor", label: "Water Distributor" },
  { value: "water_retailer", label: "Water Retailer" },
  { value: "water_service_provider", label: "Water Service Provider" },
  { value: "other", label: "Other" },
];

export function WaterSupplierOnboarding() {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: '',
    businessType: '',
    registrationNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
    email: '',
    website: '',
    description: '',
  });

  const [waterJarInventory, setWaterJarInventory] = useState<WaterJarSize[]>([
    { id: '1', size: '20L', quantity: 0 },
  ]);

  const [customerDocuments, setCustomerDocuments] = useState<CustomerDocument[]>([]);

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const handleCompanyDetailsChange = (field: keyof CompanyDetails, value: string) => {
    setCompanyDetails(prev => ({ ...prev, [field]: value }));
  };

  const addWaterJarSize = () => {
    const newId = (waterJarInventory.length + 1).toString();
    setWaterJarInventory(prev => [...prev, { id: newId, size: '20L', quantity: 0 }]);
  };

  const removeWaterJarSize = (id: string) => {
    if (waterJarInventory.length > 1) {
      setWaterJarInventory(prev => prev.filter(item => item.id !== id));
    }
  };

  const updateWaterJarSize = (id: string, field: 'size' | 'quantity', value: string | number) => {
    setWaterJarInventory(prev => 
      prev.map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const newDocument: CustomerDocument = {
          id: Date.now().toString(),
          name: file.name,
          file: file,
          uploadedAt: new Date(),
        };
        setCustomerDocuments(prev => [...prev, newDocument]);
      });
      toast({
        title: "Files uploaded successfully",
        description: `${files.length} customer document(s) uploaded.`,
      });
    }
  };

  const removeDocument = (id: string) => {
    setCustomerDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(companyDetails.companyName && companyDetails.businessType && 
                 companyDetails.address && companyDetails.city && 
                 companyDetails.phone && companyDetails.email);
      case 2:
        return waterJarInventory.some(item => item.quantity > 0);
      case 3:
        return customerDocuments.length > 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  // const nextStep = () => {
  //   if (validateStep(currentStep)) {
  //     setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  //   } else {
  //     toast({
  //       title: "Please complete all required fields",
  //       description: "All fields marked with * are required.",
  //       variant: "destructive",
  //     }); 
  //   }
  // };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Onboarding completed successfully!",
        description: "Your water supplier account has been set up and is ready for migration.",
      });
      
      // Here you would typically redirect or close the onboarding
      console.log('Onboarding data:', { companyDetails, waterJarInventory, customerDocuments });
    } catch (error) {
      toast({
        title: "Error during onboarding",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompanySubmit = async () => {
  try {
    const { data, error } = await supabase
      .from("companies")
      .insert([
        {
          company_name: companyDetails.companyName,
          business_type: companyDetails.businessType,
          registration_number: companyDetails.registrationNumber,
          address: companyDetails.address,
          city: companyDetails.city,
          state: companyDetails.state,
          zip_code: companyDetails.zipCode,
          phone: companyDetails.phone,  
          email: companyDetails.email,
          website: companyDetails.website,
          country: companyDetails.country,
          description: companyDetails.description,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      alert("❌ Could not save company: " + error.message);
      return;
    }

    console.log("✅ Company saved:", data);
    alert("Company onboarded successfully!");
  } catch (err) {
    console.error("Unexpected error:", err);
  }
};

const nextStep = async () => {
  if (currentStep === 1) {
    await handleCompanySubmit();  // save to Supabase
  }
  setCurrentStep(currentStep + 1);
};

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input
                  id="companyName"
                  value={companyDetails.companyName}
                  onChange={(e) => handleCompanyDetailsChange('companyName', e.target.value)}
                  placeholder="Enter your company name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Select 
                  value={companyDetails.businessType} 
                  onValueChange={(value) => handleCompanyDetailsChange('businessType', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    {BUSINESS_TYPES.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={companyDetails.registrationNumber}
                onChange={(e) => handleCompanyDetailsChange('registrationNumber', e.target.value)}
                placeholder="Enter business registration number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Business Address *</Label>
              <Textarea
                id="address"
                value={companyDetails.address}
                onChange={(e) => handleCompanyDetailsChange('address', e.target.value)}
                placeholder="Enter your business address"
                rows={3}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={companyDetails.city}
                  onChange={(e) => handleCompanyDetailsChange('city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={companyDetails.state}
                  onChange={(e) => handleCompanyDetailsChange('state', e.target.value)}
                  placeholder="Enter state"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipCode">ZIP Code</Label>
                <Input
                  id="zipCode"
                  value={companyDetails.zipCode}
                  onChange={(e) => handleCompanyDetailsChange('zipCode', e.target.value)}
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  value={companyDetails.phone}
                  onChange={(e) => handleCompanyDetailsChange('phone', e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={companyDetails.email}
                  onChange={(e) => handleCompanyDetailsChange('email', e.target.value)}
                  placeholder="Enter email address"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={companyDetails.website}
                  onChange={(e) => handleCompanyDetailsChange('website', e.target.value)}
                  placeholder="Enter website URL"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  value={companyDetails.country}
                  onChange={(e) => handleCompanyDetailsChange('country', e.target.value)}
                  placeholder="Enter country"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Company Description</Label>
              <Textarea
                id="description"
                value={companyDetails.description}
                onChange={(e) => handleCompanyDetailsChange('description', e.target.value)}
                placeholder="Brief description of your water business"
                rows={4}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Alert>
              <Droplets className="h-4 w-4" />
              <AlertDescription>
                Please specify the water jar sizes and quantities you have in your inventory.
                This information will help us optimize your delivery operations.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {waterJarInventory.map((jar, index) => (
                <Card key={jar.id} className="p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-medium">Water Jar #{index + 1}</h4>
                    {waterJarInventory.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeWaterJarSize(jar.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Jar Size</Label>
                      <Select 
                        value={jar.size} 
                        onValueChange={(value) => updateWaterJarSize(jar.id, 'size', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {WATER_JAR_SIZES.map(size => (
                            <SelectItem key={size.value} value={size.value}>
                              {size.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Quantity Available</Label>
                      <Input
                        type="number"
                        min="0"
                        value={jar.quantity}
                        onChange={(e) => updateWaterJarSize(jar.id, 'quantity', parseInt(e.target.value) || 0)}
                        placeholder="Enter quantity"
                      />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Button 
              variant="outline" 
              onClick={addWaterJarSize}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Another Jar Size
            </Button>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Inventory Summary</h4>
              <div className="space-y-2">
                {waterJarInventory.map(jar => (
                  <div key={jar.id} className="flex justify-between text-sm">
                    <span>{jar.size} jars:</span>
                    <span className="font-medium">{jar.quantity} units</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between font-medium">
                  <span>Total jars:</span>
                  <span>{waterJarInventory.reduce((sum, jar) => sum + jar.quantity, 0)} units</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription>
                Upload your customer documents including customer details (address, name, phone number).
                Supported formats: PDF, DOC, DOCX, XLS, XLSX
              </AlertDescription>
            </Alert>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Upload Customer Documents</h3>
                <p className="text-gray-500">
                  Drag and drop files here, or click to select files
                </p>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button asChild>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    Choose Files
                  </label>
                </Button>
              </div>
            </div>

            {customerDocuments.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Uploaded Documents</h4>
                <div className="space-y-2">
                  {customerDocuments.map(doc => (
                    <div key={doc.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Uploaded {doc.uploadedAt.toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeDocument(doc.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Please review all the information before completing your onboarding.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              {/* Company Details Review */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Company Name</Label>
                      <p className="font-medium">{companyDetails.companyName}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Business Type</Label>
                      <p className="font-medium">
                        {BUSINESS_TYPES.find(t => t.value === companyDetails.businessType)?.label}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">Address</Label>
                    <p className="font-medium">{companyDetails.address}</p>
                    <p className="text-sm text-gray-600">
                      {companyDetails.city}, {companyDetails.state} {companyDetails.zipCode}
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Phone</Label>
                      <p className="font-medium">{companyDetails.phone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-500">Email</Label>
                      <p className="font-medium">{companyDetails.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Water Jar Inventory Review */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Water Jar Inventory
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {waterJarInventory.map(jar => (
                      <div key={jar.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">{jar.size} jars</span>
                        <Badge variant="outline">{jar.quantity} units</Badge>
                      </div>
                    ))}
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Inventory:</span>
                      <span>{waterJarInventory.reduce((sum, jar) => sum + jar.quantity, 0)} units</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Customer Documents Review */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Customer Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {customerDocuments.map(doc => (
                      <div key={doc.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                        <FileText className="h-4 w-4 text-blue-600" />
                        <span className="font-medium">{doc.name}</span>
                        <Badge variant="outline" className="ml-auto">
                          {doc.file.type || 'Document'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return "Company Information";
      case 2: return "Water Jar Inventory";
      case 3: return "Customer Documents";
      case 4: return "Review & Complete";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case 1: return "Tell us about your water supply company";
      case 2: return "Specify your water jar inventory";
      case 3: return "Upload your customer documents";
      case 4: return "Review all information before completing";
      default: return "";
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-[#1B3C53]">Water Supplier Onboarding</h1>
        <p className="text-gray-600">
          Complete your setup to start managing your water delivery operations
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Navigation */}
      <div className="flex justify-center space-x-2">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i + 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              i + 1 <= currentStep
                ? 'bg-[#1B3C53] text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {i + 1}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{getStepTitle()}</CardTitle>
          <CardDescription>{getStepDescription()}</CardDescription>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep < totalSteps ? (
          <Button onClick={nextStep} className="bg-[#1B3C53] hover:bg-[#1B3C53]/90">
            Next Step
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-[#1B3C53] hover:bg-[#1B3C53]/90"
          >
            {isSubmitting ? "Completing..." : "Complete Onboarding"}
          </Button>
        )}
      </div>
    </div>
  );
}
