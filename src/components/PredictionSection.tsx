
import React, { useState } from 'react';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';
import ResultCard from './ResultCard';
import { cn } from '@/lib/utils';

const cropTypes = [
  { label: "Tomato", value: "tomato" },
  { label: "Potato", value: "potato" },
  { label: "Corn", value: "corn" },
  { label: "Wheat", value: "wheat" },
  { label: "Rice", value: "rice" },
  { label: "Soybean", value: "soybean" },
  { label: "Cotton", value: "cotton" },
  { label: "Apple", value: "apple" },
];

const soilTypes = [
  { label: "Clay", value: "clay" },
  { label: "Sandy", value: "sandy" },
  { label: "Loamy", value: "loamy" },
  { label: "Silty", value: "silty" },
  { label: "Peaty", value: "peaty" },
  { label: "Chalky", value: "chalky" },
];

const PredictionSection = () => {
  const [formData, setFormData] = useState({
    cropType: "",
    soilType: "",
    temperature: "",
    humidity: "",
    rainfall: "",
    ph: "",
    notes: ""
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<null | Array<{
    name: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'none';
    confidence: number;
    recommendations: string[];
  }>>(null);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    if (!formData.cropType) {
      toast.error("Please select a crop type");
      return false;
    }
    if (!formData.soilType) {
      toast.error("Please select a soil type");
      return false;
    }
    return true;
  };
  
  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock results
      setResults([
        {
          name: "Blight Risk",
          description: "Based on current humidity levels and temperature, there's a moderate risk of blight developing in the next 7-14 days.",
          severity: 'medium',
          confidence: 78,
          recommendations: [
            "Apply preventative fungicide treatment within the next 5 days.",
            "Monitor leaf conditions daily for early signs of infection.",
            "Consider improving air circulation if plants are densely packed."
          ]
        },
        {
          name: "Nutrient Deficiency",
          description: "Soil pH and recent rainfall patterns suggest potential for nitrogen leaching and deficiency.",
          severity: 'low',
          confidence: 65,
          recommendations: [
            "Consider supplemental nitrogen application.",
            "Test soil with a comprehensive kit to confirm deficiency.",
            "Consider adjusting pH if consistently outside optimal range."
          ]
        }
      ]);
      
      setIsLoading(false);
      
      toast.success("Prediction complete", {
        description: "We've analyzed your crop conditions"
      });
    }, 2500);
  };
  
  const resetPrediction = () => {
    setFormData({
      cropType: "",
      soilType: "",
      temperature: "",
      humidity: "",
      rainfall: "",
      ph: "",
      notes: ""
    });
    setResults(null);
  };
  
  return (
    <section 
      id="prediction" 
      className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12 bg-sage-50/50 dark:bg-sage-950/30"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-center mb-12">
          <div className="text-center max-w-2xl">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <svg 
                className="h-3.5 w-3.5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Predictive Analysis
            </div>
            <h2 className="text-3xl font-medium mb-4">Crop Disease Prediction</h2>
            <p className="text-muted-foreground">
              Enter details about your crops and growing conditions to predict potential disease risks before they appear.
              Get proactive recommendations to protect your harvest.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-700/80">
              <h3 className="text-lg font-medium mb-4">Crop Details</h3>
              
              <form onSubmit={handlePredict} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cropType" className="block text-sm font-medium mb-1.5">
                      Crop Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="cropType"
                      name="cropType"
                      value={formData.cropType}
                      onChange={handleInputChange}
                      className="elegant-input w-full"
                      required
                    >
                      <option value="">Select crop type</option>
                      {cropTypes.map((crop) => (
                        <option key={crop.value} value={crop.value}>
                          {crop.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="soilType" className="block text-sm font-medium mb-1.5">
                      Soil Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="soilType"
                      name="soilType"
                      value={formData.soilType}
                      onChange={handleInputChange}
                      className="elegant-input w-full"
                      required
                    >
                      <option value="">Select soil type</option>
                      {soilTypes.map((soil) => (
                        <option key={soil.value} value={soil.value}>
                          {soil.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="temperature" className="block text-sm font-medium mb-1.5">
                      Temperature (°C)
                    </label>
                    <input
                      type="number"
                      id="temperature"
                      name="temperature"
                      placeholder="e.g. 25"
                      value={formData.temperature}
                      onChange={handleInputChange}
                      className="elegant-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="humidity" className="block text-sm font-medium mb-1.5">
                      Humidity (%)
                    </label>
                    <input
                      type="number"
                      id="humidity"
                      name="humidity"
                      placeholder="e.g. 65"
                      min="0"
                      max="100"
                      value={formData.humidity}
                      onChange={handleInputChange}
                      className="elegant-input w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="rainfall" className="block text-sm font-medium mb-1.5">
                      Rainfall (mm)
                    </label>
                    <input
                      type="number"
                      id="rainfall"
                      name="rainfall"
                      placeholder="e.g. 150"
                      value={formData.rainfall}
                      onChange={handleInputChange}
                      className="elegant-input w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="ph" className="block text-sm font-medium mb-1.5">
                      Soil pH
                    </label>
                    <input
                      type="number"
                      id="ph"
                      name="ph"
                      placeholder="e.g. 6.5"
                      min="0"
                      max="14"
                      step="0.1"
                      value={formData.ph}
                      onChange={handleInputChange}
                      className="elegant-input w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="notes" className="block text-sm font-medium mb-1.5">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder="Any additional information about your crop (optional)"
                    value={formData.notes}
                    onChange={handleInputChange}
                    className="elegant-input w-full"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    type="submit"
                    className={cn(
                      "premium-button flex-1",
                      isLoading ? "opacity-70 cursor-wait" : ""
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      "Predict Diseases"
                    )}
                  </button>
                  
                  {Object.values(formData).some(val => val !== "") && (
                    <button
                      type="button"
                      className="secondary-button"
                      onClick={resetPrediction}
                      disabled={isLoading}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </form>
              
              <div className="mt-5 px-4 py-3 rounded-lg bg-secondary/80 text-xs text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    More detailed information provides more accurate predictions. Fields marked with
                    <span className="text-red-500 mx-1">*</span>
                    are required.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-700/80">
              <h3 className="text-lg font-medium mb-4">Prediction Results</h3>
              
              {!results ? (
                <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
                  <svg 
                    className="h-16 w-16 mb-4 text-muted-foreground/60" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-lg font-medium mb-1">No predictions yet</p>
                  <p className="max-w-md">
                    Fill out the form and click "Predict Diseases" to get an analysis of potential risks based on your conditions.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((result, index) => (
                    <ResultCard
                      key={index}
                      title={result.name}
                      description={result.description}
                      severity={result.severity}
                      confidence={result.confidence}
                      recommendations={result.recommendations}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PredictionSection;
