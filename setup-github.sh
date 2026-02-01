#!/bin/bash

# KavaSpot GitHub Setup Script
# Run this after creating the repo on GitHub.com

echo "🚀 KavaSpot GitHub Setup"
echo ""

# Check if gh is authenticated
if ! gh auth status &>/dev/null; then
    echo "❌ GitHub CLI not authenticated"
    echo "   Run: gh auth login"
    echo "   Or create repo manually at: https://github.com/new"
    echo ""
    echo "   Then run:"
    echo "   git remote set-url origin https://github.com/YOURUSERNAME/kavaspot.git"
    echo "   git push -u origin master"
    exit 1
fi

# Create the repo
echo "📦 Creating GitHub repository..."
gh repo create kavaspot \
    --public \
    --description "Your weekly guide to kava events in St. Pete + Clearwater" \
    --source=. \
    --push

echo ""
echo "✅ Repository created and pushed!"
echo ""
echo "📝 Enable GitHub Pages:"
echo "   1. Go to: https://github.com/YOURUSERNAME/kavaspot/settings/pages"
echo "   2. Source: Deploy from a branch"
echo "   3. Branch: main (or gh-pages if using the workflow)"
echo "   4. Click Save"
echo ""
echo "🌐 Your site will be at:"
echo "   https://YOURUSERNAME.github.io/kavaspot"
