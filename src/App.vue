<template>
  <router-view />
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>
<style>
@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-Regular.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-Regular.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-BlackItalic.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-BlackItalic.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-BlackItalic.ttf") format("truetype");
  font-weight: 900;
  font-style: italic;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-LightItalic.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-LightItalic.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-LightItalic.ttf") format("truetype");
  font-weight: 300;
  font-style: italic;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-BoldItalic.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-BoldItalic.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-BoldItalic.ttf") format("truetype");
  font-weight: bold;
  font-style: italic;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-Medium.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-Medium.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-Medium.ttf") format("truetype");
  font-weight: 500;
  font-style: normal;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-Italic.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-Italic.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-Italic.ttf") format("truetype");
  font-weight: normal;
  font-style: italic;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-MediumItalic.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-MediumItalic.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-MediumItalic.ttf") format("truetype");
  font-weight: 500;
  font-style: italic;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-Black.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-Black.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-Black.ttf") format("truetype");
  font-weight: 900;
  font-style: normal;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-Light.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-Light.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-Light.ttf") format("truetype");
  font-weight: 300;
  font-style: normal;
  text-rendering: optimizeLegibility;
}

@font-face {
  font-family: "Gramatika";
  src: url("../src/assets/fonts/Gramatika-Bold.woff2") format("woff2"),
    url("../src/assets/fonts/Gramatika-Bold.woff") format("woff"),
    url("../src/assets/fonts/Gramatika-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
  text-rendering: optimizeLegibility;
}

#app {
  font-family: "Gramatika", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

header {
  max-height: 48px;
}
</style>
