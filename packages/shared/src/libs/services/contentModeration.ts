
/**
 * Content Moderation Service
 * AI-powered content filtering for COPPA compliance
 */

export interface ModerationResult {
  isAllowed: boolean;
  confidence: number;
  flaggedReasons: string[];
  category: 'safe' | 'warning' | 'blocked';
}

export class ContentModerationService {
  private static profanityList = new Set([
    // Extensible profanity list
  ]);

  /**
   * Check text content for inappropriate material
   */
  static async moderateText(text: string): Promise<ModerationResult> {
    const lowerText = text.toLowerCase();
    const flaggedReasons: string[] = [];
    let confidence = 1.0;

    // Check for profanity
    for (const word of this.profanityList) {
      if (lowerText.includes(word)) {
        flaggedReasons.push('profanity');
        break;
      }
    }

    // Check for personal info patterns
    if (this.containsPersonalInfo(text)) {
      flaggedReasons.push('personal_info');
    }

    // Check for external links (could be unsafe)
    if (this.containsLinks(text)) {
      flaggedReasons.push('external_links');
    }

    const isAllowed = flaggedReasons.length === 0;
    const category = this.determineCategory(flaggedReasons);

    return {
      isAllowed,
      confidence,
      flaggedReasons,
      category
    };
  }

  private static containsPersonalInfo(text: string): boolean {
    // Phone number pattern
    const phonePattern = /\b\d{3}[-.]?\d{3}[-.]?\d{4}\b/;
    // Email pattern
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
    // Address pattern (simplified)
    const addressPattern = /\b\d+\s+[A-Za-z]+\s+(street|st|avenue|ave|road|rd|drive|dr)\b/i;

    return phonePattern.test(text) || emailPattern.test(text) || addressPattern.test(text);
  }

  private static containsLinks(text: string): boolean {
    const urlPattern = /(https?:\/\/[^\s]+)|(www\.[^\s]+)/gi;
    return urlPattern.test(text);
  }

  private static determineCategory(reasons: string[]): 'safe' | 'warning' | 'blocked' {
    if (reasons.length === 0) return 'safe';
    if (reasons.includes('profanity') || reasons.includes('personal_info')) return 'blocked';
    return 'warning';
  }

  /**
   * Moderate image content (placeholder for AI integration)
   */
  static async moderateImage(imageUrl: string): Promise<ModerationResult> {
    // Placeholder for AI image moderation
    return {
      isAllowed: true,
      confidence: 0.8,
      flaggedReasons: [],
      category: 'safe'
    };
  }

  /**
   * Filter text by removing inappropriate content
   */
  static filterText(text: string): string {
    let filtered = text;

    // Replace profanity with asterisks
    for (const word of this.profanityList) {
      const regex = new RegExp(word, 'gi');
      filtered = filtered.replace(regex, '*'.repeat(word.length));
    }

    return filtered;
  }
}
