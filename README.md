# Atask Test

> A React + TypeScript project built as part of the **Atask Test** assignment.

## 📋 Table of Contents

- [Demo / Screenshot](#-demo--screenshot)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation & Usage](#-installation--usage)
- [Testing](#-testing)

---

## 📷 Demo / Screenshot

[![App Preview](https://raw.githubusercontent.com/darmawandoni6/atask-test/master/public/preview.png)](https://sunny-gelato-529be6.netlify.app/)

👉 [Preview Link](https://sunny-gelato-529be6.netlify.app/)

---

## ✅ Features

- Search GitHub users by username
- Display repository list when clicking on a user header
- Debounced search input to avoid excessive API requests
- Loading indicators for both user and repository fetching
- Error handling & notifications (using `react-toastify`)

---

## 🛠 Tech Stack

- **React** + **TypeScript**
- **Axios** for HTTP requests
- **React Hooks** (state management & custom hooks like `useDebounce`)
- **Tailwind CSS** (or chosen styling framework)
- **React Toastify** for notifications
- **Jest** + **React Testing Library** for unit testing
- (Optional) **MSW** or other tools for mocking APIs

---

## 📂 Project Structure

Example structure (adjust based on your repo):

```sh
├── public
│  ├── react.svg
│  └── vite.svg
├── src
│  ├── app.test.tsx
│  ├── app.tsx
│  ├── components
│  │  ├── input.tsx
│  │  └── loading.tsx
│  ├── hooks
│  │  └── use-debounce.ts
│  ├── index.css
│  ├── main.tsx
│  ├── types.ts
│  ├── utils
│  │  └── tn-merge.ts
│  └── vite-env.d.ts
├── .env
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── jest.config.ts
├── jest.setup.ts
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```

## 🚀 Installation & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/darmawandoni6/atask-test.git
   cd atask-test
   ```
2. **Install dependencies**
   ```bash
    npm install
    # or
    yarn install
   ```
3. **Update Environment**

   ```bash
    rename .env.example to .env and set github token
    VITE_API_KEY=....
   ```

4. **Run development server**

   ```bash
    npm run dev
    # or
    yarn dev

   ```

## 🧪 Testing

Run unit tests with:

```bash
npm run test
# or
yarn test

```
