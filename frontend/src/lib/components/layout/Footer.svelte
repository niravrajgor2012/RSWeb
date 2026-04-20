<script lang="ts">
  import { Mail, Phone, MapPin, Globe, ExternalLink } from 'lucide-svelte';

  const services = [
    { label: 'HR Consultancy',         href: '/services/hr-consultancy' },
    { label: 'Permanent Recruitment',  href: '/services/permanent-recruitment' },
    { label: 'Payroll Outsourcing',    href: '/services/payroll-outsourcing' },
    { label: 'Legal Compliance',       href: '/services/legal-compliance' },
    { label: 'Background Verification',href: '/services/background-verification' },
    { label: 'Training & Development', href: '/services/training-development' },
    { label: 'PoSH Training',          href: '/services/posh-training' },
    { label: 'IT Consultancy',         href: '/services/it-consultancy' },
  ];

  const quickLinks = [
    { label: 'About Us',          href: '/about' },
    { label: 'Management Team',   href: '/management' },
    { label: 'Post a Job',        href: '/employer/post-job' },
    { label: 'Find Jobs',         href: '/jobseeker/jobs' },
    { label: 'Training Courses',  href: '/training' },
    { label: 'Institute Corner',  href: '/institute' },
    { label: 'List of Clients',   href: '/clients' },
    { label: 'Media',             href: '/media' },
    { label: 'Sitemap',           href: '/sitemap' },
  ];

  const year = new Date().getFullYear();
</script>

<footer class="bg-brand-navy text-white">
  <div class="container-wide pt-14 pb-8">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
      <!-- Brand -->
      <div>
        <div class="flex items-center gap-2 mb-4">
          <div class="w-10 h-10 bg-white/15 rounded-xl flex items-center justify-center font-black text-xl">R²</div>
          <div>
            <p class="font-black text-lg leading-none">RSQuare</p>
            <p class="text-[10px] text-blue-300 tracking-widest font-medium">HR SOLUTIONS</p>
          </div>
        </div>
        <p class="text-sm text-blue-200 leading-relaxed mb-5">
          Your trusted partner for HR strategies, recruitment, payroll, compliance, training, and digital transformation across India.
        </p>
        <div class="flex gap-3">
          <a href="#" class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="LinkedIn"><Globe class="w-4 h-4" /></a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Social"><Globe class="w-4 h-4" /></a>
          <a href="#" class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" aria-label="Website"><Globe class="w-4 h-4" /></a>
        </div>
      </div>

      <!-- Services -->
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4">Our Services</h4>
        <ul class="space-y-2">
          {#each services as s}
            <li><a href={s.href} class="text-sm text-blue-200 hover:text-white transition-colors">{s.label}</a></li>
          {/each}
        </ul>
      </div>

      <!-- Quick Links -->
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4">Quick Links</h4>
        <ul class="space-y-2">
          {#each quickLinks as l}
            <li><a href={l.href} class="text-sm text-blue-200 hover:text-white transition-colors">{l.label}</a></li>
          {/each}
        </ul>
      </div>

      <!-- Contact -->
      <div>
        <h4 class="text-sm font-bold uppercase tracking-wider text-blue-300 mb-4">Get In Touch</h4>
        <ul class="space-y-3">
          <li class="flex gap-3">
            <MapPin class="w-4 h-4 shrink-0 text-brand-accent mt-0.5" />
            <span class="text-sm text-blue-200">Ahmedabad, Gujarat, India – 380 015</span>
          </li>
          <li class="flex gap-3">
            <Phone class="w-4 h-4 shrink-0 text-brand-accent" />
            <a href="tel:+919876543210" class="text-sm text-blue-200 hover:text-white">+91 98765 43210</a>
          </li>
          <li class="flex gap-3">
            <Mail class="w-4 h-4 shrink-0 text-brand-accent" />
            <a href="mailto:info@rsquarehr.com" class="text-sm text-blue-200 hover:text-white">info@rsquarehr.com</a>
          </li>
        </ul>
        <div class="mt-5">
          <a href="/contact" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors">
            Contact Us <ExternalLink class="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>

    <div class="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-blue-300">
      <p>© {year} RSQuare HR Solutions. All rights reserved.</p>
      <div class="flex gap-4">
        <a href="/about" class="hover:text-white">Privacy Policy</a>
        <a href="/about" class="hover:text-white">Terms of Use</a>
        <a href="/sitemap" class="hover:text-white">Sitemap</a>
      </div>
    </div>
  </div>
</footer>
