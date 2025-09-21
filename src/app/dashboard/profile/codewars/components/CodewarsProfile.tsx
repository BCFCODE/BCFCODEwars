'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { CodewarsProfileData } from '@/types/codewars-profile';
import { Medal, Trophy, UserX } from 'lucide-react';
import Link from 'next/link';

export default function CodewarsProfileCard({
  profileData
}: {
  profileData: CodewarsProfileData;
}) {
  // 🟥 Not connected state
  if (!profileData.isConnected) {
    return (
      <Card className='border-muted-foreground/30 from-muted/30 to-background mx-auto max-w-xl rounded-xl border border-dashed bg-gradient-to-br p-6 text-center shadow-md'>
        <CardHeader className='flex flex-col items-center space-y-2'>
          <UserX className='text-muted-foreground h-10 w-10' />
          <CardTitle className='text-lg font-bold'>Not Connected</CardTitle>
          <CardDescription className='text-muted-foreground text-sm'>
            Connect your Codewars account to unlock progress tracking, honor
            insights, and personalized statistics.
          </CardDescription>
        </CardHeader>
        <CardFooter className='flex justify-center'>
          <Link href='/dashboard/profile/codewars/connect'>
            <Button className='bg-primary text-primary-foreground shadow hover:opacity-90'>
              Connect Codewars Account
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }

  // 🟩 Connected state
  return (
    <Card className='mx-auto max-w-4xl rounded-xl bg-gradient-to-br from-[var(--kyu-3)]/15 to-[var(--kyu-1)]/15 shadow-lg'>
      {/* Header with identity */}
      <CardHeader className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <CardTitle className='text-foreground text-2xl font-bold'>
            {profileData.name}
          </CardTitle>
          <CardDescription className='text-muted-foreground mt-1 text-sm'>
            <span className='font-medium'>Username:</span> @
            {profileData.username}
            <br />
            <span className='font-medium'>Clan:</span> {profileData.clan || '—'}
            <br />
            <span className='font-medium'>Email:</span>{' '}
            {profileData.email || '—'}
          </CardDescription>
        </div>

        <div className='flex flex-wrap gap-2'>
          <Badge
            variant='secondary'
            className='bg-card-background flex items-center gap-1'
          >
            <Trophy className='h-4 w-4 text-[var(--royal-gold)]' />
            Honor: {profileData.honor}
          </Badge>
          <Badge
            variant='secondary'
            className='bg-card-background flex items-center gap-1'
          >
            <Medal className='h-4 w-4 text-[var(--kyu-4)]' />
            Leaderboard: #{profileData.leaderboardPosition}
          </Badge>
        </div>
      </CardHeader>

      {/* Content: overall rank + languages */}
      <CardContent className='grid gap-6 sm:grid-cols-2'>
        {/* Overall rank */}
        <div className='border-muted/20 bg-card/50 rounded-lg border p-4 shadow-sm'>
          <p className='text-muted-foreground text-xs font-medium'>
            Overall Rank
          </p>
          <p className='mt-1 text-lg font-bold'>
            {profileData.ranks?.overall.name}{' '}
            <span className='text-muted-foreground text-sm'>
              ({profileData.ranks?.overall.score} pts)
            </span>
          </p>
        </div>

        {/* Languages */}
        <div className='border-muted/20 bg-card/50 rounded-lg border p-4 shadow-sm'>
          <p className='text-muted-foreground text-xs font-medium'>Languages</p>
          <div className='mt-2 flex flex-col gap-1'>
            {profileData.ranks?.languages &&
              Object.entries(profileData.ranks.languages).map(
                ([lang, data]) => (
                  <span key={lang} className='text-sm font-semibold'>
                    {lang}: {data.name}{' '}
                    <span className='text-muted-foreground'>
                      ({data.score} pts)
                    </span>
                  </span>
                )
              )}
          </div>
        </div>
      </CardContent>

      {/* Skills */}
      {(profileData.skills ?? []).length > 0 && (
        <CardFooter className='flex flex-wrap gap-2'>
          {profileData.skills?.map((skill, i) => (
            <Badge
              key={i}
              className='bg-primary/10 text-primary rounded-md px-3 py-1 text-xs'
            >
              Skill: {skill}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
}
