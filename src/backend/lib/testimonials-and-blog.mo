import List "mo:core/List";
import Time "mo:core/Time";
import Types "../types/testimonials-and-blog";

module {
  // ── Testimonials ──────────────────────────────────────────────────

  public func getTestimonials(
    testimonials : List.List<Types.Testimonial>
  ) : [Types.Testimonial] {
    testimonials.toArray();
  };

  public func getTestimonialsForProject(
    testimonials : List.List<Types.Testimonial>,
    projectId : Nat,
  ) : [Types.Testimonial] {
    testimonials.filter(func(t) { t.projectId == ?projectId }).toArray();
  };

  public func getFeaturedTestimonials(
    testimonials : List.List<Types.Testimonial>
  ) : [Types.Testimonial] {
    testimonials.filter(func(t) { t.featured }).toArray();
  };

  public func addTestimonial(
    testimonials : List.List<Types.Testimonial>,
    nextId : Nat,
    input : Types.TestimonialInput,
  ) : { #ok : Types.Testimonial; #err : Text } {
    if (input.rating < 1 or input.rating > 5) {
      return #err("Rating must be between 1 and 5");
    };
    let t : Types.Testimonial = {
      id = nextId;
      projectId = input.projectId;
      clientName = input.clientName;
      clientTitle = input.clientTitle;
      company = input.company;
      quote = input.quote;
      rating = input.rating;
      imageUrl = input.imageUrl;
      featured = input.featured;
      tags = input.tags;
      createdAt = Time.now();
    };
    testimonials.add(t);
    #ok(t);
  };

  public func updateTestimonial(
    testimonials : List.List<Types.Testimonial>,
    id : Nat,
    input : Types.TestimonialInput,
  ) : { #ok : Types.Testimonial; #err : Text } {
    if (input.rating < 1 or input.rating > 5) {
      return #err("Rating must be between 1 and 5");
    };
    var result : { #ok : Types.Testimonial; #err : Text } = #err("Testimonial not found");
    testimonials.mapInPlace(
      func(t) {
        if (t.id == id) {
          let updated : Types.Testimonial = { t with
            projectId = input.projectId;
            clientName = input.clientName;
            clientTitle = input.clientTitle;
            company = input.company;
            quote = input.quote;
            rating = input.rating;
            imageUrl = input.imageUrl;
            featured = input.featured;
            tags = input.tags;
          };
          result := #ok(updated);
          updated;
        } else { t };
      }
    );
    result;
  };

  public func deleteTestimonial(
    testimonials : List.List<Types.Testimonial>,
    id : Nat,
  ) : { #ok : (); #err : Text } {
    let sizeBefore = testimonials.size();
    let kept = testimonials.filter(func(t) { t.id != id });
    testimonials.clear();
    testimonials.append(kept);
    if (testimonials.size() < sizeBefore) { #ok(()) } else { #err("Testimonial not found") };
  };

  public func featureTestimonial(
    testimonials : List.List<Types.Testimonial>,
    id : Nat,
    featured : Bool,
  ) : { #ok : (); #err : Text } {
    var found = false;
    testimonials.mapInPlace(
      func(t) {
        if (t.id == id) {
          found := true;
          { t with featured };
        } else { t };
      }
    );
    if (found) { #ok(()) } else { #err("Testimonial not found") };
  };

  // ── Blog Posts ────────────────────────────────────────────────────

  public func getBlogPosts(
    posts : List.List<Types.BlogPost>
  ) : [Types.BlogPost] {
    posts.toArray();
  };

  public func getBlogPost(
    posts : List.List<Types.BlogPost>,
    slug : Text,
  ) : ?Types.BlogPost {
    posts.find(func(p) { p.slug == slug });
  };

  public func getBlogPostsForProject(
    posts : List.List<Types.BlogPost>,
    projectId : Nat,
  ) : [Types.BlogPost] {
    posts.filter(func(p) { p.projectId == ?projectId }).toArray();
  };

  public func getFeaturedBlogPosts(
    posts : List.List<Types.BlogPost>
  ) : [Types.BlogPost] {
    posts.filter(func(p) { p.featured }).toArray();
  };

  public func addBlogPost(
    posts : List.List<Types.BlogPost>,
    nextId : Nat,
    input : Types.BlogPostInput,
  ) : { #ok : Types.BlogPost; #err : Text } {
    if (input.slug.isEmpty()) {
      return #err("Slug must not be empty");
    };
    let post : Types.BlogPost = {
      id = nextId;
      projectId = input.projectId;
      title = input.title;
      slug = input.slug;
      excerpt = input.excerpt;
      content = input.content;
      featured = input.featured;
      tags = input.tags;
      imageUrl = input.imageUrl;
      postType = input.postType;
      createdAt = Time.now();
    };
    posts.add(post);
    #ok(post);
  };

  public func updateBlogPost(
    posts : List.List<Types.BlogPost>,
    id : Nat,
    input : Types.BlogPostInput,
  ) : { #ok : Types.BlogPost; #err : Text } {
    if (input.slug.isEmpty()) {
      return #err("Slug must not be empty");
    };
    var result : { #ok : Types.BlogPost; #err : Text } = #err("Blog post not found");
    posts.mapInPlace(
      func(p) {
        if (p.id == id) {
          let updated : Types.BlogPost = { p with
            projectId = input.projectId;
            title = input.title;
            slug = input.slug;
            excerpt = input.excerpt;
            content = input.content;
            featured = input.featured;
            tags = input.tags;
            imageUrl = input.imageUrl;
            postType = input.postType;
          };
          result := #ok(updated);
          updated;
        } else { p };
      }
    );
    result;
  };

  public func deleteBlogPost(
    posts : List.List<Types.BlogPost>,
    id : Nat,
  ) : { #ok : (); #err : Text } {
    let sizeBefore = posts.size();
    let kept = posts.filter(func(p) { p.id != id });
    posts.clear();
    posts.append(kept);
    if (posts.size() < sizeBefore) { #ok(()) } else { #err("Blog post not found") };
  };

  public func featureBlogPost(
    posts : List.List<Types.BlogPost>,
    id : Nat,
    featured : Bool,
  ) : { #ok : (); #err : Text } {
    var found = false;
    posts.mapInPlace(
      func(p) {
        if (p.id == id) {
          found := true;
          { p with featured };
        } else { p };
      }
    );
    if (found) { #ok(()) } else { #err("Blog post not found") };
  };

  // --- Seed ---

  public func seedTestimonialsAndBlog(
    testimonials : List.List<Types.Testimonial>,
    nextTestimonialId : Nat,
    posts : List.List<Types.BlogPost>,
    nextBlogPostId : Nat,
  ) : (Nat, Nat) {
    if (testimonials.size() > 0) { return (nextTestimonialId, nextBlogPostId) };

    let tInputs : [Types.TestimonialInput] = [
      {
        projectId = ?0; // Lagos State Judiciary Portal
        clientName = "Hon. Adewale Okafor";
        clientTitle = "Director of IT";
        company = "Lagos State Judiciary";
        quote = "YasinForge delivered a robust, secure portal that digitised our entire case-management workflow. Fine payments via Paystack went live on time and our staff loved the intuitive interface.";
        rating = 5;
        imageUrl = "";
        featured = true;
        tags = ["government", "fintech", "laravel"];
      },
      {
        projectId = ?1; // Roister Platform
        clientName = "Samantha Reid";
        clientTitle = "Co-Founder & CEO";
        company = "Roister";
        quote = "The vendor management dashboard and Stripe integration Bilal built saved us weeks of development. Our merchants onboarded in days, not months.";
        rating = 5;
        imageUrl = "";
        featured = true;
        tags = ["e-commerce", "stripe", "events"];
      },
      {
        projectId = ?2; // Airboot Crypto
        clientName = "Marcus Dein";
        clientTitle = "Head of Product";
        company = "Airboot Crypto";
        quote = "Real-time Binance feeds, zero-downtime deploys, and a slick Vue.js frontend — YasinForge understood the crypto UX bar and cleared it easily.";
        rating = 5;
        imageUrl = "";
        featured = false;
        tags = ["crypto", "fintech", "binance"];
      },
    ];

    var tId = nextTestimonialId;
    for (input in tInputs.values()) {
      switch (addTestimonial(testimonials, tId, input)) {
        case (#ok(_)) { tId += 1 };
        case (#err(_)) {};
      };
    };

    let bInputs : [Types.BlogPostInput] = [
      {
        projectId = ?0; // Lagos State Judiciary Portal - case study
        title = "How We Built a Secure Judiciary Portal for Lagos State";
        slug = "lagos-judiciary-portal-case-study";
        excerpt = "A deep dive into building a government-grade case-management system with Paystack integration, hardened Laravel backend, and role-based access for 500+ court staff.";
        content = "## The Challenge\n\nLagos State needed to move case filings, fee payments, and court records online securely and at scale.\n\n## Our Approach\n\nWe architected a multi-tenant Laravel application on a hardened Ubuntu VPS, implemented Paystack webhooks for fine reconciliation, and built a role-based access control layer audited against OWASP Top 10.\n\n## Results\n\n- 500+ court staff onboarded in 2 weeks\n- Fine payment processing reduced from 3 days to same-day\n- Zero security incidents in the first 6 months of operation";
        featured = true;
        tags = ["government", "case-study", "laravel", "security"];
        imageUrl = "";
        postType = #caseStudy;
      },
      {
        projectId = null; // standalone article
        title = "5 API Security Mistakes Nigerian Startups Keep Making";
        slug = "api-security-mistakes-nigerian-startups";
        excerpt = "From exposed .env files to missing rate limiting, a candid breakdown of the most common API vulnerabilities we encounter during security audits.";
        content = "## Introduction\n\nIn three years of building and auditing APIs for Nigerian startups, we have seen the same five mistakes come up again and again.\n\n## 1. Committing .env Files to Git\n\nAlways add .env to .gitignore before the first commit.\n\n## 2. No Rate Limiting on Auth Endpoints\n\nThrottle login and OTP endpoints. Laravel's built-in throttle middleware is a 5-minute fix.\n\n## 3. Returning Raw Stack Traces to the Client\n\nSet APP_DEBUG=false in production and return generic error messages.\n\n## 4. Missing CORS Configuration\n\nAllow only your known front-end origins, not wildcard *.\n\n## 5. Storing Passwords as MD5\n\nUse bcrypt or argon2. Laravel's Hash facade handles this out of the box.";
        featured = true;
        tags = ["security", "api", "laravel", "tips"];
        imageUrl = "";
        postType = #standalone;
      },
    ];

    var bId = nextBlogPostId;
    for (input in bInputs.values()) {
      switch (addBlogPost(posts, bId, input)) {
        case (#ok(_)) { bId += 1 };
        case (#err(_)) {};
      };
    };

    (tId, bId);
  };
};
