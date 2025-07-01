import { Cta } from "@/components/ui/cta-4";

export function DemoOne() {
  return (
    <Cta
      title="Transform Your Documents Today"
      description="Experience the power of AI-driven document summarization. Upload your first document and see instant results with our advanced natural language processing."
      primaryButtonText="Start Free Trial"
      secondaryButtonText="View Demo"
      onPrimaryClick={() => {
        // Handle primary button click
        console.log("Start Free Trial clicked");
      }}
      onSecondaryClick={() => {
        // Handle secondary button click
        console.log("View Demo clicked");
      }}
    />
  );
}
