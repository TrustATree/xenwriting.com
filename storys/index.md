---
layout: home
title: "TreeXen's Storys"
hero:
  text: "TreeXen's Storys"
  tagline: "Story's written by TreeXen"

---

This is still a work in progress, But welcome to [XenWriting.com](http://xenwriting.com)!

Currently we only have [Second Hand](./second-hand/), but more should be added soon!

::: tip

**Fun fact:**

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Random Text</title>
<style>
  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    margin: 0;
    font-family: sans-serif;
    font-size: 2rem;
    text-align: center;
    background: #f5f5f5;
    color: #222;
  }
</style>
</head>
<body>

<div id="text"></div>

<script>
  const messages = [
    "Xen has played Geometry Dash for over 950 hours!",
    "Xen owns a youtube channel called Trust_A_Tree",
    "Charlie is the only Discord moderator to know Xen's real name",
    "Xen created a conlang and refuses to teach anyone",
    "You can join Xen's discord server at <a href="https://discord.com/invite/et2Yyyn62p">this link!</a>",
  ];

  const random = messages[Math.floor(Math.random() * messages.length)];
  document.getElementById("text").textContent = random;
</script>

</body>
</html>
:::
