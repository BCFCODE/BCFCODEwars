import React from 'react';
import { Button } from '@/components/UI/Button';
import { IconBrandGithub } from '@tabler/icons-react';

export default function CtaGithub() {
  return (
    <Button variant='ghost' asChild size='sm' className='hidden sm:flex'>
      <a
        href='https://github.com/BCFCODE/BCFCODEwars'
        rel='noopener noreferrer'
        target='_blank'
        className='dark:text-foreground'
      >
        <IconBrandGithub />
      </a>
    </Button>
  );
}
