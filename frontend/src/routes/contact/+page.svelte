<script lang="ts">
  import { ui } from '$lib/stores/ui.svelte.ts';
  import Input from '$lib/components/ui/Input.svelte';
  import Select from '$lib/components/ui/Select.svelte';
  import Textarea from '$lib/components/ui/Textarea.svelte';
  import Card from '$lib/components/ui/Card.svelte';
  import { MapPin, Phone, Mail, Clock, CheckCircle, Send } from 'lucide-svelte';
  import { services } from '$lib/data/services.ts';

  import { supabase } from '$lib/supabase.ts';
  import { page } from '$app/state';
  const preselect = page.url.searchParams.get('service') ?? '';

  let name     = $state('');
  let email    = $state('');
  let mobile   = $state('');
  let service  = $state(preselect);
  let message  = $state('');
  let sending  = $state(false);
  let sent     = $state(false);

  const serviceOptions = [
    { label: 'General Enquiry', value: '' },
    ...services.map(s => ({ label: s.title, value: s.slug }))
  ];

  async function handleSubmit(e: Event) {
    e.preventDefault();
    sending = true;
    const { error } = await supabase
      .from('contact_enquiries')
      .insert({ name, email, mobile: mobile || null, message });
    sending = false;
    if (error) {
      ui.toast(error.message ?? 'Failed to send message.', 'error');
    } else {
      sent = true;
      ui.toast("Message sent! We'll be in touch within 1 business day.", 'success');
    }
  }

  const contactDetails = [
    { icon: MapPin, label: 'Address',      value: 'Ahmedabad, Gujarat, India – 380 015' },
    { icon: Phone,  label: 'Phone',        value: '+91 98765 43210' },
    { icon: Mail,   label: 'Email',        value: 'info@rsquarehr.com' },
    { icon: Clock,  label: 'Office Hours', value: 'Mon–Sat, 9:00 AM – 6:00 PM' },
  ];
</script>

<svelte:head><title>Contact Us – RSQuare HR Solutions</title></svelte:head>

<div class="gradient-hero text-white section-padding text-center">
  <div class="container-wide">
    <h1 class="text-4xl sm:text-5xl font-black text-white mb-3">Get In Touch</h1>
    <p class="text-blue-200 text-lg max-w-xl mx-auto">
      Have a question, need a quote, or want a free consultation? We're here to help.
    </p>
  </div>
</div>

<section class="section-padding bg-surface">
  <div class="container-wide grid lg:grid-cols-5 gap-10">
    <!-- Form -->
    <div class="lg:col-span-3">
      {#if sent}
        <Card padding="lg" class="text-center">
          <div class="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <CheckCircle class="w-8 h-8 text-green-500" />
          </div>
          <h2 class="text-2xl font-black mb-2">Message Sent!</h2>
          <p class="text-slate-500 mb-6">Thank you for reaching out. Our team will respond within 1 business day.</p>
          <button onclick={() => { sent = false; name=''; email=''; mobile=''; message=''; }} class="btn-outline">Send Another Message</button>
        </Card>
      {:else}
        <Card padding="lg">
          <h2 class="text-xl font-black mb-6">Send Us a Message</h2>
          <form class="space-y-5" onsubmit={handleSubmit}>
            <div class="grid sm:grid-cols-2 gap-4">
              <Input label="Your Name" placeholder="Full name" bind:value={name} required />
              <Input label="Mobile" type="tel" placeholder="9876543210" bind:value={mobile} />
            </div>
            <Input label="Email" type="email" placeholder="you@company.com" bind:value={email} required />
            <Select label="Service / Topic" options={serviceOptions} bind:value={service} />
            <Textarea
              label="Your Message"
              placeholder="Tell us how we can help — the more detail the better!"
              bind:value={message}
              rows={5}
              maxlength={1000}
              required
            />
            <button type="submit" class="btn-primary w-full justify-center !py-3" disabled={sending}>
              {#if sending}
                <span class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              {:else}
                <Send class="w-4 h-4" />
              {/if}
              {sending ? 'Sending…' : 'Send Message'}
            </button>
          </form>
        </Card>
      {/if}
    </div>

    <!-- Sidebar -->
    <div class="lg:col-span-2 space-y-5">
      <Card padding="lg">
        <h3 class="font-bold text-slate-900 mb-5">Contact Information</h3>
        <ul class="space-y-4">
          {#each contactDetails as detail}
            <li class="flex items-start gap-3">
              <div class="w-9 h-9 rounded-lg gradient-brand flex items-center justify-center shrink-0">
                <detail.icon class="w-4 h-4 text-white" />
              </div>
              <div>
                <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{detail.label}</p>
                <p class="text-sm text-slate-700 font-medium mt-0.5">{detail.value}</p>
              </div>
            </li>
          {/each}
        </ul>
      </Card>

      <Card padding="md" class="bg-gradient-to-br from-brand-blue to-brand-teal text-white">
        <h3 class="font-bold text-white mb-2">Quick Connect</h3>
        <p class="text-sm text-blue-100 mb-4">Need urgent help? Call us directly during business hours.</p>
        <a href="tel:+919876543210" class="w-full bg-white text-brand-blue font-bold py-2.5 rounded-xl text-sm text-center block hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
          <Phone class="w-4 h-4" /> Call Now
        </a>
      </Card>

      <Card padding="md">
        <h3 class="font-bold text-slate-900 mb-3">Corporate Office</h3>
        <div class="aspect-video bg-slate-100 rounded-xl flex items-center justify-center">
          <div class="text-center">
            <MapPin class="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p class="text-xs text-slate-400">Map embed available</p>
            <p class="text-xs text-slate-400">after backend integration</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
</section>
