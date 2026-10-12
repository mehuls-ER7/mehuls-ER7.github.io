---
title: "How to Choose a Jetson Module"
date: 2026-10-12
category: tech
description: "Learn how to choose a Jetson module: compare Orin Nano, Orin NX, AGX Orin and Thor by memory, power, JetPack support and 2026 prices."
image: "/images/how-to-choose-a-jetson-module.webp"
---

You have a project in your head. Maybe it's a robot that follows you around the room, a camera that spots defects on a factory line, or a local chatbot that never touches the cloud. You open NVIDIA's Jetson page, and suddenly there are Nano, Orin Nano, Orin NX, AGX Orin, Thor, and a pile of numbers that all look important.

Then you check the price and it's higher than it was two months ago. Welcome to Jetson shopping in 2026.

Take a breath. Learning how to choose a Jetson module is much less scary once you know which three or four numbers actually matter, and which famous ones (cough, TOPS) you can mostly ignore. Let me walk you through it the way an older colleague would, mistakes included.

**Short Answer: How do you choose a Jetson module?**
Pick by memory first, then power budget, then I/O (cameras and networking), then software support and price. For most people: **Orin Nano 8GB** for learning and single-camera vision, **Orin NX 16GB** for multi-camera robots and small vision-language models, **AGX Orin 64GB or Thor T4000** when you need lots of memory, and **Thor T5000** for humanoids and large generative AI. Skip Xavier, TX2 and the old Nano for new designs.

That's the quick version. The details are where people lose money, so let's go through them properly.

## Why Most "Which Jetson Should I Buy" Advice Goes Stale Fast

Here's the thing. The Jetson lineup changed a lot in the past year, and many guides haven't kept up:

- NVIDIA raised Jetson prices by up to about 101% in July 2026, driven most likely by memory costs, so any price you read from before that is wrong.
- Older modules built on LPDDR4 memory (TX2 NX, TX2i, AGX Xavier 32GB and Industrial, Xavier NX) are being wound down, with the last orders accepted in July 2026 and the last shipments due by July 2027.
- JetPack 7.2 now supports Orin, not just Thor.
- Three new modules were announced: Thor T3000 and T2000 (Q1 2027) and Orin Nano 2 (first half of 2027).

So a guide that still calls Thor "coming soon" is out of date, and so is any budget you built on last spring's prices. We'll use current numbers here.

## Step 0: Dev Kit or Production Module?

Before the specs, decide what you're actually buying.

A **developer kit** is a Jetson module already mounted on a reference carrier board with ports, power and cooling. It's meant for prototyping, learning and software development. A **production module** is the bare compute module you design into your own product with a carrier board.

Two things trip people up here:

- Dev kits aren't meant for production, and they can differ slightly from production modules.
- The kit's carrier board is the part you'll replace later, so don't fall in love with its ports.

My advice: prototype on a dev kit, then pick a production module once you've measured your real workload. That leads to the most important idea in this guide.

## Step 1: Choose by Memory First (Not TOPS)

Jetson modules use **unified memory**, meaning the CPU and GPU share one pool. Your operating system, your camera pipeline, ROS, your model and everything else all draw from the same bucket.

That's why memory capacity is the first filter:

- **4GB** is tight even for modest models once the OS and camera pipeline are running.
- **8GB** handles typical vision work (detection, tracking, segmentation) and small language models.
- **16GB** gives room for several models at once or a small vision-language model alongside your robotics stack.
- **32 to 64GB** is for bigger language models or many concurrent pipelines.
- **64 to 128GB** (Thor) is for large generative models and heavy multimodal workloads.

One lesson from the community: a model can "fit" and still be a bad deployment. Developers warn against giving all the memory to an LLM, because longer prompts, longer outputs and your other running processes all need headroom.

Memory **bandwidth** matters too. Here is where each family sits:

| Family | Memory | Bandwidth |
| --- | --- | --- |
| Orin Nano | 4GB / 8GB | 51 / 102 GB/s |
| Orin NX | 8GB / 16GB | 102 GB/s |
| AGX Orin | 32GB / 64GB | 205 GB/s |
| Thor T4000 / T5000 | 64GB / 128GB | 273 GB/s |

For workloads that are limited by memory bandwidth rather than raw compute (which includes much of LLM text generation), bandwidth is a better guide than headline TOPS.

<!-- IMAGE 1: place here. Source file: jetson-step1-module-ladder.png -->
![Jetson module comparison by memory, bandwidth and power for Orin Nano, Orin NX, AGX Orin and Thor](/images/jetson-step1-module-ladder.webp)

