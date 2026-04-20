<script lang="ts">
  import { Target, Eye, Heart, Award } from 'lucide-svelte';
  import { page } from '$app/stores';
  import Card from '$lib/components/ui/Card.svelte';
  import Tabs from '$lib/components/ui/Tabs.svelte';

  const tabs = [
    { label: 'Introduction',    value: 'intro' },
    { label: 'Mission & Vision', value: 'mission' },
    { label: 'Quality Policy',  value: 'quality' },
  ];

  // Allow hash-based deep-linking: /about#intro, /about#mission, /about#vision, /about#quality
  const hashMap: Record<string, string> = {
    intro: 'intro', introduction: 'intro',
    mission: 'mission', vision: 'mission',
    quality: 'quality',
  };
  let initialTab = $derived(hashMap[$page.url.hash.replace('#', '')] ?? 'intro');

  const values = [
    { icon: Heart,  title: 'People First',    desc: 'Every decision starts and ends with human impact.' },
    { icon: Award,  title: 'Excellence',      desc: 'We raise the bar on every engagement, every time.' },
    { icon: Target, title: 'Integrity',       desc: 'Transparent, ethical, and accountable — always.' },
    { icon: Eye,    title: 'Innovation',      desc: 'Embracing technology to deliver smarter HR solutions.' },
  ];
</script>

<svelte:head>
  <title>About Us – R Square HR Services</title>
</svelte:head>

<!-- Hero -->
<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <p class="text-brand-accent font-semibold uppercase tracking-widest text-sm mb-3">About R Square</p>
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-4">R Square HR Services – a company that cares</h1>
    <p class="text-blue-200 text-lg max-w-2xl mx-auto">
      An MSME company founded by Shri S N Rao — innovating HR solutions with strategy consulting and analytics since inception.
    </p>
  </div>
</div>

