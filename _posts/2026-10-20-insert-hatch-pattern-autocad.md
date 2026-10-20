---
title: "How to Insert Hatch Pattern in AutoCAD (Step by Step)"
date: 2026-10-20
category: tech
description: "Learn how to insert a hatch pattern in AutoCAD: pick a pattern, set scale and angle, add custom PAT files and fix hatches that won't fill."
image: "/images/insert-hatch-pattern-autocad-cover.webp"
faq:
  - q: "How do I insert a hatch pattern in AutoCAD?"
    a: "Type H and press Enter, pick a pattern on the Hatch Creation tab, click inside a closed area, adjust scale and angle, then press Enter. The area must be fully enclosed or AutoCAD will not place the hatch."
  - q: "Why won't my hatch fill the area in AutoCAD?"
    a: "The boundary almost always has a tiny gap or overlapping lines. Close the gap with PEDIT or trim the corners, or raise HPGAPTOL slightly above the gap size and reset it to 0 afterwards."
  - q: "Why does my AutoCAD hatch look like a solid fill?"
    a: "The hatch scale is too small for your drawing units, so the lines pack together and merge. Select the hatch and raise the scale on the Properties panel until individual lines appear."
  - q: "How do I change the scale of a hatch after inserting it?"
    a: "Select the hatch, then change the Scale value on the Properties panel of the Hatch Editor tab. You can also edit it in the Properties palette. The pattern updates right away."
  - q: "Where do I put custom hatch pattern (PAT) files in AutoCAD?"
    a: "Save each pattern in its own PAT file named exactly like the pattern, then add that folder under Options, Files, Support File Search Path. Custom patterns then appear at the bottom of the pattern gallery."
  - q: "What is the difference between Pick Points and Select Boundary Objects?"
    a: "Pick Points fills the area enclosed by one or more objects around the spot you click. Select Boundary Objects fills a single closed object, such as a circle or closed polyline, that you select directly."
  - q: "Can I hatch an area that is not closed?"
    a: "Not normally. AutoCAD needs a closed loop, but a small gap can be allowed by setting HPGAPTOL. A hatch made this way is not tied to the original lines, so closing the gap properly is better."
---

You have drawn the outline of a slab, a wall section or a simple floor plan, and the shape still looks empty. A hatch fills that gap in seconds, but the first attempt often goes sideways: nothing fills, the lines merge into a dark block, or the pattern is so wide you can barely see it.

This guide shows how to insert a hatch pattern in AutoCAD from start to finish, how to tune it, how to add your own patterns, and how to fix the problems beginners run into most.

**Short Answer: How do you insert a hatch pattern in AutoCAD?** Type H and press Enter, choose a pattern on the Hatch Creation tab (for example ANSI31), click inside a fully closed area, change the scale and angle if the lines look too dense or too wide, then press Enter to apply it. The area has to be enclosed, or AutoCAD will not place the hatch.

Below are the full steps, plus the settings that decide whether your hatch looks right.

## What a hatch pattern is and why the area must be closed

A hatch is a repeating pattern of lines, a solid color or a gradient that stands for a material in a drawing, such as concrete, steel or earth. AutoCAD needs a boundary so it knows where the pattern stops. When you click inside an area, it searches outward from your click for objects that form a complete loop. No loop, no hatch.

A few facts worth knowing before you start:

- A single hatch object carries one pattern. Some guides say an area can only hold one hatch, but you can overlap hatches and use the DRAWORDER command to decide which one sits on top, as Autodesk's own blog notes.
- Autodesk's help also says the area you hatch has to run parallel to the flat XY surface of your active UCS, so a shape that sits at an angle to it cannot be hatched.
- Hatching is a 2D annotation job. It describes a material on your drawing and does not change the shape of anything.

