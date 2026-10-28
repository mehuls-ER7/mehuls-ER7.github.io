---
layout: post
title: "Regex Tester: Test Regular Expressions Online, Free, With Explanations"
date: 2026-10-28
category: tech
description: "Free regex tester that runs in your browser: test patterns, see matches highlighted, inspect capture groups and preview replacements. No signup."
permalink: /tools/regex-tester/
faq:
  - q: "What is a regex tester?"
    a: "A regex tester is a tool that lets you type a regular expression and immediately see which parts of a test text match it. Instead of running code to check a pattern, you get live feedback: matches highlighted, capture groups listed, and errors shown the moment the pattern breaks."
  - q: "Which regex flavour does this regex tester use?"
    a: "JavaScript, the same engine that runs in every browser and in Node.js. Patterns that work here will work in JavaScript code. Patterns written for Python or PCRE mostly work too, but a few features differ, such as lookbehind support in older browsers and some escape sequences."
  - q: "What do the regex flags g, i, m and s mean?"
    a: "The g flag finds every match instead of stopping at the first. The i flag ignores upper and lower case. The m flag makes ^ and $ match the start and end of each line instead of the whole text. The s flag lets the dot match newlines as well as other characters."
  - q: "Why does my regex match only part of the text?"
    a: "Usually because the pattern has no anchors. A pattern like \\d+ finds digits anywhere, so it matches inside a longer string. Add ^ at the start and $ at the end, as in ^\\d+$, when you want the whole string to match and nothing else."
  - q: "Why is my regex slow or freezing the page?"
    a: "That is usually catastrophic backtracking: a pattern with nested quantifiers, such as (a+)+, can try an enormous number of combinations on a long input. Shorten the test text, simplify the pattern, or make a quantifier lazy by adding ?, as in +? instead of +."
  - q: "Can I use this regex tester to validate email addresses?"
    a: "For a rough check, yes, and the pattern library below includes a simple email pattern. For real validation, no single regex proves an address is deliverable, and the only fully correct check is sending a confirmation email. Use regex to catch typos, not to prove an address exists."
  - q: "Is my pattern or test text sent to a server?"
    a: "No. Everything on this page runs in your browser using its built-in JavaScript engine. Nothing you type leaves your device, there is no signup, and there is nothing to install."
---

A regular expression looks like keyboard noise until you can see what it actually grabs. This regex tester is the page to keep open while you learn: type a pattern, watch the matches light up in your test text, and read exactly which part of the pattern did what.

**Short Answer: How do you test a regex?** Type the pattern without surrounding slashes, paste in test text that includes both things that should match and things that should not, and turn on the g flag so you see every match instead of just the first. Check the match list for positions and capture groups, and test the edge cases, empty input, extra spaces, and a near-miss, before you trust the pattern in real code.

