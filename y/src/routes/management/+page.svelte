<script lang="ts">
  import { leadership, resourceTeam } from '$lib/data/team.ts';
  import { Mail, Globe, Users } from 'lucide-svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';

  const deptColors: Record<string, string> = {
    'HR Solutions':        'blue',
    'Recruitment':         'teal',
    'Legal & Compliance':  'red',
    'Compliance':          'red',
    'Training & Development': 'green',
    'IT & Digital':        'navy',
    'Operations':          'orange',
  };
</script>

<svelte:head>
  <title>Management Team – RSQuare HR Solutions</title>
</svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <p class="text-brand-accent font-semibold uppercase tracking-widest text-sm mb-3">The People Behind RSQuare</p>
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-4">Our Management Team</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto">
      Experienced HR leaders, legal experts, and technologists working together to deliver excellence.
    </p>
  </div>
</div>

<!-- Leadership -->
<section class="section-padding bg-surface">
  <div class="container-wide">
    <h2 class="text-2xl font-black text-center mb-10">Leadership</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
      {#each leadership as member}
        <Card padding="lg" hover class="flex flex-col gap-5">
          <!-- Avatar -->
          <div class="flex items-center gap-4">
            <div class="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-white font-black text-2xl shrink-0">
              {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h3 class="font-black text-slate-900 text-lg">{member.name}</h3>
              <p class="text-brand-blue font-semibold text-sm">{member.designation}</p>
            </div>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
          <div class="flex gap-3 pt-2 border-t border-slate-100">
            {#if member.email}
              <a href="mailto:{member.email}" class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-blue transition-colors font-medium">
                <Mail class="w-3.5 h-3.5" /> Email
              </a>
            {/if}
            {#if member.linkedin}
              <a href={member.linkedin} class="flex items-center gap-1.5 text-xs text-slate-500 hover:text-brand-blue transition-colors font-medium">
                <Globe class="w-3.5 h-3.5" /> LinkedIn
              </a>
            {/if}
          </div>
        </Card>
      {/each}
    </div>
  </div>
</section>

<!-- Resource Team -->
<section class="section-padding bg-white">
  <div class="container-wide">
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-12 h-12 gradient-brand rounded-xl mb-4">
        <Users class="w-6 h-6 text-white" />
      </div>
      <h2 class="text-2xl font-black mb-2">Resource Team</h2>
      <p class="text-slate-500">Specialists powering every service we deliver</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {#each resourceTeam as member}
        <Card padding="md" hover class="text-center">
          <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3 font-bold text-slate-600">
            {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
          </div>
          <h4 class="font-bold text-slate-900 text-sm">{member.name}</h4>
          <p class="text-xs text-slate-500 mt-0.5 mb-2">{member.role}</p>
          <Badge variant={deptColors[member.department] as 'blue' | 'teal' | 'red' | 'green' | 'navy' | 'orange' || 'gray'} size="sm">
            {member.department}
          </Badge>
        </Card>
      {/each}
    </div>
  </div>
</section>

<!-- Join banner -->
<section class="section-padding bg-surface">
  <div class="container-wide max-w-2xl text-center">
    <h2 class="text-2xl font-black mb-3">Join Our Team</h2>
    <p class="text-slate-500 mb-6">We're always looking for passionate HR, legal, and tech professionals to grow with us.</p>
    <a href="/contact" class="btn-primary text-base !py-3 !px-8">Get in Touch</a>
  </div>
</section>
