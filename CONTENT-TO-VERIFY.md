# Content to verify before going live

This version adds trust signals for banks, government bodies and foreign investors.
Everything shown on the site comes from the live thevaluation.com. The items below are
**not on the site yet** because we do not have verified data. Do not invent them. Add each
one only when the company provides the real document or figure.

## Needed for credibility with banks / government / foreign investors
- [ ] Licence or approval reference numbers (SEC, Department of Insurance) and the validity period
- [ ] Membership numbers / certificates for the two valuer associations
- [ ] Any international affiliation or standard followed (e.g. IVS / RICS) — only if true
- [ ] 3–6 case studies (client names may be anonymised, e.g. "a major Thai bank")
- [ ] Client logos or testimonials, with written permission
- [ ] Headline figures (number of valuations, asset value covered) — only if the company can substantiate them
- [ ] Professional profiles/photos for the executive committee
- [ ] Statement on independence and how valuation is separated from the property-sales business
- [ ] Insurance / professional indemnity details, if the company wants to show them
- [ ] English translation review by a native speaker (current English copy comes from the old site and has grammar issues)

## To confirm
- [ ] **Phone number:** the old site shows the HQ line as `0-2717-0801-8` in most places but `0-2717-080-8` (and fax `0-2717-080-0`) in the careers block. This version uses `0-2717-0801-8` / fax `0-2717-0800` everywhere. Please confirm.
- [ ] "Our Approach" (4 steps) is a generic description of a valuation engagement written for this version. Confirm it matches the company's real process.
- [ ] "For International Investors" wording is built only from facts on the old site (national and international service, service lines, 7 offices). Confirm tone and any additions.
- [ ] Privacy policy: the footer links to the policy on thevaluation.com. Confirm it covers the new inquiry form (PDPA).

## Deployment setup
- Set `INQUIRY_WEBHOOK_URL` (e.g. a Power Automate HTTP trigger that emails info@thevaluation.com). Until it is set, the forms fall back to opening the visitor's email app, as before.
- Set `NEXT_PUBLIC_SITE_URL` to the final domain for correct sitemap / metadata.
