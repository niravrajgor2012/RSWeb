<script lang="ts">
  import { page } from '$app/state';
  import { auth } from '$lib/stores/auth.svelte.ts';
  import { ui } from '$lib/stores/ui.svelte.ts';
  import { services, serviceCategories } from '$lib/data/services.ts';
  import {
    Briefcase, Users, GraduationCap, Building2, BookOpen,
    Menu, X, ChevronDown, LogIn, LogOut, User, ChevronRight
  } from 'lucide-svelte';

  let servicesOpen = $state(false);
  let navScrolled = $state(false);
  let closeTimer: ReturnType<typeof setTimeout>;

  const grouped = $derived(
    serviceCategories.map(cat => ({
      category: cat,
      items: services.filter(s => s.category === cat)
    })).filter(g => g.items.length)
  );

  const navLinks = [
    { href: '/about',      label: 'About Us' },
    { href: '/services',   label: 'Services', hasMega: true },
    { href: '/employer',   label: 'Employers' },
    { href: '/jobseeker/jobs', label: 'Find Jobs' },
    { href: '/training',   label: 'Training' },
    { href: '/media',      label: 'Media' },
    { href: '/contact',    label: 'Contact' },
  ];

  function isActive(href: string) {
    return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
  }

  function openMenu() { clearTimeout(closeTimer); servicesOpen = true; }
  function scheduleClose() { closeTimer = setTimeout(() => servicesOpen = false, 200); }

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => { navScrolled = window.scrollY > 10; });
  }
</script>

<header class="sticky top-0 z-40 transition-shadow duration-200 {navScrolled ? 'bg-white/95 backdrop-blur shadow-md' : 'bg-white'}">
  <nav class="container-wide flex items-center justify-between h-16">
    <!-- Logo -->
    <a href="/" class="flex items-center gap-2 shrink-0">
      <div class="w-9 h-9 gradient-brand rounded-lg flex items-center justify-center text-white font-black text-lg">R²</div>
      <div class="hidden sm:block">
        <p class="font-black text-brand-navy text-lg leading-none">RSQuare</p>
        <p class="text-[10px] text-slate-500 font-medium tracking-wide">HR SOLUTIONS</p>
      </div>
    </a>

    <!-- Desktop Nav -->
    <ul class="hidden lg:flex items-center gap-1">
      {#each navLinks as link}
        <li>
          {#if link.hasMega}
            <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
            <div
              class="relative"
              onmouseenter={openMenu}
              onmouseleave={scheduleClose}
            >
              <button
                class="flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors {isActive(link.href) ? 'text-brand-blue bg-blue-50' : 'text-slate-700 hover:text-brand-blue hover:bg-slate-50'}"
                onkeydown={(e) => e.key === 'Escape' && (servicesOpen = false)}
              >
                {link.label}
                <ChevronDown class="w-3.5 h-3.5 transition-transform {servicesOpen ? 'rotate-180' : ''}" />
              </button>

              {#if servicesOpen}
                <div
                  class="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[680px] bg-white rounded-2xl border border-slate-100 card-shadow p-4"
                  onmouseenter={openMenu}
                  onmouseleave={scheduleClose}
                >
                  <div class="grid grid-cols-3 gap-2">
                    {#each grouped as group}
                      <div>
                        <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 px-2">{group.category}</p>
                        {#each group.items as svc}
                          <a
                            href="/services/{svc.slug}"
                            onclick={() => servicesOpen = false}
                            class="block px-2 py-1.5 rounded-lg text-xs text-slate-700 hover:bg-blue-50 hover:text-brand-blue transition-colors"
                          >{svc.title}</a>
                        {/each}
                      </div>
                    {/each}
                  </div>
                  <div class="mt-3 pt-3 border-t border-slate-100 flex justify-end">
                    <a href="/services" onclick={() => servicesOpen = false} class="flex items-center gap-1 text-xs font-semibold text-brand-blue hover:underline">
                      View All Services <ChevronRight class="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              {/if}
            </div>
          {:else}
            <a
              href={link.href}
              class="flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors {isActive(link.href) ? 'text-brand-blue bg-blue-50' : 'text-slate-700 hover:text-brand-blue hover:bg-slate-50'}"
            >{link.label}</a>
          {/if}
        </li>
      {/each}
    </ul>

    <!-- Right: Auth + Mobile toggle -->
    <div class="flex items-center gap-2">
      {#if auth.isLoggedIn}
        <span class="hidden sm:block text-sm text-slate-600 font-medium">Hi, {auth.name.split(' ')[0]}</span>
        <a href="/auth/logout" class="btn-ghost text-sm hidden sm:flex items-center gap-1.5">
          <LogOut class="w-4 h-4" /> Logout
        </a>
      {:else}
        <a href="/auth/login" class="btn-outline text-sm hidden sm:flex items-center gap-1.5 !py-2">
          <LogIn class="w-4 h-4" /> Login
        </a>
        <a href="/employer/register" class="btn-primary text-sm hidden md:flex items-center gap-1.5 !py-2">
          <Briefcase class="w-4 h-4" /> Post a Job
        </a>
      {/if}

      <button
        class="lg:hidden p-2 rounded-lg hover:bg-slate-100 text-slate-700"
        onclick={ui.toggleMobileMenu}
        aria-label="Toggle menu"
      >
        {#if ui.mobileMenuOpen}
          <X class="w-5 h-5" />
        {:else}
          <Menu class="w-5 h-5" />
        {/if}
      </button>
    </div>
  </nav>

  <!-- Mobile drawer -->
  {#if ui.mobileMenuOpen}
    <div class="lg:hidden border-t border-slate-100 bg-white px-4 pb-4 space-y-1">
      {#each navLinks as link}
        <a
          href={link.href}
          onclick={ui.closeMobileMenu}
          class="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium {isActive(link.href) ? 'text-brand-blue bg-blue-50' : 'text-slate-700 hover:bg-slate-50'}"
        >
          {link.label}
        </a>
      {/each}
      <div class="pt-2 border-t border-slate-100 flex flex-col gap-2">
        {#if auth.isLoggedIn}
          <a href="/auth/logout" onclick={ui.closeMobileMenu} class="btn-ghost justify-center w-full">
            <LogOut class="w-4 h-4" /> Logout
          </a>
        {:else}
          <a href="/auth/login" onclick={ui.closeMobileMenu} class="btn-outline justify-center w-full">
            <LogIn class="w-4 h-4" /> Login
          </a>
          <a href="/employer/register" onclick={ui.closeMobileMenu} class="btn-primary justify-center w-full">
            <Briefcase class="w-4 h-4" /> Post a Job
          </a>
        {/if}
      </div>
    </div>
  {/if}
</header>
