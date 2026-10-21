---
title: "How to Change Image Resolution in AutoCAD (Google Earth + LISP)"
date: 2026-10-21
category: tech
description: "How to change image resolution in AutoCAD for map captures and Google Earth images, including a short LISP routine that sets Fine resolution for you."
image: "/images/autocad-google-earth-image-resolution-lisp-cover.webp"
faq:
  - q: "How do I change image resolution in AutoCAD for a map image?"
    a: "Click the map image border, open the Map Image tab, and choose a preset from the Map Image Resolution flyout in the Properties panel. The presets are Coarse, Optimal, Fine and Very Fine. You must be signed in to your Autodesk account."
  - q: "Can AutoLISP change the resolution of a GEOMAPIMAGE?"
    a: "Yes. Users report that setpropertyvalue on the map image entity's Resolution property works, with 1 meaning Optimal and 2 meaning Fine. Run it right after the capture, and test on a copy of your drawing first."
  - q: "Does AutoCAD use Google Earth imagery for its online map?"
    a: "No. The GEOMAP command offers Esri and Bing map styles. A Google Earth picture reaches AutoCAD as a file you save from Google Earth Pro, or through a third-party add-on that reads Google Earth data."
  - q: "Why does my AutoCAD map image look blurry even on Very Fine?"
    a: "The captured pixels come from the zoom level showing when you captured, and the source imagery has its own limit. Zoom in before capturing, capture only the area you need, and make separate captures for very different drawing scales."
  - q: "What resolution should I save from Google Earth Pro for AutoCAD?"
    a: "Save the largest size your workflow accepts. If you import with a .geprint file through Spatial Manager, pick a 16:9 preset up to 8K UHD with Google Earth maximized, and avoid the Maximum option, which that vendor says cannot be imported."
  - q: "Does Optimize and Reload undo my Fine setting?"
    a: "Yes, according to Autodesk forum users. Optimize and Reload resets the map image to the Optimal resolution, while Reload Only refreshes the image data and keeps the resolution you chose."
  - q: "Will the online map or my captured map image plot?"
    a: "The live online map does not print. To plot imagery, capture the area as a map image object, then turn the online map off before plotting, since forum answers say an active map can trigger a plot error."
---

You zoom in on a site image and the roads dissolve into soft, blocky smears. Annoying, right? Take a breath: how to change image resolution in AutoCAD depends on where the picture came from. A map capture has a resolution setting you can flip by hand or with LISP, while a Google Earth picture is locked the moment you save it. Let's work out which one you have.

**Short Answer: How do you change image resolution in AutoCAD for map and Google Earth images?** For a captured map image, click its border, open the Map Image tab and pick Fine or Very Fine in the Map Image Resolution flyout, or set the Resolution property with AutoLISP. For a Google Earth picture, resolution is fixed when you save it, so recapture it larger in Google Earth Pro.

The details below cover both routes, plus the reasons a "Very Fine" image can still look soft.

## Which kind of image are you actually dealing with?

The phrase "Google Earth image in AutoCAD" hides three different situations, and each one is fixed in a different place.

| Where the picture came from | Can AutoCAD change its resolution? | Where to fix it |
|---|---|---|
| A map capture made with GEOMAPIMAGE | Yes, four presets | The ribbon or LISP |
| A file saved from Google Earth Pro and inserted as a raster image | No, the pixels are set when you save | Google Earth Pro |
| An add-on import that reads a .geprint file | Set before saving in Google Earth | Google Earth Pro |

One detail trips people up: AutoCAD's own online map (the GEOMAP command) offers Esri and Bing styles, not Google Earth. So a true Google Earth picture always arrives as a saved file or through an add-on.

## How to change image resolution in AutoCAD map images

This is the fast route, and it needs no code. You must be signed in to your Autodesk account, because the map image tools only work online. Here is the flow:

1. Capture the map with the Capture Area or Capture Viewport button on the Geolocation tab (the GEOMAPIMAGE command). This turns the live map into an image object sitting in your drawing.
2. Click the border of that map image. A Map Image contextual tab appears on the ribbon.
3. In the Properties panel, open the Map Image Resolution flyout.
4. Choose Coarse, Optimal, Fine or Very Fine.

