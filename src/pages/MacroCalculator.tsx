import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MacroCalculator() {
  const nav = useNavigate();
  const [weight, setWeight] = useState('');
  const [calories, setCalories] = useState('');
  const [activeMacro, setActiveMacro] = useState<'protein' | 'fats' | 'carbs'>('protein');
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

    // Update the changed macro
    switch (macro) {
      case 'protein':
        newProtein = value;
        break;
      case 'fats':
        newFats = value;
        break;
      case 'carbs':
        newCarbs = value;
        break;
    }

    // Adjust other macros based on which one is active (selected via radio)
    switch (activeMacro) {
      case 'protein':
        // If protein is selected, maintain fats ratio and adjust carbs
        newFats = Math.round((caloriesNum * 0.25) / 9);
        newCarbs = Math.round((caloriesNum - (newProtein * 4) - (newFats * 9)) / 4);
        break;
      case 'fats':
        // If fats is selected, maintain protein and adjust carbs
        newCarbs = Math.round((caloriesNum - (newProtein * 4) - (newFats * 9)) / 4);
        break;
      case 'carbs':
        // If carbs is selected, maintain protein and adjust fats
        newFats = Math.round((caloriesNum - (newProtein * 4) - (newCarbs * 4)) / 9);
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
            className="w-full bg-snes-button hover:bg-snes-button-hover text-white font-bold py-2 px-4 rounded"
          >
            Calculate Macros
          </button>

          {macros.protein > 0 && (
            <div className="space-y-4 mt-6">
              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="activeMacro"
                  value="protein"
                  checked={activeMacro === 'protein'}
                  onChange={() => setActiveMacro('protein')}
                  className="w-4 h-4 text-snes-button"
                />
                <div className="flex-1">
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
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="activeMacro"
                  value="fats"
                  checked={activeMacro === 'fats'}
                  onChange={() => setActiveMacro('fats')}
                  className="w-4 h-4 text-snes-button"
                />
                <div className="flex-1">
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
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="radio"
                  name="activeMacro"
                  value="carbs"
                  checked={activeMacro === 'carbs'}
                  onChange={() => setActiveMacro('carbs')}
                  className="w-4 h-4 text-snes-button"
                />
                <div className="flex-1">
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
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-8">
        <button
          onClick={() => nav('/')}
          className="bg-snes-button hover:bg-snes-button-hover text-white font-bold py-2 px-4 rounded"
        >
          Back to Main Screen
        </button>
      </div>
    </div>
  );
}

export default MacroCalculator;