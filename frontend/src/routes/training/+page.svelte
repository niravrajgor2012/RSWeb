<script lang="ts">
  import { courses } from '$lib/data/courses.ts';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Tabs from '$lib/components/ui/Tabs.svelte';
  import { Calendar, Clock, Users, BookOpen, ArrowRight, Monitor, MapPin, Wifi } from 'lucide-svelte';
  import type { CourseMode } from '$lib/types/training.ts';

  const tabs = [
    { label: 'All',      value: 'All' },
    { label: 'Webinar',  value: 'Webinar' },
    { label: 'Seminar',  value: 'Seminar' },
    { label: 'Online',   value: 'Online' },
    { label: 'Offline',  value: 'Offline' },
  ];

  const modeIcons: Record<CourseMode, unknown> = { Webinar: Wifi, Seminar: Users, Online: Monitor, Offline: MapPin };
  const modeColors: Record<CourseMode, string> = { Webinar: 'teal', Seminar: 'blue', Online: 'green', Offline: 'orange' };
  const statusColors: Record<string, string> = { Upcoming: 'blue', Ongoing: 'green', Completed: 'gray' };
</script>

<svelte:head><title>Training Corner – RSQuare HR Solutions</title></svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <Badge variant="teal">Training Corner</Badge>
    <h1 class="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">Learn. Grow. Excel.</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto mb-8">Webinars, seminars, online and offline courses led by India's top HR and legal experts.</p>
    <div class="flex flex-wrap justify-center gap-3">
      <a href="/training/faculty/register" class="btn-primary text-base !py-3 !px-8">Register as Faculty</a>
      <a href="/training/student/register" class="bg-white/15 hover:bg-white/25 text-white font-semibold py-3 px-8 rounded-lg transition-colors">Register as Student</a>
    </div>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide">
    <Tabs {tabs}>
      {#snippet children(active)}
        {@const filtered = active === 'All' ? courses : courses.filter(c => c.mode === active)}
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {#each filtered as course}
            {@const ModeIcon = modeIcons[course.mode] as unknown}
            <Card hover padding="md" class="flex flex-col gap-4">
              <div class="flex items-start justify-between gap-2">
                <div class="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center text-white shrink-0">
                  <!-- @ts-ignore -->
                  <svelte:component this={ModeIcon} class="w-5 h-5" />
                </div>
                <div class="flex gap-1.5">
                  <Badge variant={modeColors[course.mode] as 'teal'|'blue'|'green'|'orange'} size="sm">{course.mode}</Badge>
                  <Badge variant={statusColors[course.status] as 'blue'|'green'|'gray'} size="sm">{course.status}</Badge>
                </div>
              </div>

              <div class="flex-1">
                <h3 class="font-bold text-slate-900 leading-snug mb-2">{course.title}</h3>
                <p class="text-xs text-slate-500 leading-relaxed line-clamp-2">{course.description}</p>
              </div>

              <div class="flex flex-wrap gap-1">
                {#each course.tags.slice(0,3) as tag}
                  <Badge variant="gray" size="sm">{tag}</Badge>
                {/each}
              </div>

              <div class="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-slate-500 pt-3 border-t border-slate-50">
                <span class="flex items-center gap-1"><Calendar class="w-3 h-3" />{new Date(course.startDate).toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</span>
                <span class="flex items-center gap-1"><Clock class="w-3 h-3" />{course.duration}</span>
                <span class="flex items-center gap-1"><Users class="w-3 h-3" />{course.seatsRemaining} seats left</span>
                <span class="font-semibold {course.fees ? 'text-brand-blue' : 'text-green-600'}">
                  {course.fees ? `₹${course.fees.toLocaleString('en-IN')}` : 'Free'}
                </span>
              </div>

              <div class="flex gap-2">
                <a href="/training/courses/{course.id}" class="btn-primary text-xs flex-1 justify-center">Register Now</a>
              </div>
            </Card>
          {/each}
        </div>
        {#if filtered.length === 0}
          <p class="text-center text-slate-400 py-12">No {active} courses scheduled yet. Check back soon!</p>
        {/if}
      {/snippet}
    </Tabs>
  </div>
</section>

<section class="section-padding bg-white">
  <div class="container-wide">
    <h2 class="text-2xl font-black text-center mb-8">Faculty & Student Registration</h2>
    <div class="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
      <Card padding="lg" class="text-center">
        <div class="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4">
          <BookOpen class="w-6 h-6 text-white" />
        </div>
        <h3 class="font-bold mb-2">Are You a Trainer / Faculty?</h3>
        <p class="text-sm text-slate-500 mb-4">Share your expertise, reach learners, and build your profile on RSQuare.</p>
        <a href="/training/faculty/register" class="btn-primary w-full justify-center">Register as Faculty</a>
      </Card>
      <Card padding="lg" class="text-center">
        <div class="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Users class="w-6 h-6 text-slate-600" />
        </div>
        <h3 class="font-bold mb-2">Are You a Student?</h3>
        <p class="text-sm text-slate-500 mb-4">Register to access courses, webinars, and career guidance from RSQuare experts.</p>
        <a href="/training/student/register" class="btn-outline w-full justify-center">Register as Student</a>
      </Card>
    </div>
  </div>
</section>
