<script lang="ts">
  import { Target, Eye, Heart, Award, ArrowRight } from 'lucide-svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Tabs from '$lib/components/ui/Tabs.svelte';

  const tabs = [
    { label: 'Introduction', value: 'intro' },
    { label: 'Mission',      value: 'mission' },
    { label: 'Vision',       value: 'vision' },
    { label: 'Quality Policy', value: 'quality' },
  ];

  const values = [
    { icon: Heart,  title: 'People First',  desc: 'Every decision starts and ends with human impact.' },
    { icon: Award,  title: 'Excellence',    desc: 'We raise the bar on every engagement, every time.' },
    { icon: Target, title: 'Integrity',     desc: 'Transparent, ethical, and accountable — always.' },
    { icon: Eye,    title: 'Innovation',    desc: 'Embracing technology to deliver smarter HR solutions.' },
  ];
</script>

<svelte:head>
  <title>About Us – RSQuare HR Solutions</title>
</svelte:head>

<!-- Hero -->
<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <p class="text-brand-accent font-semibold uppercase tracking-widest text-sm mb-3">About RSQuare</p>
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-4">30 Years of HR Excellence</h1>
    <p class="text-blue-200 text-lg max-w-2xl mx-auto">
      Trusted by 350+ organisations across India for recruitment, compliance, training, and advisory services.
    </p>
  </div>
</div>

