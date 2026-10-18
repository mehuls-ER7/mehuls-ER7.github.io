---
title: "How to Convert Text to Sketch Geometry in AutoCAD"
date: 2026-10-18
category: tech
description: "Learn how to convert text to sketch geometry in AutoCAD with TXTEXP, WMFOUT/WMFIN or the PDF route, plus fixes for LT, curves and CNC."
image: "/images/convert-text-to-sketch-geometry-autocad-2.webp"
---

You typed a name, a logo or a part number into your drawing. It looks perfect on screen. Then you send it to the laser cutter, or try to extrude it, and nothing happens. The machine ignores it, or the software complains that there's no usable geometry.

Welcome to one of the most common "why won't this work?" moments in AutoCAD. The reason is simple, and so is the fix. AutoCAD text is a *label*, not a shape, and you have to convert it into lines and polylines before a CNC, a laser or an extrude command can use it. If you're still getting comfortable with the software, [is AutoCAD hard to learn?](https://howtolearn.site/learn/is-autocad-hard-to-learn-article/) will tell you this is normal.

**Short Answer: How do you convert text to sketch geometry in AutoCAD?**
In full AutoCAD, type `TXTEXP` (Express Tools, Text, Explode Text), select the text and press Enter. It becomes polylines and lines you can edit like any other geometry. In AutoCAD LT, where Express Tools aren't available, use `WMFOUT`, then `WMFIN`, then `EXPLODE`, or export a PDF with "Convert all text to geometry" and import it back. For smoother curves, use the PDF route.

That's the whole idea. Now let's choose the right method for your situation, because the "right" one depends on your AutoCAD version, your font and what you're making.

## First, What Does "Sketch Geometry" Mean in AutoCAD?

Here's a small confession about the keyword. "Sketch" is the word Fusion and Inventor use. AutoCAD doesn't have sketches in the same sense. What people usually mean by it is **plain geometry**: lines, arcs and polylines (and sometimes regions or hatches) that stand in for the shape of each letter.

So when you convert text to sketch geometry in AutoCAD, the real goal is to turn each letter into outlines you can:

- send to a CNC machine, laser or plasma cutter
- offset, trim or hatch
- extrude into 3D
- export to another program

If you're heading into Fusion or Inventor, there's a section for you near the end.

<!-- IMAGE 1: place here. Source file: text-to-geometry-step3-before-after.png -->
![Text object versus polyline outlines when you convert text to geometry in AutoCAD](/images/text-to-geometry-step3-before-after.webp)

## Before You Start: Four Quick Checks

A thirty-second check saves an hour of frustration.

1. **Are you on full AutoCAD or AutoCAD LT?** LT doesn't include Express Tools, so `TXTEXP` won't work there.
2. **Is your text TEXT or MTEXT?** Many users report better results by exploding MTEXT into plain TEXT first, then running `TXTEXP`.
3. **Which font are you using?** SHX fonts are "stick" fonts made of straight strokes, while TrueType fonts have curves. This changes the result a lot (more on that below).
4. **What's the goal?** A quick sign needs less accuracy than a CNC job where smooth curves matter.

<!-- IMAGE 2: place here. Source file: text-to-geometry-step1-which-method.png -->
![Choosing a method to convert text to geometry in AutoCAD depending on your version and goal](/images/text-to-geometry-step1-which-method.webp)

## Method 1: TXTEXP (The Quickest Way in Full AutoCAD)

This is the one most people should try first. It's the Express Tools command called Explode Text.

1. Go to the **Express Tools** tab, then **Text**, then **Explode Text**. Or just type `TXTEXP` in the command line and press Enter.
2. At **Select text to be EXPLODED**, pick your text objects and press Enter.
3. The text is converted into polylines and lines.
4. Zoom in to check the result. If the text seems to have vanished, run **Zoom Extents** (`Z`, Enter, `E`, Enter), since the converted geometry can land off screen.

A few things worth knowing:

