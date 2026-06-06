# CareerAI - Frontend

A modern, minimal React application with Tailwind CSS and React Router.

## Features

- **Landing Page** - Hero section with feature cards and call-to-action
- **Authentication** - Login/Register forms with floating field inputs
- **Theme Support** - Dark/Light mode toggle with Tailwind CSS
- **Scroll Animations** - Intersection Observer-based scroll animations
- **Responsive Design** - Mobile-first approach with Tailwind breakpoints

## Stack

- **React 19** - UI Framework
- **JavaScript** - Plain JS code
- **React Router v7** - Client-side routing
- **Tailwind CSS 4** - Utility-first styling
- **Vite** - Build tool
- **lucide-react** - Icon library

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── ScrollAnimate.jsx    # Scroll animation wrapper
│   └── AuthCard.jsx         # Login/Register form
├── routes/
│   ├── index.jsx            # Landing page
│   └── register.jsx         # Auth page
├── App.jsx                  # Router setup
├── main.jsx                 # Entry point
└── styles/styles.css               # Global styles
```

## Routes

- `/` - Landing page
- `/register` - Login/Register page

## Customization

All styling is done with Tailwind CSS utility classes. The dark mode is toggled via the `dark:` prefix classes, controlled by adding/removing the `dark` class on the document element.
