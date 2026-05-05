import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Types "../types/testimonials-and-blog";
import Lib "../lib/testimonials-and-blog";

mixin (
  testimonials : List.List<Types.Testimonial>,
  counters : Types.Counters,
  posts : List.List<Types.BlogPost>,
) {
  // ── Testimonial Queries ───────────────────────────────────────────

  public query func getTestimonials() : async [Types.Testimonial] {
    Lib.getTestimonials(testimonials);
  };

  public query func getTestimonialsForProject(projectId : Nat) : async [Types.Testimonial] {
    Lib.getTestimonialsForProject(testimonials, projectId);
  };

  public query func getFeaturedTestimonials() : async [Types.Testimonial] {
    Lib.getFeaturedTestimonials(testimonials);
  };

  // ── Testimonial Updates ───────────────────────────────────────────

  public shared ({ caller }) func addTestimonial(
    input : Types.TestimonialInput
  ) : async { #ok : Types.Testimonial; #err : Text } {
    if (not caller.isController()) { Runtime.trap("Unauthorized") };
    let result = Lib.addTestimonial(testimonials, counters.nextTestimonialId, input);
    switch (result) {
      case (#ok(_)) { counters.nextTestimonialId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared ({ caller }) func updateTestimonial(
    id : Nat,
    input : Types.TestimonialInput,
  ) : async { #ok : Types.Testimonial; #err : Text } {
    if (not caller.isController()) { Runtime.trap("Unauthorized") };
    Lib.updateTestimonial(testimonials, id, input);
  };

  public shared ({ caller }) func deleteTestimonial(
    id : Nat
  ) : async { #ok : (); #err : Text } {
    if (not caller.isController()) { Runtime.trap("Unauthorized") };
    Lib.deleteTestimonial(testimonials, id);
  };

  public shared ({ caller }) func featureTestimonial(
    id : Nat,
    featured : Bool,
  ) : async { #ok : (); #err : Text } {
    if (not caller.isController()) { Runtime.trap("Unauthorized") };
    Lib.featureTestimonial(testimonials, id, featured);
  };

  // ── Blog Post Queries ─────────────────────────────────────────────

  public query func getBlogPosts() : async [Types.BlogPost] {
    Lib.getBlogPosts(posts);
  };

  public query func getBlogPost(slug : Text) : async ?Types.BlogPost {
    Lib.getBlogPost(posts, slug);
  };

  public query func getBlogPostsForProject(projectId : Nat) : async [Types.BlogPost] {
    Lib.getBlogPostsForProject(posts, projectId);
  };

  public query func getFeaturedBlogPosts() : async [Types.BlogPost] {
    Lib.getFeaturedBlogPosts(posts);
  };

  // ── Blog Post Updates ─────────────────────────────────────────────

  public shared ({ caller }) func addBlogPost(
    input : Types.BlogPostInput
  ) : async { #ok : Types.BlogPost; #err : Text } {
    if (not caller.isController()) { Runtime.trap("Unauthorized") };
    let result = Lib.addBlogPost(posts, counters.nextBlogPostId, input);
    switch (result) {
      case (#ok(_)) { counters.nextBlogPostId += 1 };
      case (#err(_)) {};
    };
    result;
  };

  public shared ({ caller }) func updateBlogPost(
    id : Nat,
    input : Types.BlogPostInput,
  ) : async { #ok : Types.BlogPost; #err : Text } {
    if (not caller.isController()) { Runtime.trap("Unauthorized") };
    Lib.updateBlogPost(posts, id, input);
  };

  public shared ({ caller }) func deleteBlogPost(
    id : Nat
  ) : async { #ok : (); #err : Text } {
    if (not caller.isController()) { Runtime.trap("Unauthorized") };
    Lib.deleteBlogPost(posts, id);
  };

  public shared ({ caller }) func featureBlogPost(
    id : Nat,
    featured : Bool,
  ) : async { #ok : (); #err : Text } {
    if (not caller.isController()) { Runtime.trap("Unauthorized") };
    Lib.featureBlogPost(posts, id, featured);
  };
};
