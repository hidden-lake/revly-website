// Revly — Product pages (Review embeds, Claude MCP)
import React from 'react';
import { Navbar, Footer, FAQ, CrossLinks } from './components.jsx';
import { ProductBeforeAfter } from './products.jsx';
import { FeatureHeroC } from './feature-hero.jsx';
import { FeatureMotion } from './feature-collect.jsx';
import { EmbedScrolly, EmbedGallery } from './feature-embed.jsx';
import { McpScrolly, McpGallery } from './feature-mcp.jsx';
import { EMBED_FAQ, MCP_FAQ } from '../lib/faqs.js';

// ========== Display Reviews On Your Site ==========
export function ReviewEmbeds() {
  const FAQS = EMBED_FAQ;

  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <FeatureHeroC variant="embed" />

      <EmbedScrolly />

      <EmbedGallery />

      <ProductBeforeAfter
        heading={<>Before and after <span className="text-primary">Revly</span></>} rows={[
        { without: "Your best reviews only live on G2 and Capterra", with: "Top review quotes display on your website" },
        { without: "Testimonials that quietly go out of date", with: "Widgets that update as new reviews are posted" },
        { without: "No say in which reviews visitors see", with: "Filter by rating, platform, and review length" },
        { without: "Generic embeds", with: "Layout and brand colours matched to your site" }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">You earned the reviews.<br /><span style={{ color: "#f1057a" }}>Put them to work.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "46ch" }}>Pick the reviews, style the widget, paste one line of code. It keeps itself current from there.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="/pricing">Start showing your reviews</a>
              <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Collect", title: "Collect Quality Reviews", body: "One smart link plus AI writing assistance turns willing customers into detailed reviews on the platforms that matter.", to: "/collect-quality-reviews" },
      { chip: "Monitor", title: "Monitor Multiple Review Platforms", body: "All your reviews from every platform in one dashboard, synced every five minutes.", to: "/monitor-platforms" },
      { chip: "Claude MCP", title: "Query your review data with AI", body: "Connect Revly to Claude or ChatGPT and ask questions about your review data in plain language.", to: "/claude-mcp" }]
      } />
    </main>
    <Footer />
  </>;
}

// ========== Claude MCP ==========
export function ClaudeMCP() {
  const FAQS = MCP_FAQ;

  return <>
    <Navbar />
    <main>
      <FeatureMotion />
      <FeatureHeroC variant="mcp" />

      <McpScrolly />

      <McpGallery />

      <ProductBeforeAfter
        heading={<>Before and after <span className="text-primary">querying reviews in Claude.</span></>} rows={[
        { without: "Exporting CSVs from four platforms to answer one question", with: "Ask in Claude and get the answer instantly" },
        { without: "Manually hunting for a usable quote before every campaign", with: "The right quote, sourced in seconds directly in Claude/ChatGPT" },
        { without: "Collection drop-off you can feel but can't locate", with: "Query the funnel and see the exact step that leaks" },
        { without: "Marketing copy that doesn't land with leads", with: "Copy shaped by how happy customers actually describe you" },
        { without: "Reports rebuilt by hand every quarter", with: "The same questions, automatically rerun against live data" }]
        } />

      <FAQ items={FAQS} />

      <section className="section">
        <div className="container-x">
          <div className="ctaA">
            <h2 className="h2">Your reviews already hold the answers.<br /><span style={{ color: "#f1057a" }}>Just ask.</span></h2>
            <p className="lead" style={{ color: "rgba(255,255,255,0.75)", margin: "1rem auto 0", maxWidth: "48ch" }}>Connect Revly to Claude once, then query your review and collection data in plain language.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "2rem", flexWrap: "wrap" }}>
              <a className="btn btn-default btn-lg" href="/pricing">Get started for free</a>
              <a className="btn btn-yellow btn-lg" href="/pricing">Book a demo</a>
            </div>
          </div>
        </div>
      </section>

      <CrossLinks items={[
      { chip: "Monitor", title: "Monitor Multiple Review Platforms", body: "All your reviews from every platform in one dashboard, synced every five minutes.", to: "/monitor-platforms" },
      { chip: "Embeds", title: "Display Reviews On Your Site", body: "Turn your reviews into styled, self-updating widgets you can drop onto any page.", to: "/review-widgets" },
      { chip: "Respond", title: "Manage Review Responses", body: "Surface every review that needs a reply and draft one in your voice, across every platform.", to: "/manage-review-responses" }]
      } />
    </main>
    <Footer />
  </>;
}
