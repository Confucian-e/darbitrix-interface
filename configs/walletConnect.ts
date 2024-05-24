if (!process.env.NEXT_PUBLIC_PROJECT_ID)
  throw new Error(
    "WalletConnect Project Id is not set in environment variables",
  );

export const PROJECT_ID = process.env.NEXT_PUBLIC_PROJECT_ID;