- **TrueType text may lose true curves.** Users report that curves come out as lots of short straight segments instead of smooth arcs. That's fine for a sign, but not always for precision machining.
- **SHX fonts turn into simple lines.** That's expected, since they're stick fonts.
- **If MTEXT misbehaves,** explode it to TEXT first (`EXPLODE`), then run `TXTEXP`.

## Method 2: WMFOUT and WMFIN (The AutoCAD LT Workaround)

No Express Tools? This old trick still works in AutoCAD LT for Windows, and in full AutoCAD too. `TXTEXP` itself relies on the same WMF idea, so the results are similar.

1. **Set your text width factor to something other than exactly 1** (for example 0.999). Several users report the method fails without this, especially with TrueType text.
2. Type `WMFOUT`, select the text, and save a file.
3. Erase (or hide) the original text, or work on a copy.
4. Type `WMFIN`, pick the file you just saved and place it. Several guides insert it at **scale 2**, so check the size against the original.
5. Type `EXPLODE` and select the imported block. The text should now be lines and polylines.

Two warnings: AutoCAD LT for Mac doesn't have `WMFOUT`, and WMF generally works best with SHX text (TrueType needs the width trick above).

## Method 3: The PDF Route (Best for Smooth Curves, and LT Users)

This is the method I'd reach for when curves matter. Several users on the Autodesk forums prefer it because the outlines come out smoother, and the continuous polylines have more vertices than `TXTEXP` produces.

1. **Export to PDF** (`EXPORTPDF` or Plot to PDF). In the **PDF Options**, tick **Convert all text to geometry**.
2. Run `PDFIMPORT` and bring the PDF back in. Make sure **solid fills** are included in the import, so the letters arrive as filled shapes.
3. The letters now exist as **hatch objects**. Select a hatch.
4. Type `HATCHEDIT`, pick the hatch and choose **Recreate Boundary**, then choose **Polyline** as the object type.
5. **Erase the hatch**, keeping the new boundary polylines.

<!-- IMAGE 3: place here. Source file: text-to-geometry-step2-pdf-route.png -->
![The PDF route in AutoCAD to turn text into polylines using Recreate Boundary](/images/text-to-geometry-step2-pdf-route.webp)

It takes a few more clicks, but the result is the closest thing to a true outline. Dialog names can differ a little between AutoCAD versions, so look for the equivalent options in your PDF Options and import windows.

## Method 4: Converting Lots of Text at Once

Got 1,200 tags to engrave? Don't click each one.

- **Put the text on its own layer,** then use `SELECTSIMILAR` or a window to select all of it. Isolate the layer so you only grab text.
- **Run your chosen method on the whole selection** (for `TXTEXP`, select everything in one go).
- **For closed shapes,** some users convert to regions with `REGION` and merge them with `UNION`. That gives you solid shapes rather than open outlines.
- **A LISP routine can help in full AutoCAD.** For example, the free TXP routine explodes single-line TEXT (not MTEXT) into polylines. LISP routines of this kind generally don't run in AutoCAD LT, so check the author's notes before using one.

## Clean-Up: Making the Geometry Actually Usable

Exploding the text is only half the job. Here's what to check afterward.

