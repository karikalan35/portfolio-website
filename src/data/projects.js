// Auto-import every image in ./images — name the file to match a project's
// `id` (e.g. images/uems.jpg for the project with id: "uems") and it's
// picked up automatically. No import line needed per project, ever.
const projectImages = import.meta.glob("./images/*.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});

function getImage(id) {
  const match = Object.keys(projectImages).find((path) =>
    path.includes(`/${id}.`)
  );
  return match ? projectImages[match] : null;
}

// Auto-import every screenshot too — put images in
// ./screenshots/<project-id>/ (any filenames, sorted alphabetically) and
// they show up on that project's detail page automatically.
const screenshotFiles = import.meta.glob(
  "./screenshots/*/*.{jpg,jpeg,png,webp,gif,mp4,webm,ogg,mov}",
  { eager: true, import: "default" }
);

function getScreenshots(id) {
  return Object.keys(screenshotFiles)
    .filter((path) => path.includes(`/screenshots/${id}/`))
    .sort()
    .map((path) => screenshotFiles[path]);
}

const PROJECTS_BASE = [
  {
    id: "uems",
    title: "University Event Management System",
    category: ["Web Development"],
    status: "Completed",
    year: 2025,
    featured: true,
    description: "A centralized platform for managing university events, registrations, approvals, and participant engagement, with role-based dashboards for admins, organizers, and students.",
    stack: ["React", "Node.js", "Express.js", "MongoDB", ],
    github: "https://github.com/karikalan35/User-Management-For-UEMS.git",
    demo: "#",
    overview: "UEMS replaces scattered spreadsheets and email threads with a single system for running campus events end to end — from an organizer submitting a proposal to a student checking in at the door.",
    problem: "Event approvals were handled over email with no audit trail, students had no central place to discover or register for events, and organizers couldn't see registration numbers until the day of the event.",
    solution: "Built a three-tier role system (Admin, Organizer, Student) on a shared MERN foundation, with JWT auth, a shared booking calendar component, and a single approval workflow with clear status states.",
    features: [
      "Role-based dashboards for Admin, Organizer, and Student",
      "Event proposal → approval → publish workflow with status tracking",
      "Shared BookingCalendar component reused across all three roles",
      "JWT authentication with route-level role middleware",
    ],
    challenges: "Keeping the three role-specific frontends visually and structurally consistent while four people worked in parallel required locking early architectural decisions — one shared Axios instance, no controllers folder, consistent status enum values — before UI work began.",
    future: "Email notifications on status changes, a waitlist system for capacity-limited events, and exporting attendance reports as CSV.",
  },
  {
  id: "statistical-analysis-agent",
  title: "AI-Assisted Statistical Analysis & Reporting System",
  category: ["AI", "Data Science"],
  status: "Ongoing",
  year: 2026,
  featured: true,
  description: "A two-agent system that runs multiple linear regression analysis in R and turns the verified results into a polished, professional Word report — without ever letting the AI invent or alter a statistical value.",
  stack: ["Python", "R", "NVIDIA API", "python-docx", "JSON"],
  github: "#",
  demo: "#",
  overview: "A pipeline split into two purpose-built agents: one performs the actual regression analysis, the other turns the verified output into a client-ready document, with a hard boundary between the two so presentation never touches the math.",
  problem: "Raw statistical output — R model summaries, JSON results, diagnostic plots — isn't something you can hand to a stakeholder as-is. Writing it up by hand every time is repetitive, and letting an LLM write the whole report risks it quietly inventing or misreporting numbers.",
  solution: "Agent 1 runs the multiple linear regression in R (driven by Python and the NVIDIA API) and writes its output to structured, verifiable files — a narrative report, a results JSON, and registered plot metadata. Agent 2 reads those files, cross-checks every number and figure it plans to use against the source data, optionally asks an LLM to organize the narrative into a document plan, and falls back to a deterministic layout if that response is unusable — then renders everything into a formatted Word report with python-docx.",
  features: [
    "Strict separation between statistical computation (Agent 1) and document generation (Agent 2)",
    "Every number and figure in the report is verified against results.json / plots.json before insertion — the AI can organize content but never invent or edit a value",
    "Retry and JSON-extraction logic so a malformed LLM response can't crash the pipeline",
    "Deterministic local fallback that still produces a complete, formatted report if the AI planner fails or is unavailable",
    "Professional document formatting: styled tables, figure/table numbering, a real heading hierarchy, and document metadata",
  ],
  challenges: "Getting an LLM to reliably return well-formed JSON for the document plan, and designing a result-integrity check strict enough that a hallucinated statistic can never reach the final document even if the AI planning step misbehaves.",
  future: "Support for regression types beyond OLS, and a mode for comparing multiple candidate model fits side by side.",
},
  {
    id: "data-analytics-dashboard",
    title: "Data Analytics Dashboard",
    category: ["Data Analytics", "Dashboards"],
    status: "Completed",
    year: 2025,
    description: "An interactive analytics dashboard that turns raw datasets into meaningful visual insights through charts, KPIs, and reports.",
    stack: ["Python", "SQL", "Power BI"],
    github: "#",
    demo: "#",
    overview: "A reporting layer built on top of raw operational data, giving non-technical stakeholders a way to explore trends without writing a query.",
    problem: "Raw data lived in a database that only technical users could query, so decision-makers were waiting on ad-hoc reports instead of exploring the data themselves.",
    solution: "SQL views clean and aggregate the source data, which Power BI consumes to drive a set of interactive KPI cards and drill-down charts.",
    features: ["KPI summary cards with period-over-period comparison", "Drill-down charts by category and time range", "Scheduled report exports"],
    challenges: "Designing SQL views that stayed performant as the underlying dataset grew, without pushing heavy aggregation logic into the BI layer.",
    future: "Row-level access control and a mobile-friendly report view.",
  },
  {
    id: "statistical-analysis",
    title: "Statistical Analysis Projects",
    category: ["Statistics", "Research"],
    status: "Completed",
    year: 2024,
    
    description: "A collection of statistical analyses involving hypothesis testing, regression models, probability, and real-world data interpretation.",
    stack: ["Python", "SPSS", "Jamovi"],
    github: "#",
    demo: "#",
    overview: "A body of coursework-driven statistical analysis, applying formal hypothesis testing and regression to real datasets rather than textbook examples.",
    problem: "Real datasets are messier than textbook problems — missing values, non-normal distributions, and ambiguous variable relationships that don't fit a single standard test.",
    solution: "Each analysis pairs an appropriate statistical test or model with explicit assumption checks, rather than defaulting to the same test across every dataset.",
    features: ["Hypothesis testing with assumption checks documented", "Linear and logistic regression models", "Written interpretation of results, not just output"],
    challenges: "Choosing the right test when a dataset only partially met a method's assumptions, and communicating statistical results to a non-statistical reader.",
    future: "Extending the collection with Bayesian methods.",
  },
  {
    id: "financial-analytics-dashboard",
    title: "Financial Analytics Dashboard",
    category: ["Dashboards", "Data Analytics"],
    status: "Ongoing",
    year: 2026,
    description: "A dashboard for analyzing financial performance, investment trends, and quantitative metrics using interactive visualizations.",
    stack: ["Power BI", "Python", "SQL"],
    github: "#",
    demo: "#",
    overview: "A quantitative dashboard tracking financial performance metrics over time, built to support investment-trend analysis at a glance.",
    problem: "Financial performance was reviewed manually in spreadsheets, making it slow to spot trends across time periods or compare metrics side by side.",
    solution: "Python handles metric calculation and data cleaning, SQL stores the processed results, and Power BI renders interactive comparison views.",
    features: ["Interactive trend charts across custom date ranges", "Metric comparison view across periods"],
    challenges: "Structuring the data model so new metrics could be added without rebuilding existing report pages.",
    future: "Forecasting overlays and scenario comparison.",
  },
  {
    id: "modern-portfolio",
    title: "Modern Portfolio Website",
    category: ["Web Development"],
    status: "Completed",
    year: 2026,
    featured: true,
    description: "A personal portfolio website showcasing projects, technical skills, education, and professional experience with modern UI/UX practices.",
    stack: ["React", "Vite", "React Router", "Framer Motion"],
    github: "#",
    demo: "#",
    overview: "The site you're looking at right now — a from-scratch portfolio built to be easy to extend as new projects are finished.",
    problem: "Needed a single place to point people that reflected current work, rather than an outdated static resume PDF.",
    solution: "A React site with content driven by a data file instead of hardcoded markup, so new projects and experience entries are additions, not rewrites.",
    features: ["Data-driven project and experience sections", "Responsive layout from mobile to desktop", "Client-side routing between pages"],
    challenges: "Keeping the design restrained instead of over-decorating every section.",
    future: "A written-content blog section and light mode.",
  },
  {
    id: "ai-automation-workflow",
    title: "AI Automation Workflow",
    category: ["AI"],
    status: "Ongoing",
    year: 2026,
    description: "Automation workflows integrating AI tools to streamline repetitive tasks, research, and content generation.",
    stack: ["Python", "AI APIs", "Automation Tools"],
    github: "#",
    demo: "#",
    overview: "A set of scripted workflows that chain AI API calls together to handle repetitive research and drafting tasks automatically.",
    problem: "The same multi-step tasks — gather, summarize, draft — were being done manually and identically every time.",
    solution: "Each workflow is a small pipeline of API calls with defined inputs and outputs, callable on a schedule or on demand.",
    features: ["Reusable pipeline steps across workflows", "Scheduled and on-demand execution"],
    challenges: "Handling API failures mid-pipeline without losing progress.",
    future: "A lightweight UI for configuring workflows without editing code.",
  },
  {
    id: "ml-prediction-model",
    title: "Machine Learning Prediction Model",
    category: ["AI", "Data Analytics"],
    status: "Ongoing",
    year: 2026,
    description: "A predictive analytics project applying machine learning algorithms to real-world classification and forecasting problems.",
    stack: ["Python", "Scikit-learn", "Pandas", "NumPy"],
    github: "#",
    demo: "#",
    overview: "An applied ML project comparing several classification and forecasting approaches on real-world tabular data.",
    problem: "Needed a predictive baseline for a classification task where the relevant features weren't obvious upfront.",
    solution: "Iterative feature engineering paired with cross-validated model comparison across several scikit-learn estimators.",
    features: ["Feature engineering pipeline", "Cross-validated model comparison", "Evaluation metrics beyond raw accuracy"],
    challenges: "Avoiding data leakage between feature engineering and validation splits.",
    future: "Hyperparameter tuning at scale and a simple prediction API.",
  },
];

export const PROJECTS = PROJECTS_BASE.map((p) => ({
  ...p,
  image: getImage(p.id),
  screenshots: getScreenshots(p.id),
}));

export const FILTERS = ["All", "AI", "Web Development", "Data Analytics", "Statistics", "Dashboards", "Research"];
export const STATUS_COLOR = {
  Completed: "var(--color-accent)",
  Ongoing: "var(--color-amber)",
};

export const EXPERIENCE = [

{
  range: "— in progress",
  title: "B.Sc. Industrial Statistics & Mathematical Finance ",
  org: "University of Colombo · Faculty of Science · ISMF",
  description: "Developing a combined foundation in statistics, mathematical finance, programming, and data analysis, with hands-on experience applying these skills through software, statistical analysis, and academic projects.",
  stack: ["Python", "R", "Statistics", "Data Analysis"],
},

{
  range: "— 2026",
  title: "Team Leader",
  org: "University Event Management System · Academic Team Project",
  description: "Leading a four-person team developing a role-based MERN university event management platform. Coordinating development and contributing to authentication, user management, middleware, shared React components, database integration, and the platform's UI design system.",
  stack: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
},

];

export function initials(title) {
  return title.split(" ").filter((w) => w.length > 2 || /[A-Z]/.test(w[0])).slice(0, 3).map((w) => w[0]).join("").toUpperCase();
}
