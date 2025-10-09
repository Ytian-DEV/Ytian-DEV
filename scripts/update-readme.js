#!/usr/bin/env node

/**
 * Script to auto-update GitHub Profile README
 * This can be extended to fetch latest blog posts, stats, etc.
 */

const fs = require('fs');
const path = require('path');

class ReadmeUpdater {
  constructor() {
    this.readmePath = path.join(__dirname, '..', 'README.md');
  }

  async updateReadme() {
    try {
      let readmeContent = fs.readFileSync(this.readmePath, 'utf8');
      
      // Update last updated timestamp
      const lastUpdated = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        timeZoneName: 'short'
      });

      // Add or update last updated section
      if (readmeContent.includes('<!-- LAST_UPDATED -->')) {
        readmeContent = readmeContent.replace(
          /<!-- LAST_UPDATED -->[\s\S]*?<!-- LAST_UPDATED_END -->/,
          `<!-- LAST_UPDATED -->\n**Last Updated:** ${lastUpdated}\n<!-- LAST_UPDATED_END -->`
        );
      }

      fs.writeFileSync(this.readmePath, readmeContent);
      console.log('✅ README updated successfully!');
      
    } catch (error) {
      console.error('❌ Error updating README:', error);
      process.exit(1);
    }
  }
}

// Run the updater
const updater = new ReadmeUpdater();
updater.updateReadme();