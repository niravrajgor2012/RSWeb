<script lang="ts">
  import SearchBar from '$lib/components/ui/SearchBar.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import Badge from '$lib/components/ui/Badge.svelte';
  import { jobCities, jobDepartments } from '$lib/data/jobs.ts';
  import { MapPin, Clock, Briefcase, Mail, Phone } from 'lucide-svelte';

  const mockCandidates = [
    { id:1, name:'Priya Sharma',    role:'React Developer',        exp:'4 years',   city:'Bengaluru', skills:['React','TypeScript','Node.js'], available:true },
    { id:2, name:'Rahul Mehta',     role:'Finance Manager',        exp:'7 years',   city:'Mumbai',    skills:['CA','Tally','GST','Reporting'], available:true },
    { id:3, name:'Kavya Nair',      role:'HR Generalist',          exp:'3 years',   city:'Pune',      skills:['Recruitment','Payroll','HRIS'], available:false },
    { id:4, name:'Amit Prajapati',  role:'Digital Marketing Exec', exp:'2 years',   city:'Ahmedabad', skills:['SEO','Google Ads','Content'],    available:true },
    { id:5, name:'Sunita Pandey',   role:'Legal Compliance Officer',exp:'6 years',  city:'Delhi',     skills:['Labour Law','Compliance','LLB'], available:true },
    { id:6, name:'Rohan Desai',     role:'Python Developer',       exp:'2 years',   city:'Hyderabad', skills:['Python','Django','SQL','Git'],   available:true },
  ];

  let query = $state('');
  let city  = $state('');
  let dept  = $state('');

  const cityOpts = [{ label: 'All Cities', value: '' }, ...jobCities.map(c => ({ label: c, value: c }))];
  const deptOpts = [{ label: 'All Depts', value: '' }, ...jobDepartments.map(d => ({ label: d, value: d }))];

  const filtered = $derived(mockCandidates.filter(c => {
    const q = query.toLowerCase();
    return (!q || c.name.toLowerCase().includes(q) || c.role.toLowerCase().includes(q) || c.skills.some(s => s.toLowerCase().includes(q)))
        && (!city || c.city === city);
  }));
</script>

<svelte:head>
  <title>Resume Search – RSQuare Employer</title>
</svelte:head>

<div class="gradient-hero text-white py-10">
  <div class="container-wide">
    <h1 class="text-3xl font-black text-white mb-4">Search Candidate Resumes</h1>
    <div class="flex flex-col sm:flex-row gap-3 max-w-2xl">
      <SearchBar value={query} placeholder="Skills, role, name..." class="flex-1" onSearch={(q) => query = q} />
      <div class="flex gap-2">
        <Select options={cityOpts} bind:value={city} class="w-36" />
        <Select options={deptOpts} bind:value={dept} class="w-36" />
      </div>
    </div>
  </div>
</div>

<div class="container-wide py-8">
  <p class="text-sm text-slate-500 mb-5">{filtered.length} candidates found</p>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    {#each filtered as c}
      <Card hover padding="md" class="flex flex-col gap-4">
        <div class="flex items-center gap-3">
          <div class="w-12 h-12 rounded-xl gradient-brand flex items-center justify-center text-white font-bold text-lg shrink-0">
            {c.name.split(' ').map(n=>n[0]).join('')}
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-bold text-slate-900 truncate">{c.name}</h3>
            <p class="text-sm text-slate-500 truncate">{c.role}</p>
          </div>
          <div class="w-2.5 h-2.5 rounded-full shrink-0 {c.available ? 'bg-green-400' : 'bg-slate-300'}" title={c.available ? 'Available' : 'Not Looking'}></div>
        </div>
        <div class="flex flex-wrap gap-1.5">
          {#each c.skills as skill}
            <Badge variant="blue" size="sm">{skill}</Badge>
          {/each}
        </div>
        <div class="flex items-center gap-3 text-xs text-slate-500">
          <span class="flex items-center gap-1"><Clock class="w-3 h-3" />{c.exp}</span>
          <span class="flex items-center gap-1"><MapPin class="w-3 h-3" />{c.city}</span>
        </div>
        <div class="flex gap-2 pt-2 border-t border-slate-50">
          <button class="btn-primary text-xs flex-1 !py-2 justify-center">View CV</button>
          <button class="btn-outline text-xs flex-1 !py-2 justify-center">Contact</button>
        </div>
      </Card>
    {/each}
  </div>
  <div class="mt-8 p-5 rounded-xl bg-brand-light border border-brand-accent/20 text-center">
    <p class="text-sm font-semibold text-brand-navy">Unlock full access to 28,000+ resumes</p>
    <p class="text-xs text-slate-500 mt-1 mb-3">Upgrade to Standard or Premium to view contact details and download CVs.</p>
    <a href="/employer/packages" class="btn-primary text-sm">View Packages</a>
  </div>
</div>