<!-- IMAGE 1: place here. Source file: autocad-google-earth-image-resolution-lisp-step-1.webp (675 x 481) -->
![Illustration of the Map Image tab and the Map Image Resolution flyout used to change image resolution in AutoCAD](/images/autocad-google-earth-image-resolution-lisp-step-1.webp)

New captures start at Optimal. When you move up to Fine, expect labels on road maps to shrink even though your zoom hasn't changed, because the image now holds more pixels per drawing unit. That's normal, and it's a handy way to confirm the change actually happened.

### Reload Only versus Optimize and Reload

Sooner or later you'll refresh the image with GEOMAPIMAGEUPDATE, or with Reload Image on the ribbon. You get two choices, and they behave differently. Reload Only pulls fresh imagery and keeps your resolution. Optimize and Reload resets the image to the Optimal resolution for on-screen viewing, so your Fine setting quietly disappears. If you refresh often, choose Reload Only. Autodesk documents the optimize option in its [GEOMAPIMAGEUPDATE help page](https://help.autodesk.com/cloudhelp/2025/ENU/AutoCAD-LT/files/GUID-79DFA423-8546-4DD4-9A23-1C0F0B9DF607.htm).

## Change image resolution with LISP

If you capture maps often, clicking through the ribbon gets old fast. A forum thread on this exact problem found that the map image object exposes a Resolution property you can read and write with getpropertyvalue and setpropertyvalue. Users report 1 for Optimal and 2 for Fine. Treat those two numbers as the only confirmed values.

Here is a small routine that sets every map image in the drawing to Fine:

```lisp
(defun c:MAPFINE ( / ss i)
  (if (setq ss (ssget "_X" '((0 . "GEOMAPIMAGE"))))
    (progn
      (setq i 0)
      (repeat (sslength ss)
        (setpropertyvalue (ssname ss i) "Resolution" 2)
        (setq i (1+ i)))
      (princ (strcat "\n" (itoa (sslength ss)) " map image(s) set to Fine.")))
    (princ "\nNo map images found."))
  (princ))
```

Want Very Fine or Coarse? Don't guess the numbers. Set the value by hand from the flyout, then run this reader to see what AutoCAD reports:

```lisp
(defun c:MAPRESCHECK ( / ss i)
  (if (setq ss (ssget "_X" '((0 . "GEOMAPIMAGE"))))
    (progn
      (setq i 0)
      (repeat (sslength ss)
        (princ (strcat "\nMap image " (itoa (1+ i)) ": Resolution = "
                       (vl-princ-to-string (getpropertyvalue (ssname ss i) "Resolution"))))
        (setq i (1+ i))))
    (princ "\nNo map images found."))
  (princ))
```

<!-- IMAGE 2: place here. Source file: autocad-google-earth-image-resolution-lisp-step-2.webp (675 x 481) -->
![Command line illustration showing a LISP routine that sets map image resolution in AutoCAD](/images/autocad-google-earth-image-resolution-lisp-step-2.webp)

Save both routines in a .lsp file, load it with APPLOAD, and try it on a copy of your drawing first. If you build your own capture routine, the forum's tip is to call setpropertyvalue on the last created entity immediately after the capture, rather than hunting for the object afterward.

## Getting a sharper Google Earth image into AutoCAD

