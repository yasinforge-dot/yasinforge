import Time "mo:core/Time";

module {
  public type ProjectId = Nat;
  public type SubmissionId = Nat;

  public type Project = {
    id : ProjectId;
    title : Text;
    category : Text;
    description : Text;
    techStack : [Text];
    imageUrl : Text;
    createdAt : Int;
  };

  public type ProjectInput = {
    title : Text;
    category : Text;
    description : Text;
    techStack : [Text];
    imageUrl : Text;
  };

  public type ContactSubmission = {
    id : SubmissionId;
    name : Text;
    email : Text;
    service : Text;
    projectDetails : Text;
    createdAt : Int;
  };

  public type ContactInput = {
    name : Text;
    email : Text;
    service : Text;
    projectDetails : Text;
  };
};
