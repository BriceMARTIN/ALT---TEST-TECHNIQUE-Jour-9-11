# ALT---TEST-TECHNIQUE-Jour-9-11

ALT's technical test days 9-11

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Architecture

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Folder Structure](#2-folder-structure)
3. [Key Architectural Strategies](#3-key-architectural-strategies)

---

## 1. Project Overview

This project is a Single Page Application (SPA) built with React, designed to help organisations monitor and manage their application costs. It features a multi-page dashboard with data visualisations, filtering, and theme support.

### Tech Stack

| Category      | Technology        |
| ------------- | ----------------- |
| Framework     | React (CRA)       |
| Routing       | React Router      |
| HTTP Client   | Axios             |
| Charts        | Chart.js          |
| Styling       | Tailwind CSS      |
| Date Handling | Day.js            |
| State         | React Context API |
| Code Quality  | ESLint / Prettier |

---

## 2. Folder Structure

The project follows a **layer-based** structure, where files are grouped by their technical role rather than by feature. All application source code lives inside the `src/` directory.

```
src/
│   App.js                  # Root component, routing setup
│   index.js                # Entry point
│
├───api/                    # Axios API call functions
├───assets/                 # Static files (images, fonts, etc.)
├───components/             # Reusable UI components
│   ├───charts/             # Chart.js chart components
│   └───icons/              # SVG icon components
├───constants/              # App-wide constants (e.g. API base URLs)
├───context/                # React Context providers
├───hooks/                  # Custom React hooks
├───pages/                  # Top-level page components
└───utils/                  # Pure utility/helper functions
```

### Layer Responsibilities

**`api/`**
Each file in this layer maps to a specific resource (e.g. `ToolsApi.js`, `UsersApi.js`). They contain Axios calls and are the only place in the app where HTTP requests are made. This centralises the network logic and makes it easy to update endpoints without touching UI code.

**`components/`**
Houses all reusable UI components. The `charts/` subdirectory groups all Chart.js-based visualisations together (`BudgetProgress`, `MonthlySpend`, `DepartmentCost`, `TopExpensiveTools`), while `icons/` contains lightweight SVG wrapper components for consistent icon usage across the app.

**`constants/`**
Stores shared, static values such as the API base URL (`API.js`). Centralising these avoids hard-coded strings scattered across the codebase.

**`context/`**
Contains React Context providers. Currently manages two cross-cutting concerns: `ThemeContext.jsx` (light/dark mode) and `TabContext.jsx` (active navigation tab and Header's search bar). These are consumed globally and avoid prop-drilling.

**`hooks/`**
Reserved for custom React hooks that encapsulate reusable stateful logic (e.g. data fetching, local storage, responsive breakpoints). It was added proactively but not used in this scope's context.

**`pages/`**
Top-level route components: `Dashboard`, `Analytics`, `Tools`, and `Settings`. Each page composes components together and delegates data fetching to the `api/` layer.

**`utils/`**
Pure helper functions that contain no React-specific logic and can be tested independently.

---

## 3. Key Architectural Strategies

### 3.1 Separation of Concerns

The layer-based structure enforces a clear separation between **data**, **logic**, and **presentation**:

- **Data** → `api/` (network calls with Axios)
- **Logic** → `utils/`, `context/` (state, helpers, global concerns)
- **Presentation** → `components/`, `pages/` (React JSX and Tailwind styling)

### 3.2 Global State with React Context

Rather than introducing a third-party state management library, the app uses the built-in **React Context API** for the two pieces of state that need to be globally accessible:

- **`ThemeContext`** — provides the current colour theme and a toggle function, consumed by `Header` and any styled component that adapts to light/dark mode.
- **`TabContext`** — tracks the active navigation tab, keeping the `Header` and routing in sync without prop-drilling.

This approach is appropriate for the scope of the app. If global state needs grow significantly in the future (e.g. user authentication, complex caching), migrating to Zustand or Redux Toolkit would be a natural next step.

### 3.3 API Layer Isolation

All HTTP logic is isolated in the `api/` directory. Each file groups calls by resource:

```js
// Example: AnalyticsApi.js
import axios from "axios";
import { ANALYTICS_API_URL } from "../constants/API";

export const fetchAnalytics = async () => {
  try {
    const response = await axios.get(ANALYTICS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};
```

This means pages and components never import Axios directly — they only call functions from the `api/` layer. Benefits include easier mocking in tests, a single place to add auth headers or interceptors if needed, and painless endpoint changes.

### 3.4 Chart Encapsulation

Each Chart.js visualisation lives in its own component inside `components/charts/`. This keeps chart configuration (datasets, options, colours, responsiveness) fully encapsulated. Pages simply import and render a chart component with data as props, with no Chart.js-specific code leaking into page-level files.

### 3.5 Styling Strategy

The app uses **Tailwind CSS**. Key conventions:

- Tailwind utility classes are applied directly in JSX, avoiding the need for most custom CSS files.
- `App.css` and `index.css` are reserved for global resets, CSS variables (e.g. theme colour tokens), and any styles that cannot be expressed with Tailwind utilities.
- The `ThemeContext` toggles a class on the root element (e.g. `dark`).

### 3.6 Code Quality

ESLint and Prettier are configured to enforce consistent code style across the team. This ensures that formatting is never a concern during code reviews, and that common React mistakes (missing keys, unused variables, etc.) are caught early in development.

# Design System Evolution

### Context & Constraints

Tailwind CSS was not a design choice made for this project — it was imposed as a technical prerequisite. The styling strategy was therefore built within that constraint, focusing on using Tailwind effectively rather than around it.

Given the scope of the project, no custom `tailwind.config.js` extension or global CSS variables were introduced. This was a deliberate decision: adding that layer of abstraction was unnecessary overhead at this scale, and would have introduced complexity without meaningful benefit.

### Convention by Example

Rather than defining a design system upfront in a formal or speculative way, a **pragmatic, emergent approach** was taken. Conventions were established naturally through first implementations and consistently reused from there.

In practice, this means:

- The first time a UI pattern was needed (a stat card, a table row, a modal), deliberate decisions were made about spacing, typography, colour usage, and layout.
- Those decisions implicitly became the standard — subsequent components of the same type followed the same structure without needing a written spec.
- This approach avoids over-engineering while still producing a visually coherent result, as consistency comes from reuse rather than documentation.

# Navigation & User Journey

## Routing Setup

Routing is handled by **React Router v6**, configured directly in `App.js`. The app defines four flat routes, each mapping to a top-level page component:

| Route        | Component   | Description                                  |
| ------------ | ----------- | -------------------------------------------- |
| `/`          | `Dashboard` | Default landing page, cost overview          |
| `/tools`     | `Tools`     | Application tools and their associated costs |
| `/analytics` | `Analytics` | Data visualisations and spend trends         |
| `/settings`  | `Settings`  | User settings (out of scope, placeholder)    |

The routing structure is intentionally flat — there are no nested routes, no protected routes, and no redirects. This reflects the nature of the app: an internal dashboard where all pages are equally accessible at all times.

The `Header` component is rendered outside of `<Routes>`, meaning it is always visible regardless of the current route. This is the standard pattern for persistent navigation in SPAs.

## User Journey

There is no enforced or linear navigation flow — users can move freely between pages at any time via the `Header`. That said, the natural entry point and most common journey is as follows:

```
Dashboard (/)
    │
    ├── Tools (/tools)
    │       └── ToolDetailsModal (inline, on row click)
    │
    ├── Analytics (/analytics)
    │
    └── Settings (/settings) — placeholder, out of scope
```

**Dashboard** is the default route and serves as the primary overview — users land here first and get a high-level picture of costs across the organisation via `StatCard` components and summary charts.

From there, users would naturally navigate to **Tools** to explore individual application costs in more detail. The `ToolDetailsModal` is accessible directly from the tools table, providing deeper information without leaving the page.

**Analytics** offers a more data-driven view, with Chart.js visualisations covering spend trends and department breakdowns — likely consulted when a user wants to investigate patterns over time.

**Settings** was defined as a route within the scope of this project but its implementation was explicitly excluded. The page exists as a placeholder to keep the navigation structure complete and ready for future implementation.

# Data Integration Strategy

## API Layer Design

All network requests are made through dedicated functions in the `api/` directory, one file per resource. Each function follows the same structure: it makes an Axios call, returns the response data on success, and rethrows the error on failure after logging it.

```javascript
// AnalyticsApi.js
import axios from "axios";
import { ANALYTICS_API_URL } from "../constants/API";

export const fetchAnalytics = async () => {
  try {
    const response = await axios.get(ANALYTICS_API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching analytics:", error);
    throw error;
  }
};
```

Base URLs are never hard-coded into API files — they are imported from `constants/API.js`, which acts as the single source of truth for all endpoint definitions. This means that updating a URL requires a change in exactly one place.

This design ensures that no page or component ever imports Axios directly. The HTTP layer is fully encapsulated, making it straightforward to add cross-cutting concerns in the future — such as authentication headers, request interceptors, or response normalisation — without touching any UI code.

## Data Fetching in Pages

Data fetching is handled at the **page level** using `useEffect` and `useState`. Each page is responsible for fetching its own data on mount and storing it in local state. The pattern is consistent across all pages:

```javascript
const [analytics, setAnalytics] = useState(null);

useEffect(() => {
  const getAnalytics = async () => {
    try {
      const data = await fetchAnalytics();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    }
  };
  getAnalytics();
}, []);
```

A few aspects of this pattern are worth noting:

- **Initial state is `null`**, which serves as a loading signal.
- **Errors are caught at the page level**, keeping API functions clean and ensuring failures do not propagate silently to the UI.
- **The empty dependency array `[]`** means the fetch runs once on mount, which is appropriate for dashboard data that does not need to react to user input to trigger a refresh.

## Data Flow to Components

Once a page has fetched its data, it passes it down to child components as props. Components are kept deliberately **unaware of the network layer** — they receive data and render it, nothing more.

The `Analytics` page illustrates this clearly. It fetches a single analytics payload and distributes it to whichever chart component is currently active, selected via an internal tab state:

```
fetchAnalytics()
      │
      ▼
Analytics (page)
      │  data={analytics}
      ├──▶ MonthlySpend
      ├──▶ DepartmentCost
      ├──▶ TopExpensiveTools
      └──▶ BudgetProgress
```

Only one chart renders at a time, determined by `activeTab`. The full dataset is fetched once and shared across all four charts — there are no per-chart API calls. This keeps network usage minimal and avoids redundant requests when the user switches tabs.

This unidirectional data flow — **fetch once at the page level, pass down via props** — is a deliberate architectural choice that keeps components simple, reusable, and easy to reason about.

# Progressive Responsive Design

This part cannot be explained due to a lack of time.

# Performance Optimizations

This part cannot be explained due to a lack of time.

# Design Consistency Approach

This part cannot be explained due to a lack of time.

# Data Visualization Philosophy

This part cannot be explained due to a lack of time.

# Next Steps / Complete App Vision

- Conception and implementation of the `Settings` page
- Finishes to the Analytics page according to correct data and additional information regarding the vision of what charts should exactly display
- Implementation of the back-end side, including an actual database and a secure authentication system
- Testing and bug fixing, both on already implemented features and overall down the line
- Removal of the last few mock and placeholder data to replace them with API-provided data
- Addition of features allowing the creation, edition and deletion of data
- Addition of rules regarding data to control inputs and require fields to have a defined value
