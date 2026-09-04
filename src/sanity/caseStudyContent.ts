type PortableTextBlock = {
  _key: string;
  _type: "block";
  style: string;
  markDefs: never[];
  children: Array<{ _key: string; _type: "span"; marks: never[]; text: string }>;
};

type ContentCard = {
  _key: string;
  _type: "problemCard" | "solutionCard" | "keyFeature";
  title: string;
  content: PortableTextBlock[];
};

const block = (key: string, text: string, style = "normal"): PortableTextBlock => ({
  _key: key,
  _type: "block",
  style,
  markDefs: [],
  children: [{ _key: `${key}-span`, _type: "span", marks: [], text }],
});

const blocks = (prefix: string, paragraphs: string[]) =>
  paragraphs.map((text, index) => block(`${prefix}-${index + 1}`, text));

const narrative = (prefix: string, sections: Array<[string, string]>) =>
  sections.flatMap(([title, text], index) => [
    block(`${prefix}-${index + 1}-heading`, title, "h2"),
    block(`${prefix}-${index + 1}-body`, text),
  ]);

const cards = (
  prefix: string,
  type: ContentCard["_type"],
  items: Array<[string, string]>
): ContentCard[] =>
  items.map(([title, text], index) => ({
    _key: `${prefix}-${index + 1}`,
    _type: type,
    title,
    content: [block(`${prefix}-${index + 1}-content`, text)],
  }));

