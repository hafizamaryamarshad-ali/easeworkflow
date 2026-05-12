"use client";

/**
 * Example Component: Using Loading State with API Calls
 *
 * This file demonstrates common patterns for using the loading system
 * You can use these examples in your own components
 */

import { useLoadingState, useLoadingWrapper } from "@/hooks/useLoadingState";
import { useEffect } from "react";

/**
 * Example 1: Manual Loading Control
 * Use this pattern when you need fine control over when loading starts/stops
 */
export function ManualLoadingExample() {
  const { isLoading, startLoading, stopLoading } = useLoadingState();

  const handleClick = () => {
    startLoading();

    // Simulate an operation
    setTimeout(() => {
      stopLoading();
    }, 2000);
  };

  return (
    <button onClick={handleClick}>
      {isLoading ? "Loading..." : "Click to Load"}
    </button>
  );
}

/**
 * Example 2: Wrapped Async Function
 * Use this pattern for automatic loading state management around async operations
 */
export function AsyncFunctionExample() {
  const handleFetch = useLoadingWrapper(async () => {
    const response = await fetch("/api/data");
    return response.json();
  });

  const handleClick = async () => {
    try {
      const data = await handleFetch();
      console.log("Data received:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return <button onClick={handleClick}>Fetch Data</button>;
}

/**
 * Example 3: Loading on Mount (e.g., Page Load)
 * Use this pattern to show loading while page data is being fetched
 */
export function PageLoadExample() {
  const { startLoading, stopLoading } = useLoadingState();

  useEffect(() => {
    const loadPageData = async () => {
      startLoading();
      try {
        // Simulate fetching page data
        const response = await fetch("/api/page-data");
        const data = await response.json();
        console.log("Page data loaded:", data);
      } catch (error) {
        console.error("Failed to load page:", error);
      } finally {
        // Always stop loading when done
        stopLoading();
      }
    };

    loadPageData();
  }, []);

  return <div>Page content...</div>;
}

/**
 * Example 4: Form Submission with Loading
 * Use this pattern for form submissions with built-in loading state
 */
export function FormSubmissionExample() {
  const handleSubmit = useLoadingWrapper(async (formData: Record<string, any>) => {
    const response = await fetch("/api/form-submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Form submission failed");
    }

    return response.json();
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const result = await handleSubmit(
        Object.fromEntries(formData)
      );
      console.log("Form submitted successfully:", result);
      // Show success message to user
    } catch (error) {
      console.error("Submission error:", error);
      // Show error message to user
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" name="username" placeholder="Enter username" required />
      <button type="submit">Submit</button>
    </form>
  );
}

/**
 * Example 5: Multiple API Calls with Loading
 * Use this pattern when you need to coordinate loading state across multiple operations
 */
export function MultipleApiCallsExample() {
  const { startLoading, stopLoading } = useLoadingState();

  const handleMultipleOperations = async () => {
    startLoading();

    try {
      // First API call
      const response1 = await fetch("/api/data-1");
      const data1 = await response1.json();

      // Second API call
      const response2 = await fetch("/api/data-2");
      const data2 = await response2.json();

      console.log("All data loaded:", { data1, data2 });
    } catch (error) {
      console.error("Error in multiple calls:", error);
    } finally {
      stopLoading();
    }
  };

  return <button onClick={handleMultipleOperations}>Load Multiple</button>;
}

/**
 * Example 6: Auto-stop After Delay
 * Use this pattern to automatically stop loading after a specific time
 */
export function AutoStopExample() {
  const { startLoading } = useLoadingState(false, 3000); // Auto-stop after 3 seconds

  const handleQuickAction = () => {
    startLoading();
    // Loader will automatically stop after 3000ms
  };

  return <button onClick={handleQuickAction}>Quick Action</button>;
}

/**
 * Example 7: Error Handling with Loading
 * Use this pattern to handle errors while managing loading state
 */
export function ErrorHandlingExample() {
  const { startLoading, stopLoading } = useLoadingState();

  const handleWithErrorHandling = async () => {
    startLoading();

    try {
      const response = await fetch("/api/risky-operation");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Operation failed:", error);
      // Show error notification to user
      throw error;
    } finally {
      stopLoading();
    }
  };

  const handleClick = async () => {
    try {
      await handleWithErrorHandling();
    } catch (error) {
      // Error already logged above
    }
  };

  return <button onClick={handleClick}>Try Operation</button>;
}
