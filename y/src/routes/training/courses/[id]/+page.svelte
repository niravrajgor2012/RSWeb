<script lang="ts">
  import type { PageData } from './$types';
  import { ArrowLeft, Calendar, Clock, Users, CheckCircle } from 'lucide-svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Input from '$lib/components/ui/Input.svelte';
  import Modal from '$lib/components/ui/Modal.svelte';
  import { ui } from '$lib/stores/ui.svelte.ts';

  let { data }: { data: PageData } = $props();
  const { course } = data;
  let registerOpen = $state(false);
  let rName = $state(''), rEmail = $state(''), rMobile = $state('');

  function handleRegister(e: Event) {
    e.preventDefault();
    registerOpen = false;
    ui.toast(`Registered for "${course.title}"! Confirmation sent to ${rEmail}.`, 'success');
  }

  const startDate = new Date(course.startDate).toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long', year:'numeric' });
</script>

<svelte:head><title>{course.title} – RSQuare Training</title></svelte:head>

<div class="bg-white border-b border-slate-100">
  <div class="container-wide py-8">
    <a href="/training" class="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-brand-blue mb-4 transition-colors">
      <ArrowLeft class="w-4 h-4" /> All Courses
    </a>
    <div class="flex flex-wrap gap-2 mb-3">
      <Badge variant="teal">{course.mode}</Badge>
      <Badge variant={course.status === 'Upcoming' ? 'blue' : course.status === 'Ongoing' ? 'green' : 'gray'}>{course.status}</Badge>
    </div>
    <h1 class="text-3xl sm:text-4xl font-black text-brand-navy mb-3">{course.title}</h1>
    <p class="text-slate-600 text-lg max-w-2xl">{course.description}</p>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide grid lg:grid-cols-3 gap-8">
    <div class="lg:col-span-2 space-y-5">
      <Card padding="lg">
        <h2 class="text-lg font-black mb-4">Course Details</h2>
        <ul class="space-y-3 text-sm">
          {#each [
            [Calendar, 'Start Date',  startDate],
            [Clock,    'Duration',    course.duration],
            [Users,    'Instructor',  course.instructor],
            [Users,    'Seats Left',  `${course.seatsRemaining} of ${course.seats}`],
          ] as [Icon, label, value]}
            <li class="flex items-start gap-3">
              <Icon class="w-4 h-4 text-brand-blue shrink-0 mt-0.5" />
              <span class="text-slate-500 w-28 shrink-0">{label}</span>
              <span class="font-medium text-slate-800">{value}</span>
            </li>
          {/each}
        </ul>
      </Card>
      <Card padding="lg">
        <h2 class="text-lg font-black mb-4">Topics Covered</h2>
        <div class="flex flex-wrap gap-2">
          {#each course.tags as tag}
            <Badge variant="blue">{tag}</Badge>
          {/each}
        </div>
      </Card>
    </div>

    <div class="space-y-5">
      <Card padding="md" class="sticky top-20">
        <div class="text-center mb-4">
          <p class="text-3xl font-black {course.fees ? 'text-brand-blue' : 'text-green-600'}">
            {course.fees ? `₹${course.fees.toLocaleString('en-IN')}` : 'Free'}
          </p>
          {#if course.fees}<p class="text-xs text-slate-400">+ GST per person</p>{/if}
        </div>
        <div class="w-full bg-slate-100 rounded-full h-2 mb-3">
          <div class="h-2 rounded-full gradient-brand" style="width:{Math.round((1-course.seatsRemaining/course.seats)*100)}%"></div>
        </div>
        <p class="text-xs text-center text-slate-500 mb-4">{course.seatsRemaining} seats remaining</p>
        {#if course.status !== 'Completed'}
          <button onclick={() => registerOpen = true} class="btn-primary w-full justify-center !py-3">
            Register Now
          </button>
        {:else}
          <button disabled class="btn-primary w-full justify-center !py-3 opacity-50">Course Ended</button>
        {/if}
        {#if course.brochureUrl}
          <a href={course.brochureUrl} class="btn-ghost w-full justify-center mt-2">Download Brochure</a>
        {/if}
      </Card>
    </div>
  </div>
</section>

<Modal open={registerOpen} title="Register for Course" onclose={() => registerOpen = false}>
  <form class="space-y-4" onsubmit={handleRegister}>
    <p class="text-sm text-slate-600 bg-blue-50 rounded-lg p-3">
      <strong>{course.title}</strong> — {startDate}
    </p>
    <Input label="Full Name" bind:value={rName} required />
    <Input label="Email" type="email" bind:value={rEmail} required />
    <Input label="Mobile" type="tel" bind:value={rMobile} required />
    <div class="flex gap-3">
      <button type="button" onclick={() => registerOpen = false} class="btn-ghost flex-1 border border-slate-200">Cancel</button>
      <button type="submit" class="btn-primary flex-1">Confirm Registration</button>
    </div>
  </form>
</Modal>