export const improvedCaseStudies = [
  {
    id: "fc2be926-c2ad-4ade-a29c-d48fcb4c9b0c",
    source: "Practice_Fusion_Automation_Portfolio_Case_Study.docx",
    content: {
      title: "Practice Fusion Automation for Patient Scheduling & Chart Intake",
      metaTitle: "Practice Fusion Scheduling & Chart Intake Automation | EaseWorkflow",
      metaDescription:
        "A queue-driven Practice Fusion automation for patient scheduling, chart updates, document uploads, API synchronization, and recoverable exception handling.",
      client: "Private Clinic",
      industry: "Healthcare Workflow Automation",
      tags: ["Practice Fusion", "EHR Automation", "Patient Scheduling", "Chart Intake", "API Integration", "Python", "Selenium"],
      summary: blocks("pf-intake-summary", [
        "A queue-driven Python and Selenium workflow connected external patient data with Practice Fusion. It routed new, existing, and appointment-based patients through scheduling, chart and profile updates, document uploads, backend status updates, and patient-level error handling.",
        "The project is best understood as production-style custom workflow automation: it was designed around changing browser state, authentication interruptions, incomplete records, and the need to keep the rest of a patient batch moving when one item failed.",
      ]),
      problem: blocks("pf-intake-problem", [
        "The original workflow required staff to search for patients, check or create appointments, move through multiple chart sections, repeat data entry, upload forms, and report the outcome to another system.",
        "Different patient types required different processing paths. The workflow also depended on external data, browser verification, dynamic UI states, and reliable continuation after partial failures.",
      ]),
      solution: blocks("pf-intake-solution", [
        "The automation loads a local JSON queue with backend API retrieval as a fallback, validates each record, classifies the patient path, and then coordinates the required Practice Fusion workflow.",
        "It handles patient search, appointment creation or updates, structured chart and profile entry, generated-form retrieval and upload, backend status synchronization, operational logs, error queues, liveness tracking, and Chrome profile management.",
      ]),
      explanation: narrative("pf-intake-flow", [
        ["1. Load and validate the queue", "Patient records are loaded from JSON or retrieved through the backend API. Invalid or incomplete records are isolated before browser entry begins."],
        ["2. Route the patient workflow", "The processing layer distinguishes new, existing, and appointment-based patients so each record follows the appropriate sequence."],
        ["3. Schedule and update Practice Fusion", "The system searches for the patient, checks existing appointments, fills scheduling fields, and updates the required chart and profile sections."],
        ["4. Handle documents and integrations", "Generated PDF forms can be downloaded from the backend and uploaded to the appropriate patient chart workflow, while statuses and relevant data are synchronized through APIs."],
        ["5. Record outcomes and continue", "Successes and failures are logged at patient level. Failed items can be reviewed or rerun without discarding the rest of the queue."],
      ]),
      problemCards: cards("pf-intake-p", "problemCard", [
        ["Repetitive navigation", "Scheduling, chart entry, profile updates, and document handling required repeated movement through a dynamic EHR interface."],
        ["Multiple patient paths", "New, existing, and appointment-based patients did not follow one identical sequence."],
        ["Authentication interruptions", "Browser verification and OTP-style prompts could interrupt long-running sessions."],
        ["Batch-level risk", "Without patient-level isolation, one incomplete record could stop the entire processing queue."],
      ]),
      solutionCards: cards("pf-intake-s", "solutionCard", [
        ["Queue-driven orchestration", "A persistent processing loop loads, validates, routes, completes, and records each patient job."],
        ["Defensive browser automation", "Explicit waits, state checks, fallback selectors, and profile cleanup handle changing UI conditions."],
        ["API-connected workflow", "Backend retrieval, document download, status updates, and data exchange keep the browser workflow connected to operational systems."],
        ["Recoverable exceptions", "Separate error records, logs, screenshots, and liveness tracking make incomplete work visible and rerunnable."],
      ]),
      keyFeatures: cards("pf-intake-k", "keyFeature", [
        ["Patient queue processing", "Loads patient batches from JSON or API sources and routes each supported patient type."],
        ["Appointment automation", "Searches patients, checks appointments, and fills provider, appointment type, duration, date, and time."],
        ["Structured chart updates", "Populates supported clinical, demographic, pharmacy, insurance, guarantor, and care-team fields."],
        ["Document upload", "Retrieves generated PDF forms and uploads them into the appropriate patient chart workflow."],
        ["Operational visibility", "Maintains logs, statuses, error queues, browser recordings, and a liveness heartbeat."],
      ]),
      tools: ["Python", "Selenium", "ChromeDriver", "REST APIs", "OpenAI API", "JSON", "YAML", "CSV logging", "ffmpeg", "psutil"],
      results: blocks("pf-intake-results", [
        "Created a repeatable patient-processing loop instead of a collection of isolated browser scripts.",
        "Reduced repetitive scheduling, chart-entry, document-upload, and status-reporting work.",
        "Added patient-level error tracking, recovery paths, logs, and liveness monitoring.",
        "Supported separate configured bot instances with their own browser profiles and settings.",
        "No before-and-after timing, throughput, accuracy, or ROI measurements were available, so the impact is intentionally described qualitatively.",
      ]),
    },
  },
  {
    id: "31823e4f-5461-4eec-902a-a92008a1ca59",
    source: "Availity_Eligibility_Automation_Case_Study.docx",
    content: {
      title: "Availity Eligibility Automation: From EHR Appointments to API-Ready PDFs",
      metaTitle: "Availity Eligibility Automation Case Study | EaseWorkflow",
      metaDescription:
        "A Practice Fusion-to-Availity eligibility workflow with payer normalization, OTP handling, consistent PDF output, API delivery, logging, and retries.",
      client: "Private Clinic",
      industry: "Healthcare Eligibility Automation",
      tags: ["Availity", "Practice Fusion", "Eligibility Verification", "Payer Automation", "API Integration", "Python", "Selenium"],
      summary: blocks("availity-summary", [
        "This workflow turns a repetitive eligibility process into a scheduled pipeline: collect upcoming appointments and patient data from Practice Fusion, normalize payer information, complete the Availity browser workflow, generate a consistent full-page PDF, and upload the file and metadata to a backend API.",
        "The engineering focus was reliability in an unpredictable browser environment, including OTP prompts, payer variation, Chrome profile locks, loading states, partial failures, and auditable output.",
      ]),
      problem: blocks("availity-problem", [
        "Staff had to move between Practice Fusion, Availity, patient records, payer-specific forms, OTP prompts, exported results, and backend uploads for every patient scheduled for eligibility processing.",
        "Small differences in payer names, login state, browser behavior, and file handling could interrupt a run or create inconsistent results.",
      ]),
      solution: blocks("availity-solution", [
        "The system builds a machine-readable work queue from Practice Fusion appointments, normalizes patient and payer data, then uses Selenium to complete the authorized Availity workflow.",
        "A dedicated OTP handler, explicit waits, payer-aware rules, full-page capture through Chrome DevTools Protocol, PDF conversion, API upload, daily logging, and retry information support unattended scheduled operation.",
      ]),
      explanation: narrative("availity-flow", [
        ["1. Build the work queue", "The Practice Fusion automation enumerates appointments, visits patient profiles, and stores the eligibility fields in a machine-readable queue."],
        ["2. Normalize patient and payer data", "Payer names and related fields are matched against prioritized rules so the correct workflow and result sections can be selected."],
        ["3. Complete the Availity workflow", "Selenium handles login state, cookies, field entry, dropdowns, submission, result detection, and OTP entry when the portal requests it."],
        ["4. Create a consistent record", "The full result page is captured through Chrome DevTools Protocol and converted to PDF with the insured ID included in the filename."],
        ["5. Deliver and monitor", "The PDF and patient metadata are uploaded through the configured API, while daily logs and error summaries support troubleshooting and reruns."],
      ]),
      problemCards: cards("availity-p", "problemCard", [
        ["Cross-system repetition", "Staff repeatedly copied appointment, patient, and insurance data between the EHR and payer portal."],
        ["Payer variation", "Different payer names and portal paths required prioritized matching and payer-specific processing rules."],
        ["Authentication friction", "OTP prompts and stale browser profiles could interrupt otherwise unattended runs."],
        ["Inconsistent output", "Browser print behavior did not produce a sufficiently predictable record for storage and audit."],
      ]),
      solutionCards: cards("availity-s", "solutionCard", [
        ["EHR-to-payer queue", "Upcoming appointments and patient data are collected into a structured processing queue."],
        ["Payer-aware automation", "Normalization and matching rules select the appropriate Availity workflow."],
        ["Isolated OTP handling", "A dedicated handler polls the configured service, tries multiple selectors, and submits within a defined timeout."],
        ["API-ready PDF delivery", "Consistent PDFs and patient metadata are uploaded with identifier mappings and fallback behavior."],
      ]),
      keyFeatures: cards("availity-k", "keyFeature", [
        ["Explicit waits", "Loading-state checks reduce dependence on fixed delays in the browser workflow."],
        ["Retries and recovery", "Failed patients or uploads remain identifiable and can be retried without blindly restarting the full run."],
        ["Predictable PDFs", "Full-page capture and image-to-PDF conversion produce a consistent artifact."],
        ["Configuration-driven deployment", "Endpoints, keys, payer mappings, and scheduler settings are not hard-coded into the main workflow."],
        ["Centralized logging", "Daily INFO, ERROR, and DEBUG records make production troubleshooting more practical."],
      ]),
      tools: ["Python", "Selenium WebDriver", "Chrome DevTools Protocol", "Requests", "Pillow", "YAML", "Windows Task Scheduler"],
      results: blocks("availity-results", [
        "Replaced repeated appointment lookup, payer-form entry, result export, and file delivery with one coordinated workflow.",
        "Produced consistent eligibility PDF records and reduced administrative handoffs.",
        "Added logs, retries, file checks, error summaries, and recovery information for incomplete runs.",
        "Implementation note: the result-scraping method exists but is replaced by a placeholder in the documented orchestration version, so scraped eligibility data is not active in that API payload.",
        "No formal automated unit or integration test suite, measured time savings, or ROI figures were present in the source evidence.",
      ]),
    },
  },
  {
    id: "b9edfeb3-0c60-42e7-825e-7ff4e905c54b",
    source: "PracticeFusion_Clinical_Workflow_Automation_Case_Study.docx",
    content: {
      title: "Practice Fusion Clinical Workflow Automation",
      metaTitle: "Practice Fusion Clinical Workflow Automation | EaseWorkflow",
      metaDescription:
        "A reliable Practice Fusion workflow for structured SOAP entry, ICD-10 validation, backend status synchronization, session recovery, and patient-level exceptions.",
      client: "Private Clinic",
      industry: "Clinical Workflow Automation",
      tags: ["Practice Fusion", "Clinical Workflow", "SOAP Notes", "ICD-10", "EHR Automation", "API Integration", "Selenium"],
      summary: blocks("pf-clinical-summary", [
        "This browser automation retrieves pending patient data, opens the correct Practice Fusion chart and encounter, enters available structured SOAP content, validates and attaches ICD-10 diagnosis codes, updates backend processing status, and records the outcome.",
        "The workflow was built around reliability and traceability: authentication drift, signed or missing encounters, changing page states, malformed or duplicate codes, and individual patient failures are handled explicitly.",
      ]),
      problem: blocks("pf-clinical-problem", [
        "For each patient, staff could need to locate the record, open the correct encounter, verify its state, enter structured note content, add diagnosis codes, save the result, and update another system.",
        "Practice Fusion is a dynamic browser application with loading delays, redirects, lock screens, verification prompts, signed encounters, stale browser state, and UI elements that do not always behave predictably.",
      ]),
      solution: blocks("pf-clinical-solution", [
        "The automation acts as a layer around the clinic's existing EHR rather than replacing it. Python orchestrates patient jobs while Selenium follows the authorized Practice Fusion workflow.",
        "Backend APIs, local JSON recovery data, ICD validation, duplicate detection, CSV logs, screenshots, status updates, and independent browser profiles provide the operational controls required for ongoing runs.",
      ]),
      explanation: narrative("pf-clinical-flow", [
        ["1. Establish a usable session", "A bot-specific Chrome profile is launched and the current authentication state is checked. Login, lock, and verification states are handled or paused for human completion."],
        ["2. Retrieve pending work", "Pending patients are pulled from the backend API and stored locally to preserve recoverability."],
        ["3. Open the correct chart", "The automation finds the patient and relevant encounter, then checks whether the encounter can be processed."],
        ["4. Enter structured content safely", "Available Subjective, Objective, and Plan content is entered, while ICD-10 codes are checked for valid format and duplicates before attachment."],
        ["5. Sync and document the outcome", "The patient status is updated through the API and success, incomplete processing, or failure details are preserved in logs and screenshots."],
      ]),
      problemCards: cards("pf-clinical-p", "problemCard", [
        ["Repeated chart work", "Patient lookup, encounter navigation, SOAP entry, diagnosis coding, and status reporting required repeated manual steps."],
        ["Dynamic EHR state", "Loading delays, signed encounters, unavailable elements, and stale sessions made a happy-path script insufficient."],
        ["Clinical data safeguards", "Diagnosis-code entry required validation and duplicate checks before writing to the chart."],
        ["Partial failures", "A missing encounter or rejected code needed a visible, recoverable outcome without stopping the full batch."],
      ]),
      solutionCards: cards("pf-clinical-s", "solutionCard", [
        ["Patient-level jobs", "Each patient is processed independently so one recoverable problem does not terminate the queue."],
        ["Session recovery", "The workflow recognizes login, lock, redirect, and browser-verification states."],
        ["Validation before writing", "ICD format checks and duplicate detection reduce the chance of repeating invalid data."],
        ["Operational evidence", "API statuses, JSON records, CSV logs, and screenshots show what was attempted and where intervention is needed."],
      ]),
      keyFeatures: cards("pf-clinical-k", "keyFeature", [
        ["Structured SOAP entry", "Places available structured Subjective, Objective, and Plan content into the appropriate encounter sections."],
        ["ICD-10 safeguards", "Validates code format and checks for an existing code before attempting to add it."],
        ["Authentication-state handling", "Detects session drift and uses controlled recovery or a human verification pause."],
        ["Independent bot profiles", "Supports separately configured browser profiles, credentials, API settings, and active bot instances."],
        ["Traceable outcomes", "Records success, incomplete processing, and failure details for each patient."],
      ]),
      tools: ["Python", "Selenium", "Chrome WebDriver", "REST APIs", "JSON", "YAML", "CSV logging"],
      results: blocks("pf-clinical-results", [
        "Reduced repetitive patient lookup, encounter navigation, structured data entry, and status-reporting steps.",
        "Standardized how available SOAP content is entered and added safeguards around diagnosis-code handling.",
        "Improved processing visibility through backend updates, local records, logs, and screenshots.",
        "Kept the queue moving when individual patients encountered recoverable problems.",
        "No measured percentage of time saved or throughput figure was available in the project evidence.",
      ]),
    },
  },
  {
    id: "1d2f9551-7ea8-49f2-aaf3-3bdc48389b68",
    source: "PracticeFusion_Clinical_Workflow_Automation_Case_Study.docx",
    content: {
      title: "Engineering Deep Dive: Practice Fusion Session Recovery",
      metaTitle: "Practice Fusion Session Recovery & Resilient Automation | EaseWorkflow",
      metaDescription: "How a Practice Fusion automation handles login drift, lock screens, verification prompts, stale Chrome profiles, and recoverable patient failures.",
      client: "Practice Fusion Automation Engineering",
      industry: "Healthcare Workflow Engineering",
      tags: ["Practice Fusion", "Session Recovery", "Browser Automation", "Healthcare Automation", "Selenium", "Reliability Engineering"],
      summary: blocks("session-summary", ["This engineering deep dive explains how the Practice Fusion workflows were designed for authentication drift and changing browser state instead of assuming one uninterrupted session."]),
      problem: blocks("session-problem", ["Long-running EHR sessions can return to login or lock screens, request browser verification, leave stale Chrome processes, or load UI elements in unexpected states. Any of these conditions can interrupt a patient batch."]),
      solution: blocks("session-solution", ["The login and profile layers detect session state, separate human verification from the main workflow, clean up conflicting Chrome processes, and combine explicit waits, retries, state checks, and controlled pauses." ]),
      explanation: narrative("session-flow", [
        ["Recognize state before acting", "The automation checks for login, lock, redirect, and browser-verification states rather than assuming the chart is ready."],
        ["Keep verification controlled", "When OTP or browser verification is required, the clinical workflow can pause for human completion instead of weakening the security control."],
        ["Protect persistent profiles", "Conflicting Chrome processes are identified and cleaned up before reusing a bot-specific profile."],
        ["Contain the failure", "If a session or chart problem affects one patient, the outcome is recorded so the remaining queue can continue where safe."],
      ]),
      problemCards: cards("session-p", "problemCard", [["Session drift", "Authentication state can change during long-running automation."], ["Profile locks", "Stale Chrome processes can prevent a persistent profile from starting."], ["Dynamic loading", "Late or unavailable elements can make fixed-time scripts fail unpredictably."]]),
      solutionCards: cards("session-s", "solutionCard", [["State detection", "Checks the visible application state before continuing."], ["Controlled verification", "Uses a human pause or isolated OTP handler according to the workflow."], ["Recovery controls", "Combines explicit waits, retries, profile cleanup, logs, and screenshots."]]),
      keyFeatures: cards("session-k", "keyFeature", [["Bot-specific profiles", "Keeps configured browser sessions separate."], ["Explicit waits", "Responds to actual loading and page state."], ["Patient-level logging", "Preserves the exact point and reason for incomplete work."]]),
      tools: ["Python", "Selenium", "Chrome WebDriver", "Chrome profiles", "CSV logging", "Screenshots"],
      results: blocks("session-results", ["Reduced one class of hard-to-diagnose startup and authentication failures.", "Made verification interruptions and incomplete patient work visible instead of silently losing state.", "This is an engineering deep dive into the larger Practice Fusion projects, not a separate measured client outcome."]),
    },
  },
  {
    id: "3efa76a4-473b-443f-9ef5-2cadddee3eb6",
    source: "Practice_Fusion_Automation_Portfolio_Case_Study.docx",
    content: {
      title: "Engineering Deep Dive: AI-Assisted Pharmacy Matching",
      metaTitle: "AI-Assisted Pharmacy Matching in Practice Fusion | EaseWorkflow",
      metaDescription: "A focused OpenAI-assisted matching step inside a larger Practice Fusion scheduling and chart-intake automation.",
      client: "Practice Fusion Automation Engineering",
      industry: "Healthcare AI Integration",
      tags: ["Practice Fusion", "OpenAI API", "Pharmacy Matching", "Healthcare AI", "Workflow Automation", "Human-in-the-Loop"],
      summary: blocks("pharmacy-summary", ["OpenAI was used as a small decision-support layer inside the larger Practice Fusion workflow to select the most likely pharmacy from candidate search results. It was not the primary workflow engine."]),
      problem: blocks("pharmacy-problem", ["Pharmacy search results are not always deterministic. Candidate names and details can vary enough that a rigid first-result rule may select the wrong option or require repeated staff review."]),
      solution: blocks("pharmacy-solution", ["The workflow gathers candidate search results and uses the OpenAI API as a focused matching aid. The broader scheduling, chart, API, document, and recovery steps remain deterministic automation." ]),
      explanation: narrative("pharmacy-flow", [["Keep AI narrowly scoped", "Only the ambiguous matching decision is delegated to the model; the rest of the workflow follows explicit rules."], ["Use real candidates", "The model chooses among pharmacy options returned by the live search rather than inventing an unrelated destination."], ["Preserve operational controls", "Logs, patient status, error queues, and retry behavior remain part of the surrounding workflow."]]),
      problemCards: cards("pharmacy-p", "problemCard", [["Ambiguous candidates", "Search results may contain similar pharmacy names or inconsistent formatting."], ["Fragile first-result rules", "Selecting the first candidate would not reliably represent the intended pharmacy."]]),
      solutionCards: cards("pharmacy-s", "solutionCard", [["Candidate-based matching", "AI assists with choosing the closest option from the returned candidates."], ["Deterministic surrounding workflow", "Patient retrieval, browser steps, status updates, and recovery remain rule-based."]]),
      keyFeatures: cards("pharmacy-k", "keyFeature", [["Focused OpenAI integration", "Uses AI only where ambiguity makes matching useful."], ["Workflow integration", "Returns the selected candidate to the existing Practice Fusion automation path."], ["Maintenance boundary", "The matching quality depends on the available candidate search results."]]),
      tools: ["OpenAI API", "Python", "Selenium", "Practice Fusion", "REST APIs"],
      results: blocks("pharmacy-results", ["Added a targeted decision-support component to a broader operational automation.", "Demonstrated how AI can complement deterministic healthcare workflows without being presented as clinical decision-making.", "No independent matching-accuracy metric was available in the project evidence."]),
    },
  },
  {
    id: "08223948-4d88-4738-abc1-6b232bee3a66",
    source: "Practice_Fusion_Automation_Portfolio_Case_Study.docx",
    content: {
      title: "Engineering Deep Dive: Practice Fusion Document Upload Automation",
      metaTitle: "Practice Fusion Document Upload Automation | EaseWorkflow",
      metaDescription: "How generated PDF forms are retrieved through an API, attached to the correct Practice Fusion patient workflow, and tracked with recoverable errors.",
      client: "Practice Fusion Automation Engineering",
      industry: "Healthcare Document Automation",
      tags: ["Practice Fusion", "Document Upload", "PDF Automation", "Patient Records", "API Integration", "Selenium"],
      summary: blocks("documents-summary", ["This engineering deep dive covers the document-handling module inside the larger Practice Fusion scheduling and chart-intake project: retrieve generated forms from a backend API, upload them to the appropriate patient chart workflow, update status, and preserve errors for review or rerun."]),
      problem: blocks("documents-problem", ["Generated patient forms had to move from a backend system into the correct Practice Fusion record. Repeating the download, patient lookup, chart navigation, upload, and status-reporting steps created operational overhead and made partial failures difficult to trace."]),
      solution: blocks("documents-solution", ["The automation downloads the required PDF forms through the backend API, navigates to the relevant patient record and document workflow, completes the upload, reports status, and records patient-level errors without terminating the remaining queue." ]),
      explanation: narrative("documents-flow", [["Retrieve the required form", "The workflow requests the generated PDF from the configured backend endpoint."], ["Match the active patient job", "The document step runs within the patient-processing context so the file and record remain associated."], ["Upload through Practice Fusion", "Selenium completes the authorized chart and document workflow in the browser."], ["Record the outcome", "Backend status, logs, error queues, screenshots, and liveness signals preserve operational visibility."]]),
      problemCards: cards("documents-p", "problemCard", [["Repeated file handling", "Each form required download, patient lookup, navigation, upload, and follow-up status work."], ["Partial-failure risk", "A failed document step could otherwise stop or obscure the rest of the patient batch."], ["Limited traceability", "Without logs and status records, staff could not easily identify which file or patient needed intervention."]]),
      solutionCards: cards("documents-s", "solutionCard", [["API retrieval", "Downloads generated PDF forms from the backend."], ["Patient-context upload", "Runs the upload inside the active patient's chart workflow."], ["Recoverable errors", "Keeps incomplete uploads visible and available for review or rerun."]]),
      keyFeatures: cards("documents-k", "keyFeature", [["PDF document handling", "Transfers generated forms into the Practice Fusion workflow."], ["Backend synchronization", "Updates processing status through APIs."], ["Operational evidence", "Uses logs, error queues, screenshots, and liveness tracking."]]),
      tools: ["Python", "Selenium", "REST APIs", "PDF files", "JSON queues", "CSV logging"],
      results: blocks("documents-results", ["Reduced repeated file-transfer and chart-navigation steps within the larger patient-processing workflow.", "Added patient-level visibility for successful and incomplete document work.", "This is a technical deep dive into a documented project capability; no standalone timing or error-rate metric was available."]),
    },
  },
] as const;

const sourceDocumentCaseStudyIds = new Set<string>([
  "fc2be926-c2ad-4ade-a29c-d48fcb4c9b0c",
  "31823e4f-5461-4eec-902a-a92008a1ca59",
  "b9edfeb3-0c60-42e7-825e-7ff4e905c54b",
]);

export const sourceDocumentCaseStudies = improvedCaseStudies.filter((study) =>
  sourceDocumentCaseStudyIds.has(study.id)
);
