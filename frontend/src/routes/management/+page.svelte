<script lang="ts">
  import { leadership, resourceTeam } from '$lib/data/team.ts';
  import { Mail, Globe, Users, Briefcase, Award, BookOpen, Star } from 'lucide-svelte';
  import Card from '$lib/components/ui/Card.svelte';
</script>

<svelte:head>
  <title>Management Team – R Square HR Services</title>
</svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <p class="text-brand-accent font-semibold uppercase tracking-widest text-sm mb-3">The People Behind R Square</p>
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-4">Our Management Team</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto">
      Experienced HR leaders, business analysts, and technology professionals working together to deliver excellence.
    </p>
  </div>
</div>

<!-- Leadership -->
<section id="leadership" class="section-padding bg-surface">
  <div class="container-wide">
    <h2 class="text-2xl font-black text-center mb-10">Leadership</h2>
    <div class="space-y-10 max-w-4xl mx-auto">
      {#each leadership as member}
        <div id={member.name.toLowerCase().replace(/\s+/g, '-')}>
        <Card padding="lg">
          <!-- Header -->
          <div class="flex items-start gap-5 mb-6">
            <div class="w-20 h-20 rounded-2xl gradient-brand flex items-center justify-center text-white font-black text-2xl shrink-0">
              {member.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            <div>
              <h3 class="font-black text-slate-900 text-xl">{member.name}</h3>
              <p class="text-brand-blue font-semibold text-sm mt-0.5">{member.designation}</p>
              <div class="flex gap-3 mt-2">
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
            </div>
          </div>

          <!-- Roles -->
          <div class="mb-5">
            <div class="flex items-center gap-2 mb-3">
              <Briefcase class="w-4 h-4 text-brand-blue shrink-0" />
              <h4 class="font-bold text-slate-800 text-sm uppercase tracking-wide">Positions & Affiliations</h4>
            </div>
            <ul class="space-y-1.5 pl-1">
              {#each member.roles as role}
                <li class="flex items-start gap-2 text-sm text-slate-600">
                  <span class="w-1.5 h-1.5 rounded-full bg-brand-teal mt-1.5 shrink-0"></span>
                  {role}
                </li>
              {/each}
            </ul>
          </div>

          <!-- Bio -->
          <p class="text-slate-600 leading-relaxed text-sm mb-5">{member.bio}</p>

          <!-- Education -->
          {#if member.education}
            <div class="mb-5 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div class="flex items-center gap-2 mb-2">
                <BookOpen class="w-4 h-4 text-brand-blue shrink-0" />
                <h4 class="font-bold text-slate-800 text-sm">Education & Credentials</h4>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed">{member.education}</p>
            </div>
          {/if}

          <!-- Expertise -->
          {#if member.expertise && member.expertise.length}
            <div class="mb-5">
              <div class="flex items-center gap-2 mb-3">
                <Star class="w-4 h-4 text-brand-blue shrink-0" />
                <h4 class="font-bold text-slate-800 text-sm uppercase tracking-wide">Areas of Expertise (45+ Years)</h4>
              </div>
              <ul class="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-1">
                {#each member.expertise as item}
                  <li class="flex items-start gap-2 text-sm text-slate-600">
                    <span class="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Achievements -->
          {#if member.achievements && member.achievements.length}
            <div class="mb-5">
              <div class="flex items-center gap-2 mb-3">
                <Award class="w-4 h-4 text-brand-blue shrink-0" />
                <h4 class="font-bold text-slate-800 text-sm uppercase tracking-wide">Key Achievements</h4>
              </div>
              <ul class="space-y-1.5 pl-1">
                {#each member.achievements as item}
                  <li class="flex items-start gap-2 text-sm text-slate-600">
                    <span class="w-1.5 h-1.5 rounded-full bg-brand-blue mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}

          <!-- Personal Note -->
          {#if member.personalNote}
            <p class="text-sm text-slate-500 italic border-t border-slate-100 pt-4 mt-2">{member.personalNote}</p>
          {/if}
        </Card>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- Resource Team -->
<section id="resource-team" class="section-padding bg-white">
  <div class="container-wide">
    <div class="text-center mb-10">
      <div class="inline-flex items-center justify-center w-12 h-12 gradient-brand rounded-xl mb-4">
        <Users class="w-6 h-6 text-white" />
      </div>
      <h2 class="text-2xl font-black mb-2">Resource Team</h2>
      <p class="text-slate-500">Qualified specialists working behind the scenes across functional areas</p>
    </div>

    <div class="max-w-2xl mx-auto">
      <div class="overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm">
          <thead>
            <tr class="gradient-brand text-white">
              <th class="py-3 px-5 text-left font-bold w-12">Sr.</th>
              <th class="py-3 px-5 text-left font-bold">Area</th>
              <th class="py-3 px-5 text-right font-bold w-20">Nos.</th>
            </tr>
          </thead>
          <tbody>
            {#each resourceTeam as dept, i}
              <tr class="{i % 2 === 0 ? 'bg-white' : 'bg-slate-50'} border-b border-slate-100 last:border-0 hover:bg-brand-light/40 transition-colors">
                <td class="py-3 px-5 text-slate-400 font-medium">{i + 1}</td>
                <td class="py-3 px-5 text-slate-700 font-medium">{dept.area}</td>
                <td class="py-3 px-5 text-right">
                  <span class="inline-flex items-center justify-center w-8 h-8 rounded-lg gradient-brand text-white text-xs font-bold">
                    {dept.nos}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
          <tfoot>
            <tr class="bg-slate-50 border-t-2 border-slate-200">
              <td colspan="2" class="py-3 px-5 font-bold text-slate-800">Total Resource Strength</td>
              <td class="py-3 px-5 text-right">
                <span class="inline-flex items-center justify-center w-10 h-8 rounded-lg bg-brand-navy text-white text-xs font-bold">
                  {resourceTeam.reduce((s, d) => s + d.nos, 0)}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</section>

<!-- Join banner -->
<section class="section-padding bg-surface">
  <div class="container-wide max-w-2xl text-center">
    <h2 class="text-2xl font-black mb-3">Join Our Team</h2>
    <p class="text-slate-500 mb-6">We're always looking for passionate HR, legal, and technology professionals to grow with us.</p>
    <a href="/contact" class="btn-primary text-base !py-3 !px-8">Get in Touch</a>
  </div>
</section>
