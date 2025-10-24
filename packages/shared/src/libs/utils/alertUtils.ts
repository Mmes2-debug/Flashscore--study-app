
// AlertManager for shared package - server-side compatible
export class AlertManager {
  private static alerts: Array<{message: string; type: string; timestamp: number}> = [];

  static showInfo(message: string, persistent: boolean = false) {
    this.logAlert(message, 'info', persistent);
  }

  static showSuccess(message: string, persistent: boolean = false) {
    this.logAlert(message, 'success', persistent);
  }

  static showWarning(message: string, persistent: boolean = false) {
    this.logAlert(message, 'warning', persistent);
  }

  static showError(message: string, persistent: boolean = true) {
    this.logAlert(message, 'error', persistent);
  }

  private static logAlert(message: string, type: string, persistent: boolean) {
    const alert = { message, type, timestamp: Date.now(), persistent };
    this.alerts.unshift(alert);
    if (this.alerts.length > 100) this.alerts.pop();
    
    // Server-side logging
    if (typeof console !== 'undefined') {
      const emoji = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : type === 'success' ? '✅' : 'ℹ️';
      console.log(`${emoji} [${type.toUpperCase()}]: ${message}`);
    }
  }

  // Sports-specific alerts
  static showMatchAlert(match: string, prediction: string) {
    this.showInfo(`New prediction for ${match}: ${prediction}`);
  }

  static showQuizResult(score: number, total: number) {
    const percentage = Math.round((score / total) * 100);
    if (percentage >= 80) {
      this.showSuccess(`Excellent! You scored ${score}/${total} (${percentage}%)`);
    } else if (percentage >= 60) {
      this.showInfo(`Good job! You scored ${score}/${total} (${percentage}%)`);
    } else {
      this.showWarning(`Keep practicing! You scored ${score}/${total} (${percentage}%)`);
    }
  }

  static showPiCoinEarned(amount: number, reason: string) {
    this.showSuccess(`Earned ${amount} Pi coins for ${reason}! 💰`);
  }

  static showOfflineMode() {
    this.showWarning('You are now offline. Some features may be limited.', true);
  }

  static showOnlineMode() {
    this.showSuccess('Back online! All features are available.');
  }

  static showAPIError(service: string) {
    this.showError(`${service} is currently unavailable. Using cached data.`);
  }

  static showNewsUpdate(count: number) {
    this.showInfo(`${count} new sports articles available!`);
  }

  static getAlerts() {
    return this.alerts;
  }

  static clearAlerts() {
    this.alerts = [];
  }
}

export const alertManager = AlertManager;
