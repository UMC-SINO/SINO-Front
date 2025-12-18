type Props = {
  dateString: string;
};

export const RetrospectHeader = ({ dateString }: Props) => {
  return (
    <div className='w-full flex justify-center mb-12'>
      <h1 className='text-center text-base md:text-lg font-semibold text-white/80'>
        What are you doing <span className='text-orange-500 font-bold'>{dateString}</span> day?
      </h1>
    </div>
  );
};