<!-- Content tabs -->
<section class="section-padding bg-surface">
  <div class="container-wide max-w-4xl">
    <Tabs {tabs}>
      {#snippet children(active)}
        {#if active === 'intro'}
          <Card padding="lg">
            <div class="prose max-w-none">
              <h2 class="text-2xl font-black text-brand-navy mb-4">Welcome to RSQuare HR Solutions</h2>
              <p class="text-slate-600 leading-relaxed mb-4">
                RSQuare HR Solutions was founded with a singular purpose: to make world-class HR accessible to every organisation, regardless of size. Headquartered in Ahmedabad, Gujarat, we have grown over three decades into one of India's most trusted HR consulting, recruitment, and training firms.
              </p>
              <p class="text-slate-600 leading-relaxed mb-4">
                Our team of seasoned HR professionals, legal experts, trainers, and technologists bring deep domain knowledge across industries — from manufacturing and pharma to IT, hospitality, and government sectors. We are proud partners of India's National Apprenticeship schemes (NATS and NAPS) and certified PoSH and Labour Law trainers.
              </p>
              <p class="text-slate-600 leading-relaxed mb-6">
                Beyond HR, RSQuare celebrates Gujarat's cultural heritage through support for musical programmes, films, Gujarati serials, and theatrical productions — reflecting our belief that vibrant communities make better organisations.
              </p>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {#each [['30+', 'Years Experience'], ['350+', 'Clients Served'], ['15,000+', 'Placements'], ['22', 'Services']] as [num, label]}
                  <div class="bg-brand-light rounded-xl p-4 text-center">
                    <p class="text-2xl font-black text-brand-blue">{num}</p>
                    <p class="text-xs text-slate-600 font-medium mt-1">{label}</p>
                  </div>
                {/each}
              </div>
            </div>
          </Card>

        {:else if active === 'mission'}
          <Card padding="lg">
            <div class="flex items-start gap-5 mb-6">
              <div class="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center shrink-0">
                <Target class="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 class="text-2xl font-black text-brand-navy mb-2">Our Mission</h2>
                <p class="text-brand-blue font-semibold text-lg italic">
                  "To empower organisations and individuals through innovative, ethical, and impactful HR solutions."
                </p>
              </div>
            </div>
            <div class="space-y-4 text-slate-600 leading-relaxed">
              <p>Our mission drives us to bridge the gap between talent and opportunity — helping employers find the right people, and helping individuals unlock their full potential.</p>
              <p>We are committed to simplifying complex HR challenges through technology, expertise, and a relentless focus on outcomes. Whether it's a start-up posting its first job or a listed company managing 10,000 employees, our solutions scale to fit.</p>
              <p>We also fulfil a social mission: by training fresh graduates, upskilling the workforce, and supporting apprenticeship schemes, we contribute directly to India's human capital development.</p>
            </div>
            <div class="mt-6 grid sm:grid-cols-3 gap-4">
              {#each [['For Employers', 'Reduce cost-per-hire and time-to-hire with expert recruitment and compliance support.'], ['For Job Seekers', 'Provide verified job listings, career guidance, and skill-building opportunities.'], ['For Society', 'Build a more skilled, compliant, and inclusive workforce across India.']] as [title, desc]}
                <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p class="font-bold text-slate-900 mb-1">{title}</p>
                  <p class="text-sm text-slate-500">{desc}</p>
                </div>
              {/each}
            </div>
          </Card>

        {:else if active === 'vision'}
          <Card padding="lg">
            <div class="flex items-start gap-5 mb-6">
              <div class="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center shrink-0">
                <Eye class="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 class="text-2xl font-black text-brand-navy mb-2">Our Vision</h2>
                <p class="text-brand-blue font-semibold text-lg italic">
                  "To be India's most trusted integrated HR ecosystem — connecting talent, institutions, and organisations seamlessly."
                </p>
              </div>
            </div>
            <div class="space-y-4 text-slate-600 leading-relaxed">
              <p>We envision a future where every job seeker in India — from a village in Gujarat to a metro city — has equal access to verified opportunities and career resources.</p>
              <p>We are building an ecosystem that goes beyond transactional recruitment: one where employers get lifecycle HR support, institutes plug their students into industry, and trainers reach learners wherever they are.</p>
              <p>By 2030, we aim to facilitate 1 lakh verified job placements annually and become the go-to HR technology and services partner for SMEs across tier-2 and tier-3 India.</p>
            </div>
            <div class="mt-6 p-5 rounded-xl bg-gradient-to-r from-brand-light to-cyan-50 border border-brand-accent/20">
              <p class="font-bold text-brand-navy mb-2">2030 Goals</p>
              <ul class="text-sm text-slate-600 space-y-1.5">
                {#each ['1,00,000 annual verified placements', '5,000+ verified employer partners', '50,000 trained professionals per year', 'Presence in 50+ cities across India'] as goal}
                  <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-blue shrink-0"></span>{goal}</li>
                {/each}
              </ul>
            </div>
          </Card>

        {:else if active === 'quality'}
          <Card padding="lg">
            <div class="flex items-start gap-5 mb-6">
              <div class="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center shrink-0">
                <Award class="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 class="text-2xl font-black text-brand-navy mb-2">Quality Policy</h2>
                <p class="text-brand-blue font-semibold text-lg italic">
                  "Consistent excellence through process, people, and continuous improvement."
                </p>
              </div>
            </div>
            <div class="space-y-4 text-slate-600 leading-relaxed">
              <p>RSQuare is committed to delivering services that consistently meet and exceed client expectations. Our quality framework covers every touchpoint — from the first call to final delivery.</p>
              <p>We operate under clearly defined processes, regular internal audits, and client feedback loops. Our team undergoes continuous professional development to stay ahead of regulatory changes and best practices.</p>
            </div>
            <div class="mt-6 grid sm:grid-cols-2 gap-4">
              {#each [['Client-Centric Delivery', 'Every SLA is treated as a commitment, not a target.'], ['Continuous Improvement', 'Monthly reviews identify and eliminate process gaps.'], ['Data Security', 'Candidate and employer data is handled with strict confidentiality.'], ['Regulatory Compliance', 'All services align with current Indian labour and employment law.']] as [title, desc]}
                <div class="flex gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <span class="w-2 h-2 rounded-full bg-brand-teal mt-1.5 shrink-0"></span>
                  <div>
                    <p class="font-bold text-slate-900 text-sm">{title}</p>
                    <p class="text-xs text-slate-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              {/each}
            </div>
          </Card>
        {/if}
      {/snippet}
    </Tabs>
  </div>
</section>

<!-- Values -->
<section class="section-padding bg-white">
  <div class="container-wide">
    <h2 class="text-2xl font-black text-center mb-8">Our Core Values</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {#each values as v}
        <Card padding="md" class="text-center">
          <div class="w-12 h-12 gradient-brand rounded-xl flex items-center justify-center mx-auto mb-4">
            <v.icon class="w-6 h-6 text-white" />
          </div>
          <h3 class="font-bold text-slate-900 mb-2">{v.title}</h3>
          <p class="text-sm text-slate-500">{v.desc}</p>
        </Card>
      {/each}
    </div>
  </div>
</section>
