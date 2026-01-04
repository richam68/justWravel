# JustWravel Frontend

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Components](#components)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Scripts](#scripts)
- [Styling](#styling)

## Features

- **Customer Management**: Create and view customer profiles with contact information
- **Trip Management**: Add and display trip listings with full details
- **Traveller Management**: Manage traveller profiles and information
- **Booking System**: Complete booking workflow with customer, trip, and traveller selection
- **Real-time Updates**: Automatic refresh after data creation
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **State Management**: Centralized state using Redux Toolkit
- **Error Handling**: User-friendly error messages and loading states
- **Tab Navigation**: Clean interface with organized sections

## Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.4
- **State Management**: Redux Toolkit 2.11.2
- **HTTP Client**: Axios 1.7.9
- **Styling**: Tailwind CSS 4.1.18
- **Compiler**: React Compiler (Babel plugin)
- **Linting**: ESLint 9.39.1
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn
- Backend API running (see backend README)

### Installation

1. Navigate to the frontend directory:

```bash
cd frontend/just-wravel
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory (see [Environment Variables](#environment-variables))

4. Start the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Environment Variables

Create a `.env` file in the `frontend/just-wravel` directory:

```env
# Backend API URL
VITE_API_BASE_URL=http://localhost:8080/v1
```

**Note**: Environment variables must be prefixed with `VITE_` to be exposed in the Vite application.

## Project Structure

```
frontend/just-wravel/
├── public/                 # Static assets
├── src/
│   ├── api/               # API integration layer
│   │   ├── client.js          # Axios instance & interceptors
│   │   ├── bookingApi.js      # Booking API calls
│   │   ├── customerApi.js     # Customer API calls
│   │   ├── travellerApi.js    # Traveller API calls
│   │   └── tripApi.js         # Trip API calls
│   ├── assets/            # Images, icons, etc.
│   ├── components/        # React components
│   │   ├── BookingForm.jsx
│   │   ├── BookingList.jsx
│   │   ├── CustomerForm.jsx
│   │   ├── CustomerList.jsx
│   │   ├── TravellerForm.jsx
│   │   ├── TravellerList.jsx
│   │   ├── TripForm.jsx
│   │   └── TripList.jsx
│   ├── store/             # Redux state management
│   │   ├── bookingSlice.js    # Booking state slice
│   │   └── store.js           # Redux store configuration
│   ├── App.css            # Global styles
│   ├── App.jsx            # Main application component
│   ├── index.css          # Tailwind directives
│   └── main.jsx           # Application entry point
├── .env                   # Environment variables (not in git)
├── eslint.config.js       # ESLint configuration
├── index.html             # HTML entry point
├── package.json           # Dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite configuration
```

## Components

### Form Components

#### CustomerForm

Creates new customers with validation for:

- Full Name
- Email
- Phone Number

#### TripForm

Creates trip listings with:

- Trip Name
- Destination
- Start/End Dates
- Price
- Max Travellers

#### TravellerForm

Manages traveller information:

- Full Name
- Age
- Gender
- Emergency Contact

#### BookingForm

Handles complete booking flow:

- Customer selection
- Trip selection
- Traveller selection (multiple)
- Number of travellers
- Total amount calculation

### List Components

All list components display data in a clean, organized format:

- **CustomerList**: Displays all customers with contact information
- **TripList**: Shows available trips with details
- **TravellerList**: Lists all registered travellers
- **BookingList**: Shows booking history with references

## State Management

The application uses **Redux Toolkit** for state management:

### Booking Slice

```javascript
{
  customerId: null,
  tripId: null,
  travellerIds: []
}
```

**Actions:**

- `setCustomerId`: Store selected customer
- `setTripId`: Store selected trip
- `setTravellerIds`: Store selected travellers
- `resetBooking`: Clear booking state

### Usage Example

```javascript
import { useDispatch, useSelector } from "react-redux";
import { setCustomerId } from "./store/bookingSlice";

const dispatch = useDispatch();
const customerId = useSelector((state) => state.booking.customerId);

dispatch(setCustomerId("60d5f483f0e2a72d8c8b4567"));
```

## API Integration

### API Client Configuration

The application uses Axios with custom configuration:

```javascript
// Base URL from environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Timeout: 15 seconds
// Headers: Content-Type: application/json
```

### Error Handling

All API calls include error handling:

- Network errors
- Server errors
- Timeout errors
- Validation errors

### API Modules

- **bookingApi.js**: `createBooking`, `fetchBookings`, `fetchBookingById`
- **customerApi.js**: `createCustomer`, `fetchCustomers`, `fetchCustomerById`
- **travellerApi.js**: `createTraveller`, `fetchTravellers`, `fetchTravellerById`
- **tripApi.js**: `createTrip`, `fetchTrips`, `fetchTripById`

## Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## Styling

### Tailwind CSS

The application uses **Tailwind CSS v4** for styling with:

- Utility-first approach
- Custom components
- Responsive design
- Clean, modern UI

### Custom Styles

Global styles in `App.css` provide:

- Layout system
- Card components
- Form styling
- Button variants
- Tab navigation

### CSS Variables

Uses CSS custom properties for:

- Color scheme
- Spacing
- Typography
- Transitions

## Architecture

### Component Structure

```
App (Main Container)
├── Header (Hero Section)
├── Tab Navigation
└── Tab Content
    ├── Customer Section
    │   ├── CustomerForm
    │   └── CustomerList
    ├── Trip Section
    │   ├── TripForm
    │   └── TripList
    ├── Traveller Section
    │   ├── TravellerForm
    │   └── TravellerList
    └── Booking Section
        ├── BookingForm
        └── BookingList
```

### Data Flow

1. **User Input** → Form Component
2. **Form Submission** → API Call (via API module)
3. **Response** → Redux State (if needed)
4. **State Update** → Component Re-render
5. **UI Update** → User Feedback

## Configuration

### Vite Configuration

- **React Plugin**: With React Compiler for optimization
- **Fast Refresh**: Hot Module Replacement (HMR)
- **Build Optimization**: Code splitting and tree shaking

### ESLint Configuration

- React hooks rules
- React refresh rules
- Modern JavaScript linting

## Responsive Design

The application is fully responsive:

- **Mobile**: Single column layout
- **Tablet**: Optimized grid layout
- **Desktop**: Full-width multi-column layout

## Performance

### Optimizations

- **React Compiler**: Automatic optimization via Babel plugin
- **Code Splitting**: Automatic by Vite
- **Lazy Loading**: Components loaded on demand
- **Memoization**: Redux Toolkit includes built-in memoization
