
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Upload, AlertCircle } from 'lucide-react';
import FileInput from './ui/file-input';
import ResultCard from './ResultCard';
import { cn } from '@/lib/utils';

const DetectionSection = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<null | Array<{
    name: string;
    description: string;
    severity: 'low' | 'medium' | 'high' | 'none';
    confidence: number;
    recommendations: string[];
  }>>(null);
  
  const handleUpload = () => {
    if (!file) {
      toast.error("Please select an image first", {
        description: "Upload an image of your crop to detect diseases"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock results
      setResults([
        {
          name: "Powdery Mildew",
          description: "A fungal disease that affects a wide range of plants, appearing as a white powdery substance on leaf surfaces.",
          severity: 'medium',
          confidence: 87,
          recommendations: [
            "Apply fungicides with active ingredients like sulfur or potassium bicarbonate.",
            "Improve air circulation around plants by proper spacing.",
            "Avoid overhead watering to reduce humidity around leaves."
          ]
        },
        {
          name: "Early Blight",
          description: "A fungal disease that causes brown spots with concentric rings that may appear on lower leaves first.",
          severity: 'low',
          confidence: 68,
          recommendations: [
            "Remove and destroy infected plant parts.",
            "Apply appropriate fungicide as a preventative measure.",
            "Use mulch to prevent spores from splashing onto leaves."
          ]
        }
      ]);
      
      setIsLoading(false);
      
      toast.success("Analysis complete", {
        description: "We've analyzed your crop image"
      });
    }, 2500);
  };
  
  const resetDetection = () => {
    setFile(null);
    setResults(null);
  };
  
  return (
    <section 
      id="detection" 
      className="min-h-screen flex flex-col justify-center py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex justify-center mb-12">
          <div className="text-center max-w-2xl">
            <div className="inline-flex items-center justify-center px-4 py-1.5 mb-4 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Upload className="h-3.5 w-3.5 mr-2" />
              Visual Detection
            </div>
            <h2 className="text-3xl font-medium mb-4">Crop Disease Detection</h2>
            <p className="text-muted-foreground">
              Upload an image of your crop for instant disease detection powered by our advanced AI. 
              Get detailed analysis and treatment recommendations.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-700/80">
              <h3 className="text-lg font-medium mb-4">Image Upload</h3>
              
              <FileInput 
                value={file} 
                onChange={setFile} 
                className="mb-6"
              />
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className={cn(
                    "premium-button flex-1",
                    isLoading ? "opacity-70 cursor-wait" : ""
                  )}
                  onClick={handleUpload}
                  disabled={isLoading || !file}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing...
                    </>
                  ) : (
                    "Detect Diseases"
                  )}
                </button>
                
                {file && (
                  <button
                    className="secondary-button"
                    onClick={resetDetection}
                    disabled={isLoading}
                  >
                    Reset
                  </button>
                )}
              </div>
              
              <div className="mt-5 px-4 py-3 rounded-lg bg-secondary/80 text-xs text-muted-foreground">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div>
                    For best results, ensure the image is clear, well-lit, and focuses directly on the affected 
                    parts of the plant. Close-up shots of leaves, stems, or fruits work best.
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm rounded-xl p-6 shadow-soft border border-slate-200/80 dark:border-slate-700/80">
              <h3 className="text-lg font-medium mb-4">Detection Results</h3>
              
              {!results ? (
                <div className="flex flex-col items-center justify-center text-center py-16 text-muted-foreground">
                  <svg 
                    className="h-16 w-16 mb-4 text-muted-foreground/60" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor" 
                    strokeWidth={1}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-lg font-medium mb-1">No results yet</p>
                  <p className="max-w-md">
                    Upload an image and click "Detect Diseases" to get an analysis of potential crop issues.
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

export default DetectionSection;
