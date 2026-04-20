<script lang="ts">
  import { ExternalLink } from 'lucide-svelte';

  // Exact structure from LINK.pdf — SR | Particulars | href
  type Row = { sr: string; label: string; href: string; isSection?: boolean; isSubSection?: boolean; };

  const rows: Row[] = [
    // ── Section 1: About ─────────────────────────────────────────────────
    { sr: '1', label: 'ABOUT',               href: '/about',           isSection: true },
    { sr: '1', label: 'Introduction',        href: '/about#intro',     isSubSection: true },
    { sr: '1', label: 'Mission & Vision',    href: '/about#mission',   isSubSection: true },
    { sr: '1', label: 'Quality Policy',      href: '/about#quality',   isSubSection: true },

    // ── Section 2: Team ──────────────────────────────────────────────────
    { sr: '2', label: 'TEAM',                href: '/management',      isSection: true },
    { sr: '',  label: 'S N Rao',             href: '/management#s-n-rao', isSubSection: true },
    { sr: '',  label: 'Riddhish Rao',        href: '/management#riddhish-rao', isSubSection: true },
    { sr: '',  label: 'Resource Team',       href: '/management#resource-team', isSubSection: true },

    // ── Section 3: Services ──────────────────────────────────────────────
    { sr: '3', label: 'SERVICES',            href: '/services',        isSection: true },
    { sr: '',  label: 'Consultancy for HR Strategies, Policies & Services', href: '/services/hr-consultancy',           isSubSection: true },
    { sr: '',  label: 'Psychometric Test Services',                          href: '/services/psychometric-tests',        isSubSection: true },
    { sr: '',  label: 'Permanent Recruitment Services',                      href: '/services/permanent-recruitment',     isSubSection: true },
    { sr: '',  label: 'Recruitment Process Outsourcing',                     href: '/services/rpo',                       isSubSection: true },
    { sr: '',  label: 'Contract Staffing (Workforce Service on Outsourcing basis)', href: '/services/contract-staffing', isSubSection: true },
    { sr: '',  label: 'National Apprenticeship Training Scheme (NATS)',      href: '/services/nats',                      isSubSection: true },
    { sr: '',  label: 'National Apprenticeship Promotion Scheme (NAPS)',     href: '/services/naps',                      isSubSection: true },
    { sr: '',  label: 'Functional HR Services on Outsourcing basis',         href: '/services/functional-hr',             isSubSection: true },
    { sr: '',  label: 'Payroll Outsourcing',                                 href: '/services/payroll-outsourcing',       isSubSection: true },
    { sr: '',  label: 'Legal Compliance (HR related)',                       href: '/services/legal-compliance',          isSubSection: true },
    { sr: '',  label: 'Third Party Auditor for HR Services',                 href: '/services/third-party-auditor',       isSubSection: true },
    { sr: '',  label: 'Employment Background Verification',                  href: '/services/background-verification',   isSubSection: true },
    { sr: '',  label: 'Advisory Services on Business Reforms & Improvement', href: '/services/advisory-services',         isSubSection: true },
    { sr: '',  label: 'Training & Development',                              href: '/services/training-development',      isSubSection: true },
    { sr: '',  label: 'Training on RTI and Legal Services under RTI',        href: '/services/rti-training',              isSubSection: true },
    { sr: '',  label: 'Training on Prevention of Sexual Harassment (PoSH) Act', href: '/services/posh-training',         isSubSection: true },
    { sr: '',  label: 'Training on New Labour Codes',                        href: '/services/labour-laws-training',      isSubSection: true },
    { sr: '',  label: 'Tourism Specific Solutions & Services',               href: '/services/tourism-solutions',         isSubSection: true },
    { sr: '',  label: 'Supporting CSR Activity',                             href: '/services/csr',                       isSubSection: true },
    { sr: '',  label: 'Collaborating with various institutions',             href: '/services/institutional-collaboration', isSubSection: true },
    { sr: '',  label: 'Cultural Activities (musical programs, films, Gujarati serials, drama etc.)', href: '/services/cultural-activities', isSubSection: true },
    { sr: '',  label: 'IT Consultancy & solutions',                          href: '/services/it-consultancy',            isSubSection: true },
  ];
</script>

<svelte:head>
  <title>Sitemap – R Square HR Services</title>
</svelte:head>

<!-- Hero -->
<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <p class="text-brand-accent font-semibold uppercase tracking-widest text-sm mb-3">Navigation Index</p>
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-4">Sitemap</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto">
      A complete index of all sections and services available on the R Square HR Services website.
    </p>
  </div>
</div>

<!-- Sitemap Table -->
<section class="section-padding bg-surface">
  <div class="container-wide max-w-3xl">
    <div class="overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-white">
      <table class="w-full text-sm">
        <thead>
          <tr class="gradient-brand text-white">
            <th class="py-3 px-5 text-left font-bold w-16">SR</th>
            <th class="py-3 px-5 text-left font-bold">Particulars</th>
            <th class="py-3 px-5 text-right font-bold w-12 sr-only">Link</th>
          </tr>
        </thead>
        <tbody>
          {#each rows as row}
            <tr class="
              border-b border-slate-100 last:border-0 group
              {row.isSection
                ? 'bg-brand-light/60 hover:bg-brand-light'
                : 'bg-white hover:bg-slate-50'}
              transition-colors
            ">
              <!-- SR -->
              <td class="py-3 px-5">
                {#if row.sr}
                  <span class="
                    inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold
                    {row.isSection ? 'gradient-brand text-white' : 'bg-slate-100 text-slate-500'}
                  ">{row.sr}</span>
                {/if}
              </td>

              <!-- Label -->
              <td class="py-3 px-5">
                <a
                  href={row.href}
                  class="
                    inline-flex items-center gap-1.5 transition-colors
                    {row.isSection
                      ? 'font-bold text-brand-navy hover:text-brand-blue text-base'
                      : 'text-slate-700 hover:text-brand-blue pl-4 border-l-2 border-slate-200 hover:border-brand-blue'}
                  "
                >
                  {row.label}
                  <ExternalLink class="w-3 h-3 opacity-0 group-hover:opacity-60 shrink-0 transition-opacity" />
                </a>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <p class="text-center text-sm text-slate-400 mt-6">
      Total entries: {rows.filter(r => !r.isSection).length} pages &amp; sections across {rows.filter(r => r.isSection).length} main categories
    </p>
  </div>
</section>
