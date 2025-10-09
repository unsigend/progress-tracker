src/
├── app/                          # App configuration & routing
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers.tsx             # Centralized provider setup
│
├── features/                     # Feature-based modules (domain logic)
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── StepIndicator.tsx
│   │   ├── pages/
│   │   │   ├── LoginPage.tsx
│   │   │   ├── RegisterPage.tsx
│   │   │   ├── GithubCallbackPage.tsx
│   │   │   └── GoogleCallbackPage.tsx
│   │   ├── layouts/
│   │   │   ├── AuthLayout.tsx
│   │   │   └── AuthTemplate.tsx
│   │   ├── hooks/
│   │   │   ├── useEmailCheck.ts
│   │   │   └── useOAuth.ts
│   │   ├── constants/
│   │   │   ├── auth.constants.ts
│   │   │   └── validation.constants.ts
│   │   ├── data/
│   │   │   ├── graphData.ts
│   │   │   └── stepData.ts
│   │   └── index.ts              # Public API exports
│   │
│   ├── books/                    # Books resource feature
│   │   ├── components/
│   │   │   ├── BookCover.tsx
│   │   │   ├── BookCard.tsx
│   │   │   └── BookForm.tsx
│   │   ├── pages/
│   │   │   ├── BooksListPage.tsx
│   │   │   ├── BookShowPage.tsx
│   │   │   ├── BookEditPage.tsx
│   │   │   └── BookNewPage.tsx
│   │   ├── hooks/
│   │   │   └── useBookData.ts
│   │   └── index.ts
│   │
│   ├── reading/                  # Reading tracking feature
│   │   ├── components/
│   │   │   ├── DailySummary.tsx
│   │   │   ├── WeeklyAnalysis.tsx
│   │   │   ├── BooksWeLove.tsx
│   │   │   ├── CompletedBooks.tsx
│   │   │   ├── InProgress.tsx
│   │   │   ├── FeaturedBookCard.tsx
│   │   │   ├── QuickAction.tsx
│   │   │   └── WelcomeCard.tsx
│   │   ├── pages/
│   │   │   └── ReadingHomePage.tsx
│   │   └── index.ts
│   │
│   ├── recordings/               # Recordings as separate feature (not nested)
│   │   ├── components/
│   │   │   ├── RecordingList.tsx
│   │   │   └── RecordingForm.tsx
│   │   ├── pages/
│   │   │   ├── RecordingNewPage.tsx
│   │   │   └── RecordingShowPage.tsx
│   │   └── index.ts
│   │
│   ├── settings/
│   │   ├── components/
│   │   │   ├── ProfileSection.tsx
│   │   │   ├── SecuritySection.tsx
│   │   │   └── ChangePwdDialog.tsx
│   │   ├── pages/
│   │   │   └── SettingsPage.tsx
│   │   └── index.ts
│   │
│   ├── landing/                  # Landing/marketing feature
│   │   ├── components/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── FeatureCard.tsx
│   │   │   ├── BuildWithSection.tsx
│   │   │   ├── TimelineCard.tsx
│   │   │   └── Footer.tsx
│   │   ├── pages/
│   │   │   ├── LandingPage.tsx
│   │   │   └── AboutPage.tsx
│   │   ├── layouts/
│   │   │   ├── LandingLayout.tsx
│   │   │   └── NavBar.tsx
│   │   ├── data/
│   │   │   ├── features.data.ts
│   │   │   ├── buildWith.data.ts
│   │   │   └── devProgress.data.ts
│   │   └── index.ts
│   │
│   ├── dashboard/                # Dashboard feature (cross-feature)
│   │   ├── components/
│   │   │   ├── DashboardHeader.tsx
│   │   │   └── DashboardSidebar.tsx
│   │   ├── pages/
│   │   │   ├── DashboardHomePage.tsx
│   │   │   ├── CoursesHomePage.tsx
│   │   │   └── ProjectsHomePage.tsx
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx
│   │   ├── data/
│   │   │   └── navigationItems.ts
│   │   └── index.ts
│   │
│   └── courses/                  # Courses feature (placeholder)
│       └── pages/
│           └── CoursesHomePage.tsx
│
├── components/                   # Shared/Reusable UI Components
│   ├── ui/                       # shadcn/ui base components (keep as-is)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   │
│   ├── common/                   # Custom stateless UI components
│   │   ├── BackButton.tsx
│   │   ├── Logo.tsx
│   │   ├── Divider.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FileUpload.tsx
│   │   ├── TimePicker.tsx
│   │   ├── SmartPagination.tsx
│   │   ├── HamburgerButton.tsx
│   │   ├── FullLoadingBar.tsx
│   │   ├── DeleteDialog.tsx
│   │   └── ChartContainer.tsx
│   │
│   ├── charts/                   # Chart components
│   │   ├── BarChart.tsx
│   │   ├── LineChart.tsx
│   │   └── PieChart.tsx
│   │
│   ├── refine/                   # Refine-specific components
│   │   ├── buttons/
│   │   │   ├── CloneButton.tsx
│   │   │   ├── CreateButton.tsx
│   │   │   ├── DeleteButton.tsx
│   │   │   ├── EditButton.tsx
│   │   │   ├── ListButton.tsx
│   │   │   ├── RefreshButton.tsx
│   │   │   └── ShowButton.tsx
│   │   ├── data-table/
│   │   │   ├── DataTable.tsx
│   │   │   ├── DataTableFilter.tsx
│   │   │   ├── DataTablePagination.tsx
│   │   │   └── DataTableSorter.tsx
│   │   ├── views/
│   │   │   ├── CreateView.tsx
│   │   │   ├── EditView.tsx
│   │   │   ├── ListView.tsx
│   │   │   └── ShowView.tsx
│   │   └── notifications/
│   │       ├── Toaster.tsx
│   │       ├── UndoableNotification.tsx
│   │       └── useNotificationProvider.tsx
│   │
│   ├── theme/                    # Theme-related components
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeSelect.tsx
│   │   └── ThemeToggle.tsx
│   │
│   └── third-party/              # Third-party component wrappers
│       └── LogoLoop/
│           ├── LogoLoop.tsx
│           └── LogoLoop.css
│
├── layouts/                      # Shared layout components
│   ├── RootLayout.tsx
│   ├── ErrorBoundary.tsx
│   ├── LoadingOverlay.tsx
│   └── index.ts
│
├── lib/                          # Utility libraries & configurations
│   ├── api/
│   │   ├── client.ts             # API client configuration
│   │   └── endpoints.ts          # API endpoints
│   ├── providers/
│   │   ├── authProvider.ts
│   │   └── dataProvider.ts
│   ├── utils/
│   │   ├── cn.ts                 # className utility (from shadcn)
│   │   ├── error.ts
│   │   ├── validation.ts
│   │   ├── random.ts
│   │   └── generic.ts
│   └── constants/
│       ├── global.constants.ts
│       ├── resources.constants.ts
│       └── routes.constants.ts
│
├── hooks/                        # Global shared hooks
│   ├── useMobile.ts
│   ├── useInvalidateCurrentUser.ts
│   └── index.ts
│
├── types/                        # TypeScript type definitions
│   ├── api.types.ts
│   ├── user.types.ts
│   ├── book.types.ts
│   └── index.ts
│
├── pages/                        # Page-level routing components (optional)
│   ├── NotFoundPage.tsx
│   └── index.ts
│
├── index.tsx                     # Entry point
└── vite-env.d.ts