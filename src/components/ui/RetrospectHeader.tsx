type Props = {
  dateString: string;
};

export const RetrospectHeader = ({ dateString }: Props) => {
  return (
    <div className='w-full flex justify-center mb-10'>
      <h1 className='text-center text-xl font-semibold text-white'>
        What are you doing <span className='text-[#FF8C6F] font-bold'>{dateString}</span> day?
      </h1>
    </div>
  );
};
