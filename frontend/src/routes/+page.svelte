<script lang="ts">
  import { Briefcase, Users, Building2, GraduationCap, ArrowRight, Search, MapPin, CheckCircle, Star, TrendingUp, Shield, Zap } from 'lucide-svelte';
  import { jobs } from '$lib/data/jobs.ts';
  import { services } from '$lib/data/services.ts';
  import { clients } from '$lib/data/clients.ts';
  import { announcements } from '$lib/data/media.ts';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  const featuredJobs = jobs.filter(j => j.isFeatured).slice(0, 6);
  const topServices = services.slice(0, 6);
  const latestAnnouncement = announcements.find(a => a.isPinned);

  const stats = [
    { label: 'Job Openings',   value: '1,200+', icon: Briefcase,  color: 'text-brand-blue' },
    { label: 'Companies',      value: '350+',   icon: Building2,  color: 'text-brand-teal' },
    { label: 'Job Seekers',    value: '28,000+',icon: Users,      color: 'text-purple-500' },
    { label: 'Placements',     value: '15,000+',icon: CheckCircle,color: 'text-green-500' },
  ];

  const portals = [
    { title: 'Employer', desc: 'Post jobs, search resumes & manage your hiring', href: '/employer', icon: Building2, color: 'bg-blue-600', badge: 'Free to Start' },
    { title: 'Job Seeker', desc: 'Browse 1,200+ jobs by type, city, skill & more', href: '/jobseeker/jobs', icon: Briefcase, color: 'bg-teal-600', badge: 'No Registration Required' },
    { title: 'Institute', desc: 'Connect industry with your students & alumni', href: '/institute', icon: GraduationCap, color: 'bg-purple-600', badge: 'Free Profile' },
    { title: 'Training', desc: 'Webinars, workshops, online & offline courses', href: '/training', icon: TrendingUp, color: 'bg-orange-500', badge: 'Live Now' },
  ];

  const whyUs = [
    { icon: Shield, title: 'Verified Employers', desc: 'Every employer is KYC verified before listing jobs.' },
    { icon: Zap,    title: 'Apply in 60 Seconds', desc: 'One-click apply with your saved profile and CV.' },
    { icon: Star,   title: '30 Years Expertise',  desc: 'Backed by RSQuare\'s three decades of HR excellence.' },
    { icon: Users,  title: 'End-to-End HR',       desc: 'From hiring to payroll to compliance — one partner.' },
  ];

  let searchQuery = $state('');
  let searchCity  = $state('');
</script>

<svelte:head>
  <title>RSQuare HR Solutions – India's Trusted Job Portal</title>
</svelte:head>

