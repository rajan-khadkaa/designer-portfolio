// ─── CASE STUDY TYPES ────────────────────────────────────────────────────────

export interface CaseStudyMetadata {
  role: string;
  duration: string;
  tools: string;
  type: string;
  // status: string;
}

export interface SectionHeading {
  type: "heading";
  id: string;
  text: string;
}

export interface SectionText {
  type: "text";
  content: string;
}

export interface SectionImage {
  type: "image";
  // Replace src with the actual exported Figma image when ready. Use /test.png as placeholder.
  src: string;
  alt: string;
  caption: string;
}

export interface SectionList {
  type: "list";
  items: string[];
  listType: "ordered" | "unordered";
}

export interface SectionBeforeAfter {
  type: "before-after";
  // Replace imageBefore with the actual "before" screen export when ready. Use /test.png as placeholder.
  imageBefore: string;
  // Replace imageAfter with the actual "after" screen export when ready. Use /test.png as placeholder.
  imageAfter: string;
  beforeLabel: string;
  afterLabel: string;
  caption: string;
}

export interface SectionPrinciple {
  type: "principle";
  label: string;
  content: string;
}

export interface ReflectionItem {
  title: string;
  content: string;
}

export interface SectionReflection {
  type: "reflection";
  items: ReflectionItem[];
}

export type CaseStudySection =
  | SectionHeading
  | SectionText
  | SectionImage
  | SectionList
  | SectionBeforeAfter
  | SectionPrinciple
  | SectionReflection;

export interface CaseStudy {
  slug: string;
  title: string;
  tag: string;
  // Replace heroImage with the actual hero/cover image export when ready. Use /test.png as placeholder.
  heroImage: string;
  metadata: CaseStudyMetadata;
  readTime: string;
  readType: string;
  summary: string;
  sections: CaseStudySection[];
  relatedSlugs: string[];
}

// ─── SAFETRACK ───────────────────────────────────────────────────────────────

