import CodewarsConnectForm from '../components/CodewarsConnectForm';

export default function CodewarsConnectPage() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center space-y-6 px-4 py-12 transition-colors duration-500'>
      <div className='animate-fade-up w-full max-w-md text-center'>
        <h1 className='text-foreground text-3xl font-bold'>
          Connect your <span className='text-primary'>Codewars</span> account
        </h1>
        <p className='text-muted-foreground mt-2'>
          Validate your Codewars username to sync your challenges, ranks, and
          achievements automatically.
        </p>
      </div>

      <div className='mt-10 w-full max-w-md'>
        <CodewarsConnectForm />
      </div>
    </div>
  );
}
