import Button from '@/components/common/Button';

const ExamplePage = () => {
  return (
    <div className=' min-h-dvh flex flex-col gap-3 items-center justify-center'>
      <Button type='button'>Log in</Button>
      <Button type='button' disabled={true}>
        close
      </Button>
    </div>
  );
};

export default ExamplePage;