<div id="regex-tester-tool" style="border:1px solid #ccc;border-radius:8px;padding:16px;margin:24px 0;">
<p><strong>Pattern</strong> (JavaScript regex, no surrounding slashes needed)</p>
<p><input id="rx-pattern" type="text" value="(\d{4})-(\d{2})-(\d{2})" style="width:100%;padding:8px;font-family:monospace;" placeholder="e.g. (\d{4})-(\d{2})-(\d{2})"></p>
<p>
<label><input id="rx-g" type="checkbox" checked> g (all matches)</label>
<label><input id="rx-i" type="checkbox"> i (ignore case)</label>
<label><input id="rx-m" type="checkbox"> m (multiline)</label>
<label><input id="rx-s" type="checkbox"> s (dot matches newline)</label>
<label><input id="rx-u" type="checkbox"> u (unicode)</label>
</p>
<p><strong>Test text</strong></p>
<p><textarea id="rx-text" rows="5" style="width:100%;padding:8px;font-family:monospace;">Order shipped 2026-03-15 and returned 2026-04-02. Call 555-0123 for help.</textarea></p>
<p><strong>Try a pattern:</strong>
<button type="button" onclick="rxLoad('email')">Email</button>
<button type="button" onclick="rxLoad('url')">URL</button>
<button type="button" onclick="rxLoad('date')">Date</button>
<button type="button" onclick="rxLoad('phone')">Phone</button>
<button type="button" onclick="rxLoad('ipv4')">IPv4</button>
<button type="button" onclick="rxLoad('hex')">Hex colour</button>
</p>
<p id="rx-error" style="color:#b00020;font-weight:bold;"></p>
<p><strong>Highlighted matches</strong></p>
<div id="rx-highlight" style="white-space:pre-wrap;border:1px solid #ddd;border-radius:4px;padding:12px;font-family:monospace;"></div>
<p><strong>Match details</strong></p>
<div id="rx-matches"></div>
<p><strong>Replace preview</strong> (use $1, $2, $&amp; for the whole match, $&lt;name&gt; for named groups)</p>
<p><input id="rx-replace" type="text" value="$3/$2/$1" style="width:100%;padding:8px;font-family:monospace;" placeholder="Replacement, e.g. $3/$2/$1"></p>
<div id="rx-replaced" style="white-space:pre-wrap;border:1px solid #ddd;border-radius:4px;padding:12px;font-family:monospace;"></div>
<p><strong>Pattern breakdown</strong></p>
<div id="rx-breakdown"></div>
<p style="font-size:0.9em;">Tip: keep your test text under a few thousand characters. Very long text plus a pattern with nested quantifiers can slow the page down.</p>
</div>
<script>
var rxLibrary = {
  email: { pattern: "[\\w.+-]+@[\\w-]+\\.[a-zA-Z]{2,}", text: "Contact ada@example.com or bob@test.org, but not plain-address or jane@.com.", replace: "[$&]" },
  url: { pattern: "https?://[^\\s]+", text: "Visit https://example.com/guide or http://old-site.test/page for details.", replace: "[$&]" },
  date: { pattern: "(\\d{4})-(\\d{2})-(\\d{2})", text: "Order shipped 2026-03-15 and returned 2026-04-02.", replace: "$3/$2/$1" },
  phone: { pattern: "\\d{3}-\\d{4}", text: "Call 555-0123 or 555-9876 for help.", replace: "($&)" },
  ipv4: { pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", text: "Server at 192.168.1.1, backup at 10.0.0.25, not 999.999.999.999.", replace: "[$&]" },
  hex: { pattern: "#[0-9a-fA-F]{6}\\b", text: "Brand colours: #1a73e8 and #ff6600, but #12345 is too short.", replace: "[$&]" }
};
function rxEscape(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function rxLoad(name) {
  var item = rxLibrary[name];
  if (!item) return;
  document.getElementById("rx-pattern").value = item.pattern;
  document.getElementById("rx-text").value = item.text;
  document.getElementById("rx-replace").value = item.replace;
  document.getElementById("rx-g").checked = true;
  rxRun();
}
function rxTokenLines(pattern) {
  var found = [];
  var tokens = [
    ["\\d", "digit (0-9)"], ["\\D", "any character except a digit"], ["\\w", "word character (letter, digit or underscore)"],
    ["\\W", "any character except a word character"], ["\\s", "whitespace (space, tab or newline)"], ["\\S", "any character except whitespace"],
    ["\\b", "word boundary"], ["\\B", "not a word boundary"], [".", "any character except a newline (or including newline with the s flag)"],
    ["*", "zero or more of the previous item"], ["+", "one or more of the previous item"], ["?", "zero or one of the previous item, or makes the previous quantifier lazy"],
    ["^", "start of the text (or start of a line with the m flag)"], ["$", "end of the text (or end of a line with the m flag)"],
    ["|", "either the part on the left or the part on the right"], ["(", "starts a group (captures unless it begins with ?:)"],
    ["[", "starts a character class: one of the listed characters (or none of them if it starts with ^)"]
  ];
  tokens.forEach(function (t) {
    if (pattern.indexOf(t[0]) !== -1) found.push(t[0] + " means " + t[1] + ".");
  });
  var m = pattern.match(/\{(\d+)(,(\d*))?\}/);
  if (m) found.push("{n,m} means repeat the previous item a set number of times.");
  return found;
}
function rxRun() {
  var pattern = document.getElementById("rx-pattern").value;
  var text = document.getElementById("rx-text").value;
  var flags = "";
  if (document.getElementById("rx-g").checked) flags += "g";
  if (document.getElementById("rx-i").checked) flags += "i";
  if (document.getElementById("rx-m").checked) flags += "m";
  if (document.getElementById("rx-s").checked) flags += "s";
  if (document.getElementById("rx-u").checked) flags += "u";
  var err = document.getElementById("rx-error");
  var hi = document.getElementById("rx-highlight");
  var list = document.getElementById("rx-matches");
  var repOut = document.getElementById("rx-replaced");
  var brk = document.getElementById("rx-breakdown");
  err.textContent = "";
  if (!pattern) { hi.textContent = "Type a pattern above."; list.textContent = ""; repOut.textContent = ""; brk.textContent = ""; return; }
  if (text.length > 5000) { err.textContent = "Test text is over 5,000 characters; please shorten it."; return; }
  var re;
  try { re = new RegExp(pattern, flags); } catch (e) { err.textContent = "Invalid pattern: " + e.message; hi.textContent = ""; list.textContent = ""; repOut.textContent = ""; brk.textContent = ""; return; }
  var html = "", last = 0, matches = [], count = 0, m;
  var reGlobal = new RegExp(pattern, flags.indexOf("g") === -1 ? flags + "g" : flags);
  while ((m = reGlobal.exec(text)) !== null) {
    count++;
    if (count > 200) { err.textContent = "Showing the first 200 matches only."; break; }
    matches.push(m);
    html += rxEscape(text.slice(last, m.index)) + "<mark>" + rxEscape(m[0]) + "</mark>";
    last = m.index + m[0].length;
    if (m[0].length === 0) reGlobal.lastIndex++;
  }
  html += rxEscape(text.slice(last));
  hi.innerHTML = html || rxEscape(text);
  if (matches.length === 0) { list.innerHTML = "<p>No matches. Try removing an anchor, or check whether a character needs escaping.</p>"; }
  else {
    var out = "<ol>";
    matches.forEach(function (mm, i) {
      out += "<li>Match " + (i + 1) + ": \"" + rxEscape(mm[0]) + "\" at index " + mm.index + " to " + (mm.index + mm[0].length);
      for (var g = 1; g < mm.length; g++) { out += "<br>Group " + g + ": " + (mm[g] === undefined ? "(did not participate)" : "\"" + rxEscape(mm[g]) + "\""); }
      if (mm.groups) { Object.keys(mm.groups).forEach(function (k) { out += "<br>Named group " + k + ": \"" + rxEscape(mm.groups[k]) + "\""; }); }
      out += "</li>";
    });
    out += "</ol>";
    list.innerHTML = out;
  }
  try { repOut.textContent = text.replace(re, document.getElementById("rx-replace").value); }
  catch (e) { repOut.textContent = "Replace preview failed: " + e.message; }
  var lines = rxTokenLines(pattern);
  brk.innerHTML = lines.length ? "<ul><li>" + lines.join("</li><li>") + "</li></ul>" : "<p>No common tokens detected yet; the cheat sheet below explains the full set.</p>";
}
["rx-pattern", "rx-text", "rx-replace"].forEach(function (id) { document.getElementById(id).addEventListener("input", rxRun); });
["rx-g", "rx-i", "rx-m", "rx-s", "rx-u"].forEach(function (id) { document.getElementById(id).addEventListener("change", rxRun); });
rxRun();
</script>

## How to use this regex tester

Start with the pattern field. Type just the pattern, no surrounding slashes and no quotes. The tester adds the flags you tick, so `/\d+/g` in code becomes the pattern `\d+` with the g box ticked here.

Paste test text that does two jobs at once: it should contain things that must match, and things that must not. A pattern that matches your one happy example but also matches garbage is not finished. The classic beginner test set is a correct input, an empty input, an input with extra spaces, and one near-miss, such as an email without the dot or a date in the wrong order.

Read the match list, not just the highlights. Highlights show you what matched; the list shows you where, and which capture group caught which part. When a pattern has groups, such as `(\d{4})-(\d{2})-(\d{2})` for a date, the groups are what your code will actually use, so check them before you copy the pattern anywhere.

Finally, use the replace preview to build find-and-replace rules. The replacement `$3/$2/$1` on a `YYYY-MM-DD` date turns `2026-03-15` into `15/03/2026`, and `$&` inserts the whole match, which is handy for wrapping matches in brackets or quotes.

## The flags, explained with examples

Flags change what the same pattern does, so they are worth learning before anything else. The g flag is the one beginners forget most: without it, only the first match is found, and a pattern that looks broken is often just missing g. The i flag makes `cat` match `CAT` and `Cat` as well, which is what you want for user input but not for case-sensitive codes.

The m flag matters when your text has several lines. Without it, `^` means the very start of the whole text; with it, `^` means the start of any line, so `^\d+` finds a number at the start of each line. The s flag is the partner to the dot: normally `.` matches everything except a newline, so a pattern spanning lines fails silently; s lets the dot match newlines too. The u flag turns on full Unicode handling, which matters for characters outside basic Latin and for `\p{...}` properties in modern browsers.

## Regex cheat sheet: the tokens you will reach for most

| Pattern | Means | Example |
| `.` | Any character except newline | `a.c` matches "abc" |
| `\d` | Digit (0–9) | `\d+` matches "42" |
| `\w` | Word character: letters, digits, underscore | `\w+` matches "hello" |
| `\s` | Whitespace: space, tab, newline | `\s+` matches spaces |
| `*` `+` `?` | Zero or more / one or more / optional | `ab?` matches "a" or "ab" |
| `{n,m}` | Between n and m times | `\d{3,4}` matches "1234" |
| `^` `$` | Start / end of text (of each line with m) | `^Hi` matches "Hi there" |
| `[abc]` `[^abc]` | Any of / none of these characters | `[aeiou]` matches a vowel |
| `(...)` | Capture group | `(\d+)-(\d+)` captures "2026-10" |
| `(?:...)` | Group without capturing | `(?:ab)+` matches "abab" |
| `\|` | Either side | `cat\|dog` matches "dog" |
| `\b` | Word boundary | `\bcat\b` matches "cat", not "cats" |
| `\.` | A literal dot (escape special characters) | `\.` matches "." only |

Two tokens deserve a warning each. The dot is greedy about what it is not: `.` never matches a newline unless you add s, so a pattern that works on one line can fail on a paragraph. And `*` and `+` are greedy by default, they take as much as they can, so `".*"` on `"a" and "b"` matches the whole `"a" and "b"` instead of each quoted piece; add `?` to make them lazy, as in `".*?"`, when you want the shortest match.

## Common patterns, and when not to trust them

The pattern library above covers the six patterns people search for most. Each one comes with a limit you should know before using it. The email pattern, `[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}`, catches ordinary addresses and rejects obvious non-addresses, but it is deliberately simple: real email addresses allow quoted parts and unusual characters that this pattern rejects, and it cannot tell you whether an address actually exists. The URL pattern, `https?://[^\s]+`, grabs a link from text but will also grab trailing punctuation, so trim `.,;` from the end in code.

The IPv4 pattern, `\b(?:\d{1,3}\.){3}\d{1,3}\b`, is a shape check, not a validity check: it happily accepts `999.999.999.999`, because checking each number is 0–255 needs a much longer pattern or a check in code. That is a general lesson worth carrying into every pattern: regex is excellent for shape, and poor for meaning. Dates, numbers in range, and addresses that exist are all jobs for code after the regex, not for the regex alone.

## Five mistakes beginners make

First, forgetting anchors when validating. A pattern meant to accept only digits, `\d+`, will accept `abc123` because it finds digits somewhere inside; validation almost always wants `^\d+$`. Second, forgetting to escape the dot: `example.com` as a pattern matches `exampleXcom` too, because an unescaped dot means any character; write `example\.com`.

Third, greedy quantifiers, covered above: when a match is longer than expected, try the lazy version first. Fourth, testing only the happy path. A pattern is only done when it rejects the near-misses, so always paste in the input that should fail. Fifth, writing one giant pattern for a job that wants two steps: split the text, then validate each piece. A pattern you can read next month beats a clever one you cannot.

## JavaScript flavour: what transfers and what does not

This tester uses JavaScript's engine, so a pattern that works here works in browser code and in Node.js unchanged. Most patterns written for Python or PCRE transfer directly, but watch three differences. Lookbehind, `(?<=...)` and `(?<!...)`, works in modern browsers but not in older ones, so a pattern using it may fail for some visitors. Named groups, `(?<year>\d{4})`, need ES2018 or later, which is fine in any current browser. And `\d` with the u flag handles Unicode digits differently from plain `\d`, so test with real input in the language your users actually type.

For the full official reference, [MDN's JavaScript regular expressions guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions) documents every feature and flag with examples, and it is the page to keep beside this tester once you move past the basics.

## Why this tester is different from the big ones

The well-known testers are excellent tools for people who already know regex. They assume you know what a capture group is and why a pattern backtracks. This page is built the other way round: it is a learning tool first, with the tester inside a guide, a pattern library for the patterns people actually need, a breakdown of what each token in your pattern means, and the mistakes explained before you make them. If you are learning regex rather than debugging a pattern you already wrote, start here, and graduate to the pro tools when this one feels too simple.

If you are building a learning habit around a new skill, the [step-by-step guide to learning anything quickly](https://howtolearn.site/learn/how-to-learn-anything-quickly/) covers the same loop this page uses: try something small, get immediate feedback, fix the miss, and repeat. For the full list of topics on this site, see the [topics page](https://howtolearn.site/topics/), and the [homepage](https://howtolearn.site/) always carries the newest guides.
