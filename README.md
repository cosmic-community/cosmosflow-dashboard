# CosmosFlow Dashboard

![App Preview](https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=1200&h=300&fit=crop&auto=format)

A high-fidelity, responsive productivity dashboard that transforms task management into a cosmic journey. The centerpiece Galaxy Hub visualizes your daily and weekly progress through stunning orbital paths and animated stars, making productivity tracking an immersive visual experience.

## Features

- 🌌 **Galaxy Hub Visualization** - Central dashboard element displaying progress via orbital paths and glowing stars
- 📊 **Real-time Progress Metrics** - Live tracking of daily/weekly completion rates, focus time, and energy levels
- 🎯 **Cosmic Task System** - Priority-based task management (Supernova, Stellar, Cosmic Dust)
- ⏱️ **Focus Session Tracking** - Deep work timer with session history and productivity insights
- 🌠 **Galaxy Projects** - Organize tasks into color-coded project categories
- 📱 **Fully Responsive** - Optimized experience across desktop, tablet, and mobile devices
- 🎨 **Dark Mode Design** - Deep space aesthetic with neon cyan/magenta accents
- ♿ **Accessible** - High contrast ratios and keyboard navigation support

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=691ff65eb183692bb397d2f7&clone_repository=691ffc18b183692bb397d34b)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a high-fidelity, responsive User Interface (UI) for a productivity web application called 'CosmosFlow'. The design must be captivating and visually stimulating, using metaphors related to the universe, such as galaxies, stars, and orbits, to transform productivity into a cosmic journey. The aesthetic must be dark mode, high-contrast, professional, and contemporary (not juvenile), ensuring superior usability and clarity. Use deep space blues/purples for the background and neon cyan/magenta accents for interactive elements."

### Code Generation Prompt

> "Design the main dashboard. The central visual element must be a 'Galaxy Hub' showing daily and weekly progress via orbital paths and active stars. Key progress metrics should be displayed clearly."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 16** - App Router with React Server Components
- **TypeScript** - Strict type safety throughout
- **Tailwind CSS** - Utility-first styling with custom cosmic theme
- **Cosmic SDK** - Headless CMS integration for content management
- **React** - Component-based UI architecture
- **Framer Motion** - Smooth animations and transitions

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with bucket configured
- Environment variables for Cosmic API access

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd cosmosflow-dashboard
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Tasks with Galaxy Data

```typescript
import { cosmic } from '@/lib/cosmic'

// Get all tasks with related galaxy information
const { objects: tasks } = await cosmic.objects
  .find({ type: 'tasks' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include galaxy object data

// Filter by priority
const supernovaTasks = tasks.filter(
  task => task.metadata.priority.key === 'supernova'
)
```

### Retrieving Focus Sessions

```typescript
// Get recent focus sessions with task details
const { objects: sessions } = await cosmic.objects
  .find({ type: 'focus-sessions' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Calculate total focus time
const totalMinutes = sessions.reduce(
  (sum, session) => sum + session.metadata.duration,
  0
)
```

### Galaxy Progress Tracking

```typescript
// Get all galaxies with progress data
const { objects: galaxies } = await cosmic.objects
  .find({ type: 'galaxies' })
  .props(['id', 'title', 'slug', 'metadata'])

// Calculate overall progress
const averageProgress = galaxies.reduce(
  (sum, galaxy) => sum + (galaxy.metadata.progress || 0),
  0
) / galaxies.length
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS with three main object types:

### Tasks
- Priority levels: Supernova (urgent), Stellar (important), Cosmic Dust (low priority)
- Status tracking: Mission Planned, In Orbit, Completed, Black Hole
- Energy ratings (1-5 scale)
- Connected to Galaxy projects

### Galaxies
- Project categorization with custom colors and icons
- Progress tracking (0-100%)
- Visual organization of related tasks

### Focus Sessions
- Time tracking for deep work periods
- Markdown notes for session insights
- Connected to specific tasks
- Completion status tracking

## Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Click the "Deploy" button above
2. Connect your GitHub repository
3. Add environment variables in Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click "Deploy to Netlify"
2. Connect your repository
3. Add environment variables in Netlify dashboard
4. Build command: `bun run build`
5. Publish directory: `.next`

### Environment Variables

Required environment variables for production:

```env
COSMIC_BUCKET_SLUG=your-production-bucket-slug
COSMIC_READ_KEY=your-production-read-key
COSMIC_WRITE_KEY=your-production-write-key
```

Set these in your hosting provider's dashboard under Environment Variables or Settings.

## Project Structure

```
cosmosflow-dashboard/
├── app/
│   ├── page.tsx              # Main dashboard with Galaxy Hub
│   ├── layout.tsx            # Root layout with global styles
│   └── globals.css           # Tailwind and custom CSS
├── components/
│   ├── GalaxyHub.tsx         # Central progress visualization
│   ├── ProgressMetrics.tsx   # Stats dashboard
│   ├── TaskList.tsx          # Task management interface
│   ├── GalaxyCard.tsx        # Project category cards
│   └── CosmicBadge.tsx       # Attribution badge
├── lib/
│   └── cosmic.ts             # Cosmic SDK configuration
├── types.ts                  # TypeScript definitions
└── tailwind.config.js        # Tailwind theme configuration
```

<!-- README_END -->