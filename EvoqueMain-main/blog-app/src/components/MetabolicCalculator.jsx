// MetabolicCalculator.js
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/metaboliccalculator.module.css';
import fillerImage from '../images/kaden_jerry.jpg'

const MetabolicCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [measurementSystem, setMeasurementSystem] = useState('metric');
  const [activityLevel, setActivityLevel] = useState('sedentary');
  const [result, setResult] = useState(null);
  const [selectedBodyFatImage, setSelectedBodyFatImage] = useState(null);
  const [carbohydratePercentage, setCarbohydratePercentage] = useState(50);
  const [proteinPercentage, setProteinPercentage] = useState(30);
  const [fatPercentage, setFatPercentage] = useState(20);

  const handleResetMacros = () => {
    setCarbohydratePercentage(50);
    setProteinPercentage(30);
    setFatPercentage(20);
  };

  useEffect(() => {
    // Enforce the condition that percentages must add up to 100
    const totalPercentage = carbohydratePercentage + proteinPercentage + fatPercentage;
    if (totalPercentage > 100) {
      // Reduce the last slider's percentage to maintain the total at 100
      if (fatPercentage > 0) {
        setFatPercentage(fatPercentage - 1);
      } else if (proteinPercentage > 0) {
        setProteinPercentage(proteinPercentage - 1);
      } else if (carbohydratePercentage > 0) {
        setCarbohydratePercentage(carbohydratePercentage - 1);
      }
    }
  }, [carbohydratePercentage, proteinPercentage, fatPercentage]);

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const handleHeightChange = (event) => {
    setHeight(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleMeasurementSystemChange = (event) => {
    setMeasurementSystem(event.target.value);
  };

  const handleActivityLevelChange = (event) => {
    setActivityLevel(event.target.value);
  };

  const bodyFatImages = [
    { value: 'very_low', label: '5-10%', image: fillerImage },
    { value: 'low', label: '11-15%', image: fillerImage },
    { value: 'moderate', label: '16-20%', image: fillerImage },
    { value: 'average', label: '21-25%', image: fillerImage },
    { value: 'high', label: '26-30%', image: fillerImage },
    { value: 'very_high', label: '31-35%+', image: fillerImage },
  ];


  const handleBodyFatImageChange = (event) => {
    setSelectedBodyFatImage(event.target.value);
    const selectedParameter = bodyFatImages.find((img) => img.value === event.target.value);
    if (selectedParameter) {
      setSelectedBodyFatImage(selectedParameter.value);
    }
  };

  const calculateBMR = () => {
    if (measurementSystem === 'metric') {
      let factor;
      switch (selectedBodyFatImage) {
        case 'very_low':
          factor = 0.9;
          break;
        case 'low':
          factor = 0.95;
          break;
        case 'moderate':
          factor = 1.0;
          break;
        case 'average':
          factor = 1.05;
          break;
        case 'high':
          factor = 1.1;
          break;
        case 'very_high':
          factor = 1.15;
          break;
        default:
          factor = 1.0;
      }

      // BMR calculation for metric measurement system (using Harris-Benedict Equation)
      if (gender === 'male') {
        return (factor * (88.362 + 13.397 * weight + 4.799 * height - 5.677 * age)).toFixed(2);
      } else {
        return (factor * (447.593 + 9.247 * weight + 3.098 * height - 4.330 * age)).toFixed(2);
      }
    } else {
      // BMR calculation for imperial measurement system (using Harris-Benedict Equation)
      const weightInKg = weight * 0.453592;
      const heightInCm = height * 2.54;
      let factor;
      switch (selectedBodyFatImage) {
        case 'very_low':
          factor = 0.9;
          break;
        case 'low':
          factor = 0.95;
          break;
        case 'moderate':
          factor = 1.0;
          break;
        case 'average':
          factor = 1.05;
          break;
        case 'high':
          factor = 1.1;
          break;
        case 'very_high':
          factor = 1.15;
          break;
        default:
          factor = 1.0;
      }
      if (gender === 'male') {
        return (factor * (88.362 + 13.397 * weightInKg + 4.799 * heightInCm - 5.677 * age)).toFixed(2);
      } else {
        return (factor * (447.593 + 9.247 * weightInKg + 3.098 * heightInCm - 4.330 * age)).toFixed(2);
      }
    }
  };

  const calculateCalories = () => {
    const bmr = parseFloat(calculateBMR());
    let activityFactor;

    switch (activityLevel) {
      case 'sedentary':
        activityFactor = 1.2;
        break;
      case 'lightly_active':
        activityFactor = 1.375;
        break;
      case 'moderately_active':
        activityFactor = 1.55;
        break;
      case 'very_active':
        activityFactor = 1.725;
        break;
      case 'extra_active':
        activityFactor = 1.9;
        break;
      default:
        activityFactor = 1.2;
    }

    return (bmr * activityFactor).toFixed(2);
  };

  const calculateMacros = () => {
    const totalCalories = calculateCalories();
    const carbohydrateGrams = ((carbohydratePercentage / 100) * totalCalories) / 4;
    const proteinGrams = ((proteinPercentage / 100) * totalCalories) / 4;
    const fatGrams = ((fatPercentage / 100) * totalCalories) / 9;
    return {
      carbohydrateGrams: carbohydrateGrams.toFixed(2),
      proteinGrams: proteinGrams.toFixed(2),
      fatGrams: fatGrams.toFixed(2),
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      const bmr = calculateBMR();
      const totalCalories = calculateCalories();
      const macros = calculateMacros();
      setResult(`
      Your Basal Metabolic Rate (BMR) is: ${bmr} calories/day.
      Recommended daily calories intake: ${totalCalories} calories/day.

      Macro Breakdown:
      Carbohydrates: ${macros.carbohydrateGrams} grams/day (${carbohydratePercentage}%)\n
      Proteins: ${macros.proteinGrams} grams/day (${proteinPercentage}%)\n
      Fats: ${macros.fatGrams} grams/day (${fatPercentage}%)
    `);
    } else {
      setResult('Please fill out all the required fields.');
    }
  };

  const isFormValid = () => {
    return weight && height && age;
  };

  return (
    <div className={styles.container}>
      <div className={styles.calculator}>
        <h1>Metabolic Calculator</h1>

        <div className={styles.formContainer}>
          <div className={styles.upperLeftContainer}>
            <label>Measurement System:</label>
            <select value={measurementSystem} onChange={handleMeasurementSystemChange}>
              <option value="metric">Metric</option>
              <option value="imperial">Imperial</option>
            </select>

            <label>Weight ({measurementSystem === 'metric' ? 'kg' : 'lbs'}):</label>
            <input type="number" value={weight} onChange={handleWeightChange} />

            <label>Height ({measurementSystem === 'metric' ? 'cm' : 'in'}):</label>
            <input type="number" value={height} onChange={handleHeightChange} />

            <label>Age (years):</label>
            <input type="number" value={age} onChange={handleAgeChange} />

            <label>Gender:</label>
            <select value={gender} onChange={handleGenderChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className={styles.upperRightContainer}>
            <div className={styles.bodyFatSection}>
              <label>Body Fat Percentage:</label>
              <div className={styles.bodyFatImages}>
                {bodyFatImages.map((img) => (
                  <label key={img.value}>
                    <input
                      type="radio"
                      name="bodyFatImage"
                      value={img.value}
                      checked={selectedBodyFatImage === img.value}
                      onChange={handleBodyFatImageChange}
                    />
                    <Image src={img.image} alt={img.label} width={100} height={100} />
                    <span>{img.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label>Activity Level:</label>
              <select value={activityLevel} onChange={handleActivityLevelChange}>
                <option value="sedentary">Sedentary (little or no exercise)</option>
                <option value="lightly_active">Lightly active (light exercise/sports 1-3 days/week)</option>
                <option value="moderately_active">Moderately active (moderate exercise/sports 3-5 days/week)</option>
                <option value="very_active">Very active (hard exercise/sports 6-7 days/week)</option>
                <option value="extra_active">Extra active (very hard exercise/sports & physical job or 2x training)</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
        <div className={`${styles.bottomLeftContainer} ${styles.moveUp}`}>
            <div>
              <label>Carbohydrate Percentage ({carbohydratePercentage}%):</label>
              <input
                type="range"
                min="0"
                max="100"
                value={carbohydratePercentage}
                onChange={(e) => setCarbohydratePercentage(e.target.value)}
              />
            </div>

            <div>
              <label>Protein Percentage ({proteinPercentage}%):</label>
              <input
                type="range"
                min="0"
                max="100"
                value={proteinPercentage}
                onChange={(e) => setProteinPercentage(e.target.value)}
              />
            </div>

            <div>
              <label>Fat Percentage ({fatPercentage}%):</label>
              <input
                type="range"
                min="0"
                max="100"
                value={fatPercentage}
                onChange={(e) => setFatPercentage(e.target.value)}
              />
            </div>

            <div className={styles.buttonsContainer}>
              <button type="button" onClick={handleResetMacros}>
                Reset Macros
              </button>
              <button type="submit" onClick={handleSubmit} disabled={!isFormValid()}>
                Calculate
              </button>
             </div>
          </div>

          <div className={styles.bottomRightContainer}>
            {result && (
              <div>
                <h2>Results:</h2>
                <p>{result}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetabolicCalculator;
