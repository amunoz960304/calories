import { useMemo } from 'react';
import type { Activity } from '../types';
import CalorieDisplay from './CalorieDisplay';

type CaloriesTrackerProps = {
  activities: Activity[];
};

const CaloriesTracker = ({ activities }: CaloriesTrackerProps) => {
  const consumedCalories = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const burnedCalories = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const netCalories = useMemo(
    () => consumedCalories - burnedCalories,
    [activities]
  );

  return (
    <>
      <h2 className='font-black text-4xl text-white text-center'>
        Resumen de Calorias
      </h2>
      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10 md:mx-10'>
        <CalorieDisplay name='Consumidas' value={consumedCalories} />
        <CalorieDisplay name='Quemadas' value={burnedCalories} />
        <CalorieDisplay name='Diferencia' value={netCalories} />
      </div>
    </>
  );
};

export default CaloriesTracker;
