import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Types "../types/portfolio-and-contact";
import Lib "../lib/portfolio-and-contact";

mixin (
  projects : List.List<Types.Project>,
  submissions : List.List<Types.ContactSubmission>,
) {
  // --- Portfolio queries ---

  public query func getProjects() : async [Types.Project] {
    Lib.getProjects(projects);
  };

  public query func getProject(id : Types.ProjectId) : async ?Types.Project {
    Lib.getProject(projects, id);
  };

  // --- Portfolio updates (admin-only) ---

  public shared ({ caller }) func addProject(input : Types.ProjectInput) : async Types.Project {
    if (not Lib.isAdmin(caller)) { Runtime.trap("Unauthorized") };
    Lib.addProject(projects, input);
  };

  public shared ({ caller }) func updateProject(
    id : Types.ProjectId,
    input : Types.ProjectInput,
  ) : async ?Types.Project {
    if (not Lib.isAdmin(caller)) { Runtime.trap("Unauthorized") };
    Lib.updateProject(projects, id, input);
  };

  public shared ({ caller }) func deleteProject(id : Types.ProjectId) : async Bool {
    if (not Lib.isAdmin(caller)) { Runtime.trap("Unauthorized") };
    Lib.deleteProject(projects, id);
  };

  // --- Contact updates ---

  public shared func submitContact(input : Types.ContactInput) : async Types.ContactSubmission {
    Lib.submitContact(submissions, input);
  };

  // --- Contact queries (admin-only) ---

  public shared query ({ caller }) func getSubmissions() : async [Types.ContactSubmission] {
    if (not Lib.isAdmin(caller)) { Runtime.trap("Unauthorized") };
    Lib.getSubmissions(submissions);
  };

  public shared ({ caller }) func deleteSubmission(id : Types.SubmissionId) : async Bool {
    if (not Lib.isAdmin(caller)) { Runtime.trap("Unauthorized") };
    Lib.deleteSubmission(submissions, id);
  };

  // --- Auth query ---

  public shared query ({ caller }) func isAdmin() : async Bool {
    Lib.isAdmin(caller);
  };
};
