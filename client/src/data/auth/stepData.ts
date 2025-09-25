type StepData = {
    id: number;
    title: string;
    description: string;
    field: string;
    type: string;
    placeholder: string;
    buttonText: string;
    hint?: string;
};

const steps: StepData[] = [
    {
        id: 1,
        title: "Create your account",
        description: "Enter your email to get started",
        field: "email",
        type: "email",
        placeholder: "m@example.com",
        buttonText: "Continue",
    },
    {
        id: 2,
        title: "Secure your account",
        description: "Choose a strong password to protect your account",
        field: "password",
        type: "password",
        placeholder: "Enter your password",
        buttonText: "Continue",
        hint: "Password must be at least 8 characters long",
    },
    {
        id: 3,
        title: "Choose your username",
        description: "Pick a unique username that represents you",
        field: "username",
        type: "text",
        placeholder: "johndoe",
        buttonText: "Create Account",
        hint: "Username must contain only letters, numbers, and underscores",
    },
];

export default steps;
export type { StepData };
