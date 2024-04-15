import {
  useEffect,
  useState,
  type ChangeEvent,
  type Dispatch,
  type FormEvent,
} from 'react';
import { v4 as uuid } from 'uuid';
import { categories } from '../data/categories';
import type { Activity } from '../types';
import type {
  ActivityActions,
  ActivityState,
} from '../reducers/activity-reducer';

type FormProps = {
  dispatch: Dispatch<ActivityActions>;
  state: ActivityState;
};

const Form = ({ dispatch, state }: FormProps) => {
  const initialState: Activity = {
    id: uuid(),
    category: 1,
    name: '',
    calories: 0,
  };

  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const [activitySelected] = state.activities.filter(
        (activity) => activity.id === state.activeId
      );

      setActivity(activitySelected);
    }
  }, [state.activeId]);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const isNumericField = ['category', 'calories'].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumericField ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    setActivity({ ...initialState });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };

  return (
    <form
      className='space-y-5 bg-white p-10 rounded-lg'
      onSubmit={handleSubmit}
    >
      <div className='gird grid-cols-1 gap-3'>
        <label htmlFor='category' className='font-bold'>
          Categoria:
        </label>
        <select
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          name='category'
          id='category'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='gird grid-cols-1 gap-3'>
        <label htmlFor='name' className='font-bold'>
          Actividad:
        </label>
        <input
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          name='name'
          id='name'
          type='text'
          placeholder='Ej. Comida, Ensalada, Ejercicio, Pesas, etc'
          onChange={handleChange}
          value={activity.name}
        />
      </div>
      <div className='gird grid-cols-1 gap-3'>
        <label htmlFor='calories' className='font-bold'>
          Calorias:
        </label>
        <input
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          name='calories'
          id='calories'
          type='number'
          placeholder='Ej. 300, 400'
          onChange={handleChange}
          value={activity.calories}
        />
      </div>
      <input
        type='submit'
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        className='bg-gray-800 hover:bg-gray-900 cursor-pointer p-2 font-bold uppercase text-white w-full disabled:opacity-10'
        disabled={!isValidActivity()}
      />
    </form>
  );
};

export default Form;
