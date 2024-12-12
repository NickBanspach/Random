# Random

A web application for simulating random events with customizable choices and weights.

It includes an Admin Dashboard for managing the choices and weights, as well as a User Interface for running events and exporting the results to Excel.

## Features

- [x] Customizable Random Events
- [x] Admin Dashboard
- [x] User Interface
- [x] Export to Excel
- [ ] Different Sessions

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)
- [pnpm](https://pnpm.io/installation)
- [dotenvx](https://dotenvx.com/docs/) ( `winget install dotenvx` )

### Install

Clone the repository

```shell
git clone https://github.com/RedPhortex/random.git
```

Go to the cloned directory

```shell
cd random
```

Install dependencies

```shell
pnpm install
```

Run the development server


Create and adjust .env file.

```shell
See [.env.example](.env.example).
```

```shell
pnpm run dev
```

After running the development server, the app will be accessible at <http://localhost:5173>. The admin dashboard is accessible at /admin for modifying choices and weights.

### Build

Generate a production build

```shell
pnpm run build
```

### Format

Check if the code is well formatted

```shell
pnpm run format
```

### Lint

```shell
pnpm run lint
```

## Built with

- [React](https://react.dev/) - Front-end framework
- [Joy UI](https://mui.com/joy-ui/getting-started/) - Component library
- [Socket.io](https://socket.io/) - Real-time communication
- [Vite Express](https://github.com/szymmis/vite-express/) - Development server
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Eslint](https://eslint.org/) - JavaScript linter
- [Prettier](https://prettier.io/) - Code formatter
- [Bunshi](https://www.bunshi.org/) - Global state management
- [Valtio](https://valtio.dev/) - Proxy-based state management
- [XLSX](https://github.com/SheetJS/sheetjs) - Excel file generation

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