<!-- ANNOUNCEMENT BANNER -->
{#if latestAnnouncement}
  <div class="bg-brand-blue text-white text-center py-2.5 px-4 text-sm font-medium">
    <span class="mr-2 font-bold">📢</span>
    {latestAnnouncement.title}
    <a href="/media/announcements" class="underline ml-2 opacity-90 hover:opacity-100">View Details →</a>
  </div>
{/if}

<!-- HERO -->
<section class="gradient-hero text-white relative overflow-hidden">
  <div class="absolute inset-0 opacity-10">
    <div class="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
    <div class="absolute bottom-10 right-10 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
  </div>

  <div class="container-wide relative section-padding text-center">
    <div class="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
      <span class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
      1,200+ active job openings today
    </div>

    <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black mb-5 max-w-3xl mx-auto leading-tight text-white">
      Find Your <span class="text-brand-accent">Dream Job</span><br/>or Hire the Best Talent
    </h1>
    <p class="text-lg text-blue-100 mb-10 max-w-xl mx-auto">
      RSQuare HR Solutions connects job seekers, employers, and training institutes across India.
    </p>

    <!-- Search Bar -->
    <div class="bg-white rounded-2xl p-2 max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 card-shadow">
      <div class="flex-1 flex items-center gap-2 px-3">
        <Search class="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text" placeholder="Job title, skill, or company..."
          bind:value={searchQuery}
          class="w-full text-slate-900 text-sm py-2 outline-none placeholder:text-slate-400"
        />
      </div>
      <div class="w-px bg-slate-200 hidden sm:block self-stretch"></div>
      <div class="flex items-center gap-2 px-3">
        <MapPin class="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text" placeholder="City or 'Remote'"
          bind:value={searchCity}
          class="w-full sm:w-32 text-slate-900 text-sm py-2 outline-none placeholder:text-slate-400"
        />
      </div>
      <!-- <a href="/jobseeker/jobs?q={encodeURIComponent(searchQuery)}&city={encodeURIComponent(searchCity)}"
        class="btn-primary !py-3 !px-6 shrink-0">
        Search Jobs
      </a> -->
      <a href="#" class="btn-primary !py-3 !px-6 shrink-0">
        Search Jobs
      </a>
    </div>

    <!-- Quick chips -->
    <div class="flex flex-wrap justify-center gap-2 mt-5 text-sm">
      <span class="text-blue-200">Popular:</span>
      {#each ['Full Time', 'Work From Home', 'Fresher', 'IT', 'Finance', 'Ahmedabad'] as tag}
        <a href="/jobseeker/jobs?q={encodeURIComponent(tag)}"
           class="bg-white/15 hover:bg-white/25 rounded-full px-3 py-1 text-white transition-colors">{tag}</a>
      {/each}
    </div>
  </div>
</section>

<!-- STATS -->
<section class="bg-white border-b border-slate-100">
  <div class="container-wide py-8">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
      {#each stats as stat}
        <div class="text-center">
          <div class="flex justify-center mb-2">
            <stat.icon class="w-7 h-7 {stat.color}" />
          </div>
          <p class="text-2xl font-black text-slate-900">{stat.value}</p>
          <p class="text-sm text-slate-500 font-medium">{stat.label}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- PORTALS -->
<section class="section-padding bg-surface">
  <div class="container-wide">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-black mb-3">Choose Your Portal</h2>
      <p class="text-slate-500 max-w-md mx-auto">One platform, four powerful corners — built for every stakeholder.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each portals as portal}
        <a href={portal.href} class="group">
          <Card hover padding="lg" class="h-full flex flex-col gap-4">
            <div class="{portal.color} w-12 h-12 rounded-xl flex items-center justify-center text-white">
              <portal.icon class="w-6 h-6" />
            </div>
            <div class="flex-1">
              <div class="flex items-center gap-2 mb-1">
                <h3 class="font-bold text-slate-900">{portal.title}</h3>
                <Badge variant="teal" size="sm">{portal.badge}</Badge>
              </div>
              <p class="text-sm text-slate-500">{portal.desc}</p>
            </div>
            <div class="flex items-center gap-1 text-brand-blue text-sm font-semibold group-hover:gap-2 transition-all">
              Enter <ArrowRight class="w-4 h-4" />
            </div>
          </Card>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- FEATURED JOBS -->
<section class="section-padding bg-white">
  <div class="container-wide">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-black mb-1">Featured Jobs</h2>
        <p class="text-slate-500">Hand-picked opportunities from verified employers</p>
      </div>
      <a href="/jobseeker/jobs" class="btn-outline text-sm hidden sm:flex">View All Jobs <ArrowRight class="w-4 h-4" /></a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each featuredJobs as job}
        <a href="/jobseeker/jobs/{job.id}">
          <Card hover padding="md" class="h-full flex flex-col gap-3">
            <div class="flex items-start justify-between gap-2">
              <div class="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-sm shrink-0">
                {job.companyName.slice(0, 2).toUpperCase()}
              </div>
              <Badge variant={job.jobType === 'Overseas' ? 'orange' : job.jobType === 'Work From Home' ? 'teal' : 'blue'}>
                {job.jobType}
              </Badge>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 leading-snug">{job.title}</h3>
              <p class="text-sm text-slate-500 mt-0.5">{job.companyName} · {job.city}</p>
            </div>
            <div class="flex flex-wrap gap-1.5 mt-auto">
              {#each job.skills.slice(0, 3) as skill}
                <Badge variant="gray" size="sm">{skill}</Badge>
              {/each}
            </div>
            <div class="flex items-center justify-between pt-2 border-t border-slate-50 text-xs text-slate-400">
              <span>{job.experience}</span>
              {#if job.salaryMin}
                <span class="font-semibold text-green-600">₹{(job.salaryMin / 100000).toFixed(0)}–{(job.salaryMax! / 100000).toFixed(0)} LPA</span>
              {/if}
            </div>
          </Card>
        </a>
      {/each}
    </div>

    <div class="mt-6 text-center sm:hidden">
      <a href="/jobseeker/jobs" class="btn-outline">View All Jobs <ArrowRight class="w-4 h-4" /></a>
    </div>
  </div>
</section>

<!-- SERVICES -->
<section class="section-padding bg-surface">
  <div class="container-wide">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h2 class="text-3xl font-black mb-1">Our Services</h2>
        <p class="text-slate-500">22 specialised HR & business services</p>
      </div>
      <a href="/services" class="btn-outline text-sm hidden sm:flex">All Services <ArrowRight class="w-4 h-4" /></a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {#each topServices as svc}
        <a href="/services/{svc.slug}">
          <Card hover padding="md" class="flex gap-4 items-start h-full">
            <div class="w-10 h-10 rounded-xl bg-brand-light flex items-center justify-center shrink-0 text-brand-blue">
              <Briefcase class="w-5 h-5" />
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm leading-snug mb-1">{svc.title}</h3>
              <p class="text-xs text-slate-500 leading-relaxed">{svc.shortDesc}</p>
            </div>
          </Card>
        </a>
      {/each}
    </div>
    <div class="mt-6 text-center sm:hidden">
      <a href="/services" class="btn-outline">All Services <ArrowRight class="w-4 h-4" /></a>
    </div>
  </div>
</section>

<!-- WHY RSQUARE -->
<section class="section-padding gradient-brand text-white">
  <div class="container-wide">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-black text-white mb-3">Why RSQuare?</h2>
      <p class="text-blue-200 max-w-md mx-auto">Three decades of trust, technology, and transformation.</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {#each whyUs as item}
        <div class="bg-white/10 rounded-2xl p-6 backdrop-blur-sm text-center">
          <div class="w-12 h-12 bg-white/15 rounded-xl flex items-center justify-center mx-auto mb-4">
            <item.icon class="w-6 h-6 text-white" />
          </div>
          <h3 class="font-bold text-white mb-2">{item.title}</h3>
          <p class="text-sm text-blue-200">{item.desc}</p>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CLIENTS MARQUEE -->
<section class="py-10 bg-white border-t border-slate-100 overflow-hidden">
  <div class="container-wide mb-6 text-center">
    <p class="text-sm font-semibold text-slate-400 uppercase tracking-widest">Trusted by Leading Organisations</p>
  </div>
  <div class="flex gap-8 overflow-hidden">
    <div class="flex gap-8 animate-marquee shrink-0">
      {#each [...clients, ...clients] as c}
        <div class="shrink-0 px-5 py-3 rounded-xl border border-slate-100 bg-slate-50 text-sm font-semibold text-slate-500 hover:border-brand-blue hover:text-brand-blue transition-colors whitespace-nowrap">
          {c.name}
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- CTA -->
<section class="section-padding bg-surface">
  <div class="container-wide text-center">
    <h2 class="text-3xl font-black mb-3">Ready to Get Started?</h2>
    <p class="text-slate-500 mb-8 max-w-md mx-auto">Join thousands of employers and job seekers who trust RSQuare every day.</p>
    <div class="flex flex-wrap justify-center gap-4">
      <a href="/employer/register" class="btn-primary text-base !py-3 !px-8">
        <Building2 class="w-5 h-5" /> Post a Job Free
      </a>
      <a href="/jobseeker/jobs" class="btn-outline text-base !py-3 !px-8">
        <Search class="w-5 h-5" /> Browse Jobs
      </a>
    </div>
  </div>
</section>

<style>
  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
</style>
