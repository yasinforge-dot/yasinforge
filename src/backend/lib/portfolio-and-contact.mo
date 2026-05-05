import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Types "../types/portfolio-and-contact";

module {
  // --- Portfolio ---

  public func getProjects(projects : List.List<Types.Project>) : [Types.Project] {
    projects.toArray();
  };

  public func getProject(
    projects : List.List<Types.Project>,
    id : Types.ProjectId,
  ) : ?Types.Project {
    projects.find(func(p) { p.id == id });
  };

  // nextId is derived from list size to avoid var parameter injection
  public func addProject(
    projects : List.List<Types.Project>,
    input : Types.ProjectInput,
  ) : Types.Project {
    let project : Types.Project = {
      id = projects.size();
      title = input.title;
      category = input.category;
      description = input.description;
      techStack = input.techStack;
      imageUrl = input.imageUrl;
      createdAt = Time.now();
    };
    projects.add(project);
    project;
  };

  public func updateProject(
    projects : List.List<Types.Project>,
    id : Types.ProjectId,
    input : Types.ProjectInput,
  ) : ?Types.Project {
    var updated : ?Types.Project = null;
    projects.mapInPlace(
      func(p) {
        if (p.id == id) {
          let u : Types.Project = { p with
            title = input.title;
            category = input.category;
            description = input.description;
            techStack = input.techStack;
            imageUrl = input.imageUrl;
          };
          updated := ?u;
          u;
        } else { p };
      }
    );
    updated;
  };

  public func deleteProject(
    projects : List.List<Types.Project>,
    id : Types.ProjectId,
  ) : Bool {
    let sizeBefore = projects.size();
    let kept = projects.filter(func(p) { p.id != id });
    projects.clear();
    projects.append(kept);
    projects.size() < sizeBefore;
  };

  // --- Contact ---

  public func submitContact(
    submissions : List.List<Types.ContactSubmission>,
    input : Types.ContactInput,
  ) : Types.ContactSubmission {
    let sub : Types.ContactSubmission = {
      id = submissions.size();
      name = input.name;
      email = input.email;
      service = input.service;
      projectDetails = input.projectDetails;
      createdAt = Time.now();
    };
    submissions.add(sub);
    sub;
  };

  public func getSubmissions(
    submissions : List.List<Types.ContactSubmission>,
  ) : [Types.ContactSubmission] {
    submissions.toArray();
  };

  public func deleteSubmission(
    submissions : List.List<Types.ContactSubmission>,
    id : Types.SubmissionId,
  ) : Bool {
    let sizeBefore = submissions.size();
    let kept = submissions.filter(func(s) { s.id != id });
    submissions.clear();
    submissions.append(kept);
    submissions.size() < sizeBefore;
  };

  // --- Auth ---

  // Admin = any controller principal (Internet Identity-based access)
  public func isAdmin(caller : Principal) : Bool {
    caller.isController();
  };

  // --- Seed ---

  public func seedProjects(projects : List.List<Types.Project>) {
    if (projects.size() > 0) { return }; // already seeded
    let seeds : [Types.ProjectInput] = [
      {
        title = "Lagos State Judiciary Portal";
        category = "Government / Fintech";
        description = "A secure government judiciary portal for Lagos State enabling case management, e-payments, and digital records. Integrated Paystack for fine payments and built on a hardened Laravel backend with MySQL.";
        techStack = ["Laravel", "Paystack", "MySQL", "REST API"];
        imageUrl = "";
      },
      {
        title = "Roister Platform";
        category = "E-Commerce / Events";
        description = "A full-featured e-commerce and events platform with vendor management, Stripe payments, Zoho CRM integration, and a dynamic jQuery frontend for seamless user experience.";
        techStack = ["Laravel", "Stripe", "Zoho API", "jQuery", "MySQL"];
        imageUrl = "";
      },
      {
        title = "Airboot Crypto";
        category = "Crypto / Fintech";
        description = "A real-time crypto trading and digital wallet platform with live Binance API feeds, portfolio tracking, and secure digital asset management.";
        techStack = ["Laravel", "Binance API", "Digital Wallet", "WebSockets", "Vue.js"];
        imageUrl = "";
      },
      {
        title = "CutCue Barber";
        category = "Marketplace / Booking";
        description = "A B2C barber marketplace with geo-location discovery, real-time booking system, and a seamless mobile-first UI connecting customers with local barbers.";
        techStack = ["Laravel", "Geo-location API", "Booking System", "B2C", "MySQL"];
        imageUrl = "";
      },
    ];
    for (input in seeds.values()) {
      ignore addProject(projects, input);
    };
  };
};