const safetrack: CaseStudy = {
  slug: "safetrack",
  title: "Safetrack",
  tag: "Mobile App Design",
  heroImage: "/case study resources/safetrack/bg.png",
  metadata: {
    role: "UX Researcher & UI Designer",
    duration: "3 weeks",
    tools: "Figma",
    type: "Mobile App Design",
  },
  readTime: "8 min",
  readType: "Deep Dive",
  summary:
    "Safetrack is a mobile app that brings real-time location tracking, school schedules, and event notifications together in one place for parents. The project uncovered that the core problem was not missing tools but missing connection between them. Parents felt reactive rather than informed. After two rounds of user testing, the design was iterated to be glanceable by default, with key information visible on the home screen without any interaction.",
  sections: [
    {
      type: "heading",
      id: "overview",
      text: "Overview",
    },
    {
      type: "text",
      content:
        "Safetrack is a mobile app I designed for parents who want to stay informed about their children's day without having to constantly call or text them. The app brings together real-time location tracking, school schedules, class routines, and event notifications in one place.\n\nI started this project because I noticed something that seemed small but was actually a real daily frustration for a lot of parents around me: they were managing their child's school life across multiple things at once. A printed school calendar on the fridge, a WhatsApp group for school updates, a separate app for location, and still somehow missing things. The problem was not that the tools did not exist. The problem was that none of them talked to each other, and none of them were designed with a parent's actual day in mind.\n\nThis case study walks through how I went from that observation to a tested, iterated mobile app design. I will be honest about what worked, what did not, and what I would do differently if I did this again.",
    },
    {
      type: "heading",
      id: "understanding",
      text: "Understanding the Problem First",
    },
    {
      type: "text",
      content:
        "Before I opened Figma, I wanted to make sure I actually understood what parents were struggling with. I had assumptions, but assumptions are not research.\n\nI have seen a lot of student projects where the designer skips this part or does a very quick version of it and then jumps straight into wireframes. I did not want to do that. The whole point of starting with research was to challenge my own assumptions and find out what parents actually cared about, not what I thought they cared about.\n\nSo I did interviews first.",
    },
    {
      type: "heading",
      id: "research",
      text: "Research",
    },
    {
      type: "text",
      content:
        "<b>Who I talked to</b>\n\nI interviewed 8 people from my close circle, family members and neighbors who are parents with school-going children. I chose this approach deliberately. I knew that parents in my context would speak more openly in a familiar, low-pressure setting than in something that felt like a formal study. I wanted honest answers, not polished ones.\n\nI kept the interviews conversational. I asked them about their typical morning routine, what stresses them out about their child's school day, what tools they currently use, and what frustrates them about those tools. I did not lead them toward any particular answer. I just listened.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/safetrack-notes-unorganized.png",
      alt: "Sticky notes from 8 parent interviews",
      caption:
        "Initial sticky notes from all 8 interviews, before sorting them into themes.",
    },
    {
      type: "text",
      content:
        "<b>What I heard</b>\n\nAcross all 8 interviews, a few things kept coming up again and again:",
    },
    {
      type: "list",
      listType: "unordered",
      items: [
        "Children sometimes took too long to return home and parents had no way of knowing where they were without calling. Most parents said they had called their child's phone and gotten no answer at some point, which made the worry worse.",
        "Parents missed school timing fairly often, not because they did not care but because they genuinely lost track of time while doing other things. A reminder system that they did not have to set up manually would have helped.",
        "School events and holidays were communicated through printed papers that the child would bring home, and those papers would get lost or forgotten. By the time the parent found out about a holiday, they had already made plans that conflicted with it.",
        "Most apps they had tried only did one thing. One app for location, one for reminders, nothing that combined what they actually needed in one place.",
        "Managing more than one child made all of this significantly harder. Every problem scaled with the number of children.",
      ],
    },
    {
      type: "text",
      content:
        "<b>Finding the patterns</b>\n\nAfter the interviews, I organized everything I had heard into groups. This helped me see which problems were most common, which were most urgent, and which were connected to each other.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/safetrack-notes-organized.png",
      alt: "Interview findings grouped into four themes",
      caption:
        "Sticky notes sorted into four themes: parent expectations, functionality, security, and affordability.",
    },
    {
      type: "text",
      content:
        "The grouping made something clear that was not obvious from the raw notes: most of the frustration was not about location tracking specifically. It was about being out of the loop. Parents felt reactive rather than informed. They were always finding out about things after they had already happened or after they had already caused a problem.\n\nThat reframe changed how I thought about the design. This was not a tracking app. It was an information app.",
    },
    {
      type: "heading",
      id: "problem",
      text: "Problem Statement",
    },
    {
      type: "text",
      content:
        "Parents of school-going children do not have a single place that keeps them proactively informed about their child's location, schedule, and school events. Instead they are piecing together information from multiple sources, often too late. This makes them anxious, disorganized, and dependent on systems that were not designed for them.",
    },
    {
      type: "heading",
      id: "requirements",
      text: "What the App Needed to Do",
    },
    {
      type: "text",
      content:
        "Based on everything I heard, I defined what the app actually needed to solve:",
    },
    {
      type: "list",
      listType: "unordered",
      items: [
        "Real-time location so parents know where their child is without having to call. Not just a map, but context: is the child at school, on the way home, somewhere unexpected?",
        "Schedule integration so the app knows when school starts and ends and can show parents a countdown rather than making them calculate it themselves.",
        "Event and holiday notifications that come early, not on the day.",
        "Emergency contact access that is fast. If something is wrong, parents should not be hunting for a phone number.",
        "Support for multiple children without the interface becoming complicated.",
      ],
    },
    {
      type: "heading",
      id: "userflow",
      text: "User Flow",
    },
    {
      type: "text",
      content:
        "Before designing any screens, I mapped out how a parent would move through the app from the moment they download it to daily use. This was important because onboarding and daily use are very different experiences. A parent setting up the app for the first time has patience for steps. A parent checking the app at 3pm between meetings does not.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/safetrack-flowchart.png",
      alt: "User flow diagram for Safetrack",
      caption:
        "Flow from onboarding and setup through daily use, including the panic mode branch.",
    },
    {
      type: "text",
      content:
        "The flow also helped me identify an edge case I had not thought about: what happens if a parent has not yet received the verification token from their child's school? I needed a holding state for that, not just an error message.\n\nThe onboarding path is one-time and setup-heavy. The daily use path needs to be fast and require as little interaction as possible. That distinction became a core principle for the home screen design.",
    },
    {
      type: "heading",
      id: "principles",
      text: "Design Principles",
    },
    {
      type: "principle",
      label: "Inform, not alarm",
      content:
        "Every piece of information in this app should reduce a parent's anxiety, not increase it. A large warning icon, an aggressive alert sound, a red screen: these things feel like they are communicating urgency but they actually just make people panic before they have read what the problem even is. Information should come first. Visual severity should follow from the content, not lead it.",
    },
    {
      type: "principle",
      label: "Glanceable by default",
      content:
        "A parent checking the app in the middle of their workday needs a three-second answer, not a thirty-second reading task. The home screen especially needed to surface the most important information without requiring any interaction.",
    },
    {
      type: "principle",
      label: "Same experience for one child or three",
      content:
        "The design needed to work for a parent with a single child and for a parent managing three, without making the simpler case feel complicated or the complex case feel cluttered.",
    },
    {
      type: "heading",
      id: "wireframes",
      text: "Wireframes",
    },
    {
      type: "text",
      content:
        "I started with low-fidelity wireframes in Figma. At this stage I was only thinking about structure and hierarchy, not visual design. I wanted to establish what information lived where and how a parent would move between screens before committing to any visual decisions.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/low-fidelity.png",
      alt: "Low fidelity wireframes for Safetrack",
      caption:
        "Wireframes for onboarding, sign up, location setup, home, schedule, history, and panic alert.",
    },
    {
      type: "text",
      content:
        "A few decisions I made at wireframe stage that shaped everything later:\n\nThe home screen would show all summary information at once with no interaction required. No carousels, no swipeable cards. A parent should be able to open the app and get a full picture in one glance.\n\nThe schedule page would separate today from the rest of the week clearly. Parents mostly care about today. This week is secondary. Everything else is tertiary.\n\nThe panic page would lead with the information, not the warning symbol. I kept the icon small and put the actual message in large, readable text at the top.",
    },
    {
      type: "heading",
      id: "testing",
      text: "User Testing",
    },
    {
      type: "text",
      content:
        "I tested the wireframe prototype with 5 people. Three of them were from my original interview group and two were people who had not been involved in the project at all. I wanted the familiar group to check whether I had actually addressed their concerns, and I wanted the new group to tell me if the app made sense to someone with no prior context.\n\nI gave each person four tasks:\n\n<ol><li>Find out what time school closes today.</li><li>Check if there are any events this week.</li><li>Locate your child on the map.</li><li>Find the school's emergency contact number.</li></ol>\n\nI watched them try to complete each task without helping them. I only asked follow-up questions after each task was done.",
    },
    {
      type: "text",
      content:
        "<b>Feedback I received</b>\n\nOne participant was not happy with the home screen. In my wireframes I had used a card carousel where different pieces of summary information were on separate swipeable cards. He said having to swipe felt like extra work when all he wanted was a quick overview. He would rather see everything at once even if it meant more content on screen.\n\nThis was direct feedback against my own wireframe decision, and he was right. A carousel on the home screen directly contradicted my \"glanceable by default\" principle. I had written the principle and then broken it in my own design. I appreciated that he caught it.\n\nAnother participant had a strong reaction to the panic page. My wireframe had a large warning icon centered on the screen above the alert information. He said the icon would make him panic before he had even read what the alert was about. He felt a large danger symbol on his screen would make him assume the worst before he knew the facts.\n\nAgain, this directly contradicted my \"inform, not alarm\" principle. The icon was supposed to communicate urgency. Instead it was communicating danger. There is a difference.",
    },
    {
      type: "heading",
      id: "iteration",
      text: "Iteration",
    },
    {
      type: "text",
      content:
        "Both pieces of feedback pointed to the same thing: I had written the right principles and then not followed them closely enough in the actual design. The testing made that visible.",
    },
    {
      type: "text",
      content: "<b>Home screen iteration</b>",
    },
    {
      type: "before-after",
      imageBefore: "/case study resources/safetrack/iteration-issue-1.png",
      imageAfter: "/case study resources/safetrack/iteration-solve-1.png",
      beforeLabel: "Card carousel",
      afterLabel: "Static summary view",
      caption:
        "Removed the carousel and replaced it with a vertical stack visible right away.",
    },
    {
      type: "text",
      content:
        "All the key information, like location status, school countdown, today's schedule, and upcoming events, is visible the moment the app opens. No interaction needed to see any of it.",
    },
    {
      type: "text",
      content: "<b>Panic page iteration</b>",
    },
    {
      type: "before-after",
      imageBefore: "/case study resources/safetrack/iteration-issue-2.png",
      imageAfter: "/case study resources/safetrack/iteration-solve-2.png",
      beforeLabel: "Icon-first layout",
      afterLabel: "Information-first layout",
      caption:
        "Large warning icon swapped for a countdown and a clearer message.",
    },
    {
      type: "text",
      content:
        "I replaced the large warning icon with a short countdown before the alert goes out, with the message itself as the most prominent thing on the screen. View Location and Call 911 sit right below it so a parent can read and respond quickly.\n\nI showed both revised designs to the participants who had given the feedback. Both confirmed that their concerns were resolved. I then tested the revised designs with three new participants who had no knowledge of the earlier versions. All three completed all four tasks without confusion or hesitation.",
    },
    {
      type: "heading",
      id: "final-designs",
      text: "Final Designs",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/1-welcome-features.png",
      alt: "Onboarding and feature highlights",
      caption:
        "Welcome screen and a short carousel covering tracking, schedules, and alerts.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/2-signin-signup.png",
      alt: "Sign in and sign up screens",
      caption:
        "Login, sign up, and password reset, all in the same clean layout.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/3-child-info.png",
      alt: "Add child information screens",
      caption: "Add a child's name, age, and photo to set up their profile.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/4-mark-locations.png",
      alt: "Mark locations screens",
      caption:
        "Set up and save home, school, and other key locations on the map.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/5-institute-info.png",
      alt: "Add institutional information screens",
      caption: "Add school details and verify with a token sent by the school.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/6-dashboard-map.png",
      alt: "Dashboard and location screens",
      caption:
        "Location status, school countdown, today's schedule, and the live map.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/7-schedule-events.png",
      alt: "Schedule and events screens",
      caption: "Routine and Events tabs, with today's class list.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/8-history-profile.png",
      alt: "History and profile screens",
      caption:
        "Arrival and departure log with sort and filter, plus account settings.",
    },
    {
      type: "image",
      src: "/case study resources/safetrack/9-safety-panic.png",
      alt: "Panic mode screens",
      caption:
        "Default safety state, a panic alert with a countdown, and live tracking.",
    },
    {
      type: "heading",
      id: "reflection",
      text: "What I Would Do Differently",
    },
    {
      type: "reflection",
      items: [
        {
          title: "I would recruit outside my close circle.",
          content:
            "My 8 interview participants were all from my immediate neighborhood and family network. They were open and honest, which was valuable, but they were also all from a similar background and context. Parents from different areas, different school types, or different income levels might have described the problem very differently. Next time I would put in more effort to reach a wider range of people, even if the sample size stayed the same.",
        },
        {
          title: "I would test earlier and with less polished material.",
          content:
            "I moved to wireframes fairly quickly after the interviews. In hindsight I should have tested the basic concept and navigation flow even earlier, maybe with just a rough sketch or a verbal walkthrough of the proposed structure. Two of the issues I caught in testing, the carousel and the panic icon, could have been identified before I had built out full wireframes if I had checked in with users sooner.",
        },
        {
          title: "I would design for the school side too.",
          content:
            "The app assumes that schools are sending verified data through a token system. But I never designed what that experience looks like for the school administrator. Who sets up the token? How does the school push schedule updates into the system? That half of the product does not exist in this case study, and a real version of this app would not work without it. I focused on the parent experience and treated the school side as a given. That was a gap.",
        },
        {
          title: "I would define success metrics before testing.",
          content:
            "I measured success by whether participants completed the tasks and whether they liked the revised designs. That is a reasonable starting point but it is soft. I did not set any specific targets before testing: what task completion rate would tell me the design was working? How long should it take to find emergency contact information? Having those numbers defined upfront would have made the testing more useful and the iteration decisions more grounded.",
        },
      ],
    },
  ],
  relatedSlugs: ["hrms"],
};

