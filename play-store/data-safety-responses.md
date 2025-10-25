# Google Play Data Safety Form Responses

## Section 1: Data Collection

### Does your app collect or share any of the required user data types?
**Answer: YES**

---

## Section 2: Data Types Collected

### Personal Info

#### Email Address
- **Collected**: YES
- **Purpose**: Account creation, parental consent verification
- **Shared**: NO
- **Optional**: NO (required for account creation)
- **User can request deletion**: YES

#### Name
- **Collected**: YES (First name, username)
- **Purpose**: Personalization, parental consent
- **Shared**: NO
- **Optional**: NO (required for account)
- **User can request deletion**: YES

#### User IDs
- **Collected**: YES (internal user ID)
- **Purpose**: Account management, service functionality
- **Shared**: NO
- **Optional**: NO
- **User can request deletion**: YES

#### Address
- **Collected**: NO

#### Phone Number
- **Collected**: NO

#### Race and Ethnicity
- **Collected**: NO

#### Political or Religious Beliefs
- **Collected**: NO

#### Sexual Orientation
- **Collected**: NO

#### Other Personal Info
- **Collected**: YES (Date of birth for age verification)
- **Purpose**: COPPA compliance, age-appropriate content
- **Shared**: NO
- **Optional**: NO
- **User can request deletion**: YES (after account closure)

---

### Financial Info

#### User Payment Info
- **Collected**: NO (handled by Stripe/third-party)
- **Note**: Payment processing delegated to certified processors

#### Purchase History
- **Collected**: YES (transaction records)
- **Purpose**: Account management, parental controls
- **Shared**: NO
- **Optional**: Not applicable
- **User can request deletion**: YES

#### Credit Score
- **Collected**: NO

#### Other Financial Info
- **Collected**: NO

---

### Health and Fitness
- **Collected**: NO

---

### Messages
- **Collected**: NO (no in-app messaging)

---

### Photos and Videos
- **Collected**: NO

---

### Audio Files
- **Collected**: NO

---

### Files and Docs
- **Collected**: NO

---

### Calendar
- **Collected**: NO

---

### Contacts
- **Collected**: NO

---

### Location

#### Approximate Location
- **Collected**: YES (for regional sports content)
- **Purpose**: Show relevant local sports/leagues
- **Shared**: NO
- **Optional**: YES
- **User can request deletion**: YES
- **Note**: City/region level only, not precise GPS

#### Precise Location
- **Collected**: NO

---

### App Activity

#### App Interactions
- **Collected**: YES (predictions made, features used)
- **Purpose**: Service functionality, analytics, improvement
- **Shared**: NO
- **Optional**: Not applicable
- **User can request deletion**: YES

#### In-app Search History
- **Collected**: YES (search for teams, matches)
- **Purpose**: Service functionality, personalization
- **Shared**: NO
- **Optional**: Not applicable
- **User can request deletion**: YES

#### Installed Apps
- **Collected**: NO

#### Other User-Generated Content
- **Collected**: NO

#### Other Actions
- **Collected**: YES (achievement progress, learning modules)
- **Purpose**: Progress tracking, educational features
- **Shared**: NO
- **Optional**: Not applicable
- **User can request deletion**: YES

---

### Web Browsing
- **Collected**: NO

---

### App Info and Performance

#### Crash Logs
- **Collected**: YES
- **Purpose**: Bug fixing, app stability
- **Shared**: NO
- **Optional**: Not applicable
- **User can request deletion**: YES

#### Diagnostics
- **Collected**: YES (performance metrics)
- **Purpose**: App optimization
- **Shared**: NO
- **Optional**: Not applicable
- **User can request deletion**: YES

#### Other App Performance Data
- **Collected**: YES (load times, responsiveness)
- **Purpose**: Service quality improvement
- **Shared**: NO
- **Optional**: Not applicable
- **User can request deletion**: YES

---

### Device or Other IDs

#### Device or Other IDs
- **Collected**: YES (device identifier for session management)
- **Purpose**: Account security, prevent abuse
- **Shared**: NO
- **Optional**: Not applicable
- **User can request deletion**: YES

---

## Section 3: Data Usage and Handling

### Is all of the user data collected by your app encrypted in transit?
**Answer: YES**
- All data transmitted using TLS/HTTPS encryption

### Do you provide a way for users to request that their data is deleted?
**Answer: YES**
- In-app data deletion request
- Email support for deletion: privacy@sportscentral.com
- Parent-initiated deletion for children under 13
- Complete data removal within 30 days

---

## Section 4: Data Sharing

### Do you share user data with third parties?
**Answer: YES** (Limited)

#### Third Parties We Share With:

**Payment Processors (Stripe)**
- **Data shared**: Transaction details (not full card numbers)
- **Purpose**: Payment processing only
- **User consent**: Required before purchase
- **Note**: Stripe is PCI-DSS certified

**Cloud Infrastructure (Server Hosting)**
- **Data shared**: All collected data (stored on servers)
- **Purpose**: App functionality and data storage
- **Security**: Encrypted at rest and in transit
- **Compliance**: GDPR, COPPA compliant providers

**Analytics (Aggregated Only)**
- **Data shared**: Anonymized usage statistics
- **Purpose**: App improvement, feature development
- **Note**: No personal identifiers shared
- **Kids Mode**: NO analytics for users under 13

---

## Section 5: Security Practices

### Data Security
- ✅ Encryption in transit (TLS/HTTPS)
- ✅ Encryption at rest (database encryption)
- ✅ Secure authentication (bcrypt password hashing)
- ✅ Regular security audits
- ✅ COPPA-compliant data handling
- ✅ Minimal data collection principle
- ✅ Role-based access controls
- ✅ Automated security monitoring

### Commitment to Google Play Families Policy
**Answer: YES**
- App complies with all Families Policy requirements
- Kids Mode ensures COPPA compliance
- No targeted advertising to children
- Parental consent required for users under 13
- Age-appropriate content filtering

---

## Section 6: Privacy Policy

### Privacy Policy URL
**Answer**: https://sportscentral.app/privacy-policy

### In-App Privacy Policy Access
**Answer: YES**
- Accessible from Settings menu
- Linked during account creation
- Available in Kids Mode setup
- Parent-specific privacy notice included

---

## Section 7: Contact Information

**Developer Name**: Sports Central Team
**Developer Email**: privacy@sportscentral.com
**Privacy Contact Email**: privacy@sportscentral.com
**Data Protection Officer**: dpo@sportscentral.com

---

## Additional Notes for Google Play Review

### COPPA Compliance Statement
This app is designed to be safe for children under 13 and fully complies with COPPA:
- Verifiable parental consent system implemented
- Minimal data collection from children
- No behavioral advertising to children
- Parent dashboard for monitoring
- Easy data deletion for parents
- Content moderation and filtering
- No sharing of children's data without consent

### Target Audience
- Primary: Ages 10-17 (educational focus)
- Secondary: Parents and educators
- Kids Mode available for ages 5-12

### No Deceptive Practices
- Clear disclosure of AI predictions (not guarantees)
- Transparent about data collection
- Honest about what the app does and doesn't do
- No hidden fees or surprise charges
- No dark patterns or manipulative design

---

**Last Updated**: October 25, 2025
**Reviewed by**: Legal & Privacy Team
**Next Review Date**: January 2026
