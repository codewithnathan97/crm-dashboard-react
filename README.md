# CRM Pro Dashboard

A modern, responsive CRM backend dashboard built with React, TypeScript, and Tailwind CSS. Features comprehensive sales insights, pipeline management, and team performance tracking.

## Features

### 📊 Dashboard Overview
- **Key Metrics**: Revenue, deals, conversion rates, and average deal size
- **Revenue Trends**: Interactive area charts showing monthly performance
- **Pipeline Distribution**: Visual breakdown of deals across sales stages
- **Recent Activities**: Real-time feed of sales activities and updates
- **Top Performers**: Team leaderboard with performance metrics

### 🎯 Sales Insights
- Revenue tracking with trend analysis
- Deal pipeline visualization
- Customer analytics and segmentation
- Team performance metrics
- Win rate analysis
- Forecasting capabilities

### 🎨 Modern UI/UX
- Responsive design that works on all devices
- Collapsible sidebar navigation
- Interactive charts and visualizations
- Glass-effect styling and smooth animations
- Professional color scheme and typography

### 🚀 Navigation Sections
- **Dashboard**: Main overview with key insights
- **Customers**: Customer management (coming soon)
- **Deals**: Deal tracking and management (coming soon)
- **Pipeline**: Visual sales pipeline (coming soon)
- **Analytics**: Advanced analytics (coming soon)
- **Activities**: Activity tracking (coming soon)
- **Reports**: Custom reporting (coming soon)
- **Forecasting**: Sales forecasting tools (coming soon)
- **Calendar**: Schedule integration (coming soon)
- **Settings**: Configuration panel (coming soon)

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React for modern iconography
- **Build Tool**: Create React App

## Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Claude\ Sonnet\ 4
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the dashboard

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
src/
├── components/          # React components
│   ├── Sidebar.tsx     # Navigation sidebar
│   ├── Dashboard.tsx   # Main dashboard
│   └── MetricCard.tsx  # Reusable metric cards
├── data/               # Mock data and API integration
│   └── mockData.ts     # Sample CRM data
├── types/              # TypeScript type definitions
│   └── index.ts        # CRM data interfaces
├── App.tsx             # Main application component
├── index.tsx           # Application entry point
└── index.css           # Global styles and Tailwind imports
```

## Key Components

### Sidebar Navigation
- Collapsible sidebar with smooth animations
- Active state indicators
- User profile section with online status
- Tooltip support for collapsed state

### Dashboard
- **Metric Cards**: Key performance indicators with trend analysis
- **Revenue Chart**: Area chart showing monthly revenue trends
- **Pipeline Chart**: Pie chart displaying deal distribution
- **Activity Feed**: Recent sales activities and updates
- **Team Performance**: Top performers with progress bars

### Data Visualization
- Interactive charts using Recharts library
- Responsive design that adapts to screen size
- Custom tooltips and formatting
- Gradient fills and animations

## Customization

### Adding New Sections
1. Add new menu item to `Sidebar.tsx`
2. Create component in `src/components/`
3. Add route case in `App.tsx`

### Styling
- Modify `tailwind.config.js` for custom colors and themes
- Update `src/index.css` for global styles
- Use Tailwind classes for component-specific styling

### Data Integration
- Replace mock data in `src/data/mockData.ts`
- Add API integration functions
- Update TypeScript interfaces in `src/types/`

## Mock Data

The dashboard includes comprehensive mock data:
- **Customers**: 5 sample customers with contact information
- **Deals**: Sales opportunities across different stages
- **Activities**: Recent sales activities and interactions
- **Team Members**: Sales team with performance metrics
- **Metrics**: Key performance indicators and trends

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Future Enhancements

- [ ] Customer management interface
- [ ] Deal tracking and editing
- [ ] Advanced analytics dashboard
- [ ] Real-time notifications
- [ ] Data export functionality
- [ ] User authentication
- [ ] API integration
- [ ] Mobile app support
- [ ] Email integration
- [ ] Calendar synchronization

## Support

For questions or support, please open an issue in the repository or contact the development team.