Now the other half of the keyword. Google Earth pictures don't have a resolution dial inside AutoCAD, so the work happens before the image ever reaches your drawing. Google's help page for [saving a map image](https://support.google.com/earth/answer/148146?hl=en) covers the basics in Google Earth Pro:

1. Open Google Earth Pro and frame the site.
2. Go to File, then Save, then Save Image (the shortcut Ctrl+Alt+S brings up the same toolbar).
3. Use Map Options to switch off anything you don't want burned into the picture.
4. Pick the resolution, then save.

<!-- IMAGE 3: place here. Source file: autocad-google-earth-image-resolution-lisp-step-3.webp (675 x 481) -->
![Illustration of the Google Earth Pro Save Image toolbar with the resolution setting for an AutoCAD base map](/images/autocad-google-earth-image-resolution-lisp-step-3.webp)

Once the picture is inside your drawing, it still has to be set to real-world size. Our guide on [how to scale with two reference points in AutoCAD](https://howtolearn.site/learn/how-to-scale-with-two-reference-points-in-autocad/) walks through that step, and it helps to set your drawing units first with [this units guide](https://howtolearn.site/learn/how-to-change-units-in-autocad-guide/).

Which resolution should you choose? Sources disagree, and the honest answer is "it depends on how you import". General advice says to use Maximum, which one forum answer describes as stretching the longer side to 4,800 pixels. Spatial Manager, an add-on vendor, says the opposite for .geprint imports: choose a 16:9 preset up to 8K UHD with Google Earth maximized, and skip Maximum because the variable proportions can't be read. If you insert the file by hand, Maximum is fine. If an add-on reads the georeference file, follow that add-on's rule.

Two more notes. Saving images this way is a Google Earth Pro desktop feature, and Spatial Manager says its import method doesn't work with the web or mobile apps. And for a large site, one image rarely holds enough detail. Users report better results by saving the area in several sections and placing each one, since every section carries its own full set of pixels. If you try that with a georeferencing add-on, keep the same eye altitude for every capture and pan instead of zooming.

## Why a Very Fine image can still look blurry

This is the question behind most "my resolution setting doesn't work" posts. The setting controls how the captured image is stored, not how much detail exists in the first place.

An experienced forum contributor explained it well: AutoCAD's online map is a stack of image tiles, and each capture grabs whatever tiles are showing at the zoom level you happen to be at. Capture a wide area and you get a wide, low-detail picture. Zoom in first and the same number of pixels now cover a smaller area, so it looks much sharper. A Google Earth help thread makes the same point from the other direction: a saved image can never be clearer than the photo it was taken from.

So the practical rules are simple:

- Zoom in to the detail level you need before you capture.
- Capture only the area you actually need.
- For drawings at very different scales, such as 1:1 and 1:100, make two captures and keep them on separate layers.

<!-- IMAGE 4: place here. Source file: autocad-google-earth-image-resolution-lisp-step-4.webp (675 x 481) -->
![Diagram showing why the same pixel count gives sharper detail when you zoom in before capturing in AutoCAD](/images/autocad-google-earth-image-resolution-lisp-step-4.webp)

## It's not working! Common problems

### My LISP can't find the map image

Map images are awkward objects. Forum users found that picking one with entsel returns nil, and that a selection set built inside a loaded .lsp file sometimes came back empty even though the same call worked typed at the command line. The reported workaround is to send the selection command through the active document using vla-sendcommand. These threads date from 2018, so test on your version.

### The resolution keeps resetting

Check how you refresh. As covered above, Optimize and Reload returns the image to Optimal. Switch to Reload Only.

### Bing options are missing

This one appeared with the AutoCAD 2026 release. Autodesk says Bing layers were missing from the Geolocation ribbon in AutoCAD and Civil 3D 2026, and recommends the 2026.0.1 or later update. CAD Forum, a community run by an Autodesk partner, also relays Microsoft's announced end date for Bing Maps of June 2028 and suggests Esri or OpenStreetMap for drawings that must last. Treat that date as reported, not guaranteed.

### The map won't plot

The live online map is shown on screen but does not print. Capture the area as a map image object so it becomes real drawing content. Forum answers add that an active map in any viewport can trigger a plot error, so turn the map off after capturing.

### My Google Earth image imports at the wrong scale

When an add-on reads a .geprint file, a Google Earth window that isn't maximized can make the scale calculation fail, according to the vendor. Maximize the window before saving.

## What changing the resolution cannot do

It can't add detail that the source never had. It won't make the live map printable. And it won't turn a low-quality aerial into a survey-grade one; Autodesk community experts point people toward their own drone imagery or third-party services when the free imagery isn't good enough.

You may also run into a free utility called GEarth on CAD Forum, a VLX LISP file based on community code. Its listing describes it as linking a georeferenced DWG with the Google Earth window, so it helps you navigate, not change resolution.

## Habits that keep your base maps sharp

New to the software overall? Start with the [AutoCAD 2D learning guide](https://howtolearn.site/learn/how-to-learn-autocad-2d-guide/), then come back to these habits.

- Decide your drawing scale first, then capture at a zoom level that suits it.
- Keep one capture per scale, each on its own layer.
- Refresh with Reload Only unless you want Optimal back.
- Save Google Earth images at the largest size your import method accepts.
- Watch file sizes, because very large images can slow a drawing down.

For more guidance, you can watch this video: [Adding a Google Earth Image to AutoCAD (and Georeferencing)](https://www.youtube.com/watch?v=l8SJkCdbmrg).
