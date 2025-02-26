import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MacroCalculator() {
  const nav = useNavigate();
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [macros, setMacros] = useState({
    protein: 0,
    fats: 0,
    carbs: 0
  });

  const calculateMacros = () => {
    const weightNum = parseFloat(weight);
    const caloriesNum = parseFloat(calories);

    if (!weightNum || !caloriesNum) {
      alert('Please enter valid weight and calories');
      return;
    }

    // Calculate protein (1g per lb)
    const proteinGrams = weightNum * 1;
    const proteinCals = proteinGrams * 4;

    // Calculate fats (25% of total calories)
    const fatCals = caloriesNum * 0.25;
    const fatGrams = fatCals / 9;

    // Calculate remaining carbs
    const carbCals = caloriesNum - proteinCals - fatCals;
    const carbGrams = carbCals / 4;

    setMacros({
      protein: Math.round(proteinGrams),
      fats: Math.round(fatGrams),
      carbs: Math.round(carbGrams)
    });
  };

  const handleMacroChange = (macro: 'protein' | 'fats' | 'carbs', value: number) => {
    const caloriesNum = parseFloat(calories);
    if (!caloriesNum) return;

    let newProtein = macros.protein;
    let newFats = macros.fats;
    let newCarbs = macros.carbs;

    switch (macro) {
      case 'protein':
        newProtein = value;
        // Maintain fat ratio, adjust carbs
        const remainingAfterProtein = caloriesNum - (newProtein * 4);
        newFats = Math.round((caloriesNum * 0.25) / 9);
        newCarbs = Math.round((remainingAfterProtein - (newFats * 9)) / 4);
        break;
      case 'fats':
        newFats = value;
        // Maintain protein, adjust carbs
        const remainingAfterFat = caloriesNum - (newFats * 9);
        newCarbs = Math.round((remainingAfterFat - (newProtein * 4)) / 4);
        break;
      case 'carbs':
        newCarbs = value;
        // Maintain protein, adjust fats
        const remainingAfterCarbs = caloriesNum - (newCarbs * 4);
        newFats = Math.round((remainingAfterCarbs - (newProtein * 4)) / 9);
        break;
    }

    setMacros({
      protein: Math.max(0, newProtein),
      fats: Math.max(0, newFats),
      carbs: Math.max(0, newCarbs)
    });
  };

  return (
    <div className="min-h-screen bg-snes-grey p-8">
      <h1 className="text-center text-3xl font-bold mb-8">Macro Calculator</h1>
      
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Body Weight (lbs)</label>
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter weight"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Daily Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter calories"
            />
          </div>

          <button
            onClick={calculateMacros}
            className="w-full bg-snes-button hover:bg-[#69656A] text-white font-bold py-2 px-4 rounded"
          >
            Calculate Macros
          </button>

          {macros.protein > 0 && (
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Protein: {macros.protein}g ({Math.round((macros.protein * 4 / parseFloat(calories)) * 100)}%)
                </label>
                <input
                  type="range"
                  value={macros.protein}
                  min="0"
                  max={parseFloat(weight) * 1.2}
                  onChange={(e) => handleMacroChange('protein', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fats: {macros.fats}g ({Math.round((macros.fats * 9 / parseFloat(calories)) * 100)}%)
                </label>
                <input
                  type="range"
                  value={macros.fats}
                  min="0"
                  max={Math.round(parseFloat(calories) / 9)}
                  onChange={(e) => handleMacroChange('fats', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Carbs: {macros.carbs}g ({Math.round((macros.carbs * 4 / parseFloat(calories)) * 100)}%)
                </label>
                <input
                  type="range"
                  value={macros.carbs}
                  min="0"
                  max={Math.round(parseFloat(calories) / 4)}
                  onChange={(e) => handleMacroChange('carbs', parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => nav('/')}
          className="bg-snes-button hover:bg-[#69656A] text-white font-bold py-2 px-4 rounded"
        >
          Back to Main Screen
        </button>
      </div>
    </div>
  );
}

export default MacroCalculator;