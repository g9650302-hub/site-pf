#!/usr/bin/env python3
import subprocess
import os

os.chdir('/vercel/share/v0-project')

# Stage all changes
subprocess.run(['git', 'add', '-A'], check=True)

# Commit with detailed message
commit_message = """Google Ads Compliance: Add disclaimer banner, transparent pricing, free alternative links, and updated FAQ

- Add prominent red disclaimer banner (above the fold) clarifying private advisory service status
- Update hero title to focus on advisory service rather than passport acquisition
- Implement transparent pricing breakdown showing:
  * Advisory fee (R$ 150-200) separated from
  * Government fee/GRU (official charges)
  * Clear total cost calculation
- Add information box explaining GRU is mandatory for all applicants
- Include link to official Polícia Federal portal in hero section
- Add FAQ answers about free alternative and government fee vs advisory fee
- Update footer with link to official government portal
- Add compliance documentation explaining all changes
- Implement banner close functionality

All changes address specific Google Ads policy violations identified in compliance report for government services category."""

subprocess.run(['git', 'commit', '-m', commit_message], check=True)

print("✓ Changes committed successfully")
