module {
  public type TestimonialId = Nat;
  public type BlogPostId = Nat;
  public type Counters = { var nextTestimonialId : Nat; var nextBlogPostId : Nat };

  public type Testimonial = {
    id : TestimonialId;
    projectId : ?Nat;
    clientName : Text;
    clientTitle : Text;
    company : Text;
    quote : Text;
    rating : Nat;
    imageUrl : Text;
    featured : Bool;
    tags : [Text];
    createdAt : Int;
  };

  public type TestimonialInput = {
    projectId : ?Nat;
    clientName : Text;
    clientTitle : Text;
    company : Text;
    quote : Text;
    rating : Nat;
    imageUrl : Text;
    featured : Bool;
    tags : [Text];
  };

  public type PostType = { #caseStudy; #standalone };

  public type BlogPost = {
    id : BlogPostId;
    projectId : ?Nat;
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    featured : Bool;
    tags : [Text];
    imageUrl : Text;
    postType : PostType;
    createdAt : Int;
  };

  public type BlogPostInput = {
    projectId : ?Nat;
    title : Text;
    slug : Text;
    excerpt : Text;
    content : Text;
    featured : Bool;
    tags : [Text];
    imageUrl : Text;
    postType : PostType;
  };
};