## Step 2: Read the TOPS Numbers Carefully

Every spec sheet leads with performance, and this is where people get misled.

- **Orin numbers depend on mode.** Orin Nano shows 34 TOPS (4GB) and 67 TOPS (8GB), and Orin NX shows 117 and 157 TOPS. Those are the figures with **Super mode** enabled. Without it, the same modules were listed at 20 and 40 TOPS for Nano, and 70 and 100 TOPS for NX.
- **Thor uses a different unit.** It's quoted in FP4 TFLOPS with sparsity (1200 for T4000, 2070 for T5000), so you can't compare it directly with Orin's TOPS. NVIDIA's own claim is that Thor offers over 7.5 times the AI compute of AGX Orin, so the gap is real, but treat the raw numbers as marketing units.
- **Sparse peak isn't your model.** Real speed depends on your model, precision, batch size and software stack.

So use TOPS to place a module in a tier, then benchmark your own model on a dev kit. It's the only number that never lies.

## Step 3: Match Your Power and Cooling Budget

Power is where hobby projects meet reality, especially if you're building a drone or a battery robot.

- **Orin Nano:** 7 to 25 W
- **Orin NX:** 10 to 40 W
- **AGX Orin:** 15 to 60 W for the 64GB version
- **Thor:** 40 to 130 W (T4000 tops out at 70 W)

Two practical warnings:

- **Super mode wants real cooling.** Reviewers of Orin NX note that Super mode needs active cooling that can handle up to 40 W.
- **Thor is a different class.** At 40 W minimum, it won't fit a small battery robot, however attractive the specs are.

A community rule of thumb from robotics discussions: AGX is too heavy for drones, while Orin NX suits mobile robots.

## Step 4: Count Your Cameras and Ports

Compute isn't useful if you can't get sensor data into it. Before you buy, list every camera, network link and storage device you need.

The module sets the ceiling, and the carrier board decides what you can actually use. A few useful facts:

- Orin Nano and Orin NX share the same compact format (a 260-pin SO-DIMM connector at about 69.6 x 45 mm), and many third-party carrier boards accept either. That makes it easy to start on Nano and move up to NX later without redesigning your board.
- AGX Orin and Thor use a larger module (100 x 87 mm with a 699-pin connector), so they need different carrier boards. Don't assume a Thor module drops into an Orin carrier.
- Thor targets sensor-heavy robots, with up to 20 cameras through NVIDIA's Holoscan Sensor Bridge and up to four 25GbE links on T5000.

If you only need one or two cameras, you're probably in Orin Nano or Orin NX territory.

## Step 5: Check the Software (JetPack Version Matters)

Hardware choice and software choice are tied together on Jetson, and this is the step most guides skip.

- **JetPack 6.x** runs on Ubuntu 22.04. A lot of existing tutorials, wheels and containers target it.
- **JetPack 7.2** uses Ubuntu 24.04, Linux kernel 6.8, CUDA 13.2.1 and TensorRT 10.16.2. It adds Orin support to the JetPack 7 line, which started with Thor.
- **Thor needs JetPack 7.** If you pick Thor, you're on the newer stack from day one.

Some real-world friction to expect:

- Package names, Python versions and prebuilt wheels change between JetPack lines. Install wheels that match your JetPack version.
- JetPack 7.2 no longer provides an SD card image for the Orin Nano developer kit, so you flash it a different way (a unified ISO-based install).
- Users have reported being unable to switch into Super power mode after flashing with SDK Manager. If that happens, check that you flashed with the right configuration for your module.

So ask yourself whether your existing code and containers are tied to JetPack 6, and budget migration time if you plan to move to 7.2.

## Step 6: Think About Price and Availability

Here are the 2026 prices after the July increase. Module prices are per unit at 1,000 or more units, so small buyers pay more.

| Product | New price |
| --- | --- |
| Orin Nano Super Developer Kit | $399 |
| Orin Nano 4GB module | $349 |
| Orin Nano 8GB module | $399 |
| Orin NX 8GB module | $649 |
| Orin NX 16GB module | $999 |
| AGX Orin 32GB module | $1,799 |
| AGX Orin 64GB module | $2,999 |
| Thor T4000 module | $2,999 |
| Thor T5000 module | $4,999 |
| AGX Orin Developer Kit | $3,499 |
| AGX Thor Developer Kit | $5,499 |

A few things stand out:

