<script setup>
import useLanguage from '@/hook/useLanguage';
import useTheme from '@/hook/useTheme';
const { theme } = useTheme();
const { lang } = useLanguage();
console.log(theme, lang);
</script>

<template>
  <main>
    HOME
  </main>
</template>
