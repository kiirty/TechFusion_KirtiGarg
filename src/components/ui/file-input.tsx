
import React, { useState, useRef, ChangeEvent } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileInputProps {
  onChange: (file: File | null) => void;
  value: File | null;
  accept?: string;
  className?: string;
}

const FileInput = ({ onChange, value, accept = "image/*", className }: FileInputProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
    
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      onChange(file);
      
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const removeFile = () => {
    onChange(null);
    setPreview(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };
  
  return (
    <div className={cn("relative", className)}>
      {!preview ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-xl p-8 transition-all duration-200 flex flex-col items-center justify-center text-center",
            dragActive 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-secondary/50",
            className
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="mb-4 p-3 rounded-full bg-secondary text-primary">
            <Upload className="h-6 w-6" />
          </div>
          
          <p className="text-lg font-medium mb-1">Drag and drop your image here</p>
          <p className="text-sm text-muted-foreground mb-4">or click to browse files</p>
          
          <div className="text-xs text-muted-foreground">
            <span>Supports JPG, PNG, WEBP</span>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-xl animate-scale-in">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-auto object-cover rounded-xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center">
              <div className="flex items-center">
                <Image className="h-4 w-4 text-white mr-2" />
                <span className="text-white text-sm truncate max-w-[200px]">
                  {value?.name}
                </span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
                className="p-1.5 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileInput;
