<template>
  <div class="landing bg-cream font-sans">
    <LandingNav />
    <main>
      <LandingHero />
      <LandingGames />
      <LandingDemo />
      <LandingSteps />
      <LandingPlans />
      <LandingGallery />
      <LandingQuoteForm />
    </main>
    <LandingFooter />
    <WhatsappButton />
  </div>
</template>

<script setup>
import LandingNav from '@/components/landing/LandingNav.vue'
import LandingHero from '@/components/landing/LandingHero.vue'
import LandingGames from '@/components/landing/LandingGames.vue'
import LandingDemo from '@/components/landing/LandingDemo.vue'
import LandingSteps from '@/components/landing/LandingSteps.vue'
import LandingPlans from '@/components/landing/LandingPlans.vue'
import LandingGallery from '@/components/landing/LandingGallery.vue'
import LandingQuoteForm from '@/components/landing/LandingQuoteForm.vue'
import LandingFooter from '@/components/landing/LandingFooter.vue'
import WhatsappButton from '@/components/landing/WhatsappButton.vue'
</script>