- The $249 Orin Nano Super kit that everyone recommends is now $399, though that's still below the original 2023 Orin Nano kit price of $499.
- AGX Orin 64GB and Thor T4000 now cost the same at the module level. JetsonHacks' take is that unless an existing design requires AGX Orin, T4000 looks like the obvious choice at the same price. I'd add a caution: T4000 runs at 40 to 70 W, needs JetPack 7 and a Thor carrier board, so check that fits your product.
- Prices have moved fast, so always confirm on NVIDIA's buy page before you commit.

## Should You Wait for the New Modules?

Fair question, since three new ones are coming.

- **Orin Nano 2:** announced with 78 TOPS, 8GB of memory and an 8-core Arm CPU, and NVIDIA says it offers about twice the inference performance of Orin Nano Super. Both module and dev kit are expected in the first half of 2027, with pricing not yet announced.
- **Thor T3000 and T2000:** coming in Q1 2027 as lower-cost Thor options. T3000 is listed with 32GB of memory and about 65 W, and T2000 with 16GB.

My rule: if you need to ship or learn now, buy what's available and keep your code portable. If you're starting a product that won't launch until mid-2027, it's worth planning around the new parts. NVIDIA is also keeping Orin in the lineup for the lower half of the range.

## Quick Picks by Project

<!-- IMAGE 2: place here. Source file: jetson-step2-decision-flow.png -->
![Decision flowchart for choosing between Orin Nano, Orin NX, AGX Orin and Thor Jetson modules](/images/jetson-step2-decision-flow.webp)

| Your project | Start with |
| --- | --- |
| Learning edge AI, first projects | Orin Nano Super Developer Kit |
| One-camera vision, battery-powered device | Orin Nano 8GB |
| Mobile robot or drone with several cameras | Orin NX 16GB |
| Small language or vision-language model on the device | Orin NX 16GB or Orin Nano 8GB (tight) |
| Many models at once, bigger LLMs | AGX Orin 64GB or Thor T4000 |
| Humanoid robot, large generative AI, many sensors | Thor T5000 |
| New design based on Xavier, TX2 or Nano | Don't. Pick an Orin or Thor module |

## Mistakes People Make (Learn From Their Pain)

Here are the ones I see most.

1. **Buying by TOPS.** Memory and bandwidth usually decide what actually runs.
2. **Underestimating memory.** The OS, camera pipeline and ROS eat into the same pool as your model.
3. **Ignoring cooling.** Super mode and sustained workloads need airflow, and a module inside a sealed enclosure will throttle.
4. **Treating the dev kit as the product.** It's for prototyping, and your carrier board will differ.
5. **Buying old hardware because it's cheap.** Xavier and TX2 modules are being phased out, so don't build a new product on them.
6. **Forgetting the JetPack version.** Tutorials, wheels and containers have to match it.
7. **Not benchmarking.** Test your own model on a dev kit before you order production modules.

<!-- YOUTUBE: replace this link with your verified video before publishing -->
For more guidance, you can watch this video: [How to choose a Jetson module video](https://youtu.be/5QrnXbvsbUc?si=vhR0viZQQuu0I1iQ).

## Frequently Asked Questions

**Q1: Which Jetson module should a beginner choose?**
The Orin Nano Super Developer Kit. It's now $399 after the July 2026 price rise, but it's the most widely supported entry point, with the biggest community behind it.

**Q2: What's the difference between Orin Nano and Orin NX?**
Orin NX has more memory (up to 16GB), higher memory bandwidth (102 GB/s), more GPU performance, and extra accelerators such as NVDLA and PVA, at a higher price and power draw. Orin Nano is the cheaper, lower-power entry module.

**Q3: Can a Jetson Orin Nano run an LLM?**
Small, quantized models, yes. Ollama on Jetson officially lists Orin Nano 8GB, Orin NX 16GB and AGX Orin 32GB and 64GB. But leave memory headroom for your OS and other processes, and expect it to suit small models rather than large ones.

**Q4: Should I buy a Jetson Xavier or the original Jetson Nano?**
Not for a new project. Several Xavier and TX2 modules are being phased out, with last shipments due by July 2027, and the older Nano platform has weaker support for newer frameworks.

**Q5: Is Jetson Thor worth it over AGX Orin?**
If you need more than 64GB of memory, many sensors, or large generative models, yes. At the module level, T4000 now costs the same as AGX Orin 64GB, but it needs JetPack 7, a Thor carrier board and a 40 to 70 W budget.

**Q6: Do I need a carrier board?**
Yes. The module is the compute core, and the carrier board provides power, ports, cameras and storage. Dev kits include a reference carrier board.

**Q7: Should I wait for Orin Nano 2?**
Only if your project can wait until the first half of 2027 and you're comfortable with unannounced pricing. If you need to start now, build on Orin Nano or NX and keep your code portable.
