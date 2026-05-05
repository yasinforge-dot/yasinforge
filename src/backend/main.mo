import List "mo:core/List";
import Types "types/portfolio-and-contact";
import PortfolioContactMixin "mixins/portfolio-and-contact-api";
import Lib "lib/portfolio-and-contact";
import TBTypes "types/testimonials-and-blog";
import TBLib "lib/testimonials-and-blog";
import TestimonialsBlogMixin "mixins/testimonials-and-blog-api";

actor {
  let projects = List.empty<Types.Project>();
  let submissions = List.empty<Types.ContactSubmission>();

  Lib.seedProjects(projects);

  let testimonials = List.empty<TBTypes.Testimonial>();
  let blogPosts = List.empty<TBTypes.BlogPost>();
  let tbCounters : TBTypes.Counters = { var nextTestimonialId = 0; var nextBlogPostId = 0 };

  let seedResult = TBLib.seedTestimonialsAndBlog(testimonials, tbCounters.nextTestimonialId, blogPosts, tbCounters.nextBlogPostId);
  tbCounters.nextTestimonialId := seedResult.0;
  tbCounters.nextBlogPostId := seedResult.1;

  include PortfolioContactMixin(projects, submissions);
  include TestimonialsBlogMixin(testimonials, tbCounters, blogPosts);
};
