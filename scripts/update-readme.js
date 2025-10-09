#!/usr/bin/env node

/**
 * Advanced README Auto-Updater
 * Automatically updates GitHub Profile README with latest information
 */

const fs = require('fs');
const path = require('path');

class ReadmeUpdater {
  constructor() {
    this.readmePath = path.join(__dirname, '..', 'README.md');
  }

  async updateReadme() {
    try {
      console.log('🔄 Starting README update...');
      
      let readmeContent = fs.readFileSync(this.readmePath, 'utf8');
      
      // Update last updated timestamp
      const lastUpdated = this.getFormattedTimestamp();
      readmeContent = this.updateTimestamp(readmeContent, lastUpdated);
      
      // Update visitor count placeholder
      readmeContent = this.updateVisitorCount(readmeContent);
      
      // Update dynamic content sections
      readmeContent = this.updateDynamicSections(readmeContent);
      
      fs.writeFileSync(this.readmePath, readmeContent);
      console.log('✅ README updated successfully!');
      
    } catch (error) {
      console.error('❌ Error updating README:', error);
      process.exit(1);
    }
  }

  getFormattedTimestamp() {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    });
  }

  updateTimestamp(content, timestamp) {
    const timestampSection = `<!-- LAST_UPDATED_START -->\n**Last Updated:** ${timestamp}\n<!-- LAST_UPDATED_END -->`;
    
    if (content.includes('<!-- LAST_UPDATED_START -->')) {
      return content.replace(
        /<!-- LAST_UPDATED_START -->[\s\S]*?<!-- LAST_UPDATED_END -->/,
        timestampSection
      );
    } else {
      // Add timestamp section near the top if it doesn't exist
      return content.replace(
        /(<div align="center">\n\n# 👋 Hello World! I'm Christian)/,
        `<!-- LAST_UPDATED_START -->\n**Last Updated:** ${timestamp}\n<!-- LAST_UPDATED_END -->\n\n$1`
      );
    }
  }

  updateVisitorCount(content) {
    // This is a placeholder for future visitor count updates
    // You can integrate with analytics APIs here
    return content;
  }

  updateDynamicSections(content) {
    // Placeholder for updating dynamic content like:
    // - Latest blog posts
    // - Current Spotify track
    // - GitHub achievement updates
    // - Weather information
    return content;
  }
}

// Add some utility functions
const utils = {
  formatNumber: (num) => {
    return new Intl.NumberFormat().format(num);
  },
  
  getRandomQuote: () => {
    const quotes = [
      "The only way to do great work is to love what you do. - Steve Jobs",
      "Code is like humor. When you have to explain it, it's bad. - Cory House",
      "First, solve the problem. Then, write the code. - John Johnson",
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand. - Martin Fowler"
    ];
    return quotes[Math.floor(Math.random() * quotes.length)];
  }
};

// Run the updater
if (require.main === module) {
  const updater = new ReadmeUpdater();
  updater.updateReadme();
}

module.exports = ReadmeUpdater;