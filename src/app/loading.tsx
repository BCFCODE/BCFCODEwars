// app/loading.tsx
export default function Loading() {
  return (
    <div className='bg-background/80 animate-fadeIn fixed inset-0 z-50 flex flex-col items-center justify-center backdrop-blur-sm'>
      {/* Container */}
      <div className='relative h-40 w-40 animate-[pulse_2.5s_ease-in-out_infinite] overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 shadow-2xl ring-1 ring-white/10 backdrop-blur-md dark:from-white/5 dark:to-white/0'>
        {/* Glow Aura */}
        <div className='absolute inset-0 -z-10 rounded-3xl bg-gradient-to-br from-blue-600/40 via-purple-600/40 to-pink-600/40 opacity-50 blur-2xl' />

        {/* Video Logo */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className='object-full h-full w-full'
          src='https://res.cloudinary.com/ds8pptoh2/video/upload/v1749216500/BCFCODE_LOGO_motion_putxi3.mp4'
        />
      </div>

      {/* Loading Text */}
      <div className='text-foreground/80 mt-8 flex items-center space-x-2 text-lg font-medium'>
        <span className='animate-bounce'>Loading...</span>
      </div>

      {/* Subtext */}
      <p className='text-muted-foreground mt-3 animate-[fadeIn_0.6s_1.2s_forwards] text-sm opacity-0'>
        Preparing your dashboard
      </p>
    </div>
  );
}
