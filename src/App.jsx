import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Camera } from 'lucide-react';
import './App.css';

// Theme configurations
const themes = [
  {
    name: 'Classic',
    primary: '#3b82f6',
    secondary: '#f3f4f6',
    accent: '#111827',
    background: '#ffffff',
    text: '#1f2937'
  },
  {
    name: 'Dark Mode',
    primary: '#8b5cf6',
    secondary: '#1f2937',
    accent: '#f3f4f6',
    background: '#111827',
    text: '#f9fafb'
  },
  {
    name: 'Vibrant',
    primary: '#ec4899',
    secondary: '#fdf2f8',
    accent: '#6d28d9',
    background: '#fffbeb',
    text: '#4c1d95'
  }
];

function App() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const [shirtColor, setShirtColor] = useState('#FFFFFF');
  const [previewImage, setPreviewImage] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Available t-shirt colors
  const colors = [
    '#FFFFFF', '#000000', '#FF0000', '#0000FF', 
    '#FFFF00', '#00FF00', '#FFA500', '#800080'
  ];
  
  // Build options
  const buildOptions = ['lean', 'regular', 'athletic', 'big'];
  
  const theme = themes[currentTheme];
  
  const { control, register, watch, setValue } = useForm({
    defaultValues: {
      height: 180,
      weight: 80,
      build: 'athletic',
      shirtText: ''
    }
  });
  
  const formValues = watch();
  
  // Theme keyboard shortcut handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && e.key === 'q') {
        setCurrentTheme((prev) => (prev + 1) % themes.length);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  // Handle file drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };
  
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };
  
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };
  
  const handleFiles = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="app-container" style={{ 
      backgroundColor: theme.background,
      color: theme.text
    }}>
      <main className="customizer">
        {/* Add website name here */}
        <div className="website-name">T-Shirt Designer</div>
        
        <h1 style={{ color: theme.primary }}>POD T-Shirt Customizer</h1>
        <div className="theme-indicator">
          Current Theme: <span style={{ color: theme.primary }}>{theme.name}</span> 
          <span className="hint">(Press Alt+Q to switch themes)</span>
        </div>
        
        <div className="customizer-layout">
          {/* Preview Section */}
          <div className="preview-section">
           <div 
  className="tshirt-preview"   
  style={{ backgroundColor: theme.secondary }} 
>   
  {/* Box container - larger size */}   
  <div className="box-container" style={{      
    border: '4px solid #888',      
    borderRadius: '12px',     
    padding: '40px',     
    backgroundColor: '#f0f0f0',     
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',     
    display: 'flex',     
    justifyContent: 'center',     
    alignItems: 'center',     
    width: 'auto'   
  }}>     
    {/* T-shirt inside the box - larger SVG */}     
    <div className="tshirt-mockup" style={{ position: 'relative' }}>       
      <svg viewBox="0 0 200 220" width="280" height="320">         
        {/* T-shirt body */}         
        <path            
          d="M40,40 L70,10 H130 L160,40 L150,60 L140,50 V200 H60 V50 L50,60 Z"            
          fill={shirtColor}            
          stroke="#333333"            
          strokeWidth="2"         
        />         
        {/* Collar */}         
        <path            
          d="M70,10 Q100,30 130,10"            
          fill="none"            
          stroke="#333333"            
          strokeWidth="2"         
        />         
        {/* Sleeves */}         
        <path            
          d="M70,10 L40,40 L50,60"            
          fill="none"            
          stroke="#333333"            
          strokeWidth="2"         
        />         
        <path            
          d="M130,10 L160,40 L150,60"            
          fill="none"            
          stroke="#333333"            
          strokeWidth="2"         
        />       
      </svg>        
      
      {/* Image overlay - scaled up */}       
      {previewImage && (         
        <div className="image-overlay" style={{           
          position: 'absolute',           
          top: '50%',           
          left: '50%',           
          transform: 'translate(-50%, -50%)',           
          width: '90px',           
          height: '90px',           
          display: 'flex',           
          justifyContent: 'center',           
          alignItems: 'center'         
        }}>           
          <img              
            src={previewImage}              
            alt="Custom design"              
            style={{               
              maxWidth: '100%',               
              maxHeight: '100%',               
              objectFit: 'contain'             
            }}           
          />         
        </div>       
      )}        
      
      {/* Text overlay - scaled up */}       
      <div className="text-overlay" style={{         
        position: 'absolute',         
        top: '50%',         
        left: '50%',         
        transform: 'translate(-50%, -50%)',         
        textAlign: 'center',         
        width: '80%',         
        pointerEvents: 'none'       
      }}>         
        {formValues.shirtText.split('\n').slice(0, 3).map((line, idx) => (           
          <div key={idx} className="text-line" style={{             
            fontSize: '14px',             
            lineHeight: '1.4',             
            fontWeight: 'bold'           
          }}>{line}</div>         
        ))}       
      </div>     
    </div>   
  </div> 
