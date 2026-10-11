---
title: "How to Change Units in AutoCAD"
date: 2026-10-10
category: tech
description: "Learn how to change units in AutoCAD with UNITS, -DWGUNITS and DIMSTYLE, plus scale factors and fixes for drawings that didn't resize."
image: "/images/change-units-autocad2d.webp"
---

You open a drawing, measure a standard doorway, and AutoCAD tells you it's 900 inches wide. Or maybe it's the other way round: you drop a manufacturer's block into your floor plan and it explodes to the size of a city block. I've seen this happen to students, site engineers and even seasoned drafters, and every single time the first reaction is the same: "What did I break?"

Nothing. Relax. You haven't broken anything, you've just run into the units system, which is confusing the first time you meet it. If you're still finding your feet in the software, [is AutoCAD hard to learn?](https://howtolearn.site/learn/is-autocad-hard-to-learn-article/) will tell you this kind of confusion is completely normal.

**Short Answer: How do you change units in AutoCAD?**
Type `UN` (or `UNITS`) and press Enter. In the Drawing Units window, pick the length **Type** and **Precision**, choose your target under **Units to scale inserted content**, and click **OK**. But that only changes settings, not the size of what you've already drawn. To convert existing geometry (say, inches to millimeters), type `-DWGUNITS` instead and answer **Yes** when it asks to scale objects in the current drawing.

That last sentence is where most guides stop, and it's exactly where most people get burned. So let's slow down and do this properly, whether you want to change the measurement units in AutoCAD for a fresh drawing or fix one that's already half finished.

## First, a Little Secret About AutoCAD Units

Here's the thing nobody tells beginners: AutoCAD doesn't really care whether "1" means a millimeter, an inch or a mile. A line that's 1 unit long is just 1 unit long. The "unit" is a promise *you* make. In a millimeter drawing, a 1-meter wall is 1000 units. In a meter drawing, the same wall is 1.

The problem starts when a drawing's units, a block's units and your dimension style all disagree about that promise. That's why there isn't one single answer to how to change units in AutoCAD. There are three settings, and each one does a different job.

<!-- IMAGE 1: place here. Source file: units-step1-three-unit-types.png -->
![The three unit settings in AutoCAD: UNITS, -DWGUNITS and DIMSTYLE](/images/units-step1-three-unit-types.png)

- **`UNITS`:** sets how lengths and angles are displayed, and the insertion units used when you bring in blocks and Xrefs. It does **not** resize what's already drawn.
- **`-DWGUNITS`:** changes the drawing's units and can rescale everything already in the drawing.
- **`DIMSTYLE`:** controls only how numbers look on your dimensions, not the geometry underneath.

Keep that cheat sheet in your head and the rest of this guide will make sense.

## Method 1: Change Units with the UNITS Command

Use this when you're starting a new drawing or want incoming blocks to scale correctly. It's the answer to "how to change autocad measurement unit settings" for a drawing that's still empty.

1. **Type `UN`** in the command line and press Enter. The Drawing Units window opens.
2. Under **Length**, choose a **Type**: Decimal, Architectural, Engineering or Fractional. Decimal suits metric work, and Architectural gives you feet and fractional inches.
3. Set the **Precision**, for example `0.00` for general drafting.
4. In **Units to scale inserted content**, choose your target: Inches, Millimeters, Meters and so on.
5. Under **Angle**, leave Decimal Degrees unless your office standard says otherwise.
6. Click **OK**.

<!-- IMAGE 2: place here. Source file: units-step2-units-dialog.png -->
![AutoCAD Drawing Units dialog showing how to change units](/images/units-step2-units-dialog.png)