// ─── HRMS ────────────────────────────────────────────────────────────────────

const hrms: CaseStudy = {
  slug: "hrms",
  title: "HRMS",
  tag: "Web Application Design",
  heroImage: "/case study resources/hrms/bg.png",
  metadata: {
    role: "UX Researcher & UI Designer",
    duration: "3 weeks",
    tools: "Figma",
    type: "Web Application Design",
  },
  readTime: "9 min",
  readType: "Deep Dive",
  summary:
    "HRMS is a web-based HR management system designed to connect recruitment, employee management, and payroll workflows in one place. Research showed that HR teams were not lacking features. They were struggling with disconnected, manual steps that caused errors and delays. A key design challenge was making the resigned role handoff visible, so vacant positions get flagged right away instead of falling through the cracks. Testing showed the dashboard needed an overall attendance view alongside individual records, which was added in iteration.",
  sections: [
    {
      type: "heading",
      id: "overview",
      text: "Overview",
    },
    {
      type: "text",
      content:
        "HRMS is a web-based HR management system I designed to help HR teams handle recruitment, employee management, and payroll in one place. The project came from a simple observation: HR work involves a lot of steps that depend on each other, and most of the tools available either do too little or do too much in a way that makes them hard to actually use.\n\nWhen I started researching this, I expected to find that people wanted more features. What I actually found was the opposite. HR teams were not struggling because their tools lacked functionality. They were struggling because the tools they had were slow, disconnected from each other, and required too much manual work to keep synchronized. A candidate's status would be updated in one place but not another. A role would go unfilled for weeks after an employee resigned because nothing flagged it as vacant. Payroll data would live in a spreadsheet that had to be manually updated every time something changed in the HR system.\n\nThe problem was not missing features. It was missing connection between the steps that HR teams were already doing every day.\n\nThis case study documents how I went from that understanding to a tested, high-fidelity design for a system that tries to connect those steps rather than add to the pile.",
    },
    {
      type: "heading",
      id: "problem-detail",
      text: "The Problem in Detail",
    },
    {
      type: "text",
      content:
        "Recruitment is the part of HR work that tends to be the most time-consuming and the most prone to error. Here is what the process typically looks like without a proper system:\n\nA role opens up. Someone in HR writes a job description and manually posts it to multiple job boards one by one. Applications come in through different channels and have to be collected and sorted manually. Resume screening is done by reading through each one individually. Interview scheduling happens over email, with multiple back-and-forth messages to find a time that works. Hiring decisions get discussed in meetings and noted in someone's personal files. Offer letters are sent manually. Onboarding is a separate process that HR has to initiate manually once the hire is confirmed.\n\nAt every single step, information has to be moved from one place to another by hand. And at every step, there is a chance for something to be missed, delayed, or lost.\n\nBeyond recruitment, there is a specific problem that I found particularly interesting: what happens when an employee resigns. In most systems, the resignation is recorded, the exit process is handled, and then nothing happens automatically. The role that person was filling just becomes vacant, and it is up to someone in HR to notice and act on it. In busy departments, this can mean a role goes unfilled for weeks longer than it needed to because no one flagged it in time.",
    },
    {
      type: "heading",
      id: "research",
      text: "Research",
    },
    {
      type: "text",
      content:
        "<b>What I needed to find out</b>\n\nRather than starting with open-ended interviews, I structured my research around specific questions that I knew I needed answers to before I could make design decisions:",
    },
    {
      type: "list",
      listType: "ordered",
      items: [
        "What do HR teams actually need most from a system like this? What problems are they solving every day?",
        "How do current systems handle the job posting and application review process? Where do they fall short?",
        "How do HR teams track candidates across multiple stages? What does that process look like right now?",
        "What happens to a role when an employee resigns? How is the gap managed?",
        "Where does the most time get lost in a typical hiring cycle?",
        "What do existing tools do well, and what do users wish they did differently?",
      ],
    },
    {
      type: "text",
      content:
        "<b>How I researched</b>\n\nI looked at several existing HR tools including Workday, BambooHR, and Zoho People. I went through their interfaces, read user reviews, and noted where people consistently praised them and where they consistently complained. I also talked informally with HR colleagues and people I knew who worked in HR departments. These conversations were less formal than structured interviews but gave me real, specific examples of what the daily frustration actually looked like in practice.",
    },
    {
      type: "heading",
      id: "pain-points",
      text: "Pain Points",
    },
    {
      type: "principle",
      label: "Everything takes too long",
      content:
        "Posting a job, reviewing a stack of resumes, scheduling five interviews, following up with candidates who went quiet: each of these things takes time individually. Strung together with no automation and no central tracking, they consume a significant part of an HR team's week every single time a role opens.",
    },
    {
      type: "principle",
      label: "Manual processes create errors",
      content:
        "When information has to be moved between systems by hand, things get missed. A candidate gets an interview confirmation but is not added to the tracking sheet. A hiring decision gets made but the offer letter is delayed because the person responsible did not see the update. These are small failures individually but they add up, and they reflect poorly on the organization to the candidates experiencing them.",
    },
    {
      type: "principle",
      label: "No single place to see where things stand",
      content:
        "Without a central pipeline view, an HR manager who wants to know the status of every open role has to check multiple places or ask multiple people. The information exists somewhere, but nowhere useful.",
    },
    {
      type: "principle",
      label: "Resigned roles fall through the cracks",
      content:
        "When someone leaves, their role becomes vacant. In many systems, nothing happens automatically. The departure is recorded, the exit is processed, and then it is up to someone to remember to start the hiring process for that role. This is a workflow gap that a well-designed system could close.",
    },
    {
      type: "heading",
      id: "userflow",
      text: "User Flow",
    },
    {
      type: "image",
      src: "/case study resources/hrms/hrms-flowchart.png",
      alt: "HRMS user flow diagram",
      caption: "How a user moves from landing page to dashboard and beyond.",
    },
    {
      type: "text",
      content:
        "The flow follows a user from their very first visit to daily use. A new user lands on the homepage, signs up, then drops into the dashboard. A returning user skips straight to login. From there, the dashboard branches out into employees, payroll, recruitment, and tasks, and every path loops back to the dashboard before logging out.",
    },
    {
      type: "heading",
      id: "wireframes",
      text: "Wireframes",
    },
    {
      type: "image",
      src: "/case study resources/hrms/low-fidelity.png",
      alt: "Low fidelity wireframes for HRMS",
      caption: "Wireframes for the dashboard, employee list, login, landing page, and 404.",
    },
    {
      type: "text",
      content:
        "A few decisions that shaped the final design:\n\nThe dashboard would show summary cards only, one per major area: recruitment, employees, payroll, attendance. No live data tables on the dashboard itself. The dashboard is for a quick overview, and detailed data belongs on its own page with its own controls.\n\nThe recruitment section was split into two views. A list view shows all open roles with their applicant counts and pipeline status. Drilling into a role opens a Kanban-style pipeline board where every candidate is a card and every column is a hiring stage, from initial interview through technical test to final interview and hired. An HR manager can see the full picture at a glance without navigating away.\n\nThe employee list, attendance, and tasks pages all follow the same pattern: summary cards at the top for quick totals, and a data table below with filters, search, and inline actions on each row so common tasks do not require a separate page.",
    },
    {
      type: "heading",
      id: "design-system",
      text: "Design System",
    },
    {
      type: "text",
      content: "<b>Typography</b>",
    },
    {
      type: "image",
      src: "/case study resources/hrms/typography.png",
      alt: "Typography scale for HRMS",
      caption: "Heading, body, and label sizes using Poppins.",
    },
    {
      type: "text",
      content:
        "I kept the typography choices simple and functional. This is a productivity tool used for hours at a time, so readability in dense contexts was the priority. I used Poppins as the single typeface across the whole system and set up a clear hierarchy between headings, body text, labels, and captions. Nothing decorative. Every type choice is there to make information easier to read.",
    },
    {
      type: "text",
      content: "<b>Color</b>",
    },
    {
      type: "image",
      src: "/case study resources/hrms/colors.png",
      alt: "Color palette for HRMS",
      caption: "Background, border, and text grays, plus brand, success, and danger colors.",
    },
    {
      type: "text",
      content:
        "Color in this system is not decorative. The grays handle backgrounds, borders, and text. Green always means active or successful, and red always means an error or rejected state. The primary brand color is reserved for anything interactive, like buttons and links. Keeping this consistent across every screen makes status easy to read at a glance.",
    },
    {
      type: "heading",
      id: "final-designs",
      text: "High-Fidelity Designs",
    },
    {
      type: "image",
      src: "/case study resources/hrms/signin.png",
      alt: "Sign In page",
      caption: "Centered card with email, password, and sign in with Google.",
    },
    {
      type: "image",
      src: "/case study resources/hrms/signup.png",
      alt: "Sign Up page",
      caption: "Same layout as Sign In, with fields for company and account details.",
    },

    {
      type: "image",
      src: "/case study resources/hrms/dashboard.png",
      alt: "Main HRMS dashboard",
      caption: "Employee and recruitment status, revenue, and team attendance at a glance.",
    },
    {
      type: "image",
      src: "/case study resources/hrms/employees.png",
      alt: "Employee list page",
      caption: "Dense data table with search, filters, and inline quick actions.",
    },
    {
      type: "image",
      src: "/case study resources/hrms/payroll.png",
      alt: "Payroll page",
      caption: "Salary breakdown for each employee, with status and export.",
    },
    {
      type: "image",
      // Replace src with your actual attendance page export path.
      src: "/case study resources/hrms/attendance.png",
      alt: "Attendance page",
      caption: "Summary cards for total present, late arrivals, and attendance rate, with a check-in and check-out log below.",
    },
    {
      type: "image",
      // Replace src with your actual recruitment list page export path.
      src: "/case study resources/hrms/recruitment-1.png",
      alt: "Recruitment list page",
      caption: "All open roles in one table, with applicant counts, team assignments, and pipeline status.",
    },
    {
      type: "image",
      // Replace src with your actual recruitment pipeline/Kanban export path.
      src: "/case study resources/hrms/recruitment-2.png",
      alt: "Recruitment Kanban pipeline",
      caption: "Candidate pipeline for a single role, with hiring stages as columns and candidates as movable cards.",
    },
    {
      type: "image",
      // Replace src with your actual tasks page export path.
      src: "/case study resources/hrms/tasks.png",
      alt: "Tasks page",
      caption: "Team tasks with priority badges, progress tracking, and deadlines in one table.",
    },
    {
      type: "image",
      src: "/case study resources/hrms/landing-page.png",
      alt: "HRMS landing page",
      caption: "Landing page with headline, CTA buttons, and additional information.",
    },
    {
      type: "image",
      src: "/case study resources/hrms/not-found.png",
      alt: "404 page",
      caption: "Simple message with a button back to the dashboard.",
    },
    {
      type: "heading",
      id: "testing",
      text: "User Testing",
    },
    {
      type: "text",
      content:
        "I tested with HR colleagues and people who worked in HR departments professionally. This was an intentional choice. Testing a tool like this with general users who have no HR background would not have given me useful feedback because the workflows are specific to that context. I needed people who would immediately recognize whether something matched how the work actually happens or not.\n\nMost feedback was positive, which made the one strong piece of critical feedback stand out more clearly.\n\n<b>Feedback I received</b>\n\nOne tester pointed out that the dashboard showed individual attendance, arrival and departure times, but gave no quick way to see how the whole team was doing. She suggested adding a simple chart that shows overall attendance at a glance, so a manager does not have to read through individual records just to get a general sense of the week.\n\nShe was right. I had shown attendance per employee because that felt like the most useful detail, but I had not thought about what a manager actually needs to check first. The distinction matters.",
    },
    {
      type: "heading",
      id: "iteration",
      text: "Iteration",
    },
    {
      type: "before-after",
      imageBefore: "/case study resources/hrms/iteration-issue.png",
      imageAfter: "/case study resources/hrms/iteration-solve.png",
      beforeLabel: "Individual attendance only",
      afterLabel: "Added overall attendance chart",
      caption: "Dashboard iteration. Individual attendance only, then an added overall attendance chart.",
    },
    {
      type: "text",
      content:
        "I added a chart showing the team's overall attendance trend, sitting right alongside the per employee detail. This follows the idea that a dashboard should give a quick read first, with the option to dig into specifics after.\n\nI showed the revised design to the same tester. She said it gave her exactly the kind of overview she was missing. I then showed both versions to four other HR colleagues and asked which they preferred. Four out of five chose the revised version. The fifth had no strong preference.",
    },
    {
      type: "heading",
      id: "reflection",
      text: "What I Would Do Differently",
    },
    {
      type: "reflection",
      items: [
        {
          title: "I would map each user role separately before designing anything.",
          content:
            "HRMS is used by at least three different types of people: recruitment managers, payroll administrators, and general HR staff. They have different priorities, different daily workflows, and different information needs. I designed mostly for a generalist HR user, which meant the design was a reasonable fit for everyone but probably not a great fit for anyone specifically. I would spend more time upfront mapping each role's workflow before touching any screen.",
        },
        {
          title: "I would get the candidate pipeline into testing much earlier.",
          content:
            "The Kanban-style pipeline is one of the more interaction-heavy parts of the system and I only finalized it at the high-fidelity stage. By the time it was ready to test properly, the project was nearly done. If something fundamental was wrong with how candidates move between stages, I would not have had time to address it properly. Next time I would prototype the pipeline concept early and test it before investing in the full visual design.",
        },
        {
          title: "I would test with realistic data volume.",
          content:
            "My testing happened with placeholder data: five fake employees, two open roles, a handful of applications. Real HR systems deal with hundreds of employees, dozens of open roles at any given time, and payroll tables that are very long. An interface that feels clean and readable with five rows can feel overwhelming with two hundred. I would want at least one round of testing with a realistic data set to catch those kinds of issues before they become problems in a real deployment.",
        },
        {
          title: "I would design the empty states.",
          content:
            "Every new account starts with nothing: no employees, no job postings, no payroll records. The first screen a new user sees after signing up is a dashboard full of zeros and empty tables. I never designed what that experience should look like or how it should guide the user to start setting things up. Empty states are easy to forget and important to get right. They are the first real interaction a new user has with the system after signing up, and I left them as an afterthought.",
        },
      ],
    },
  ],
  relatedSlugs: ["safetrack"],
};

// ─── EXPORTS ─────────────────────────────────────────────────────────────────

export const CASE_STUDIES: CaseStudy[] = [safetrack, hrms];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((cs) => cs.slug === slug);
}
