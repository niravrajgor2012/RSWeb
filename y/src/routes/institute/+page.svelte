<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { GraduationCap, Building2, Users, BookOpen, ArrowRight } from 'lucide-svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  const benefits = [
    { icon: Users,       title: 'Industry Connections', desc: 'Connect your students with 350+ verified employers across India.' },
    { icon: BookOpen,    title: 'Campus Placements',    desc: 'Drive placement drives directly through our portal.' },
    { icon: Building2,   title: 'Free Profile',         desc: 'Showcase your institute with a brochure attachment.' },
    { icon: GraduationCap, title: 'Training Tie-ups',   desc: 'Collaborate with RSQuare for co-branded training programmes.' },
  ];
</script>

<svelte:head><title>Institute Corner – RSQuare HR Solutions</title></svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <Badge variant="teal">University / College / Institute Corner</Badge>
    <h1 class="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">Bridge Industry & Academia</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto mb-8">Register your institute, showcase your programmes, and connect students with real opportunities.</p>
    <div class="flex flex-wrap justify-center gap-3">
      {#if auth.isLoggedIn && auth.role === 'institute'}
        <a href="/institute/profile" class="btn-primary text-base !py-3 !px-8">Update Profile</a>
      {:else}
        <a href="/institute/register" class="btn-primary text-base !py-3 !px-8">Register Your Institute</a>
        <a href="/auth/login?redirect=/institute" class="bg-white/15 hover:bg-white/25 text-white font-semibold py-3 px-8 rounded-lg transition-colors">Login</a>
      {/if}
    </div>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide">
    <h2 class="text-2xl font-black text-center mb-10">Why Partner With RSQuare?</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each benefits as b}
        <Card padding="md" class="text-center">
          <div class="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4">
            <b.icon class="w-6 h-6 text-white" />
          </div>
          <h3 class="font-bold text-slate-900 mb-2">{b.title}</h3>
          <p class="text-sm text-slate-500">{b.desc}</p>
        </Card>
      {/each}
    </div>
  </div>
</section>

<section class="section-padding bg-white">
  <div class="container-wide max-w-2xl text-center">
    <h2 class="text-2xl font-black mb-3">Ready to Connect Your Students to Industry?</h2>
    <p class="text-slate-500 mb-6">Registration is free. Create your institute profile and upload your brochure in minutes.</p>
    <a href="/institute/register" class="btn-primary text-base !py-3 !px-8">Get Started Free <ArrowRight class="w-5 h-5" /></a>
  </div>
</section>