</div>
            
            {/* Add product details here */}
            <div className="product-details">
              <div className="product-title">Custom T-Shirt</div>
              <div className="product-price">₹499</div>
              <button className="add-to-cart">Add to Cart</button>
            </div>
            
            {/* Color Selection */}
            <div className="color-picker" style={{ borderColor: theme.accent }}>
              <h3>T-Shirt Color</h3>
              <div className="color-options">
                {colors.map(color => (
                  <button
                    key={color}
                    className={`color-swatch ${shirtColor === color ? 'active' : ''}`}
                    style={{ 
                      backgroundColor: color,
                      borderColor: shirtColor === color ? theme.primary : 'transparent'
                    }}
                    onClick={() => setShirtColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Controls Section */}
          <div className="controls-section">
            {/* Body Measurements */}
            <div 
              className="control-group measurements"
              style={{ 
                backgroundColor: theme.secondary,
                borderColor: theme.accent 
              }}
            >
              <h3>Body Measurements</h3>
              
              <div className="measurement-control">
                <label htmlFor="height">Height (cm)</label>
                <Controller
                  name="height"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min="120"
                      max="220"
                      style={{ 
                        borderColor: theme.accent,
                        color: theme.text,
                        backgroundColor: theme.background
                      }}
                    />
                  )}
                />
              </div>
              
              <div className="measurement-control">
                <label htmlFor="weight">Weight (kg)</label>
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="number"
                      min="30"
                      max="200"
                      style={{ 
                        borderColor: theme.accent,
                        color: theme.text,
                        backgroundColor: theme.background
                      }}
                    />
                  )}
                />
              </div>
              
              <div className="measurement-control">
                <label htmlFor="build">Build</label>
                <Controller
                  name="build"
                  control={control}
                  render={({ field }) => (
                    <select
                      {...field}
                      style={{ 
                        borderColor: theme.accent,
                        color: theme.text,
                        backgroundColor: theme.background
                      }}
                    >
                      {buildOptions.map(option => (
                        <option key={option} value={option}>
                          {option.charAt(0).toUpperCase() + option.slice(1)}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>
            
            {/* Image Upload */}
            <div 
              className={`control-group image-upload ${dragActive ? 'drag-active' : ''}`}
              style={{ 
                backgroundColor: theme.secondary,
                borderColor: theme.accent 
              }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <h3>Upload Design</h3>
              <div className="upload-area">
                {previewImage ? (
                  <div className="thumbnail-preview">
                    <img src={previewImage} alt="Design preview" />
                    <button 
                      className="remove-btn"
                      onClick={() => setPreviewImage(null)}
                      style={{ 
                        backgroundColor: theme.primary,
                        color: theme.secondary
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="upload-placeholder">
                    {/* Replace Camera component with upload icon div */}
                    <div className="upload-icon">📷</div>
                    <p>Drop an image here or click to upload</p>
                    <input
                      type="file"
                      id="image-upload"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }}
                    />
                    <label 
                      htmlFor="image-upload"
                      className="upload-btn"
                      style={{ 
                        backgroundColor: theme.primary,
                        color: theme.secondary
                      }}
                    >
                      Choose File
                    </label>
                  </div>
                )}
              </div>
            </div>
            
            {/* Text Input */}
            <div 
              className="control-group text-input"
              style={{ 
                backgroundColor: theme.secondary,
                borderColor: theme.accent 
              }}
            >
              <h3>Custom Text (max 3 lines)</h3>
              <Controller
                name="shirtText"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    rows="3"
                    placeholder="Enter text to print on shirt"
                    maxLength="100"
                    style={{ 
                      borderColor: theme.accent,
                      color: theme.text,
                      backgroundColor: theme.background
                    }}
                  />
                )}
              />
              <div className="text-limit">
                Lines: {formValues.shirtText.split('\n').length <= 3 
                  ? formValues.shirtText.split('\n').length 
                  : '3 (maximum)'}
              </div>
            </div>
            
            {/* Submit Button */}
            <button 
              className="submit-btn"
              style={{ 
                backgroundColor: theme.primary,
                color: theme.secondary
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;