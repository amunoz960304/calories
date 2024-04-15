type CalorieDisplayProps = {
  name: string;
  value: number;
};

const CalorieDisplay = ({ name, value }: CalorieDisplayProps) => {
  return (
    <>
      <p className='text-white font-bold rounded-full grid grid-cols-1 gap-3 text-center'>
        <span className='font-black text-6xl text-orange-500'>{value}</span>
        {name}
      </p>
    </>
  );
};

export default CalorieDisplay;
