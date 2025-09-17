# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Essential Commands


### Testing
- Uses Vitest with jsdom environment
- Setup file: `src/setupTests.ts`
- Global test utilities available
- Run single test: `npm run test -- <test-file-pattern>`

## Project Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite (not Create React App despite README reference)
- **Styling**: Tailwind CSS with custom theme extensions
- **Charts**: Recharts for data visualization  
- **Icons**: Lucide React
- **Testing**: Vitest + React Testing Library + jsdom

### Application Structure
- **Single Page Application**: Navigation handled by state management in App.tsx
- **Component-based architecture**: Reusable components in `/components`
- **Mock data driven**: All data comes from `src/data/mockData.ts`
- **Type-safe**: Comprehensive TypeScript interfaces in `src/types/index.ts`

### Core Components
- `App.tsx`: Main application with section routing via state
- `Sidebar.tsx`: Collapsible navigation with user profile
- `Dashboard.tsx`: Main dashboard with metrics and charts  
- `CustomerManagement.tsx`: Full CRUD customer interface
- `Settings.tsx`: Multi-tab settings panel
- `MetricCard.tsx`: Reusable metric display component

### Data Architecture
- All data is mock data from `src/data/mockData.ts`
- No real API integration - components expect mock data structure
- Customer management has full CRUD operations in memory
- TypeScript interfaces define all data shapes in `src/types/index.ts`

### Styling System
- **Custom Tailwind theme**: Extended colors for primary palette and sidebar
- **Glass-effect styling**: Custom CSS classes in `index.css`
- **Responsive design**: Mobile-first approach
- **Custom font**: Inter font family

## Code Conventions

### File Organization
- Components in `/src/components/`
- Types in `/src/types/index.ts` 
- Mock data in `/src/data/mockData.ts`
- Global styles in `/src/index.css`

## Development Notes

### Current Implementation Status
- **Fully implemented**: Dashboard, Customer Management, Settings, Sidebar
- **Placeholder sections**: Deals, Pipeline, Analytics, Activities, Reports, Forecasting, Calendar
- **Navigation**: State-based routing in App.tsx switch statement

### Adding New Features
1. Add menu item to `Sidebar.tsx`
2. Create component in `src/components/`
3. Add case to switch statement in `App.tsx`
4. Update mock data in `src/data/mockData.ts` if needed
5. Add TypeScript interfaces in `src/types/index.ts`

### Performance Considerations
- Uses Vite for fast development and optimized builds
- Recharts for performant data visualization
- Tailwind CSS for optimized styling bundle
- Source maps enabled in production build
