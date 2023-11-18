import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const FrontLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
};

export default FrontLayout;