What step 4 really does: if your drawing is in inches and you insert a block defined in millimeters, AutoCAD scales the block down so it fits, by a factor of about **0.03937** (that's 1 divided by 25.4). A block going the other way gets scaled up by 25.4.

Now the catch. Draw a line, change the units and measure it with `DIST`: nothing has moved. `UNITS` changes the settings, not your geometry. If the drawing already exists, keep reading.

## Method 2: Convert an Existing Drawing with -DWGUNITS

This is the method that answers the question most people are really asking. Say you have a finished drawing in inches and the client wants millimeters. Don't rescale it by hand. Use **`-DWGUNITS`**, and type the hyphen, because without it the command opens a different thing.

Autodesk's own support page lists this as the preferred method for converting drawing units, so you're in good company.

**Save a copy first.** Scaling a whole drawing is easy to do and annoying to untangle.

1. Type **`-DWGUNITS`** and press Enter.
2. At the first prompt, type the number for your target unit: **1** Inches, **2** Feet, **3** Millimeters, **4** Centimeters, **5** Decimeters, **6** Meters.
3. Press Enter to accept the display format and the precision.
4. **Scale objects from other drawings upon insert?** Answer **Yes**.
5. **Match INSUNITS to drawing units?** Answer **Yes**.
6. **Scale objects in current drawing to reflect change in units?** Answer **Yes**. This is the prompt that actually resizes your drawing. Say No and your lines stay exactly as they were.
7. **Include objects in Paper Space?** This one depends on your layouts. If they still hold content in the old units, say Yes. Then open a layout tab and check it. If your title block got scaled by mistake, press `UNDO` and run the command again with No.

<!-- IMAGE 3: place here. Source file: units-step3-dwgunits-prompts.png -->
![The -DWGUNITS command prompts in AutoCAD with the key scaling prompt highlighted](/images/units-step3-dwgunits-prompts.png)

If your drawing seems to vanish afterwards, don't panic. Type `Z`, Enter, `E`, Enter (Zoom Extents) and it'll reappear.

A couple of gotchas worth knowing:

- Run `-DWGUNITS` in the **drawing**, not inside a block. If a block keeps coming in at the wrong size, fix the units in the block's own source drawing.
- Autodesk notes that `-DWGUNITS` can convert plain AutoCAD objects like lines and arcs, but it isn't suited to specialized AutoCAD Plant 3D components.

## Method 3: Use the SCALE Command with a Conversion Factor

Sometimes you want full control, or `-DWGUNITS` isn't an option. Autodesk lists `SCALE` as another way to convert units, and it's simple.

1. First set the new units with `UN` (Method 1).
2. Type `SCALE` and press Enter.
3. At **Select objects**, type `ALL` and press Enter.
4. Pick `0,0` as the base point.
5. Enter the factor from the table below.

<!-- IMAGE 4: place here. Source file: units-step4-scale-factors.png -->
![Scale factors for converting units in AutoCAD with the SCALE command](/images/units-step4-scale-factors.png)

In short: inches to millimeters is **25.4**, millimeters to inches is **0.03937**, feet to meters is **0.3048**, and meters to millimeters is **1000**.

One thing the quick tutorials skip. After scaling, check your **text height, dimension arrowheads and hatch scale**. Autodesk specifically recommends adjusting dimension text and arrowhead height in the dimension style when you use this method.

## Method 4: Insert the Old Drawing into a New One

Another route is to start a fresh drawing in the target units (use `UN` to set them), then bring the old drawing in with `INSERT` (it's `CLASSICINSERT` in AutoCAD 2020 and newer). Insert it at scale 1 and rotation 0 and let AutoCAD handle the conversion using the units of both files.

This works best when the source drawing's units are set correctly. If it's set to *Unitless*, AutoCAD has nothing to compare against and won't scale it.

## Method 5: Change How Dimensions Display (DIMSTYLE)

Sometimes your geometry is perfect but the dimension text is in the wrong format, like `18.5"` when you wanted `1'-6 1/2"`. That's a dimension style problem, not a units problem.

1. Type `D` and press Enter (that's `DIMSTYLE`).
2. Pick your active style and click **Modify**.
3. Open the **Primary Units** tab.
4. Choose a **Unit format** and **Precision**.
5. Leave the measurement **Scale factor** at **1.0** for normal 1:1 work in Model Space.
6. For dual dimensions, such as inches with millimeters beside them, open the **Alternate Units** tab, tick **Display alternate units**, and use a multiplier of **25.4**.
7. Click **OK**, then **Close**.

## "It Still Looks Wrong!" Troubleshooting

Let's go through the usual suspects.

- **I changed the units and nothing resized.** That's expected from `UNITS`. Use `-DWGUNITS` and say Yes to scaling the current drawing, or use `SCALE`.
- **Inserted blocks are 25.4 times too big or too small.** The block's units and your drawing's units don't match. Open the block's source drawing, set its units correctly with `UN`, and insert it again.
- **A block won't scale at all.** Its source units may be set to *Unitless*. Set them in the source drawing.
- **My dimensions show the wrong format.** Open `DIMSTYLE`, go to Primary Units, and change the unit format.
- **Dimension values look doubled or halved.** Check the measurement scale factor in Primary Units. It should usually be 1.
- **My layout or title block went odd.** That's the Paper Space prompt. Press `UNDO` and rerun `-DWGUNITS` with the other answer.

## Habits That Save You Next Time

The best way to get units right is to not have to fix them.

- **Start every project in the correct units.** Use a template set up for millimeters, meters or inches before you draw the first line.
- **Don't switch units halfway through a project.** If you must, work on a copy.
- **Agree on units with your team and your clients up front.** It's far cheaper than fixing a finished drawing.
- **Set the units on your block library once.** Then every block you insert scales correctly.

If you're building your skills step by step, the [AutoCAD 2D learning guide](https://howtolearn.site/learn/how-to-learn-autocad-2d-guide/) shows where units fit into a real workflow. And if you work on site or earthworks drawings, where a units mix-up gets expensive fast, the [cut and fill in AutoCAD guide](https://howtolearn.site/learn/cut-and-fill-autocad-guide/) is a natural next read.

<!-- YOUTUBE: verify this link before publishing, or replace it with your own video -->
For more guidance, you can watch this video: [How to change units in AutoCAD video](https://www.youtube.com/watch?v=s9S6sE53Ibc).

## Frequently Asked Questions

**Q1: What is the command to change units in AutoCAD?**
`UN` (or `UNITS`) opens the Drawing Units dialog. To convert existing geometry, use `-DWGUNITS` with the hyphen.

**Q2: How do I change units from inches to millimeters in AutoCAD?**
Type `-DWGUNITS`, enter `3` for Millimeters, accept the display defaults, and answer Yes when asked to scale objects in the current drawing. Alternatively, set millimeters with `UN`, then use `SCALE` with a factor of 25.4.

**Q3: Why didn't my drawing change size when I changed the units?**
Because `UNITS` only changes display settings and insertion units. It doesn't resize anything already drawn. Use `-DWGUNITS` or `SCALE`.

**Q4: How do I change the measurement units in AutoCAD without scaling the drawing?**
Use `UN`, change the Length type and the Units to scale inserted content, and click OK. Your existing geometry stays exactly as it is.

**Q5: How do I check what units my drawing is using?**
Type `UN` and look at the Length type and the insertion scale. The dialog shows you what the drawing is currently set to.

**Q6: How do I change the dimension units only?**
Type `D` to open `DIMSTYLE`, click Modify, then change the Unit format on the Primary Units tab. This changes only how dimension text appears.

**Q7: What's the scale factor from millimeters to inches in AutoCAD?**
It's 0.03937 (1 divided by 25.4). Going from inches to millimeters it's 25.4.
