[![Android port](https://img.shields.io/badge/Ported_on-Android-brightgreen.svg)](https://github.com/xvello/salasana-android)
[![Bootstrap port](https://img.shields.io/badge/Ported_on-Bootstrap-brightgreen.svg)](https://github.com/xvello/html-password-generator)

# moz-password-generator

[Install it on addons.mozilla.org](https://addons.mozilla.org/en-US/firefox/addon/salasana-password-generator/)

This firefox extension allows you to generate site-specific password from a single master password. This avoids the hassle of remembering a unique password for each website you sign up to.

![Screenshot](https://raw.githubusercontent.com/xvello/salasana-webextension/master/screenshot.png)

## Why should I use it ?
We all have dozens (or even hundreds) of website accounts we have to remember. We are then tempted to reuse the same password for several websites. If one of them is hacked or malevolent, you risk exposing your other accounts.

## How does it work?
It mixes  together your personal master password and the website domain using a little cryptographic magic we call SHA-1. It will always get the same result if given that domain name and master password, but will never get that result if either changes. (Well, once in a few billion times it might.)

## See also

[The same algorithm in a static webpage](https://github.com/xvello/password-generator)

## Thanks

Based on [Nic Wolff's password generator](http://angel.net/~nic/passwd.current.html) version 11 apr 2014