If you are still getting comfortable with the basics, the [AutoCAD 2D learning guide](https://howtolearn.site/learn/how-to-learn-autocad-2d-guide/) gives you a sensible order to learn commands in.

## How to insert a hatch pattern in AutoCAD, step by step

<!-- IMAGE 1: place here. Source file: insert-hatch-pattern-autocad-step-1.webp (675 x 481) -->
![How to insert a hatch pattern in AutoCAD using the Hatch Creation tab, numbered 1 to 4](/images/insert-hatch-pattern-autocad-step-1.webp)

1. **Close your boundary.** Check that the area you want to fill is fully enclosed by lines, polylines, arcs or circles. Trying to hatch an open shape is the number one reason hatches fail.
2. **Set a layer (optional but smart).** Make a layer called Hatch and set it current. Later you can freeze or recolor every hatch in one move.
3. **Start the command.** Go to the Home tab, open the Draw panel and click Hatch, or just type H and press Enter. The Hatch Creation tab opens on the ribbon. If the ribbon is hidden, the RIBBON command brings it back.
4. **Choose the hatch type and pattern.** Make sure the hatch type is set to Pattern, then open the gallery on the Pattern panel and click a pattern. ANSI31, the evenly spaced diagonal lines, is a safe first choice.
5. **Click inside the closed area.** A preview appears right away. Pick Points is the default method, so click inside each area you want to fill.
6. **Adjust scale and angle.** Use the Properties panel while the preview is showing. More on this in the next section.
7. **Finish.** Press Enter, or click Close Hatch Creation, to apply the hatch and leave the command.

By default, a new drawing starts with ANSI31 as the current pattern in imperial templates and ANGLE in metric ones, according to Autodesk's documentation on the HPNAME variable.

### Pick Points or Select Boundary Objects?

Pick Points fills the region bounded by one or more objects around the spot you click. Select Boundary Objects fills a closed object, such as a circle, that you pick directly. Pick Points handles several objects that together make a loop. Some users report that Select Boundary Objects still works on awkward boundaries when Pick Points refuses, so it is worth trying both before you redraw anything.

## Set the hatch scale and angle

The scale is where most beginners get stuck, because the same pattern looks completely different depending on your drawing units.

**Scale** stretches or shrinks the spacing of the pattern. The default is 1, and the setting behind it is HPSCALE. In a drawing made in millimeters, a scale of 1 can pack the lines so tightly that the area turns solid. Raise it in big steps (1, 10, 100) until you see individual lines, then fine-tune.

**Angle** rotates the pattern relative to the X axis of the current UCS. Many patterns already include a built-in slant, so test the angle visually rather than guessing.

A few related options matter once you move past the first hatch:

- **Relative to paper space:** inside a layout, this option scales the pattern to your sheet, so it stays readable at any viewport scale.
- **Annotative:** makes the hatch follow the annotation scale instead of a fixed number.
- **Units check:** if your hatch size feels off by a huge factor, review your units. Our guide to [changing units in AutoCAD](https://howtolearn.site/learn/how-to-change-units-in-autocad-guide/) explains how to set them. Users on forums also point to the MEASUREMENT variable (0 for imperial, 1 for metric) as the reason a pattern arrives at the wrong size.

<!-- IMAGE 2: place here. Source file: insert-hatch-pattern-autocad-step-2.webp (675 x 481) -->
![Hatch pattern scale in AutoCAD: too small looks solid, right scale shows lines, too large looks empty](/images/insert-hatch-pattern-autocad-step-2.webp)

If you resized a drawing to match a known dimension, your hatch scale may need a second look. The article on [scaling with two reference points in AutoCAD](https://howtolearn.site/learn/how-to-scale-with-two-reference-points-in-autocad/) is a good companion when that happens.

## Edit a hatch after you insert it

You do not have to delete and redo a hatch to change it. Select the hatch and the Hatch Editor tab appears with almost the same controls as Hatch Creation. You can:

- Change the pattern, scale, angle, color or transparency.
- Switch **Associative** on or off. An associative hatch updates when you move or reshape its boundary objects (HPASSOC).
- Pick an **island detection** style. Normal turns the pattern off at an inner shape and back on inside the next one, Outer fills only the outer area, and Ignore fills straight through.
- Move the pattern start with **Set Origin**. By default the origin follows the UCS origin, which matters when tiles or bricks must line up with a wall.
- Choose whether AutoCAD keeps a separate boundary: none, a polyline or a region.
- Use **Match Properties** to copy a hatch's settings onto a new one, so several areas stay consistent. The origin is the one setting this does not copy.
- Send the hatch behind or in front of other objects with DRAWORDER.

## How to add a custom hatch pattern in AutoCAD

AutoCAD ships with a built-in set of patterns, but you can add your own from downloaded or self-written PAT files.

### Method 1: Install a PAT file

1. Keep **one pattern per file**, and make sure the file name matches the pattern name inside it exactly. A pattern named BRICKS1 lives in BRICKS1.pat.
2. Store the files in a normal local folder. Autodesk lists cloud-synced folders as a known cause of patterns not appearing.
3. Type OPTIONS, open the Files tab, expand Support File Search Path and click Add. Choose your folder. (You can also copy the files into AutoCAD's default Support folder.)
4. Restart AutoCAD if the patterns do not show up straight away.
5. Start HATCH and open the pattern gallery. Custom patterns appear at the bottom of the gallery. In the older Hatch and Gradient dialog box, set the type to Custom and pick the pattern from the palette.

Some forum users also add the folder to Trusted Folders when a pattern still refuses to load.

<!-- IMAGE 3: place here. Source file: insert-hatch-pattern-autocad-step-3.webp (675 x 481) -->
![How to add a custom hatch pattern in AutoCAD by adding a PAT folder to the support file search path](/images/insert-hatch-pattern-autocad-step-3.webp)

### Method 2: Build a one-off pattern with SuperHatch

SuperHatch is an Express Tools command that is not available in AutoCAD LT. It can turn a block or an image into a hatch-like fill, and Autodesk also points to it when a drawing uses a pattern whose PAT file is missing. Tutorial sites report that a pattern made this way stays inside that drawing and does not travel to other files. If you plan to build one from a symbol, learn [how to make a block in AutoCAD](https://howtolearn.site/learn/how-to-make-a-block-in-autocad/) first.

## Hatch not working? Quick fixes

### "Valid hatch boundary not found"

This message means AutoCAD cannot find a closed loop around your click. The cause is usually a gap too small to see, or overlapping and duplicate lines on the boundary.

<!-- IMAGE 4: place here. Source file: insert-hatch-pattern-autocad-step-4.webp (675 x 481) -->
![Valid hatch boundary not found in AutoCAD: a closed shape hatches, a shape with a small gap fails](/images/insert-hatch-pattern-autocad-step-4.webp)

- Join the boundary lines into a closed polyline with PEDIT, or run BOUNDARY to see whether a loop is detected.
- Look for stray lines on top of the border, or an arc touching a line at a tangent.
- Measure the gap with the DIST command, then set HPGAPTOL a little above that value. This variable tells AutoCAD how large a gap it may ignore. It is saved on your computer, so set it back to 0 when you finish.
- Remember that a hatch made through a gap tolerance is not tied to the original lines, and a value that is too high can give odd results.

### The hatch looks like a solid color

The scale is too small for your units. Select the hatch and raise the scale on the Properties panel until lines appear. To set the default for the next hatches, type HPSCALE and enter a new value.

### The hatch does not display or plot

Check that FILLMODE is set to 1. If only some hatches disappear, the HPMAXLINES setting, which limits the number of lines in a hatch, can be involved. Autodesk reseller support articles also suggest recreating a corrupted hatch and running AUDIT on the file.

### A custom pattern is missing from the list

Autodesk's support article lists the usual causes: the pattern was never properly added, the folder is not on the support path, the folder was renamed after being added, or it sits in a cloud drive. Also confirm that the PAT file name matches the pattern name.

## What hatching does not do

- It does not close an open shape for you. A gap tolerance can bridge tiny breaks, but the real fix is a closed boundary.
- It does not follow curved 3D surfaces. The hatch lives on the plane of the current UCS.
- It is not a block. Editing the hatch changes the pattern, while editing the boundary changes the shape it fills.
- A pattern imported through SuperHatch does not automatically become available in your other drawings.

## Habits that prevent hatch problems

- Draw boundaries as closed polylines from the start.
- Keep all hatching on its own layer.
- Set the scale once with HPSCALE before filling many areas, then use Match Properties for consistency.
- Keep a single folder for custom PAT files and never rename it without updating the support path.
- Return HPGAPTOL to 0 after every workaround.
- Zoom out fully before you click inside a large or complicated area.

As of October 2026, Autodesk's help for AutoCAD 2026 still describes the same Hatch Creation workflow covered here, so these steps apply to current releases. If you want the official reference for every option on the tab, see Autodesk's [Hatch Creation ribbon documentation](https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-LT/files/GUID-CF9C88AB-CD49-44A4-8A85-C26F60B828DA.htm). For custom patterns, Autodesk Support has a page on [installing custom hatch patterns in AutoCAD](https://autodesk.com/support/technical/article/How-to-install-custom-hatch-patterns-in-AutoCAD).

<!-- YOUTUBE: replace this link with your verified video before publishing -->
For more guidance, you can watch this video: [How to add a hatch pattern in AutoCAD](https://www.youtube.com/watch?v=REPLACE_WITH_VIDEO_ID).
