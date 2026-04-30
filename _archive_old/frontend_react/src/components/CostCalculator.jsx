import React, { useState } from 'react';
import { Calculator, IndianRupee, Info, CheckCircle } from 'lucide-react';

const CostCalculator = () => {
  const [selectedProcedure, setSelectedProcedure] = useState('');
  const [selectedImplant, setSelectedImplant] = useState('standard');
  const [roomType, setRoomType] = useState('semi-private');
  const [showResult, setShowResult] = useState(false);

  const procedures = [
    { 
      id: 'tkr', 
      name: 'Total Knee Replacement', 
      standardMin: 280000,
      standardMax: 320000,
      premiumMin: 350000,
      premiumMax: 400000,
      roboticMin: 400000,
      roboticMax: 450000,
      hospitalDays: 4,
      includes: ['Surgery', 'Implant', 'Hospital stay', 'Medicines', 'Physiotherapy (initial)', 'Follow-up visits']
    },
    { 
      id: 'thr', 
      name: 'Total Hip Replacement', 
      standardMin: 300000,
      standardMax: 350000,
      premiumMin: 380000,
      premiumMax: 420000,
      roboticMin: 420000,
      roboticMax: 480000,
      hospitalDays: 5,
      includes: ['Surgery', 'Implant', 'Hospital stay', 'Medicines', 'Physiotherapy (initial)', 'Follow-up visits']
    },
    { 
      id: 'acl', 
      name: 'ACL Reconstruction', 
      standardMin: 150000,
      standardMax: 180000,
      premiumMin: 180000,
      premiumMax: 220000,
      roboticMin: 220000,
      roboticMax: 280000,
      hospitalDays: 2,
      includes: ['Arthroscopic surgery', 'Graft', 'Hospital stay', 'Knee brace', 'Initial physio', 'Follow-up']
    },
    { 
      id: 'arthroscopy', 
      name: 'Knee Arthroscopy', 
      standardMin: 80000,
      standardMax: 120000,
      premiumMin: 120000,
      premiumMax: 150000,
      roboticMin: 150000,
      roboticMax: 180000,
      hospitalDays: 1,
      includes: ['Surgery', 'Hospital stay', 'Medicines', 'Follow-up visits']
    },
    { 
      id: 'shoulder', 
      name: 'Shoulder Arthroscopy', 
      standardMin: 120000,
      standardMax: 150000,
      premiumMin: 150000,
      premiumMax: 200000,
      roboticMin: 200000,
      roboticMax: 250000,
      hospitalDays: 2,
      includes: ['Surgery', 'Hospital stay', 'Sling', 'Medicines', 'Initial physio', 'Follow-up']
    },
    { 
      id: 'fracture', 
      name: 'Fracture Fixation (Major)', 
      standardMin: 200000,
      standardMax: 280000,
      premiumMin: 280000,
      premiumMax: 320000,
      roboticMin: 320000,
      roboticMax: 350000,
      hospitalDays: 3,
      includes: ['Surgery', 'Implants/Plates', 'Hospital stay', 'Medicines', 'Cast/support', 'Follow-up']
    },
  ];

  const implantOptions = {
    standard: { name: 'Standard', description: 'Quality Indian/imported implants with good longevity' },
    premium: { name: 'Premium', description: 'Premium imported implants with extended warranty' },
    robotic: { name: 'Robotic/Navigated', description: 'Computer-navigated surgery with premium implants' }
  };

  const roomOptions = {
    'general': { name: 'General Ward', pricePerDay: 3000 },
    'semi-private': { name: 'Semi-Private Room', pricePerDay: 6000 },
    'private': { name: 'Private Room', pricePerDay: 10000 },
    'deluxe': { name: 'Deluxe Suite', pricePerDay: 18000 }
  };

  const calculateCost = () => {
    const procedure = procedures.find(p => p.id === selectedProcedure);
    if (!procedure) return null;

    let minPrice, maxPrice;
    
    if (selectedImplant === 'standard') {
      minPrice = procedure.standardMin;
      maxPrice = procedure.standardMax;
    } else if (selectedImplant === 'premium') {
      minPrice = procedure.premiumMin;
      maxPrice = procedure.premiumMax;
    } else {
      minPrice = procedure.roboticMin;
      maxPrice = procedure.roboticMax;
    }

    const roomCost = roomOptions[roomType].pricePerDay * procedure.hospitalDays;
    
    // Room cost is typically included in package, but add for upgrades
    const roomUpgrade = roomType === 'general' ? 0 : roomCost - (roomOptions['general'].pricePerDay * procedure.hospitalDays);
    
    return {
      procedure: procedure.name,
      minEstimate: minPrice,
      maxEstimate: maxPrice,
      roomUpgrade: roomUpgrade,
      hospitalDays: procedure.hospitalDays,
      includes: procedure.includes,
      lowTotal: minPrice + (roomUpgrade > 0 ? roomUpgrade : 0),
      highTotal: maxPrice + (roomUpgrade > 0 ? roomUpgrade : 0),
      implantType: implantOptions[selectedImplant].name,
      roomName: roomOptions[roomType].name
    };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const result = showResult ? calculateCost() : null;

  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-6 md:p-8 border border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-foreground">Cost Calculator</h3>
          <p className="text-sm text-muted-foreground">Get an estimate for your procedure</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Procedure Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Select Procedure
          </label>
          <select
            value={selectedProcedure}
            onChange={(e) => { setSelectedProcedure(e.target.value); setShowResult(false); }}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="">Choose a procedure...</option>
            {procedures.map(proc => (
              <option key={proc.id} value={proc.id}>{proc.name}</option>
            ))}
          </select>
        </div>

        {/* Implant Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Implant/Technology Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(implantOptions).map(([key, option]) => (
              <button
                key={key}
                onClick={() => { setSelectedImplant(key); setShowResult(false); }}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedImplant === key
                    ? 'bg-primary text-white'
                    : 'bg-white border border-border hover:border-primary'
                }`}
              >
                {option.name}
              </button>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {implantOptions[selectedImplant].description}
          </p>
        </div>

        {/* Room Type */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Room Preference
          </label>
          <select
            value={roomType}
            onChange={(e) => { setRoomType(e.target.value); setShowResult(false); }}
            className="w-full px-4 py-3 rounded-lg border border-border bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            {Object.entries(roomOptions).map(([key, option]) => (
              <option key={key} value={key}>
                {option.name} ({formatCurrency(option.pricePerDay)}/day)
              </option>
            ))}
          </select>
        </div>

        {/* Calculate Button */}
        <button
          onClick={() => setShowResult(true)}
          disabled={!selectedProcedure}
          className="w-full py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <IndianRupee className="w-5 h-5" />
          Calculate Estimate
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-5 bg-white rounded-xl border border-border">
            <h4 className="font-semibold text-lg text-foreground mb-4">{result.procedure}</h4>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Implant Type</span>
                <span className="font-medium text-primary">{result.implantType}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Room Type</span>
                <span className="font-medium">{result.roomName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Hospital Stay</span>
                <span className="font-medium">{result.hospitalDays} days</span>
              </div>
              {result.roomUpgrade > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Room Upgrade Cost</span>
                  <span className="font-medium">+{formatCurrency(result.roomUpgrade)}</span>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4 mb-4">
              <p className="text-sm text-muted-foreground mb-2">Estimated Cost Range:</p>
              <div className="flex items-center justify-center gap-3">
                <span className="text-2xl font-bold text-primary">{formatCurrency(result.lowTotal)}</span>
                <span className="text-muted-foreground">to</span>
                <span className="text-2xl font-bold text-primary">{formatCurrency(result.highTotal)}</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-foreground mb-2">Package Includes:</p>
              <ul className="grid grid-cols-2 gap-1">
                {result.includes.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg">
              <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800">
                This is an estimate based on typical cases. Actual costs may vary based on your specific condition, 
                complexity, and additional requirements. Most insurance policies cover 80-100% of costs.
                Contact us for an accurate personalized quote.
              </p>
            </div>
          </div>
        )}
      </div>

      <p className="text-center text-sm text-muted-foreground mt-4">
        Need a detailed quote? <a href="/contact" className="text-primary font-medium hover:underline">Contact us</a>
      </p>
    </div>
  );
};

export default CostCalculator;
