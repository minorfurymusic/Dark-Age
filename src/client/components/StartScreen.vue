<template>
<div class="dark-age-start-screen">
  <div class="dark-age-banner">
    <div class="banner-decoration banner-decoration--left"></div>
    <div class="banner-content">
      <div class="banner-title-line banner-title-line--top"></div>
      <h1 class="banner-title">DARK AGE</h1>
      <p class="banner-subtitle">Age of Conquest & Warfare</p>
      <div class="banner-title-line banner-title-line--bottom"></div>
    </div>
    <div class="banner-decoration banner-decoration--right"></div>
  </div>

  <div class="start-screen-navigation">
    <nav class="nav-section">
      <a class="nav-link nav-link--primary" href="new-game" v-i18n>
        <span class="link-icon">⚔</span>
        <span class="link-text">Start New Game</span>
      </a>
      <a class="nav-link" href="cards" target="_blank" v-i18n>
        <span class="link-icon">📜</span>
        <span class="link-text">Cards</span>
      </a>
      <a class="nav-link" href="rules" target="_blank" v-i18n>
        <span class="link-icon">⚖</span>
        <span class="link-text">Rules</span>
      </a>
      <a class="nav-link" href="about" target="_blank" v-i18n>
        <span class="link-icon">🏰</span>
        <span class="link-text">About</span>
      </a>
    </nav>

    <div class="footer-section">
      <div class="language-preferences">
        <LanguageSwitcher />
        <LanguageIcon class="lang-icon"/>
        <PreferencesIcon class="prefs-icon"/>
      </div>
      <div class="version-info">
        <span v-i18n>version</span>: {{raw_settings.head}}
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import LanguageSwitcher from '@/client/components/LanguageSwitcher.vue';
import LanguageIcon from '@/client/components/LanguageIcon.vue';
import PreferencesIcon from '@/client/components/PreferencesIcon.vue';

import raw_settings from '@/genfiles/settings.json';
import * as constants from '@/common/constants';

const previousViewport = ref('');

// Set the viewport width to width=device-width on the start screen so mobile browsers use their actual CSS viewport width.
// The current global viewport is width=1260, which prevents the home page from using the device width on phones.
// This is a temporary solution in order to make this edit scoped to the start screen.
// TODO: Once responsiveness covers the whole project, this code should be removed and the tag in index.html should be updated directly.
onMounted(() => {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport !== null) {
    previousViewport.value = viewport.getAttribute('content') ?? '';
    viewport.setAttribute(
      'content',
      'width=device-width, initial-scale=1, viewport-fit=cover',
    );
  }
});

onBeforeUnmount(() => {
  document
    .querySelector('meta[name="viewport"]')
    ?.setAttribute('content', previousViewport.value);
});

const DISCORD_INVITE = constants.DISCORD_INVITE;
</script>
