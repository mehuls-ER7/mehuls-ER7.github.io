# How to Change Units in AutoCAD: The Complete Guide (Zero Scaling Errors)

Ever opened an architectural drawing, went to measure a standard interior doorway, and realized AutoCAD was telling you it was 900 inches wide instead of 900 millimeters?

Or maybe you imported a block from a manufacturer, inserted it into your master floor plan, and it blew up to the size of a city block?

It is frustrating, isn't it?

If you are looking for **how to change units in AutoCAD**, you are in the exact right place. Modifying measurement settings is one of those fundamental tasks every drafter, engineer, and architect encounters. But here is the catch: depending on whether you are starting a fresh project, inserting blocks, or trying to rescale an entire finished drawing, the steps you need to follow are completely different.

Whether your goal is to learn **how to change the measurement units in AutoCAD** for a new layout, figure out **how to change autocad measurement unit** settings on existing geometry, or simply understand **how to change units autocad** relies on for dimensions, this complete guide covers every method step by step.

---

> ### Featured Snippet / Quick Answer
> 
> **How do you change units in AutoCAD?**
> 1. Type **`UNITS`** (or **`UN`**) in the command line and press **Enter**.
> 2. In the **Drawing Units** window, click the **Type** dropdown under *Length* (e.g., *Architectural*, *Decimal*, or *Engineering*).
> 3. Under **Insertion Scale**, choose your desired units (e.g., *Inches*, *Millimeters*, or *Meters*).
> 4. Adjust the **Precision** setting to your project's requirement.
> 5. Click **OK** to save changes.
> 
> *Note: To rescale existing objects along with drawing units, use the **`-DWGUNITS`** command instead.*

---

## Why Most AutoCAD Units Guides Fail You

If you search the web for **how to change units in autocad**, almost every tutorial on page 1 tells you the exact same thing: type `UNITS`, pick *Millimeters* or *Inches*, and hit *OK*.

Then you return to your drawing area, run the `DIST` command, and realize **nothing actually changed** in your physical drawing geometry. Your lines didn't scale; only your insertion settings did.

That single missing piece of information causes thousands of CAD drafters to waste hours manually scaling drawings with the `SCALE` command, often introducing rounding errors and misaligned layouts along the way.

Understanding basic AutoCAD operations comes down to knowing which tool matches your specific problem. When changing measurement systems, you must first identify what you are trying to accomplish.

---

## The 3 Types of Units in AutoCAD (And Which One You Need)

Before running any commands, let's clarify the three distinct unit systems inside every `.dwg` file:

```text
                          ┌───────────────────────────┐
                          │   AutoCAD Unit Systems    │
                          └─────────────┬─────────────┘
                                        │
          ┌─────────────────────────────┼─────────────────────────────┐
          ▼                             ▼                             ▼
┌──────────────────┐          ┌──────────────────┐          ┌──────────────────┐
│ Insertion Scale  │          │ Drawing Geometry │          │ Dimension Display│
│  (`UNITS` / `UN`)│          │   (`-DWGUNITS`)  │          │   (`DIMSTYLE`)   │
└────────┬─────────┘          └────────┬─────────┘          └────────┬─────────┘
         │                             │                             │
 Controls scale when          Rescales physical             Controls how numbers
 blocks are inserted          drawing objects               appear on dimension
 into another drawing         and coordinates               lines and callouts
```

1. **Insertion Units (`UNITS` command / Shortcut `UN`):** Defines the unit scale applied when you drag and drop external blocks, Xrefs, or raster images into your current drawing.
2. **Real-World Geometry Scale (`-DWGUNITS` command):** Controls the actual global measurement system of the file. This command scales existing objects automatically when switching between Metric and Imperial.
3. **Dimension Display Units (`DIMSTYLE` command / Shortcut `D`):** Controls how numbers, ticks, and feet/inch symbols are formatted on annotation dimension lines without altering object geometry.

---

## Method 1: How to Change Insertion Units (`UNITS` Command)

Use this method when starting a fresh drawing or configuring your workspace so imported blocks automatically scale correctly.

1. **Open the Drawing Units Dialog Box:**
   Type **`UNITS`** or simply **`UN`** in the command prompt and press **Enter**.

2. **Select Length Type and Precision:**
   Under the **Length** section on the left:
   * **Type:** Select *Architectural* (feet and fractional inches), *Engineering* (feet and decimal inches), *Decimal* (standard metric or decimal units), or *Fractional*.
   * **Precision:** Set your display accuracy (e.g., `0.00` for general drafting or `1/16"` for carpentry layouts).

3. **Set the Insertion Scale:**
   Locate the dropdown menu labeled **Units to scale inserted content**. Select your target units (e.g., *Inches*, *Millimeters*, *Centimeters*, or *Meters*).
   *Why this matters:* If your drawing is set to *Inches* and you drag in a block defined in *Millimeters*, AutoCAD automatically scales the block by a factor of 25.4 so it fits seamlessly.

4. **Configure Angle Settings (Optional):**
   Under the **Angle** section, set your preferred angular format (*Decimal Degrees*, *Deg/Min/Sec*, or *Grads*). Keep **Clockwise** unchecked unless your surveying standard requires it.

5. **Confirm Changes:**
   Click **OK** at the bottom of the window to apply your new settings.

---

## Method 2: How to Convert Existing Drawing Units (`-DWGUNITS`)