- **Join broken segments.** If letters are made of many pieces, use `PEDIT`, then **Join** (or the `JOIN` command) so each outline is one continuous polyline.
- **Check for stray lines.** Some users report extra lines appearing inside letters with certain fonts. Delete them before cutting.
- **Handle letters with holes.** Letters like O, A and B have inner outlines. Make sure inner and outer outlines are both closed, especially for laser or CNC work.
- **Make it a block.** Once the lettering is clean, turn it into a reusable object. [How to make a block in AutoCAD](https://howtolearn.site/learn/how-to-make-a-block-in-autocad/) walks you through it.
- **Resize it properly.** Need the logo at an exact width? [Scaling with two reference points](https://howtolearn.site/learn/how-to-scale-with-two-reference-points-in-autocad/) is the cleanest way to do it.
- **Check your units before you export.** A CNC or laser job at the wrong scale is an expensive surprise. [How to change units in AutoCAD](https://howtolearn.site/learn/how-to-change-units-in-autocad-guide/) covers it.

And if you're building your skills from scratch, the [step-by-step AutoCAD 2D learning guide](https://howtolearn.site/learn/how-to-learn-autocad-2d-guide/) shows where tools like this fit into everyday drafting.

## Need It in Fusion or Inventor? (The Literal "Sketch Geometry")

If you want true sketch geometry inside Autodesk's 3D tools, the commands live in those programs.

- **Fusion:** inside an active sketch, right-click the text and choose **Explode Text**. The text converts to fixed sketch geometry. Autodesk notes you should finish your wording and layout first, because you can't edit it as text afterward, and that it works best with Latin fonts.
- **Inventor:** edit the sketch, right-click the text and choose **Convert to Geometry**, then pick a font. Forum answers describe the text turning into line segments you can export to DWG or DXF.

A neat workflow: convert in AutoCAD, then bring the polylines into Fusion or Inventor as part of a DWG.

## "It's Not Working!" Troubleshooting

Let's go through the usual suspects.

- **TXTEXP says it's not a valid command.** Express Tools aren't installed or loaded. If you're on LT, they never are. Use Method 2 or 3.
- **The text became a straight-line mess.** You used an SHX stick font, or `TXTEXP` turned a TrueType curve into short segments. Switch to a TrueType font, or use the PDF route for smoother curves.
- **WMFIN brought it back still "filled".** Check the width factor (not exactly 1) and remember to `EXPLODE` the imported block.
- **The text disappeared after exploding.** Run Zoom Extents. It's often just off screen.
- **MTEXT won't convert cleanly.** Explode it to TEXT first, then try again.
- **I'm on LT for Mac.** There's no `WMFOUT`, so try the PDF route, or open the DWG in a vector program and export outlines (check what your version supports).

## Habits That Save You Time

- **Do all your wording changes first.** Once text becomes geometry, you can't edit the spelling.
- **Keep a copy of the editable text.** Put it on a frozen layer, or save a separate version of the drawing.
- **Choose a fitting font.** For cutting and engraving, a clean TrueType or single-line font makes cleanup easier.
- **Test on one word first.** Check the result before you convert 1,200 tags.

<!-- YOUTUBE: replace this link with your verified video before publishing -->
For more guidance, you can watch this video: [How to convert text to geometry in AutoCAD video](https://youtu.be/Cny2cChZFms?si=oaOFHOhiwKnGN8zQ).

## Frequently Asked Questions

**Q1: What is the command to convert text to geometry in AutoCAD?**
`TXTEXP`, the Explode Text tool in Express Tools. It converts text into polylines and lines.

**Q2: How do I convert text to geometry in AutoCAD LT?**
LT doesn't include Express Tools. Use `WMFOUT`, `WMFIN` and `EXPLODE` (Windows), or export a PDF with "Convert all text to geometry", import it back, and recreate the hatch boundary as polylines.

**Q3: Why does TXTEXP turn my text into straight lines?**
SHX fonts are stick fonts made of straight strokes, and TrueType curves can become short segments. For smoother outlines, use the PDF route.

**Q4: Can I turn text into a polyline in AutoCAD?**
Yes. `TXTEXP` produces polylines, and the PDF route gives you polyline outlines through `HATCHEDIT` and Recreate Boundary.

**Q5: Can I convert text to geometry for a laser cutter or CNC?**
Yes. Convert it, join the segments, make sure inner and outer outlines are closed, check your units, and test on one word first.

**Q6: How do I convert AutoCAD text to sketch geometry in Fusion?**
In Fusion, right-click the text in an active sketch and choose Explode Text. In Inventor, right-click the sketch text and choose Convert to Geometry.

**Q7: Can I convert the geometry back into editable text?**
Not simply. Keep a copy of your original text before converting. If you only have lines, there's a PDF-based command (`PDFSHXTEXT`) that can attempt a reverse conversion for some cases, but it's far from a one-click undo.
