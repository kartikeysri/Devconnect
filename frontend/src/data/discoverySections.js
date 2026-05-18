export const discoverySections = {
  articles: {
    key: 'articles',
    label: 'Articles',
    path: '/articles',
    eyebrow: 'Editorial network',
    title: 'Read developer articles that stay practical from intro to production.',
    description:
      'Discover tutorials, engineering notes, debugging stories, and architecture breakdowns written by builders who ship real software.',
    heroCard: {
      title: 'What readers open most',
      items: [
        'Step-by-step backend tutorials',
        'Frontend patterns with production tradeoffs',
        'AI workflow experiments and postmortems',
      ],
      footer: 'Fresh writing from contributors across web, mobile, cloud, and data.',
    },
    stats: [
      { value: '1.2k+', label: 'Published guides' },
      { value: '89%', label: 'Readers finish rate' },
      { value: '42', label: 'Topics updated weekly' },
    ],
    spotlight: [
      {
        title: 'Hands-on tutorials',
        description: 'Follow structured articles with examples, outcomes, and implementation notes.',
      },
      {
        title: 'Architecture breakdowns',
        description: 'See how teams think through performance, security, scale, and maintainability.',
      },
      {
        title: 'Postmortems that teach',
        description: 'Learn from real debugging sessions, failed launches, and the fixes that worked.',
      },
    ],
    columns: [
      {
        title: 'Formats readers love',
        items: ['Deep-dive tutorials', 'Short practical tips', 'System design explainers'],
      },
      {
        title: 'Why it helps',
        items: ['Save time researching', 'Compare tradeoffs faster', 'Follow writers you trust'],
      },
    ],
    timeline: [
      {
        tag: 'Featured',
        title: 'Shipping JWT auth without a security footgun',
        description: 'A practical guide to token lifecycles, refresh flows, and client-side storage decisions.',
      },
      {
        tag: 'Trending',
        title: 'React UI patterns that survive scale',
        description: 'Patterns for forms, async states, and routing that stay understandable as products grow.',
      },
      {
        tag: 'New',
        title: 'From tutorial to production deployment',
        description: 'A checklist-focused article series for moving from local success to reliable release.',
      },
    ],
    cta: {
      title: 'Start publishing your own technical writing.',
      description: 'Turn implementation notes and lessons learned into articles that help other developers.',
      primaryLabel: 'Join now',
      primaryTo: '/register',
      secondaryLabel: 'Meet developers',
      secondaryTo: '/developers',
    },
  },
  developers: {
    key: 'developers',
    label: 'Developers',
    path: '/developers',
    eyebrow: 'Builder directory',
    title: 'Find developers by skills, interests, and the work they actually share.',
    description:
      'Explore a growing community of frontend, backend, DevOps, mobile, and AI engineers who publish, collaborate, and mentor.',
    heroCard: {
      title: 'Community snapshot',
      items: [
        'Full stack builders open to collaboration',
        'Mentors sharing workflows and code reviews',
        'Specialists in cloud, AI, mobile, and data',
      ],
      footer: 'Profiles highlight strengths, published content, and current project interests.',
    },
    stats: [
      { value: '3.8k+', label: 'Developer profiles' },
      { value: '140+', label: 'Skill clusters' },
      { value: '510', label: 'New connections this month' },
    ],
    spotlight: [
      {
        title: 'Skill-based discovery',
        description: 'Browse developers by languages, frameworks, tooling, and engineering focus areas.',
      },
      {
        title: 'Visible proof of work',
        description: 'Profiles connect articles, projects, and learning streaks so expertise is easier to trust.',
      },
      {
        title: 'Collaboration signals',
        description: 'See who is open to pair programming, mentorship, hiring conversations, or building in public.',
      },
    ],
    columns: [
      {
        title: 'Popular specializations',
        items: ['React and UI systems', 'Spring Boot and APIs', 'Cloud and DevOps workflows'],
      },
      {
        title: 'Ways to connect',
        items: ['Follow profiles', 'Message collaborators', 'Track builders by interest area'],
      },
    ],
    timeline: [
      {
        tag: 'Rising',
        title: 'Frontend engineers sharing design system work',
        description: 'A fast-growing cluster of UI developers posting reusable patterns and component libraries.',
      },
      {
        tag: 'Active',
        title: 'Backend developers documenting API practices',
        description: 'Authors discussing security, performance, and service design with real implementation detail.',
      },
      {
        tag: 'New',
        title: 'AI engineers building product workflows',
        description: 'Developers experimenting with assistants, evals, and production automation patterns.',
      },
    ],
    cta: {
      title: 'Build a profile developers want to revisit.',
      description: 'Show your projects, favorite tools, and the kinds of collaboration you want more of.',
      primaryLabel: 'Create profile',
      primaryTo: '/register',
      secondaryLabel: 'Browse projects',
      secondaryTo: '/projects',
    },
  },
  projects: {
    key: 'projects',
    label: 'Projects',
    path: '/projects',
    eyebrow: 'Showcase gallery',
    title: 'Explore projects with enough detail to inspire your next build.',
    description:
      'See product demos, technical stacks, implementation decisions, and experiments from developers shipping in public.',
    heroCard: {
      title: 'Project themes people follow',
      items: [
        'Portfolio-grade full stack builds',
        'Open source utilities and toolchains',
        'Learning projects that document the journey',
      ],
      footer: 'From quick prototypes to polished launches, each project page tells the story behind the work.',
    },
    stats: [
      { value: '940+', label: 'Projects shared' },
      { value: '68%', label: 'Projects with live demos' },
      { value: '215', label: 'Build logs updated weekly' },
    ],
    spotlight: [
      {
        title: 'Tech stack clarity',
        description: 'Projects show languages, frameworks, APIs, hosting choices, and key implementation constraints.',
      },
      {
        title: 'Build-in-public momentum',
        description: 'Creators document milestones, obstacles, and future roadmap items to keep progress visible.',
      },
      {
        title: 'Useful inspiration',
        description: 'Readers can quickly compare patterns across projects before choosing their own approach.',
      },
    ],
    columns: [
      {
        title: 'Common categories',
        items: ['Developer tools', 'SaaS products', 'Mobile apps and utilities'],
      },
      {
        title: 'What stands out',
        items: ['Live demos', 'System diagrams', 'Roadmaps and iteration logs'],
      },
    ],
    timeline: [
      {
        tag: 'Featured',
        title: 'A production-ready community platform build',
        description: 'A full stack app with auth, profiles, content feeds, and polished public-facing UX.',
      },
      {
        tag: 'Trending',
        title: 'Small tools solving painful workflow gaps',
        description: 'Utilities for automation, debugging, note capture, and developer productivity.',
      },
      {
        tag: 'New',
        title: 'Learning projects with excellent documentation',
        description: 'Beginner-to-intermediate builds that explain every milestone clearly.',
      },
    ],
    cta: {
      title: 'Turn your current build into a project showcase.',
      description: 'Share the stack, the roadmap, and the lessons behind what you are creating.',
      primaryLabel: 'Share a project',
      primaryTo: '/register',
      secondaryLabel: 'Start learning',
      secondaryTo: '/learning',
    },
  },
  learning: {
    key: 'learning',
    label: 'Learning',
    path: '/learning',
    eyebrow: 'Guided growth',
    title: 'Follow learning paths built around skills developers actually need on the job.',
    description:
      'Move from scattered tutorials to focused learning tracks that connect reading, practice, and community feedback.',
    heroCard: {
      title: 'Current learning priorities',
      items: [
        'Modern frontend architecture',
        'Backend API design and auth flows',
        'Cloud deployment and developer tooling',
      ],
      footer: 'Tracks combine articles, projects, and contributors so learning feels connected instead of random.',
    },
    stats: [
      { value: '56', label: 'Learning tracks' },
      { value: '220+', label: 'Practice resources' },
      { value: '18k', label: 'Track saves by learners' },
    ],
    spotlight: [
      {
        title: 'Structured paths',
        description: 'Understand what to learn first, what to build next, and where deeper practice matters.',
      },
      {
        title: 'Community-backed curation',
        description: 'Tracks surface resources developers recommend because they helped in real projects.',
      },
      {
        title: 'Practice with context',
        description: 'Learning materials connect directly to projects and creator notes so concepts stick faster.',
      },
    ],
    columns: [
      {
        title: 'Top tracks',
        items: ['React foundations to advanced UI', 'Spring Boot API engineering', 'DevOps from local to cloud'],
      },
      {
        title: 'Support for learners',
        items: ['Save progress', 'Ask the community', 'Pair resources with practice builds'],
      },
    ],
    timeline: [
      {
        tag: 'Popular',
        title: 'Frontend foundations to shipping polish',
        description: 'A path that starts with layout and state, then moves into accessibility, performance, and design systems.',
      },
      {
        tag: 'Recommended',
        title: 'Backend fundamentals with security habits',
        description: 'Learn persistence, APIs, auth, validation, and deployment through one connected track.',
      },
      {
        tag: 'New',
        title: 'AI workflows for software teams',
        description: 'A practical route into prompting, evaluation thinking, and product integration patterns.',
      },
    ],
    cta: {
      title: 'Choose a track and keep your learning moving.',
      description: 'Build momentum with curated resources that fit how developers really practice.',
      primaryLabel: 'Join to learn',
      primaryTo: '/register',
      secondaryLabel: 'Read articles',
      secondaryTo: '/articles',
    },
  },
  community: {
    key: 'community',
    label: 'Community',
    path: '/community',
    eyebrow: 'Shared momentum',
    title: 'Stay close to the conversations, collaboration, and energy powering the platform.',
    description:
      'Community is where articles turn into discussion, projects turn into partnerships, and learning turns into confidence.',
    heroCard: {
      title: 'How people participate',
      items: [
        'Discuss articles and project launches',
        'Join topic-based circles and feedback loops',
        'Celebrate milestones and keep each other shipping',
      ],
      footer: 'The goal is less noise, more momentum: useful feedback, warm introductions, and visible progress.',
    },
    stats: [
      { value: '72', label: 'Active interest groups' },
      { value: '1.9k', label: 'Weekly discussions' },
      { value: '93%', label: 'Members returning monthly' },
    ],
    spotlight: [
      {
        title: 'Thoughtful discussion',
        description: 'Conversations stay grounded in code, product decisions, debugging, and practical advice.',
      },
      {
        title: 'Encouragement to ship',
        description: 'Builders share progress updates, ask for feedback, and get support without the noise.',
      },
      {
        title: 'Cross-discipline connection',
        description: 'Frontend, backend, design, DevOps, and AI builders learn from one another in one place.',
      },
    ],
    columns: [
      {
        title: 'Community spaces',
        items: ['Launch feedback', 'Learning circles', 'Collaboration requests'],
      },
      {
        title: 'What members gain',
        items: ['Higher accountability', 'Better feedback', 'A friendlier path through hard problems'],
      },
    ],
    timeline: [
      {
        tag: 'Live',
        title: 'Weekly build journals from active members',
        description: 'Short updates that make progress visible and open the door to timely advice.',
      },
      {
        tag: 'Growing',
        title: 'Topic circles for web, AI, DevOps, and mobile',
        description: 'Focused spaces where builders can find people working on similar problems.',
      },
      {
        tag: 'New',
        title: 'Feedback loops around launches and drafts',
        description: 'Members help each other improve product pages, technical writing, and early demos.',
      },
    ],
    cta: {
      title: 'Join a developer community that helps work move forward.',
      description: 'Create an account, share what you are building, and start participating in real conversations.',
      primaryLabel: 'Join community',
      primaryTo: '/register',
      secondaryLabel: 'See developers',
      secondaryTo: '/developers',
    },
  },
};

export const marketingNavItems = Object.values(discoverySections).map(
  ({ key, label, path }) => ({
    key,
    label,
    path,
  }),
);