If you have a completed drawing in Imperial units (Inches) and need to convert the entire drawing—including all existing lines, polylines, blocks, and civil site geometry—into Metric (Millimeters or Meters), the standard `UNITS` dialog box won't work.

Instead, you need the command line-driven **`-DWGUNITS`** tool. (Be sure to include the hyphen `-` before the command!). This is vital in complex drafting scenarios where unit precision directly impacts measurements and calculations.

### Step-by-Step Drawing Conversion

1. Type **`-DWGUNITS`** into the command prompt and press **Enter**.
2. AutoCAD will display a numbered list of unit options in the command history:
```text
1. Inches
2. Feet
3. Millimeters
4. Centimeters
5. Decimeters
6. Meters
```

3. Type the number corresponding to your desired unit (e.g., type **`3`** for Millimeters or **`6`** for Meters) and press **Enter**.
4. **Unit Display Format:** Press **Enter** to accept the default format (typically `2` for Decimal).
5. **Linear Display Precision:** Press **Enter** to accept current precision.
6. **Scale objects from other drawings upon insert?** Type **`Y`** (Yes) and press **Enter**.
7. **Match INSUNITS to drawing units?** Type **`Y`** (Yes) and press **Enter**.
8. **Scale objects in current drawing to reflect change in units?** Type **`Y`** (Yes) and press **Enter**. *(This is the critical step that rescales your geometry!)*
9. **Include objects in Paper Space?** Type **`Y`** (Yes) and press **Enter** so title blocks and layout viewports scale proportionally.

AutoCAD will immediately process the file and rescale all objects to match your new unit system. Run `ZOOM` > `Extents` (`Z` > `E`) if your drawing disappears from the screen during conversion.

---

## Method 3: Changing Dimension Units (`DIMSTYLE`)

Sometimes your drawing geometry is accurate, but your dimension lines are displaying measurements in the wrong format (e.g., showing `18.5"` instead of `1'-6 1/2"`).

To fix annotation formatting:

1. Type **`DIMSTYLE`** (or **`D`**) and press **Enter**.
2. Select your active dimension style from the list on the left and click **Modify**.
3. Navigate to the **Primary Units** tab.
4. Under **Unit format**, choose *Architectural*, *Decimal*, *Engineering*, etc.
5. Under **Measurement scale**, check the **Scale factor**:
   * Leave as **`1.0`** for standard 1:1 model space dimensioning.
   * If you are displaying dual units (e.g., showing both Inches and Millimeters), navigate to the **Alternate Units** tab, check **Display alternate units**, and set the multiplier to **`25.4`**.

6. Click **OK**, then click **Close**.

---

## Video Reference

For a visual demonstration on using both `UNITS` and `-DWGUNITS` to convert drawing files without corrupting scale, watch this step-by-step video tutorial:

[Watch: How to Change Units in AutoCAD (Step-by-Step Video)](https://www.youtube.com/watch?v=s9S6sE53Ibc)

---

## Troubleshooting Common AutoCAD Unit Errors

| Symptom / Problem | Underlying Cause | Quick Solution |
| --- | --- | --- |
| **Inserted blocks appear 25.4x too large or small.** | Mismatch between drawing `INSUNITS` and the block's source units. | Set `INSUNITS` to match in both files via `UNITS` menu. |
| **Objects stay the same size after changing `UNITS`.** | The `UNITS` command only alters insertion scale, not geometry. | Use `-DWGUNITS` to rescale drawing geometry. |
| **Dimensions show decimal numbers instead of feet/inches.** | Dimension style unit format is set to *Decimal* instead of *Architectural*. | Open `DIMSTYLE` > *Primary Units* > Change *Unit format* to *Architectural*. |
| **Coordinates jump or disappear after unit change.** | Drawing origin point `(0,0)` is far away from geometry. | Perform `ZOOM` > `Extents` (`Z` > `E`) to relocate drawing. |

---

## Frequently Asked Questions (FAQs)

### What is the shortcut key to change units in AutoCAD?
The primary shortcut is **`UN`** (or **`UNITS`**), which opens the Drawing Units dialog box. For scaling drawing geometry, use the command line string **`-DWGUNITS`**.

### How do I change units from Inches to Millimeters in AutoCAD?
To change insertion scale only, type `UN`, set *Units to scale inserted content* to *Millimeters*, and click OK. To convert all existing geometry in the drawing from Inches to Millimeters, type `-DWGUNITS`, choose `3` (Millimeters), and answer `Yes` when AutoCAD asks to scale existing objects.

### Why didn't my drawing scale when I changed the units?
The standard `UNITS` dialog box only changes settings for new blocks brought into the drawing. It explicitly prevents existing geometry from altering size. To physically convert existing lines and shapes, you must use the `-DWGUNITS` command or manually apply the `SCALE` command with a conversion factor (e.g., `25.4` for inches to mm, or `0.03937` for mm to inches).

### How do I rename a block in AutoCAD after changing units?
If you updated units and need to rename updated block definitions, type **`RENAME`** (or **`REN`**) in the command line. Select *Blocks* under Object Type, pick your block from the list, enter the new name in the *Rename To* field, and click *OK*.

### How do I delete or purge unused block definitions after converting units?
To permanently erase unneeded block definitions and reduce file size, type **`PURGE`** (or **`PU`**). Select *Blocks*, check *Purge nested items*, and click *Purge All Checked Items*. Note that blocks must first be deleted (`ERASE`) from the drawing canvas before they can be purged from the database.