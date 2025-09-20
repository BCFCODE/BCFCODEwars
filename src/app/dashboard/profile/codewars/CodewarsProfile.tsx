'use client';

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal } from 'lucide-react';
import Link from 'next/link';

type ProfileData = {
  profileData: {
    isConnected: boolean;
    name?: string;
    username?: string;
    email?: string;
    clan?: string;
    honor?: number;
    leaderboardPosition?: number;
    ranks?: {
      overall: { name: string; color: string; score: number };
      languages: Record<string, { name: string; color: string; score: number }>;
    };
    skills?: string[];
  };
};

export default function CodewarsProfileCard({
  profileData: {
    isConnected,
    name,
    username,
    email,
    clan,
    honor,
    leaderboardPosition,
    ranks,
    skills = []
  }
}: ProfileData) {
  // 🟥 Not connected state
  if (!isConnected) {
    return (
      <Card className='from-muted to-background mx-auto max-w-xl rounded-xl bg-gradient-to-r text-center shadow-xl'>
        <CardHeader>
          <Avatar className='mx-auto h-20 w-20 border'>
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          <CardTitle className='mt-2 text-xl font-bold'>
            Not Connected
          </CardTitle>
          <CardDescription className='text-muted-foreground text-sm'>
            Connect your Codewars account to unlock detailed stats and progress
            tracking.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-center'>
          <Link href='/dashboard/profile/codewars/connect'>
            <Button className='bg-primary text-primary-foreground shadow-md'>
              Connect Codewars Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // 🟩 Connected state
  return (
    <Card className='mx-auto max-w-4xl rounded-xl bg-gradient-to-br from-[var(--kyu-3)]/20 to-[var(--kyu-1)]/20 shadow-xl'>
      {/* Header with avatar + name */}
      <CardHeader className='flex flex-col gap-4 sm:flex-row sm:items-center'>
        <Avatar className='h-20 w-20 border-2 border-[var(--royal-gold)]'>
          <AvatarImage
            src='https://www.codewars.com/packs/assets/logo.f607a0fb.svg'
            alt={name}
          />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className='text-2xl font-bold'>{name}</CardTitle>
          <CardDescription className='text-muted-foreground text-sm'>
            <span className='font-medium'>Username:</span> @{username}
            <br />
            <span className='font-medium'>Clan:</span> {clan || '—'}
            <br />
            <span className='font-medium'>Email:</span> {email || '—'}
          </CardDescription>
          <div className='mt-2 flex flex-wrap gap-2'>
            <Badge variant='outline'>
              <Trophy className='mr-1 h-4 w-4' /> Honor: {honor}
            </Badge>
            <Badge variant='outline'>
              <Medal className='mr-1 h-4 w-4' /> Leaderboard: #
              {leaderboardPosition}
            </Badge>
          </div>
        </div>
      </CardHeader>

      {/* Content: overall + languages */}
      <CardContent className='grid gap-6 sm:grid-cols-2'>
        {/* Overall rank */}
        <div className='bg-muted/40 rounded-lg p-4'>
          <p className='text-muted-foreground text-sm font-medium'>
            Overall Rank
          </p>
          <p
            className='text-lg font-bold'
            style={{ color: ranks?.overall.color }}
          >
            {ranks?.overall.name} ({ranks?.overall.score} pts)
          </p>
        </div>

        {/* Languages */}
        <div className='bg-muted/40 rounded-lg p-4'>
          <p className='text-muted-foreground text-sm font-medium'>Languages</p>
          <div className='mt-2 flex flex-col gap-1'>
            {ranks?.languages &&
              Object.entries(ranks.languages).map(([lang, data]) => (
                <span
                  key={lang}
                  className='text-sm font-semibold'
                  style={{ color: data.color }}
                >
                  {lang}: {data.name} ({data.score} pts)
                </span>
              ))}
          </div>
        </div>
      </CardContent>

      {/* Skills */}
      {skills?.length > 0 && (
        <CardFooter className='flex flex-wrap gap-2'>
          {skills.map((skill, i) => (
            <Badge key={i} className='bg-primary/10 text-primary'>
              Skill: {skill}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