<!-- Content tabs -->
<section class="section-padding bg-surface">
  <div class="container-wide max-w-4xl">
    <Tabs {tabs} active={initialTab}>
      {#snippet children(active)}

        {#if active === 'intro'}
          <Card padding="lg">
            <div class="prose max-w-none">
              <h2 class="text-2xl font-black text-brand-navy mb-4">Introduction</h2>

              <p class="text-slate-600 leading-relaxed mb-4">
                We all know that Management of any organisation needs <strong>"7 Ms"</strong> like men, materials, machines, methods, morals, minutes and money to perform their functions and achieve their objectives and goals. <strong>R SQUARE HR SERVICES</strong> is known for contribution towards <em>"men, methods, morals and minutes"</em> — ultimately saving machine time, money and enhancing service and profitability.
              </p>

              <p class="text-slate-600 leading-relaxed mb-4">
                R SQUARE HR Services (R SQUARE) is an MSME company founded by <strong>Shri S N Rao, Former Head-HR of Indian Institute of Management Ahmedabad</strong> and <strong>Former Chief General Manager, The Gujarat State Civil Supplies Corporation Limited</strong>, a public sector enterprise of the Government of Gujarat. During his tenure with GSCSC, Mr. S N Rao and his team were awarded with <strong>CSI-Nihilent Award for e-Governance: 2011-12</strong>, <strong>National Award for e-Governance: 2012-13</strong>, and <strong>CSI-Nihilent Award for Supply-Logistics using Information &amp; Communication Technology: 2012-13</strong> from the Government of India.
              </p>

              <p class="text-slate-600 leading-relaxed mb-6">
                R Square is an innovator in HR solutions with strategy consulting and analytics. R Square's core focus is to support business operations of the clients to enhance their efficiency and effectiveness and in turn increase overall productivity and profit by providing all possible combinations of HR and IT solutions.
              </p>

              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {#each [['45+', 'Years Leadership Experience'], ['350+', 'Clients Served'], ['132+', 'Tourist Guides Trained'], ['22', 'Services']] as [num, label]}
                  <div class="bg-brand-light rounded-xl p-4 text-center">
                    <p class="text-2xl font-black text-brand-blue">{num}</p>
                    <p class="text-xs text-slate-600 font-medium mt-1">{label}</p>
                  </div>
                {/each}
              </div>
            </div>
          </Card>

        {:else if active === 'mission'}
          <div class="space-y-6">
            <!-- Mission -->
            <Card padding="lg">
              <div class="flex items-start gap-5 mb-6">
                <div class="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center shrink-0">
                  <Target class="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 class="text-2xl font-black text-brand-navy mb-2">Mission</h2>
                </div>
              </div>
              <div class="space-y-4 text-slate-600 leading-relaxed mb-6">
                <p>
                  R SQUARE HR promotes <strong>learning with humility, serving with dignity and growing with integrity</strong>. Members of R SQUARE HR care about customers deeply and deliver best-in-class solutions keeping the interest of all other stakeholders in mind.
                </p>
                <p>
                  R SQUARE HR will combine the power of technology with the capability of its members to deliver value to its stakeholders through rigorous execution.
                </p>
              </div>
              <div class="grid sm:grid-cols-3 gap-4">
                {#each [
                  ['Learning with Humility', 'We acknowledge there is always more to learn and approach every challenge with an open mind.'],
                  ['Serving with Dignity', 'Every client, candidate, and partner is treated with the highest respect and professionalism.'],
                  ['Growing with Integrity', 'We grow sustainably, ethically, and transparently — never compromising our core values.']
                ] as [title, desc]}
                  <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p class="font-bold text-slate-900 mb-1">{title}</p>
                    <p class="text-sm text-slate-500">{desc}</p>
                  </div>
                {/each}
              </div>
            </Card>

            <!-- Vision -->
            <Card padding="lg">
              <div class="flex items-start gap-5 mb-6">
                <div class="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center shrink-0">
                  <Eye class="w-7 h-7 text-white" />
                </div>
                <div>
                  <h2 class="text-2xl font-black text-brand-navy mb-2">Vision</h2>
                  <p class="text-brand-blue font-semibold text-lg italic">
                    "To emerge as one of the most respected HR services companies in the world anchored on the values of growth, professionalism, dignity and diversity."
                  </p>
                </div>
              </div>
              <div class="grid sm:grid-cols-4 gap-4 mt-2">
                {#each [
                  ['Growth', 'Continuously raising the bar on service quality and geographic reach.'],
                  ['Professionalism', 'Delivering every engagement with domain expertise and accountability.'],
                  ['Dignity', 'Respecting every individual — client, candidate, or partner — always.'],
                  ['Diversity', 'Embracing the full spectrum of industries, cultures, and backgrounds we serve.']
                ] as [title, desc]}
                  <div class="bg-slate-50 rounded-xl p-4 border border-slate-100">
                    <p class="font-bold text-slate-900 mb-1">{title}</p>
                    <p class="text-sm text-slate-500">{desc}</p>
                  </div>
                {/each}
              </div>
            </Card>
          </div>

        {:else if active === 'quality'}
          <Card padding="lg">
            <div class="flex items-start gap-5 mb-6">
              <div class="w-14 h-14 gradient-brand rounded-2xl flex items-center justify-center shrink-0">
                <Award class="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 class="text-2xl font-black text-brand-navy mb-2">Quality Policy</h2>
              </div>
            </div>

            <div class="p-5 rounded-xl bg-gradient-to-r from-brand-light to-cyan-50 border border-brand-accent/20 mb-6">
              <p class="text-slate-700 leading-relaxed italic">
                "We at R SQUARE HR SERVICES are committed to partner with our customers in providing reliable recruitment and staffing services and enhancing customer satisfaction of all stakeholders (clients, candidates, deputees, partners, members) in the business through continual improvement in our Quality Management System."
              </p>
            </div>

            <div class="grid sm:grid-cols-2 gap-4">
              {#each [
                ['Client-Centric Delivery', 'Every SLA is treated as a commitment — reliable service to clients, candidates, deputees, partners, and members.'],
                ['Continual Improvement', 'Our Quality Management System is continuously improved to meet and exceed stakeholder expectations.'],
                ['All Stakeholders Matter', 'Satisfaction extends beyond clients to every person involved in our service ecosystem.'],
                ['Recruitment & Staffing Focus', 'Our quality commitment is rooted in providing reliable recruitment and staffing services as our core offering.']
              ] as [title, desc]}
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
