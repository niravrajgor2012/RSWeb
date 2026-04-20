<script lang="ts">
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { recruitmentPackages } from '$lib/data/packages.ts';
  import { Briefcase, Users, Search, Package, CheckCircle, Star, ArrowRight } from 'lucide-svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  const features = [
    { icon: Briefcase, title: 'Free Job Posting',     desc: 'Post your first job at zero cost. Reach thousands of verified candidates instantly.' },
    { icon: Search,    title: 'Resume Search',         desc: 'Browse CVs filtered by skill, location, experience, and qualification.' },
    { icon: Users,     title: 'Verified Candidates',   desc: 'Every profile is OTP-verified. No fake accounts, no spam applications.' },
    { icon: Package,   title: 'Flexible Packages',     desc: 'From free to enterprise — scale your hiring without locked contracts.' },
  ];

  const steps = [
    { num: '01', title: 'Register Free',       desc: 'Create your account with mobile OTP in 2 minutes.' },
    { num: '02', title: 'Build Your Profile',  desc: 'Add company logo, GSTN, type, and a brief profile.' },
    { num: '03', title: 'Post a Job',          desc: 'Fill a simple form — title, skills, salary, deadline.' },
    { num: '04', title: 'Receive Applications',desc: 'Review CVs, shortlist candidates, and hire faster.' },
  ];
</script>

<svelte:head>
  <title>Employer Corner – RSQuare HR Solutions</title>
</svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <Badge variant="teal">Employer Corner</Badge>
    <h1 class="text-4xl sm:text-5xl font-black text-white mt-3 mb-4">Hire Smarter, Faster</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto mb-8">Post verified jobs, search thousands of CVs, and manage your hiring — all in one place.</p>
    <div class="flex flex-wrap justify-center gap-4">
      {#if auth.isLoggedIn && auth.role === 'employer'}
        <a href="/employer/post-job" class="btn-primary text-base !py-3 !px-8">
          <Briefcase class="w-5 h-5" /> Post a Job
        </a>
        <a href="/employer/resume-search" class="bg-white/15 hover:bg-white/25 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2">
          <Search class="w-5 h-5" /> Search Resumes
        </a>
      {:else}
        <a href="/employer/register" class="btn-primary text-base !py-3 !px-8">
          <Briefcase class="w-5 h-5" /> Register Free
        </a>
        <a href="/auth/login?redirect=/employer" class="bg-white/15 hover:bg-white/25 text-white font-semibold py-3 px-8 rounded-lg transition-colors inline-flex items-center gap-2">
          Login to Dashboard
        </a>
      {/if}
    </div>
  </div>
</div>

<!-- Features -->
<section class="section-padding bg-surface">
  <div class="container-wide">
    <h2 class="text-2xl font-black text-center mb-10">Everything You Need to Hire</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each features as f}
        <Card padding="md" class="text-center">
          <div class="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4">
            <f.icon class="w-6 h-6 text-white" />
          </div>
          <h3 class="font-bold text-slate-900 mb-2">{f.title}</h3>
          <p class="text-sm text-slate-500">{f.desc}</p>
        </Card>
      {/each}
    </div>
  </div>
</section>

<!-- Steps -->
<section class="section-padding bg-white">
  <div class="container-wide">
    <h2 class="text-2xl font-black text-center mb-10">How It Works</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each steps as step, i}
        <div class="text-center relative">
          <div class="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center mx-auto mb-4 text-white font-black text-lg">{step.num}</div>
          {#if i < steps.length - 1}
            <div class="hidden lg:block absolute top-7 left-[calc(50%+2rem)] right-[-calc(50%-2rem)] h-0.5 bg-slate-100"></div>
          {/if}
          <h3 class="font-bold text-slate-900 mb-2">{step.title}</h3>
          <p class="text-sm text-slate-500">{step.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Packages preview -->
<section class="section-padding bg-surface">
  <div class="container-wide">
    <div class="text-center mb-10">
      <h2 class="text-2xl font-black mb-2">Recruitment Packages</h2>
      <p class="text-slate-500">Start free, scale when you need more.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each recruitmentPackages as pkg}
        <Card padding="md" class="flex flex-col gap-4 relative {pkg.isPopular ? 'border-2 border-brand-blue' : ''}">
          {#if pkg.isPopular}
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-blue text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Star class="w-3 h-3" /> Most Popular
            </div>
          {/if}
          <div>
            <h3 class="font-black text-slate-900 text-lg">{pkg.name}</h3>
            {#if pkg.isCustom}
              <p class="text-2xl font-black text-brand-blue mt-1">Custom</p>
            {:else}
              <p class="text-2xl font-black text-brand-blue mt-1">
                {pkg.price === 0 ? 'Free' : `₹${pkg.price.toLocaleString('en-IN')}`}
              </p>
              {#if pkg.price > 0}<p class="text-xs text-slate-400">+ GST / {pkg.validityDays} days</p>{/if}
            {/if}
          </div>
          <ul class="space-y-1.5 flex-1">
            {#each pkg.features.slice(0, 4) as f}
              <li class="flex items-start gap-2 text-xs text-slate-600">
                <CheckCircle class="w-3.5 h-3.5 text-green-500 shrink-0 mt-0.5" /> {f}
              </li>
            {/each}
          </ul>
          <a href="/employer/packages" class="btn-{pkg.isPopular ? 'primary' : 'outline'} text-sm justify-center w-full">
            {pkg.isCustom ? 'Contact Us' : 'Get Started'}
          </a>
        </Card>
      {/each}
    </div>
    <div class="text-center mt-6">
      <a href="/employer/packages" class="text-sm text-brand-blue font-semibold hover:underline flex items-center justify-center gap-1">
        Compare All Features <ArrowRight class="w-4 h-4" />
      </a>
    </div>
  </div>
</section>
